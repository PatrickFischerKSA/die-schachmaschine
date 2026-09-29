import {createScene} from './scene.js';
import {scenarios,people,scenarioById,availableScenarios,conditionsFor,createRun,stepRun,finishRun,namesFor,evidenceFor,stageFor} from './ensemble-model.js';
import {readingLimit} from './inner-perspectives.js';
const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!=null)n.textContent=text;if(cls)n.className=cls;return n;};
const btn=(p,t,fn)=>{const b=el('button',t);b.type='button';b.onclick=fn;p.append(b);return b;};
function select(parent,label,id,options,value,change){
  const wrap=el('label',label),input=el('select');input.id=id;input.setAttribute('aria-label',label);
  for(const item of options){const o=el('option',item.label);o.value=item.value;o.disabled=!!item.disabled;input.append(o);}
  input.value=value;input.onchange=()=>change(input.value);wrap.append(input);parent.append(wrap);return input;
}
const options=entries=>entries.map(([value,label])=>({value,label}));
export function createDecisionUI({onSource}){
  const dialog=el('dialog',null,'decision-dialog');dialog.setAttribute('aria-labelledby','decision-heading');document.body.append(dialog);
  let scenarioId='carriers',person='carl',limit=-1,condition='baseline',mode='counterfactual',runs=[],history=[],revealed=false,verdict='',opener=null,actor='all';
  let slot=Math.random()<.5,boards=[],notes={};
  const current=()=>scenarioById(scenarioId);
  function disposeBoards(){boards.forEach(b=>b.scene?.dispose());boards=[];}
  function reset(){
    const settings=conditionsFor(current())[condition][1];
    runs=mode==='blind'?(slot?['rules','goals']:['goals','rules']).map(m=>createRun(scenarioId,m,settings)):[createRun(scenarioId),createRun(scenarioId,'goals',settings)];
    history=[];revealed=false;verdict='';
  }
  function changeScenario(id,focus){
    disposeBoards();scenarioId=id;person=focus||current().focus;actor='all';condition='baseline';reset();render();
  }
  function board(parent,run,i){
    if(!boards[i]){
      const node=el('div',null,'decision-board');node.setAttribute('aria-label','Modellbühne: '+current().title);parent.append(node);
      try{const scene=createScene(node,()=>{});scene.setTheme(1);scene.view('room');scene.setZoom(130);boards[i]={node,scene};}
      catch{node.textContent='3D nicht verfügbar. Zustände und Beziehungen stehen im Protokoll.';boards[i]={node};}
    }else parent.append(boards[i].node);
    const scene=boards[i].scene,{positions,edges}=stageFor(run),names=namesFor(run);
    if(scene){
      scene.setPieces(Object.entries(names).map(([id,label],j)=>({square:positions.get(id),label,type:j===0?'n':'p',color:j===0?'w':'b'})));
      scene.showRelations(edges,positions);scene.speaker(names[run.trace.at(-1)?.actor]);
      const views=el('div',null,'decision-views');btn(views,'Raum',()=>scene.view('room'));btn(views,'Draufsicht',()=>scene.view('top'));
      for(const [id,name]of Object.entries(names))btn(views,'Blick von '+name,()=>scene.viewRelationship(positions.get(id),[...positions].filter(([other])=>other!==id).map(([,p])=>p)));
      btn(views,'Näher +',()=>scene.setZoom(scene.getZoom()*1.2));btn(views,'Weiter −',()=>scene.setZoom(scene.getZoom()/1.2));parent.append(views);
    }
    parent.append(el('small','Modellbühne: Blau = Informationsweg; Rosa = Zuschreibung; Gelb = Absicht; Rot = Druck oder Grenze; Grün = gewährter Spielraum. Gestrichelt = Modellannahme. Die Felder sind keine historischen Bühnenpositionen. Mausrad zoomt, Ziehen dreht.'));
    if(run.scenario==='carriers')parent.append(el('small','In dieser Transportstudie bedeutet räumliche Nähe zusätzlich zugesagte Kooperation.'));
    const relationships=el('ul',null,'decision-relations');
    for(const e of edges)relationships.append(el('li',`${names[e.from]} → ${names[e.to]}: ${e.label}`));
    if(!edges.length)relationships.append(el('li','Noch keine ausgeführte Beziehungshandlung.'));
    parent.append(relationships);
  }
  function render(){
    const s=current(),names=namesFor(runs[0]),available=availableScenarios(limit);
    dialog.replaceChildren();btn(dialog,'Schliessen',()=>dialog.close()).className='strategy-close';
    const heading=el('h2','Figuren entscheiden · '+s.title);heading.id='decision-heading';dialog.append(heading);
    dialog.append(el('p',`Eine ausdrücklich konstruierte Simulation zu ${s.location}. Regeln, Bewertungen und Gegenproben sind Interpretationsannahmen. Die Gegenprobe schreibt den Originaltext nicht um. Es läuft kein Sprachmodell.`));
    const navigation=el('div',null,'decision-navigation');
    select(navigation,'Figur untersuchen','decision-person',Object.entries(people).map(([id,p])=>({value:id,label:p.name+(available.some(s=>s.actors[id])?'':' · Textstelle noch nicht erreicht'),disabled:!available.some(s=>s.actors[id])})),person,id=>{
      const own=available.find(s=>s.focus===id)||available.find(s=>s.actors[id]);changeScenario(own.id,id);
    });
    select(navigation,'Gelesene Entscheidungssituation','decision-scenario',available.map(s=>({value:s.id,label:s.location+' · '+s.title})),scenarioId,id=>changeScenario(id));
    dialog.append(navigation,el('p',`${available.length} von ${scenarios.length} Studien zugänglich. Weitere Situationen öffnen sich mit der Lektüre, einschliesslich eigener Entscheidungen der Nebenfiguren.`));
    const question=el('section',null,'decision-question'),theory=el('details');theory.append(el('summary','Verbindung zu Regel, Täuschung und KI'),el('p',s.theory));question.append(el('h3','Interpretationsfrage'),el('p',s.question),theory);dialog.append(question);
    const toolbar=el('div',null,'decision-controls');
    select(toolbar,'Versuchsart','decision-mode',options([['counterfactual','Gegenprobe: nur eine Bedingung verändern'],['blind','Blindvergleich: zwei Verfahren']]),mode,v=>{mode=v;reset();render();});
    select(toolbar,'Veränderte Bedingung','decision-condition',options(Object.entries(conditionsFor(s)).map(([id,[title]])=>[id,title])),condition,v=>{condition=v;reset();render();});
    btn(toolbar,'Ein Verarbeitungsschritt',()=>{history.push(structuredClone(runs));runs=runs.map(stepRun);render();}).id='decision-step';
    btn(toolbar,'Bis zum Ergebnis',()=>{history.push(structuredClone(runs));runs=runs.map(finishRun);render();}).id='decision-finish';
    const back=btn(toolbar,'Schritt zurück',()=>{runs=history.pop();render();});back.disabled=!history.length;
    btn(toolbar,'Versuch neu beginnen',()=>{reset();render();});
    toolbar.querySelector('#decision-step').disabled=runs.every(r=>r.ended);toolbar.querySelector('#decision-finish').disabled=runs.every(r=>r.ended);dialog.append(toolbar,el('p','Versuchsbedingung: '+conditionsFor(s)[condition][0]));
    select(dialog,'Akteur im Ablaufprotokoll','decision-actor-filter',options([['all','Alle Akteure'],...Object.entries(names)]),actor,v=>{actor=v;render();});
    const grid=el('div',null,'decision-comparison');
    runs.forEach((run,i)=>{
      const col=el('section');col.dataset.run=i;
      col.append(el('h3',mode==='blind'?['Verfahren A','Verfahren B'][i]+(revealed?' · '+(run.model==='rules'?'feste Ablaufregeln':'Ziele und Annahmen'):''):i===0?'Ausgangslage':'Gegenprobe'),el('p',run.outcome||'Noch kein Ergebnis · '+run.trace.length+' Verarbeitungsschritte'));
      if(mode!=='blind'||revealed){
        board(col,run,i);const last=run.trace.at(-1);
        if(last){col.append(el('small','Originalbezug dieser Phase – kein Beleg für den Verlauf der Gegenprobe'),el('blockquote',evidenceFor(run,last.evidence).text));}
        for(const [id,state]of Object.entries(run.actors)){
          if(actor!=='all'&&actor!==id)continue;
          const card=el('article',null,'decision-actor');card.dataset.actor=id;
          card.append(el('h4',names[id]),el('p','Eigenes Ziel: '+state.goal));
          if(state.identity)card.append(el('p','Identitätsannahme: '+state.identity));
          if(state.unknown)card.append(el('p','Nicht gesichert: '+state.unknown));
          if(state.status)card.append(el('p','Eigene Handlung / Folge: '+state.status));
          if(run.scenario==='carriers'&&id!=='carl')card.append(el('p','Transportbereitschaft: '+(state.cooperates?'zugesagt':'nicht zugesagt')));
          for(const b of state.beliefs)card.append(el('p',b.status+': '+b.claim));
          const inputs=el('details');inputs.append(el('summary','Bereitgestellte Eingänge und beobachtete Modellhandlungen'));
          const ul=el('ul');for(const p of state.perceived.filter(p=>p.accessible))ul.append(el('li',p.text||evidenceFor(run,p.source)?.text||p.action));inputs.append(ul);card.append(inputs);col.append(card);
        }
      }
      const list=el('ol',null,'decision-trace');
      for(const t of run.trace.filter(t=>actor==='all'||t.actor===actor)){
        if(mode==='blind'&&!revealed&&t.phase!=='Handeln')continue;
        const li=el('li');li.append(el('strong',`${names[t.actor]} · ${mode==='blind'&&!revealed?'Handlung':t.phase}`),el('p',t.detail));
        if(mode!=='blind'||revealed){
          if(t.candidates){
            const table=el('table'),head=el('tr');for(const name of ['Alternative','Gewicht','Gesetzte Begründung'])head.append(el('th',name));table.append(head);
            for(const c of t.candidates){const tr=el('tr');tr.append(el('td',c.label),el('td',String(c.score)),el('td',c.rule));table.append(tr);}li.append(table);
          }
          const d=el('details');d.append(el('summary','Tatsächlicher Zustand vorher / nachher'),el('pre',JSON.stringify({vorher:t.before[t.actor],nachher:t.after[t.actor],weltVorher:t.worldBefore,weltNachher:t.world},null,2)));li.append(d);
          btn(li,'Originalbezug',()=>{const e=evidenceFor(run,t.evidence);onSource(e.page,e.start,e.end);});
        }
        list.append(li);
      }
      col.append(list);grid.append(col);
    });dialog.append(grid);
    if(mode==='blind'){
      const label=el('label','Dein Urteil vor der Offenlegung: Worin unterscheiden sich die Verfahren?'),area=el('textarea');
      area.id='decision-verdict';area.value=verdict;area.rows=3;area.maxLength=2000;area.disabled=revealed;label.append(area);dialog.append(label);
      const reveal=btn(dialog,'Verfahren und Protokolle offenlegen',()=>{revealed=true;render();});reveal.id='decision-reveal';
      reveal.disabled=!runs.every(r=>r.ended)||verdict.trim().length<12;
      area.oninput=()=>{verdict=area.value;reveal.disabled=!runs.every(r=>r.ended)||verdict.trim().length<12;};
      dialog.append(el('p','Dies ist ein Vergleich zweier programmierter Verfahren, kein Mensch-Maschine-Turing-Test. Gleiche Ergebnisse können durch unterschiedliche Verfahren entstehen.'));
    }
    const critique=el('label','Deine Modellkritik: Welche Priorität, Annahme über andere oder Reaktion würdest du anhand welcher Textstelle verändern?'),note=el('textarea');
    note.id='decision-critique';note.rows=3;note.maxLength=4000;note.value=notes[scenarioId]||'';note.oninput=()=>{notes[scenarioId]=note.value;};critique.append(note);dialog.append(critique);
    dialog.append(el('p','Sichere deinen Versuch vor einem Szenenwechsel, Neubeginn oder erneuten Öffnen als Datei. Deine Modellkritik je Studie bleibt bis zum Neuladen erhalten. Versuche und Notizen werden nicht an Mitspielende übertragen.'));
    btn(dialog,'Versuch und Protokolle sichern',()=>{
      const common={scenario:scenarioId,person,mode,condition,verdict,critique:notes[scenarioId]||''};
      const data=mode==='blind'&&!revealed?{...common,outputs:runs.map(r=>({outcome:r.outcome,actions:r.trace.filter(t=>t.phase==='Handeln').map(t=>({actor:t.actor,action:t.action}))}))}:{...common,runs};
      const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'})),a=el('a');a.href=url;a.download='schachmaschine-entscheidungsversuch-'+scenarioId+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    });
  }
  dialog.addEventListener('close',()=>{disposeBoards();if(opener?.isConnected)opener.focus();});
  return {
    button(parent,context,perspective=0){
      const cutoff=readingLimit(context.stage,context.state.opened),available=availableScenarios(cutoff);
      const b=btn(parent,'Entscheidungssimulation · Figuren und Gegenproben',()=>{
        opener=b;limit=cutoff;
        const preferred=Object.keys(people).find(id=>people[id].role===perspective);
        const selected=available.find(s=>s.focus===preferred)||available.find(s=>s.actors[preferred])||[...available].sort((a,b)=>b.page-a.page)[0];
        scenarioId=selected.id;person=selected.actors[preferred]?preferred:selected.focus;actor='all';condition='baseline';mode='counterfactual';slot=Math.random()<.5;reset();dialog.showModal();render();
      });b.id='decision-open';b.disabled=!available.length;
      b.title=b.disabled?'Öffne die erste Textstrecke von I/1.':'Textgebundene Entscheidungen aller Figuren vergleichen';
      if(b.disabled)parent.append(el('p','Die ersten Entscheidungssituationen öffnen sich mit der Lektüre von I/1.'));
    },hide(){if(dialog.open)dialog.close();}
  };
}
