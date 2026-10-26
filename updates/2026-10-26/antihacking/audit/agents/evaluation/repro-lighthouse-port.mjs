import {createServer} from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawn,spawnSync} from 'node:child_process';
const out=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(out,'../../snapshot');
const fixture=path.join(out,'mutants','lighthouse-preoccupied-port');
await fs.mkdir(path.join(fixture,'scripts'),{recursive:true});
await fs.mkdir(path.join(fixture,'node_modules'),{recursive:true});
await fs.cp(path.join(root,'node_modules/vite'),path.join(fixture,'node_modules/vite'),{recursive:true});
await fs.mkdir(path.join(fixture,'dist'),{recursive:true});
await fs.writeFile(path.join(fixture,'dist/index.html'),'<!doctype html><html lang="en"><title>Expected fixture artifact</title><h1>This distinct artifact must be served by Vite</h1></html>');
const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="A synthetic local audit fixture with no accreatio code."><title>Independent local audit fixture</title><link rel="icon" href="data:,"></head><body><main><h1>Independent local audit fixture</h1><p>This page contains no accreatio build or capabilities.</p></main></body></html>';
let requests=0;
const server=createServer((_req,res)=>{requests++;res.writeHead(200,{'Content-Type':'text/html'});res.end(html)});
await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(4237,'127.0.0.1',resolve)});
const realPreviewControl=spawnSync(process.execPath,[path.join(fixture,'node_modules/vite/bin/vite.js'),'preview','--host','127.0.0.1','--port','4237','--strictPort'],{cwd:fixture,encoding:'utf8',windowsHide:true,timeout:8000});
const original=await fs.readFile(path.join(root,'scripts/lighthouse-check.mjs'),'utf8');
const tested=original.replace('const PORT = 4174;','const PORT = 4237;').replaceAll('9222','9238');
await fs.writeFile(path.join(fixture,'scripts/lighthouse-check.mjs'),tested);
// The exact real Vite launch is first checked above: the preoccupied port
// makes it fail. The retained verifier then launches the same child with
// stdio ignored; it must not judge the already-running decoy as that build.
const start=performance.now();
const child=spawn(process.execPath,[path.join(fixture,'scripts/lighthouse-check.mjs')],{cwd:fixture,windowsHide:true,stdio:['ignore','pipe','pipe'],env:{...process.env,WRANGLER_SEND_METRICS:'false'}});
let stdout='',stderr='';child.stdout.on('data',x=>stdout+=x);child.stderr.on('data',x=>stderr+=x);
const timer=setTimeout(()=>child.kill(),60000);
const exit=await new Promise(resolve=>child.once('close',(code,signal)=>resolve({code,signal})));
clearTimeout(timer);server.closeAllConnections();await new Promise(resolve=>server.close(resolve));
let lhr=null;try{lhr=JSON.parse(await fs.readFile(path.join(fixture,'.local/logs/lighthouse/lhr.json'),'utf8'));}catch{}
const receipt={experiment:'Real Vite preview fails because another local HTTP server already occupies its port',operator:'local test configuration changes ports only; production script otherwise byte-identical',scriptPath:'scripts/lighthouse-check.mjs',previewNegativeControl:{exit:realPreviewControl.status,signal:realPreviewControl.signal,stdout:realPreviewControl.stdout,stderr:realPreviewControl.stderr},expected:'Fail: the intended fixture artifact cannot be served by its failed Vite preview',observed:{...exit,requests,stdout,stderr,scores:lhr?Object.fromEntries(Object.entries(lhr.categories).map(([k,v])=>[k,v.score])):null,finalUrl:lhr?.finalDisplayedUrl,artifactTitle:lhr?.audits['document-title']?.details??null},durationMs:performance.now()-start,scope:'Synthetic loopback fixture only. No production writes or accreatio source modifications.'};
await fs.writeFile(path.join(out,'lighthouse-port-results-v2.json'),JSON.stringify(receipt,null,2));console.log(JSON.stringify(receipt,null,2));
