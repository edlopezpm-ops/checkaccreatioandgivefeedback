import {pathToFileURL,fileURLToPath} from 'node:url';
import {writeFileSync} from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const out=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(out,'../../snapshot');
const load=(p:string)=>import(pathToFileURL(path.join(root,p)).href);
const {harness,POLICY_AUTHORIZATION,POLICY_CONTINUATION}=await load('tests/helpers/accountHarness.ts');
const {oidcStore}=await load('functions/_lib/auth/oidc-store.ts');
const results=[];
for(const withProof of [false,true])for(const action of ['data','delete','authorize']){
 const h=await harness();Object.assign(h.env,{ACCOUNT_OIDC_ENABLED:'true',ACCOUNT_EMAIL_ENCRYPTION_KEY:'1'.repeat(64),ACCOUNT_EMAIL_LOOKUP_KEY:'2'.repeat(64),ACCOUNT_AUTH_LOCATOR_KEY:'3'.repeat(64),ACCOUNT_OIDC_TRANSACTION_KEY:'4'.repeat(64),GOOGLE_CLIENT_ID:'rollback.apps.googleusercontent.com',GOOGLE_CLIENT_SECRET:'fixture-only-secret',GOOGLE_REDIRECT_URI:'https://accreatio.pages.dev/api/auth/v1/oidc/google/callback'});
 const store=oidcStore(h.env,h.dependencies),id=crypto.randomUUID(),stateHash=crypto.randomUUID(),browserHash=crypto.randomUUID(),claimNonce=crypto.randomUUID();
 await store.createTransaction({id,stateHash,browserHash,ipHash:crypto.randomUUID(),secretsCiphertext:'fixture-envelope',returnMode:'popup',previousSessionTokenHash:null,policyAuthorization:POLICY_AUTHORIZATION});assert.ok(await store.claimTransaction({stateHash,browserHash,claimNonce}));
 const token=Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString('hex');const hash=Buffer.from(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(token))).toString('hex');
 await store.completeGoogleLogin({transactionId:id,claimNonce,identity:{issuer:'https://accounts.google.com',subject:'rollback-subject',email:'rollback@gmail.com',emailVerified:true,authoritativeEmail:true,hostedDomain:null},sessionTokenHash:hash});
 const cookie=`__Host-accreatio_session=${token}`;assert.equal((await h.call('policy',{cookie,body:POLICY_CONTINUATION})).status,200);
 if(withProof&&action!=='authorize')await h.controlProof(cookie,action);
 let revocationHookCalls=0;const batch=h.db.batch.bind(h.db);h.db.batch=async(statements:any[])=>{revocationHookCalls++;h.db.sqlite.prepare('DELETE FROM account_sessions WHERE token_hash=?').run(hash);return batch(statements)};
 const response=await h.call(action,{cookie,method:action==='data'?'GET':'POST',...(action==='authorize'?{body:{operationId:crypto.randomUUID()}}:{})});
 const data=await response.json();results.push({action,withActionProof:withProof,status:response.status,error:data.error?.code,revocationHookCalls});
 assert.notEqual(response.status,200);assert.equal(revocationHookCalls,action==='authorize'||withProof?1:0);
 h.db.sqlite.close();
}
const receipt={finding:'B-W01',testsSubject:'tests/accountRollback.test.ts:318-354',oracle:'The alleged race requires executing the injected revocation hook. An early reauthentication rejection does not exercise that race.',results};writeFileSync(path.join(out,'weak-rollback-results.json'),JSON.stringify(receipt,null,2));console.log(JSON.stringify(receipt,null,2));
