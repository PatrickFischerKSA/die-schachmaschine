import {test} from 'node:test';
import assert from 'node:assert/strict';
import pages from '../src/play-pages.json' with {type:'json'};
import {scenarios,people,availableScenarios,conditionsFor,createRun,stepRun,finishRun,agentContext,validateProposal,stageFor} from '../src/ensemble-model.js';
const actions=r=>r.trace.filter(t=>t.action).map(t=>[t.actor,t.action]);

test('All named acting perspectives have a decision; every new study is grounded in exact, already opened text',()=>{
  assert.equal(scenarios.length,13);
  for(const id of Object.keys(people))assert.ok(scenarios.some(s=>s.actors[id]),id);
  for(const s of scenarios){
    assert.ok(!availableScenarios(s.page-1).some(x=>x.id===s.id));
    assert.ok(availableScenarios(s.page).some(x=>x.id===s.id));
    for(const e of s.events||[]){assert.equal(pages[e.source.page].text.slice(e.source.start,e.source.end),e.source.text);assert.ok(e.source.page<=s.page);}
    const run=finishRun(createRun(s.id));
    for(const id of Object.keys(s.actors))assert.ok(actions(run).some(([actor])=>actor===id),s.id+': '+id+' must actually act');
  }
});
test('Every new counterfactual changes executed action and outcome; fixed rules and goal model diverge',()=>{
  for(const s of scenarios.filter(s=>s.events)){
    const initial=createRun(s.id),base=finishRun(initial),changed=finishRun(createRun(s.id,'goals',{changed:true})),rules=finishRun(createRun(s.id,'rules',{changed:true}));
    assert.equal(initial.trace.length,0);assert.equal(base.trace.length,12);assert.equal(changed.trace.length,12);
    assert.notDeepEqual(actions(base),actions(changed),s.id);assert.notEqual(base.outcome,changed.outcome,s.id);
    assert.deepEqual(actions(base),actions(rules),s.id);assert.notDeepEqual(actions(changed),actions(rules),s.id);
    assert.ok(Object.values(changed.actors).every(a=>a.action&&a.perceived.length&&a.beliefs.length),s.id);
    assert.ok(stageFor(changed).edges.every(e=>changed.actors[e.from]&&changed.actors[e.to]));
    assert.ok(base.trace.every(t=>t.worldBefore&&t.world&&t.before&&t.after));
    assert.equal(Object.keys(conditionsFor(s).changed[1]).length,1);
  }
});
test('Julie never acquires consent through pressure relief; other actors never acquire her missing answer',()=>{
  for(const changed of [false,true]){
    const julie=finishRun(createRun('julie','goals',{changed}));assert.equal(julie.world.consent,false);
    const graf=finishRun(createRun('graf','goals',{changed}));assert.equal(graf.world.consentKnown,false);
    const rink=finishRun(createRun('rink','goals',{changed}));assert.equal(rink.actors.julie,undefined);assert.match(rink.actors.rink.unknown,/nicht eingeholt/);
    const servant=finishRun(createRun('bedienter','goals',{changed}));assert.equal(servant.world.verified,false);
  }
});
test('Withheld information is not leaked by action broadcasts to the other figure or external proposer',()=>{
  let run=createRun('sophie','goals',{changed:true});
  for(let i=0;i<4;i++)run=stepRun(run);
  const carl=agentContext(run,'carl');assert.equal(carl.evidence.length,0);assert.equal(carl.allowedActions.length,0);assert.equal(run.world.shared,false);
  assert.ok(!JSON.stringify(carl).includes('heute in einem Kasten'));
  for(let i=0;i<3;i++)run=stepRun(run);
  const ctx=agentContext(run,'carl');assert.deepEqual(ctx.evidence.map(e=>e.id),['1']);
  assert.equal(validateProposal({action:'request',evidenceIds:['1']},ctx),'');
  assert.match(validateProposal({action:'request',evidenceIds:['0']},ctx),/Informationszugang/);
  const done=finishRun(run);assert.equal(done.world.personalConsent,false);assert.equal(done.actors.carl.action,'request');
});
test('Practical knowledge, independence, and conditions change the actual next action',()=>{
  const variants={marie:['execute','limited-work'],wendheim:['reject-help','accept-help'],flucht:['order-substitute','order-original'],frey:['assist','pause']};
  for(const [id,expected]of Object.entries(variants))for(const [i,changed]of [false,true].entries())assert.equal(finishRun(createRun(id,'goals',{changed})).actors[id].action,expected[i]);
});
