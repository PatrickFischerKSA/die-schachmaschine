import pages from './play-pages.json' with {type:'json'};
export {pages};
export const roles=[
 {name:'Regie',square:'a1',pattern:null,type:'r'},
 {name:'Baronin',square:'d6',pattern:/\bBaroninn?[.,:]/,type:'q'},
 {name:'Baron Rink',square:'e1',pattern:/\bBaron[.,:]/,type:'k'},
 {name:'Julie',square:'c3',pattern:/\bJulie[.,:]/,type:'q'},
 {name:'Sophie',square:'g3',pattern:/\bSophie[.,:-]/,type:'b'},
 {name:'Carl Ruf',square:'a4',pattern:/\bCarl[.,:]/,type:'n'},
 {name:'Wendheim',square:'f3',pattern:/\bWendheim[.,:]/,type:'n'},
 {name:'Graf Balken',square:'e7',pattern:/\bGraf[.,:]/,type:'p'},
 {name:'Der ältere Ruf',square:'b6',pattern:/\bRuf[.,:]/,type:'k'},
 {name:'Frey',square:'b2',pattern:/\bFrey[.,:]/,type:'p'},
 {name:'Flucht',square:'g6',pattern:/\bFlucht[.,:]/,type:'p'},
 {name:'Marie',square:'h3',pattern:/\bMarie[.,:]/,type:'p'},
 {name:'Salden',square:'h5',pattern:/\bSalden[.,:]/,type:'b'},
 {name:'Bediente und Träger',square:'f7',pattern:/\b(?:Bedienter|Träger)[.,:]/,type:'r'}
];
export const actPrompts=['Wer versucht über wen zu bestimmen? Halte eine konkrete Formulierung aus dem ersten Aufzug fest und beschreibe ihre Wirkung.','Was erfährst du über Geld, Rang und die Absichten der Figuren? Belege deine Beobachtung mit einer Stelle aus dem zweiten Aufzug.','Wie verbinden sich Schachspiel, Kastenplan und Julies Widerspruch? Wähle eine Textstelle und erkläre den Zusammenhang.','Wer hat am Ende Handlungsspielraum gewonnen? Vergleiche eine Stelle aus dem Schluss mit deiner ersten Beobachtung. Was bleibt widersprüchlich?'];
export const stages=[];
for(let i=0;i<pages.length;i++){const p=pages[i];const present=roles.map((r,i)=>r.pattern&&new RegExp('(?:^|[.!?\\n)])\\s*'+r.pattern.source).test(p.text)?i:null).filter(i=>i!==null);stages.push({...p,title:p.act?`${['','I','II','III','IV'][p.act]}. Aufzug · ${p.scene}. Auftritt`:'Titel und Personen',roleIndex:p.act===0?0:present[0]??0,present:p.act===0?[0,...present]:present.length?present:[0],kind:'text'});if(p.act&&pages[i+1]?.act!==p.act)stages.push({id:'act-note-'+p.act,act:p.act,kind:'reflection',title:'Nach dem '+p.act+'. Aufzug',prompt:actPrompts[p.act-1],roleIndex:0});}
stages.push({id:'ending',kind:'ending',act:4,title:'Der ganze Text liegt hinter euch.',roleIndex:0});
export const ratingStages=stages.filter(s=>s.kind==='reflection').map(s=>s.id);
export const freshState=()=>({version:1,step:0,opened:false,tableau:null,records:{}});
export function canAdvance(s){const stage=stages[s.step];return stage?.kind==='text'?s.opened:stage?.kind==='reflection'?!!s.tableau&&typeof s.records[stage.id]?.reason==='string'&&s.records[stage.id].reason.trim().length>=12:false;}
export function act(s,e){const stage=stages[s.step],next=structuredClone(s);const reject=notice=>({state:s,notice,changed:false});if(e.type==='stage'&&stage.kind==='reflection'){if(!Number.isInteger(e.role)||e.role<1||e.role>=roles.length||typeof e.to!=='string'||!/^([a-h][1-8])$/.test(e.to)||roles.some(r=>r.square===e.to))return reject('Wähle eine Person und ein freies Zielfeld.');next.tableau={role:e.role,to:e.to};}else if(e.type==='open'&&stage.kind==='text'){if(e.role!==stage.roleIndex)return reject('Hole die angezeigte Lesestimme ans Pult.');next.opened=true;}else if(e.type==='record'&&stage.kind==='reflection'&&typeof e.reason==='string'){next.records[stage.id]={choice:'',reason:e.reason.slice(0,2000)};}else if(e.type==='next'&&canAdvance(s)){next.step++;next.opened=false;next.tableau=null;}else return reject('Lies zuerst die Textstrecke oder halte deine Beobachtung fest.');return {state:next,changed:true,notice:''};}
export function restore(raw){try{const s=JSON.parse(raw);if(s?.version!==1||!Number.isInteger(s.step)||s.step<0||s.step>=stages.length||typeof s.opened!=='boolean'||!s.records||typeof s.records!=='object'||Array.isArray(s.records))return null;for(const [id,r]of Object.entries(s.records))if(!ratingStages.includes(id)||typeof r?.reason!=='string'||r.reason.length>2000)return null;if(s.tableau!=null&&(!Number.isInteger(s.tableau.role)||s.tableau.role<1||s.tableau.role>=roles.length||typeof s.tableau.to!=='string'||!/^([a-h][1-8])$/.test(s.tableau.to)||roles.some(r=>r.square===s.tableau.to)))return null;return {version:1,step:s.step,opened:s.opened,tableau:s.tableau||null,records:s.records};}catch{return null;}}
export function journalText(s){return ['DIE SCHACHMASCHINE — Vollständige Lektüre',`Stand: ${stages[s.step].title}`,`${stages.slice(0,s.step).filter(s=>s.kind==='text').length} von ${pages.length} Textstrecken durchlaufen.`,...ratingStages.flatMap(id=>s.records[id]?['',stages.find(s=>s.id===id).title,s.records[id].reason]:[])].join('\n');}
