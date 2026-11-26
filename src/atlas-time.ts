import pilot,{type AtlasEvent} from './atlas-data';
import {episodes,sessionRead,sessionWrite} from './Chronicle';
const published=new Set(episodes.map(e=>e.id));
export const publishedEvents=pilot.events.filter(e=>published.has(e.episode));
export const storyYears=[...new Set(publishedEvents.map(e=>e.year))].sort((a,b)=>a-b);
export const counts=Object.fromEntries(storyYears.map(y=>[y,publishedEvents.filter(e=>e.year===y).length]));
export type AtlasTime={year:number;month:number;event:string;mode:'story'|'map'};
export const defaultMonths:Record<number,number>={184:5,189:10,190:3,192:4,193:1,194:1,195:1,196:7,197:1,198:9,199:1,200:1};
export const defaultMonth=(year:number)=>defaultMonths[year]||1;
export const toLayerMonth=(t:AtlasTime)=>Math.max(0,(t.year-180)*12+t.month-1);
export function atlasPath(t:AtlasTime){const q=new URLSearchParams();if(t.mode==='map')q.set('mode','map');if(t.year>=180&&t.month!==defaultMonth(t.year))q.set('month',String(t.month));if(t.event)q.set('event',t.event);return '/atlas/'+t.year+(q.size?'?'+q.toString():'')}
export function parseAtlas(path:string):AtlasTime{
 const [p,qs='']=path.split('?');const q=new URLSearchParams(qs);const raw=p.split('/')[2];if(!raw){const last=sessionRead<string>('tqc-ia-atlas-last','');if(/^\/atlas\/\d{3}(?:\?|$)/.test(last))return parseAtlas(last)}
 const n=Number(raw);const mode=q.get('mode')==='map'?'map':'story';const valid=storyYears.includes(n)||(mode==='map'&&Number.isInteger(n)&&n>=180&&n<=306);const year=valid?n:storyYears[0]||168;const m=Number(q.get('month'));const month=year<180?1:Number.isInteger(m)&&m>=1&&m<=12?m:defaultMonth(year);const event=publishedEvents.find(e=>e.id===q.get('event')&&e.year===year)?.id||'';return {year,month,event,mode:year<180?'story':mode}
}
export function rememberAtlas(t:AtlasTime){sessionWrite('tqc-ia-atlas-last',atlasPath(t))}
export function eventLabel(e:AtlasEvent){const d=e.dateLabel;return d?d.includes(String(e.year))?d:String(e.year)+' · '+d:String(e.year)}
// Do not translate lunar months to dataset months or assert an order for ambiguous dates.
export function eventGroups(events:AtlasEvent[]){const lunar=events.filter(e=>/âm lịch|tháng chạp Kiến An/i.test(e.dateLabel||''));const seasonal=events.filter(e=>!lunar.includes(e)&&/mùa |xuân|hè|thu|đông/i.test(e.dateLabel||''));return [{label:'Mốc theo tháng trong sử liệu',items:lunar},{label:'Mốc theo mùa',items:seasonal},{label:'Mốc còn lại · thứ tự không xác định đầy đủ',items:events.filter(e=>!lunar.includes(e)&&!seasonal.includes(e))}].filter(g=>g.items.length)}
export function episodeAnchor(id:string){const es=publishedEvents.filter(e=>e.episode===id);return es.find(e=>e.people.length)||es[0]}
