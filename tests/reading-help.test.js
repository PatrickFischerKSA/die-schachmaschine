import {test} from 'node:test';
import assert from 'node:assert/strict';
import {lookupWord,dictionaryUrl,findTerms} from '../src/glossary.js';
import {textExplanations,explanationsFor} from '../src/text-explanations.js';
import pages from '../src/play-pages.json' with {type:'json'};
test('Lookup handles historical forms, French phrases and Frey as a person',()=>{
 assert.match(lookupWord('Kaprize!').meaning,/eigensinniger/);assert.match(lookupWord('Kaprize').context,/Deutungsmöglichkeit/);assert.equal(lookupWord('unbekannt'),null);assert.equal(dictionaryUrl('a/b?c'),'https://www.dwds.de/wb/a%2Fb%3Fc');
 assert.match(lookupWord('Frey').meaning,/Kammerdiener/);assert.match(lookupWord('frey').meaning,/Schreibweise/);assert.equal(findTerms('Frey ist frey. Me voilà!').at(-1).entry.word,'Me voilà');assert.equal(findTerms('unseynbar').length,0);
});
test('Every explanation anchors exactly in the source and stays in its own reading section',()=>{
 assert.deepEqual([...new Set(textExplanations.map(n=>pages.find(p=>p.id===n.page)?.act))].sort(),[1,2,3,4]);
 for(const note of textExplanations){const page=pages.find(p=>p.id===note.page);assert.ok(page?.text.includes(note.quote),note.page+': '+note.quote);assert.ok(note.plain&&note.reading);assert.ok(explanationsFor(page).includes(note));}
 assert.equal(explanationsFor(pages[0]).length,0);
});
test('All annotated glossary ranges preserve the original source',()=>{
 for(const page of pages){let end=0;for(const term of findTerms(page.text)){assert.ok(term.start>=end);assert.equal(page.text.slice(term.start,term.end),term.text);assert.ok(term.entry);end=term.end;}}
});
