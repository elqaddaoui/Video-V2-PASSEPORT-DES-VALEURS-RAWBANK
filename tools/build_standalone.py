#!/usr/bin/env python3
"""Inline css/js/fonts/images/audio into ONE html file:  python3 tools/build_standalone.py
Output: dist/RAWBANK_Passeport_Film_standalone.html   (re-run after adding scenes)"""
import re, base64, mimetypes, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
def b64(p):
    p = root / p; mt = mimetypes.guess_type(p.name)[0] or ("font/ttf" if p.suffix == ".ttf" else "application/octet-stream")
    return f"data:{mt};base64," + base64.b64encode(p.read_bytes()).decode()
html = (root / "index.html").read_text()
def css(m):
    t = (root / m.group(1)).read_text()
    t = re.sub(r"url\(\.\./(assets/[^)]+)\)", lambda x: f"url({b64(x.group(1))})", t)
    return f"<style>\n{t}\n</style>"
html = re.sub(r'<link rel="stylesheet" href="([^"]+)">', css, html)
html = re.sub(r'<script src="([^"]+)"></script>', lambda m: "<script>\n" + (root / m.group(1)).read_text().replace("</script", "<\\/script") + "\n</script>", html)
html = re.sub(r'(<img[^>]*?\ssrc=")(assets/[^"]+)(")', lambda m: m.group(1) + (b64(m.group(2)) if (root / m.group(2)).exists() else m.group(2)) + m.group(3), html)
html = re.sub(r'(<audio[^>]*?\ssrc=")(assets/[^"]+)(")', lambda m: m.group(1) + b64(m.group(2)) + m.group(3), html)
out = root / "dist" / "RAWBANK_Passeport_Film_standalone.html"; out.write_text(html)
print(out, round(out.stat().st_size / 1e6, 2), "MB")
