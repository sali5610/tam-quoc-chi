import json, pathlib, urllib.request, urllib.error, hashlib, time, sys
from email.utils import parsedate_to_datetime
from datetime import datetime, timezone
from PIL import Image
from io import BytesIO
from urllib.parse import quote
root=pathlib.Path("public/story-art")
root.mkdir(parents=True,exist_ok=True)
rows=json.loads(pathlib.Path("src/story-art.json").read_text())
errors=[]
for row in rows:
    name=row["file"].replace(" ","_")
    h=hashlib.md5(name.encode()).hexdigest()
    url=f"https://upload.wikimedia.org/wikipedia/commons/{h[0]}/{h[:2]}/{quote(name)}"
    target=root/(row["file"]+".webp")
    if target.exists():
        try:
            with Image.open(target) as im: im.verify()
            continue
        except Exception: target.unlink()
    try:
        req=urllib.request.Request(url,headers={"User-Agent":"TamQuocChiPersonalReader/1.0 (github.com/sali5610/tam-quoc-chi)"})
        for attempt in range(3):
            try:
                with urllib.request.urlopen(req,timeout=40) as res:
                    data=res.read(25*1024*1024+1)
                break
            except urllib.error.HTTPError as err:
                if err.code not in (429, 503) or attempt==2: raise
                retry=err.headers.get("Retry-After")
                delay=60*(2**attempt)
                if retry:
                    try: delay=max(delay,int(retry))
                    except ValueError:
                        try: delay=max(delay,(parsedate_to_datetime(retry)-datetime.now(timezone.utc)).total_seconds())
                        except Exception: pass
                if delay>300: raise
                print("Rate limited; respecting retry delay",delay,flush=True)
                time.sleep(delay)
        if len(data)>25*1024*1024: raise ValueError("image too large")
        with Image.open(BytesIO(data)) as im:
            im.thumbnail((1200,1200))
            im.convert("RGB").save(target,"WEBP",quality=85)
        print("OK",name)
    except Exception as e:
        errors.append(name+": "+str(e))
    time.sleep(10)
if errors:
    print("\n".join(errors),file=sys.stderr)
    sys.exit(1)
