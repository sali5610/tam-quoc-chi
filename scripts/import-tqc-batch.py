"""Import a small, explicitly selected batch of primary-edition scan assets.
Queue items must come from inspected source pages, not guessed URLs.
Existing assets are immutable here. Stop on throttling; never retry automatically.
"""
import json
import pathlib
import re
import sys
import time
import urllib.error
import urllib.request
from io import BytesIO
from urllib.parse import urlsplit
from PIL import Image

ROOT = pathlib.Path("src/story-art-assets")
QUEUE = pathlib.Path("content/art/tqc-import-queue.json")
MAX_PAGES = 6
MAX_BYTES = 20 * 1024 * 1024
ROOT.mkdir(exist_ok=True)
rows = json.loads(QUEUE.read_text())
if not isinstance(rows, list) or len(rows) > MAX_PAGES:
    raise ValueError("Queue must contain at most six reviewed source pages")

def valid(path):
    try:
        with Image.open(path) as im:
            assert im.format == "WEBP"
            im.verify()
        return True
    except Exception:
        return False

seen = set()
for row in rows:
    source = urlsplit(row["image_url"])
    if source.scheme != "https" or source.netloc != "images.sourcelibrary.org":
        raise ValueError("Only exact reviewed Source Library image URLs are accepted")
    citation = urlsplit(row["source_page"])
    if citation.scheme != "https" or citation.netloc != "sourcelibrary.org":
        raise ValueError("Missing primary page provenance")
    if not row.get("reviewed") or not row.get("assets"):
        raise ValueError("Inspect the source and record its crop(s) first")
    for a in row["assets"]:
        name = a["file"]
        if not re.fullmatch(r"sl-[0-9]{4}-[a-z0-9-]+", name) or name in seen:
            raise ValueError(f"Invalid/duplicate asset id: {name}")
        seen.add(name)
        box = a.get("crop", [0, 0, 1, 1])
        if len(box) != 4 or not (0 <= box[0] < box[2] <= 1 and 0 <= box[1] < box[3] <= 1):
            raise ValueError(f"Invalid crop: {name}")

errors = []
for row in rows:
    pending = [a for a in row["assets"] if not valid(ROOT / (a["file"] + ".webp"))]
    if not pending:
        continue
    try:
        request = urllib.request.Request(row["image_url"], headers={"User-Agent":"TamQuocChiPersonalReader/1.0 (github.com/sali5610/tam-quoc-chi)"})
        with urllib.request.urlopen(request, timeout=15) as response:
            data = response.read(MAX_BYTES+1)
        if len(data) > MAX_BYTES:
            raise ValueError("Scan exceeds size limit")
        with Image.open(BytesIO(data)) as scan:
            if scan.width < 700 or scan.height < 500:
                raise ValueError("Unexpected scan size")
            for a in pending:
                w,h = scan.size
                box = a.get("crop", [0,0,1,1])
                image = scan.crop(tuple(round(v*(w if i%2==0 else h)) for i,v in enumerate(box))).convert("RGB")
                image.thumbnail((1400,1800))
                target = ROOT / (a["file"] + ".webp")
                temp = target.with_suffix(".tmp")
                try:
                    image.save(temp,"WEBP",quality=88)
                    if not valid(temp):
                        raise ValueError("Invalid WebP")
                    temp.replace(target)
                    print("SAVED", target, flush=True)
                finally:
                    temp.unlink(missing_ok=True)
    except urllib.error.HTTPError as exc:
        errors.append(str(exc))
        if exc.code in (403,429,503):
            print("Source declined or throttled requests; stopping batch.", flush=True)
            break
    except Exception as exc:
        errors.append(str(exc))
    time.sleep(3)
missing = [name for name in sorted(seen) if not valid(ROOT/(name+".webp"))]
print(f"Requested assets available: {len(seen)-len(missing)}/{len(seen)}")
for e in errors:
    print(e, file=sys.stderr)
for name in missing:
    print("PENDING", name, file=sys.stderr)
sys.exit(1 if missing or errors else 0)
