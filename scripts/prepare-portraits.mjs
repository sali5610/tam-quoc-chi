import fs from 'node:fs';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';import path from 'node:path';
const registry=JSON.parse(fs.readFileSync('content/atlas/portraits.json','utf8'));
const ua='TamQuocChi historical education project (https://github.com/sali5610/tam-quoc-chi)';
const curl=(url)=>execFileSync('curl',['--fail','--location','--retry','2','--max-time','45','--user-agent',ua,url],{maxBuffer:10*1024*1024});
function jpegSize(b){
  if(b.length<4||b[0]!==255||b[1]!==216)throw Error('Not a JPEG');
  let i=2;
  while(i<b.length){
    if(b[i++]!==255)break;
    while(b[i]===255)i++;
    const m=b[i++];
    if(m===0xd9||m===0xda)break;
    if(m===0x01||(m>=0xd0&&m<=0xd7))continue;
    if(i+2>b.length)break;
    const len=b.readUInt16BE(i);
    if(len<2||i+len>b.length)break;
    if([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(m)&&len>=7)return {height:b.readUInt16BE(i+3),width:b.readUInt16BE(i+5)};
    i+=len;
  }
  throw Error('JPEG dimensions unavailable');
}
for(const p of registry.portraits.filter(p=>p.enabled)){
  if(!p.commonsFile||!p.width||!p.height||!p.sourceUrl||!p.rightsStatus.startsWith('public domain')||!/^assets\/portraits\/[a-z-]+\.jpg$/.test(p.path))throw Error('Unverified portrait: '+p.id);
  const filename=p.commonsFile.replaceAll(' ','_');
  const md5=createHash('md5').update(filename).digest('hex');
  const original='https://upload.wikimedia.org/wikipedia/commons/'+md5[0]+'/'+md5.slice(0,2)+'/'+encodeURIComponent(filename);
  let bytes;try{bytes=curl(original)}catch{bytes=curl('https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(filename))}
  const sha1=createHash('sha1').update(bytes).digest('hex');
  const dimensions=jpegSize(bytes);
  if(dimensions.width!==p.width||dimensions.height!==p.height||(p.sha1&&sha1!==p.sha1)||(p.size&&bytes.length!==p.size))throw Error('Portrait identity mismatch: '+p.id+' '+JSON.stringify({dimensions,sha1,size:bytes.length}));
  const out=path.join('dist',p.path);fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,bytes);
  console.log('PASS portrait',p.id,sha1,bytes.length,dimensions.width+'x'+dimensions.height,p.sha1?'pinned':'dimensions verified; record checksum');
}

// Scene art: pin exact source scan; crop only visually reviewed panel bounds. Keep distinct from portrait registry.
const scenes=JSON.parse(fs.readFileSync('content/scene-art.json','utf8'));
const knownHashes=new Set(registry.portraits.filter(p=>p.enabled&&p.sha1).map(p=>p.sha1));
const manifest=JSON.parse(fs.readFileSync('content/manifest.json','utf8'));
const episodes=manifest.eras.flatMap(e=>e.arcs.flatMap(a=>a.chapters.flatMap(c=>c.episodes)));
const ids=new Set(),paths=new Set();
for(const a of scenes){const ep=episodes.find(e=>e.id===a.episode);if(!ep||ids.has(a.id)||paths.has(a.path)||!/^assets\/scenes\/[a-z0-9-]+\.jpg$/.test(a.path)||!a.sourceUrl||!a.credit||!a.label)throw Error('Invalid scene record '+a.id);ids.add(a.id);paths.add(a.path);const lines=fs.readFileSync(ep.source,'utf8').split('\n');const matches=lines.filter(l=>a.placement==='heading'?l==='## '+a.anchor:a.placement==='blockquote'&&l.startsWith('>')&&l.includes(a.anchor));if(matches.length!==1)throw Error('Scene anchor must match exactly once: '+a.id);}
// Keep the six accepted illustrated episodes and all their original asset validation.
// Starting with Batch 03, DEC-UX-034 explicitly permits sourced v6 diagrams instead of additional historical art.
const visuals=JSON.parse(fs.readFileSync('content/episode-visuals.json','utf8'));
for(const ep of episodes){
 if(ep.id<='ep-0006'&&!scenes.some(a=>a.episode===ep.id))throw Error('Missing accepted scene illustration: '+ep.id);
 if(!scenes.some(a=>a.episode===ep.id)&&!visuals.some(v=>v.episode===ep.id&&v.items?.length&&v.sources?.length))throw Error('Episode without contextual visual: '+ep.id);
}
const scanCache=new Map(),panelKeys=new Set();
for(const a of scenes){let bytes;
if(a.crop){
  const c=a.crop,key=a.sourceSha1+':'+[c.x,c.y,c.width,c.height].join(',');
  if(panelKeys.has(key)||!/^[a-f0-9]{40}$/.test(a.sourceSha1)||![c.x,c.y,c.width,c.height].every(Number.isInteger)||c.x<0||c.y<0||c.width<1||c.height<1||c.x+c.width>a.sourceWidth||c.y+c.height>a.sourceHeight)throw Error('Invalid or duplicate crop '+a.id);
  panelKeys.add(key);
  let scan=scanCache.get(a.downloadUrl);if(!scan){scan=curl(a.downloadUrl);scanCache.set(a.downloadUrl,scan);}
  const scanHash=createHash('sha1').update(scan).digest('hex'),sourceDim=jpegSize(scan);
  if(scanHash!==a.sourceSha1||scan.length!==a.sourceSize||sourceDim.width!==a.sourceWidth||sourceDim.height!==a.sourceHeight)throw Error('Source scan mismatch '+a.id);
  bytes=execFileSync('convert',['jpeg:-','-crop',c.width+'x'+c.height+'+'+c.x+'+'+c.y,'+repage','-strip','-quality','92','jpeg:-'],{input:scan,maxBuffer:10*1024*1024});
  console.log('PASS source scan and crop',a.id,scanHash,JSON.stringify(c));
}else{bytes=curl(a.downloadUrl);}
const sha1=createHash('sha1').update(bytes).digest('hex');const dim=jpegSize(bytes);if(dim.width!==a.width||dim.height!==a.height||knownHashes.has(sha1)||(a.sha1&&sha1!==a.sha1)||(a.size&&bytes.length!==a.size))throw Error('Scene identity or duplicate: '+a.id);knownHashes.add(sha1);const out=path.join('dist',a.path);fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,bytes);console.log('PASS scene',a.id,sha1,bytes.length,dim.width+'x'+dim.height);}
