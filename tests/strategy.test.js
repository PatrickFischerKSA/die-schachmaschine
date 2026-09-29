import {test} from 'node:test';import assert from 'node:assert/strict';
import {pages,stages} from '../src/play-state.js';
import {innerProfiles,profilesAt,perspectiveFacts} from '../src/inner-perspectives.js';
test('All acting roles, including individual carriers, have exact-source interior studies',()=>{
 assert.deepEqual([...new Set(innerProfiles.map(p=>p.role))].sort((a,b)=>a-b),Array.from({length:13},(_,i)=>i+1));
 for(const p of innerProfiles){const page=pages.find(x=>x.id===p.page);assert.equal(page.text.slice(p.start,p.start+p.needle.length),p.needle);for(const key of ['goal','tactic','other','risk','alternative'])assert.ok(p[key].length>12);}
 assert.ok(innerProfiles.some(p=>p.name==='Erster Träger'));assert.ok(innerProfiles.some(p=>p.name==='Zweiter Träger'));
});
test('Interior studies respect unopened pages and earlier reading positions',()=>{
 for(const p of innerProfiles){const stage=stages.find(s=>s.id===p.page);assert.equal(profilesAt(p.role,stage,false).includes(p),false);assert.equal(profilesAt(p.role,stage,true).includes(p),true);}
 const before=stages.find(s=>s.id==='text-4-8-0');const f=perspectiveFacts(1,before,false).find(f=>f.id===7);assert.equal(f.known,false);assert.equal(perspectiveFacts(5,before,false).find(f=>f.id===7).known,true);assert.equal(perspectiveFacts(1,before,true).find(f=>f.id===7).known,true);
});
