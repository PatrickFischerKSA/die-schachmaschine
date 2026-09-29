# Figuren beim Entscheiden beobachten – Umsetzung und weitere Ausbaustufe

Umgesetzt ist inzwischen ein lokaler Versuch zu IV/2 mit drei Figuren, schrittweisen Zustandsänderungen, Gegenproben, zwei Modellbrettern, einem Blindvergleich zwischen festen Regeln und Zielbewertungen sowie Protokollexport. Die nachstehenden Sprachmodell- und weiteren Szenenideen bleiben nächste Ausbaustufen.

Die aktuelle Erweiterung bindet weder LM Studio noch ein anderes Sprachmodell an. Das Denklabor sammelt überprüfbare Interpretationen als Grundlage. Figurenmodelle wären bewusst konstruierte Lesarten, keine Entdeckung des wirklichen Innenlebens der Figuren.

## 1. Zuerst eine sichtbare Entscheidungssimulation

Jede Figur erhält einen getrennten Zustand: wahrgenommene Ereignisse, belegtes Wissen, unsichere Annahmen, vermutetes Wissen anderer, Ziele, Abhängigkeiten und zulässige Handlungen. „Weiss nicht“ und „für Wissen fehlt ein Beleg“ bleiben getrennt. Die Ereignisse haben Originalstellen als Herkunft. Die Publikumsansicht darf mehr zeigen als der einzelne Agent erhält.

Ein Schritt besteht aus tatsächlich ausgeführten Operationen: Ereignis empfangen → Informationszugang prüfen → Wissensstand ändern → Handlungsalternativen erzeugen → Alternativen anhand ausdrücklich gesetzter Regeln bewerten → Handlung auswählen → Reaktionen anderer verarbeiten. Die Oberfläche zeigt diesen Ablauf als anhaltbare Zeitleiste neben Brett und Originaltext. Jeder Eintrag protokolliert einen echten Zustandswechsel, keinen nachträglich erfundenen Gedankenstrom.

Ein gutes erstes Experiment sind die Träger in IV/2: Sie zweifeln an Carls Identität. Drohung, Gegendrohung und Zahlung verändern die Verhandlung. Eine Geldzahlung darf im Modell ihre Bereitschaft zum Transport verändern, ohne automatisch ihre Überzeugung über Carls Identität umzuschreiben. Am Ende wird geprüft, ob das Modell die Textstellen überhaupt plausibel abbildet.

## 2. Sprachmodell als Vorschlagsgeber

Später erhält ein lokales Modell nur den zulässigen Figurenkontext und eine eng umrissene Aufgabe: mehrere mögliche Handlungen oder Äusserungen vorschlagen, Textbelege nennen und Unsicherheiten kennzeichnen. Eine getrennte Regelschicht kontrolliert Informationszugang, Beleg-IDs und zulässige Aktionen. Ungültige Vorschläge werden sichtbar zurückgewiesen. Der Übergang in einen neuen Zustand wird durch die Anwendung protokolliert.

Ein Datenvertrag könnte enthalten: `role`, `scene`, `perceivedEvents`, `beliefs` mit Status/Herkunft, `goals`, `hypothesesAboutOthers`, `candidateActions`, `selectedAction`, `evidenceIds` und `uncertainties`. Kurze erklärte Gründe sind Aussagen des Modells, nicht automatisch kausale Beweise für sein internes Rechnen. Verborgene Gedankenketten sind weder notwendig noch ein zuverlässiges Lehrziel.

## 3. Gegenproben statt bloss guter Endergebnisse

Die Lernenden verändern genau eine Bedingung und sehen zwei Abläufe nebeneinander: Sophie hört eine Äusserung nicht; ein Träger lehnt Geld ab; eine Figur erkennt eine Verkleidung; ein Befehl wird nicht als Zustimmung behandelt. Diese Abzweigungen sind ausdrücklich kontrafaktische Experimente, keine Umschreibung des Originaltexts. Eine Revision hält fest, welcher Teil der Lesart durch das Experiment fraglich wird.

Die veränderten Voraussetzungen müssen in den Regeln und Ereignissen landen, nicht nur in einer neuen Frage an dasselbe allwissende Modell. So wird sichtbar, welcher Mechanismus einen Unterschied erzeugt. Freie Äusserungen können variieren; Bedingungen und Zufallswerte werden für den Vergleich dokumentiert.

## 4. Drei Modelle derselben Figur vergleichen

- Ein festes Regelsystem mit vollständig sichtbaren Entscheidungsregeln.
- Ein Modell mit expliziten Zielen und Annahmen über andere Figuren.
- Ein Sprachmodell, das aus begrenzten Textstellen Handlungen vorschlägt.

Zunächst sehen Lernende nur die Antworten, formulieren Rückfragen und ein begründetes Urteil. Danach wird die jeweilige Implementierung offengelegt. Das verbindet die Frage nach verborgenem Urheber beim Schachautomaten, dem Antwortverhalten im Turing-Test und dem Verhältnis von Regelanwendung und Verstehen im chinesischen Zimmer. Ähnliche Antworten beweisen nicht identische Prozesse oder Verstehen.

Empfohlener Start: eine Szene, drei beteiligte Perspektiven und wenige explizite Regeln. Qualität bedeutet: keine Information aus ungelesenen Szenen, nachvollziehbare Zustandswechsel, belegte Interpretationsannahmen, echte Gegenbeispiele und sichtbare Grenzen. Erst danach lohnt sich die Anbindung eines Sprachmodells.
