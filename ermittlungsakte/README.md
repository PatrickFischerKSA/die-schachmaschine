# Ermittlungsakte · bearbeitbare Quellen

Aus `Schachmaschine_Einbaupaket.zip` übernommen und mit der bestehenden Integration zusammengeführt. Die bisherigen Korrekturen, Beck-Verknüpfungen und der Speicherschlüssel bleiben erhalten.

- `content.js`: zwölf Fälle, 36 Beweiskarten, Quellen und Begriffe.
- `originals.js`: englische Lektüreaufträge.
- `app.js`: Experimente, Aktenführung und Verbindung mit der Hauptinstallation.
- `shell.html` / `style.css`: Oberfläche.
- `docs/EINBAU_UND_DIDAKTIK.md`: Unterrichtsleitfaden, in der Akte als Pop-up zugänglich.
- `docs/PAKET_README.md` / `docs/PRUEFUNG.txt`: ursprüngliche Begleitdokumente; historische Angaben des gelieferten Pakets, keine aktuellen Integrationsanweisungen oder eigenen Testergebnisse.

Vom Projektverzeichnis: `npm run build:inquiry`. Alternativ `python3 ermittlungsakte/build.py`. Die Ausgabe ist `public/ermittlungsakte/index.html`; diese Datei nicht direkt bearbeiten. `npm run build` und `npm run dev` erzeugen sie automatisch. `python3 ermittlungsakte/build.py --check` prüft, ob die veröffentlichbare Datei den Quellen entspricht.

Der vorhandene Dialog wird weiterverwendet. Für zusätzliche Zugänge funktioniert das Paket-Ereignis `schachmaschine:inquiry` mit `detail: {station: 'poe'}`. `mountInquiry` aus `src/inquiry-launcher.js` liefert denselben Adapter wie `createInvestigation`; mehrmaliges Aufrufen erzeugt weder einen zweiten Button noch einen zweiten Dialog. Die Position des vorhandenen Einstiegs bleibt in der Modusleiste. Die Paketoptionen für einen weiteren Host und ein separates Deployment werden nicht benötigt.

Persönliche Akten bleiben unter `schachmaschine-ermittlungsakte-v1` erhalten. Der JSON-Import/-Export bleibt kompatibel. Die Akte ist nicht an den Online-Multiplayer angebunden.

Prüfung der Integration: `npm test`, `npm run test:inquiry`, `npm run build`.
