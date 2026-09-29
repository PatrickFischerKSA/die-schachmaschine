// Editorial reading aids. Contextual interpretations are labelled separately from meanings.
const entry=(word,forms,meaning,context='',source=null)=>({word,forms:forms.split('|'),meaning,context,source});
export const glossary=[
 entry('Kaprize','Kaprize|Kaprizen|Kaprice|Caprice','Ein eigensinniger Einfall, eine Laune oder ein ungewöhnlicher Wunsch.','In der Frisurszene wünscht die Baronin einen originelleren, verspielteren Fall der Locke. Der Baron greift das Wort auf und lässt es zugleich wie einen Kommentar zu ihren Launen klingen. Das ist eine Deutungsmöglichkeit des Wortspiels.'),
 entry('Putz','Putz|Kopfputz','Schmuck, Kleidung oder aufwendiges Zurechtmachen; Kopfputz bezeichnet die geschmückte Frisur.','„Im geschmackvollsten Putz“ beschreibt das Erscheinungsbild der Baronin, keine Reinigungsarbeit.'),
 entry('Toilette','Toilette','Hier: das Frisieren und Zurechtmachen beziehungsweise der dafür benutzte Frisiertisch.','Die Regieanweisung zeigt die Baronin bei der Pflege ihres Erscheinungsbilds.'),
 entry('Genie','Genie','Aussergewöhnliche schöpferische Begabung oder Einfallsreichtum.','In der Frisurszene beansprucht die Baronin künstlerischen Einfallsreichtum sogar für ihren Kopfputz. Der hohe Anspruch kann komisch wirken.'),
 entry('gemein','gemein|gemeine|gemeinen','Kann historisch auch „gewöhnlich“, „alltäglich“ oder „nicht vornehm“ bedeuten.','Beim Kopfputz kritisiert die Baronin das Gewöhnliche der Frisur. An anderen Stellen kann das Wort auch „niederträchtig“ bedeuten; der Zusammenhang entscheidet.'),
 entry('genieren','Genirt|genirt|geniren|geniert','Stören, belästigen oder in Verlegenheit bringen.'),
 entry('dispensieren','dispensiren|dispensiert|dispensirt|dispensire|dispenfire','Jemanden von einer Verpflichtung befreien; sich selbst davon ausnehmen.','Die Baronin erlaubt dem Baron, der Gesellschaft fernzubleiben. Die Form „dispenfire“ im Transkript ist vermutlich ein Übertragungsfehler für „dispensire“.'),
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
,entry('honett','honett|honetter|honetten|honette','Ehrenhaft, anständig und rechtschaffen.','Carl gebraucht das Wort beim Vergleich seines eigenen Lebens mit dem eines ordentlichen Mannes. Seine Gegenüberstellung ist eine Selbstrechtfertigung.','https://www.duden.de/rechtschreibung/honett')
,entry('Niobe','Niobe','Eine Gestalt der griechischen Mythologie, die den gewaltsamen Tod ihrer Kinder beklagt.','Sophie vergleicht den Angriff auf ihr literarisches Werk mit diesem Leid. Der Vergleich ist bewusst sehr hoch gegriffen.','https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.04.0104%3Aentry%3Dniobe-bio-2')
,entry('Aufzug','Aufzug|Aufzuge|Aufzuges|Aufzügen','Ein grösserer Teil eines Theaterstücks; heute oft „Akt“ genannt.')
,entry('Auftritt','Auftritt|Auftritte|Auftritts','Ein Abschnitt innerhalb eines Aufzugs. Im Stück wechseln Auftritte häufig, wenn Personen hinzukommen oder abgehen.')
,entry('Vorige','Vorige|Vorigen','In einer Szenenüberschrift: die Personen, die bereits im vorherigen Auftritt auf der Bühne waren.')
,entry('beiseite','beiseite|beyseite','Eine Bemerkung, die andere Figuren nach der Bühnenkonvention nicht oder nicht vollständig hören sollen.','Das Publikum kann dadurch mehr wissen als die angesprochenen Figuren. „Leise“ allein legt noch nicht eindeutig fest, wer etwas hört.')
,entry('Coulissen','Coulissen|Kulissen','Die seitlichen Teile der Bühnendekoration; zwischen ihnen können Personen auftreten oder verborgen bleiben.')
,entry('Kabinet','Kabinet|Kabinetts|Kabinett','Ein kleineres, vom Hauptraum getrenntes Zimmer.','In IV/4 weist die Baronin Julie ein solches Zimmer als Schlafzimmer zu. Türen und Zugänge können deshalb Machtverhältnisse sichtbar machen.')
,entry('Portchaise','Portchaise|Portechaise|Tragsessel','Ein von Menschen an Stangen getragener Sitz beziehungsweise eine Sänfte.','Die Regieanweisung in IV/1 beschreibt den Kasten ausdrücklich nach diesem Vorbild. Er muss gross genug sein, um einen Menschen aufzunehmen.')
,entry('Vormund','Vormund|Vormünder','Eine Person, die rechtlich für eine andere Person sorgt und Entscheidungen für sie trifft.','Die Rede über Vormünder thematisiert ein Abhängigkeitsverhältnis; ob eine konkrete Forderung berechtigt ist, muss am Dialog geprüft werden.')
,entry('Stand','Stande|Standes','Hier häufig: gesellschaftlicher Rang oder gesellschaftliche Gruppe.','„Von Stande“ bedeutet von vornehmer Herkunft. „Im Stande sein“ heisst dagegen „fähig sein“; diese Wendungen dürfen nicht verwechselt werden.')
,entry('Nebenbuhler','Nebenbuhler','Ein Konkurrent um die Liebe oder die Heirat mit einer Person.')
,entry('Zärtlichkeit','Zärtlichkeit','Liebevolle Zuneigung; in der höflichen Sprache auch die erklärte Zuneigung eines Verehrers.','Eine Liebeserklärung beweist noch nicht, dass Verhalten und Gefühl übereinstimmen.')
,entry('Gegenstand','Gegenstand','Neben einer Sache kann das Wort hier auch die Person bezeichnen, auf die sich Liebe oder Interesse richtet.')
,entry('Verbindlichkeiten','Verbindlichkeiten','Je nach Zusammenhang Verpflichtungen oder höfliche, schmeichelhafte Worte.','In II/7 berichtet der Graf von vermeintlichen Komplimenten des Barons.')
,entry('Attention','Attention|attent','Aufmerksamkeit beziehungsweise aufmerksam und zuvorkommend.','Im Gespräch über den Schmuck bezeichnet die Baronin das Geschenk als Aufmerksamkeit. Julie befürchtet eine damit verbundene Verpflichtung.')
,entry('Delicatesse','Delicatesse|Delikatesse|delikat|indelikat','Hier: Feingefühl, Takt und Rücksicht; „indelikat“ bedeutet taktlos. Nicht die heutige Bezeichnung für eine besondere Speise.')
,entry('Schicklichkeit','Schicklichkeit','Ein Verhalten, das den gesellschaftlichen Regeln des Anstands entspricht.')
,entry('Schwärmerei','Schwärmerei|Schwärmeren','Begeisterung oder Gefühlsüberschwang, oft abwertend als unrealistisch bezeichnet.','Wenn die Baronin Julies Worte so nennt, wertet sie deren Anspruch auf eine eigene Liebesentscheidung ab.')
,entry('entsagen','entsagen|Entsagen','Auf etwas verzichten, das man sich wünscht.')
,entry('sich zieren','zieren','Sich zurückhaltend geben oder scheinbar nicht zustimmen wollen.','Die Baronin stellt Julies Ablehnung als blosses Zögern dar. Julies eigene Worte müssen daneben gelesen werden.')
,entry('Gefälle','Gefällen|Gefälle|Renten','Hier: regelmässige Einkünfte, etwa aus Besitz oder Abgaben; „Renten“ meint nicht nur die heutige Altersrente.')
,entry('Gläubiger','Gläubiger|Glaubiger','Jemand, dem eine andere Person Geld schuldet. Historische Schreibweisen und Übertragungsfehler können die Form verändern.')
,entry('Arrest','Arrest','Festnahme oder Haft.','Die Drohung damit setzt Wendheim unter Druck. Eine historische Textstelle ist keine Beschreibung des heutigen Schuldenrechts.')
,entry('Dukaten','Dukaten|Ducaten','Goldmünzen; im Stück eine Angabe beträchtlicher Geldsummen. Eine genaue Umrechnung in heutige Kaufkraft ergibt sich daraus nicht.')
,entry('Thaler','Thaler|Reichsthaler|Rthlr','Historische Geldbezeichnungen; „Rthlr“ ist eine Abkürzung für Reichstaler.')
,entry('Ranzion','Ranzion','Lösegeld beziehungsweise eine Zahlung zur Befreiung.','Carl verwendet den Ausdruck in IV/10 im Zusammenhang mit seiner Dankesschuld gegenüber Wendheim.')
,entry('Parole','Parole','Ein Kennwort oder eine Losung.','„Der Bräutigam aus der Fremde“ verschafft im Stück Zugang zum Haus. Das Kennwort und die wirkliche Identität müssen nicht übereinstimmen.')
,entry('Renommée','Renommée|Renommee','Ruf oder Ansehen, das jemand bei anderen hat.','Carl spielt mit seinem Ruf als Unruhestifter und will sich öffentlich nicht als tugendhaft darstellen lassen.')
,entry('Genugthuung','Genugthuung|Genugtuung','Wiedergutmachung einer Kränkung; hier im Streit auch die Forderung nach einem Duell.')
,entry('Courage','Courage','Mut, Tapferkeit oder die Bereitschaft, etwas zu wagen.')
,entry('Cavalier','Cavalier|Kavalier','Ein vornehmer Herr; auch ein Mann, der als höflich und ehrenhaft gilt.')
,entry('Kabale','Kabale','Eine heimliche Intrige oder ein Ränkespiel.')
,entry('malitiös','malitiös|malitiösen|malitiöse','Boshaft, gehässig oder mit einer schädigenden Absicht.')
,entry('insolent','insolent|Insolenz','Unverschämt, anmassend; „Insolenz“ bezeichnet ein solches Verhalten.')
,entry('fatal','fatal|fatales|fatale','Im damaligen Sprachgebrauch oft unangenehm, lästig oder peinlich, nicht unbedingt tödlich.')
,entry('gravitätisch','gravitätisch','Mit betonter Würde und gemessenem Ernst.','Dass der Graf zugleich zittert und würdevoll erscheinen will, lässt einen Gegensatz zwischen Empfindung und Auftreten erkennen.')
,entry('blessiert','blessirt|blessiert','Verwundet oder verletzt.')
,entry('liederlich','liederlich|liederliche|liederlichen|liederlicher','Unordentlich, leichtsinnig oder nach den geltenden Moralvorstellungen anstössig. Die Bezeichnung ist bereits ein Urteil des Sprechers.')
,entry('Wildfang','Wildfang|Wildfänge','Ein lebhafter, ungestümer Mensch, der sich schwer bändigen lässt.')
,entry('Schalkheit','Schalkheit|Schalk','Schelmischer Witz oder eine spielerisch-spöttische Haltung.')
,entry('Unwillen','Unwillen','Ärger, Missfallen oder innere Ablehnung.')
,entry('Genius','Genius','Ein schützender oder inspirierender Geist; auch eine bildliche Bezeichnung für eine glückliche Eingebung.')
,entry('Bouteille','Bouteille|Bouteillen','Französisch für Flasche; im Zusammenhang mit Trinken meist eine Weinflasche.')
,entry('Negociant','Negociant','Kaufmann oder Händler.')
,entry('Extrapost','Extrapost','Eine eigens bestellte Fahrt mit Postpferden; keine gewöhnliche Briefsendung.')
,entry('Commission','Commission','Hier: ein Auftrag oder eine dienstliche Angelegenheit, für die Salden verreist.')
,entry('Heurath','Heurath|Heurathen|heurathen','Historische Schreibweisen von „Heirat“ und „heiraten“.')
,entry('verziehen','verziehen','Kann hier „noch bleiben“ oder „warten“ bedeuten. Nicht an jeder Stelle ist Vergebung oder schlechte Erziehung gemeint.')
,entry('aufwarten','aufzuwarten|aufwarten','Jemandem einen höflichen Besuch machen oder ihm Dienste anbieten.')
,entry('bon','Bon|bon','Französisch: gut. Der Graf gebraucht es häufig als kurze zustimmende Antwort.')
,entry('Me voilà','Me voilà|me voilà','Französisch: Da bin ich beziehungsweise hier bin ich.')
,entry('Au contraire','Au contraire|au contraire','Französisch: im Gegenteil.')
,entry('C’est à dire',"C’est à dire|C'est à dire",'Französisch: das heisst; genauer gesagt.')
,entry('Je vous assure','Je vous assure','Französisch: Ich versichere Ihnen.')
,entry('d’accord',"d’accord|d'accord",'Französisch: einverstanden.','Wenn der Graf nach Julies Einverständnis fragt, sollte ihre eigene Äusserung mit der Antwort der Baronin verglichen werden.')
,entry('rouge','rouge','Französisch: rot; hier rote Gesichtsschminke.')
,entry('de contenance','de contenance','Französisch, hier sinngemäss: um Haltung zu bewahren oder eine Verlegenheit zu überspielen.')
,entry('Attachement','Attachement','Französisch: Anhänglichkeit, Verbundenheit oder Zuneigung.')
,entry('Tableau','Tableau','Französisch: Bild; auch eine bildhaft angeordnete Szene.')
,entry('Regime','Regime','Hier: eine geregelte Lebensweise oder Diät.','Sophie führt das Bild der Liebe als ernährbarer oder ausgehungerter Kraft spöttisch weiter; gemeint ist hier kein politisches Regierungssystem.')
,entry('Frey','Frey','Name von Carls Kammerdiener. Nicht mit der historischen Schreibweise „frey“ für „frei“ verwechseln.')

];
const forms=new Map(glossary.flatMap(e=>e.forms.map(f=>[f,e])));
export function lookupWord(word){const clean=word.trim().replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'');return forms.get(clean)||[...forms].find(([f])=>f.toLowerCase()===clean.toLowerCase())?.[1]||glossary.find(e=>e.word.toLowerCase()===clean.toLowerCase())||null;}
export function dictionaryUrl(word){return 'https://www.dwds.de/wb/'+encodeURIComponent(word.trim());}
const escaped=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const matcher=new RegExp('(?<![\\p{L}])(?:'+[...forms.keys()].sort((a,b)=>b.length-a.length).map(escaped).join('|')+')(?![\\p{L}])','giu');
export function findTerms(text){return [...text.matchAll(matcher)].map(m=>({start:m.index,end:m.index+m[0].length,text:m[0],entry:lookupWord(m[0])}));}
