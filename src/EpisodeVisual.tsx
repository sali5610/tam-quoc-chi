import {useId,type ReactNode} from 'react';
import {ArrowDown,ChevronDown,Network,GitCompare,ListOrdered,BookOpen,ScrollText,Users,Flame} from 'lucide-react';
import {Unveil} from './StoryMotion';
import icons from '../content/story-icon-assets.json';
import visuals from '../content/episode-visuals.json';
import {portraitUrl} from './portrait';
type Node={name:string;text:string;person?:string;icon?:string;label?:string};
export type Visual={id:string;episode:string;anchor:string;placement:string;kind:string;title:string;center?:Node;items:Node[];sources:{label:string;url:string}[];note?:string};
export const episodeVisuals=visuals as Visual[];
export function EpisodeVisual({visual:v,person}:{visual:Visual;person:(name:string)=>ReactNode}){
 const titleId=useId();const Icon=v.kind==='network'?Network:v.kind==='sequence'?ListOrdered:GitCompare;
 const used=new Set([v.center,...v.items].map(n=>n?.icon).filter(Boolean));
 const draw=(n:Node)=>{const asset=icons.find(a=>a.key===n.icon);const Fallback=v.kind==='network'?Users:ScrollText;return <div className="v6-node">{n.label&&<small className="v6-layer">{n.label}</small>}<div className="v6-node-inner">{n.person?person(n.person):!asset?<Fallback className="v6-symbol" size={32} aria-hidden="true"/>:null}{asset&&<img className="v6-symbol" src={portraitUrl(asset.path)} alt="" width={36} height={36} loading="lazy"/>}<div className="v6-node-copy"><strong>{n.name}</strong><span>{n.text}</span></div></div></div>};
 return <section className={'episode-visual v6-'+v.kind} data-visual-id={v.id} aria-labelledby={titleId}>
 <div className="v6-heading"><Icon size={20} aria-hidden="true"/><h3 id={titleId}>{v.title}</h3></div>
 {v.center&&<div className="v6-center">{draw(v.center)}<div className="v6-branch" aria-hidden="true"/></div>}
 <div className="v6-items">{v.items.map((n,i)=><Unveil key={i} className="v6-item">{v.kind==='sequence'&&<span className="v6-step" aria-hidden="true">{String(i+1).padStart(2,'0')}</span>}{draw(n)}{v.kind==='sequence'&&i<v.items.length-1&&<ArrowDown className="v6-next" size={20} aria-hidden="true"/>}</Unveil>)}</div>
 {v.note&&<p className="v6-note">{v.note}</p>}
 <details className="v6-sources"><summary><BookOpen size={14} aria-hidden="true"/> Nguồn &amp; minh họa <ChevronDown size={14} aria-hidden="true"/></summary>{v.sources.map(s=><a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.label}</a>)}{used.size>0&&<small>Biểu tượng quy ước, không phải hiện vật lịch sử. {icons.filter(a=>used.has(a.key)).map(a=><a key={a.key} href={a.url} target="_blank" rel="noreferrer">{a.author} · {a.key} · CC BY 3.0</a>)}</small>}</details>
 </section>
}
