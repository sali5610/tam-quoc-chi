import fs from 'node:fs';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';import path from 'node:path';
const registry=JSON.parse(fs.readFileSync('content/atlas/portraits.json','utf8'));
const entries=registry.portraits.filter(p=>p.enabled);
const ua='TamQuocChi historical education project (https://github.com/sali5610/tam-quoc-chi)';
const curl=(url)=>execFileSync('curl',['--fail','--location','--retry','2','--max-time','45','--user-agent',ua,url],{maxBuffer:10*1024*1024});
const api=new URL('https://commons.wikimedia.org/w/api.php');
api.search=new URLSearchParams({action:'query',format:'json',formatversion:'2',prop:'imageinfo',iiprop:'url|sha1|mime|size',titles:entries.map(p=>'File:'+p.commonsFile).join('|')}).toString();
const response=JSON.parse(curl(api.href).toString());
const pages=response.query?.pages||[];
for(const p of entries){
  if(!p.commonsFile||!p.downloadUrl||!/^assets\/portraits\/[a-z-]+\.jpg$/.test(p.path))throw Error('Unverified portrait: '+p.id);
  const info=pages.find(x=>x.title?.replaceAll(' ','_')==='File:'+p.commonsFile)?.imageinfo?.[0];
  if(!info||info.mime!=='image/jpeg'||info.url!==p.downloadUrl||!/^([0-9a-f]{40})$/.test(info.sha1))throw Error('Commons metadata mismatch: '+p.id);
  if(p.sha1&&p.sha1!==info.sha1)throw Error('Pinned portrait changed: '+p.id);
  const bytes=curl(p.downloadUrl);
  if(createHash('sha1').update(bytes).digest('hex')!==info.sha1||bytes.length!==info.size||bytes[0]!==255||bytes[1]!==216)throw Error('Portrait checksum or format mismatch: '+p.id);
  const out=path.join('dist',p.path);fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,bytes);
  console.log('PASS portrait',p.id,info.sha1);
}
