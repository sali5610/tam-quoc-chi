import pilot from './atlas-data';
import {resolveAtlasPlace} from './atlas-location';
type Data=Parameters<typeof resolveAtlasPlace>[0];
type Journey=(typeof pilot.trajectories)[number];
export function resolveJourney(data:Data,journey:Journey){
  const stops=journey.stops.map(stop=>({stop,place:pilot.places.find(p=>p.id===stop.place),location:resolveAtlasPlace(data,pilot.places.find(p=>p.id===stop.place))}));
  const orders=[...new Set(stops.map(s=>s.stop.order))].sort((a,b)=>a-b);
  const groups=orders.map(order=>stops.filter(s=>s.stop.order===order));
  const segments:{from:NonNullable<typeof stops[number]['location']>;to:NonNullable<typeof stops[number]['location']>;approximate:boolean}[]=[];
  for(let i=1;i<groups.length;i++){
    const a=groups[i-1],b=groups[i];
    // Never jump over unresolved stops or invent an order within a shared phase.
    if(a.length!==1||b.length!==1||orders[i]!==orders[i-1]+1)continue;
    const from=a[0].location,to=b[0].location;
    if(!from||!to||from.p.every((v,j)=>v===to.p[j]))continue;
    const allowed=journey.expectedSegments;
    if(allowed&&!allowed.some(pair=>pair[0]===a[0].stop.place&&pair[1]===b[0].stop.place))continue;
    segments.push({from,to,approximate:!!journey.allApproximate||from.precision==='region'||to.precision==='region'});
  }
  return {stops,segments};
}
