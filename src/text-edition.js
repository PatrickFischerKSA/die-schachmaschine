import pages from './play-pages.json' with {type:'json'};
import edition from './text-edition.json' with {type:'json'};
export {edition};
const pageOf=page=>typeof page==='number'?pages[page]:typeof page==='string'?pages.find(p=>p.id===page):page;
export const editionFor=page=>edition[pageOf(page)?.id];
export const readingText=page=>editionFor(page)?.text??pageOf(page)?.text??'';
export const readingLocation=page=>editionFor(page)?.location;
function offset(page,index,reverse,bias){
  let delta=0;
  for(const e of editionFor(page)?.edits||[]){
    const a=reverse?e.readingStart:e.start,b=reverse?e.readingEnd:e.end,c=reverse?e.start:e.readingStart,d=reverse?e.end:e.readingEnd;
    if(index<a)return index+delta;
    if(index===a&&a===b)return bias==='end'?d:c;
    if(index===a)return c;
    if(index<b)return bias==='end'?d:c;
    if(index===b)return d;
    delta=d-b;
  }
  return index+delta;
}
export const toReadingOffset=(page,index,bias='start')=>offset(page,index,false,bias);
export const toSourceOffset=(page,index,bias='start')=>offset(page,index,true,bias);
export const readingQuote=({page,start,end})=>readingText(page).slice(toReadingOffset(page,start),toReadingOffset(page,end,'end'));
export const sourceRange=(page,start,end)=>({page,start:toSourceOffset(page,start),end:toSourceOffset(page,end,'end')});
const source=pages.map(p=>p.text).join('');
const begins=[];let total=0;for(const p of pages){begins.push(total);total+=p.text.length;}
export function passagePages(text){
  const at=source.indexOf(text);if(at<0)return [];
  return pages.filter((p,i)=>begins[i]<at+text.length&&begins[i]+p.text.length>at);
}
export function correctPassage(text){
  let at=source.indexOf(text),length=text.length;
  if(at<0){
    // Some older short quotations normalize only the source's whitespace.
    const escaped=text.trim().split(/\s+/).map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('\\s+');
    if(!escaped)return text;
    const match=new RegExp(escaped).exec(source);if(!match)return text;at=match.index;length=match[0].length;
  }
  let result='';
  for(let i=0;i<pages.length;i++){
    const start=Math.max(at,begins[i]),end=Math.min(at+length,begins[i]+pages[i].text.length);
    if(end>start)result+=readingQuote({page:i,start:start-begins[i],end:end-begins[i]});
  }
  return result;
}
