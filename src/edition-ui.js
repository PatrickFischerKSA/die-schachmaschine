import {editionFor,readingText,readingLocation} from './text-edition.js';
const node=(tag,text)=>{const n=document.createElement(tag);if(text!=null)n.textContent=text;return n;};
export function editionGuide(page,{id=false,original=true}={}){
  const item=editionFor(page),section=node('section');section.className='edition-guide';
  if(!item)return section;
  if(id)section.id='section-summary';
  section.dataset.page=page.id;
  function resource(label,content){
    const trigger=node('button',label);trigger.type='button';trigger.setAttribute('aria-haspopup','dialog');
    trigger.onclick=()=>{
      const dialog=node('dialog');dialog.className='edition-dialog';dialog.setAttribute('aria-label',label);
      const header=node('div');header.className='edition-dialog-header';const close=node('button','Schliessen');close.type='button';close.autofocus=true;
      close.onclick=()=>dialog.close();header.append(node('h2',label),close);dialog.append(header,content());
      dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
      dialog.addEventListener('close',()=>{dialog.remove();if(trigger.isConnected)trigger.focus({preventScroll:true});},{once:true});
      section.append(dialog);dialog.showModal();
    };
    section.append(trigger);
  }
  resource('Kurz zusammengefasst',()=>{const content=node('div');content.className='edition-summary';content.append(node('p',item.summary));return content;});
  resource('Zur Lesefassung',()=>{
  const info=node('div');info.className='edition-details';
  info.append(node('p',item.edits.length+' dokumentierte Eingriffe in diesem Abschnitt.'));
  if(readingLocation(page))info.append(node('p',readingLocation(page)));
  info.append(node('p','Offensichtliche Übertragungsfehler sind berichtigt. Historische Orthografie und Stil bleiben erhalten. Grundlage ist das bereitgestellte Transkript; ein Abgleich mit dem historischen Druck ist nicht erfolgt.'));
  for(const note of item.notes)info.append(node('p',note));
  if(item.edits.length){const list=node('ul');for(const e of item.edits){const li=node('li');const before=page.text.slice(Math.max(0,e.start-22),Math.min(page.text.length,e.end+22)),after=readingText(page).slice(Math.max(0,e.readingStart-22),Math.min(readingText(page).length,e.readingEnd+22));li.append(node('del',before),document.createTextNode(' → '),node('ins',after));list.append(li);}info.append(list);}
  if(original){const raw=node('details');raw.append(node('summary','Unverändertes Ausgangstranskript dieses Abschnitts'),node('pre',page.text));info.append(raw);}
  for(const [file,label]of [['beck-1798-lesefassung.txt','Ganze Lesefassung'],['beck-1798-transkript.txt','Unverändertes Transkript'],['beck-1798-korrekturen.json','Korrekturprotokoll'],['beck-1798-zusammenfassungen.md','Alle Zusammenfassungen']]){const a=node('a',label+' ↗');a.href=(import.meta.env?.BASE_URL||'/')+'sources/'+file;a.target='_blank';a.rel='noopener';info.append(a,document.createTextNode(' · '));}
  return info;});
  return section;
}
