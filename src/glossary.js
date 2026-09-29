// Editorial reading aids. Contextual interpretations are labelled separately from meanings.
const entry=(word,forms,meaning,context='')=>({word,forms:forms.split('|'),meaning,context});
export const glossary=[
 entry('Kaprize','Kaprize|Kaprizen|Kaprice|Caprice','Ein eigensinniger Einfall, eine Laune oder ein ungewöhnlicher Wunsch.','In der Frisurszene wünscht die Baronin einen originelleren, verspielteren Fall der Locke. Der Baron greift das Wort auf und lässt es zugleich wie einen Kommentar zu ihren Launen klingen. Das ist eine Deutungsmöglichkeit des Wortspiels.'),
 entry('Putz','Putz|Kopfputz','Schmuck, Kleidung oder aufwendiges Zurechtmachen; Kopfputz bezeichnet die geschmückte Frisur.','„Im geschmackvollsten Putz“ beschreibt das Erscheinungsbild der Baronin, keine Reinigungsarbeit.'),
 entry('Toilette','Toilette','Hier: das Frisieren und Zurechtmachen beziehungsweise der dafür benutzte Frisiertisch.','Die Regieanweisung zeigt die Baronin bei der Pflege ihres Erscheinungsbilds.'),
 entry('Genie','Genie','Aussergewöhnliche schöpferische Begabung oder Einfallsreichtum.','In der Frisurszene beansprucht die Baronin künstlerischen Einfallsreichtum sogar für ihren Kopfputz. Der hohe Anspruch kann komisch wirken.'),
 entry('gemein','gemein|gemeine|gemeinen','Kann historisch auch „gewöhnlich“, „alltäglich“ oder „nicht vornehm“ bedeuten.','Beim Kopfputz kritisiert die Baronin das Gewöhnliche der Frisur. An anderen Stellen kann das Wort auch „niederträchtig“ bedeuten; der Zusammenhang entscheidet.'),
 entry('genieren','Genirt|genirt|geniren|geniert','Stören, belästigen oder in Verlegenheit bringen.'),
 entry('dispensieren','dispensiren|dispensiert|dispensirt|dispensire','Jemanden von einer Verpflichtung befreien; sich selbst davon ausnehmen.','Die Baronin erlaubt dem Baron, der Gesellschaft fernzubleiben. Die Form „dispenfire“ im Transkript ist vermutlich ein Übertragungsfehler für „dispensire“.'),
 entry('Mündel','Mündel','Eine Person, die unter der rechtlichen Fürsorge eines Vormunds steht.','Diese Abhängigkeit ist für die Frage wichtig, wer über Sophies Zukunft bestimmen darf.'),
 entry('Gemahlin','Gemahlinn|Gemahlin|Gemahl','Ehefrau; „Gemahl“ bedeutet Ehemann. Eine gehobene Bezeichnung.'),
 entry('Kammerdiener','Kammerdiener','Persönlicher Diener eines vornehmen Herrn.','Die berufliche Abhängigkeit schliesst eigenes Wissen, eigene Interessen und Einfluss nicht aus.'),
 entry('Assessor','Assessor','Bezeichnung für einen juristischen oder administrativen Amtsträger, historisch unter anderem einen Beisitzer.'),
 entry('Lieutenant','Lieutenant|Leutnant','Ein Offiziersrang; heute meist „Leutnant“ geschrieben.'),
 entry('Vermögen','Vermögen','Als Hauptwort häufig Besitz und Geld; kann auch Fähigkeit bedeuten.','Bei der Frage nach einem möglichen Ehemann geht es um finanzielle Verhältnisse. „Er vermag“ dagegen bedeutet „er kann“.'),
 entry('Partie','Partie','Kann eine Spielrunde, eine Unternehmung oder eine mögliche Heiratsverbindung bedeuten.','Prüfe, ob von Schach oder von einer standesgemässen Ehe die Rede ist. Die Mehrdeutigkeit ist für das Stück besonders ergiebig.'),
 entry('galant','galant|galante|galanten','Höflich und zuvorkommend, oft mit einer werbenden oder flirtenden Absicht.'),
 entry('Intrige','Intrige|Intrigen','Ein verdecktes Vorgehen, mit dem jemand andere beeinflussen oder ihnen schaden will.'),
 entry('Automat','Automat|Automaten','Ein Gerät, das scheinbar selbsttätig handelt.','Beim Schachautomaten ist gerade strittig, wem die beobachtete Handlung und das Wissen zugeschrieben werden können.'),
 entry('Billet','Billet|Billets|Billetchen','Ein kurzer Brief oder ein schriftlicher Zettel; je nach Zusammenhang auch eine Eintrittskarte.'),
 entry('Exempel','Exempel','Beispiel; „zum Exempel“ bedeutet „zum Beispiel“.'),
 entry('hiesig','hiesig|hiesige|hiesigen','An diesem Ort befindlich oder von hier stammend.'),
 entry('hernach','Hernach|hernach','Danach, später; bei einem Auftritt: kommt im weiteren Verlauf hinzu.'),
 entry('Oheim','Oheim|Oheims','Ältere Bezeichnung für Onkel.'),
 entry('Hagestolz','Hagestolz','Ältere, oft spöttische Bezeichnung für einen älteren unverheirateten Mann.'),
 entry('seyn','seyn|Seyn','Historische Schreibweise von „sein“.'),
 entry('bey','bey|Bey','Historische Schreibweise von „bei“.'),
 entry('frey','frey','Historische Schreibweise von „frei“. Achtung: „Frey“ ist im Stück auch der Name einer Figur.'),
 entry('zwey','Zwey|zwey|Zweyter|zweyter','Historische Schreibweisen von „zwei“ beziehungsweise „zweiter“.'),
 entry('thun','thun|thut|gethan','Historische Schreibweisen von „tun“, „tut“ und „getan“.'),
 entry('Vorurtheil','Vorurtheil|Vorurtheile','Historische Schreibweise von „Vorurteil“: eine vorab gefasste, nicht ausreichend geprüfte Meinung.','Der Baron setzt dagegen das Wort „Nachurtheil“: Er behauptet, sein Urteil beruhe auf Erfahrung. Ob ihm zu glauben ist, bleibt eine Interpretationsfrage.')
];
const forms=new Map(glossary.flatMap(e=>e.forms.map(f=>[f,e])));
export function lookupWord(word){const clean=word.trim().replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'');return forms.get(clean)||forms.get(clean.toLowerCase())||glossary.find(e=>e.word.toLowerCase()===clean.toLowerCase())||null;}
export function dictionaryUrl(word){return 'https://www.dwds.de/wb/'+encodeURIComponent(word.trim());}
