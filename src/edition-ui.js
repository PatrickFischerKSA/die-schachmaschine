import {editionFor,readingText,readingLocation} from './text-edition.js';
const node=(tag,text)=>{const n=document.createElement(tag);if(text!=null)n.textContent=text;return n;};
export function editionGuide(page,{id=false,original=true}={}){
  const item=editionFor(page),section=node('section');section.className='edition-guide';
  if(!item)return section;
  if(id)section.id='section-summary';
  section.dataset.page=page.id;
  section.append(node('h3','Kurz zusammengefasst'),node('p',item.summary));
  if(readingLocation(page))section.append(node('small',readingLocation(page)+' · Die Abschnittskennung bleibt für gespeicherte Belege erhalten.'));
  const info=node('details');info.className='edition-details';
  info.append(node('summary','Zur Lesefassung · '+item.edits.length+' dokumentierte Eingriffe'));
  info.append(node('p','Offensichtliche Übertragungsfehler sind berichtigt. Historische Orthografie und Stil bleiben erhalten. Grundlage ist das bereitgestellte Transkript; ein Abgleich mit dem historischen Druck ist nicht erfolgt.'));
  for(const note of item.notes)info.append(node('p',note));
  if(item.edits.length){const list=node('ul');for(const e of item.edits){const li=node('li');const before=page.text.slice(Math.max(0,e.start-22),Math.min(page.text.length,e.end+22)),after=readingText(page).slice(Math.max(0,e.readingStart-22),Math.min(readingText(page).length,e.readingEnd+22));li.append(node('del',before),document.createTextNode(' → '),node('ins',after));list.append(li);}info.append(list);}
  if(original){const raw=node('details');raw.append(node('summary','Unverändertes Ausgangstranskript dieses Abschnitts'),node('pre',page.text));info.append(raw);}
  for(const [file,label]of [['beck-1798-lesefassung.txt','Ganze Lesefassung'],['beck-1798-transkript.txt','Unverändertes Transkript'],['beck-1798-korrekturen.json','Korrekturprotokoll'],['beck-1798-zusammenfassungen.md','Alle Zusammenfassungen']]){const a=node('a',label+' ↗');a.href=(import.meta.env?.BASE_URL||'/')+'sources/'+file;a.target='_blank';a.rel='noopener';info.append(a,document.createTextNode(' · '));}
  section.append(info);return section;
}
