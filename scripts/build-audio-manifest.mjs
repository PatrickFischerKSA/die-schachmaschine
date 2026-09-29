// Usage: node scripts/build-audio-manifest.mjs /tmp/schach-speech-results.json
// No credentials. Results contain generated file URLs and alignment timestamps.
import {readFile,writeFile} from 'node:fs/promises';
import pages from '../src/play-pages.json' with {type:'json'};
import {speechTurns} from '../src/reading-stage.js';
export function alignCues(page,words,inherited=null){
 const turns=speechTurns(page.text,inherited),tokens=[...page.text.matchAll(/[\p{L}\p{N}]+/gu)],normal=s=>s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');let cursor=0;const aligned=[];
 for(const w of words||[]){if(w.word.startsWith('<'))continue;const key=normal(w.word);if(!key)continue;const offset=tokens.slice(cursor,cursor+12).findIndex(t=>normal(t[0])===key);if(offset>=0){cursor+=offset;aligned.push({offset:tokens[cursor].index,time:w.start});cursor++;}}
 let previous=0;return turns.map(turn=>{const match=aligned.find(w=>w.offset>=turn.start&&w.offset<turn.end);const time=Math.max(previous,match?.time??previous);previous=time;return {start:turn.start,end:turn.end,speaker:turn.speaker,time};});
}
if(process.argv[1]?.endsWith('build-audio-manifest.mjs')){
 const results=JSON.parse(await readFile(process.argv[2],'utf8')),manifest={version:1,provider:'HeyGen',voice:'Nero – Thoughtful & Clear',kind:'AI-generated',pages:{}};let inherited=null,scene='';
 for(const page of pages){const sceneKey=page.act+'-'+page.scene;if(scene!==sceneKey){inherited=null;scene=sceneKey;}const result=results.find(r=>r.page===page.id);if(result)manifest.pages[page.id]={file:'audio/'+page.id+'.mp3',duration:result.duration,cues:alignCues(page,result.word_timestamps,inherited)};inherited=speechTurns(page.text,inherited).at(-1)?.speaker||inherited;}
 await writeFile('public/audio/manifest.json',JSON.stringify(manifest,null,2)+'\n');console.log(Object.keys(manifest.pages).length+' audio pages');
}
