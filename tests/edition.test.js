import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import pages from '../src/play-pages.json' with {type:'json'};
import {edition,readingText,readingQuote,toReadingOffset,toSourceOffset,sourceRange,correctPassage,readingLocation} from '../src/text-edition.js';
import {textExplanations,explanationsFor} from '../src/text-explanations.js';
import {stages,freshState,restore,act} from '../src/play-state.js';
import {quote} from '../src/dramaturgy.js';
import {claim} from './perspective-helpers.mjs';
test('All 79 sections have individually reviewed, concise modern summaries and a reversible reading edition',()=>{
  assert.equal(pages.length,79);assert.deepEqual(Object.keys(edition).sort(),pages.map(p=>p.id).sort());
  assert.equal(new Set(Object.values(edition).map(e=>e.summary)).size,79);
  for(const p of pages){
    const e=edition[p.id];assert.ok(e.summary.split(/\s+/).length<=80,p.id);
    let reconstructed='',at=0;
    for(const x of e.edits){assert.equal(p.text.slice(x.start,x.end),x.before);assert.equal(e.text.slice(x.readingStart,x.readingEnd),x.after);assert.ok(x.start>=at);reconstructed+=p.text.slice(at,x.start)+x.after;at=x.end;}
    reconstructed+=p.text.slice(at);assert.equal(reconstructed,e.text,p.id);
    assert.equal(readingQuote({page:p.id,start:0,end:p.text.length}),e.text,p.id);
    let prev=-1;
    for(let i=0;i<=p.text.length;i++){const mapped=toReadingOffset(p,i);assert.ok(mapped>=prev&&mapped<=e.text.length,p.id);prev=mapped;}
    prev=-1;for(let i=0;i<=e.text.length;i++){const mapped=toSourceOffset(p,i);assert.ok(mapped>=prev&&mapped<=p.text.length,p.id);prev=mapped;}
  }
  assert.equal(pages.map(p=>p.text).join(''),fs.readFileSync(new URL('../public/sources/beck-1798-transkript.txt',import.meta.url),'utf8'));
  assert.equal(pages.map(readingText).join(''),fs.readFileSync(new URL('../public/sources/beck-1798-lesefassung.txt',import.meta.url),'utf8'));
});
test('Historical spellings remain; demonstrable corruptions and speaker errors are corrected; uncertainty is explicit',()=>{
  const all=pages.map(readingText).join('');for(const form of ['seyn','bey','Heurath','frey','Zweyter','Baroninn'])assert.ok(all.includes(form),form);
  for(const fragment of ['Jekt','Giewissen','Nu.f...','Tråger','Entfas gen','bur. tig','Schmucď'])assert.ok(!all.includes(fragment),fragment);
  assert.ok(readingText('text-3-3-0').includes('zum Entsagen gezwungen'));
  assert.ok(readingText('text-4-2-0').includes('einen Dukaten'));
  assert.ok(readingText('text-3-11-1').includes('\n\nZwölfter Auftritt.'));
  assert.match(readingLocation('text-3-11-2'),/12\. Auftritt/);
  assert.ok(edition['text-1-10-2'].notes.some(n=>n.includes('koutschmaßen')));
  assert.ok(edition['text-4-13-1'].notes.some(n=>n.includes('Gegensegen')));
});
test('Old saved interpretation offsets still restore and resolve to the corrected passage without migration',()=>{
  const stage=stages.find(s=>s.id==='text-3-4-1'),step=stages.indexOf(stage),page=pages.findIndex(p=>p.id===stage.id);
  const original=pages[page].text,start=original.indexOf('Ich bin gewohnt'),end=original.indexOf('Und da Sie');
  const old=act({...freshState(),step,opened:true},claim(stage,3,{page,start,end})).state;
  assert.equal(old.interpretations.length,1);assert.deepEqual(restore(JSON.stringify(old)),old);
  assert.match(quote(old.interpretations[0]),/innern Werth zu schätzen/);
  const display=readingText(page),a=display.indexOf('Ich bin gewohnt'),b=display.indexOf('Und da Sie');
  const range=sourceRange(page,a,b);assert.equal(range.start,start);assert.equal(range.end,end);assert.equal(readingQuote(range),display.slice(a,b));
});
test('Word explanations and short quotations resolve in the corrected edition without changing canonical anchors',()=>{
  for(const p of pages){const expected=textExplanations.filter(n=>n.page===p.id),actual=explanationsFor({...p,text:readingText(p),edition:true});assert.equal(actual.length,expected.length,p.id);for(const n of actual)assert.ok(readingText(p).includes(n.quote));}
  assert.equal(correctPassage('Hier habt ihr jeder einen Dus katen; wollt ihr mich tragen?'),'Hier habt ihr jeder einen Dukaten; wollt ihr mich tragen?');
  assert.match(correctPassage('man kann wohl zum Entfas gen gezwungen werden, aber nicht zum Lieben.'),/zum Entsagen/);
  assert.equal(correctPassage('This is not a quotation.'),'This is not a quotation.');
});

test('Print collation covers every section and preserves edition differences transparently',()=>{
  const c=JSON.parse(fs.readFileSync(new URL('../src/print-collation.json',import.meta.url)));
  assert.equal(Object.keys(c.sections).length,79);
  for(const p of pages){const r=c.sections[p.id];assert.ok(r.scanFrom>=3&&r.scanTo<=118&&r.scanFrom<=r.scanTo);}
  for(const f of c.findings){assert.ok(c.visuallyCheckedScans.includes(f.scan));assert.equal(f.printedPage,f.scan-2);assert.ok(edition[f.section]);}
  assert.match(readingText('text-1-10-2'),/laut schwatzen/);
  assert.match(readingText('text-3-8-0'),/Wechselschuldner/);
  assert.match(readingText('text-1-3-1'),/Er und Ruf gehen ab/);
  assert.ok(c.findings.some(f=>f.section==='text-4-2-0'&&f.kind==='variant'&&f.printReading.includes('Skrupel')));
  assert.equal(fs.readFileSync(new URL('../public/sources/beck-1826-abgleich.json',import.meta.url),'utf8'),JSON.stringify(c,null,2)+'\n');
});
