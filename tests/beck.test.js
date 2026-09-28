import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {beckEvidence,balkenRoutines} from '../src/beck.js';
const transcript=readFileSync(new URL('../public/sources/beck-1798-transkript.txt',import.meta.url),'utf8');
const normalize=s=>s.replace(/\s+/g,' ').trim();
test('Every displayed Beck quotation is present in the supplied transcript',()=>{
 for(const evidence of [...Object.values(beckEvidence),...balkenRoutines]){
  assert.ok(normalize(transcript).includes(normalize(evidence.quote||evidence.output)),evidence.location+': '+(evidence.quote||evidence.output));
 }
});
