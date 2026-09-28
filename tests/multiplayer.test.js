import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createRoom,updateRoom,snapshot,actor,TTL} from '../multiplayer/room.js';
import {stages,choiceSets,ratingStages} from '../src/journey-state.js';
const run=(r,id,event,now=100)=>updateRoom(r,id,{ready:true,...event,step:r.state.step,revision:r.revision},now);
for(const count of [2,5])test(`${count} players complete all scenes with private judgments and rotating roles`,()=>{
 const r=createRoom('0','Person 0',0);for(let i=1;i<count;i++)run(r,''+i,{type:'join',name:'Person '+i});
 if(count===5)assert.throws(()=>run(r,'extra',{type:'join',name:'Extra'}),/voll/);
 run(r,'0',{type:'start'});assert.throws(()=>run(r,'late',{type:'join',name:'Late'}),/läuft/);
 for(const s of stages){if(s.id==='ending')break;const perform=e=>run(r,actor(r),e);
 switch(s.id){
 case 'opening':assert.throws(()=>run(r,'1',{type:'move',from:'e2',to:'e4'}),/angezeigte/);perform({type:'move',from:'e2',to:'e4'});perform({type:'move',from:'g1',to:'f3'});break;
 case 'investigate':perform({type:'inspect',target:'Mechanik'});perform({type:'reveal'});break;
 case 'baronin':perform({type:'route',route:'gift'});perform({type:'move',from:'e7',to:'d4'});break;
 case 'sophie':perform({type:'message',to:'carl'});break;
 case 'carl':perform({type:'plan',plan:'box'});break;
 case 'julie':perform({type:'consent'});perform({type:'move',from:'f3',to:'d3'});break;
 case 'book':perform({type:'move',from:'e2',to:'e4'});perform({type:'move',from:'e7',to:'e5'});break;
 case 'room':for(const to of ['c6','f5','e6'])perform({type:'move',from:'a2',to});break;
 case 'output':perform({type:'output',text:'Eine bewusst verfasste Antwort zum gemeinsamen Prüfen.',origin:'Redaktioneller Textvergleich – keine KI-Inferenz'});break;
 case 'audit':for(const target of ['Sprache','Beleg','Schlussfolgerung'])perform({type:'check',target});break;
 case 'network':for(const target of ['Daten','Training','Inferenz'])perform({type:'check',target});break;
 }
 if(ratingStages.includes(s.id)){for(let i=0;i<count;i++){run(r,''+i,{type:'record',choice:choiceSets[s.id][i%3],reason:'Mein eigener begründeter Befund '+i});if(i<count-1){assert.equal(snapshot(r,'0',100).comparisons[s.id],undefined);assert.deepEqual(snapshot(r,''+(i+1),100).state.records[s.id],undefined);}}assert.equal(snapshot(r,'0',100).comparisons[s.id].length,count);assert.throws(()=>run(r,'0',{type:'record',choice:choiceSets[s.id][0],reason:'Nachträglich manipuliert'}),/steht/);}
 assert.throws(()=>run(r,'0',{type:'next'}),/Alle/);for(let i=0;i<count;i++)run(r,''+i,{type:'ready'});run(r,'0',{type:'next'});
 }
 assert.equal(r.state.step,19);assert.equal(Object.keys(snapshot(r,'0',100).comparisons).length,8);
});
test('stale revisions, unknown members, expiry and host recovery',()=>{const r=createRoom('a','A',0);run(r,'b',{type:'join',name:'B'});assert.throws(()=>updateRoom(r,'a',{type:'start',revision:0},200),/geändert/);assert.throws(()=>run(r,'x',{type:'poll'}),/Zugang/);assert.throws(()=>run(r,'b',{type:'claim'},300),/verbunden/);run(r,'b',{type:'claim'},61000);assert.equal(r.host,'b');run(r,'b',{type:'remove',target:'a'},62000);assert.equal(r.members.length,1);assert.throws(()=>run(r,'b',{type:'poll'},TTL),/abgelaufen/);});
