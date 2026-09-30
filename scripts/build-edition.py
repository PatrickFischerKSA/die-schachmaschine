"""Build a reversible reading layer; source pages and their evidence offsets stay immutable."""
import json, difflib
from pathlib import Path
root=Path(__file__).resolve().parent.parent
pages=json.loads((root/'src/play-pages.json').read_text())
path=root/'src/text-edition.json'
edition=json.loads(path.read_text())
assert set(edition)=={p['id'] for p in pages}, 'Every reading section needs its own review and summary'
log=[]
def units(s): return len(s.encode('utf-16-le'))//2
for p in pages:
    item=edition[p['id']]
    assert item['summary'].strip() and len(item['summary'].split())<=80,p['id']
    edits=[]
    for tag,a,b,c,d in difflib.SequenceMatcher(None,p['text'],item['text'],autojunk=False).get_opcodes():
        if tag=='equal':continue
        edit={'start':units(p['text'][:a]),'end':units(p['text'][:b]),'readingStart':units(item['text'][:c]),'readingEnd':units(item['text'][:d]),'before':p['text'][a:b],'after':item['text'][c:d]}
        edits.append(edit)
        log.append({'page':p['id'],**edit,'contextBefore':p['text'][max(0,a-35):min(len(p['text']),b+35)],'contextAfter':item['text'][max(0,c-35):min(len(item['text']),d+35)]})
    item['edits']=edits
    if p['id']=='text-3-11-1':item['location']='III. Aufzug · 11.–12. Auftritt'
    elif p['id'] in ['text-3-11-2','text-3-11-3']:item['location']='III. Aufzug · 12. Auftritt'
path.write_text(json.dumps(edition,ensure_ascii=False,indent=2)+'\n')
(root/'public/sources/beck-1798-lesefassung.txt').write_text(''.join(edition[p['id']]['text'] for p in pages))
(root/'public/sources/beck-1798-korrekturen.json').write_text(json.dumps({'edition':'Behutsam korrigierte Lesefassung, 2026-09-30','basis':'Bereitgestelltes Transkript (Titelangabe Berlin 1798), OCR-gestützter Gesamtvergleich mit Wien 1826 und gezielte Seitenbildprüfung; Druck von 1798 ungeprüft. Siehe beck-1826-abgleich.json.','sourceUnchanged':True,'notes':{id:x['notes'] for id,x in edition.items() if x['notes']},'changes':log},ensure_ascii=False,indent=2)+'\n')
(root/'public/sources/beck-1798-zusammenfassungen.md').write_text('# Die Schachmaschine – Abschnitt für Abschnitt\n\nHeutige Lesehilfen zur korrigierten Lesefassung. Kein Ersatz für den dramatischen Text.\n\n'+'\n\n'.join('## '+x.get('location',f"{p['act']}. Aufzug · {p['scene']}. Auftritt" if p['act'] else 'Titel und Personen')+f" · Abschnitt {p['part']}/{p['parts']}\n\n"+x['summary'] for p in pages for x in [edition[p['id']]]))
print(f'{len(pages)} geprüfte Abschnitte, {len(log)} dokumentierte Texteingriffe; Ausgangstranskript unverändert.')
collation=json.loads((root/'src/print-collation.json').read_text())
(root/'public/sources/beck-1826-abgleich.json').write_text(json.dumps(collation,ensure_ascii=False,indent=2)+'\n')
report=['# Druckvergleich: Die Schachmaschine',collation['sourceTitle'],collation['attribution'],collation['sourceUrl'],collation['editionPolicy'],collation['scope'],collation['method'],'Visuell geprüfte Digitalisatseiten: '+', '.join(map(str,collation['visuallyCheckedScans'])),'## Abschnittsweise Fundstellen']
for p in pages:
    span=collation['sections'][p['id']]
    report.append('### '+p['id']+' · Druckseiten '+str(span['scanFrom']-2)+'–'+str(span['scanTo']-2))
    report.append('[Vergleichsseite öffnen](https://www.digitale-sammlungen.de/de/view/bsb10118903?page='+str(span['scanFrom'])+')')
    findings=[f for f in collation['findings'] if f['section']==p['id']]
    if not findings:report.append('Keine gesonderte Lesart dokumentiert; keine Behauptung einer vollständigen visuellen Zeichenprüfung.')
    for f in findings:
        report.extend(['**'+f['kind']+' · S. '+str(f['printedPage'])+'**',f['note'],'Bisherige Lesefassung / Transkript: '+f['before'] if f['before'] else '', 'Drucklesung: '+f['printReading'],'[Seitenbild](https://www.digitale-sammlungen.de/de/view/bsb10118903?page='+str(f['scan'])+')'])
(root/'public/sources/beck-1826-abgleich.md').write_text('\n\n'.join(report)+'\n')
