import {readingText} from '../src/text-edition.js';
import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {stages,freshState} from '../src/play-state.js';
const browser=await chromium.launch({headless:true,args:['--enable-webgl','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const p=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 const step=stages.findIndex(s=>s.id==='text-1-1-0');await p.addInitScript(state=>localStorage.setItem('schachmaschine-whole-play-v1',JSON.stringify(state)),{...freshState(),step,opened:true});
 await p.goto(process.env.TEST_URL||'http://127.0.0.1:5173');await p.locator('#staged-transcript').waitFor();
 assert.equal(await p.locator('#staged-transcript').textContent(),readingText(stages[step]));
 const word=p.locator('.glossary-word').filter({hasText:/^Kaprize$/}).first();await word.click();
 assert.match(await p.locator('.word-dialog').textContent(),/verspielteren Fall/);assert.equal(await p.locator('#text-anchor').isVisible(),false);
 await p.locator('#word-query').fill('unbekannteswort');await p.locator('.word-dialog').getByRole('button',{name:'Erklären',exact:true}).click();assert.match(await p.locator('.word-dialog').textContent(),/noch keine redaktionelle/);
 await p.keyboard.press('Escape');await word.focus();await p.keyboard.press('Enter');assert.equal(await p.locator('.word-dialog').isVisible(),true);await p.keyboard.press('Escape');
 // Selection offsets must still match the unmodified original after word wrappers.
 await p.locator('#staged-transcript').evaluate(article=>{const walker=document.createTreeWalker(article,NodeFilter.SHOW_TEXT);let n;while(n=walker.nextNode())if(n.textContent.includes('Frisur')){const range=document.createRange(),i=n.textContent.indexOf('Frisur');range.setStart(n,i);range.setEnd(n,i+6);const selection=getSelection();selection.removeAllRanges();selection.addRange(range);article.dispatchEvent(new MouseEvent('mouseup',{bubbles:true}));break;}});
 assert.equal(await p.locator('#text-anchor blockquote').textContent(),'Frisur');await p.locator('#explain-word').click();assert.equal(await p.locator('#word-query').inputValue(),'Frisur');await p.keyboard.press('Escape');await p.evaluate(()=>getSelection().removeAllRanges());
 assert.equal(await p.locator('audio').count(),0);
 await p.locator('#section-help').click();assert.match(await p.locator('#explanation-result').textContent(),/Sinngemäss heute/);assert.match(await p.locator('#explanation-result').textContent(),/verspielter fallen/);
 await p.getByRole('button',{name:'Originalstelle festhalten',exact:true}).first().click();assert.equal(await p.locator('#text-anchor blockquote').textContent(),'Mehr Kaprize, im Fall von der Locke!');
 await p.locator('#text-anchor').getByRole('button',{name:'Textstelle erklären',exact:true}).click();assert.match(await p.locator('#explanation-result').textContent(),/Mögliche Lesart/);await p.keyboard.press('Escape');
 await p.locator('#perspective-select').selectOption('1');
 await p.locator('#guided-mode').click();await p.locator('#play-mode').click();
 await p.locator('#play-next').click();await p.locator('#play-open').click();assert.equal(await p.locator('audio').count(),0);
 await p.locator('#section-help').click();assert.match(await p.locator('#explanation-result').textContent(),/Nachurtheil/);assert.doesNotMatch(await p.locator('#explanation-result').textContent(),/verspielter fallen/);await p.keyboard.press('Escape');
 await p.setViewportSize({width:390,height:844});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await p.screenshot({path:'/tmp/reading-help-mobile.png'});
 await p.setViewportSize({width:1440,height:1000});await p.screenshot({path:'/tmp/reading-help-desktop.png'});assert.deepEqual(errors,[]);console.log('PASS: word lookup, keyboard, source preservation, selection offsets, contextual passages, source anchors, section isolation and absence of speech playback.');
}finally{await browser.close();}
