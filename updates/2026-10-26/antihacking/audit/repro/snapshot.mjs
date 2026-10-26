import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const root = process.cwd();
const audit = path.join(root,'.local/logs/antihacking-20261026-full');
const snapshot = path.join(audit,'snapshot');
const git = (...args) => execFileSync('git',args,{cwd:root,encoding:'utf8'});
const list = [...new Set(git('ls-files','-z','--cached','--others','--exclude-standard').split('\0').filter(Boolean))].sort();
const digest = b=>crypto.createHash('sha256').update(b).digest('hex');
const rows=[];
for(const file of list){
  if(/(^|\/)(\.env(?:\.|$)|\.dev\.vars(?:\.|$))/.test(file)&&!file.endsWith('.example'))throw Error('Unexpected protected config in source inventory');
  const bytes=await fs.readFile(path.join(root,file));
  const area=file.split('/')[0];
  const category=/\.(png|jpe?g|webp|gif|ico|woff2?|zip|pdf)$/i.test(file)?'binary-hash-only':file.startsWith('docs/archive/')||file.startsWith('docs/design-')||file.includes('/dossier-')?'historical-or-documentary':file==='AGENTS.md'||file.startsWith('.aekr/')||file.startsWith('.claude/')?'governance-not-evaluated':'text';
  rows.push({path:file,area,bytes:bytes.length,sha256:digest(bytes),category});
  const dest=path.join(snapshot,file);await fs.mkdir(path.dirname(dest),{recursive:true});await fs.writeFile(dest,bytes);
}
const configPresence=[];
for(const name of ['.env','.dev.vars','.wrangler','node_modules','dist','.local/private']){
  try{const s=await fs.stat(path.join(root,name));configPresence.push({path:name,present:true,kind:s.isDirectory()?'directory':'file',treatment:name==='node_modules'?'reuse installed toolchain without copying; lockfile integrity audited':name==='dist'?'existing artifact not credited; fresh build in disposable snapshot':'not read or copied'});}catch{configPresence.push({path:name,present:false});}
}
const record={root,snapshot,audit,createdUtc:new Date().toISOString(),clientDate:'2026-10-26',timezone:'America/New_York',branch:git('branch','--show-current').trim(),head:git('rev-parse','HEAD').trim(),status:git('status','--porcelain=v1'),node:process.version,npm:execFileSync('npm.cmd',['--version'],{encoding:'utf8',shell:true}).trim(),sourceManifestSha256:digest(JSON.stringify(rows)),files:rows,configPresence,submodules:git('submodule','status'),trackedDiffSha256:digest(git('diff','--binary','HEAD'))};
await fs.writeFile(path.join(audit,'SNAPSHOT.json'),JSON.stringify(record,null,2));
await fs.copyFile('C:/Users/edlop/.codex/attachments/613c321d-c3cb-47e2-b8c6-fdbf695e0b0b/Pasted text.txt',path.join(audit,'AUDIT_PROMPT.txt'));
console.log(JSON.stringify({snapshot,files:rows.length,bytes:rows.reduce((s,x)=>s+x.bytes,0),manifest:record.sourceManifestSha256,configPresence},null,2));
