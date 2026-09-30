# Die Schachmaschine – Ermittlungsakte

Spielbare Informations- und Reflexionsressource für die bestehende Vite-/Three.js-Installation unter https://patrickfischerksa.github.io/die-schachmaschine/.

## Sofort öffnen

`public/ermittlungsakte/index.html` im Browser öffnen. Die Datei enthält sämtliche Oberflächen, Inhalte und Spiellogik. Keine Installation und keine zusätzlichen Bibliotheken nötig. Offline funktionieren die Missionen und Kurztexte; für die externen englischen Originalressourcen ist Internet erforderlich. Lokale Browserspeicherung kann bei `file:`-Adressen eingeschränkt sein; dafür gibt es JSON-Export und -Import.

## Enthalten

- Zwölf frei erreichbare Missionen auf einem Schachfeld; keine Schachkenntnisse erforderlich.
- 36 sammelbare Beweiskarten, deutsche Wissensmodule, zwölf vertiefende Gegenzüge.
- Interaktive Experimente zu Sichtfenstern, Wirkungskette, Fehlern, Informationswegen, Herkunftsetiketten, Zeichenregeln und Arbeitsprozessen.
- Englische Originalressourcen von Poe und Searle mit differenzierten Lektüreaufträgen. Poe: zwei Originalausschnitte; Searle: kurze Originalthese, gezielte Lektüre im verlinkten englischen Volltext und Hinweise auf System- und Robotereinwand.
- Beck-Belege mit Aufzug und Auftritt, Kennzeichnung von Paraphrasen, Interpretation und OCR-Korrekturen.
- Zehn Quellenzugänge, sechzehn Begriffserklärungen, Ermittlungsjournal, gespeicherte Fassungen, JSON- und Text-Export.
- Tastaturbedienung, mobile Ansicht, keine extern geladenen Schriften, kein Tracking, keine Modellaufrufe.

Die Abzeichen dokumentieren bearbeitete Fallakten. Die Software prüft nur formale Bedingungen: Experiment ausgeführt, zwei Karten gesichert, die Argumentationsfelder ausgefüllt. Sie bewertet weder philosophische Wahrheit noch literarische Qualität. Keine Multiple-Choice-Abfrage und keine inhaltliche Benotung.

## Einbau in das bestehende Projekt

1. Den Ordner `public/ermittlungsakte` in den bestehenden `public`-Ordner kopieren.
2. `src/inquiry-launcher.js` zusätzlich nach `src/` kopieren.
3. Oben in `src/main.js` ergänzen:

```js
import { mountInquiry } from './inquiry-launcher.js';
```

4. Nach dem Aufbau der Oberfläche, wenn `#sources-button` existiert, ergänzen:

```js
mountInquiry({
  host: document.querySelector('#sources-button').parentElement,
  baseUrl: import.meta.env.BASE_URL,
});
```

Dadurch erscheint «Ermittlungsakte ↗» bei «Über die Installation». Das Modul öffnet sich in einem Dialog über der bestehenden Bühne. Es überschreibt weder Leseprotokolle noch Spielzustände der Hauptanwendung. Die Bühne wird beim Schliessen wieder sichtbar. Bestehende Netzwerk-/Multiplayer-Vorgänge werden durch diesen Adapter nicht pausiert; in gemeinsamen Räumen nur an vereinbarten Lesepausen öffnen.

Die bestehende Struktur und `#sources-button` wurden im aktuellen öffentlichen Quelltext geprüft. Das Paket verändert die Live-Seite und das GitHub-Repository nicht. Der Adapter ist eine additive Einbauoption; vor Veröffentlichung im vollständigen Projekt bauen und testen.

### Kontextbezogene Zugänge

Ein Szenenknopf oder ein 3D-Hotspot kann eine bestimmte Mission anfordern:

```js
document.dispatchEvent(new CustomEvent('schachmaschine:inquiry', {
  detail: { station: 'poe' },
}));
```

Alternativ die HTML-Ressource direkt mit `?station=poe` verlinken. Die Tabellenzuordnung in `docs/EINBAU_UND_DIDAKTIK.md` enthält sämtliche gültigen IDs. Die Koordinaten sind die des neuen Missionsbretts, keine Koordinatenvorgaben für bestehende Beck-Figuren.

### Build und Prüfung

Die fertige HTML-Datei benötigt keinen Build. Nach Änderungen an den bearbeitbaren Dateien:

```sh
python3 build.py
```

Im ursprünglichen Projekt anschliessend `npm run build` und dessen vorhandene Tests ausführen. Veröffentlichung erfolgt mit dem dort vorhandenen GitHub-Pages-Verfahren. Es wurde kein Ersatzprojekt bei einem anderen Host angelegt.

## Daten und Grenzen

Speicherschlüssel: `schachmaschine-ermittlungsakte-v1`. Nur lokale Speicherung. Der Import ersetzt nach Rückfrage nur diesen Modulstand. Freitext wird als Text dargestellt; der Import prüft Version und Datenform und begrenzt Dateigrösse und Textlängen. JSON-Dateien enthalten persönliche Reflexionen und können gezielt geteilt werden; es gibt keinen automatischen Upload.

Gemeinsames Arbeiten: Rollenwechsel an einem Gerät. Eine Anbindung an den vorhandenen Online-Multiplayer ist nicht implementiert. Das neue Modul enthält keine zusätzliche 3D-Engine: Es kann über dem bestehenden Raum aufgerufen und mit dessen Szenen verknüpft werden. Die vollständige Synchronisierung beider Anwendungen ist keine behauptete Funktion dieses Pakets.

Searles lange Texte werden nicht als Kopie eingebettet. Verlinkt sind der englische Zeitschriftenscan und eine ausdrücklich als Vorfassung gekennzeichnete HTML-Ressource. Externe Quellen können ihre Adresse oder Verfügbarkeit ändern.

Stand: 30. September 2026.
