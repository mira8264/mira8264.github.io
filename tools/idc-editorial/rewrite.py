#!/usr/bin/env python3
"""Apply reviewed, page-specific copy; preserve original HTML outside selected text nodes.
Run from any directory. --check verifies the checked-in result without writing.
"""
import argparse, collections, hashlib, html, json, re
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]
DATA = Path(__file__).with_name('content.tsv')
REPORT = Path(__file__).with_name('audit.json')
FAQ = {r.split('|')[0]:r.split('|')[1:] for r in Path(__file__).with_name('faq.tsv').read_text().splitlines()}
P = re.compile(r'<p\b[^>]*>(.*?)</p>', re.S)
def plain(x):
    return html.unescape(re.sub('<[^>]+>', '', x)).strip()
def sentences(x):
    return [s for s in re.findall(r'.+?(?:[。！？]|$)', x) if s]
def load():
    rows = {}
    for line in DATA.read_text().splitlines():
        key, *copy = line.split('|')
        assert len(copy) == 3 and key not in rows, key
        assert all(len(sentences(x)) >= 2 for x in copy), key
        rows[key] = copy
    assert len(rows) == 100
    assert set(FAQ) == set(rows) and all(len(v)==2 for v in FAQ.values())
    assert set(rows) == {p.parent.name for p in ROOT.glob('idc-*/index.html')}
    return rows

def rewrite(raw, key, copy):
    focus, example, procurement = copy
    f, e, a = map(sentences, copy)
    start, end = raw.index('<main '), raw.index('</main>')
    main = raw[start:end]
    # 0 hero; 1 guide; 2 business example; 3 acceptance; 4 inquiry;
    # 5 calculator help; 6-8 FAQs; remaining paragraphs are existing links.
    matches = list(P.finditer(main))
    assert len(matches) == 15, (key, len(matches))
    replacements = {
        0: f[0],
        1: ''.join(f[1:]),
        2: e[0],
        3: ''.join(e[1:]),
        4: a[0],
        6: ''.join(a[1:]),
        7: FAQ[key][0],
        8: FAQ[key][1] + '当前价格请向IDC3询价；预算工具预填数字仅为演示。',
    }
    for i in sorted(replacements, reverse=True):
        m = matches[i]
        outer = m.group(0)
        new = outer[:outer.index('>')+1] + html.escape(replacements[i], quote=False) + '</p>'
        main = main[:m.start()] + new + main[m.end():]
    return raw[:start] + main + raw[end:]

def protected(raw):
    # Text-free HTML must be byte-identical: tags, attributes, scripts and all links remain.
    return {
        'head': raw[:raw.index('<body>')],
        'footer_ad': raw[raw.index('<footer>'):],
        'tags': re.findall(r'<[^>]+>', raw),
        'scripts': re.findall(r'<script\b.*?</script>', raw, re.S),
        'forms': re.findall(r'<form\b.*?</form>', raw, re.S),
        'links': re.findall(r'href="([^"]+)"', raw),
    }
def paragraphs(raw):
    main = raw[raw.index('<main '):raw.index('</main>')]
    return [plain(m[1]) for i,m in enumerate(P.finditer(main)) if i in (0,1,2,3,4,6,7,8)]
def stats(pages):
    by_text = collections.defaultdict(set)
    for key,raw in pages.items():
        for p in paragraphs(raw): by_text[p].add(key)
    shared = {p:sorted(keys) for p,keys in by_text.items() if len(keys)>1}
    pairs = collections.Counter()
    for keys in shared.values():
        for i,k in enumerate(keys):
            for other in keys[i+1:]: pairs[k+' / '+other] += 1
    return {'core_paragraph_slots': len(pages)*8,
            'distinct_core_paragraphs': len(by_text),
            'texts_shared_across_pages': len(shared),
            'shared_texts': shared,
            'most_repeated_pairs': dict(pairs.most_common(10))}
def main():
    parser=argparse.ArgumentParser(); parser.add_argument('--check', action='store_true'); args=parser.parse_args()
    rows=load()
    before={k:(ROOT/k/'index.html').read_text() for k in rows}
    after={k:rewrite(v,k,rows[k]) for k,v in before.items()}
    for k in rows:
        assert protected(before[k]) == protected(after[k]), 'Protected markup changed: '+k
        assert rewrite(after[k],k,rows[k]) == after[k], 'Not idempotent: '+k
    assert stats(after)['texts_shared_across_pages'] == 0
    titles=[re.search(r'<title>(.*?)</title>',v)[1] for v in after.values()]
    desc=[re.search(r'<meta name="description" content="([^"]+)"',v)[1] for v in after.values()]
    assert len(set(titles)) == len(set(desc)) == 100
    for k,v in after.items():
        assert f'<link rel="canonical" href="https://mira8264.github.io/{k}/">' in v
        assert 'cloud.umami.is/script.js' in v and 'IDC3' in v
        assert '�' not in v
    if args.check:
        assert before == after, 'Run rewrite.py to apply updated content'
        print('PASS: 100 pages; unique metadata; protected markup; idempotence; no exact shared core paragraphs')
        return
    report={'scope':100,'content_manifest_sha256':hashlib.sha256(DATA.read_bytes()).hexdigest(),
            'before':stats(before),'after':stats(after),
            'checks':['head byte-identical','all HTML tags and attributes identical','footer and ad byte-identical',
                      'all href values identical','scripts and form byte-identical','idempotent rewrite',
                      '100 unique titles and descriptions','self-canonical paths unchanged'],
            'pages': {k:{'before_sha256':hashlib.sha256(before[k].encode()).hexdigest(),
                         'after_sha256':hashlib.sha256(after[k].encode()).hexdigest()} for k in rows}}
    for k,v in after.items(): (ROOT/k/'index.html').write_text(v)
    REPORT.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps({x:report[x] for x in ('scope','checks')},ensure_ascii=False))
    print('before:',{k:v for k,v in report['before'].items() if k!='shared_texts'})
    print('after:',report['after'])
if __name__=='__main__': main()
