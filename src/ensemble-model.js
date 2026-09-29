import * as carriers from './decision-model.js';
import {ensembleScenarios,people} from './decision-scenarios.js';
export {people};
const carrierScenario={
  id:'carriers',title:'Carl und die Träger · Kooperation ohne Vertrauen',focus:'carl',location:'IV/2',page:carriers.simulationPage,
  actors:Object.fromEntries(['carl','first','second'].map(id=>[id,{goal:id==='carl'?'Transport erreichen':'Entlohnung und eigene Sicherheit abwägen'}])),
  question:'Eine Zahlung kann Kooperation bewirken, ohne Zweifel an der Identität zu beseitigen. Wer kontrolliert den Transport?',
  theory:'Schachautomat und Chinesisches Zimmer: Sichtbarer Erfolg, verborgene Ausführung und Kenntnis des Auftrags fallen nicht zusammen.',
  conditions:{baseline:['Textnahe Ausgangslage',{}],identity:['Identitätssignal fehlt',{recognize:false}],money:['Erster Träger lehnt Geld ab',{refuseMoney:true}],payment:['Carl bietet kein Geld an',{payment:0}],counter:['Die Gegendrohung bleibt aus',{counter:false}]}
};
export const scenarios=[...ensembleScenarios,carrierScenario];
export const scenarioById=id=>{
  const scenario=scenarios.find(s=>s.id===id);
  if(!scenario)throw Error('Unbekannte Entscheidungssituation: '+id);
  return scenario;
};
export const availableScenarios=limit=>scenarios.filter(s=>s.page<=limit);
export const conditionsFor=s=>s.conditions||{baseline:['Textnahe Ausgangslage',{}],changed:[s.condition,{changed:true}]};
export const namesFor=run=>Object.fromEntries(Object.keys(scenarioById(run.scenario).actors).map(id=>[id,people[id].name]));
export function evidenceFor(run,id){return run.scenario==='carriers'?carriers.evidence[id]:scenarioById(run.scenario).events[Number(id)].source;}
export function createRun(id,model='goals',settings={}){
  const s=scenarioById(id);
  if(!['rules','goals'].includes(model))throw Error('Unbekanntes Verfahren');
  if(id==='carriers')return {...carriers.createRun(model,settings),scenario:id};
  return {scenario:id,model,settings:{changed:false,...settings},actors:Object.fromEntries(Object.entries(s.actors).map(([id,a])=>[id,{goal:a.goal,unknown:a.unknown,beliefs:[],perceived:[],action:null,status:'Noch keine Handlung'}])),index:0,phase:0,pending:null,world:{},relations:[],trace:[],ended:false,outcome:null};
}
export function stepRun(input){
  if(input.scenario==='carriers')return carriers.stepRun(input);
  const r=structuredClone(input);if(r.ended)return r;
  const s=scenarioById(r.scenario),e=s.events[r.index],actor=r.actors[e.actor];
  const entry={step:r.trace.length+1,event:r.index,actor:e.actor,phase:['Wahrnehmen','Annahmen ändern','Alternativen prüfen','Handeln'][r.phase],before:structuredClone(r.actors),worldBefore:structuredClone(r.world),evidence:String(r.index)};
  if(r.phase===0){
    const text=e.input(r);
    actor.perceived.push({kind:'input',text,source:String(r.index),accessible:true});
    r.pending={actor:e.actor,event:r.index};
    entry.detail=text+' (Eingang dieser Modellphase; Originalbezug separat prüfen.)';
  }
  if(r.phase===1){
    const belief={claim:e.belief(r),status:'Interpretationsannahme',source:String(r.index)};
    actor.beliefs.push(belief);entry.detail=belief.claim;
  }
  if(r.phase===2){
    r.pending.candidates=e.choices.map(c=>({action:c.id,label:c.label,score:c.when(r)?8:1,rule:c.reason}));
    r.pending.selected=r.model==='rules'?e.choices[0].id:r.pending.candidates.reduce((a,b)=>a.score>=b.score?a:b).action;
    entry.candidates=structuredClone(r.pending.candidates);
    entry.detail=r.model==='rules'?'Feste Ablaufregel: '+e.choices[0].label+'. Die veränderte Voraussetzung und Bewertungen beeinflussen die Auswahl nicht.':'Zielmodell: Die offengelegte Bedingung gewichtet eine Alternative mit 8 statt 1. Das sind redaktionell gesetzte Prioritäten, keine gemessenen Gefühle oder Wahrscheinlichkeiten.';
  }
  if(r.phase===3){
    const selected=e.choices.find(c=>c.id===r.pending.selected),fx=selected.effect;
    entry.action=selected.id;entry.detail=selected.label+' · '+fx.claim;
    actor.action=selected.id;actor.status=fx.claim;
    Object.assign(r.world,fx.facts);
    // Only the performed action is communicated. A withheld source quote is never broadcast.
    for(const [id,target]of Object.entries(r.actors))if(id!==e.actor)target.perceived.push({kind:'reaction',text:entry.detail,actor:e.actor,accessible:true});
    if(fx.to){r.relations=r.relations.filter(edge=>!(edge.from===e.actor&&edge.to===fx.to));r.relations.push({from:e.actor,to:fx.to,layer:fx.layer,effect:fx.layer==='dependence'?'control':fx.layer==='position'?'release':undefined,certainty:'inferred',label:fx.claim});}
    r.index++;r.pending=null;
    if(r.index===s.events.length){r.ended=true;r.outcome=fx.claim;}
  }
  entry.after=structuredClone(r.actors);entry.world=structuredClone(r.world);r.trace.push(entry);r.phase=(r.phase+1)%4;return r;
}
export function finishRun(run){let r=run;while(!r.ended)r=stepRun(r);return r;}
export function agentContext(run,actor){
  if(run.scenario==='carriers')return carriers.agentContext(run,actor);
  if(!run.actors[actor])throw Error('Unbekannte Figur');
  const state=structuredClone(run.actors[actor]),ids=[...new Set(state.perceived.filter(e=>e.accessible&&e.source!=null).map(e=>e.source))];
  return {role:actor,state,evidence:ids.map(id=>({id,...evidenceFor(run,id)})),allowedActions:run.pending?.actor===actor?run.pending.candidates?.map(c=>c.action)||[]:[]};
}
export const validateProposal=carriers.validateProposal;
export function stageFor(run){
  const ids=Object.keys(run.actors),positions=new Map(ids.map((id,i)=>[id,['c4','f5','f2'][i]]));
  if(run.scenario!=='carriers')return {positions,edges:run.relations};
  positions.set('carl','d4');positions.set('first',run.actors.first.cooperates?'c4':'b7');positions.set('second',run.actors.second.cooperates?'e4':'f7');
  const edges=[];
  for(const id of ['first','second']){if(run.actors[id].cooperates)edges.push({from:id,to:'carl',layer:'position',effect:'release',certainty:'inferred',label:'Transport zugesagt'});if(run.threat)edges.push({from:'carl',to:id,layer:'dependence',effect:'control',certainty:'inferred',label:'Drohung'});}
  if(run.counter)edges.push({from:'first',to:'carl',layer:'dependence',effect:'control',certainty:'inferred',label:'Gegendrohung'});
  return {positions,edges};
}
