import * as guided from '../src/journey-state.js';
import * as play from '../src/play-state.js';
const engine=r=>r.mode==='play'?play:guided;
export const TTL=24*60*60*1000;
const fail=message=>{throw new Error(message);};
export function member(id,name,now){if(typeof name!=='string'||!name.trim()||name.trim().length>24)fail('Wähle einen Namen mit 1–24 Zeichen.');return {id,name:name.trim(),seen:now,records:{},ready:false};}
export function createRoom(id,name,now,mode='guided'){const {freshState}=mode==='play'?play:guided;return {version:1,mode:mode==='play'?'play':'guided',revision:0,epoch:0,history:[],expires:now+(mode==='play'?7*TTL:TTL),host:id,started:false,state:freshState(),members:[member(id,name,now)]};}
export function actor(r){const {stages}=engine(r);if(r.mode==='play')return r.members[stages[r.state.step].roleIndex%r.members.length].id;const s=r.state,id=stages[s.step].id;const index={baronin:0,sophie:1,carl:2,julie:3,book:4}[id]??(id==='opening'?s.moves.length/2:id==='room'?s.ruleIndex:s.step);return r.members[index%r.members.length].id;}
export function complete(r){const {stages,ratingStages,canAdvance}=engine(r);const id=stages[r.state.step].id;return ratingStages.includes(id)?r.members.every(m=>canAdvance({...r.state,records:m.records})):canAdvance(r.state);}
export function snapshot(r,id,now){const {stages,ratingStages}=engine(r);const me=r.members.find(m=>m.id===id);if(!me)fail('Dein Zugang ist nicht mehr gültig.');const current=stages[r.state.step].id;const comparisons={};for(const stage of ratingStages){if(r.members.every(m=>m.records[stage]))comparisons[stage]=r.members.map(m=>({name:m.name,...m.records[stage]}));}return {mode:r.mode||'guided',revision:r.revision,epoch:r.epoch||0,canUndo:!!r.history?.length,expires:r.expires,host:r.host,started:r.started,me:id,actor:actor(r),complete:complete(r),submitted:!!me.records[current],comparisons,state:{...r.state,records:me.records},members:r.members.map(m=>({id:m.id,name:m.name,ready:m.ready,online:now-m.seen<60000,submitted:!!m.records[current]}))};}
export function updateRoom(r,id,event,now){
 const {freshState,stages,ratingStages,act,canAdvance}=engine(r);
 if(now>=r.expires)fail('Dieser Raum ist abgelaufen. Erstelle einen neuen Raum.');
 if(event.type==='join'){if(r.started)fail('Die Partie läuft bereits. Neue Personen können nur vor dem Start beitreten.');if(r.members.length>=5)fail('Dieser Raum ist mit fünf Personen voll.');r.members.push(member(id,event.name,now));r.revision++;return;}
 const me=r.members.find(m=>m.id===id);if(!me)fail('Dein Zugang ist nicht mehr gültig.');me.seen=now;
 if(event.type==='poll')return;
 if((event.epoch??0)!==(r.epoch||0))fail('Die Partie wurde zurückgesetzt oder ein Zug zurückgenommen. Bitte lade den aktuellen Stand.');
 if(['record','ready'].includes(event.type)?event.step!==r.state.step:event.revision!==r.revision)fail('Der Spielstand hat sich geändert. Bitte versuche deinen Zug erneut.');
 if(event.type==='close'){if(id!==r.host)fail('Nur die Raumleitung kann den Raum schliessen.');r.closed=true;return;}
 if(event.type==='claim'){if(now-r.members.find(m=>m.id===r.host).seen<60000)fail('Die Raumleitung ist noch verbunden.');r.host=id;r.revision++;return;}
 if(event.type==='remove'){if(id!==r.host||event.target===id)fail('Nur die Raumleitung kann andere Personen entfernen.');const target=r.members.find(m=>m.id===event.target);if(!target||now-target.seen<60000)fail('Nur seit einer Minute getrennte Personen können entfernt werden.');if(r.started&&r.members.length<=2)fail('Eine laufende Partie braucht mindestens zwei Personen.');r.members=r.members.filter(m=>m!==target);r.members.forEach(m=>m.ready=false);r.revision++;return;}
 if(['undo','reset'].includes(event.type)){if(id!==r.host||!r.started)fail('Nur die Raumleitung kann die laufende Partie zurücksetzen.');if(event.type==='undo'){const previous=r.history?.pop();if(!previous)fail('Es gibt noch keinen Schritt zum Zurücknehmen.');r.state=previous.state;for(const m of r.members)m.records=previous.records[m.id]||{};}else{r.state=freshState();r.history=[];for(const m of r.members)m.records={};}r.members.forEach(m=>m.ready=false);r.epoch=(r.epoch||0)+1;r.revision++;return;}
 const previous={state:structuredClone(r.state),records:Object.fromEntries(r.members.map(m=>[m.id,structuredClone(m.records)]))};
 if(event.type==='start'){if(id!==r.host||r.started||r.members.length<2)fail('Die Raumleitung kann mit 2–5 Personen starten.');r.started=true;}
 else {
 if(!r.started)fail('Warte auf den gemeinsamen Start.');
 if(event.type==='ready'){if(!complete(r))fail('Zuerst müssen die Aufgabe und alle Urteile abgeschlossen sein.');me.ready=event.ready===true;}
 else if(event.type==='next'){if(id!==r.host||!complete(r)||!r.members.every(m=>m.ready))fail('Alle müssen bereit sein; dann geht die Raumleitung weiter.');r.state.step++;if(r.mode==='play'){r.state.opened=false;r.state.tableau=null;}r.members.forEach(m=>m.ready=false);}
 else if(event.type==='record'){const key=stages[r.state.step].id;if(me.records[key])fail('Dein abgegebenes Urteil steht für diese Szene fest.');const result=act({...r.state,records:me.records},event);if(!result.changed||!canAdvance(result.state))fail(r.mode==='play'?'Gestaltet zuerst den Regiezug und begründet eure Beobachtungen mit mindestens 12 Zeichen.':'Formuliere dein Urteil mit mindestens 12 Zeichen und öffne gegebenenfalls alle Prüfsteine.');me.records=result.state.records;}
 else {if(event.type==='route'&&!['gift','debt','listen'].includes(event.route))fail('Unbekannter Plan.');if(id!==actor(r))fail('In dieser Szene handelt die angezeigte Person.');const result=act(r.state,event);if(!result.changed)fail(result.notice);r.state=result.state;r.state.records={};r.members.forEach(m=>m.ready=false);}
 }
 if(!['start','ready'].includes(event.type)&&JSON.stringify(previous)!==JSON.stringify({state:r.state,records:Object.fromEntries(r.members.map(m=>[m.id,m.records]))})){r.history??=[];r.history.push(previous);r.history=r.history.slice(-80);while(new TextEncoder().encode(JSON.stringify(r.history)).length>524288)r.history.shift();}
 r.revision++;
}
