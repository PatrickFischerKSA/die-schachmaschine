import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {stages,freshState} from '../src/play-state.js';
import {scenarios,people} from '../src/ensemble-model.js';
import {readFile} from 'node:fs/promises';
const browser=await chromium.launch({headless:true,args:['--enable-webgl','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const url=process.env.TEST_URL||'http://127.0.0.1:5173';
async function openAt(pageId){
  const p=await browser.newPage({viewport:{width:1440,height:1100}});
  await p.addInitScript(state=>localStorage.setItem('schachmaschine-whole-play-v1',JSON.stringify(state)),{...freshState(),step:stages.findIndex(s=>s.id===pageId),opened:true});
  await p.goto(url);await p.locator('#strategy-open').click();await p.locator('#decision-open').click();return p;
}
try{
  const early=await openAt('text-1-1-0');
  assert.equal(await early.locator('#decision-scenario option').count(),2);
  assert.equal(await early.locator('#decision-person option[value="julie"]').evaluate(o=>o.disabled),true);
  assert.equal(await early.locator('#decision-scenario option[value="sophie"]').count(),0);await early.close();
  const p=await openAt('text-4-2-0'),errors=[];p.on('pageerror',e=>errors.push(e.message));
  assert.equal(await p.locator('#decision-scenario option').count(),13);
  assert.equal(await p.locator('#decision-person option:not([disabled])').count(),15);
  for(const s of scenarios.filter(s=>s.events)){
    await p.locator('#decision-person').selectOption(s.focus);
    assert.equal(await p.locator('#decision-scenario').inputValue(),s.id);
    await p.locator('#decision-condition').selectOption('changed');
    await p.locator('#decision-finish').click();
    const a=await p.locator('[data-run="0"]>p').first().textContent(),b=await p.locator('[data-run="1"]>p').first().textContent();assert.notEqual(a,b,s.id);
    assert.equal(await p.locator('[data-run="0"] .decision-trace>li').count(),12);
    for(const id of Object.keys(s.actors))assert.equal(await p.locator('.decision-actor[data-actor="'+id+'"]').count(),2);
  }
  for(const id of ['carl','first','second']){await p.locator('#decision-person').selectOption(id);assert.equal(await p.locator('#decision-scenario').inputValue(),'carriers');}
  await p.locator('#decision-person').selectOption('julie');await p.locator('#decision-condition').selectOption('changed');await p.locator('#decision-finish').click();
  const col=p.locator('[data-run="0"]'),board=col.locator('.decision-board');
  await col.getByRole('button',{name:'Näher +',exact:true}).click();const zoom=Number(await board.getAttribute('data-camera-distance'));
  await col.getByRole('button',{name:'Blick von Julie',exact:true}).click();assert.ok(Math.abs(Number(await board.getAttribute('data-camera-distance'))-zoom)<.001);
  await col.getByRole('button',{name:'Draufsicht',exact:true}).click();assert.ok(Math.abs(Number(await board.getAttribute('data-camera-distance'))-zoom)<.001);
  await p.getByRole('button',{name:'Schritt zurück',exact:true}).click();assert.equal(await col.locator('.decision-trace>li').count(),0);
  assert.ok(Math.abs(Number(await board.getAttribute('data-camera-distance'))-zoom)<.001);
  await p.locator('#decision-step').click();await col.getByRole('button',{name:'Originalbezug',exact:true}).first().click();
  const source=p.getByRole('dialog',{name:'Textbeleg im Zusammenhang'});assert.equal(await source.locator('mark').textContent(),'aber nicht zum Lieben.');await source.getByRole('button',{name:'Schliessen',exact:true}).click();
  await p.locator('#decision-mode').selectOption('blind');await p.locator('#decision-finish').click();assert.equal(await p.locator('.decision-actor').count(),0);
  const exported=p.waitForEvent('download');await p.getByRole('button',{name:'Versuch und Protokolle sichern'}).click();const dl=await exported;
  const data=JSON.parse(await readFile(await dl.path(),'utf8'));assert.equal(data.scenario,'julie');assert.equal(data.runs,undefined);assert.equal(data.outputs.length,2);
  await p.locator('#decision-verdict').fill('Das eine Verfahren respektiert die Grenze und verändert die nächste Handlung.');await p.locator('#decision-reveal').click();assert.equal(await p.locator('.decision-actor').count(),4);
  await p.locator('#decision-critique').fill('Druckentlastung darf keine Zustimmung erzeugen.');await p.locator('#decision-person').selectOption('graf');await p.locator('#decision-person').selectOption('julie');assert.match(await p.locator('#decision-critique').inputValue(),/Druckentlastung/);
  await p.locator('#decision-condition').selectOption('changed');await p.locator('#decision-finish').click();
  await p.locator('#decision-mode').selectOption('counterfactual');await p.locator('#decision-finish').click();await p.locator('.decision-dialog').evaluate(d=>d.scrollTop=0);await p.screenshot({path:'/tmp/ensemble-desktop.png'});
  await p.locator('[data-run="0"] .decision-board').scrollIntoViewIfNeeded();await p.screenshot({path:'/tmp/ensemble-boards.png'});
  await p.setViewportSize({width:390,height:844});await p.locator('.decision-dialog').evaluate(d=>d.scrollTop=0);
  assert.ok(await p.evaluate(()=>{const d=document.querySelector('.decision-dialog');return d.scrollWidth<=d.clientWidth+1&&document.documentElement.scrollWidth<=innerWidth;}));
  await p.screenshot({path:'/tmp/ensemble-mobile.png'});
  await p.locator('.decision-dialog .strategy-close').click();await p.locator('#decision-open').click();assert.ok(await p.locator('.decision-dialog').isVisible());assert.deepEqual(errors,[]);
  console.log('PASS: all 15 actors, 13 studies, reading gates, causal comparisons, camera zoom, sources, undo, blind export/reveal and mobile.');
}finally{await browser.close();}
