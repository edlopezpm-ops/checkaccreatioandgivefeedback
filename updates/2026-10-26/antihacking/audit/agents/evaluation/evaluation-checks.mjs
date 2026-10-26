import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { parse } from '@babel/parser';

const audit = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(audit, '../../../../../');
const req = createRequire(path.join(root, 'package.json'));
const hash = s => crypto.createHash('sha256').update(s).digest('hex');
const reports = [];
const walk = (x, visit) => { if (!x || typeof x !== 'object') return; if (x.type) visit(x); for (const v of Object.values(x)) if (Array.isArray(v)) for (const a of v) walk(a, visit); else if (v && typeof v === 'object') walk(v, visit); };
const tests = [];
for (const name of (await fs.readdir(path.join(root,'tests'))).filter(x=>x.endsWith('.test.ts'))) {
 const relative = `tests/${name}`;
 const source = await fs.readFile(path.join(root, relative),'utf8');
 const ast = parse(source,{sourceType:'module',plugins:['typescript','jsx']});
 const assertions = {}, declarations = [], switches = [];
 const imports = ast.program.body.filter(x=>x.type==='ImportDeclaration').map(x=>x.source.value);
 walk(ast,n=>{
  if(n.type!=='CallExpression') return;
  const c=n.callee;
  if(c.type==='MemberExpression' && c.object.name==='assert') assertions[c.property.name]=(assertions[c.property.name]||0)+1;
  if(c.type==='Identifier' && ['test','it','describe'].includes(c.name)) declarations.push({name:n.arguments[0]?.value??'dynamic',line:n.loc.start.line});
  if(c.type==='MemberExpression' && ['test','it','describe'].includes(c.object.name) && ['skip','todo','only'].includes(c.property.name)) switches.push({switch:c.property.name,line:n.loc.start.line});
 });
 const sourceOnly = imports.every(x=>x.startsWith('node:')) && /readFile/.test(source) && !/spawnSync|spawn\(/.test(source);
 tests.push({path:relative,bytes:Buffer.byteLength(source),sha256:hash(source),declarations,assertions,imports,sourceOnly,focusSwitches:switches});
}
await fs.writeFile(path.join(audit,'test-inventory.json'),JSON.stringify({method:'Babel AST syntax inventory; not semantic coverage',files:tests.length,tests:tests.reduce((s,x)=>s+x.declarations.length,0),sourceOnlyFiles:tests.filter(x=>x.sourceOnly).length,assertions:tests.reduce((r,x)=>{for(const [k,v]of Object.entries(x.assertions))r[k]=(r[k]||0)+v;return r;},{}),filesDetail:tests},null,2));

const mutantRoot=path.join(audit,'mutants');
await fs.mkdir(mutantRoot,{recursive:true});
async function copy(relative, dst){const target=path.join(dst,relative);await fs.mkdir(path.dirname(target),{recursive:true});await fs.cp(path.join(root,'.local/logs/antihacking-20261026-full/snapshot',relative),target,{recursive:true,filter:s=>!/[\\/]assets(?:[\\/]|$)/.test(s)});}
function run(cwd,args,label){const start=performance.now();const r=spawnSync(process.execPath,args,{cwd,encoding:'utf8',windowsHide:true,timeout:60000,maxBuffer:8*1024*1024});const out={label,args,exit:r.status,signal:r.signal,error:r.error?.code??null,durationMs:performance.now()-start,stdout:r.stdout??'',stderr:r.stderr??''};reports.push(out);return out;}
async function mutation(name, relative, replace, testPaths) {
 const dir=path.join(mutantRoot,name); await fs.mkdir(dir,{recursive:true});
 for(const p of ['src','shared','tests','scripts','package.json','tsconfig.json','tsconfig.app.json','tsconfig.functions.json']) await copy(p,dir);
 const target=path.join(dir,relative),baseline=await fs.readFile(target,'utf8'),changed=replace(baseline);
 if(baseline===changed) throw new Error(`Mutation did not change ${relative}`);
 await fs.writeFile(target,changed);
 const result=run(dir,['--import','tsx','--test',...testPaths],name);
 await fs.writeFile(target,baseline);
 const restored=hash(await fs.readFile(target));
 return {name,path:relative,baselineSha256:hash(baseline),mutantSha256:hash(changed),restoredSha256:restored,restored:restored===hash(baseline),existingTestExit:result.exit,existingTestSignal:result.signal,evidence:`runs.json#${name}`};
}
const mutations=[];
mutations.push(await mutation('publication-gate-noop','scripts/check-web-security-artifacts.mjs',s=>s.replace('if (findings.length)','if (false && findings.length)'),['tests/webSecurityArtifacts.test.ts']));
mutations.push(await mutation('confirm-callback-noop','src/components/creation/ReviewStage.tsx',s=>s.replace('onClick={onConfirm}','onClick={() => {}}'),['tests/reviewManifest.test.ts']));

// Independent oracle: a click of the supplied enabled confirmation button must
// call the caller's callback once. This expectation comes from the public Review
// action, without computing an expected result through product implementation.
const independent=path.join(audit,'review-callback-oracle.mts');
await fs.writeFile(independent,`import assert from 'node:assert/strict';\nimport React from 'react';\nimport {pathToFileURL} from 'node:url';\nObject.assign(globalThis,{React});\nconst {ReviewStage}=await import(pathToFileURL(process.argv[2]).href);\nlet confirms=0;\nconst p={name:'Independent audit 73',phase:'idea',context:'Fresh independent contract input',restrictions:'',route:'local',action:'repository',destination:'browser-download',participants:[{id:'p1',role:'generalist',label:''}],attachments:[],initializeGit:false,createRemote:false,remotePrivate:true,openIde:false,dryRun:true,orchestration:{enabled:false}};\nconst result=ReviewStage({isWeb:true,actions:[],copied:false,locale:'en',onChange:()=>{},onConfirm:()=>{confirms++},onCopy:()=>{},onDownload:()=>{},onStageChange:()=>{},preview:null,project:p,prompt:'Audit 73',running:false,stageStates:{foundation:'complete',context:'complete',team:'complete',delivery:'complete',review:'current'},valid:true});\nfunction find(node){if(!node||typeof node!=='object')return; if(node.type==='button'&&node.props.className==='start')return node;for(const child of [].concat(node.props?.children??[])){const f=find(child);if(f)return f;}}\nconst button=find(result);assert.ok(button,'confirmation button must exist');assert.equal(button.props.disabled,false);button.props.onClick();assert.equal(confirms,1,'one enabled confirmation activation must invoke onConfirm exactly once');console.log('PASS independent confirmation callback oracle');\n`);
const reviewTarget=path.join(mutantRoot,'confirm-callback-noop','src/components/creation/ReviewStage.tsx');
const pristine=await fs.readFile(reviewTarget,'utf8');
run(audit,['--import','tsx',independent,reviewTarget],'independent-review-pristine');
await fs.writeFile(reviewTarget,pristine.replace('onClick={onConfirm}','onClick={() => {}}'));
run(audit,['--import','tsx',independent,reviewTarget],'independent-review-mutant');
await fs.writeFile(reviewTarget,pristine);
mutations[1].independentOracle={baselineExit:reports.find(x=>x.label==='independent-review-pristine').exit,mutantExit:reports.find(x=>x.label==='independent-review-mutant').exit};

const runner=path.join(mutantRoot,'runner-failure-propagation');await fs.mkdir(path.join(runner,'scripts'),{recursive:true});
await copy('scripts/run-logged.mjs',runner);
await fs.writeFile(path.join(runner,'package.json'),JSON.stringify({name:'audit-only-failure-control',private:true,scripts:{log:'node scripts/run-logged.mjs',test:'node -e "process.exit(7)"'}}));
const npmCli=path.join(path.dirname(process.execPath),'node_modules/npm/bin/npm-cli.js');
run(runner,[npmCli,'run','log','--','test'],'logged-runner-failure-7');

await fs.writeFile(path.join(audit,'runs.json'),JSON.stringify(reports,null,2));
await fs.writeFile(path.join(audit,'mutations.json'),JSON.stringify({tool:'Selective bespoke operators; Node '+process.version,operators:[{id:'publication-gate-noop',operation:'replace condition by always false'},{id:'confirm-callback-noop',operation:'omit required click effect'}],scope:'Two targeted mutants and independent callback oracle; not a whole-repository mutation score',mutations,runnerFailureControl:reports.find(x=>x.label==='logged-runner-failure-7')},null,2));
console.log(JSON.stringify({inventory:tests.length,sourceOnlyFiles:tests.filter(x=>x.sourceOnly).length,tests:tests.reduce((s,x)=>s+x.declarations.length,0),mutations,runs:reports.map(({label,exit,signal,error,durationMs})=>({label,exit,signal,error,durationMs}))},null,2));
