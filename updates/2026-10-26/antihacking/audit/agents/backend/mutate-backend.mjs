import {cpSync,readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const out=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(out,'../../snapshot');
const digest=s=>createHash('sha256').update(s).digest('hex');
const mutations=[
 {id:'M-B01',file:'functions/_lib/collection.ts',old:'DELETE FROM collection_records WHERE token_hash=? AND EXISTS',next:'DELETE FROM collection_records WHERE 0 AND token_hash=? AND EXISTS',risk:'Omit actual withdrawal deletion while response reports success'},
 {id:'M-B02',file:'functions/_lib/accounts.ts',old:'WHERE account_id = ? AND issued_at > ${NOW_SQL} - ${ACCOUNT_WINDOW_MS}) < 5',next:'WHERE account_id = ? AND issued_at > ${NOW_SQL} - ${ACCOUNT_WINDOW_MS}) < 6',risk:'Allow sixth export authorization despite five-per-day promise'},
 {id:'M-B03',file:'functions/_lib/accounts.ts',old:'// Decryption awaits cannot retain an authorization revoked in the meantime.\n      if (',next:'// Decryption awaits cannot retain an authorization revoked in the meantime.\n      if (false &&',risk:'Skip final own-data authorization after asynchronous decryption'},
];
const results=[];
for(const mutation of mutations){
 const mutant=path.join(out,'mutants',mutation.id);mkdirSync(mutant,{recursive:true});for(const area of ['functions','shared','workers','migrations','migrations-auth'])cpSync(path.join(root,area),path.join(mutant,area),{recursive:true});
 const file=path.join(mutant,mutation.file),before=readFileSync(file,'utf8');
 if(before.split(mutation.old).length!==2)throw new Error(`Mutation target not unique: ${mutation.id}`);
 const altered=before.replace(mutation.old,mutation.next);writeFileSync(file,altered);
 const run=spawnSync(process.execPath,['--import','tsx',path.join(out,'repro-backend.mts')],{cwd:root,encoding:'utf8',windowsHide:true,maxBuffer:4*1024*1024,env:{...process.env,AUDIT_SNAPSHOT:mutant,RESULT_NAME:`mutation-${mutation.id}-tests.json`}});
 writeFileSync(path.join(out,`mutation-${mutation.id}.log`),`${run.stdout??''}${run.stderr??''}\nExit: ${run.status}\n`);
 const checks=JSON.parse(readFileSync(path.join(out,`mutation-${mutation.id}-tests.json`),'utf8'));
 writeFileSync(file,before);
 const restored=digest(readFileSync(file))===digest(readFileSync(path.join(root,mutation.file)));
 results.push({...mutation,baselineSha256:digest(before),mutantSha256:digest(altered),status:checks.failed>0&&run.status!==0?'DETECTED':'SURVIVED',exitCode:run.status,failedChecks:checks.tests.filter(t=>t.status==='FAIL').map(t=>t.name),restoredExactBaseline:restored});
 if(!restored)throw new Error('Restoration identity mismatch');
}
const receipt={tool:'Targeted independent source mutations',toolVersion:'audit-2026-10-26-v1',node:process.version,operators:['omit_write','relax_business_limit','omit_authorization_recheck'],raw:{detected:results.filter(x=>x.status==='DETECTED').length,survived:results.filter(x=>x.status==='SURVIVED').length,notCovered:0,equivalent:0,invalid:0,timeouts:0},mutations:results};
writeFileSync(path.join(out,'mutation-results.json'),JSON.stringify(receipt,null,2));
console.log(JSON.stringify(receipt,null,2));
if(results.some(x=>x.status!=='DETECTED'))process.exitCode=1;
