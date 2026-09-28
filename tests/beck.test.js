import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {journeyQuotes} from '../src/journey.js';
import {beckEvidence,balkenRoutines} from '../src/beck.js';
const transcript=readFileSync(new URL('../public/sources/beck-1798-transkript.txt',import.meta.url),'utf8');
const normalize=s=>s.replace(/\s+/g,' ').trim();
test('Every displayed Beck quotation is present in the supplied transcript',()=>{
 for(const evidence of [...Object.values(beckEvidence),...Object.values(journeyQuotes),...balkenRoutines]){
  assert.ok(normalize(transcript).includes(normalize(evidence.quote||evidence.output)),evidence.location+': '+(evidence.quote||evidence.output));
 }
});

test('Reading scenes preserve contiguous passages of the supplied transcript',()=>{const scenes=JSON.parse(readFileSync(new URL('../src/reading-scenes.json',import.meta.url),'utf8'));assert.equal(scenes.length,11);for(const scene of scenes)assert.ok(transcript.includes(scene.text),scene.title);});
