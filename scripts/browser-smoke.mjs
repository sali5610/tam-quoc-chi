import {chromium} from 'playwright';
const browser=await chromium.launch({headless:true});
try {
  const errors=[]; const failures=[];
  const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  page.on('pageerror',e=>{errors.push(String(e));console.error(e)});
  page.on('response',r=>{if(r.status()>=400||r.url().includes('atlas.json'))console.log('HTTP',r.status(),r.url())});
  page.on('console',m=>{if(m.type()==='error'||m.text().includes('Atlas marker')||m.text().includes('Atlas characters'))console.log(m.text());if(/same key|duplicate key/i.test(m.text()))errors.push(m.text());});
  for(const [id,name] of [['ep-0001','Hán Linh Đế'],['ep-0002','Hoàng Phủ Tung'],['ep-0003','Đổng Trác'],['ep-0001','Hán Linh Đế']]){
    try {
    await page.goto('http://localhost:4173/tam-quoc-chi/react-preview/#/read/'+id);
    const marker=page.locator('.atlas-person-marker').filter({hasText:name});
    try {await marker.waitFor({state:'visible',timeout:15000});} catch(e){console.error('URL',page.url(),'MAP TEXT',await page.locator('.strategy-board').innerText().catch(()=>''));console.error('MAP',await page.locator('.strategy-board').count(),'MARKERS',await page.locator('.atlas-person-marker').count());throw e;}
    await marker.scrollIntoViewIfNeeded();
    await page.waitForFunction(()=>document.querySelectorAll('main .strategy-board').length===1,{},{timeout:5000});
    await marker.locator('xpath=ancestor::div[contains(concat(" ",normalize-space(@class)," ")," strategy-board ")]').scrollIntoViewIfNeeded();
    if(await page.locator('.atlas-person-marker').count()!==1)throw Error('Stale or duplicate character markers after navigation');
    const ok=await marker.evaluate(el=>{const r=el.getBoundingClientRect(),b=el.closest('.strategy-board').getBoundingClientRect();const x=r.left+r.width/2,y=r.top+r.height/2;return x>b.left&&x<b.right&&y>b.top&&y<b.bottom&&el.contains(document.elementFromPoint(x,y))});
    if(!ok)throw Error('Marker clipped or obscured: '+name);
    const transparent=await marker.evaluate(el=>{const s=getComputedStyle(el);return (s.backgroundColor==='rgba(0, 0, 0, 0)'||s.backgroundColor==='transparent')&&s.borderTopWidth==='0px'&&s.boxShadow==='none'});
    if(!transparent)throw Error('Opaque character overlay: '+name);
    await marker.locator('.atlas-person-name').first().waitFor({state:'visible'});
    await page.waitForFunction(()=>{const root=document.querySelector('main .strategy-board');const marker=root?.querySelector('.atlas-person-marker');if(!root||!marker)return false;const r=marker.getBoundingClientRect();return Array.from(root.querySelectorAll('.atlas-auto-label')).filter(el=>getComputedStyle(el).visibility!=='hidden').every(el=>{const b=el.getBoundingClientRect();return b.right<=r.left||b.left>=r.right||b.bottom<=r.top||b.top>=r.bottom})},{},{timeout:5000});
    if(id!=='ep-0001')await marker.locator('.atlas-local-relation svg').waitFor({state:'visible'});
    if(id==='ep-0001'||id==='ep-0002'){const fallbackCount=await marker.locator('.atlas-portrait-fallback').count();if(fallbackCount!==(id==='ep-0001'?1:2))throw Error('Missing fallback names');}
    await marker.click();
    await page.getByRole('dialog',{name:'Chi tiết sự kiện'}).waitFor({state:'visible'});
    await page.getByRole('button',{name:'Đóng sự kiện'}).click();
    if(id==='ep-0003'){
      await page.waitForFunction(()=>{const images=Array.from(document.querySelectorAll('[data-event-id="capital-189"] .atlas-portrait-image'));return images.length===2&&images.every(img=>img.complete&&img.naturalWidth>0&&getComputedStyle(img).visibility==='visible')},{},{timeout:10000});
      const avatarLayout=await marker.locator('.atlas-portrait-seal').evaluateAll(seals=>seals.map(seal=>{const image=seal.querySelector('img.atlas-portrait-image');if(!image)return false;const r=seal.getBoundingClientRect(),i=image.getBoundingClientRect();const css=getComputedStyle(image);return seal.dataset.portraitLoaded==='true'&&!seal.querySelector('.atlas-portrait-fallback')&&!seal.textContent.trim()&&css.objectFit==='cover'&&i.width>=r.width*.8&&i.height>=r.height*.8&&Math.abs((i.left+i.right)-(r.left+r.right))<2&&Math.abs((i.top+i.bottom)-(r.top+r.bottom))<2}));
      if(avatarLayout.length!==2||!avatarLayout.every(Boolean))throw Error('Portrait image not filling seal or fallback still visible');
      console.log('PASS atlas portrait pair and circular crop');
      const board=page.locator('main .strategy-board');
      const initial=await marker.evaluate(el=>({scale:Number(el.getAttribute('data-marker-scale')),width:el.querySelector('.atlas-marker-content').getBoundingClientRect().width}));
      await board.locator('.leaflet-control-zoom-out').click();
      await page.waitForFunction(({scale,width})=>{const el=document.querySelector('[data-event-id="capital-189"]');return !!el&&Number(el.getAttribute('data-marker-scale'))<scale&&el.querySelector('.atlas-marker-content').getBoundingClientRect().width<width},{scale:initial.scale,width:initial.width},{timeout:5000});
      await board.locator('.leaflet-control-zoom-out').click();
      await marker.locator('.atlas-marker-overview').waitFor({state:'visible',timeout:5000});
      const overview=await marker.evaluate(el=>Number(el.getAttribute('data-marker-scale')));
      await board.locator('.leaflet-control-zoom-in').click();
      await page.waitForFunction(({overview,initial})=>{const el=document.querySelector('[data-event-id="capital-189"]');const scale=Number(el?.getAttribute('data-marker-scale'));return !!el&&scale>overview&&scale<initial&&!el.querySelector('.atlas-marker-overview')},{overview,initial:initial.scale},{timeout:5000});
      await marker.locator('.atlas-person-name').first().waitFor({state:'visible'});
      await board.locator('.leaflet-control-zoom-in').click();
      await page.waitForFunction(({scale,width})=>{const el=document.querySelector('[data-event-id="capital-189"]');return !!el&&Math.abs(Number(el.getAttribute('data-marker-scale'))-scale)<0.001&&Math.abs(el.querySelector('.atlas-marker-content').getBoundingClientRect().width-width)<1},initial,{timeout:5000});
      await marker.locator('.atlas-person-name').first().waitFor({state:'visible'});
      console.log('PASS character zoom sizing and restored detail');
    }
    console.log('PASS visible character and relation: '+name);
    } catch(e){failures.push(id+': '+String(e));console.error('FAIL',id,String(e));}

  }
  try {
    const base='http://localhost:4173/tam-quoc-chi/react-preview/';
    await page.goto(base+'#/people');
    await page.locator('.people-grid button').first().waitFor();
    const cards=page.locator('.people-grid .portrait-frame');
    if(await cards.count()!==23)throw Error('Unexpected person library count');
    const images=page.locator('.people-grid img.historical-portrait');
    if(await images.count()!==8||await page.locator('.people-grid .portrait-placeholder').count()!==15)throw Error('Unexpected portrait/fallback counts');
    for(let i=0;i<8;i++){const img=images.nth(i);await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());}
    const dong=page.locator('.people-grid button').filter({hasText:'Đổng Trác'});
    const src=await dong.locator('img').getAttribute('src');
    await dong.click();
    const dialog=page.locator('dialog[open]');
    await dialog.waitFor();
    if(await dialog.locator('img.historical-portrait').getAttribute('src')!==src)throw Error('Inconsistent portrait in detail');
    await dialog.locator('img').evaluate(el=>el.decode());
    await dialog.locator('.portrait-credit a').waitFor();
    await dialog.getByRole('button',{name:'Đóng ×'}).click();
    console.log('PASS library portraits, fallback and detail attribution');
    await page.goto(base+'#/read/ep-0002');
    const reader=page.locator('section[data-atlas-year="184"]');
    await reader.locator('.strategy-board').waitFor({state:'visible'});
    const selector=reader.getByTestId('atlas-journey-select');
    try{await selector.waitFor({state:'visible',timeout:5000});}catch(e){console.error('JOURNEY DOM',page.url(),await page.locator('main').innerText(),await page.locator('main select').count());throw e;}
    const options=await selector.locator('option').evaluateAll(els=>els.map(el=>el.value));
    if(JSON.stringify(options)!==JSON.stringify(['','huangfu-song-184','zhu-jun-184']))throw Error('Wrong journey options '+JSON.stringify(options));
    if(await page.locator('.atlas-journey-stop').count())throw Error('Journey enabled by default');
    for(const [id,count] of [['huangfu-song-184',6],['zhu-jun-184',4]]){
      await selector.selectOption(id);
      const panel=page.locator('.atlas-journey-panel');
      await panel.waitFor();
      await page.waitForFunction(n=>document.querySelectorAll('.atlas-journey-list li').length===n,count);
      await page.locator('.atlas-journey-stop').first().waitFor({state:'attached'});
      const resolved=await panel.locator('li button:not([disabled])').count();
      if(resolved<1)throw Error('No mapped stops '+id);
      if(await panel.locator('li details a').count()!==count)throw Error('Missing source links '+id);
      await page.getByRole('button',{name:'Xem toàn hành trình'}).click();
      const first=panel.locator('li button:not([disabled])').first();
      await first.click();
      console.log('PASS journey',id,'stops',count,'located',resolved);
    }
    await selector.selectOption('');
    await page.waitForFunction(()=>!document.querySelector('.atlas-journey-panel,.atlas-journey-stop,.atlas-journey-line'));
    console.log('PASS journey layer cleanup');
  } catch(e){failures.push('portrait/journey: '+String(e));console.error('FAIL portrait/journey',e);}

  try {
    const base='http://localhost:4173/tam-quoc-chi/react-preview/';
    const check=(v,m)=>{if(!v)throw Error(m)};
    for(const [id,year,event,person] of [['ep-0004','190','luoyang-190','Đổng Trác'],['ep-0005','191','luoyang-191','Tôn Kiên'],['ep-0006','192','changan-192','Vương Doãn']]){
      await page.goto(base+'#/read/'+id);
      await page.locator('section[data-atlas-year="'+year+'"] .strategy-board').waitFor();
      await page.locator('main h1').filter({hasText:id.toUpperCase()}).waitFor();
      const marker=page.locator('[data-event-id="'+event+'"]');
      // A named location that the external dataset cannot resolve must be shown as a text fallback, not a guessed pin.
      const fallback=page.locator('section[data-atlas-year="'+year+'"] p').filter({hasText:'Chưa định vị'}).getByRole('button');
      await marker.or(fallback).first().waitFor();
      if(await marker.count()){
        check(await marker.count()===1,'duplicate event '+event);
        check((await marker.innerText()).includes(person),'wrong event person '+event);
        await marker.scrollIntoViewIfNeeded();await marker.click();
      }else{await fallback.first().click();console.log('UNRESOLVED location (explicit fallback)',event)}
      const sheet=page.getByRole('dialog',{name:'Chi tiết sự kiện'});
      await sheet.waitFor();check((await sheet.innerText()).includes('EVD-B02-'),'missing event evidence');
      await sheet.locator('a[href*="wikisource.org"]').waitFor();
      await page.getByRole('button',{name:'Đóng sự kiện'}).click();
      check(await page.getByRole('link',{name:'Xem trên sa bàn →'}).getAttribute('href')==='#/atlas/'+year,'incorrect atlas route '+id);
      console.log('PASS new reader and atlas anchor',id,year,event);
    }
    const scene=page.locator('figure[data-art-id="VIS-B02-012"]');
    await scene.scrollIntoViewIfNeeded();check(await scene.count()===1,'missing or repeated scene');
    const img=scene.locator('img');await img.evaluate(el=>el.decode());
    check(await img.evaluate(el=>el.naturalWidth===1029&&el.naturalHeight===972),'scene dimensions');
    check((await scene.innerText()).includes('Minh họa Tam Quốc diễn nghĩa'),'missing literary label');
    check((await scene.locator('a').getAttribute('href')).includes('commons.wikimedia.org'),'missing provenance');
    console.log('PASS literary scene decode, attribution, no duplicate');
    const back=page.locator('main a[href="#/read/ep-0005"]').filter({hasText:'EP-0005'});await back.click();
    await page.locator('section[data-atlas-year="191"]').waitFor();
    await page.getByRole('link',{name:'Tập sau →'}).click();
    await page.locator('section[data-atlas-year="192"]').waitFor();
    await page.getByRole('button',{name:'＋ Dấu trang'}).click();
    await page.goto(base+'#/collection');await page.locator('main a[href="#/read/ep-0006"]').waitFor();
    await page.locator('main a[href="#/read/ep-0006"]').click();await page.locator('main h1').filter({hasText:'EP-0006'}).waitFor();
    await page.goto(base+'#/search');await page.getByRole('textbox',{name:'Tìm tập'}).fill('dong trac chet');
    await page.locator('main a[href="#/read/ep-0006"]').waitFor();
    await page.goto(base+'#/people');await page.locator('main input').fill('Vương Doãn');
    await page.locator('.people-grid button').filter({hasText:'Vương Doãn'}).click();
    const detail=page.locator('dialog[open]');await detail.waitFor();
    check(await detail.locator('.portrait-placeholder').count()===1,'new wiki fallback');
    await detail.locator('a[href="#/read/ep-0006"]').click();await page.locator('main h1').filter({hasText:'EP-0006'}).waitFor();
    console.log('PASS wiki backlinks, search, story navigation and bookmark');
    for(const viewport of [{width:390,height:844},{width:768,height:1024},{width:1024,height:768}]){
      await page.setViewportSize(viewport);
      await page.goto(base+'#/read/ep-0006');await page.locator('main h1').filter({hasText:'EP-0006'}).waitFor();
      await page.locator('figure[data-art-id="VIS-B02-012"] img').scrollIntoViewIfNeeded();
      check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'page horizontal overflow '+viewport.width);
      check(await page.locator('figure[data-art-id="VIS-B02-012"] img').evaluate(el=>el.getBoundingClientRect().width<=el.closest('figure').getBoundingClientRect().width),'scene overflow');
      console.log('PASS responsive Chromium viewport',viewport.width,viewport.height);
    }
  } catch(e){failures.push('Batch02: '+String(e));console.error('FAIL Batch02',e);}

  if(failures.length||errors.length)throw Error(JSON.stringify({failures,errors}));
} finally {await browser.close()}
