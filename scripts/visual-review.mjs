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
  const errors=[];page.on('pageerror',e=>errors.push(String(e)));
  const prefix='qa-v5/'+engine.name()+'-'+width+'x'+height+'-';
  const fit=async label=>{
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
   if(overflow)throw Error('Horizontal overflow '+label+' '+width);
   if(errors.length)throw Error(errors.join('\n'));
  };
  const shot=async label=>{await fit(label);await page.screenshot({path:prefix+label+'.png',animations:'disabled'});};
  await page.goto(base+'#/');await page.locator('.home-art img').evaluate(e=>e.decode());
  if(await page.locator('.home-hero .primary-action').count()!==1)throw Error('Home action');
  await shot('home');
  await page.goto(base+'#/read/ep-0002');await page.locator('.reader-hero h1').waitFor();
  await page.locator('.story-content>p').first().waitFor({state:'attached'});
  if(await page.locator('footer').count())throw Error('Duplicate reader navigation');
  const dock=page.locator('.reader-dock');
  if(!await dock.evaluate(e=>[...e.querySelectorAll('button')].every(b=>{const r=b.getBoundingClientRect();return r.height>=44&&r.width>=44&&r.left>=0&&r.right<=innerWidth+1})))throw Error('Reader dock target');
  await shot('reader');
  const art=page.locator('figure.scene-art img').first();await art.evaluate(e=>e.decode());await art.scrollIntoViewIfNeeded();await shot('reader-art');
  await page.getByRole('button',{name:'Cài đặt đọc',exact:true}).click();
  await page.getByRole('button',{name:'Tăng cỡ chữ'}).focus();
  for(let i=0;i<6;i++)await page.getByRole('button',{name:'Tăng cỡ chữ'}).click();
  if(await page.locator('.reader-text').evaluate(e=>e.style.getPropertyValue('--reader-size'))!=='25px')throw Error('Font max');
  await page.keyboard.press('Escape');await page.locator('.reader-settings').waitFor({state:'detached'});await fit('large text');
  await page.goto(base+'#/people');await page.locator('.people-grid img').first().evaluate(e=>e.decode());await shot('wiki');
  const cao=page.locator('.people-grid button').filter({has:page.locator('[data-person-name="Tào Tháo"]')});
  await cao.click();const sheet=page.locator('dialog.person-sheet');await sheet.waitFor();
  await sheet.locator('img').evaluate(e=>e.decode());await shot('profile');
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
