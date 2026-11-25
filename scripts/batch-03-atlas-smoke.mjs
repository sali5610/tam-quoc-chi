import {chromium,webkit} from 'playwright';
import fs from 'node:fs';
const pilot=JSON.parse(fs.readFileSync('content/atlas/pilot.json','utf8'));
const entities=JSON.parse(fs.readFileSync('src/entities.json','utf8'));
const quotes=JSON.parse(fs.readFileSync('content/wiki/quotes.json','utf8'));
const base=process.env.TQC_TEST_BASE||'http://localhost:4173/tam-quoc-chi/';
const check=(x,m)=>{if(!x)throw Error(m)};
async function checkWidth(page,stage){const data=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,offenders:[...document.querySelectorAll('main *,header *')].filter(e=>!e.closest('.leaflet-container')&&e.getClientRects().length).map(e=>({tag:e.tagName,cls:String(e.className?.baseVal??e.className),text:e.textContent?.trim().slice(0,75),left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right,scroll:e.scrollWidth,client:e.clientWidth})).filter(e=>e.right>innerWidth+1||e.left< -1).sort((a,b)=>b.right-a.right).slice(0,15)}));check(data.scroll<=data.width+1,'Overflow '+stage+' '+JSON.stringify(data));}

for(const engine of [chromium,webkit]){
 const browser=await engine.launch();
 try{
  for(const [width,height] of [[320,720],[390,844],[834,1194],[1194,834],[1440,900]]){
   const page=await browser.newPage({viewport:{width,height},hasTouch:width<1400,reducedMotion:'reduce'});page.setDefaultTimeout(10000);
   const errors=[];page.on('pageerror',e=>errors.push(String(e)));
   for(const [ep,year] of [['ep-0007','193'],['ep-0008','194'],['ep-0009','195']]){
    await page.goto(base+'#/read/'+ep);const board=page.locator('section[data-atlas-year="'+year+'"]');await board.locator('.strategy-board .atlas-person-marker').first().waitFor();
    const expected=pilot.events.filter(e=>e.episode===ep);const eventList=board.locator('[data-atlas-event]');
    check(await eventList.count()===expected.length,'Event coverage '+ep);
    const markerEvents=await board.locator('.atlas-person-marker').evaluateAll(es=>es.flatMap(e=>(e.getAttribute('data-event-group')||'').split(',')));
    check(markerEvents.every(id=>expected.some(e=>e.id===id)),'Cross-episode marker '+ep);
    check(new Set(markerEvents).size===expected.length,'Missing/duplicated resolved event '+ep);
    await checkWidth(page,ep+' initial');await board.getByText('Mốc sự kiện trong tập',{exact:true}).click();await checkWidth(page,ep+' events opened');
    for(const e of expected){await board.locator('[data-atlas-event="'+e.id+'"]').click();const sheet=board.getByRole('dialog',{name:'Chi tiết sự kiện'});await sheet.waitFor();check((await sheet.innerText()).includes(e.title),'Wrong event '+e.id);await sheet.locator('.atlas-event-sources summary').click();check(await sheet.locator('.atlas-event-sources a[href*="wikisource.org"]').count()>=1,'Missing sources '+e.id);check(!(await sheet.innerText()).includes('EVD-'),'Internal evidence exposed '+e.id);await checkWidth(page,ep+' event '+e.id);await sheet.getByRole('button',{name:'Đóng sự kiện'}).click();}
    await board.getByText('Địa danh trong tập',{exact:true}).click();check(await board.getByText('Địa danh trong tập',{exact:true}).locator('..').locator('p button').count()===pilot.placeRefsByEpisode[ep].length,'Place coverage '+ep);
    await checkWidth(page,ep+' places opened');const rel=page.locator('#reader-atlas > details');await rel.locator('summary').first().click();await checkWidth(page,ep+' relations opened');const selector=rel.locator('select');check(await selector.evaluate(e=>e.getBoundingClientRect().right<=e.closest('details').getBoundingClientRect().right+1),'Event select exceeds panel '+ep);
    for(const e of expected){await rel.locator('select').selectOption(e.id);check(await rel.locator('[data-relation-id]').count()===pilot.relations.filter(r=>r.event===e.id).length,'Relation coverage '+e.id);await checkWidth(page,ep+' relation '+e.id);}
    if(ep==='ep-0009'){
      for(const c of pilot.additionalGraphContexts){const context=rel.getByText(c.label,{exact:true}).locator('..');await context.locator('summary').click();check(await context.locator('.batch-relation-edge').count()===c.edges.length,'Context coverage '+c.label);}
      const journey=board.getByTestId('atlas-journey-select');check(await board.locator('.atlas-journey-line').count()===0,'Journey on by default');await journey.selectOption('xiandi-195');await board.locator('.atlas-journey-panel').waitFor();check(await board.locator('.atlas-journey-list li').count()===11,'Missing stops');check(await board.locator('.atlas-journey-list li button:disabled').count()===1,'Unknown crossing');check((await board.locator('.atlas-journey-list li button:disabled').innerText()).includes('Vượt Hoàng Hà'),'Wrong text-only stop');await page.waitForFunction(()=>document.querySelectorAll('.atlas-journey-line').length===3);check(await board.locator('.atlas-journey-list li details a').count()===22,'Journey source coverage');await journey.selectOption('');await page.waitForFunction(()=>!document.querySelector('.atlas-journey-line,.atlas-journey-stop,.atlas-journey-panel'));
    }
    await checkWidth(page,ep+' final '+width);
    await page.getByRole('link',{name:'Xem trên sa bàn'}).click();await page.locator('section[data-atlas-year="'+year+'"] .strategy-board').waitFor();await page.getByRole('link',{name:'Quay lại truyện'}).click();await page.locator('.reader-hero h1').waitFor();check(page.url().endsWith('#/read/'+ep),'Atlas return');
   }
   for(const year of ['192','193','194','195']){await page.goto(base+'#/atlas/'+year);const board=page.locator('section[data-atlas-year="'+year+'"]');await board.locator('.strategy-board .atlas-person-marker').first().waitFor();check(await board.locator('[data-atlas-event]').count()===pilot.events.filter(e=>e.year===+year&&e.episode>='ep-0007').length,'Global year '+year);await checkWidth(page,'Global '+year);const rel=page.locator('.atlas-relation-panel');await rel.locator('summary').first().click();await checkWidth(page,'Global relation '+year);}
   check(!errors.length,errors.join('\n'));await page.close();console.log('PASS B03 Atlas',engine.name(),width,height);
  }
  const page=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,reducedMotion:'reduce'});await page.goto(base+'#/people');await page.locator('.people-grid button').first().waitFor();
  for(const person of pilot.people){await page.locator('.people-grid button').filter({has:page.locator('[data-person-name="'+person.name+'"]')}).click();const dialog=page.locator('dialog.person-sheet[open]');await dialog.waitFor();check(await dialog.locator('.person-related a').count()===entities.references[person.name].episodes.length,'Wiki backlinks '+person.id);check(await dialog.locator('.character-quote').count()===quotes.filter(q=>q.personId===person.id).length,'Wiki quotes '+person.id);await dialog.getByRole('button',{name:'Đóng'}).click();}
  console.log('PASS 67 Wiki profiles and 29 quote/backlink counts',engine.name());await page.close();

  const nav=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,reducedMotion:'reduce'});
  for(const [ep,query,prev,next] of [['ep-0007','dung the luc','ep-0006','ep-0008'],['ep-0008','bao thu tu chau','ep-0007','ep-0009'],['ep-0009','lay lai duyen chau','ep-0008',null]]){
    await nav.goto(base+'#/search');await nav.getByRole('textbox',{name:'Tìm tập'}).fill(query);
    // EP07 search is by source text as well as title; use unaccented title for deterministic coverage.
    if(ep==='ep-0007')await nav.getByRole('textbox',{name:'Tìm tập'}).fill('tu mot quan den ca mot chau');
    const result=nav.locator('main a[href="#/read/'+ep+'"]');await result.waitFor();await result.click();
    await nav.locator('.reader-hero h1').waitFor();await nav.getByRole('button',{name:'Trong tập',exact:true}).waitFor();
    check(await nav.locator('footer a').count()===5,'Navigation count '+ep);
    check(await nav.locator('.pager a[href="#/read/'+prev+'"]').count()===1,'Previous link '+ep);
    check(await nav.locator('.pager a').count()===(next?2:1),'Next link count '+ep);
    if(next)check(await nav.locator('.pager a[href="#/read/'+next+'"]').count()===1,'Next link '+ep);
    await nav.getByRole('button',{name:'Cỡ chữ',exact:true}).click();check(await nav.getByRole('button',{name:'Âm thanh: Tắt'}).getAttribute('aria-pressed')==='false','Sound default '+ep);await nav.keyboard.press('Escape');
    await nav.getByRole('button',{name:'Trong tập',exact:true}).click();const context=nav.getByRole('dialog',{name:'Trong tập này'});await context.waitFor();
    const expectedPeople=Object.keys(entities.people).filter(name=>entities.references[name]?.episodes.includes(ep));
    const inline=await nav.locator('.story-content button.inline-person').allTextContents();
    check(expectedPeople.every(name=>inline.includes(name)),'Missing inline Wiki link '+ep+' '+expectedPeople.filter(name=>!inline.includes(name)).join(','));
    await context.locator('.context-people summary').click();
    const contextNames=await context.locator('.context-people button').allTextContents();
    check(contextNames.length===expectedPeople.length&&expectedPeople.every(name=>contextNames.includes(name)),'Reader Wiki membership '+ep);
    await context.locator('.context-people').getByRole('button',{name:'Tào Tháo',exact:true}).click();
    const profile=nav.getByRole('dialog',{name:'Tào Tháo',exact:true});await profile.waitFor();
    check(await profile.locator('.person-related a[href="#/read/'+ep+'"]').count()===1,'Missing return backlink '+ep);
    await profile.getByRole('button',{name:'Đóng'}).click();
    await context.locator('.context-people summary').click();

    await context.locator('.scene-strip button').nth(1).click();await context.waitFor({state:'detached'});
    await nav.waitForFunction(id=>{const p=JSON.parse(localStorage.getItem('tqc-v2-position')||'null');return p?.id===id&&p.y>100&&Math.abs(scrollY-p.y)<5},ep);
    const position=await nav.evaluate(()=>JSON.parse(localStorage.getItem('tqc-v2-position')));
    await nav.getByRole('button',{name:'Dấu trang',exact:true}).click();await nav.getByRole('button',{name:'Đã lưu'}).waitFor();
    await nav.goto(base+'#/');await nav.locator('.home-hero .primary-action[href="#/read/'+ep+'"]').click();
    await nav.getByRole('button',{name:'Trong tập',exact:true}).waitFor();await nav.waitForFunction(y=>Math.abs(scrollY-y)<20,position.y);
    await nav.goto(base+'#/collection');const bookmark=nav.locator('main a[href="#/read/'+ep+'"]');await bookmark.click();await nav.getByRole('button',{name:'Trong tập',exact:true}).waitFor();await nav.waitForFunction(y=>Math.abs(scrollY-y)<20,position.y);
    await nav.goto(base+'#/collection');await nav.locator('main p').filter({has:nav.locator('a[href="#/read/'+ep+'"]')}).getByRole('button',{name:'Xóa'}).click();check(await nav.locator('main a[href="#/read/'+ep+'"]').count()===0,'Delete bookmark '+ep);
    console.log('PASS B03 navigation, search, resume, bookmark, Reader/Wiki links',engine.name(),ep);
  }await nav.close();

 }finally{await browser.close()}
}
