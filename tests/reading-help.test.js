import {test} from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {lookupWord,dictionaryUrl} from '../src/glossary.js';
import pages from '../src/play-pages.json' with {type:'json'};
test('Word explanations distinguish contextual readings and safely encode unknown words',()=>{
 assert.match(lookupWord('Kaprize!').meaning,/eigensinniger/);assert.match(lookupWord('Kaprize').context,/Deutungsmöglichkeit/);assert.equal(lookupWord('unbekannt'),null);assert.equal(dictionaryUrl('a/b?c'),'https://www.dwds.de/wb/a%2Fb%3Fc');
});
test('Published recordings exist and cues reference unchanged source ranges',()=>{
 const manifest=JSON.parse(readFileSync(new URL('../public/audio/manifest.json',import.meta.url)));
 for(const [id,track] of Object.entries(manifest.pages)){const page=pages.find(p=>p.id===id);assert.ok(page);assert.ok(existsSync(new URL('../public/'+track.file,import.meta.url)));assert.ok(track.duration>0);let end=0,time=0;for(const cue of track.cues){assert.equal(cue.start,end);assert.ok(cue.end>cue.start&&cue.end<=page.text.length);assert.ok(cue.time>=time&&cue.time<track.duration);end=cue.end;time=cue.time;}assert.equal(end,page.text.length);}
});
