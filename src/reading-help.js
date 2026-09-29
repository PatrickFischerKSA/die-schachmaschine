import {lookupWord,dictionaryUrl,findTerms} from './glossary.js';
import {explanationsFor} from './text-explanations.js';
const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!=null)n.textContent=text;if(cls)n.className=cls;return n;};
const button=(parent,text,fn)=>{const b=el('button',text);b.type='button';b.onclick=fn;parent.append(b);return b;};
export function createReadingHelp({reader,onAnchor}){
 const bar=el('div',null,'reading-help');bar.hidden=true;reader.querySelector('#scene-controls').before(bar);
 const explain=button(bar,'Wort / Textstelle erklären',()=>openSelection());explain.id='explain-word';
 const overview=button(bar,'Hilfen zu dieser Textstrecke',()=>showOverview());overview.id='section-help';
 const hint=el('span','Wörter anklicken · Sätze markieren','reading-help-hint');bar.append(hint);
 const dialog=el('dialog',null,'word-dialog');dialog.setAttribute('aria-labelledby','word-heading');document.body.append(dialog);
 const heading=el('h2','Text verstehen');heading.id='word-heading';const close=button(dialog,'Schliessen',()=>dialog.close());
 const form=el('form'),inputLabel=el('label','Wort, Wendung oder markierter Satz'),input=el('input');input.id='word-query';input.maxLength=4000;input.autocomplete='off';inputLabel.htmlFor=input.id;
 const submit=el('button','Erklären');submit.type='submit';form.append(inputLabel,input,submit);
 const result=el('div');result.setAttribute('aria-live','polite');result.id='explanation-result';
 dialog.append(heading,el('p','Punktiert unterstrichene Wörter haben eine Lesehilfe. Für einen schwierigen Satz markiere die Stelle im Originaltext. Die Hilfen erläutern Sprache und bieten offene Deutungshinweise; sie ersetzen das Lesen nicht.'),form,result);
 let stage=null,article=null,previousFocus=null,anchor=null;
 function open(){if(!dialog.open){previousFocus=document.activeElement;dialog.showModal();}close.focus();}
 dialog.addEventListener('close',()=>{if(previousFocus?.isConnected)previousFocus.focus();});
 function original(start,end){const box=el('section',null,'explanation-source');box.append(el('h4','Im Original'));const quote=el('blockquote');quote.append(document.createTextNode(stage.text.slice(Math.max(0,start-90),start)),el('mark',stage.text.slice(start,end)),document.createTextNode(stage.text.slice(end,Math.min(stage.text.length,end+100))));box.append(quote);button(box,'Diese Stelle am Brett festhalten',()=>{dialog.close();onAnchor(start,end);});return box;}
 function wordCard(entry){const card=el('section',null,'explanation-card');card.append(el('h3',entry.word),el('h4','Bedeutung in heutigem Deutsch'),el('p',entry.meaning));if(entry.context)card.append(el('h4','Zusammenhang · Lesehinweis'),el('p',entry.context));const link=el('a',entry.source?'Quelle zur Worterklärung ↗':entry.word==='Kaprize'?'Wortbedeutung im Duden ↗':'Im DWDS nachschlagen ↗');link.href=entry.source||(entry.word==='Kaprize'?'https://www.duden.de/rechtschreibung/Caprice':dictionaryUrl(entry.word));link.target='_blank';link.rel='noopener noreferrer';card.append(link);return card;}
 function passageCard(note){const card=el('section',null,'explanation-card passage-explanation');card.append(el('h3','Wendung / Textstelle'),el('blockquote',note.quote),el('h4','Sinngemäss heute'),el('p',note.plain),el('h4','Mögliche Lesart · offen zur Diskussion'),el('p',note.reading));const start=stage.text.indexOf(note.quote);button(card,'Originalstelle festhalten',()=>{dialog.close();onAnchor(start,start+note.quote.length);});return card;}
 function show(word='',range=null){anchor=range;input.value=word;heading.textContent='Wort und Textstelle erklären';render();open();if(!word){input.focus();}else{result.scrollTop=0;dialog.scrollTop=0;}}
 function render(){result.replaceChildren();const query=input.value.trim();if(!query){result.append(el('p','Markiere einen Satz im Stück oder gib ein Wort ein. Der Abschnittsüberblick zeigt dir alle bereits hinterlegten Hilfen zur aktuellen Textstrecke.'));return;}
  const entry=lookupWord(query),notes=explanationsFor(stage).filter(n=>{const start=stage.text.indexOf(n.quote);return anchor?start<anchor.end&&start+n.quote.length>anchor.start:query.length>3&&(n.quote.toLowerCase().includes(query.toLowerCase())||query.toLowerCase().includes(n.quote.toLowerCase()));});
  if(anchor)result.append(original(anchor.start,anchor.end));
  if(entry)result.append(wordCard(entry));
  for(const note of notes)result.append(passageCard(note));
  if(!entry){const terms=[...new Map(findTerms(query).map(t=>[t.entry.word,t.entry])).values()];if(terms.length){result.append(el('h3','Wörter in deiner Auswahl'));for(const term of terms)result.append(wordCard(term));}
   if(!notes.length){result.prepend(el('p','Für diese Stelle ist noch keine redaktionelle Gesamterklärung hinterlegt. Die folgenden Hilfen sind keine automatische Übersetzung des Satzes.'));if(!terms.length)result.append(el('p','Prüfe auch historische Schreibweisen oder mögliche Übertragungsfehler. Im Abschnittsüberblick findest du die bereits erläuterten Wörter und Wendungen.'));
    if(!/\s/.test(query)&&query.length<81){const link=el('a','Dieses Wort im DWDS nachschlagen ↗');link.href=dictionaryUrl(query);link.target='_blank';link.rel='noopener noreferrer';result.append(link);}
    const guide=el('details');guide.append(el('summary','Einen schwierigen Satz selbst erschliessen'));const list=el('ol');for(const text of ['Wer spricht zu wem? Trenne die Rede von der Regieanweisung.','Suche das Verb und frage: Wer tut was? Worauf beziehen sich „er“, „sie“, „ihn“ oder „das“?','Achte auf Verneinungen sowie „aber“, „weil“ und „wenn“. Formuliere die Aussage zunächst möglichst schlicht.','Prüfe im Dialog davor und danach: Ist die Aussage wörtlich, ironisch, eine Forderung oder eine Behauptung?'])list.append(el('li',text));guide.append(list);result.append(guide);
   }
  }
 }
 form.onsubmit=e=>{e.preventDefault();anchor=null;const q=input.value.trim(),at=stage?.text.indexOf(q);if(q&&at>=0)anchor={start:at,end:at+q.length};render();};
 function selectionRange(){const selection=getSelection();if(!selection?.rangeCount||selection.isCollapsed||!article)return null;const range=selection.getRangeAt(0);if(!article.contains(range.startContainer)||!article.contains(range.endContainer))return null;const before=range.cloneRange();before.selectNodeContents(article);before.setEnd(range.startContainer,range.startOffset);const start=before.toString().length;return {start,end:start+range.toString().length};}
 explain.onpointerdown=e=>e.preventDefault();
 function openSelection(){const range=selectionRange();if(range)explainRange(range.start,range.end);else show();}
 function explainRange(start,end){if(!stage?.text||start<0||end>stage.text.length||end<=start)return;show(stage.text.slice(start,end),{start,end});}
 function showOverview(){anchor=null;input.value='';heading.textContent='Hilfen zu dieser Textstrecke';result.replaceChildren();const notes=explanationsFor(stage),terms=[...new Map(findTerms(stage?.text||'').map(t=>[t.entry.word,t.entry])).values()];result.append(el('p',`${notes.length} erläuterte Textstellen · ${terms.length} Wörter und Wendungen in diesem Abschnitt.`));for(const note of notes)result.append(passageCard(note));const list=el('div',null,'section-word-list');for(const entry of terms)button(list,entry.word,()=>{const t=findTerms(stage.text).find(t=>t.entry===entry);show(t.text,{start:t.start,end:t.end});});result.append(el('h3','Wörter und Wendungen'),list);if(!terms.length&&!notes.length)result.append(el('p','Hier sind noch keine speziellen Hilfen hinterlegt. Du kannst einzelne Wörter über das Suchfeld nachschlagen.'));open();dialog.scrollTop=0;}
 function annotate(node){const walker=document.createTreeWalker(node,NodeFilter.SHOW_TEXT),nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);let base=0;for(const text of nodes){const value=text.textContent,offset=base;base+=value.length;const fragment=document.createDocumentFragment();let end=0;for(const match of findTerms(value)){fragment.append(document.createTextNode(value.slice(end,match.start)));const b=el('button',match.text,'glossary-word');b.type='button';b.dataset.word=match.text;b.title=match.text+' erklären';b.setAttribute('aria-label',match.text+' — Wort erklären');b.onclick=e=>{e.stopPropagation();show(match.text,{start:offset+match.start,end:offset+match.end});};b.onkeydown=e=>e.stopPropagation();fragment.append(b);end=match.end;}if(end){fragment.append(document.createTextNode(value.slice(end)));text.replaceWith(fragment);}}}
 function mount(next,node){if((stage?.id!==next.id||!node)&&dialog.open)dialog.close();stage=next;article=node;bar.hidden=!node;if(node)annotate(node);}
 function hide(){stage=null;article=null;anchor=null;bar.hidden=true;if(dialog.open)dialog.close();}
 return {mount,hide,explainRange};
}
