import assert from 'node:assert/strict';
import React from 'react';
import {pathToFileURL} from 'node:url';
Object.assign(globalThis,{React});
const {ReviewStage}=await import(pathToFileURL(process.argv[2]).href);
let confirms=0;
const p={name:'Independent audit 73',phase:'idea',context:'Fresh independent contract input',restrictions:'',route:'local',action:'repository',destination:'browser-download',participants:[{id:'p1',role:'generalist',label:''}],attachments:[],initializeGit:false,createRemote:false,remotePrivate:true,openIde:false,dryRun:true,orchestration:{enabled:false}};
const result=ReviewStage({isWeb:true,actions:[],copied:false,locale:'en',onChange:()=>{},onConfirm:()=>{confirms++},onCopy:()=>{},onDownload:()=>{},onStageChange:()=>{},preview:null,project:p,prompt:'Audit 73',running:false,stageStates:{foundation:'complete',context:'complete',team:'complete',delivery:'complete',review:'current'},valid:true});
function find(node){if(!node||typeof node!=='object')return; if(node.type==='button'&&node.props.className==='start')return node;for(const child of [].concat(node.props?.children??[])){const f=find(child);if(f)return f;}}
const button=find(result);assert.ok(button,'confirmation button must exist');assert.equal(button.props.disabled,false);button.props.onClick();assert.equal(confirms,1,'one enabled confirmation activation must invoke onConfirm exactly once');console.log('PASS independent confirmation callback oracle');
