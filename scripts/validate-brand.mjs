import fs from 'node:fs';
import assert from 'node:assert/strict';
const dir='public/';
const manifest=JSON.parse(fs.readFileSync(dir+'manifest.webmanifest','utf8'));
assert.equal(manifest.start_url,'./');assert.equal(manifest.scope,'./');assert.equal(manifest.display,'standalone');
const expected={'brand/icon-192.png':192,'brand/icon-512.png':512,'brand/icon-maskable-512.png':512,'brand/apple-touch-icon.png':180,'brand/favicon-32.png':32,'brand/favicon-16.png':16};
for(const [file,n] of Object.entries(expected)){const p=fs.readFileSync(dir+file);assert.equal(p.subarray(0,8).toString('hex'),'89504e470d0a1a0a');assert.equal(p.readUInt32BE(16),n);assert.equal(p.readUInt32BE(20),n);}
assert.deepEqual(manifest.icons.map(i=>[i.src,i.sizes,i.purpose]),[['brand/icon-192.png','192x192','any'],['brand/icon-512.png','512x512','any'],['brand/icon-maskable-512.png','512x512','maskable']]);
const html=fs.readFileSync('index.html','utf8');for(const file of ['manifest.webmanifest','brand/seal.svg','brand/favicon-16.png','brand/favicon-32.png','brand/apple-touch-icon.png']){assert.ok(html.includes('href="./'+file+'"'));assert.ok(fs.existsSync(dir+file));}
console.log('PASS brand icon dimensions, manifest and relative subpath metadata');
