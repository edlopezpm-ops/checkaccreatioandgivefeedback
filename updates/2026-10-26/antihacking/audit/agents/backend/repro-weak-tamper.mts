import assert from 'node:assert/strict';
import {fileURLToPath,pathToFileURL} from 'node:url';
import path from 'node:path';
import {writeFileSync} from 'node:fs';
const out=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(out,'../../snapshot');
const {revealEmail,protectEmail}=await import(pathToFileURL(path.join(root,'functions/_lib/auth/privacy.ts')).href);
const accountId='0f30d518-e21b-4624-b0de-2a41c4e02fd1';
const env={ACCOUNT_EMAIL_ENCRYPTION_KEY:'1'.repeat(64),ACCOUNT_EMAIL_LOOKUP_KEY:'2'.repeat(64),ACCOUNT_AUTH_LOCATOR_KEY:'3'.repeat(64)};
const email='example@example.test';
const key=await crypto.subtle.importKey('raw',Uint8Array.from(env.ACCOUNT_EMAIL_ENCRYPTION_KEY.match(/../g)!,v=>parseInt(v,16)),'AES-GCM',false,['encrypt']);
let row:any,attempts=0;
for(let seed=0;seed<65536;seed++){
 const iv=new Uint8Array(12);new DataView(iv.buffer).setUint32(8,seed);
 const ciphertext=Buffer.from(await crypto.subtle.encrypt({name:'AES-GCM',iv,tagLength:128,additionalData:new TextEncoder().encode(JSON.stringify(['email-v1','accreatio',accountId]))},key,new TextEncoder().encode(email))).toString('hex');attempts++;
 if(ciphertext.endsWith('ff')){row={id:accountId,email:null,email_ciphertext:`v1:${Buffer.from(iv).toString('hex')}:${ciphertext}`,email_encryption_key_version:'v1'};break;}
}
assert.ok(row,'bounded deterministic search did not find the one-byte boundary');
const selectedIv=Buffer.from(row.email_ciphertext.split(':')[1],'hex');
const originalRandom=crypto.getRandomValues.bind(crypto);
let actualCipher:any;
try {
 crypto.getRandomValues=((array:any)=>{if(array instanceof Uint8Array&&array.byteLength===12){array.set(selectedIv);return array}return originalRandom(array)}) as typeof crypto.getRandomValues;
 actualCipher=await protectEmail(email,accountId,env);
} finally {crypto.getRandomValues=originalRandom;}
assert.equal(actualCipher.ciphertext,row.email_ciphertext,'the exact product encryption emits this valid ff-suffixed ciphertext when its random IV takes this legal value');
const altered={...row,email_ciphertext:row.email_ciphertext.slice(0,-2)+'ff'};
assert.equal(altered.email_ciphertext,row.email_ciphertext);
assert.equal(await revealEmail(row,env),email);
let rejected=false;try{await assert.rejects(revealEmail(altered,env));}catch{rejected=true;}
assert.equal(rejected,true,'the supplied assert.rejects must itself fail when ciphertext is unchanged');
const actuallyChanged={...row,email_ciphertext:row.email_ciphertext.slice(0,-2)+'fe'};
assert.notEqual(actuallyChanged.email_ciphertext,row.email_ciphertext);
await assert.rejects(revealEmail(actuallyChanged,env));
const receipt={finding:'B-W02',file:'tests/accountOidcStore.test.ts',line:492,deterministicSearchAttempts:attempts,actualProtectEmailEmitsExactFixture:true,originalAlreadyEndsWithFF:true,allegedlyAlteredEqualsOriginal:true,validOriginalDecrypts:true,testAssertionFailsOnCorrectProduct:true,actuallyModifiedByteRejected:true,oracle:'Changing a cryptographic test input must actually change at least one byte; replacing a random final byte by fixed ff does not guarantee tampering.',syntheticOnly:true};
writeFileSync(path.join(out,'weak-tamper-results.json'),JSON.stringify(receipt,null,2));console.log(JSON.stringify(receipt,null,2));
