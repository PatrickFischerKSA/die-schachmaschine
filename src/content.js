export const eras = [
 {year:'1770',name:'Die Täuschung',person:'Kempelen',eyebrow:'ERSTE PARTIE · MENSCH GEGEN MASCHINE',title:'Ein Zug.\nUnd ein Verdacht.',intro:'Dir gegenüber sitzt ein Automat. Er scheint zu denken. Ziehe eine weisse Figur und beobachte seine Antwort.',question:'Wer hat diesen Zug gemacht?',color:'#c6a778',material:'HOLZ / MESSING'},
 {year:'1798',name:'Die Intrige',person:'Heinrich Beck',eyebrow:'ZWEITE PARTIE · MENSCH ALS MASCHINE',title:'Alle Figuren\nsind beisammen.',intro:'Das Brett wird zur Bühne. Baron Rink spielt gegen sich selbst. Doch wer führt in diesem Haus eigentlich die Züge?',question:'Wer bewegt diese Figur?',color:'#d3a28d',material:'BÜHNE / SAMT'},
 {year:'1980',name:'Die Regel',person:'John Searle',eyebrow:'DRITTE PARTIE · SYNTAX UND SEMANTIK',title:'Richtig gespielt.\nAuch verstanden?',intro:'Du sitzt im chinesischen Zimmer. Du kennst die Zuordnung, aber nicht die Bedeutung. Führe die Anweisung auf dem Brett aus.',question:'Du hast korrekt geantwortet. Hast du verstanden?',color:'#afc9c0',material:'ZEICHEN / PAPIER'},
 {year:'2026',name:'Die Black Box',person:'Künstliche Intelligenz',eyebrow:'VIERTE PARTIE · OUTPUT UND URSACHE',title:'Eine Antwort.\nViele Urheber.',intro:'Kein sichtbarer Gegner. Nur ein schwarzer Kasten. Stelle eine Frage und untersuche, was hinter einer Antwort liegt.',question:'Wer hat diesen Zug gemacht?',color:'#a2bdd8',material:'SILIZIUM / LICHT'}
];
export const characters=[
 {name:'Julie',square:'c3',type:'q',force:'Baronin · gesellschaftliche Konvention',text:'Wer entscheidet über Julies Zukunft? Bewege sie: Ein eigener Schritt oder ein Zug nach fremden Erwartungen?'},
 {name:'Wendheim',square:'f3',type:'n',force:'Liebe',text:'Liebe gibt eine Richtung vor. Macht ein starkes Motiv frei – oder berechenbar?'},
 {name:'Carl Ruf',square:'a4',type:'n',force:'Eigene Regie · wechselnde Rollen',text:'Carl ist Figur und Spieler. Er überschreitet das Brett, verschiebt andere Figuren und wird selbst zur vermeintlichen Maschine.'},
 {name:'Sophie',square:'g3',type:'b',force:'Beziehungen · eigene Handlungsspielräume',text:'Auch eine scheinbare Nebenfigur besitzt eine Perspektive. Welche Züge stehen ihr offen?'},
 {name:'Baron Rink',square:'e1',type:'k',force:'Eigene Regeln · Gewohnheit',text:'Der Baron spielt beide Seiten. Kann man sein eigener Gegner sein?'},
 {name:'Baronin',square:'d6',type:'q',force:'Intrige · gesellschaftliche Macht',text:'Sie plant, Graf Balken als Schachmaschine im Kasten ins Haus zu bringen. Sie bewegt andere – und wird selbst Teil von Carls Spiel.'},
 {name:'Graf Balken',square:'e7',type:'p',force:'Baronin · Carl · Geld · Eitelkeit',text:'Bon! Fort bien! Wie? Nachdenken! Wiederkehrende Reaktionen lassen ihn als programmierten Menschen erscheinen.'}
];
export const rules=[{input:'馬',from:'e4',output:'山',to:'c6'},{input:'水',from:'d4',output:'木',to:'f5'},{input:'火',from:'b3',output:'月',to:'e6'}];
export const foundations=['Daten','Menschliche Texte','Bilder','Programmcode','Annotation','Feedback','Training','Mathematische Modelle','Rechenzentren','Energie','Hardware','Inferenz','Output'];
export const questions=['Wissen beide, dass dies ein Springer ist?','Wissen beide, dass der König bedroht sein kann?','Wissen beide, warum dieser Zug stark ist?','Muss man dies wissen?','Reicht es, den richtigen Zug zu machen?'];
