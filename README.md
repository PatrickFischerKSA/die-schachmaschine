# Die Schachmaschine

**Mensch – Maschine – Täuschung – Intelligenz.** Eine interaktive 3D-Web-Installation als durchgehende Schachpartie. Eigenständiges Vite-/Three.js-Projekt, für GitHub und GitHub Pages vorbereitet.

## Start

Node.js 22.12 oder neuer:

```sh
npm ci
npm run dev
```

Die Konsole nennt die lokale Adresse. Mit `npm run build` entsteht `dist/`; `npm run preview` zeigt den Produktionsbuild. `npm test` prüft Schachlogik, Regelzuordnungen und Brettkoordinaten.

## Das ganze Stück – die Hauptansicht

Die Installation beginnt mit der vollständigen Bühnenlektüre von Becks Lustspiel: vier Aufzüge, 44 Auftritte und 79 aufeinanderfolgende Textstrecken mit rund 20.400 Wörtern. Titel, Personenverzeichnis, sämtliche Dialoge, Regieanweisungen und Schluss bleiben unverändert enthalten. Plane mehrere Sitzungen ein.

Die Textstrecken werden ohne willkürliches Lesepult geöffnet. Das Brett zeigt belegte Figurenbeziehungen aus auswählbaren Perspektiven. An 14 Schlüsselstellen in allen vier Aufzügen werden Perspektiven verglichen; dazwischen kann ohne zusätzliche Pflichtaufgabe gelesen werden. Die Werkstatt ist über den gesamten Text verfügbar.

- Markiere Originaltext oder ordne eine wortgetreue Passage aus dem Belegfenster zu. Aussage und Begründung bleiben frei formuliert. Quelle, Urheber, Blickpunkt und Belegstatus werden gespeichert.
- Unterscheide Wissen, Absicht, zugeschriebene Absicht, Abhängigkeit sowie Selbstbild / fremde Rolle. Nähe, Entzug, Einflussrahmen und Handlungsspielraum entstehen aus der erklärten Bedeutung deiner Beziehung. Die Koordinate selbst hat keine Bedeutung.
- Elf redaktionell belegte Informationsereignisse unterscheiden den gesicherten Zugang einzelner Figuren vom Mehrwissen des Publikums. Fehlender Zugang im Modell bedeutet nicht bewiesenes Nichtwissen. Weitere Annahmen können als eigene Lesarten ergänzt werden.
- Wechsle Figur, Ebene und Urheber; vergleiche Lesarten samt Diagrammen und Wortlaut. Widersprüche bleiben bestehen. Bei widersprüchlichen räumlichen Deutungen wird keine heimliche Mehrheits- oder Letztstimmenentscheidung getroffen: Die Position bleibt neutral, bis eine einzelne Lesart gewählt wird.
- Im Einzelspiel sind an Schlüsselstellen zwei Perspektiven und ein freier Vergleich erforderlich. Im Multiplayer werden die Perspektiven weitergereicht; erste Lesarten bleiben bis zur Abgabe aller privat. Anschliessend hält jede Person einen Vergleich fest. Es gibt keine Quizantworten und keine automatische Bewertung literarischer Deutungen.
- Im vierten Aufzug sind zwei Revisionsstellen verbindlich. Eine eigene frühere Lesart wird mit einer späteren Quelle bestätigt, eingeschränkt oder verändert. Die alte Fassung bleibt erhalten; frühere Konstellationen können angezeigt werden. Nach jedem Aufzug wird die Entwicklung frei zusammengefasst.

Brett und Originaltext teilen sich jetzt ein festes Bildschirmfenster. Standard ist **Bühne oben · Text unten**, alternativ **Brett links · Text rechts**. Nur der Lesebereich scrollt. Die Trennlinie lässt sich ziehen oder nach Tastaturfokus mit Pfeiltasten / Home / End verstellen. Die Anordnung wird auf dem Gerät gespeichert; auf schmalen Geräten werden beide Bereiche untereinander gehalten.

Äusserungen können per Klick oder Enter als Textanker festgehalten, kürzere Stellen durch Markierung ausgewählt werden. Der Beleg bleibt beim Perspektivwechsel und bei gemeinsamen Spielzügen sichtbar und lässt sich unmittelbar in die seitliche Werkstatt übernehmen. Die erkannte Lesestimme erhält einen blauen Lichtsaum, ohne die gewählte Deutungsperspektive zu verändern. Sprecherfortsetzungen über Seitengrenzen werden übernommen; historische Übertragungsfehler bleiben in der Quelle erhalten.

Bei einer Figurenperspektive steht die Fokusfigur vorn. Belegte Annäherung, Entzug, Einfluss und Handlungsspielraum erhalten unterschiedliche räumliche Anordnungen; Pfeile bleiben gerichtet, widersprüchliche Lesarten sichtbar. **Kamera folgt Figurenperspektive** richtet den Blick aus der Richtung der Fokusfigur auf die untersuchten Beziehungen. Jede manuelle Kameraansicht schaltet diese Kopplung aus; sie lässt sich wieder aktivieren. Raumansicht, Draufsicht, Gegenseite, links, rechts, Nahansicht, Blick über die Schulter sowie freies Drehen und Zoomen bleiben verfügbar. Die Beziehungen stehen zusätzlich als zugängliche Textkarten zur Verfügung.

Allein speichert die Anwendung den Lesestand dauerhaft auf diesem Gerät; über **Leseprotokoll / Speichern** lässt sich der Stand als JSON exportieren und auf einem anderen Gerät laden. Im Multiplayer für 2–5 Personen werden die Rollen verteilt. Alle lesen denselben Text und bearbeiten an den Schlüsselstellen ihre Perspektive; nach dem Vergleich und der Bereitschaft aller kann die Raumleitung fortfahren. Lektüreräume bestehen sieben Tage. Gespeicherte Raumzugänge können über **Multiplayer** auf demselben Gerät wieder geöffnet und dort auch entfernt werden. Die Lesebestätigung dokumentiert den bestätigten Fortschritt, nicht überprüftes Verständnis.

`npm run build:play` erzeugt `src/play-pages.json` aus dem unveränderten Transkript. Ein automatischer Test prüft die vollständige, zeichengetreue Rekonstruktion der Quelle. `npm run test:play` prüft alle 79 Strecken im Browser; `npm run test:play:multiplayer` prüft Rollenwechsel, gemeinsamen Text, Lesebestätigungen, Wiederaufnahme, Undo und Reset (lokale Server erforderlich).

## Themenpartie – die ergänzende geführte Partie

Die zusätzliche Themenpartie bietet 20 Szenen für die Sekundarstufe II. Richtzeit: 30–40 Minuten inklusive Quellenlektüre und Gespräch, kein Zeitlimit. Das vollständige [Szenendrehbuch](docs/SZENENDREHBUCH.md) beschreibt Handlungen, Folgen, Quellen und die Unterscheidung von Textbefund und Spielvariante.

1. **Kempelen:** spielen, erstes Urteil begründen, einen Untersuchungsweg wählen, das System öffnen und erneut urteilen.
2. **Beck:** als Baronin einen Plan ausführen und Widerstand erleben; als Sophie Information weitergeben oder zurückhalten; Carls Handlungsmöglichkeiten hängen davon ab. Ohne Julies eigene Entscheidung ist die Verbindung mit Wendheim gesperrt. Anschliessend die eigene Variante mit Becks Handlung vergleichen und Rinks Buchvorgaben selbst ausführen.
3. **Searle:** dieselbe Verständnisfrage zunächst von aussen, dann nach eigener Regelbefolgung beantworten; Personen-, System- und Interaktionsperspektive abwägen.
4. **KI:** einen konkreten, mit Textauszügen versehenen Auftrag zu Julies Schmuckablehnung bearbeiten und die Antwort an Sprache, Beleg und Schlussfolgerung prüfen. Daten, Training und Inferenz getrennt untersuchen.
5. **Abschluss:** erste und spätere Urteile, Entscheidungen und Begründungen auf dem Brett wieder aufrufen; die gesamte Zugspur als Text exportieren. Keine philosophischen Punkte oder Musterlösung.

Die Partie speichert ihren Stand im `sessionStorage` dieses Tabs. Ein Neuladen setzt den Durchlauf fort; vor dem Schliessen sollte die Zugspur exportiert werden. Ist Sitzungsspeicherung blockiert, bleibt die Partie im Arbeitsspeicher spielbar. «Neue geführte Partie» fragt vor dem Löschen nach. Das freie Archiv bleibt jederzeit zugänglich und verändert den geführten Stand nicht.

### Echtes KI-Experiment auf GitHub Pages

«Auftrag kopieren» liefert eine konkrete Textaufgabe inklusive Beck-Auszügen. Die Lernenden geben den Auftrag in ein eigenes Sprachmodell und fügen dessen unveränderte Antwort ein. Die Anwendung kennzeichnet die selbst angegebene Herkunft; sie behauptet keine unabhängige Verifikation. Auf einem eingerichteten lokalen Modellserver ist alternativ ein direkter Abruf möglich.

Ohne Modellzugang gibt es einen ausdrücklich **redaktionell verfassten Vergleichstext**, keine vorgetäuschte Modellantwort. Der Abschluss hält dann fest, dass kein KI-Experiment durchgeführt wurde. Philosophische Urteile und die übrige Zugspur werden nicht an einen Modellanbieter gesendet; beim direkten Abruf wird nur der sichtbare Textauftrag übertragen.

## Die Partien im freien Archiv

- **1770 · Kempelen:** Zwei legale eigene Züge; ein einfacher Algorithmus antwortet. Danach stoppt die Partie. Vermutung formulieren, Brett öffnen, schematischen verborgenen Spieler entdecken. Die Software inszeniert die historische Täuschung und behauptet nicht, ein Mensch spiele live.
- **1798 · Beck:** Rink zieht nach einem Buch für beide Seiten. Balken wird zur Maschinenfigur; Sophie deckt den Plan auf und Carl übernimmt den ersten Kasten. Carls Schachmetaphern und Balkens vier Routinen sind mit konkreten Fundstellen versehen. Alle sieben Figuren sind auswählbar und auf freie Felder beweglich. Figurenbeziehungen werden als interpretative Antriebe sichtbar.
- **1980 · Searle:** Drei erfundene Zeichenregeln selbst ausführen. Anschliessend frei reflektieren, ohne Richtig/Falsch-Wertung. Syntax und Semantik lassen sich als Begriffe bewegen; die Syntaxfigur folgt dabei einer Turmregel. Argument und Gegenpositionen werden getrennt erläutert.
- **2026 · KI:** Eine Frage eingeben. Standardmässig ausdrücklich gekennzeichnete, vorformulierte Demoantworten; optional echtes Modell über einen serverseitigen Anschluss. Unter dem Brett werden 13 Voraussetzungen moderner KI erkundbar.
- **Zeitschichten:** Vier räumlich gestaffelte Raster einzeln ein-/ausblenden.
- **Vergleich:** Zwei identische vorgegebene Partien Schritt für Schritt betrachten, begleitet von offenen Fragen.

Drehen durch Ziehen, Zoomen durch Scrollen, Figur und Zielfeld anklicken. Perspektivwechsel, zuschaltbare synthetische Klänge und ein HTML-Brett für Tastatur/Touch sind enthalten. Ohne WebGL wird das HTML-Brett automatisch eingeblendet. Bewegungsreduktion des Betriebssystems wird berücksichtigt.

## Optional: echtes Sprachmodell

1. `.env.example` als `.env` kopieren.
2. `LLM_API_URL`, `LLM_API_KEY` und `LLM_MODEL` für einen Anbieter mit Chat-Completions-kompatibler API setzen.
3. `npm run build && npm start` ausführen.
4. `http://127.0.0.1:8787` öffnen.

Im Entwicklungsmodus zusätzlich zu `npm run dev` den Server mit `npm start` ausführen. Vite leitet `/api` an Port 8787 weiter. Der Browser erkennt den Modus über `/api/status`. Die Verbindung ist auf einen lokalen Betrieb ausgelegt; API-Fehler werden angezeigt, ohne einen Modelloutput vorzutäuschen. Eingaben werden im Live-Modus an den konfigurierten Anbieter übertragen. Keine Speicherung auf dem Projektserver.

Der Schlüssel bleibt ausschliesslich serverseitig. `.env` ist von Git ausgeschlossen. Der Server bindet nur an Loopback, begrenzt Eingaben, gleichzeitige Anfragen und Antwortdauer. Für einen öffentlichen Modellbetrieb sind zusätzlich Authentifizierung, nutzerbezogene Kontingente und ein abgesicherter Reverse Proxy erforderlich. GitHub Pages führt keinen Node-Server aus. In der geführten Partie ist deshalb der externe Modellauftrag mit Einfügen der Antwort verfügbar; das freie Archiv bleibt bei seinen gekennzeichneten Demoantworten. Ein echter Anbieter konnte ohne Zugangsdaten nicht getestet werden; der API-Pfad wird gegen einen lokalen Mock geprüft.

## GitHub Pages

Unter **Settings → Pages → Source: GitHub Actions** aktivieren. Anschliessend den Workflow **Deploy GitHub Pages** manuell starten. Private Repositories benötigen einen passenden GitHub-Tarif für Pages; alternativ Sichtbarkeit selbst ändern. Die relativen Asset-Pfade unterstützen Repository-Unterverzeichnisse. Der CI-Workflow testet und baut jeden Push/PR; Veröffentlichung ist bewusst separat auslösbar.

## Quellenstatus

Siehe [docs/QUELLEN.md](docs/QUELLEN.md). Becks Szenen, Zitate und Figurenkonstellationen sind mit dem nachgereichten Transkript abgeglichen. Zitatkarten nennen Sprecher, Aufzug und Auftritt und trennen Text von Interpretation. Die unveränderte Textextraktion liegt in `public/sources/beck-1798-transkript.txt`. Das Transkript enthält Übertragungsfehler; ein zusätzlicher Abgleich mit dem historischen Druck steht aus. Die Vorlage bricht in Abschnitt 23 ab; es wurden keine angeblichen Fortsetzungen erfunden.

Die 3D-Objekte sind schematische Inszenierungen, keine historischen Rekonstruktionen. Der historische Ausdruck „Schachtürke“ bezeichnet Kempelens orientalisierend gestalteten Automaten. Er wird hier als historischer Objektname verwendet.

## Projektstruktur

- `src/scene.js`: Three.js-Brett, Figuren, Mechanik, Zeitschichten, Kamera und Picking
- `src/main.js`: gemeinsamer Rahmen, freies Archiv und zugängliches HTML-Brett
- `src/journey.js`: geführte Dramaturgie, Quellenprüfung, Modellausgabe und Zugspur
- `src/journey-state.js`: Entscheidungsfolgen, Bedingungen, Sitzungszustand und Export
- `src/content.js`: Inhalte, Figuren, Zeichenregeln
- `src/beck.js`: belegte Zitate, Fundstellen und Interpretationshinweise
- `src/logic.js`: Schachregeln und Zuordnungen
- `server.mjs`: optionaler lokaler Modellproxy und statischer Server
- `tests/`: Logik- und Browserprüfungen
- `.github/workflows/`: CI und manuelles Pages-Deployment

Schachregeln: chess.js. 3D: Three.js. Schriften: DM Sans und Playfair Display über Google Fonts, mit lokalen System-Fallbacks. Keine Bilddateien oder fremden 3D-Modelle erforderlich. Kein Tracking; die geführte Zugspur verwendet nur tabbezogenen Sitzungsspeicher.

Weitere Prüfungen: `npm run test:server` prüft den optionalen Modellproxy gegen einen lokalen Mock. `npm run test:browser` setzt einen laufenden Vorschau-Server und installiertes Playwright-Chromium voraus (`npx playwright install chromium`); über `TEST_URL` lässt sich die Zieladresse ändern. Die Browserprüfung durchläuft alle vier Partien, Zeitschichten, Vergleich, Dialog, Reset und eine mobile Ansicht.

`npm run test:journey` durchläuft die geführte Partie einschliesslich Informationssperre, Julies Entscheidung, Sitzungswiederaufnahme, Textprüfung, Export und Archivwechsel. Die reinen Zustandstests in `npm test` prüfen die Handlungsbedingungen auch unabhängig vom Browser.

## Multiplayer für 2–5 Personen

Auf der Website **Multiplayer · 2–5** öffnen, ein Pseudonym wählen und einen Raum erstellen. Den Einladungslink oder den zwölfstelligen Raumcode teilen. Alle spielen auf einem eigenen Gerät oder in einem getrennten Tab. Die Raumleitung startet, sobald alle 2–5 Personen im Warteraum sind; danach ist der Eintritt gesperrt.

Das Brett und die Szene sind gemeinsam. Die angezeigte Person führt die Handlung aus. Bei Beck werden Baronin, Sophie, Carl, Julie und Rink auf die Plätze verteilt; bei weniger als fünf Personen übernimmt eine Person mehrere Rollen. Im ersten Schachspiel und im chinesischen Zimmer wechselt das Handlungsrecht nach einem Zug. Alle schreiben eigene begründete Urteile. Erst nach Abgabe aller Urteile wird der Vergleich sichtbar; abgegebene Urteile bleiben unverändert. Nach dem Gespräch klicken alle **Ich bin bereit** und die Raumleitung **Gemeinsam weiter**. Die Installation vergibt keine Punkte für philosophische Positionen.

Ein Neuladen desselben Tabs stellt den Zugang wieder her. Nach einer Minute ohne Verbindung kann eine andere Person die Raumleitung übernehmen; getrennte Personen können entfernt werden, solange mindestens zwei im laufenden Raum bleiben. Das Verlassen löscht den persönlichen Zugang auf diesem Gerät. Ein Themenraum läuft nach 24 Stunden ab, ein vollständiger Lektüreraum nach sieben Tagen oder wird von der Raumleitung für alle geschlossen. Eigene Zugspuren lassen sich jederzeit, die gemeinsame Zugspur am Ende herunterladen.

### Raumserver

Die Oberfläche bleibt auf GitHub Pages. `multiplayer/worker.js` verwaltet Räume mit Cloudflare Durable Objects und SQLite. Spielzüge werden serverseitig gegen `src/journey-state.js` geprüft. Raumzugänge verwenden zufällige Tokens; der Server speichert nur deren Hashes. Einladungslinks enthalten ausschliesslich den Raumcode. Entwürfe bleiben im Browser; Pseudonyme und abgegebene Urteile werden bis zur Raumlöschung gespeichert. Die Raumdaten werden nicht an Sprachmodelle gesendet. Freigegebene Urteile sind für Mitglieder desselben Raums sichtbar. Der optionale Modellabruf übermittelt wie bisher nur den ausdrücklich angezeigten Textauftrag.

```sh
npm ci
npm run multiplayer:dev
# In einem zweiten Terminal:
VITE_MULTIPLAYER_API=http://127.0.0.1:8788 npm run dev
```

`wrangler.jsonc` enthält Raum-Binding, SQLite-Migration und eine Begrenzung für neue Raum-/Beitrittsanfragen. Für ein eigenes Deployment `npx wrangler login`, dann `npm run multiplayer:deploy`; die öffentliche API-Adresse beim Frontend-Build über `VITE_MULTIPLAYER_API` setzen und die erlaubten Ursprünge im Worker anpassen. Keine Zugangsdaten gehören ins Frontend oder Git. Das Frontend-Deployment veröffentlicht den Worker nicht mit: Bei Serveränderungen zuerst den Worker separat deployen.

Prüfung: `npm test` enthält vollständige Zwei- und Fünfpersonen-Durchläufe. Bei laufendem lokalem Worker und Vite prüfen `npm run test:multiplayer:api` und `npm run test:multiplayer:browser` echte Raumzugriffe und fünf getrennte Browser-Sitzungen. Die Browserprüfung leitet die voreingestellte öffentliche API für den Test auf Port 8788 um. Mit `LIVE=1 TEST_URL=https://patrickfischerksa.github.io/die-schachmaschine/ npm run test:multiplayer:browser` wird die veröffentlichte Installation getestet.

### Freie Antworten, Rücknahme und Reset

Die Urteilsfragen verwenden freie Texte anstelle vorgegebener Antwortpositionen, auch im freien Archiv. Handlungsoptionen im Stück bleiben konkrete Spielaktionen. Frühere gespeicherte Auswahlantworten bleiben lesbar.

**Zug zurück** nimmt den letzten Spielschritt oder Szenenwechsel zurück. Im Schach werden der eigene Zug und die Automatenantwort gemeinsam zurückgenommen. Im Einzelspiel bleibt die Rücknahmespur beim Neuladen desselben Tabs erhalten. Texteingaben werden nicht Zeichen für Zeichen zurückgenommen. **Reset · Neu beginnen** startet die geführte Partie nach Bestätigung neu.

Im Multiplayer kann die Raumleitung die letzte Aktion (einschliesslich einer Urteilsabgabe) zurücknehmen oder die gesamte Partie zurücksetzen. Raumcode und Teilnehmende bleiben beim Reset erhalten. Bereits gelesene Urteile können durch eine Rücknahme nicht wieder unbekannt werden. Nach Rücknahmen und Resets werden Bereitschaft und lokale Antwortentwürfe verworfen; verspätete Anfragen zum alten Durchlauf werden abgewiesen. Die gemeinsame Rücknahmespur ist auf höchstens 80 Schritte und 512 KiB begrenzt.

### Text und Spielzusammenhang

Alle 20 Stationen enthalten eine sichtbare Einführung in Situation, Textbezug und Aufgabe. Der Auftakt erklärt Becks Lustspiel und die konkurrierenden Heiratspläne. Bei der Schmuckszene werden Julies Ablehnung und der Befehl der Baronin direkt gegenübergestellt. Der Übergang zu Searle und KI ist als heutiger Vergleich gekennzeichnet.

In der Themenpartie öffnet **Stück lesen** eine Figurenübersicht sowie elf zusammenhängende Auftritte aus dem bereitgestellten Transkript. **Auftritt im Zusammenhang lesen** springt von der aktuellen Spielszene zum passenden Text. Der vollständige Text ist ebenfalls verlinkt. Historische Schreibweisen bleiben erhalten; offensichtliche Übertragungsfehler werden seit der Lesefassung vom 30.09.2026 nachvollziehbar korrigiert. `src/reading-scenes.json` enthält weiterhin unveränderte Quellpassagen; der Quellen-Test prüft sie gegen das vollständige Transkript. Die Oberfläche zeigt die darauf bezogene Lesefassung. Das Lesefenster ist auch im Archiv und für beobachtende Multiplayer-Mitglieder zugänglich.

## Wort- und Texterklärungen

Die Vorlesefunktion und ihre Audiodateien wurden entfernt. Unterstrichene Wörter öffnen redaktionelle Sprachhilfen. **Wort / Textstelle erklären** erschliesst eine Auswahl; auch der festgehaltene Textanker bietet **Textstelle erklären**. **Hilfen zu dieser Textstrecke** zeigt nur die Hilfen zum gerade geöffneten Abschnitt.

`src/glossary.js` enthält 91 Einträge: historische Schreibweisen, Gesellschafts- und Theaterbegriffe, französische Wendungen und Kontext-Hinweise. `src/text-explanations.js` enthält 28 exakt am Original verankerte Erläuterungen aus allen vier Aufzügen: Originalwortlaut, sinngemässes heutiges Deutsch und ausdrücklich offene Deutungshinweise. Worterklärungen mit Kontext nennen die betreffende Situation; mehrdeutige Wörter werden nicht automatisch auf eine einzige Bedeutung reduziert. Frey als Figurenname wird von „frey“ unterschieden.

Ausgewählte Stellen können aus dem Hilfefenster direkt als Textanker am Brett festgehalten werden. Originaltext und Beleg-Offsets bleiben unverändert. Unbekannte Sätze erhalten keine erfundene Gesamtübersetzung: Die Hilfe nennt ihre Grenze, erklärt bekannte Bestandteile und bietet Schritte zum Erschliessen an. Für unbekannte Einzelwörter gibt es einen externen DWDS-Link. Keine KI-Anfragen und keine Übertragung von Schülernotizen.

Prüfung: `npm test`, `node tests/reading-help-browser.mjs`, `node tests/play-browser.mjs`. Browserprüfungen brauchen einen laufenden Vite-Server; `TEST_URL` kann die veröffentlichte Website wählen.

## Zoom, Innenperspektiven und Denkmodelle

Der Kameraabstand bleibt bei Figuren-, Beziehungs- und Blickrichtungswechseln erhalten, auch nach Mausrad-/Touch-Zoom. OrbitControls erlaubt jetzt 2,5–55 statt 10–28 Einheiten Abstand; der Regler bietet 40–840 %, dazu Plus/Minus und einen ausdrücklichen Zoom-Reset auf 100 %. Rechtsziehen beziehungsweise Zweifinger-Gesten erlauben das Verschieben. Die Ansicht „Flacher Blick“ verändert den Blickwinkel, nicht den Zoom.

**Innenperspektiven · Denkmodelle** öffnet ein Denklabor mit 26 quellengenauen, nach Lesestand freigeschalteten Studien. Alle 13 Figurenperspektiven sind vertreten, Bedienter und beide Träger zusätzlich einzeln. Ziele, Mittel, Annahmen über andere, Risiken und Gegenproben bleiben als Interpretationsangebote gekennzeichnet. Belegter Informationszugang und ungesicherter Zugang sind getrennt. Private Notizen bleiben lokal, nach Raum/Spielstand/Textstrecke/Perspektive getrennt, und können als eigene JSON-Datei exportiert werden. Sie werden nicht automatisch mit den Mitspielenden oder einem KI-Dienst geteilt.

Das Labor verbindet den historischen Automaten (1770), Beck (1798), Turings Imitationsspiel (1950), Searles chinesisches Zimmer (1980) und mögliche heutige Figurenmodelle. Quellen und Grenzen jedes Vergleichs stehen direkt dabei. Das chinesische Zimmer wird als Kritik an starker KI eingeordnet, nicht als technische Vorstufe. Die Turing-Werkstatt bietet ein freies Protokoll für einen durch Menschen organisierten Blindvergleich; sie behauptet keinen echten laufenden KI-Test. KI-/RAG-Anbindung ist zurückgestellt. Vorschläge: `docs/figuren-ki-konzept.md`.

Zusätzliche Prüfung: `node tests/strategy-browser.mjs` überprüft Mausrad- und Reglerzoom über Perspektivwechsel, neue Grenzen, Figurenstudien, Notizpersistenz und Mobilansicht. `npm test` prüft unter anderem Quellenanker und Lesestandsgrenzen.

## Ausführbare Entscheidungssimulation für das Ensemble

**Innenperspektiven · Denkmodelle → Entscheidungssimulation · Figuren und Gegenproben** erschliesst 13 Studien mit 15 einzeln auswählbaren Figuren. Die erste Auswahl folgt nach Möglichkeit der im Denklabor gewählten Perspektive. Jede Studie wird erst nach Öffnen ihrer letzten benötigten Textstrecke verfügbar. Unbekannte Informationen und ungelesene Studien werden nicht vorweggenommen; der Originaltext und der gemeinsame Multiplayer-Lesestand bleiben unverändert.

| Studie | Stelle | Gegenprobe |
| --- | --- | --- |
| Marie: Sachwissen unter einem Auftrag | I/1 | Die Baronin akzeptiert die Materialgrenze |
| Rink: Auswahl und Julies fehlende Stimme | I/1 | Vermögen ist keine notwendige Bedingung |
| Älterer Ruf: Selbstbild und Fremdbild | I/2 | Aktuelle Beobachtung statt Idealbild |
| Baronin und Sophie: Einfluss durch eine Mittlerin | I/4 | Julies eigene Entscheidung wird anerkannt |
| Salden: Aufmerksamkeit und gutes Ansehen | I/6 | Carl nimmt den Einwand als Grenze an |
| Bedienter und Sophie: Nachricht und Identität | I/9 | Unabhängige Prüfung vor dem Einlass |
| Frey: Risiko und Mithilfe | II/3 | Mithilfe erst nach Risikoabsprache |
| Graf: Geschenk und Zustimmung | II/4 | Die Wirkung des Geschenks ist ungesichert |
| Julie: Entsagen ist nicht Lieben | III/3 | Die Baronin respektiert Julies Nein |
| Sophie: Verwendung weitergegebenen Wissens | III/8 | Absprache vor der Informationsweitergabe |
| Flucht: Material, Zeit und Oberfläche | III/10 | Mehr Zeit für das verlangte Material |
| Wendheim: Bedingungen brüderlicher Hilfe | III/11 | Hilfe ohne erzwungene Abreise |
| Carl und beide Träger: Kooperation ohne Vertrauen | IV/2 | Identitätssignal, Geldablehnung, Zahlung oder Gegenwehr verändern |

Die zwölf neuen Studien enthalten je zwölf protokollierte Verarbeitungsschritte; die Transportstudie bis zu 32. Jede beteiligte Figur handelt selbst. Wahrnehmen, Annahmen ändern, Alternativen prüfen und Handeln sind getrennt. Schrittweise Ausführung, Rücknahme, Durchlauf und Neubeginn funktionieren für alle Studien. Das Zielmodell verwendet offengelegte, redaktionell gesetzte Prioritäten; das feste Verfahren hält an seinem Ablauf fest. Keines ist ein Sprachmodell oder eine psychologische Messung.

Zwei dreh- und zoombare Modellbretter zeigen gerichtete Informationswege, Zuschreibungen, Absichten, Druck/Grenzen und gewährten Spielraum. Pro Brett gibt es Raumansicht, Draufsicht, eigene Blicke aller Beteiligten und Zoomtasten. Blickwechsel und Verarbeitungsschritte behalten den Zoom bei. Die Kanten sind als Modellannahmen gekennzeichnet und zusätzlich ausgeschrieben. Nur in der Transportstudie bezeichnet räumliche Nähe Kooperation; die Felder behaupten keine historischen Bühnenpositionen.

Der Blindvergleich zeigt zunächst nur Handlungen und Ergebnisse. Nach eigenem begründetem Urteil werden Verfahren, Bewertungen und Vorher-/Nachher-Zustände offengelegt. Dies ist kein Mensch-Maschine-Turing-Test. Ein Export vor Offenlegung enthält keine Verfahrenszuordnung. Die freie Modellkritik bleibt je Studie bis zum Neuladen im Speicher; Versuche vor Szenenwechsel/Neubeginn/erneutem Öffnen exportieren. Kein automatischer Austausch mit Mitspielenden oder KI-Diensten.

`src/decision-scenarios.js` enthält die zwölf neuen textverankerten Anordnungen. `src/ensemble-model.js` führt ihre Zustandsübergänge aus und integriert die bestehende Transportstudie aus `src/decision-model.js`. Originalbezug, Modellannahme und kontrafaktische Handlung werden getrennt angezeigt. Der vorbereitete externe Datenvertrag gibt nur den jeweiligen Figurenkontext und zugängliche Belege weiter. Insbesondere werden zurückgehaltene Zitate nicht über eine beobachtete Handlung an andere Figuren verteilt. LM Studio / RAG bleiben zurückgestellt.

Tests: `npm test`, `node tests/ensemble-browser.mjs`, `node tests/decision-browser.mjs`, `node tests/strategy-browser.mjs`; Browserprüfungen benötigen Vite oder `TEST_URL`. Geprüft werden unter anderem Quellen und Freischaltung, eigenständige Handlungen sämtlicher Figuren, wirksame Gegenproben in allen neuen Studien, fehlende fremde Zustimmung, begrenzter Informationszugang, Zoom, Originalbelege, Rücknahme, Blindvergleich und Export sowie Mobilansicht.


## Korrigierte Lesefassung und Zusammenfassungen (30.09.2026)

Alle **79 Leseabschnitte** sind einzeln durchgesehen und enthalten eine eigene kurze Zusammenfassung in modernem, schülergerechtem Deutsch. Sie erscheint direkt vor dem historischen Dialog, erst nach Öffnen des Abschnitts. Sie beschreibt dessen Handlung, unterscheidet Behauptungen von Tatsachen und nimmt die spätere Auflösung nicht vorweg. Die Zusammenfassungen ersetzen weder den vollständigen Text noch die offenen Interpretationsaufgaben.

`src/text-edition.json` ist die redaktionelle Lesefassung mit Zusammenfassungen, Unsicherheitshinweisen und positionsgenauem Änderungsprotokoll. Korrigiert sind unter anderem OCR-Buchstabenverwechslungen, zerstörte Worttrennungen, Sprecherbezeichnungen, Fremdzeichen, Druckreste und eine in den Dialog geratene Fortsetzung einer Schauspieleranmerkung. Historische Formen wie „seyn“, „bey“, „frey“, „Heurath“, „Baroninn“ und „Zweyter“ bleiben erhalten; Carl/Karl wird als mögliche historische Namensvariante nicht vereinheitlicht. Unklare Wörter und Eigennamen werden nicht aus Vermutung ersetzt. Die Fassung beruht auf dem bereitgestellten Transkript und ist keine mit einem Faksimile kollationierte kritische Ausgabe.

Besonders dokumentierte Entscheidungen: „Wechselschuldner“ wird nach dem vorangehenden Plan zu „Wechselgläubiger“; die beschädigte Anmerkung beim Gartenauftritt wird zusammengeführt; die bisher in III/11 integrierte Überschrift des zwölften Auftritts wird sichtbar abgesetzt und die Anzeige berichtigt. Die 79 Abschnittskennungen bleiben stabil, auch wo ein Abschnitt zwei Auftritte umfasst.

Die kanonischen Quellseiten `src/play-pages.json` und das Ausgangstranskript **bleiben unverändert**. Gespeicherte und im Multiplayer übermittelte Belegpositionen beziehen sich weiterhin auf diese Quellseiten. `src/text-edition.js` bildet Positionen in beide Richtungen auf die Lesefassung ab. Markierungen, eingefügte Zitate, Worterklärungen, angeheftete Textstellen, Quellenfenster und exportierte Zitate verwenden diese Zuordnung. Alte Belege benötigen keine Migration; eingefügte Passagen werden sowohl aus Lesefassung als auch Ausgangstranskript akzeptiert. Keine neue Backend-Version ist dafür erforderlich.

Unter **Zur Lesefassung** sieht man die Eingriffe des jeweiligen Abschnitts, verbleibende Unsicherheiten und bei Bedarf den unveränderten Ausgangstext. Die Themenpartie und die Entscheidungssimulation zeigen ebenfalls korrigierte Zitate. Downloads unter `public/sources/`: `beck-1798-lesefassung.txt`, `beck-1798-korrekturen.json`, `beck-1798-zusammenfassungen.md` sowie das unveränderte `beck-1798-transkript.txt`.

Nach redaktionellen Änderungen: `npm run build:edition` erzeugt reproduzierbar Positionszuordnung und Downloads aus der Lesefassung; `npm run build:play` bleibt ausschliesslich der unveränderten Quelle vorbehalten. Tests: `npm test`, `npm run test:edition`, `node tests/reading-help-browser.mjs`, `node tests/reading-stage-browser.mjs`, `node tests/play-browser.mjs`. Der vollständige Browserdurchlauf prüft Lesefassung und Zusammenfassung aller 79 Abschnitte, während die neuen Tests insbesondere alte gespeicherte Belege und neue Markierungen über korrigierte Wörter hinweg prüfen.
