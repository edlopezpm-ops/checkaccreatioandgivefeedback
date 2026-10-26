import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {spawn} from 'node:child_process';
import {chromium} from 'playwright';
import {unzipSync,strFromU8} from 'fflate';
const audit=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),base=path.join(audit,'snapshot');
const {harness}=await import(pathToFileURL(path.join(base,'tests/helpers/accountHarness.ts')).href);
const {handleCollection}=await import(pathToFileURL(path.join(base,'functions/_lib/collection.ts')).href);
const h=await harness();h.db.now=Date.now();h.db.sqlite.exec(await fs.readFile(path.join(base,'migrations-auth/0009_optional_collection.sql'),'utf8'));
const server=spawn(process.execPath,[path.join(base,'node_modules/vite/bin/vite.js'),'preview','--host','127.0.0.1','--port','4188','--strictPort'],{cwd:base,stdio:'ignore',windowsHide:true});
const target='http://127.0.0.1:4188';
let ready=false;for(let i=0;i<100;i++){try{if((await fetch(target)).ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,100));}assert.ok(ready);
const browser=await chromium.launch({headless:true});const context=await browser.newContext({serviceWorkers:'block',reducedMotion:'reduce'});const page=await context.newPage();
const network=[],pageErrors=[],results=[];let authorized=0;
page.on('pageerror',e=>pageErrors.push(e.message));page.on('request',r=>network.push({url:r.url(),method:r.method(),body:r.postData()}));
await page.route('**/api/**',async route=>{
 const req=route.request(),u=new URL(req.url());const fulfill=(obj,status=200)=>route.fulfill({status,contentType:'application/json',body:JSON.stringify(obj)});
 if(u.pathname.startsWith('/api/collect/')){const r=await handleCollection({env:{...h.env,COLLECT_ENABLED:'true'},request:new Request(req.url(),{method:req.method(),headers:req.headers(),...(req.method()==='POST'?{body:req.postData()}: {})})},u.pathname.split('/').at(-1));return route.fulfill({status:r.status,headers:Object.fromEntries(r.headers),body:await r.text()});}
 if(u.pathname==='/api/auth/v1/methods')return fulfill({version:'auth.v1',methods:{google:{available:true},github:{available:false},emailOtp:{available:false}}});
 if(u.pathname==='/api/account/session')return fulfill({ownerKey:'v1:'+'7'.repeat(64),sessionKey:'v1:'+'9'.repeat(64),email:'audit-ui@example.test',displayName:'Audit fixture',expiresAt:new Date(Date.now()+3600000).toISOString(),remaining:5,nextAvailableAt:null,policyAuthorizationRequired:false,connectedProviders:['google']});
 if(u.pathname==='/api/account/authorize'){authorized++;const body=JSON.parse(req.postData());const now=Date.now();return fulfill({operationId:body.operationId,issuedAt:new Date(now).toISOString(),retryExpiresAt:new Date(now+172800000).toISOString(),remaining:4,nextAvailableAt:null});}
 if(u.pathname==='/api/admin/blog/session')return fulfill({error:{code:'access_required'}},401);
 if(u.pathname==='/api/blog/posts')return fulfill({posts:[],nextCursor:null});
 return fulfill({error:{code:'unsupported_fixture_endpoint'}},400);
});
try{
 await page.goto(target+'/?view=project&lang=en');await page.locator('#project-name').waitFor();
 await page.getByRole('button',{name:'Privacy',exact:true}).click();const dialog=page.getByRole('dialog',{name:'Privacy',exact:true});
 await dialog.getByRole('button',{name:'Accept all optional',exact:true}).click();await page.waitForFunction(()=>document.querySelector('.cookie-preferences-dialog').innerText.includes('Analytics enabled.'));
 await dialog.getByRole('button',{name:'Close',exact:true}).click();await page.getByRole('button',{name:'Privacy',exact:true}).click();
 await page.waitForFunction(()=>Object.keys(localStorage).some(k=>k.startsWith('accreatio:collect-capability:analytics:v2:')));
 await dialog.getByRole('button',{name:'Reject non-essential cookies',exact:true}).click();
 await page.waitForFunction(()=>JSON.parse(localStorage.getItem('accreatio:cookie-preferences')).analytics===false);
 await page.waitForFunction(()=>!Object.keys(localStorage).some(k=>k.startsWith('accreatio:collect-capability:analytics:v2:')));
 const text=await dialog.innerText();results.push({name:'integrated privacy withdrawal status',status:text.includes('Analytics enabled.')?'FAIL':'PASS',preferenceAnalytics:false,staleEnabledMessage:text.includes('Analytics enabled.'),necessaryOnlyMessage:text.includes('Saved preference: necessary only.'),oracle:'After successful withdrawal the current status must no longer say analytics enabled'});
 await page.screenshot({path:path.join(audit,'evidence/privacy-stale-integrated.png'),fullPage:true});await dialog.getByRole('button',{name:'Close',exact:true}).click();
 const marker='AUDIT_UI_PRIVATE_8391_Ñ_漢字';
 await page.locator('#project-name').fill('Bosque Ñuble 8391');await page.locator('.guided-creation__continue').click();
 await page.getByRole('button',{name:/I'm exploring the idea/}).click();
 const images=await page.evaluate(()=>{const c=document.createElement('canvas');c.width=13;c.height=17;const x=c.getContext('2d');x.fillStyle='#36a25f';x.fillRect(0,0,13,17);return ['image/png','image/jpeg'].map(type=>({name:type==='image/png'?'audit-8391.png':'audit-8391.jpg',mimeType:type,base64:c.toDataURL(type).split(',')[1]}));});
 const chooser=page.waitForEvent('filechooser');await page.getByRole('button',{name:'Add local files',exact:true}).click();await (await chooser).setFiles(images.map(i=>({name:i.name,mimeType:i.mimeType,buffer:Buffer.from(i.base64,'base64')})));
 await page.waitForFunction(()=>document.querySelectorAll('.attachment-ready').length===2);
 results.push({name:'real browser worker reconstructs novel PNG and JPEG',status:'PASS',dimensions:[13,17]});
 await page.locator('.guided-creation__continue').click();await page.locator('#project-context').fill(marker);await page.locator('.guided-creation__continue').click();await page.locator('#project-restrictions').fill('Cero coste y nunca subir datos 8391.');await page.locator('.guided-creation__continue').click();await page.locator('.review-stage').waitFor();
 assert.equal(await page.getByRole('checkbox',{name:/Check the package without downloading/}).isChecked(),true);
 await page.reload();await page.locator('.review-stage').waitFor();assert.ok((await page.locator('body').innerText()).includes('Information is missing'));
 results.push({name:'new page restores answers and blocks export until files reselected',status:'PASS'});
 await page.getByRole('button',{name:/Foundation.*edit/}).click();await page.locator('.guided-creation__continue').click();await page.getByRole('button',{name:/I'm exploring the idea/}).click();
 const reselect=page.waitForEvent('filechooser');await page.getByRole('button',{name:'Add local files',exact:true}).click();await (await reselect).setFiles(images.map(i=>({name:i.name,mimeType:i.mimeType,buffer:Buffer.from(i.base64,'base64')})));await page.waitForFunction(()=>document.querySelectorAll('.attachment-ready').length===2);await page.getByRole('button',{name:'Back to review',exact:true}).click();
 const dry=page.getByRole('checkbox',{name:/Check the package without downloading/});await dry.uncheck();await page.locator('.review-stage__confirm button').click();
 const dl=page.waitForEvent('download');await page.locator('dialog .confirm').click();const download=await dl;const file=path.join(audit,'evidence/independent-ui-project.zip');await download.saveAs(file);const zip=unzipSync(await fs.readFile(file));assert.ok(strFromU8(zip['bosque-nuble-8391/PROJECT_PROMPT.md']).includes(marker));assert.equal(authorized,1);
 for(const ext of ['png','jpg']){const bytes=zip[`bosque-nuble-8391/docs/product/sources/audit-8391.${ext}`];assert.ok(bytes);const decoded=await page.evaluate(async ({b64,mime})=>{const i=new Image();i.src=`data:${mime};base64,${b64}`;await i.decode();const c=document.createElement('canvas');c.width=i.width;c.height=i.height;const x=c.getContext('2d');x.drawImage(i,0,0);return {width:i.width,height:i.height,pixel:[...x.getImageData(0,0,1,1).data]};},{b64:Buffer.from(bytes).toString('base64'),mime:ext==='png'?'image/png':'image/jpeg'});assert.equal(decoded.width,13);assert.equal(decoded.height,17);if(ext==='png')assert.deepEqual(decoded.pixel,[54,162,95,255]);}
 results.push({name:'exported reconstructed images independently decoded from downloaded ZIP',status:'PASS',dimensions:[13,17],pngPixel:[54,162,95,255]});
 const leaked=network.filter(r=>(r.body??'').includes(marker)||r.url.includes(marker));assert.equal(leaked.length,0);
 results.push({name:'downloaded built-UI ZIP contains restored novel content with no project network transmission',status:'PASS',authorized,leakedRequests:leaked.length});
 assert.equal(pageErrors.length,0);await page.screenshot({path:path.join(audit,'evidence/independent-ui-result.png'),fullPage:true});
}catch(e){results.push({name:'remaining UI sequence',status:'HARNESS_OR_PRODUCT_FAILURE',error:e.stack});await fs.writeFile(path.join(audit,'evidence/independent-ui-failure-dom.txt'),await page.locator('body').innerText());}
finally{await fs.writeFile(path.join(audit,'evidence/independent-ui-results.json'),JSON.stringify({scope:'Fresh actual Vite build; real UI, workers and collector receiver+SQLite; product account session and allowance explicitly synthetic; serviceworker blocked for isolation, separately exercised by repository smokes',results,pageErrors,network},null,2));await browser.close();server.kill();h.close?.();}
console.log(JSON.stringify(results,null,2));if(results.some(r=>r.status==='FAIL'||r.status==='HARNESS_OR_PRODUCT_FAILURE'))process.exitCode=1;
