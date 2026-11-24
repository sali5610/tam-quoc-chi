import {chromium,webkit} from 'playwright';
import fs from 'node:fs';
const pilot=JSON.parse(fs.readFileSync('content/atlas/pilot.json','utf8'));
const entities=JSON.parse(fs.readFileSync('src/entities.json','utf8'));
const quotes=JSON.parse(fs.readFileSync('content/wiki/quotes.json','utf8'));
const base='http://localhost:4173/tam-quoc-chi/';
const check=(x,m)=>{if(!x)throw Error(m)};
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
    await board.getByText('Mốc sự kiện trong tập',{exact:true}).click();
    for(const e of expected){await board.locator('[data-atlas-event="'+e.id+'"]').click();const sheet=board.getByRole('dialog',{name:'Chi tiết sự kiện'});await sheet.waitFor();check((await sheet.innerText()).includes(e.title),'Wrong event '+e.id);await sheet.locator('.atlas-event-sources summary').click();check(await sheet.locator('.atlas-event-sources a[href*="wikisource.org"]').count()>=1,'Missing sources '+e.id);check(!(await sheet.innerText()).includes('EVD-'),'Internal evidence exposed '+e.id);await sheet.getByRole('button',{name:'Đóng sự kiện'}).click();}
    await board.getByText('Địa danh trong tập',{exact:true}).click();check(await board.locator('details').filter({has:board.getByText('Địa danh trong tập',{exact:true})}).locator('p button').count()===pilot.placeRefsByEpisode[ep].length,'Place coverage '+ep);
    const rel=page.locator('#reader-atlas > details');await rel.locator('summary').first().click();
    for(const e of expected){await rel.locator('select').selectOption(e.id);check(await rel.locator('[data-relation-id]').count()===pilot.relations.filter(r=>r.event===e.id).length,'Relation coverage '+e.id);}
    if(ep==='ep-0009'){
      for(const c of pilot.additionalGraphContexts){const context=rel.locator('details').filter({has:rel.getByText(c.label,{exact:true})});await context.locator('summary').click();check(await context.locator('.batch-relation-edge').count()===c.edges.length,'Context coverage '+c.label);}
      const journey=board.getByTestId('atlas-journey-select');check(await board.locator('.atlas-journey-line').count()===0,'Journey on by default');await journey.selectOption('xiandi-195');await board.locator('.atlas-journey-panel').waitFor();check(await board.locator('.atlas-journey-list li').count()===11,'Missing stops');check(await board.locator('.atlas-journey-list li button:disabled').count()===1,'Unknown crossing');check((await board.locator('.atlas-journey-list li button:disabled').innerText()).includes('Vượt Hoàng Hà'),'Wrong text-only stop');await page.waitForFunction(()=>document.querySelectorAll('.atlas-journey-line').length===3);check(await board.locator('.atlas-journey-list li details a').count()===22,'Journey source coverage');await journey.selectOption('');await page.waitForFunction(()=>!document.querySelector('.atlas-journey-line,.atlas-journey-stop,.atlas-journey-panel'));
    }
    check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Overflow '+ep+' '+width);
    await page.getByRole('link',{name:'Xem trên sa bàn'}).click();await page.locator('section[data-atlas-year="'+year+'"] .strategy-board').waitFor();await page.getByRole('link',{name:'Quay lại truyện'}).click();await page.locator('.reader-hero h1').waitFor();check(page.url().endsWith('#/read/'+ep),'Atlas return');
   }
   for(const year of ['192','193','194','195']){await page.goto(base+'#/atlas/'+year);const board=page.locator('section[data-atlas-year="'+year+'"]');await board.locator('.strategy-board .atlas-person-marker').first().waitFor();check(await board.locator('[data-atlas-event]').count()===pilot.events.filter(e=>e.year===+year&&e.episode>='ep-0007').length,'Global year '+year);check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Global overflow '+year);}
   check(!errors.length,errors.join('\n'));await page.close();console.log('PASS B03 Atlas',engine.name(),width,height);
  }
  const page=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,reducedMotion:'reduce'});await page.goto(base+'#/people');await page.locator('.people-grid button').first().waitFor();
  for(const person of pilot.people){await page.locator('.people-grid button').filter({has:page.locator('[data-person-name="'+person.name+'"]')}).click();const dialog=page.locator('dialog.person-sheet[open]');await dialog.waitFor();check(await dialog.locator('.person-related a').count()===entities.references[person.name].episodes.length,'Wiki backlinks '+person.id);check(await dialog.locator('.character-quote').count()===quotes.filter(q=>q.personId===person.id).length,'Wiki quotes '+person.id);await dialog.getByRole('button',{name:'Đóng'}).click();}
  console.log('PASS 67 Wiki profiles and 29 quote/backlink counts',engine.name());await page.close();
 }finally{await browser.close()}
}
