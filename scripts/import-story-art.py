import json, pathlib, urllib.request, hashlib, time, sys
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
        with urllib.request.urlopen(req,timeout=40) as res:
            data=res.read(25*1024*1024+1)
        if len(data)>25*1024*1024: raise ValueError("image too large")
        with Image.open(BytesIO(data)) as im:
            im.thumbnail((1200,1200))
            im.convert("RGB").save(target,"WEBP",quality=85)
        print("OK",name)
    except Exception as e:
        errors.append(name+": "+str(e))
    time.sleep(1)
if errors:
    print("\n".join(errors),file=sys.stderr)
    sys.exit(1)
