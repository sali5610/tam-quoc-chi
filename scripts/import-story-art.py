import hashlib
import json
import pathlib
import sys
import time
import urllib.error
import urllib.request
from io import BytesIO
from urllib.parse import quote
from PIL import Image

root = pathlib.Path("public/story-art")
root.mkdir(parents=True, exist_ok=True)
rows = json.loads(pathlib.Path("src/story-art.json").read_text())
deadline = time.monotonic() + 75
errors = []

def valid(target):
    try:
        with Image.open(target) as im:
            im.verify()
        return True
    except Exception:
        return False

for row in rows:
    target = root / (row["file"] + ".webp")
    if valid(target):
        print("CACHED", row["file"], flush=True)
        continue
    if time.monotonic() + 15 > deadline:
        print("Batch budget reached; defer remaining files.", flush=True)
        break
    name = row["file"].replace(" ", "_")
    h = hashlib.md5(name.encode()).hexdigest()
    url = f"https://upload.wikimedia.org/wikipedia/commons/{h[0]}/{h[:2]}/{quote(name)}"
    tmp = target.with_suffix(".tmp")
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "TamQuocChiPersonalReader/1.0 (github.com/sali5610/tam-quoc-chi)"})
        with urllib.request.urlopen(req, timeout=12) as res:
            data = res.read(25 * 1024 * 1024 + 1)
        if len(data) > 25 * 1024 * 1024:
            raise ValueError("image too large")
        with Image.open(BytesIO(data)) as im:
            im.thumbnail((1200, 1200))
            im.convert("RGB").save(tmp, "WEBP", quality=85)
        if not valid(tmp):
            raise ValueError("invalid WebP")
        tmp.replace(target)
        print("OK", name, flush=True)
    except urllib.error.HTTPError as err:
        errors.append(f"{name}: HTTP {err.code}")
        if err.code in (403, 429, 503):
            print(f"Source unavailable or limiting requests ({err.code}); stop entire batch. Retry-After: {err.headers.get('Retry-After', 'not supplied')}", flush=True)
            break
    except Exception as err:
        errors.append(f"{name}: {err}")
    finally:
        tmp.unlink(missing_ok=True)
    time.sleep(3)

missing = [r["file"] for r in rows if not valid(root / (r["file"] + ".webp"))]
print(f"Available {len(rows)-len(missing)}/{len(rows)}", flush=True)
for error in errors:
    print(error, file=sys.stderr, flush=True)
for name in missing:
    print("PENDING", name, flush=True)
sys.exit(1 if missing else 0)
