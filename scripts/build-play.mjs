import fs from 'node:fs';
// Preserve every character, including title, cast list, damaged spellings and the ending.
const source=fs.readFileSync(new URL('../public/sources/beck-1798-transkript.txt',import.meta.url),'utf8');
const heading=/^(?:[! ]*)(Erster|Zweyter|Dritter|Vierter|Fünfter|Sechster|Siebenter|Achter|Neunter|Zehnter|Eilfter|Zwölfter|Dreyzehnter) Auftritt/gm;
const acts=[...source.matchAll(/^(Erster|Zweyter|Dritter|Vierter) Aufzug/gm)];
const starts=[0,...[...source.matchAll(heading)].map(m=>m.index)];
const sections=starts.map((start,i)=>{const end=starts[i+1]??source.length;const act=acts.filter(a=>a.index<=start).length;const scene=starts.slice(1,i+1).filter(pos=>acts.filter(a=>a.index<=pos).length===act).length;return {act,scene,text:source.slice(start,end)};});
// Act headings belong to their following scene, not the preceding dialogue.
for(let i=0;i<sections.length-1;i++){const s=sections[i];const at=s.text.search(/^(Erster|Zweyter|Dritter|Vierter) Aufzug/m);if(at>=0&&sections[i+1].act>s.act){sections[i+1].text=s.text.slice(at)+sections[i+1].text;s.text=s.text.slice(0,at);}}
const pages=[];
for(const s of sections){let text=s.text;const parts=[];while(text.length>2200){let cut=text.lastIndexOf('\n',2200);if(cut<900)cut=text.lastIndexOf(' ',2200);cut++;parts.push(text.slice(0,cut));text=text.slice(cut);}if(text)parts.push(text);parts.forEach((text,index)=>pages.push({id:`text-${s.act}-${s.scene}-${index}`,act:s.act,scene:s.scene,part:index+1,parts:parts.length,text}));}
if(pages.map(p=>p.text).join('')!==source)throw Error('Transcript coverage mismatch');
fs.writeFileSync(new URL('../src/play-pages.json',import.meta.url),JSON.stringify(pages,null,2)+'\n');console.log(`${sections.length-1} Auftritte, ${pages.length} Textstrecken, ${source.length} Zeichen unverändert.`);
