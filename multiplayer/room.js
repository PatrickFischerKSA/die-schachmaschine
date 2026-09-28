import {freshState,stages,ratingStages,act,canAdvance} from '../src/journey-state.js';
export const TTL=24*60*60*1000;
const fail=message=>{throw new Error(message);};
export function member(id,name,now){if(typeof name!=='string'||!name.trim()||name.trim().length>24)fail('Wähle einen Namen mit 1–24 Zeichen.');return {id,name:name.trim(),seen:now,records:{},ready:false};}
export function createRoom(id,name,now){return {version:1,revision:0,expires:now+TTL,host:id,started:false,state:freshState(),members:[member(id,name,now)]};}
export function actor(r){const s=r.state,id=stages[s.step].id;const index={baronin:0,sophie:1,carl:2,julie:3,book:4}[id]??(id==='opening'?s.moves.length/2:id==='room'?s.ruleIndex:s.step);return r.members[index%r.members.length].id;}
export function complete(r){const id=stages[r.state.step].id;return ratingStages.includes(id)?r.members.every(m=>canAdvance({...r.state,records:m.records})):canAdvance(r.state);}
export function snapshot(r,id,now){const me=r.members.find(m=>m.id===id);if(!me)fail('Dein Zugang ist nicht mehr gültig.');const current=stages[r.state.step].id;const comparisons={};for(const stage of ratingStages){if(r.members.every(m=>m.records[stage]))comparisons[stage]=r.members.map(m=>({name:m.name,...m.records[stage]}));}return {revision:r.revision,expires:r.expires,host:r.host,started:r.started,me:id,actor:actor(r),complete:complete(r),submitted:!!me.records[current],comparisons,state:{...r.state,records:me.records},members:r.members.map(m=>({id:m.id,name:m.name,ready:m.ready,online:now-m.seen<60000,submitted:!!m.records[current]}))};}
export function updateRoom(r,id,event,now){
 if(now>=r.expires)fail('Dieser Raum ist abgelaufen. Erstelle einen neuen Raum.');
 if(event.type==='join'){if(r.started)fail('Die Partie läuft bereits. Neue Personen können nur vor dem Start beitreten.');if(r.members.length>=5)fail('Dieser Raum ist mit fünf Personen voll.');r.members.push(member(id,event.name,now));r.revision++;return;}
 const me=r.members.find(m=>m.id===id);if(!me)fail('Dein Zugang ist nicht mehr gültig.');me.seen=now;
 if(event.type==='poll')return;
 if(['record','ready'].includes(event.type)?event.step!==r.state.step:event.revision!==r.revision)fail('Der Spielstand hat sich geändert. Bitte versuche deinen Zug erneut.');
 if(event.type==='close'){if(id!==r.host)fail('Nur die Raumleitung kann den Raum schliessen.');r.closed=true;return;}
 if(event.type==='claim'){if(now-r.members.find(m=>m.id===r.host).seen<60000)fail('Die Raumleitung ist noch verbunden.');r.host=id;r.revision++;return;}
 if(event.type==='remove'){if(id!==r.host||event.target===id)fail('Nur die Raumleitung kann andere Personen entfernen.');const target=r.members.find(m=>m.id===event.target);if(!target||now-target.seen<60000)fail('Nur seit einer Minute getrennte Personen können entfernt werden.');if(r.started&&r.members.length<=2)fail('Eine laufende Partie braucht mindestens zwei Personen.');r.members=r.members.filter(m=>m!==target);r.members.forEach(m=>m.ready=false);r.revision++;return;}
 if(event.type==='start'){if(id!==r.host||r.started||r.members.length<2)fail('Die Raumleitung kann mit 2–5 Personen starten.');r.started=true;}
 else {
 if(!r.started)fail('Warte auf den gemeinsamen Start.');
 if(event.type==='ready'){if(!complete(r))fail('Zuerst müssen die Aufgabe und alle Urteile abgeschlossen sein.');me.ready=event.ready===true;}
 else if(event.type==='next'){if(id!==r.host||!complete(r)||!r.members.every(m=>m.ready))fail('Alle müssen bereit sein; dann geht die Raumleitung weiter.');r.state.step++;r.members.forEach(m=>m.ready=false);}
 else if(event.type==='record'){const key=stages[r.state.step].id;if(me.records[key])fail('Dein abgegebenes Urteil steht für diese Szene fest.');const result=act({...r.state,records:me.records},event);if(!result.changed||!canAdvance(result.state))fail('Wähle eine Position, begründe sie mit mindestens 12 Zeichen und öffne gegebenenfalls alle Prüfsteine.');me.records=result.state.records;}
 else {if(event.type==='route'&&!['gift','debt','listen'].includes(event.route))fail('Unbekannter Plan.');if(id!==actor(r))fail('In dieser Szene handelt die angezeigte Person.');const result=act(r.state,event);if(!result.changed)fail(result.notice);r.state=result.state;r.state.records={};r.members.forEach(m=>m.ready=false);}
 }
 r.revision++;
}
