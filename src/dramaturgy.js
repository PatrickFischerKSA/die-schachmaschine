import pages from './play-pages.json' with {type:'json'};
// Editorial questions are invitations to interpret; none supplies a model answer.
const specs=[
 [1,4,[1,4,3,6,0],'Wessen Liebe wird hier von wem beschrieben? Unterscheide Sophies Antwort, die Absicht der Baronin und Julies abwesende Stimme.'],
 [1,6,[5,12,8,9,0],'Carl entwirft sein öffentliches Bild. Was weiss Salden, was soll der Onkel sehen, und was weiss das Publikum bereits?'],
 [1,10,[3,4,5,8,0],'Wer bestimmt, was als Verlobung oder Zustimmung gilt? Stelle Selbstäusserung und fremde Zuschreibung nebeneinander.'],
 [2,2,[8,5,9,12,0],'Vergleiche Carls Auftreten mit seiner früheren Ankündigung. Was kann der Onkel wissen, worüber verfügt das Publikum?'],
 [2,7,[7,1,2,6,0],'Wie deutet der Graf das Gespräch mit Rink? Welche Differenz zeigt sich zwischen Aussage, Selbstbild und fremder Wahrnehmung?'],
 [2,10,[5,6,8,3,0],'Verkleidung und Zugang: Wer ermöglicht wem eine Begegnung, und wer erkennt wen nicht? Prüfe frühere Deutungen von Carls Hilfe.'],
 [3,1,[2,1,5,3,0],'Rink zieht für beide Seiten nach einem Buch. Was führt er aus, was entscheidet er? Vergleiche diese Anordnung mit den Heiratsplänen.'],
 [3,4,[3,1,7,6,0],'Schmuck, Befehl und Widerspruch: Stelle die Julie zugedachte Position ihrer eigenen Äusserung gegenüber. Was bedeutet das Behalten des Geschenks?'],
 [3,8,[4,5,3,6,0],'Sophie gibt Informationen weiter. Wer gewinnt dadurch Handlungsmöglichkeiten? Untersuche auch Carls Bedingungen und Sophies Widerstand.'],
 [3,11,[6,7,1,5,0],'Welche Möglichkeiten bleiben Wendheim im Gespräch mit seinem Bruder? Unterscheide Geld, Wissen, Verwandtschaft und Abhängigkeit.'],
 [4,2,[5,13,7,10,0],'Wer sitzt im Kasten, wer soll darin vermutet werden? Verfolge, wie Drohung, Gegenwehr und Bezahlung die Handlung verändern.'],
 [4,8,[1,2,8,5,0],'Was verändert die Entdeckung gegenüber dem geplanten Ablauf? Revidiere eine frühere Lesart der Täuschung mit einem neuen Beleg.'],
 [4,10,[3,6,5,2,0],'Carl nennt die Anwesenden Figuren. Wer handelt hier selbst, wer wird bewegt? Prüfe, wie Julie zu Wort kommt.'],
 [4,13,[4,5,7,8,0],'Wer darf am Ende ein Nein als Ja auslegen? Vergleiche die komische Auflösung mit früheren Deutungen von Zustimmung und Handlungsmacht.']
];
export const checkpoints=Object.fromEntries(specs.map(([act,scene,perspectives,prompt],index)=>{const page=pages.filter(p=>p.act===act&&p.scene===scene).at(-1);return [page.id,{index,act,scene,perspectives,prompt}];}));
export const layers={knowledge:'Wissen / Unwissen',intention:'Absicht',assumption:'Zugeschriebene Absicht',dependence:'Abhängigkeit',position:'Selbstbild / fremde Rolle'};
export const certainties={explicit:'Ausdrücklich im Text',inferred:'Meine Deutung',unknown:'Offen / nicht belegt'};
export const effects={neutral:'Nur Verbindung',approach:'Unterstützung / Annäherung',avoid:'Widerspruch / Entzug',control:'Zugedachte Rolle / Einfluss',release:'Eigener Handlungsspielraum'};
export function checkpoint(stage){return checkpoints[stage.id];}
export function assignedPerspective(stage,seat){const c=checkpoint(stage);return c?c.perspectives[(seat+c.index)%c.perspectives.length]:null;}
export function pageIndexAt(stage){if(stage.kind==='text')return pages.findIndex(p=>p.id===stage.id);return pages.findLastIndex(p=>p.act<=stage.act);}
export function validateClaim(input,stage,entries=[],author='solo'){
 if(!input||!Object.hasOwn(layers,input.layer)||!Object.hasOwn(certainties,input.certainty)||!Object.hasOwn(effects,input.effect))return 'Wähle Ebene, Belegstatus und räumliche Bedeutung.';
 if(![input.perspective,input.from,input.to].every(x=>Number.isInteger(x)&&x>=0&&x<=13)||input.from===0||input.to===0||input.from===input.to)return 'Verbinde zwei verschiedene Figuren; die Publikumsperspektive ist zusätzlich wählbar.';
 if(typeof input.statement!=='string'||input.statement.trim().length<12||input.statement.length>1500||typeof input.reason!=='string'||input.reason.trim().length<12||input.reason.length>2000)return 'Formuliere Aussage und Begründung mit jeweils mindestens 12 Zeichen.';
 const p=pages[input.page];if(!p||input.page>pageIndexAt(stage)||!Number.isInteger(input.start)||!Number.isInteger(input.end)||input.start<0||input.end>p.text.length||input.end-input.start<12||input.end-input.start>1800)return 'Markiere 12–1800 Zeichen aus einer bereits erreichten Textstrecke.';
 if(input.revises!=null){const old=entries.find(x=>x.id===input.revises);if(!old||old.author!==author||entries.some(x=>x.revises===old.id)||old.perspective!==input.perspective)return 'Du kannst nur deine eigene jüngste Deutung aus derselben Perspektive revidieren.';if(input.page<=old.page)return 'Eine Revision braucht einen Beleg aus einer späteren Textstrecke.';}
 return '';
}
export function latestClaims(entries){const replaced=new Set(entries.map(e=>e.revises).filter(x=>x!=null));return entries.filter(e=>!replaced.has(e.id));}
export function perspectiveComplete(state,stage,author='solo',seat=null){if(!checkpoint(stage))return true;const entries=(state.interpretations||[]).filter(e=>e.stage===stage.id&&e.author===author);const viewpoints=new Set(entries.map(e=>e.perspective));const enough=seat===null?viewpoints.size>=2:viewpoints.has(assignedPerspective(stage,seat));const comparison=state.comparisons?.[stage.id]?.[author];return enough&&(![11,13].includes(checkpoint(stage).index)||entries.some(e=>e.revises!=null))&&typeof comparison==='string'&&comparison.trim().length>=24;}
export function quote(e){return pages[e.page].text.slice(e.start,e.end);}
export function location(e){const p=pages[e.page];return `${p.act}. Aufzug · ${p.scene}. Auftritt · Textstrecke ${p.part}/${p.parts}`;}
// Spatial distance encodes an explicitly authored relation, never rank or moral worth.
export function constellation(entries,perspective,roleList,at=Infinity){const current=latestClaims(entries.filter(e=>e.order<=at)).filter(e=>e.perspective===perspective);const focus=perspective||current.at(-1)?.from||3;const positions=new Map([[focus,'d4']]);const near=['c4','e4','d3','d5','c3','e5','c5','e3'];const far=['a1','h8','a8','h1','a4','h4','d8','d1'];const neutral=['b2','f2','b6','f6','b4','f4','d2','d6','c7','g3','a6','h6','f8'];const used=new Set(['d4']);for(let i=1;i<roleList.length;i++){if(i===focus)continue;const links=current.filter(e=>(e.from===focus&&e.to===i)||(e.to===focus&&e.from===i));const link=new Set(links.map(e=>e.effect)).size>1?null:links.at(-1);const pool=link?.effect==='approach'?near:link?.effect==='avoid'?far:neutral;const square=[...pool,...near,...far,...neutral].find(s=>!used.has(s));used.add(square);positions.set(i,square);}
 return {focus,positions,claims:current};}

// Textual events with narrow, explicit access scopes. Absence from a scope means
// 'not established by this evidence', never a proof of a character's ignorance.
const factSpecs=[
 [1,6,'ich will aber närrischer scheinen, als ich bin.',[5,12],'Carl erklärt Salden seine beabsichtigte Aussenwirkung.'],
 [2,3,'Mich wundert nur, daß er mir so leicht geglaubt hat.',[5,9],'Carl und Frey sprechen über die Täuschung des Onkels.'],
 [3,1,'hat ein Buch in der Hand und zieht die Schachsteine auf beiden Seiten',[2],'Die Regieanweisung zeigt Rinks Spiel nach Buch für beide Seiten.'],
 [3,4,'Du behältst ihn! ich befehl es!',[1,3,7],'Die Baronin befiehlt Julie, den Schmuck zu behalten.'],
 [3,5,'bleibt sie stehen und lauscht mit einer arglistigen Miene.',[4],'Das Publikum sieht Sophie lauschen. Ihr Bemerktwerden ist hier nicht belegt.'],
 [3,5,'Sorgen Sie für einen Kasten, in welchem Sie sich verbergen können',[1,7,4],'Der Graf soll in einem Kasten ins Haus getragen werden; Sophie lauscht dem Plan.'],
 [3,8,'Der Graf wird heute in einem Kasten ins Haus gebracht.',[4,3,5],'Sophie gibt die Nachricht über den Kasten an Carl und Julie weiter.'],
 [4,2,'Carl. (im Hineintreten.)',[5,13],'Carl steigt vor den Trägern in den ersten Kasten.'],
 [4,8,'Carl. (springt plöklich hervor.)',[5,1,2,8],'Carl kommt hervor; die Baronin, Rink und der ältere Ruf können ihn erkennen.'],
 [4,10,'Glaubst Du (zu Julien) mit ihm glücklich zu werden? Julie. Ganz glücklich, lieber Onkel.',[2,3,4,5,6,8],'Rink fragt Julie; sie antwortet selbst auf die Frage nach ihrem Glück.'],
 [4,13,'Graf. (öffnet den Kasten, und kommt halb zitternd halb gravitätisch heraus.)',[7,2,3,4,5,6,8],'Der Graf öffnet den zweiten Kasten und kommt heraus.']
];
export const facts=factSpecs.map(([act,scene,needle,access,label],id)=>{const page=pages.findIndex(p=>p.act===act&&p.scene===scene&&p.text.includes(needle));if(page<0)throw Error('Textbeleg fehlt: '+needle);const start=pages[page].text.indexOf(needle);return {id,page,start,end:start+needle.length,access:[0,...access],label};});
export function availableFacts(stage,perspective){const at=pageIndexAt(stage);return facts.filter(f=>f.page<=at).map(f=>{const disclosure=f.id===7&&at>=facts[8].page&&facts[8].access.includes(perspective)?facts[8]:null;return {...f,known:f.access.includes(perspective)||!!disclosure,disclosure};});}
