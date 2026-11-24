import {useState} from 'react';
import snapshots from '../content/wiki/character-metrics.json';
import pilot from '../content/atlas/pilot.json';
const axes=[['strategy','Mưu lược'],['military','Quân sự'],['leadership','Lãnh đạo'],['politics','Chính trị'],['power','Quyền lực'],['legitimacy','Chính danh']] as const;
type Axis=typeof axes[number][0];
type Rating={level:number;evidence:string;reason:string};
const levels=['','Hạn chế','Bước đầu','Có thực lực','Nổi bật','Rất cao'];
const pt=(i:number,r:number)=>[170+Math.sin(i*Math.PI/3)*r,150-Math.cos(i*Math.PI/3)*r];
const points=(r:number)=>axes.map((_,i)=>pt(i,r).join(',')).join(' ');
export function CharacterRadar({name,close}:{name:string;close:()=>void}){
 const id=pilot.people.find(p=>p.name===name)?.id;
 const timeline=snapshots.filter(s=>s.personId===id);
 const [index,setIndex]=useState(0);
 const snap=timeline[Math.min(index,timeline.length-1)];
 if(!snap)return null;
 const ratings=snap.ratings as Partial<Record<Axis,Rating>>;
 const values=axes.map(([key])=>ratings[key]?.level);
 const coords=values.map((v,i)=>v===undefined?null:pt(i,v*18));
 return <section className="character-radar" aria-label="Lục diện nhân vật">
 <span className="eyebrow">人物六維</span><h3>Lục diện nhân vật</h3>
 <p className="radar-note">[Suy luận] Tổng hợp biên tập theo sử liệu từng mốc. Không phải điểm gốc trong sử sách.</p>
 <label className="radar-select">Mốc thời gian <select value={index} onChange={e=>setIndex(Number(e.target.value))}>{timeline.map((s,i)=><option key={s.label} value={i}>{s.label}</option>)}</select></label>
 <div className="radar-steps">{timeline.map((s,i)=><button key={s.label} aria-pressed={index===i} onClick={()=>setIndex(i)}>{s.year}{s.label.startsWith('Cuối')?'*':''}</button>)}</div>
 <svg className="radar-chart" viewBox="0 0 340 300" role="img" aria-label={snap.label+': '+axes.map(([k,l])=>l+' '+(ratings[k]?.level??'chưa đủ dữ liệu')).join(', ')}>
 {[1,2,3,4,5].map(n=><polygon key={n} points={points(n*18)} fill="none" stroke="currentColor" opacity={.18}/>)}
 {axes.map(([k,l],i)=>{const [x,y]=pt(i,90),[lx,ly]=pt(i,118);return <g key={k}><line x1="170" y1="150" x2={x} y2={y} stroke="currentColor" opacity=".25"/><text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="currentColor">{l}</text><text x={lx} y={ly+15} textAnchor="middle" fontSize="11" fill="currentColor">{ratings[k]?.level===undefined?'—':ratings[k]!.level+'/5'}</text></g>})}
 {coords.every(Boolean)&&<polygon points={coords.map(p=>p!.join(',')).join(' ')} fill="#a18453" fillOpacity=".25" stroke="#a18453" strokeWidth="2"/>}
 {coords.map((p,i)=>{const q=coords[(i+1)%6];return p&&q?<line key={i} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke="#a18453" strokeWidth="2.5"/>:null})}
 {coords.map((p,i)=>p?<circle key={i} cx={p[0]} cy={p[1]} r="4.5" fill="#a18453" stroke="currentColor" strokeWidth=".5"/>:null)}
 </svg>
 <p className="radar-note">1–5: hạn chế → rất cao · —: chưa đủ chứng cứ. Không nối qua trục thiếu dữ liệu. Quyền lực là thực quyền; chính danh là mức thừa nhận ở mốc đó, không phải đạo đức.</p>
 <details className="radar-explain"><summary>Vì sao có đánh giá này?</summary>
 <dl>{axes.map(([k,l])=>{const v=ratings[k];return <div key={k}><dt>{l} · {v?levels[v.level]+' ('+v.level+'/5)':'Chưa đủ chứng cứ'}</dt><dd>{v?<>{v.reason} <small>{v.evidence}</small></>:'Không suy từ chức danh hay sự im lặng của sử liệu.'}</dd></div>})}</dl>
 <a href={'#/read/'+snap.episodeId} onClick={close}>Đọc diễn biến liên quan</a></details>
 </section>
}
