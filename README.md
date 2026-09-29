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

Eine markierte Figur wird ans Lesepult D4 geholt und eröffnet die nächste Textstrecke. Sprecher und Regieanweisungen sind im Text hervorgehoben. Nach jedem Aufzug setzt ihr eine Figur auf ein freies Feld und begründet diesen Regiezug mit einer eigenen Beobachtung am Text. Keine Multiple-Choice-Fragen. Die Brettpositionen sind eine heutige Interpretation, keine zusätzlichen Anweisungen des Dramas.

Allein speichert die Anwendung den Lesestand dauerhaft auf diesem Gerät; über **Leseprotokoll / Speichern** lässt sich der Stand als JSON exportieren und auf einem anderen Gerät laden. Im Multiplayer für 2–5 Personen werden die Rollen verteilt. Alle lesen denselben Text und bestätigen das Weiterlesen; erst dann kann die Raumleitung fortfahren. Lektüreräume bestehen sieben Tage. Gespeicherte Raumzugänge können über **Multiplayer** auf demselben Gerät wieder geöffnet und dort auch entfernt werden. Die Lesebestätigung dokumentiert den bestätigten Fortschritt, nicht überprüftes Verständnis.

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

In der Themenpartie öffnet **Stück lesen** eine Figurenübersicht sowie elf zusammenhängende Auftritte aus dem bereitgestellten Transkript. **Auftritt im Zusammenhang lesen** springt von der aktuellen Spielszene zum passenden Text. Der vollständige Text ist ebenfalls verlinkt. Historische Schreibweisen und Übertragungsfehler werden nicht stillschweigend korrigiert. `src/reading-scenes.json` enthält unveränderte Passagen; der Quellen-Test prüft sie gegen das vollständige Transkript. Das Lesefenster ist auch im Archiv und für beobachtende Multiplayer-Mitglieder zugänglich.
