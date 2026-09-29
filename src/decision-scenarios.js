import pages from './play-pages.json' with {type:'json'};

// Authored, inspectable interpretations. A condition changes one assumption, never the source.
export const people = {
  baronin: {name:'Baronin',role:1}, rink:{name:'Baron Rink',role:2}, julie:{name:'Julie',role:3},
  sophie:{name:'Sophie',role:4}, carl:{name:'Carl Ruf',role:5}, wendheim:{name:'Wendheim',role:6},
  graf:{name:'Graf Balken',role:7}, ruf:{name:'Der ältere Ruf',role:8}, frey:{name:'Frey',role:9},
  flucht:{name:'Flucht',role:10}, marie:{name:'Marie',role:11}, salden:{name:'Salden',role:12},
  bedienter:{name:'Bedienter',role:13}, first:{name:'Erster Träger',role:13}, second:{name:'Zweiter Träger',role:13}
};
const source=(page,needle)=>{
  const index=pages.findIndex(p=>p.id===page),start=pages[index]?.text.indexOf(needle);
  if(start==null||start<0)throw Error('Entscheidung ohne Beleg: '+page+' / '+needle);
  return {page:index,start,end:start+needle.length,text:needle};
};
const actor=(goal,unknown)=>({goal,unknown});
const choice=(id,label,when,effect,reason)=>({id,label,when,effect,reason});
const effect=(claim,to,layer='intention',facts={})=>({claim,to,layer,facts});
const event=(actor,page,needle,input,belief,choices)=>({actor,source:source(page,needle),input,belief,choices});
const scenario=(id,title,focus,location,actors,condition,question,theory,events)=>({
  id,title,focus,location,actors,condition,question,theory,events,
  page:Math.max(...events.map(e=>e.source.page))
});
const changed=r=>r.settings.changed;
const notChanged=r=>!r.settings.changed;
const after=(r,flag,yes,no)=>r.world[flag]?yes:no;

export const ensembleScenarios=[
  scenario('marie','Marie · Wahrheit unter einem Auftrag','marie','I/1',{
    marie:actor('Den Auftrag erfüllen, ohne eine materielle Grenze zu verschweigen.','Wie die Baronin den Hinweis wertet, ist noch offen.'),
    baronin:actor('Das gewünschte öffentliche Erscheinungsbild herstellen.','Maries Absicht hinter dem Hinweis ist nicht sicher bekannt.')
  },'Die Baronin akzeptiert die materielle Grenze',
  'Wann wird Ausführen zu eigenständigem Urteil? Ein sachlicher Hinweis kann einen Auftrag verändern.',
  'Chinesisches Zimmer: Auftragstreue und situationsbezogenes Verstehen sind hier verschiedene Leistungen. Marie ist keine bedeutungslose Regelmaschine.',[
    event('marie','text-1-1-0','Das Hinterhaar ist aber schon etwas sparsam geworden.',
      ()=>'Die Baronin verlangt mehr Locken aus dem Hinterhaar.',()=> 'Der Auftrag stösst auf eine sichtbare materielle Grenze; ein Einwand kann riskant sein.',[
        choice('state-limit','Den Mangel beim Ausführen benennen',()=>true,effect('Die Grenze ist ausgesprochen.','baronin','knowledge',{limitSpoken:true}),'Sachkenntnis wird gegenüber dem Ranggefälle höher gewichtet.'),
        choice('silent','Ohne Hinweis weiterarbeiten',()=>false,effect('Die Grenze bleibt unausgesprochen.','baronin'),'Auftragstreue könnte den Einwand verdrängen.')]),
    event('baronin','text-1-1-0','Noch ein paar Locken durch den Aussatz gezogen.',
      r=>after(r,'limitSpoken','Marie hat auf das knappe Haar hingewiesen.','Ein Einwand liegt nicht vor.'),
      r=>changed(r)?'Gegenprobe: Die Grenze wird als relevante Sachinformation anerkannt.':'Modellannahme: Der gewünschte Eindruck hat Vorrang vor dem Einwand.',[
        choice('demand','Eine weitere Änderung verlangen',notChanged,effect('Der Änderungsauftrag bleibt bestehen.','marie','dependence',{demand:true}),'Das Erscheinungsziel bleibt vorrangig.'),
        choice('adapt','Den Auftrag an die Grenze anpassen',changed,effect('Der Auftrag wird begrenzt.','marie','position',{demand:false}),'Anerkannte Materialgrenzen verändern den Auftrag.')]),
    event('marie','text-1-1-0','Marie. (befolgt es.)',
      r=>after(r,'demand','Ein weiterer Änderungsauftrag ist erteilt.','Die Baronin hat den Auftrag angepasst.'),
      r=>after(r,'demand','Der Hinweis hat die Rangordnung nicht aufgehoben.','Die Sachinformation hat den Auftrag verändert.'),[
        choice('execute','Die verlangte Änderung ausführen',r=>r.world.demand,effect('Marie führt aus; ihr Einwand bleibt dennoch wahr.','baronin'),'Ausführung bedeutet nicht, dass die Grenze verschwunden wäre.'),
        choice('limited-work','Die begrenzte Variante ausführen',r=>!r.world.demand,effect('Marie arbeitet innerhalb der anerkannten Grenze.','baronin','position'),'Die Gegenprobe verändert die Arbeit, nicht nur ihre Beschreibung.')])
  ]),
  scenario('rink','Rink · Wer darf über Julies Zukunft urteilen?','rink','I/1',{
    rink:actor('Eine verantwortbare Verbindung bestimmen; Geld und Eignung gegeneinander abwägen.','Julies eigene Zustimmung wird in diesem Gespräch nicht eingeholt.'),
    baronin:actor('Den Grafen als geeigneten Bewerber durchsetzen.','Rinks Ausschluss Wendheims bedeutet noch keine Zustimmung zum Grafen.')
  },'Rink macht Vermögen nicht zur notwendigen Bedingung',
  'Ein Nein zu Wendheim ist kein Ja zum Grafen. Wer verfügt hier über eine Entscheidung, die Julie selbst betrifft?',
  'Regelvergleich: Eine Auswahlregel nach Vermögen kann konsistent sein und trotzdem die entscheidende Perspektive – Julies Zustimmung – ausschliessen.',[
    event('rink','text-1-1-0','ohne Vermögen und Aussicht',
      ()=>'Wendheim wird als mittellos beschrieben.',r=>changed(r)?'Gegenprobe: Vermögen allein soll keinen Bewerber ausschliessen.':'Modellannahme: Fehlendes Vermögen gilt als Ausschlussgrund.',[
        choice('exclude','Wendheim ausschliessen',notChanged,effect('Rink schliesst Wendheim aus.','baronin','dependence',{excluded:true}),'Vermögen wird als notwendige Bedingung gesetzt.'),
        choice('hear','Ein Urteil bis zu weiteren Gründen und Julies Stimme aussetzen',changed,effect('Die Auswahl bleibt offen; Julie ist noch nicht gehört.','baronin','position',{excluded:false}),'Eine notwendige Bedingung wird zur abwägbaren Frage.')]),
    event('baronin','text-1-1-0','also, der Graf ist der Mann',
      r=>after(r,'excluded','Rink hat Wendheim ausgeschlossen.','Rink hält die Auswahl offen.'),
      r=>after(r,'excluded','Modellannahme: Sie deutet den Ausschluss als Raum für den Grafen.','Der bisherige Ausschlussgrund trägt nicht mehr.'),[
        choice('promote','Den Grafen als Folgerung vorschlagen',r=>r.world.excluded,effect('Der Graf wird als Ersatz vorgeschlagen.','rink','intention',{promoted:true}),'Sie nutzt die scheinbar verengte Auswahl.'),
        choice('argue','Den Grafen eigens begründen müssen',r=>!r.world.excluded,effect('Für den Grafen fehlt eine gemeinsame Entscheidungsgrundlage.','rink','assumption',{promoted:false}),'Ein Vorschlag folgt nicht mehr automatisch aus einem Ausschluss.')]),
    event('rink','text-1-1-0','Noch zehnmahl weniger!',
      r=>after(r,'promoted','Der Graf wird als passende Folgerung präsentiert.','Eine offene Abwägung ist nötig.'),
      r=>after(r,'promoted','Ablehnung eines Bewerbers beweist nicht die Eignung eines anderen.','Kein Bewerber hat dadurch Julies Zustimmung erhalten.'),[
        choice('reject-count','Auch den Grafen zurückweisen',r=>r.world.promoted,effect('Rink widerspricht der Folgerung der Baronin.','baronin','dependence'),'Die beiden Urteile bleiben getrennt.'),
        choice('leave-open','Die Entscheidung offenlassen und Julies Stimme verlangen',r=>!r.world.promoted,effect('Die Modellentscheidung wird vertagt; Julies Antwort bleibt offen.','baronin','position'),'Die Gegenprobe eröffnet Beteiligung, erzeugt aber keine Zustimmung.')])
  ]),
  scenario('baronin','Baronin · Einfluss durch eine Mittlerin','baronin','I/4',{
    baronin:actor('Julies Verbindung mit Wendheim verhindern.','Sophies Einfluss ist keine Zusage, ihn im gewünschten Sinn zu gebrauchen.'),
    sophie:actor('Julie unterstützen und ihre eigene Urteilskraft behalten.','Ob die Baronin einen Widerspruch gelten lässt, ist offen.')
  },'Die Baronin erkennt Julies eigene Entscheidung an',
  'Ist eine Bitte um Gefälligkeit frei ablehnbar, wenn sie von einer ranghöheren Person kommt?',
  'Verteiltes Handeln: Eine Mittlerin übersetzt einen Auftrag nicht neutral. Ihr eigenes Ziel kann die beabsichtigte Wirkung umkehren.',[
    event('baronin','text-1-4-0','Wenn Du ein wenig Gefälligkeit für mich haben wolltest',
      ()=>'Sophie hat Einfluss auf Julie und verteidigt die Beständigkeit der Liebe.',
      r=>changed(r)?'Gegenprobe: Einfluss soll ein Gespräch ermöglichen, keine Wahl erzwingen.':'Modellannahme: Sophies Einfluss lässt sich für die Heiratsplanung nutzen.',[
        choice('recruit','Sophie zum Ausreden der Liebe gewinnen',notChanged,effect('Sophie erhält einen Beeinflussungsauftrag.','sophie','dependence',{control:true}),'Das Ziel der Baronin bestimmt die gewünschte Botschaft.'),
        choice('invite','Sophie um ein offenes Gespräch mit Julie bitten',changed,effect('Die Bitte lässt Julies Antwort offen.','sophie','position',{control:false}),'Anerkannte Selbstbestimmung begrenzt die Mittlerrolle.')]),
    event('sophie','text-1-4-0','daß die Liebe gar nicht vernünftig seyn will.',
      r=>after(r,'control','Sophie soll Julie ihre Liebe ausreden.','Sophie soll ein offenes Gespräch ermöglichen.'),
      r=>after(r,'control','Der Auftrag widerspricht der angenommenen Loyalität zu Julie.','Ein Gespräch verlangt keine vorweggenommene Antwort Julies.'),[
        choice('rebut','Die Prämisse des Auftrags widersprechen',r=>r.world.control,effect('Sophie lässt sich nicht zur verlangten Botschaft machen.','baronin','dependence',{resistance:true}),'Loyalität zu Julie hat Vorrang vor Gefälligkeit.'),
        choice('mediate','Ein Gespräch ohne vorgegebenes Ergebnis vermitteln',r=>!r.world.control,effect('Sophie bietet Vermittlung unter offener Entscheidung an.','baronin','position',{resistance:false}),'Vermittlung und Manipulation werden getrennt.')]),
    event('baronin','text-1-4-0','Wendheim wird sie schlechterdings nie erhalten;',
      r=>after(r,'resistance','Sophie widerspricht dem Beeinflussungsauftrag.','Sophie bietet ein offenes Gespräch an.'),
      r=>changed(r)?'Ein eigener Entschluss Julies kann vom Plan abweichen.':'Modellannahme: Widerspruch wird mit einem Verbot beantwortet.',[
        choice('forbid','Das Verbot bekräftigen',notChanged,effect('Die Baronin hält am Ausschluss Wendheims fest.','sophie','dependence'),'Sie sichert den eigenen Plan gegen die Mittlerin.'),
        choice('listen','Das offene Gespräch zulassen',changed,effect('Die Entscheidung wird nicht durch Sophie vorweggenommen.','sophie','position'),'Anerkennung zeigt sich in einer geänderten Handlung.')])
  ]),
  scenario('julie','Julie · Entsagen ist nicht Lieben','julie','III/3',{
    julie:actor('Die Grenze zwischen äusserem Gehorsam und eigener Zuneigung behaupten.','Ob die Tante die Grenze respektiert, ist offen.'),
    baronin:actor('Eine standesgemässe Heirat erreichen.','Julies Widerspruch belegt keine Zustimmung zu einem anderen Bewerber.')
  },'Die Baronin respektiert Julies ausgesprochenes Nein',
  'Welche Handlung beweist Zustimmung? Auch Nachgeben, Schweigen oder ein angenommenes Geschenk dürfen nicht automatisch als Liebe gelten.',
  'Turing-Vergleich: Äusseres Verhalten ist auslegungsbedürftig. Julies ausdrückliche Unterscheidung ist ein Gegenbeleg zur Gleichsetzung von Gehorsam und innerem Einverständnis.',[
    event('julie','text-3-3-0','aber nicht zum Lieben.',
      ()=>'Die Tante verbindet Heirat und Gehorsam mit einem Beweis der Liebe zu ihr.',
      ()=>'Ein auferlegter Verzicht erzeugt keine frei gewählte Zuneigung.',[
        choice('boundary','Die Grenze ausdrücklich setzen',()=>true,effect('Julie unterscheidet Entsagen von Lieben.','baronin','knowledge',{boundary:true}),'Eigene Zustimmung wird als unverfügbar modelliert.'),
        choice('silence','Die Grenze unausgesprochen lassen',()=>false,effect('Schweigen liefert keinen Zustimmungsbeleg.','baronin','assumption',{boundary:false}),'Auch diese Alternative dürfte nicht als Ja ausgewertet werden.')]),
    event('baronin','text-3-3-0','Das ist Schwärmeren!',
      ()=>'Julie hat zwischen Entsagung und Liebe unterschieden.',
      r=>changed(r)?'Gegenprobe: Das Nein wird als Grenze des eigenen Plans anerkannt.':'Modellannahme: Julies Urteil wird als unreif abgewertet.',[
        choice('dismiss','Das Urteil abwerten und am Plan festhalten',notChanged,effect('Die Tante übt weiter Entscheidungsdruck aus.','julie','dependence',{pressure:true}),'Rang und vermeintlich reiferer Verstand begründen die Verfügung.'),
        choice('respect','Die Heiratsforderung zurücknehmen',changed,effect('Der Druck wird zurückgenommen; Julie hat niemandem zugesagt.','julie','position',{pressure:false}),'Respekt verändert die Forderung, nicht Julies Gefühle.')]),
    event('julie','text-3-3-0','den ich weder achten noch lieben könnte.',
      r=>after(r,'pressure','Die Tante hält trotz des Widerspruchs an der Vorgabe fest.','Die Tante hat die Vorgabe zurückgenommen.'),
      ()=>'In keinem Zweig ist Zustimmung zu einer Heirat erklärt.',[
        choice('refuse','Die erzwungene Verbindung nochmals ablehnen',r=>r.world.pressure,effect('Julie bleibt bei ihrer Grenze trotz fortbestehendem Druck.','baronin','dependence',{consent:false}),'Druck ersetzt keinen eigenen Entschluss.'),
        choice('own-time','Eine eigene Entscheidung ohne sofortige Zusage offenhalten',r=>!r.world.pressure,effect('Julie gewinnt Entscheidungsraum; das Ergebnis bleibt offen.','baronin','position',{consent:false}),'Entlastung ist keine automatische Liebesentscheidung.')])
  ]),
  scenario('sophie','Sophie · Wem gehört weitergegebenes Wissen?','sophie','III/8',{
    sophie:actor('Julie helfen und die Verwendung eigener Informationen mitbestimmen.','Wie Carl die Information verwenden wird, weiss sie nicht sicher.'),
    carl:actor('Einen wirksamen Eingriff in die Pläne des Grafen finden.','Ohne Sophies Mitteilung kennt er den Kastenplan in dieser Versuchsanordnung nicht.')
  },'Sophie verlangt vor der Weitergabe eine Verwendungsabsprache',
  'Wer Wissen weitergibt, verliert nicht das Recht auf eigene Grenzen. Hilfsbereitschaft bedeutet keine persönliche Verfügbarkeit.',
  'Schachautomat: Ein sichtbarer Erfolg kann von verborgener Informationsarbeit abhängen. Sophies Beitrag ist eine eigene strategische Leistung, kein Werkzeug Carls.',[
    event('sophie','text-3-8-1','Der Graf wird heute in einem Kasten ins Haus gebracht.',
      ()=>'Sophie verfügt über die Nachricht vom geplanten Kastenauftritt.',
      r=>changed(r)?'Gegenprobe: Die Verwendung soll vor der Preisgabe vereinbart werden.':'Modellannahme: Direkte Weitergabe erscheint als Hilfe für Julie.',[
        choice('disclose','Kastenplan und Zeitpunkt weitergeben',notChanged,effect('Die Information erreicht Carl.','carl','knowledge',{shared:true}),'Schnelle Hilfe wird gegenüber Kontrolle der Weiterverwendung priorisiert.'),
        choice('hold','Die Nachricht bis zu einer Absprache zurückhalten',changed,effect('Carl erhält die Einzelheiten noch nicht.','carl','dependence',{shared:false}),'Informationszugang wird an eine Absprache gebunden.')]),
    event('carl','text-3-8-1','die Entdeckung ist eine Million werth!',
      r=>after(r,'shared','Kastenauftritt und Zeitpunkt sind mitgeteilt.','Sophie hat nur eine Absprache angeboten, keine Einzelheiten.'),
      r=>after(r,'shared','Die Mitteilung eröffnet einen Ansatz für einen eigenen Plan.','Ohne Einzelheiten lässt sich der Kastenplan nicht gezielt verwenden.'),[
        choice('use','Die Mitteilung für den eigenen Plan aufgreifen',r=>r.world.shared,effect('Carl verfügt nun über einen Ansatz; dessen Erfolg bleibt offen.','sophie','intention',{using:true}),'Ein Informationsgewinn schafft Handlungsspielraum, keine Erfolgsgarantie.'),
        choice('request','Nach Bedingungen der Weitergabe fragen',r=>!r.world.shared,effect('Carl muss um Zugang verhandeln.','sophie','assumption',{using:false}),'Fehlender Zugang darf nicht durch Publikumswissen ersetzt werden.')]),
    event('sophie','text-3-8-1','Ey fort, unartiger Mensch!',
      r=>after(r,'using','Carl nimmt die Hilfe persönlich für sich in Anspruch.','Carl ist auf eine Absprache angewiesen.'),
      ()=>'Strategische Hilfe ist kein Einverständnis zu körperlicher Annäherung. Der Originaltext zeigt eine Grenzverletzung.',[
        choice('reject-approach','Die unerwünschte Annäherung zurückweisen',r=>r.world.using,effect('Sophies Nein bleibt bestehen; die Mitteilung ist bereits weitergegeben.','carl','dependence',{personalConsent:false}),'Die Grenze bleibt gültig, auch wenn sie im Original übergangen wird.'),
        choice('set-terms','Zweck und Grenzen der Hilfe ausdrücklich festlegen',r=>!r.world.using,effect('Eine Vereinbarung ist vorgeschlagen, aber noch nicht angenommen.','carl','intention',{personalConsent:false}),'Weder Absprache noch Weitergabe werden automatisch als Zustimmung behauptet.')])
  ]),
  scenario('wendheim','Wendheim · Hilfe um welchen Preis?','wendheim','III/11',{
    wendheim:actor('Arrest abwenden, ohne sich durch Flucht der eigenen Verantwortung zu entziehen.','Ob der Bruder familiäre Verpflichtung anerkennt, ist offen.'),
    graf:actor('Eigene Mittel und Interessen sichern.','Wendheims Not bedeutet nicht, dass er jede Bedingung akzeptiert.')
  },'Der Graf bietet Unterstützung ohne erzwungene Abreise an',
  'Hilfe kann Abhängigkeit schaffen. Welche Bedingung macht aus einer Unterstützung ein strategisches Ausschliessen?',
  'Zielmodell: Ein Geldbetrag allein sagt nicht, ob eine Handlung gewählt wird. Würde, Bindung und die Bedingungen einer Hilfe können den materiellen Nutzen überwiegen.',[
    event('wendheim','text-3-11-1','Uns gebar eine Mutter!',
      ()=>'Arrest droht; Wendheim spricht den Bruder auf Unterstützung an.',
      ()=>'Die gemeinsame Herkunft wird als Verpflichtung angeführt, nicht als bereits erfüllte Zusage.',[
        choice('appeal','Familiäre Verantwortung geltend machen',()=>true,effect('Ein Anspruch auf brüderliche Unterstützung wird ausgesprochen.','graf','intention'),'Verwandtschaft soll ein anderes Handeln begründen.'),
        choice('withdraw','Die Bitte ohne Antwort zurückziehen',()=>false,effect('Die Bitte wird nicht weiter verfolgt.','graf'),'Rückzug würde den Konflikt vermeiden, aber keine Hilfe schaffen.')]),
    event('graf','text-3-11-1','wenn Sie nun noch heute diese Stadt ver: lassen wollen',
      ()=>'Wendheim bittet ausdrücklich als Bruder um Hilfe.',
      r=>changed(r)?'Gegenprobe: Unterstützung wird nicht an Entfernung aus der Stadt gebunden.':'Modellannahme: Hilfe soll zugleich Wendheims Anwesenheit beenden.',[
        choice('conditional','Reisegeld unter der Bedingung der Abreise anbieten',notChanged,effect('Das Angebot verlangt den Ortswechsel.','wendheim','dependence',{conditioned:true}),'Das Angebot verbindet Hilfe mit Ausschluss.'),
        choice('unconditional','Unterstützung ohne Abreisebedingung anbieten',changed,effect('Die Hilfe verlangt keine Entfernung aus der Stadt.','wendheim','position',{conditioned:false}),'Nur die Bedingung wird verändert, nicht Wendheims Lage erfunden.')]),
    event('wendheim','text-3-11-1','bleibe hier, ich erwarte mein Schicksal',
      r=>after(r,'conditioned','Die Hilfe verlangt sofortige Abreise.','Die Hilfe wird ohne Abreisebedingung angeboten.'),
      r=>after(r,'conditioned','Das Angebot kollidiert mit der angenommenen Grenze gegen Flucht.','Dieser Zielkonflikt entfällt; die Annahme bleibt eine Gegenprobe.'),[
        choice('reject-help','Das bedingte Angebot zurückweisen und bleiben',r=>r.world.conditioned,effect('Wendheim lehnt die Hilfe ab; die Arrestgefahr ist nicht beseitigt.','graf','dependence'),'Selbstachtung und Verantwortung überwiegen die angebotene Entlastung.'),
        choice('accept-help','Unbedingte Hilfe annehmen',r=>!r.world.conditioned,effect('Im Modell nimmt Wendheim Hilfe an, ohne die Stadt verlassen zu müssen.','graf','position'),'Die geänderte Bedingung ermöglicht Kooperation; sie behauptet kein neues Originalende.')])
  ]),
  scenario('graf','Graf Balken · Geschenk oder Zustimmung?','graf','II/4',{
    graf:actor('Die angestrebte Heirat durch ein geeignetes Mittel näherbringen.','Julies Antwort liegt in diesem Gespräch nicht vor.'),
    baronin:actor('Den Grafen zu einem wirksamen Geschenk bewegen.','Ihre Einschätzung ersetzt Julies Antwort nicht.')
  },'Der Graf behandelt die Wirkung des Geschenks als ungesichert',
  'Wer verspricht hier wessen Zustimmung? Der Wert eines Gegenstands ist kein Beleg für die Gefühle seiner Empfängerin.',
  'Turing-Vergleich: Eine erwartete Reaktion ist keine beobachtete Antwort. Ein Modell muss fehlende Rückmeldung ausweisen, statt sie aus Rang oder Geld abzuleiten.',[
    event('graf','text-2-4-1','Einen Hochzeitschmuck?',
      ()=>'Die Baronin empfiehlt ein Geschenk als Mittel gegen Gleichgültigkeit.',
      ()=>'Der Graf verbindet den Schmuck bereits mit der gewünschten Heirat.',[
        choice('ask-effect','Nach Aufwand und erwarteter Wirkung fragen',()=>true,effect('Der Graf fragt nach der Eignung des Mittels.','baronin','assumption'),'Sein Mittel ist auf ein erwartetes Resultat gerichtet.'),
        choice('abandon','Den Geschenkplan sofort aufgeben',()=>false,effect('Der Geschenkplan wird aufgegeben.','baronin'),'Ohne Prüfung würde die vorgeschlagene Möglichkeit entfallen.')]),
    event('baronin','text-2-4-1','Die meisten. Aber Sie müssen eilen.',
      ()=>'Der Graf fragt, ob dadurch die Schwierigkeiten gehoben würden.',
      ()=>'Die Behauptung über Wirkung ist eine Prognose der Baronin, keine Äusserung Julies.',[
        choice('promise','Eine weitgehende Wirkung in Aussicht stellen',()=>true,effect('Der Graf erhält eine optimistische Prognose.','graf','assumption',{forecast:true}),'Die Aussicht soll die Investition auslösen.'),
        choice('qualify','Die Wirkung ausdrücklich offenlassen',()=>false,effect('Es wird keine Wirkung zugesichert.','graf','knowledge',{forecast:false}),'Eine vorsichtige Alternative würde keine fremde Zustimmung versprechen.')]),
    event('graf','text-2-4-1','Morgen des Tages werde ich den bewußten Schmuck ihr überreichen.',
      r=>after(r,'forecast','Die Baronin verspricht die Beseitigung vieler Schwierigkeiten.','Die Wirkung wird offengelassen.'),
      r=>changed(r)?'Gegenprobe: Auch eine zuversichtliche Vermittlerin kennt Julies Zustimmung nicht.':'Modellannahme: Die Prognose genügt, um den Geschenkplan zu beschliessen.',[
        choice('gift','Die Übergabe des Schmucks zusagen',notChanged,effect('Das Geschenk ist zugesagt; Julies Einverständnis bleibt unbekannt.','baronin','intention',{consentKnown:false}),'Die erwartete Wirkung motiviert die Investition.'),
        choice('ask-julie','Vor einer Heiratserwartung Julies eigene Antwort verlangen',changed,effect('Der Graf verlangt Rückmeldung; eine Antwort wird nicht simuliert.','baronin','knowledge',{consentKnown:false}),'Fehlende Zustimmung bleibt als offene Information erhalten.')])
  ]),
  scenario('ruf','Der ältere Ruf · Selbstbild und Fremdbild','ruf','I/2',{
    ruf:actor('Im Neffen ein lebendiges Bild der eigenen Werte wiederfinden.','Carls gegenwärtiges Verhalten ist hier noch nicht unmittelbar beobachtet.'),
    baronin:actor('Die Vorstellung von Liebenswürdigkeit an gesellschaftlicher Form messen.','Rufs Begeisterung ist eine Bewertung, kein unabhängiger Beweis.')
  },'Ruf verlangt aktuelle Beobachtung statt Vertrauen in sein Idealbild',
  'Wann verhindert Vertrautheit genaues Hinsehen? Ein Idealbild kann eine spätere Täuschung erleichtern, ohne sie schon zu kennen.',
  'Intelligenzzuschreibung: Menschen beurteilen Verhalten durch Erwartungen. Der Vergleich prüft eine Zuschreibungsregel, nicht Carls tatsächliche Gedanken.',[
    event('ruf','text-1-2-0','er ist mein anderes Ich!',
      ()=>'Die Ankunft des Neffen wird angekündigt.',()=> 'Die eigene Jugend prägt die Erwartung an Carl.',[
        choice('idealize','Den Neffen als eigenes Idealbild loben',()=>true,effect('Ruf teilt seine begeisterte Erwartung mit.','baronin','assumption'),'Nähe und Selbstähnlichkeit tragen das Urteil.'),
        choice('reserve','Zunächst nur die Ankunft mitteilen',()=>false,effect('Die Bewertung bleibt zurückgestellt.','baronin','knowledge'),'Mitteilung und Werturteil könnten getrennt werden.')]),
    event('baronin','text-1-2-0','Tolle Streiche? gehören die zur Liebenswürdigkeit?',
      ()=>'Ruf hat die Streiche des Neffen lobend erwähnt.',()=> 'Die Bedeutung desselben Verhaltens ist strittig.',[
        choice('challenge','Den Massstab der Liebenswürdigkeit bestreiten',()=>true,effect('Die Bewertung wird ausdrücklich in Frage gestellt.','ruf','assumption',{challenged:true}),'Das fremde Ideal ist nicht ihr eigener Massstab.'),
        choice('agree','Das Lob ungeprüft übernehmen',()=>false,effect('Rufs Ideal wird ohne eigene Prüfung übernommen.','ruf','position',{challenged:false}),'Übereinstimmung würde keinen neuen Beleg schaffen.')]),
    event('ruf','text-1-2-0','Das ist mein Sentiment.',
      ()=>'Die Baronin bestreitet die Verbindung von Streichen und Liebenswürdigkeit.',
      r=>changed(r)?'Gegenprobe: Das eigene Ideal gilt nicht als ausreichender aktueller Beleg.':'Modellannahme: Das eigene Erziehungsideal trägt das Urteil weiterhin.',[
        choice('defend','Den eigenen Massstab verteidigen',notChanged,effect('Ruf hält am Idealbild fest.','baronin','assumption'),'Die eigene Erfahrung bestätigt den eigenen Massstab.'),
        choice('observe','Das Urteil bis zu eigener Beobachtung aussetzen',changed,effect('Ruf setzt die Bewertung aus, ohne Carl damit zu verurteilen.','baronin','knowledge'),'Prüfung ersetzt hier die Selbstbestätigung.')])
  ]),
  scenario('frey','Frey · Mitwissen schafft noch keine Kontrolle','frey','II/3',{
    frey:actor('Carls Plan auf Risiken prüfen und die Folgen seiner Mithilfe bedenken.','Die spätere Reaktion des Onkels ist nicht sicher vorhersehbar.'),
    carl:actor('Die Verstellung fortsetzen und danach eine erfreuliche Aufklärung erwarten.','Freys Mitmachen beweist keine Einigkeit über das Risiko.')
  },'Frey macht die weitere Mithilfe von einer Risikoabsprache abhängig',
  'Wo endet Beobachten und beginnt Mitverantwortung? Frey kennt die Verstellung, aber nicht ihren sicheren Ausgang.',
  'Schachautomat: Sichtbare Leistung beruht auf verdeckter Zuarbeit. Ein Helfer ist ein Handelnder mit Einwänden und kann den Ablauf unterbrechen.',[
    event('frey','text-2-3-0','Wenn er aber böse bleibt?',
      ()=>'Carl erwartet nach der Verärgerung des Onkels spätere Freude.',()=> 'Ein erwünschter späterer Effekt ist keine Gewissheit.',[
        choice('warn','Die ungünstige Reaktion ausdrücklich ansprechen',()=>true,effect('Frey macht das Risiko einer bleibenden Verärgerung sichtbar.','carl','knowledge'),'Die Gegenmöglichkeit korrigiert die Erfolgserwartung.'),
        choice('silent','Das Risiko unausgesprochen lassen',()=>false,effect('Carl erhält keinen ausdrücklichen Einwand.','carl'),'Schweigen könnte als Einigkeit missverstanden werden.')]),
    event('carl','text-2-3-0','Ah – das weiß ich besser.',
      ()=>'Frey hat den möglichen Misserfolg angesprochen.',()=> 'Modellannahme: Carl hält seine Menschenkenntnis für überlegen.',[
        choice('dismiss','Den Einwand mit eigener Gewissheit abweisen',()=>true,effect('Eine Absicherung wird nicht vereinbart.','frey','dependence',{agreed:false}),'Selbstgewissheit verdrängt die Prüfung.'),
        choice('discuss','Eine Grenze des weiteren Vorgehens vereinbaren',()=>false,effect('Eine Risikoabsprache wird angeboten.','frey','position',{agreed:true}),'Dies wäre eine alternative Reaktion auf denselben Einwand.')]),
    event('frey','text-2-3-0','Sie sind aber nicht geladen.',
      r=>after(r,'agreed','Eine Absprache ist angeboten.','Carl hat keine Absicherung vereinbart.'),
      r=>changed(r)?'Gegenprobe: Frey gewichtet die Bedingung für Mithilfe höher als sofortige Ausführung.':'Modellannahme: Er hilft weiter, hält aber die materielle Grenze fest.',[
        choice('assist','Die ungeladenen Waffen übergeben und den Zustand benennen',notChanged,effect('Frey hilft weiter; ungeladene Waffen sind ausdrücklich markiert.','carl','knowledge',{assisting:true}),'Mithilfe hebt den Einwand nicht auf.'),
        choice('pause','Die Mithilfe bis zur Risikoabsprache aussetzen',changed,effect('Frey unterbricht seine Zuarbeit; Carls Reaktion bleibt offen.','carl','dependence',{assisting:false}),'Ein eigener Vorbehalt hat eine operative Folge.')])
  ]),
  scenario('flucht','Flucht · Befehl, Material und Anschein','flucht','III/10',{
    flucht:actor('Einen herstellbaren Auftrag unter Zeitdruck organisieren.','Der gesamte Zweck des Kastens ist ihm hier nicht ausdrücklich erklärt.'),
    graf:actor('Einen passenden Kasten zum verlangten Zeitpunkt erhalten.','Bezahlung ändert nicht automatisch die Bearbeitungszeit des Holzes.')
  },'Der Graf erlaubt ausreichend Zeit für Mahagoni',
  'Was wird tatsächlich hergestellt und was soll nur so aussehen? Sachwissen kann einen Befehl in eine andere Ausführung übersetzen.',
  'Chinesisches Zimmer und Automat: Einen Teilauftrag richtig auszuführen bedeutet nicht, den ganzen Plan zu kennen. Die lackierte Oberfläche trennt Anschein und Material.',[
    event('flucht','text-3-10-0','die Zeit ist zu kurz; das Holz ist zu hart.',
      ()=>'Der Graf verlangt kurzfristig einen Kasten aus Mahagoni.',()=> 'Zeit und Material bilden eine praktische Grenze, die Geld allein nicht aufhebt.',[
        choice('object','Die Herstellungsvorgabe als problematisch benennen',()=>true,effect('Die technische Grenze wird dem Auftraggeber mitgeteilt.','graf','knowledge'),'Praktisches Wissen widerspricht dem Befehl.'),
        choice('promise','Die Vorgabe ohne Vorbehalt zusagen',()=>false,effect('Eine ungesicherte Machbarkeit wird zugesagt.','graf','assumption'),'Die Zusage wäre noch kein hergestellter Kasten.')]),
    event('graf','text-3-10-0','daß er die Farbe von Mahagony bekommt.',
      ()=>'Flucht hat die Zeit- und Materialgrenze benannt.',
      r=>changed(r)?'Gegenprobe: Der Zeitpunkt wird zugunsten des Materials verschoben.':'Modellannahme: Der Zeitpunkt und der sichtbare Anschein sind vorrangig.',[
        choice('substitute','Anderes Holz mit Mahagonifarbe zulassen',notChanged,effect('Ein Ersatzmaterial mit ähnlicher Oberfläche ist erlaubt.','flucht','intention',{substitute:true}),'Die Oberfläche soll trotz Materialwechsel den Eindruck erhalten.'),
        choice('extend','Den Zeitpunkt verschieben und am Material festhalten',changed,effect('Mehr Herstellungszeit wird eingeräumt.','flucht','position',{substitute:false}),'Die geänderte Frist löst den konkreten Zielkonflikt.')]),
    event('flucht','text-3-10-0','Gut, Euer Excellenz. (geht ab, kömmt abergleich wieder.)',
      r=>after(r,'substitute','Ein lackierter Ersatz ist ausdrücklich zugelassen.','Der Auftrag erlaubt mehr Zeit.'),
      ()=>'Der Teilauftrag ist ausführbar; der vollständige Kastenplan wird dadurch nicht bekannt.',[
        choice('order-substitute','Den zugelassenen Ersatz organisieren',r=>r.world.substitute,effect('Flucht organisiert Ersatzholz mit passender Farbe.','graf','position'),'Auftragstreue erfolgt durch veränderte Mittel.'),
        choice('order-original','Mahagoni mit der neuen Frist organisieren',r=>!r.world.substitute,effect('Flucht organisiert das verlangte Material mit mehr Zeit.','graf','position'),'Die Gegenprobe verändert die reale Herstellungsentscheidung.')])
  ]),
  scenario('salden','Salden · Aufmerksamkeit ist noch kein Ansehen','salden','I/6',{
    salden:actor('Den Wunsch nach Bekanntheit an seinen Folgen und seinem moralischen Wert prüfen.','Carls angekündigte Absichten beweisen noch keine spätere Handlung.'),
    carl:actor('Aufmerksamkeit erhalten und das öffentliche Bild gezielt steuern.','Saldens Verständnis ist nicht gleichbedeutend mit Billigung.')
  },'Carl nimmt Saldens Einwand als Grenze seiner Selbstdarstellung an',
  'Kann man eine Strategie verstehen und ihr dennoch widersprechen? Angekündigte gute Absichten entlasten spätere Handlungen nicht automatisch.',
  'Turing-Vergleich: Eine überzeugende Selbsterklärung muss an beobachtbaren Folgen geprüft werden. Ein angekündigtes Programm ist noch kein verifiziertes Verhalten.',[
    event('salden','text-1-6-0','Aber immer im Bösen.',
      ()=>'Carl will mit mutwilligen Streichen im Gespräch bleiben.',()=> 'Bekanntheit und gutes Ansehen sind unterschiedliche Ziele.',[
        choice('challenge','Die negative Qualität des Ansehens einwenden',()=>true,effect('Salden trennt Aufmerksamkeit von moralischem Wert.','carl','knowledge'),'Die Reichweite der Aufmerksamkeit ist kein Gütemass.'),
        choice('admire','Nur die Aussicht auf Bekanntheit bewundern',()=>false,effect('Die Folgen bleiben ungeprüft.','carl','assumption'),'Ein reines Erfolgsurteil würde die Wertfrage auslassen.')]),
    event('carl','text-1-6-1','das Gute thu ich ganz im Stillen;',
      ()=>'Salden hat die negative Form der Bekanntheit angesprochen.',
      r=>changed(r)?'Gegenprobe: Der Einwand begrenzt die erlaubten Mittel.':'Modellannahme: Verdecktes Gutes soll mit lautem Aufsehen vereinbar sein.',[
        choice('justify','Die Trennung von stillen guten Taten und lautem Aufsehen rechtfertigen',notChanged,effect('Carl behauptet eine Vereinbarkeit, ohne sie bewiesen zu haben.','salden','assumption',{limited:false}),'Die Selbstbeschreibung soll den Einwand entkräften.'),
        choice('limit','Die Mittel an überprüfbare Folgen für andere binden',changed,effect('Carl sagt eine Begrenzung zu; ihre Einhaltung bleibt zu prüfen.','salden','intention',{limited:true}),'Der Einwand führt zu einer veränderten Absicht.')]),
    event('salden','text-1-6-1','Schwerlich!',
      r=>after(r,'limited','Carl hat Grenzen seines Vorgehens zugesagt.','Carl behauptet Nutzen auch durch aufsehenerregendes Verhalten.'),
      ()=>'Weder Selbstrechtfertigung noch Zusage ist bereits ein beobachteter Erfolg.',[
        choice('doubt','Den behaupteten gemeinsamen Nutzen bestreiten',r=>!r.world.limited,effect('Saldens Zweifel bleibt bestehen.','carl','assumption'),'Ein behaupteter Nutzen beantwortet die Folgenfrage nicht.'),
        choice('verify','Die Zusage an späteren Handlungen prüfen wollen',r=>r.world.limited,effect('Salden verlangt beobachtbare Einhaltung; das spätere Ergebnis bleibt offen.','carl','knowledge'),'Die Gegenprobe verschiebt den Streit zur Überprüfung.')])
  ]),
  scenario('bedienter','Bedienter · Nachricht oder Identitätsbeweis?','bedienter','I/9',{
    bedienter:actor('Die Besuchsmeldung korrekt übermitteln und eine Anweisung zum Einlass erhalten.','Die Selbstbezeichnung des Besuchers ist nicht unabhängig geprüft.'),
    sophie:actor('Den Besucher einordnen und über den Empfang mitentscheiden.','Beschreibung und Selbstbezeichnung sind keine unabhängige Identitätsprüfung.')
  },'Sophie verlangt vor dem Einlass eine unabhängige Prüfung',
  'Eine richtig wiedergegebene Behauptung kann trotzdem eine falsche Zuschreibung weitertragen. Wo wird aus Hörensagen Gewissheit?',
  'Turing und Rollenprüfung: Eine passende Antwort oder Kleidung kann ein Urteil auslösen. Die entscheidende Frage ist, welches zusätzliche Wissen die Zuschreibung tragen würde.',[
    event('bedienter','text-1-9-0','Weiter weiß ich nichts.',
      ()=>'Ein Besucher bezeichnet sich als Bräutigam aus der Fremde und verlangt Einlass.',()=> 'Die Meldung ist bekannt; die Identität bleibt ungeprüft.',[
        choice('report','Die Selbstbezeichnung und die Wissensgrenze melden',()=>true,effect('Sophie erhält eine begrenzte Auskunft.','sophie','knowledge'),'Korrekte Übermittlung wird von Bestätigung getrennt.'),
        choice('certify','Die Selbstbezeichnung als bestätigt ausgeben',()=>false,effect('Eine ungeprüfte Identität würde behauptet.','sophie','assumption'),'Diese Alternative überschritte das ausdrücklich begrenzte Wissen.')]),
    event('sophie','text-1-9-0','Richtig, er ists.',
      ()=>'Zur Selbstbezeichnung kommt die Beschreibung des auffälligen Anzugs.',
      r=>changed(r)?'Gegenprobe: Diese Zeichen reichen für den Einlass nicht aus.':'Modellannahme: Die Zeichen passen zu der erwarteten Person.',[
        choice('admit','Die Zeichen genügen lassen und den Empfang anweisen',notChanged,effect('Sophie erlaubt den Empfang auf Basis ihrer Zuschreibung.','bedienter','intention',{admit:true}),'Passung wird als hinreichend gewichtet.'),
        choice('check','Eine unabhängige Identitätsprüfung verlangen',changed,effect('Der Einlass wird bis zu weiterer Prüfung ausgesetzt.','bedienter','knowledge',{admit:false}),'Zusätzliche Prüfung wird verlangt, ihr Ergebnis nicht erfunden.')]),
    event('bedienter','text-1-9-0','Was soll ich ihm sagen?',
      r=>after(r,'admit','Sophie hat den Empfang erlaubt.','Sophie verlangt eine zusätzliche Prüfung.'),
      ()=>'Eine Anweisung ändert den Auftrag, nicht rückwirkend die Sicherheit der Identität.',[
        choice('relay-welcome','Die Einladung übermitteln',r=>r.world.admit,effect('Die Einladung wird weitergegeben; die Identität bleibt ungeprüft.','sophie','position',{verified:false}),'Ausführung der Anweisung ist kein Identitätsbeweis.'),
        choice('await-proof','Den Besucher bis zur Prüfung warten lassen',r=>!r.world.admit,effect('Der Einlass wartet auf einen weiteren Beleg.','sophie','knowledge',{verified:false}),'Warten schafft Raum für Prüfung, aber noch kein Wissen.')])
  ])
];
