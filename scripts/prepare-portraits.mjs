import fs from 'node:fs';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';import path from 'node:path';
const registry=JSON.parse(fs.readFileSync('content/atlas/portraits.json','utf8'));
for(const p of registry.portraits.filter(p=>p.enabled)){
  if(!p.downloadUrl||!p.sha1||!/^assets\/portraits\/[a-z-]+\.jpg$/.test(p.path))throw Error('Unverified portrait: '+p.id);
  const out=path.join('dist',p.path);fs.mkdirSync(path.dirname(out),{recursive:true});
  execFileSync('curl',['--fail','--location','--retry','2','--max-time','45','--user-agent','TamQuocChi historical education project (https://github.com/sali5610/tam-quoc-chi)',p.downloadUrl,'-o',out],{stdio:'inherit'});
  const bytes=fs.readFileSync(out);if(createHash('sha1').update(bytes).digest('hex')!==p.sha1||bytes[0]!==255||bytes[1]!==216)throw Error('Portrait checksum or format mismatch: '+p.id);
  console.log('PASS portrait',p.id,p.sha1);
}
