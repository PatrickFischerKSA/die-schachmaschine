import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {stages,pages,freshState} from '../src/play-state.js';
import {readingText,editionFor,readingQuote} from '../src/text-edition.js';
const b=await chromium.launch({headless:true,args:['--enable-webgl','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
  const p=await b.newPage({viewport:{width:1440,height:1000}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
  const stage=stages.find(s=>s.id==='text-3-3-0'),step=stages.indexOf(stage);
  await p.addInitScript(s=>{if(!localStorage.getItem('schachmaschine-whole-play-v1'))localStorage.setItem('schachmaschine-whole-play-v1',JSON.stringify(s));},{...freshState(),step,opened:false});
  await p.goto(process.env.TEST_URL||'http://127.0.0.1:5173');
  assert.equal(await p.locator('#section-summary').count(),0);await p.locator('#play-open').click();
  assert.equal(await p.locator('#section-summary>p').first().textContent(),editionFor(stage).summary);
  assert.equal(await p.locator('#staged-transcript').textContent(),readingText(stage));
  const needle='man kann wohl zum Entsagen gezwungen werden, aber nicht zum Lieben.';
  await p.locator('#staged-transcript').evaluate((article,needle)=>{
    const text=article.textContent,start=text.indexOf(needle),end=start+needle.length;if(start<0)throw Error('Missing edited quote');
    const walker=document.createTreeWalker(article,NodeFilter.SHOW_TEXT);let n,at=0,a,z;
    while(n=walker.nextNode()){if(!a&&start>=at&&start<at+n.length)a=[n,start-at];if(end>at&&end<=at+n.length){z=[n,end-at];break;}at+=n.length;}
    const range=document.createRange();range.setStart(...a);range.setEnd(...z);getSelection().removeAllRanges();getSelection().addRange(range);article.dispatchEvent(new MouseEvent('mouseup',{bubbles:true}));
  },needle);
  assert.equal(await p.locator('#text-anchor blockquote').textContent(),needle);
  await p.getByRole('button',{name:'Textstelle erklären',exact:true}).click();assert.match(await p.locator('#word-query').inputValue(),/Entsagen/);await p.keyboard.press('Escape');
  await p.getByRole('button',{name:'Als Beleg bearbeiten',exact:true}).click();await p.locator('#claim-perspective').selectOption('3');await p.locator('#claim-from').selectOption('3');await p.locator('#claim-to').selectOption('1');
  await p.locator('#claim-statement').fill('Julie grenzt die Entscheidung über ihre Gefühle von äusserem Gehorsam ab.');await p.locator('#claim-reason').fill('Sie unterscheidet ausdrücklich zwischen Entsagen und Lieben.');await p.locator('#claim-save').click();
  const saved=await p.evaluate(()=>JSON.parse(localStorage.getItem('schachmaschine-whole-play-v1')));assert.equal(saved.interpretations.length,1);
  const e=saved.interpretations[0];assert.match(pages[e.page].text.slice(e.start,e.end),/Entfas gen/);assert.equal(readingQuote(e),needle);
  await p.reload();await p.locator('#staged-transcript').waitFor();
  await p.locator('#perspective-select').selectOption('3');await p.locator('#workshop-toggle').click();await p.getByRole('button',{name:'Beleg im Zusammenhang',exact:true}).first().click();
  const dialog=p.getByRole('dialog',{name:'Textbeleg im Zusammenhang'});assert.equal(await dialog.locator('mark').textContent(),needle);assert.ok(await dialog.locator('.edition-guide').isVisible());await dialog.getByRole('button',{name:'Schliessen',exact:true}).click();
  await p.getByRole('button',{name:'Werkstatt schliessen',exact:true}).last().click();
  await p.locator('#scene-controls').evaluate(e=>e.scrollTop=0);await p.screenshot({path:'/tmp/edition-desktop.png'});
  await p.locator('#section-summary>.edition-details>summary').click();assert.match(await p.locator('#section-summary').textContent(),/Entfas/);await p.locator('#section-summary>.edition-details>summary').click();
  await p.setViewportSize({width:390,height:844});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await p.screenshot({path:'/tmp/edition-mobile.png'});
  const download=await p.request.get(new URL('sources/beck-1798-lesefassung.txt',p.url()).href);assert.equal(download.status(),200);assert.match(await download.text(),/zum Entsagen gezwungen/);
  assert.deepEqual(errors,[]);console.log('PASS: summaries gated by opened text, corrected selection and help, persistent canonical evidence, source highlighting, downloads, desktop and mobile.');
}finally{await b.close();}
