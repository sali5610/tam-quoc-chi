import {chromium,webkit} from 'playwright';
import fs from 'node:fs';
const pilot=JSON.parse(fs.readFileSync('content/atlas/pilot.json','utf8'));
const entities=JSON.parse(fs.readFileSync('src/entities.json','utf8'));
const quotes=JSON.parse(fs.readFileSync('content/wiki/quotes.json','utf8'));
const visuals=JSON.parse(fs.readFileSync('content/episode-visuals.json','utf8'));
const manifest=JSON.parse(fs.readFileSync('content/manifest.json','utf8'));
const episodes=manifest.eras.flatMap(e=>e.arcs.flatMap(a=>a.chapters.flatMap(c=>c.episodes)));
const episodeIds=episodes.map(ep=>ep.id);
fs.mkdirSync('qa-b04',{recursive:true});
const base=process.env.TQC_TEST_BASE||'http://localhost:4173/tam-quoc-chi/';
const check=(x,m)=>{if(!x)throw Error(m)};
async function checkWidth(page,stage){const data=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,offenders:[...document.querySelectorAll('main *,header *')].filter(e=>!e.closest('.leaflet-container')&&e.getClientRects().length).map(e=>({tag:e.tagName,cls:String(e.className?.baseVal??e.className),text:e.textContent?.trim().slice(0,75),left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right,scroll:e.scrollWidth,client:e.clientWidth})).filter(e=>e.right>innerWidth+1||e.left< -1).sort((a,b)=>b.right-a.right).slice(0,15)}));check(data.scroll<=data.width+1,'Overflow '+stage+' '+JSON.stringify(data));}

for(const engine of [chromium,webkit]){
 const browser=await engine.launch();
 try{
  for(const [width,height] of [[320,720],[390,844],[834,1194],[1194,834],[1440,900]]){
   const page=await browser.newPage({viewport:{width,height},hasTouch:width<1400,reducedMotion:'reduce'});page.setDefaultTimeout(10000);
   const errors=[];page.on('pageerror',e=>errors.push(String(e)));
   for(const [ep,year] of [['ep-0007','193'],['ep-0008','194'],['ep-0009','195'],['ep-0010','196'],['ep-0011','196'],['ep-0012','196'],['ep-0013','197'],['ep-0014','197'],['ep-0015','198'],['ep-0016','199'],['ep-0017','200'],['ep-0018','200']]){
    await page.goto(base+'#/read/'+ep);const board=page.locator('section[data-atlas-year="'+year+'"][data-atlas-episode="'+ep+'"]');await board.locator('.strategy-board .atlas-person-marker').first().waitFor();
    const expected=pilot.events.filter(e=>e.episode===ep);const eventList=board.locator('[data-atlas-event]');
    // Same-year hash navigations can temporarily expose the preceding Reader board before React commits the new episode. Wait for the exact scoped board, not just its year; retain strict coverage and membership assertions.
    const actualEventIds=await eventList.evaluateAll(es=>es.map(e=>e.getAttribute('data-atlas-event')));
    check(actualEventIds.length===expected.length&&expected.every(e=>actualEventIds.includes(e.id)),'Event coverage '+ep+' expected '+expected.map(e=>e.id).join(',')+' actual '+actualEventIds.join(','));
    const markerEvents=await board.locator('.atlas-person-marker').evaluateAll(es=>es.flatMap(e=>(e.getAttribute('data-event-group')||'').split(',')));
    check(markerEvents.every(id=>expected.some(e=>e.id===id)),'Cross-episode marker '+ep);
    check(new Set(markerEvents).size===expected.filter(e=>e.people.length).length&&expected.filter(e=>!e.people.length).every(e=>!markerEvents.includes(e.id)),'Missing/duplicated resolved event or contextual pin '+ep);
    if(ep>='ep-0010'&&width<=390){
      // Initial Reader focus must fit all documented pins. Check rendered avatar
      // seals, not text bounding boxes or geographic locations. Intentional user
      // panning may move a real anchor out of view.
      await page.waitForFunction(({ep})=>{
        const map=document.querySelector('section[data-atlas-episode="'+ep+'"] .strategy-board');
        if(!map)return false;const bounds=map.getBoundingClientRect();
        const groups=[...map.querySelectorAll('.atlas-person-marker')];
        if(!groups.length)return false;
        const inside=el=>{const r=el.getBoundingClientRect();return r.left>=bounds.left+4&&r.top>=bounds.top+4&&r.right<=bounds.right-4&&r.bottom<=bounds.bottom-4};
        const intersects=(a,b)=>a.left<b.right-1&&a.right>b.left+1&&a.top<b.bottom-1&&a.bottom>b.top+1;
        const seals=groups.map(g=>[...g.querySelectorAll('.atlas-portrait-seal')]);
        if(!seals.flat().every(inside))return false;
        if(groups.some(g=>g.hasAttribute('data-callout-offset')&&!g.querySelector('.atlas-callout-leader circle')))return false;
        return seals.every((group,i)=>group.every(a=>seals.slice(i+1).flat().every(b=>!intersects(a.getBoundingClientRect(),b.getBoundingClientRect()))));
      },{ep},{timeout:10000}).catch(async error=>{console.error('Atlas geometry failure',ep,width,await board.locator('.strategy-board').evaluate(map=>({bounds:map.getBoundingClientRect().toJSON(),markers:[...map.querySelectorAll('.atlas-person-marker')].map(g=>({id:g.getAttribute('data-event-id'),offset:g.getAttribute('data-callout-offset'),bounds:g.getBoundingClientRect().toJSON(),seals:[...g.querySelectorAll('.atlas-portrait-seal')].map(s=>s.getBoundingClientRect().toJSON())}))})));await page.screenshot({path:'qa-b04/'+engine.name()+'-'+width+'-'+ep+'-FAIL.png'});throw error;});
      await board.locator('.strategy-board').scrollIntoViewIfNeeded();
      await page.screenshot({path:'qa-b04/'+engine.name()+'-'+width+'-'+ep+'-initial-layout.png',fullPage:false});
      console.log('PASS narrow initial Atlas avatar geometry',engine.name(),width,ep);
    }
    await checkWidth(page,ep+' initial');await board.getByText('Mốc sự kiện trong tập',{exact:true}).click();await checkWidth(page,ep+' events opened');
    for(const e of expected){await board.locator('[data-atlas-event="'+e.id+'"]').click();const sheet=board.getByRole('dialog',{name:'Chi tiết sự kiện'});await sheet.waitFor();check((await sheet.innerText()).includes(e.title),'Wrong event '+e.id);await sheet.locator('.atlas-event-sources summary').click();check(await sheet.locator('.atlas-event-sources a[href*="wikisource.org"]').count()>=1,'Missing sources '+e.id);check(!(await sheet.innerText()).includes('EVD-'),'Internal evidence exposed '+e.id);await checkWidth(page,ep+' event '+e.id);await sheet.getByRole('button',{name:'Đóng sự kiện'}).click();}
    await board.getByText('Địa danh trong tập',{exact:true}).click();check(await board.getByText('Địa danh trong tập',{exact:true}).locator('..').locator('p button').count()===pilot.placeRefsByEpisode[ep].length,'Place coverage '+ep);
    await checkWidth(page,ep+' places opened');const rel=page.locator('#reader-atlas > details');await rel.locator('summary').first().click();await checkWidth(page,ep+' relations opened');const selector=rel.locator('select');check(await selector.evaluate(e=>e.getBoundingClientRect().right<=e.closest('details').getBoundingClientRect().right+1),'Event select exceeds panel '+ep);
    for(const e of expected){await rel.locator('select').selectOption(e.id);check(await rel.locator('[data-relation-id]').count()===pilot.relations.filter(r=>r.event===e.id).length,'Relation coverage '+e.id);await checkWidth(page,ep+' relation '+e.id);}
    if(ep==='ep-0009'){
      for(const c of pilot.additionalGraphContexts.filter(c=>c.episode===ep)){const context=rel.getByText(c.label,{exact:true}).locator('..');await context.locator('summary').click();check(await context.locator('.batch-relation-edge').count()===c.edges.length,'Context coverage '+c.label);}
      const journey=board.getByTestId('atlas-journey-select');check(await board.locator('.atlas-journey-line').count()===0,'Journey on by default');await journey.selectOption('xiandi-195');await board.locator('.atlas-journey-panel').waitFor();check(await board.locator('.atlas-journey-list li').count()===11,'Missing stops');check(await board.locator('.atlas-journey-list li button:disabled').count()===1,'Unknown crossing');check((await board.locator('.atlas-journey-list li button:disabled').innerText()).includes('Vượt Hoàng Hà'),'Wrong text-only stop');await page.waitForFunction(()=>document.querySelectorAll('.atlas-journey-line').length===3);check(await board.locator('.atlas-journey-list li details a').count()===22,'Journey source coverage');await journey.selectOption('');await page.waitForFunction(()=>!document.querySelector('.atlas-journey-line,.atlas-journey-stop,.atlas-journey-panel'));
    }
    
    if(ep>='ep-0010'){
      for(const c of pilot.additionalGraphContexts.filter(c=>c.episode===ep)){const context=rel.getByText(c.label,{exact:true}).locator('..');await context.locator('summary').click();check(await context.locator('.batch-relation-edge').count()===c.edges.length,'Context coverage '+c.label);}
      for(const t of pilot.trajectories.filter(t=>t.episode===ep)){const journey=board.getByTestId('atlas-journey-select');check(await board.locator('.atlas-journey-line').count()===0,'B04 journey default '+ep);await journey.selectOption(t.id);const panel=board.locator('.atlas-journey-panel');await panel.waitFor();check(await panel.locator('li').count()===t.stops.length,'B04 journey stops '+t.id);check(await panel.locator('li details a').count()>=t.stops.length,'B04 journey source coverage '+t.id);await page.waitForFunction(count=>document.querySelectorAll('.atlas-journey-line').length===count,t.expectedSegments.length);await journey.selectOption('');await page.waitForFunction(()=>!document.querySelector('.atlas-journey-line,.atlas-journey-stop,.atlas-journey-panel'));}
      const currentVisuals=visuals.filter(v=>v.episode===ep);
      for(const v of currentVisuals){const section=page.locator('[data-visual-id="'+v.id+'"]');await section.waitFor();const linked=[v.center,...v.items].filter(n=>n?.person);check(await section.locator('.portrait-frame').count()===linked.length,'B04 visual person count '+v.id);}
      const first=expected.find(e=>e.people.length);await board.locator('[data-atlas-event="'+first.id+'"]').click();const sheet=board.getByRole('dialog',{name:'Chi tiết sự kiện'});await sheet.waitFor();const person=pilot.people.find(p=>p.id===first.people[0]);await sheet.getByRole('button',{name:person.name,exact:true}).click();const profile=page.getByRole('dialog',{name:person.name,exact:true});await profile.waitFor();check(await profile.locator('.person-related a[href="#/read/'+ep+'"]').count()===1,'Atlas to Wiki backlink '+ep);await profile.getByRole('button',{name:'Đóng',exact:true}).click();await sheet.getByRole('button',{name:'Đóng sự kiện'}).click();
      if(width===390){await board.locator('.strategy-board').scrollIntoViewIfNeeded();await page.screenshot({path:'qa-b04/'+engine.name()+'-'+ep+'-atlas.png',fullPage:false});}
    }
    await checkWidth(page,ep+' final '+width);
    await page.getByRole('link',{name:'Xem trên sa bàn'}).click();await page.locator('section[data-atlas-year="'+year+'"] .strategy-board').waitFor();await page.getByRole('link',{name:'Quay lại truyện'}).click();await board.locator('.strategy-board .atlas-person-marker').first().waitFor();check(page.url().endsWith('#/read/'+ep),'Atlas return');
   }
   for(const year of ['192','193','194','195','196','197','198','199','200']){await page.goto(base+'#/atlas/'+year);const board=page.locator('section[data-atlas-year="'+year+'"]');await board.locator('.strategy-board .atlas-person-marker').first().waitFor();check(await board.locator('[data-atlas-event]').count()===pilot.events.filter(e=>e.year===+year).length,'Global year '+year);await checkWidth(page,'Global '+year);const rel=page.locator('.atlas-relation-panel');await rel.locator('summary').first().click();await checkWidth(page,'Global relation '+year);}
   check(!errors.length,errors.join('\n'));await page.close();console.log('PASS B03+B04 Atlas',engine.name(),width,height);
  }
  const page=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,reducedMotion:'reduce'});await page.goto(base+'#/people');await page.locator('.people-grid button').first().waitFor();
  while(await page.locator('.wiki-more').count())await page.locator('.wiki-more').click();for(const person of pilot.people){await page.locator('.people-grid button').filter({has:page.locator('[data-person-name="'+person.name+'"]')}).click();const dialog=page.locator('dialog.person-sheet[open]');await dialog.waitFor();check(await dialog.locator('.person-related a').count()===entities.references[person.name].episodes.length,'Wiki backlinks '+person.id);check(await dialog.locator('.character-quote').count()===quotes.filter(q=>q.personId===person.id).length,'Wiki quotes '+person.id);await dialog.getByRole('button',{name:'Đóng'}).click();}
  console.log('PASS all 121 Wiki profiles and 49 quote/backlink counts',engine.name());await page.close();

  const nav=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,reducedMotion:'reduce'});
  for(const [ep,query] of [['ep-0007','dung the luc'],['ep-0008','bao thu tu chau'],['ep-0009','lay lai duyen chau'],...episodes.filter(e=>e.id>='ep-0010').map(e=>[e.id,e.title])]){
    const index=episodeIds.indexOf(ep);check(index>0,'Manifest episode missing '+ep);const prev=episodeIds[index-1],next=episodeIds[index+1];
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
    console.log('PASS B03+B04 navigation, search, resume, bookmark, Reader/Wiki links',engine.name(),ep);
  }await nav.close();

 }finally{await browser.close()}
}
