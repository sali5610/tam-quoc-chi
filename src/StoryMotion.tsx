import {useEffect,useRef,type ReactNode,type KeyboardEvent} from 'react';
import {motion,useReducedMotion,useInView,useDragControls,useMotionValue} from 'motion/react';
import {annotate} from 'rough-notation';
import {Grip,RotateCcw,ChevronDown,Stamp} from 'lucide-react';

// The animation never conceals essential text or changes its document position.
export function Unveil({children,as='div',className,id,revealEvents}:{children:ReactNode;as?:'div'|'p'|'h2';className?:string;id?:string;revealEvents?:string}){
 const reduced=useReducedMotion();const Tag=as==='p'?motion.p:as==='h2'?motion.h2:motion.div;
 return <Tag id={id} className={className} data-reveal-events={revealEvents} data-unveil="" initial={reduced?false:{opacity:.76,y:6}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:.38,ease:[.22,1,.36,1]}}>{children}</Tag>
}
export function HandMark({children,type}:{children:ReactNode;type:'circle'|'underline'}){
 const ref=useRef<HTMLSpanElement>(null);const visible=useInView(ref,{once:true,amount:.1});const reduced=useReducedMotion();
 useEffect(()=>{if(!ref.current||(!visible&&!reduced))return;const note=annotate(ref.current,{type,color:'#9a342c',strokeWidth:1.65,padding:type==='circle'?4:2,iterations:1,multiline:type==='underline',animate:!reduced,animationDuration:560});note.show();return()=>note.remove()},[visible,reduced,type]);
 return <span ref={ref} className={'hand-mark hand-'+type} data-hand-mark={type}>{children}</span>
}
export function DecisionSeal({children}:{children:ReactNode}){
 const reduced=useReducedMotion();
 return <motion.span className="decision-seal" data-decision="" initial={reduced?false:{scale:1.2,opacity:.55,rotate:-7}} whileInView={{scale:1,opacity:1,rotate:-3}} viewport={{once:true,amount:.6}} transition={{duration:.32,ease:[.2,.85,.3,1]}}><Stamp size={15} aria-hidden="true"/>{children}</motion.span>
}
export function InkReveal({title,children}:{title:string;children:ReactNode}){
 return <details className="ink-disclosure"><summary><ChevronDown size={16} aria-hidden="true"/><span>{title}</span></summary><div className="ink-disclosure-body">{children}</div></details>
}
// Motion provides bounded dragging. Only the grip initiates drag; normal
// scrolling, links and the text selection remain native. Arrow keys/reset also work.
export function PaperScrap({children,kind='figure',className,artId,quoteId}:{children:ReactNode;kind?:'figure'|'article';className:string;artId?:string;quoteId?:string}){
 const controls=useDragControls();const x=useMotionValue(0),y=useMotionValue(0);const reduced=useReducedMotion();
 const reset=()=>{x.set(0);y.set(0)};
 function keys(e:KeyboardEvent<HTMLButtonElement>){
  const offsets:Record<string,[number,number]>={ArrowLeft:[-6,0],ArrowRight:[6,0],ArrowUp:[0,-6],ArrowDown:[0,6]};
  const delta=offsets[e.key];if(!delta)return;e.preventDefault();x.set(Math.max(-16,Math.min(16,x.get()+delta[0])));y.set(Math.max(-12,Math.min(12,y.get()+delta[1])));
 }
 const Tag=kind==='article'?motion.article:motion.figure;
 return <Tag className={className+' paper-scrap'} data-art-id={artId} data-quote-id={quoteId} data-paper-scrap="" drag dragControls={controls} dragListener={false} dragMomentum={false} dragElastic={0} dragConstraints={{left:-16,right:16,top:-12,bottom:12}} style={{x,y}} whileDrag={reduced?undefined:{rotate:-1.5,scale:1.015}}>
 {children}<div className="scrap-tools"><button type="button" className="scrap-grip" aria-label="Di chuyển mảnh giấy (phím mũi tên)" onPointerDown={e=>{if(e.button!==0)return;e.preventDefault();controls.start(e)}} onKeyDown={keys}><Grip size={18} aria-hidden="true"/></button><button type="button" aria-label="Đặt lại mảnh giấy" onClick={reset}><RotateCcw size={16} aria-hidden="true"/></button></div></Tag>
}
