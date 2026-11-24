import {chromium,webkit} from 'playwright';
for(const engine of [chromium,webkit]){
 const browser=await engine.launch();
 try{
  for(const reducedMotion of ['no-preference','reduce']){
   const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion});
   page.setDefaultTimeout(10000);const errors=[];page.on('pageerror',e=>errors.push(String(e)));
   await page.goto('http://localhost:4176/#/read/ep-0003');await page.locator('.story-content').waitFor();
   if(!await page.locator('.story-content [data-unveil]').count()||!await page.locator('[data-decision]').count())throw Error('Story motion anchors missing');
   const key=page.locator('.ink-disclosure').filter({hasText:'Mấu chốt của cú đảo chiều'});
   if(await key.evaluate(e=>e.open))throw Error('Key reveal defaults open');
   await key.locator('summary').click();if(!await key.evaluate(e=>e.open))throw Error('Key reveal did not open');
   await key.locator('summary').click();
   const art=page.locator('figure.scene-art').first();const grip=art.getByRole('button',{name:'Di chuyển mảnh giấy (phím mũi tên)'});
   await grip.scrollIntoViewIfNeeded();await grip.focus();const before=await art.evaluate(e=>e.getBoundingClientRect().x);await grip.press('ArrowRight');
   await page.waitForFunction(({before})=>document.querySelector('figure.scene-art').getBoundingClientRect().x>before+3,{before});
   await art.getByRole('button',{name:'Đặt lại mảnh giấy'}).click();await page.waitForFunction(({before})=>Math.abs(document.querySelector('figure.scene-art').getBoundingClientRect().x-before)<1,{before});
   const box=await grip.boundingBox();if(!box)throw Error('Drag grip unavailable');await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x+box.width/2-12,box.y+box.height/2+5,{steps:4});await page.mouse.up();
   await page.waitForFunction(({before})=>document.querySelector('figure.scene-art').getBoundingClientRect().x<before-3,{before});
   await art.getByRole('button',{name:'Đặt lại mảnh giấy'}).click();
   if(await page.locator('.reader-dock button svg.lucide').count()!==4)throw Error('Reader icons missing');
   if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))throw Error('Motion overflow');
   if(errors.length)throw Error(errors.join('\n'));
   console.log('PASS motion collage',engine.name(),reducedMotion);await page.close();
  }
 }finally{await browser.close()}
}
