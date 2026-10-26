import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const audit=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=async p=>JSON.parse(await fs.readFile(path.join(audit,p),'utf8'));
const write=async(p,v)=>fs.writeFile(path.join(audit,p),JSON.stringify(v,null,2)+'\n');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const original=await read('SNAPSHOT.json'),root=original.root;
const git=(...args)=>execFileSync('git',args,{cwd:root,encoding:'utf8'});
const currentPaths=[...new Set(git('ls-files','-z','--cached','--others','--exclude-standard').split('\0').filter(Boolean))].sort();
const baselinePaths=original.files.map(f=>f.path);
assert.deepEqual(currentPaths,baselinePaths,'Source inventory changed');
const discrepancies=[];let comparisons=0;
for(const row of original.files){
 for(const [copy,base] of [['original',root],['snapshot',original.snapshot]]){
  const b=await fs.readFile(path.join(base,row.path));comparisons++;
  if(b.length!==row.bytes||hash(b)!==row.sha256)discrepancies.push({copy,path:row.path,bytes:b.length,sha256:hash(b)});
 }
}
const head=git('rev-parse','HEAD').trim(),branch=git('branch','--show-current').trim(),status=git('status','--porcelain=v1'),diffSha256=hash(git('diff','--binary','HEAD'));
assert.equal(head,original.head);assert.equal(branch,original.branch);assert.equal(status,original.status);assert.equal(diffSha256,original.trackedDiffSha256);assert.equal(discrepancies.length,0);
const matrix=await read('MATRIX.json'),frozen=await read('agents/contracts/MATRIX.frozen.json'),score=await read('SCORECARD.json'),findings=await read('FINDINGS.json');
const frozenSha256=hash(await fs.readFile(path.join(audit,'agents/contracts/MATRIX.frozen.json')));
assert.equal(frozenSha256,matrix.frozenSha256);
assert.deepEqual(matrix.capabilities.map(c=>[c.id,c.weight]),frozen.capabilities.map(c=>[c.id,c.weight]));
const sums={PASS:0,FAIL:0,UNKNOWN:0},counts={PASS:0,FAIL:0,UNKNOWN:0};
for(const c of matrix.capabilities){assert.ok(Object.hasOwn(sums,c.status));sums[c.status]+=c.weight;counts[c.status]++;for(const p of c.evidence)await fs.access(path.join(audit,p));}
assert.equal(score.W,sums.PASS+sums.FAIL+sums.UNKNOWN);assert.equal(score.P,sums.PASS);assert.equal(score.F,sums.FAIL);assert.equal(score.U,sums.UNKNOWN);assert.deepEqual(score.capabilityCounts,counts);assert.equal(score.demonstratedCompliance,100*score.P/score.W);assert.equal(score.decisionCoverage,100*(score.P+score.F)/score.W);
for(const f of findings.findings){assert.equal(f.snapshot,head);for(const p of f.evidence)await fs.access(path.join(audit,p));}
await write('FINAL_IDENTITY.json',{createdAt:new Date().toISOString(),root,head,branch,status,sourceFiles:original.files.length,sourceBytes:original.files.reduce((s,r)=>s+r.bytes,0),sourceComparisons:comparisons,discrepancies,originalUnchanged:true,snapshotUnchanged:true,fileSetUnchanged:true,trackedDiffUnchanged:true,sourceManifestSha256:original.sourceManifestSha256,frozenMatrixSha256:frozenSha256,capabilityIdsAndWeightsUnchanged:true,scope:'Source files selected in SNAPSHOT.json, including original untracked groups. Build outputs and isolated mutation copies are separate evidence; credentials and historical caches are not read.'});
const progress=await read('PROGRESS.json');progress.phase='complete';progress.localAuditComplete=true;progress.remainingLocalWork=[];progress.completedAt=new Date().toISOString();progress.nextAction='Corrections require a new separately identified snapshot and fresh independent verification. Resolve C10/C19/C21/C27 with authorized test identities and authoritative external readback; do not reinterpret this frozen FAIL as repaired.';await write('PROGRESS.json',progress);
const selected=new Set(['REPORT.md','MATRIX.json','SCORECARD.json','FINDINGS.json','PROGRESS.json','SNAPSHOT.json','INVENTORY.json','AUDIT_PROMPT.txt','calculate-score.mjs','FINAL_IDENTITY.json']);
const addFlat=async rel=>{for(const d of await fs.readdir(path.join(audit,rel),{withFileTypes:true})){if(d.isFile()&&!/\.sqlite(?:-(?:wal|shm))?$/.test(d.name))selected.add(rel+'/'+d.name);}};
await addFlat('repro');await addFlat('evidence');
for(const d of await fs.readdir(path.join(audit,'agents'),{withFileTypes:true}))if(d.isDirectory())await addFlat('agents/'+d.name);
for(const c of matrix.capabilities)for(const p of c.evidence)selected.add(p);
for(const f of findings.findings)for(const p of f.evidence)selected.add(p);
const report=await fs.readFile(path.join(audit,'REPORT.md'),'utf8');const localLinks=[];
for(const match of report.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)){const target=match[1];if(/^https?:/.test(target))continue;const clean=target.split('#')[0];localLinks.push(clean);if(clean!=='EVIDENCE_MANIFEST.json'){await fs.access(path.join(audit,clean));selected.add(clean);}}
const rows=[];for(const rel of [...selected].sort()){const resolved=path.resolve(audit,rel);assert.ok(resolved.startsWith(audit+path.sep),'Evidence outside audit root');const b=await fs.readFile(resolved);rows.push({path:rel,bytes:b.length,sha256:hash(b)});}
const output={schemaVersion:1,createdAt:new Date().toISOString(),snapshotHead:head,manifestSha256:hash(JSON.stringify(rows)),files:rows,checks:{matrixCapabilities:matrix.capabilities.length,counts,sums,scoreRecalculated:true,referencedCapabilityEvidenceExists:true,referencedFindingEvidenceExists:true,reportLocalLinks:localLinks.length,allReportLinksExist:true,sourceIdentityVerified:true},selection:'Audit outputs, flat evidence/repro/agent receipts and all explicitly referenced capability/finding/report evidence. Manifest does not hash itself. Large source/toolchain/mutant copies, raw Wrangler diagnostics and disposable SQLite stores are excluded except explicitly linked receipts; this is a SHA-256 inventory, not a signature or semantic proof.'};
await write('EVIDENCE_MANIFEST.json',output);
console.log(JSON.stringify({identity:'PASS',sourceComparisons:comparisons,discrepancies:0,evidenceFiles:rows.length,evidenceManifestSha256:output.manifestSha256,score,progressPhase:progress.phase},null,2));
