import {chromium,webkit} from 'playwright';
import fs from 'node:fs';
const base='http://localhost:4175/';
fs.mkdirSync('qa-v5',{recursive:true});
const views=[[320,720],[390,844],[834,1194],[1194,834],[1440,900]];
for(const engine of [chromium,webkit]){
 const browser=await engine.launch();
 try {
 for(const [width,height] of views){
  const page=await browser.newPage({viewport:{width,height},hasTouch:width<1400,reducedMotion:'reduce',deviceScaleFactor:1});
  page.setDefaultTimeout(10000);page.setDefaultNavigationTimeout(15000);
  console.log('START visual capture',engine.name(),width,height);
  const errors=[];page.on('pageerror',e=>errors.push(String(e)));
  const prefix='qa-v5/'+engine.name()+'-'+width+'x'+height+'-';
  const fit=async label=>{
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
   if(overflow)throw Error('Horizontal overflow '+label+' '+width);
   if(errors.length)throw Error(errors.join('\n'));
  };
  const decode=async (img,label,scroll=false)=>{
   console.log('DECODE',prefix+label);
   await img.waitFor({state:'attached'});
   if(scroll)await img.scrollIntoViewIfNeeded();
   await img.evaluate(async e=>{
    e.loading='eager';
    let timer;
    try{await Promise.race([e.decode(),new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('Image decode timeout: '+e.getAttribute('src'))),8000)})]);}
    finally{clearTimeout(timer)}
   });
  };
  const shot=async label=>{console.log('CAPTURE',prefix+label);await fit(label);await page.screenshot({path:prefix+label+'.png',animations:'disabled',timeout:10000});};
  await page.goto(base+'#/');await decode(page.locator('.home-art img'),'home');
  if(await page.locator('.home-hero .primary-action').count()!==1)throw Error('Home action');
  await shot('home');
  await page.goto(base+'#/read/ep-0002');await page.locator('.reader-hero h1').waitFor();
  await page.locator('.story-content>p').first().waitFor({state:'attached'});
  const footer=page.locator('footer[aria-label="Điều hướng chính"]');
  if(await footer.count()!==1||await footer.locator('a').count()!==5||await footer.locator('a[aria-current="page"]').getAttribute('href')!=='#/library')throw Error('Primary navigation inconsistent in Reader');
  if(await page.locator('header.reading-header .reader-tools').count()!==1||await page.locator('main .reader-tools').count())throw Error('Reader toolbar not in header');
  const dock=page.locator('header.reading-header .reader-dock');
  if(!await dock.evaluate(e=>[...e.querySelectorAll('button')].every(b=>{const r=b.getBoundingClientRect();return r.height>=44&&r.width>=44&&r.left>=0&&r.right<=innerWidth+1})))throw Error('Reader dock target');
  await shot('reader');
  const art=page.locator('figure.scene-art img').first();await decode(art,'reader-art',true);if(!await dock.evaluate(e=>{const r=e.getBoundingClientRect();return r.top>=0&&r.bottom<innerHeight/2}))throw Error('Reader toolbar is not sticky at top');await shot('reader-art');
  await page.getByRole('button',{name:'Cài đặt đọc',exact:true}).click();if(!await page.locator('.reader-settings').evaluate(e=>{const r=e.getBoundingClientRect(),h=document.querySelector('header.reading-header').getBoundingClientRect();return r.top>=h.bottom-2&&r.bottom<=innerHeight+1&&r.left>=0&&r.right<=innerWidth+1}))throw Error('Reader settings position');
  await page.getByRole('button',{name:'Tăng cỡ chữ'}).focus();
  for(let i=0;i<6;i++)await page.getByRole('button',{name:'Tăng cỡ chữ'}).click();
  if(await page.locator('.reader-text').evaluate(e=>e.style.getPropertyValue('--reader-size'))!=='25px')throw Error('Font max');
  await page.keyboard.press('Escape');await page.locator('.reader-settings').waitFor({state:'detached'});await fit('large text');
  await page.goto(base+'#/people');await decode(page.locator('.people-grid img').first(),'wiki');await shot('wiki');
  const cao=page.locator('.people-grid button').filter({has:page.locator('[data-person-name="Tào Tháo"]')});
  await cao.click();const sheet=page.locator('dialog.person-sheet');await sheet.waitFor();
  await decode(sheet.locator('img'),'profile',true);await shot('profile');
  await sheet.locator('.radar-chart').scrollIntoViewIfNeeded();await shot('radar');
  if(!await sheet.evaluate(e=>e.scrollWidth<=e.clientWidth+1))throw Error('Profile overflow');
  await page.keyboard.press('Escape');await sheet.waitFor({state:'detached'});
  await page.goto(base+'#/atlas/189');await page.locator('.strategy-board').waitFor();await page.locator('.atlas-person-marker').first().waitFor();await shot('atlas');
  await page.locator('.atlas-person-marker').first().click();await page.locator('.atlas-event-sheet').waitFor();await page.locator('.atlas-event-sheet').scrollIntoViewIfNeeded();await shot('atlas-event');
  console.log('PASS visual capture',engine.name(),width,height);
  await page.close();
 }
 } finally {await browser.close()}
}
