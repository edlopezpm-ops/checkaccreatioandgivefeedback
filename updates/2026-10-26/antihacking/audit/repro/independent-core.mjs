import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL,fileURLToPath} from 'node:url';
import {zipSync,unzipSync,strToU8,strFromU8} from 'fflate';
import {PDFDocument,PDFName,PDFString} from 'pdf-lib';
import {execFileSync} from 'node:child_process';
const audit=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const base=process.env.AUDIT_TARGET??path.join(audit,'snapshot');
const mod=async p=>import(pathToFileURL(path.join(base,p)).href);
const {generatePrompt,planActions,renderSetupMd}=await mod('src/core.ts');
const {defaultOrchestration,renderOrchestrationConfig}=await mod('shared/domain.ts');
const {validateWebProject,buildWebExport}=await mod('src/webExport.ts');
const {prepareAttachment,assertPreparedAttachment}=await mod('src/attachmentSecurity.ts');
const {createWebExecutionBridge}=await mod('src/bridge/web.ts');
const {downloadZip}=await import('client-zip');
const s={baseFolder:'',toolkitPath:'',futureProjectsPath:'',defaultBranch:'main',preferredIde:'VS Code',theme:'light',locale:'es',confirmBeforeRun:true};
const p={name:'Huerta Ñandú 739',phase:'idea',context:'AUDIT_CONTEXT_739: medir agua, sin nube.\n```\nUnicode: 漢字 🦉',restrictions:'AUDIT_LIMIT_739: coste directo cero; no enviar datos.',route:'local',action:'repository',destination:'browser-download',participants:[{id:'participant-01',role:'generalist',label:'Coordina 739'}],attachments:[],initializeGit:false,createRemote:false,remotePrivate:true,openIde:false,dryRun:false,orchestration:defaultOrchestration()};
const results=[];
async function check(name,fn){const t=performance.now();try{await fn();results.push({name,status:'PASS',ms:performance.now()-t});}catch(e){results.push({name,status:'FAIL',ms:performance.now()-t,error:e.stack});}}
await check('contract validation and exact bounds',()=>{
 assert.deepEqual(validateWebProject(p,s),{});
 for(const [patch,key] of [[{name:'a'.repeat(51)},'name'],[{context:'a'.repeat(20001)},'context'],[{restrictions:'a'.repeat(10001)},'restrictions'],[{name:'🦉'},'name'],[{participants:[p.participants[0],{...p.participants[0],id:'participant-02'}]},'participants']])assert.ok(validateWebProject({...p,...patch},s)[key]);
 assert.deepEqual(validateWebProject({...p,name:'a'.repeat(50),context:'x'.repeat(20000),restrictions:'y'.repeat(10000)},s),{});
});
await check('prompt preserves fresh source data; metamorphic isolation',()=>{
 const prompt=generatePrompt(p,'es');assert.ok(prompt.includes(p.context));assert.ok(prompt.includes(p.restrictions));
 assert.equal(generatePrompt(structuredClone(p),'es'),prompt);
 const changed=generatePrompt({...p,context:'SECOND_MARKER_992'},'es');assert.ok(changed.includes('SECOND_MARKER_992'));assert.ok(!changed.includes('AUDIT_CONTEXT_739'));assert.ok(changed.includes(p.restrictions));
 assert.deepEqual(planActions(p,s),planActions(structuredClone(p),s));
});
await check('real ZIP opens and contains input and all declared files',async()=>{
 const files=buildWebExport(p,s,[],{appVersion:'audit',createdAt:'2026-10-26T00:00:00Z'});
 const blob=await downloadZip(files.map(f=>({name:f.path,input:f.input}))).blob();
 const zip=unzipSync(new Uint8Array(await blob.arrayBuffer()));
 const root='huerta-nandu-739/';
 for(const name of ['START.md','AGENTS.md','PROJECT_PROMPT.md','docs/product/discovery.md','docs/master.md','SETUP.md','.accreatio/project.json','.accreatio/contract.json'])assert.ok(zip[root+name],name);
 assert.equal(Object.keys(zip).length,files.length);
 assert.ok(strFromU8(zip[root+'PROJECT_PROMPT.md']).includes(p.context));
 const contract=JSON.parse(strFromU8(zip[root+'.accreatio/contract.json']));for(const name of contract.requiredPaths)assert.ok(zip[root+name],name);
 assert.equal(JSON.parse(strFromU8(zip[root+'.accreatio/project.json'])).projectName,p.name);
 for(const name of Object.keys(zip))assert.ok(!name.includes('..')&&!/\.(ps1|exe|cmd|bat|sh|py)$/i.test(name));
 await fs.writeFile(path.join(audit,'evidence/independent-project.zip'),new Uint8Array(await blob.arrayBuffer()));
});
await check('four-role YAML parsed by independent YAML parser preserves tasks',()=>{
 const roles=['generalist','architect','implementer','auditor'];
 const q={...p,participants:roles.map((role,i)=>({id:`participant-0${i+1}`,role,label:''}))};
 q.orchestration={...defaultOrchestration(),enabled:true,participants:q.participants.map(a=>({participantId:a.id,provider:'codex',task:`${a.role}: nuevo\nvalor "739" # literal`}))};
 assert.deepEqual(validateWebProject(q,s),{});
 const y=JSON.parse(execFileSync('python',['-c','import sys,json,yaml;print(json.dumps(yaml.safe_load(sys.stdin.read())))'],{input:renderOrchestrationConfig(q,s),encoding:'utf8'}));
 assert.deepEqual(y.role_sequence.map(a=>a.task),q.orchestration.participants.map(a=>a.task));assert.equal(y.role_sequence.length,4);assert.equal(y.budget.max_provider_invocations,4);
});
const doc=(value,external=false)=>zipSync({'[Content_Types].xml':strToU8('<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>'),'_rels/.rels':strToU8(`<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="${external?'https://invalid.example/payload':'word/document.xml'}"${external?' TargetMode="External"':''}/></Relationships>`),'word/document.xml':strToU8(`<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p><w:r><w:t>${value}</w:t></w:r></w:p></w:body></w:document>`)},{mtime:new Date(1980,0,1)});
await check('new DOCX reconstruction and immutable admission proof',async()=>{
 const raw=new Blob([doc('NUEVO_739_Ñ_漢字')]);const clean=await prepareAttachment(raw,'nuevo.docx');assert.notEqual(clean,raw);assertPreparedAttachment(clean,'nuevo.docx');
 const parts=unzipSync(new Uint8Array(await clean.arrayBuffer()));assert.ok(strFromU8(parts['word/document.xml']).includes('NUEVO_739_Ñ_漢字'));
 assert.throws(()=>assertPreparedAttachment(new Blob([clean]),'nuevo.docx'));assert.throws(()=>assertPreparedAttachment(clean,'otro.docx'));
 await assert.rejects(()=>prepareAttachment(new Blob([doc('x',true)]),'external.docx'));
 await assert.rejects(()=>prepareAttachment(new Blob(['%PDF-fake']),'falso.pdf'));
});
await check('new PDF round trip; active PDF rejected',async()=>{
 const pdf=await PDFDocument.create();pdf.addPage([317,419]);const bytes=await pdf.save();const clean=await prepareAttachment(new Blob([bytes]),'nuevo.pdf');
 const output=await PDFDocument.load(await clean.arrayBuffer());assert.equal(output.getPageCount(),1);assert.deepEqual(output.getPage(0).getSize(),{width:317,height:419});
 pdf.catalog.set(PDFName.of('OpenAction'),pdf.context.obj({S:PDFName.of('JavaScript'),JS:PDFString.of('AUDIT_ACTIVE_739')}));
 const activeBytes=await pdf.save();await assert.rejects(()=>prepareAttachment(new Blob([activeBytes]),'activo.pdf'));
});
await check('dry-run makes zero archives, quota calls and downloads',async()=>{
 let effects=0;const run=createWebExecutionBridge({createArchive:async()=>{effects++;throw Error('must not run');},authorize:async()=>{effects++;},download:()=>{effects++;}});
 const r=await run({operationId:crypto.randomUUID(),definition:{...p,dryRun:true},settings:s});assert.equal(r.ok,true);assert.equal(r.outcome,'dry-run');assert.equal(effects,0);assert.equal(r.artifacts.length,0);
});
await check('real bridge creates ZIP, authorizes once, reports requested only',async()=>{
 let archive;let authorizations=0;let downloads=0;const run=createWebExecutionBridge({authorize:async()=>{authorizations++;},download:(blob)=>{archive=blob;downloads++;}});
 const request={operationId:crypto.randomUUID(),definition:p,settings:s};const r=await run(request);assert.equal(r.ok,true);assert.equal(authorizations,1);assert.equal(downloads,1);assert.equal(r.webDelivery.browserPersistenceVerified,false);assert.equal(r.webDelivery.state,'download-requested');
 const zip=unzipSync(new Uint8Array(await archive.arrayBuffer()));assert.ok(Object.keys(zip).some(n=>n.endsWith('/START.md')));
 await run(request);assert.equal(authorizations,1);assert.equal(downloads,1);
});
await check('controlled archive/quota/download failures never report success',async()=>{
 for(const stage of ['archive','quota','download']){
  let downloads=0;const run=createWebExecutionBridge({createArchive:stage==='archive'?async()=>{throw Error('AUDIT_ARCHIVE_FAILURE');}:undefined,authorize:async()=>{if(stage==='quota')throw Error('AUDIT_QUOTA_FAILURE');},download:()=>{downloads++;if(stage==='download')throw Error('AUDIT_DOWNLOAD_FAILURE');}});
  const r=await run({operationId:crypto.randomUUID(),definition:p,settings:s});assert.equal(r.ok,false);assert.ok(r.error.includes('AUDIT_'));if(stage!=='download')assert.equal(downloads,0);
 }
});
await fs.writeFile(path.join(audit,'evidence',process.env.AUDIT_RESULT??'independent-core-results.json'),JSON.stringify({seed:739,target:base,oracle:'Literal published limits and fixture-authored expected text/dimensions; fflate ZIP reader; YAML parser independent of emitter; injected dependency failures',results},null,2));
console.log(JSON.stringify(results,null,2));if(results.some(r=>r.status==='FAIL'))process.exitCode=1;
