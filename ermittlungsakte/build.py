"""Build the self-contained investigation from maintained sources, including its teaching guide."""
from pathlib import Path
import argparse, html, json, re
root = Path(__file__).resolve().parent

def inline(text):
    text=html.escape(text)
    text=re.sub(r'\*\*(.+?)\*\*',r'<strong>\1</strong>',text)
    return re.sub(r'`([^`]+)`',r'<code>\1</code>',text)

def guide_html(source):
    # The supplied guide uses paragraphs, headings, bullet lists and tables only.
    blocks=[]
    for block in re.split(r'\n\s*\n',source.strip()):
        lines=block.splitlines()
        if lines[0].startswith('|'):
            rows=[]
            for i,line in enumerate(lines):
                if re.fullmatch(r'[| :\-]+',line):continue
                tag='th' if i==0 else 'td'
                rows.append('<tr>'+''.join(f'<{tag}>{inline(cell.strip())}</{tag}>' for cell in line.strip('|').split('|'))+'</tr>')
            blocks.append('<div class="guide-table" tabindex="0" role="region" aria-label="Tabelle im Unterrichtsleitfaden"><table>'+''.join(rows)+'</table></div>')
        elif lines[0].startswith('#'):
            m=re.fullmatch(r'(#{1,6})\s+(.+)',lines[0]);assert m,lines[0]
            level=min(6,len(m[1])+1)
            blocks.append(f'<h{level}>'+inline(m[2])+f'</h{level}>')
        elif all(line.startswith('- ') for line in lines):
            blocks.append('<ul>'+''.join('<li>'+inline(line[2:])+'</li>' for line in lines)+'</ul>')
        else:blocks.append('<p>'+inline(' '.join(lines))+'</p>')
    return '\n'.join(blocks)

def render():
    result=(root/'shell.html').read_text(encoding='utf-8')
    for marker, filename in [('STYLE','style.css'),('DATA','content.js'),('ORIGINALS','originals.js'),('APP','app.js')]:
        token='/*'+marker+'*/';assert result.count(token)==1,token
        result=result.replace(token,(root/filename).read_text(encoding='utf-8'))
    guide=guide_html((root/'docs/EINBAU_UND_DIDAKTIK.md').read_text(encoding='utf-8'))
    result=result.replace('/*GUIDE*/','const TEACHING_GUIDE = '+json.dumps(guide,ensure_ascii=False).replace('</','<\\/')+';')
    return result

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--check',action='store_true');args=parser.parse_args()
    target=root.parent/'public/ermittlungsakte/index.html';result=render()
    if args.check:
        if not target.exists() or target.read_text(encoding='utf-8')!=result:raise SystemExit('Ermittlungsakte veraltet: npm run build:inquiry ausführen.')
        print('Ermittlungsakte entspricht den bearbeitbaren Quellen.')
    else:
        target.parent.mkdir(parents=True,exist_ok=True);target.write_text(result,encoding='utf-8');print(target)
