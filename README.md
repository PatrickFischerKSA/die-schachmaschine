# Die Schachmaschine

**Mensch – Maschine – Täuschung – Intelligenz.** Eine interaktive 3D-Web-Installation als durchgehende Schachpartie. Eigenständiges Vite-/Three.js-Projekt, für GitHub und GitHub Pages vorbereitet.

## Start

Node.js 22.12 oder neuer:

```sh
npm ci
npm run dev
```

Die Konsole nennt die lokale Adresse. Mit `npm run build` entsteht `dist/`; `npm run preview` zeigt den Produktionsbuild. `npm test` prüft Schachlogik, Regelzuordnungen und Brettkoordinaten.

## Die Partien

- **1770 · Kempelen:** Zwei legale eigene Züge; ein einfacher Algorithmus antwortet. Danach stoppt die Partie. Vermutung formulieren, Brett öffnen, schematischen verborgenen Spieler entdecken. Die Software inszeniert die historische Täuschung und behauptet nicht, ein Mensch spiele live.
- **1798 · Beck:** Rink wechselt zwischen beiden Seiten. Balken wird zur Maschinenfigur. Carl verschiebt ihn; Balkens vier Routinen wiederholen sich. Alle sieben Figuren sind auswählbar und auf freie Felder beweglich. Figurenbeziehungen werden als interpretative Antriebe sichtbar.
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

Der Schlüssel bleibt ausschliesslich serverseitig. `.env` ist von Git ausgeschlossen. Der Server bindet nur an Loopback, begrenzt Eingaben, gleichzeitige Anfragen und Antwortdauer. Für einen öffentlichen Modellbetrieb sind zusätzlich Authentifizierung, nutzerbezogene Kontingente und ein abgesicherter Reverse Proxy erforderlich. GitHub Pages führt keinen Node-Server aus und bleibt daher im Demo-Modus. Ein echter Anbieter konnte ohne Zugangsdaten nicht getestet werden; der API-Pfad wird gegen einen lokalen Mock geprüft.

## GitHub Pages

Unter **Settings → Pages → Source: GitHub Actions** aktivieren. Anschliessend den Workflow **Deploy GitHub Pages** manuell starten. Private Repositories benötigen einen passenden GitHub-Tarif für Pages; alternativ Sichtbarkeit selbst ändern. Die relativen Asset-Pfade unterstützen Repository-Unterverzeichnisse. Der CI-Workflow testet und baut jeden Push/PR; Veröffentlichung ist bewusst separat auslösbar.

## Quellenstatus

Siehe [docs/QUELLEN.md](docs/QUELLEN.md). Der vollständige Beck-Primärtext lag bei der Erstellung nicht vor. Zitate und Figurenkonstellationen stammen aus der bereitgestellten Projektskizze und sind in der Anwendung entsprechend gekennzeichnet. Eine textkritisch geprüfte Beck-Fassung bleibt offen. Die Vorlage bricht in Abschnitt 23 ab; es wurden keine angeblichen Fortsetzungen erfunden.

Die 3D-Objekte sind schematische Inszenierungen, keine historischen Rekonstruktionen. Der historische Ausdruck „Schachtürke“ bezeichnet Kempelens orientalisierend gestalteten Automaten. Er wird hier als historischer Objektname verwendet.

## Projektstruktur

- `src/scene.js`: Three.js-Brett, Figuren, Mechanik, Zeitschichten, Kamera und Picking
- `src/main.js`: Szenenführung, Interaktionen, Reflexion und zugängliches HTML-Brett
- `src/content.js`: Inhalte, Figuren, Zeichenregeln
- `src/logic.js`: Schachregeln und Zuordnungen
- `server.mjs`: optionaler lokaler Modellproxy und statischer Server
- `tests/`: Logik- und Browserprüfungen
- `.github/workflows/`: CI und manuelles Pages-Deployment

Schachregeln: chess.js. 3D: Three.js. Schriften: DM Sans und Playfair Display über Google Fonts, mit lokalen System-Fallbacks. Keine Bilddateien oder fremden 3D-Modelle erforderlich. Kein Tracking und keine lokale Langzeitspeicherung.

Weitere Prüfungen: `npm run test:server` prüft den optionalen Modellproxy gegen einen lokalen Mock. `npm run test:browser` setzt einen laufenden Vorschau-Server und installiertes Playwright-Chromium voraus (`npx playwright install chromium`); über `TEST_URL` lässt sich die Zieladresse ändern. Die Browserprüfung durchläuft alle vier Partien, Zeitschichten, Vergleich, Dialog, Reset und eine mobile Ansicht.
