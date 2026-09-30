import pages from './play-pages.json' with {type:'json'};
import {readingText,readingLocation} from './text-edition.js';
import {editionGuide} from './edition-ui.js';
import {investigationScenes} from './investigation-links.js';
const stations=['auftakt','kasten','operator','poe','buehne','intrige','julie','turing','searle','arbeit','archiv','tribunal'];
const node=(tag,text,cls)=>{const n=document.createElement(tag);if(text)n.textContent=text;if(cls)n.className=cls;return n;};
export function createInvestigation(){
 const dialog=node('dialog',null,'investigation-dialog');dialog.setAttribute('aria-label','Ermittlungsakte');
 const bar=node('div',null,'investigation-bar'),title=node('h2','Ermittlungsakte'),close=node('button','Zurück zum Spiel');close.type='button';close.autofocus=true;
 const separate=node('a','In eigenem Tab öffnen ↗');separate.href=import.meta.env.BASE_URL+'ermittlungsakte/index.html';separate.target='_blank';separate.rel='noopener';
 bar.append(title,separate,close);const frame=node('iframe');frame.title='Zwölf Ermittlungsfälle zur Schachmaschine';dialog.append(bar,frame);document.body.append(dialog);
 let loaded=false,pending,returnFocus;
 function sendStation(){if(pending){frame.contentWindow.postMessage({type:'schach-investigation-station',station:pending},location.origin);pending=undefined;}}
 frame.addEventListener('load',()=>{loaded=true;sendStation();});
 function open(station){if(station&&!stations.includes(station))return;document.querySelector('.investigation-source[open]')?.close();pending=station;if(!dialog.open){returnFocus=document.activeElement;dialog.showModal();}if(!frame.hasAttribute('src'))frame.src=import.meta.env.BASE_URL+'ermittlungsakte/index.html';else if(loaded)sendStation();}
 close.onclick=()=>dialog.close();dialog.addEventListener('close',()=>{if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});});
 function source(act,scene){
  if(!Object.values(investigationScenes).flat().some(([a,s])=>a===act&&s===scene))return;
  const selected=pages.filter(p=>p.act===act&&p.scene===scene);if(!selected.length)return;
  const d=node('dialog',null,'investigation-source reading-dialog');d.setAttribute('aria-label','Beck-Text zur Ermittlungsakte');const back=node('button','Zurück zur Ermittlungsakte');back.autofocus=true;back.onclick=()=>d.close();d.append(back,node('h2',act+'. Aufzug · '+scene+'. Auftritt'),node('p','Zusätzliche Quellenlektüre: Diese Ansicht verändert deinen Fortschritt im ganzen Stück nicht.'));
  for(const p of selected){const section=node('section');section.append(node('h3',(readingLocation(p)||act+'. Aufzug · '+scene+'. Auftritt')+' · Abschnitt '+p.part+'/'+p.parts),editionGuide(p),node('article',readingText(p),'staged-transcript'));d.append(section);}
  d.addEventListener('close',()=>{d.remove();frame.focus();},{once:true});document.body.append(d);d.showModal();
 }
 document.addEventListener('open-investigation',e=>open(e.detail?.station));
 window.addEventListener('message',e=>{if(e.origin!==location.origin||e.source!==frame.contentWindow||!dialog.open)return;const m=e.data;if(m?.type==='schach-investigation-close')dialog.close();if(m?.type==='schach-investigation-source')source(m.act,m.scene);});
 const button=node('button','Ermittlungsakte ↗');button.id='investigation-button';button.type='button';button.setAttribute('aria-haspopup','dialog');button.onclick=()=>open();document.querySelector('.mode-bar').append(button);
 const params=new URLSearchParams(location.search);if(stations.includes(params.get('investigation'))){open(params.get('investigation'));const [a,s]=(params.get('source')||'').split('-').map(Number);if(a&&s)source(a,s);}
 return {open};
}
