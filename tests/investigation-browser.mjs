import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {stages,freshState} from '../src/play-state.js';
const browser=await chromium.launch({headless:true,args:['--enable-webgl','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const p=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 const stage=stages.find(s=>s.id==='text-3-3-0');
 await p.addInitScript(s=>{if(!localStorage.getItem('schachmaschine-whole-play-v1'))localStorage.setItem('schachmaschine-whole-play-v1',JSON.stringify(s));},{...freshState(),step:stages.indexOf(stage),opened:true});
 await p.goto(process.env.TEST_URL||'http://127.0.0.1:5173/');await p.locator('#investigation-button').waitFor();
 const before=await p.evaluate(()=>localStorage.getItem('schachmaschine-whole-play-v1'));const board=await p.locator('.world').boundingBox();
 await p.locator('#section-summary').getByRole('button',{name:'Ermittlungsfall: Die Figur widerspricht',exact:true}).click();
 const f=p.frameLocator('.investigation-dialog iframe');await f.locator('#mission-select').selectOption('julie');
 assert.equal(await f.locator('#mission-title').textContent(),'Die Figur widerspricht');
 await f.getByRole('link',{name:'3. Aufzug · 3. Auftritt',exact:true}).click();
 const source=p.getByRole('dialog',{name:'Beck-Text zur Ermittlungsakte'});await source.waitFor();assert.match(await source.textContent(),/zum Entsagen gezwungen/);
 await source.getByRole('button',{name:'Zur Lesefassung',exact:true}).first().click();assert.match(await p.locator('.edition-dialog').textContent(),/Druckvergleich · Wien 1826/);await p.keyboard.press('Escape');await p.locator('.edition-dialog').waitFor({state:'detached'});
 await source.getByRole('button',{name:'Zurück zur Ermittlungsakte',exact:true}).click();
 const missionIds=await f.locator('#mission-select option').evaluateAll(es=>es.map(e=>e.value));assert.equal(missionIds.length,12);
 for(const id of missionIds){
  await f.locator('#mission-select').selectOption(id);assert.equal(await f.locator('#cards .card').count(),3);assert.equal(await f.locator('input[type=radio]').count(),0);
  if(id==='auftakt'){await f.locator('#initial').fill('Ein Mensch könnte den Zug im Verborgenen auswählen.');await f.getByRole('button',{name:'Erste Hypothese festhalten',exact:true}).click();}
  else if(id==='kasten'){for(let i=0;i<3;i++)await f.locator('.chambers button').nth(i).click();await f.getByRole('button',{name:'Gleichzeitig prüfen',exact:true}).click();}
  else if(id==='operator'){
   // Restore the visibly labelled signal-to-output sequence with the actual arrow controls.
   // Get the authored order from each button's adjacent label and use known pedagogical order.
   const labels=await f.locator('.sequence li span').allTextContents();
   const order=[labels[1],labels[3],labels[0],labels[4],labels[2]];
   for(let target=0;target<5;target++){let now=await f.locator('.sequence li span').allTextContents();let at=now.indexOf(order[target]);while(at>target){await f.locator('.sequence li').nth(at).getByRole('button',{name:/nach oben/}).click();at--;}}
   await f.getByRole('button',{name:'Wirkungskette prüfen',exact:true}).click();
  }else if(id==='poe')await f.getByRole('button',{name:'Fehler erzeugen',exact:true}).click();
  else if(id==='intrige'){await f.getByRole('button',{name:'Sophies Mitteilung weitergeben',exact:true}).click();await f.getByRole('button',{name:'Mitteilung zurückhalten · Spielvariante',exact:true}).click();}
  else if(id==='turing')await f.getByRole('button',{name:'Herkunftsetiketten vertauschen',exact:true}).click();
  else if(id==='searle'){for(const symbol of ['○','△','◇']){await f.getByRole('textbox',{name:'Ausgabesymbol',exact:true}).fill(symbol);await f.getByRole('button',{name:'Sendung abgeben',exact:true}).click();}}
  else if(id==='arbeit'){for(const name of ['Scheinautomat','Arbeitsplattform','Trainiertes Modell'])await f.getByRole('button',{name,exact:true}).click();}
  else await f.getByRole('button',{name:'Belege miteinander konfrontieren',exact:true}).click();
  await f.locator('#cards button').nth(0).click();await f.locator('#cards button').nth(1).click();
  for(const key of ['claim','evidence','objection','revision'])await f.locator('#field-'+key).fill(key==='evidence'?'A1, B2, S3: Die Herkunft einer Leistung verlangt unterschiedliche Gegenproben.':'Eine plausible Deutung braucht einen Beleg und eine Gegenprobe.');
  if(await f.locator('#reading-note').isVisible())await f.locator('#reading-note').fill('Die angegebene Originalstelle unterscheidet die beobachtete Leistung von ihrer Erklärung.');
  await f.getByRole('button',{name:'Fallakte abschliessen',exact:true}).click();assert.match(await f.locator('#done-note').textContent(),/Dokumentiert/,id);console.log('Case complete:',id);
 }
 assert.match(await f.locator('#progress').textContent(),/12 \/ 12/);
 const dl=p.waitForEvent('download');await f.locator('#export').click();const exported=await dl;assert.equal(exported.suggestedFilename(),'Meine_Ermittlungsakte.json');const file=await exported.path();
 await f.locator('#field-claim').fill('Geänderter Entwurf');
 p.once('dialog',d=>d.accept());await f.locator('#import').setInputFiles(file);await f.getByText('Akte geladen.',{exact:true}).waitFor();assert.notEqual(await f.locator('#field-claim').inputValue(),'Geänderter Entwurf');
 await f.locator('#return-to-play').click();await p.locator('.investigation-dialog').waitFor({state:'hidden'});assert.equal(await p.locator('.investigation-dialog').isVisible(),false);assert.deepEqual(await p.locator('.world').boundingBox(),board);assert.equal(await p.evaluate(()=>localStorage.getItem('schachmaschine-whole-play-v1')),before);
 await p.reload();await p.locator('#investigation-button').click();assert.match(await f.locator('#progress').textContent(),/12 \/ 12/);
 await p.setViewportSize({width:390,height:844});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.ok(await f.locator('body').evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await p.screenshot({path:'/tmp/investigation-mobile.png'});
 await f.locator('#help').click();await f.locator('#dialog').waitFor({state:'visible'});await f.locator('#close-dialog').focus();await p.keyboard.press('Escape');assert.equal(await f.locator('#dialog').isVisible(),false);assert.ok(await p.locator('.investigation-dialog').isVisible());await f.locator('#mission-select').focus();await p.keyboard.press('Escape');await p.locator('.investigation-dialog').waitFor({state:'hidden'});assert.equal(await p.locator('.investigation-dialog').isVisible(),false);
 assert.deepEqual(errors,[]);console.log('PASS: 12 complete missions, original text and edition popups, export/import, persistent drafts, unchanged play state/layout, mobile and nested Escape.');
}finally{await browser.close();}
