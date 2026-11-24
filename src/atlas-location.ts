type Point=[number,number];
type LocationData={cities:{id:string;name:string;p:Point}[];militarySites:{name:string;p:Point}[];regions:{name:string;polygon:Point[]}[]};
type Place={id:string;name:string;aliases:string[];atlasIds:string[];regionAliases?:string[]};
export function resolveAtlasPlace(data:LocationData,place:Place|undefined):{p:Point;precision:'site'|'region';name:string}|undefined {
  if(!place)return;
  const valid=(p:Point)=>Array.isArray(p)&&p.length===2&&p.every(Number.isFinite);
  const city=data.cities.find(c=>place.aliases.includes(c.name)||place.atlasIds.includes(c.id));
  if(city&&valid(city.p))return {p:city.p,precision:'site',name:city.name};
  const military=data.militarySites.find(c=>place.aliases.includes(c.name));
  if(military&&valid(military.p))return {p:military.p,precision:'site',name:military.name};
  const region=data.regions.find(r=>place.regionAliases?.includes(r.name));
  if(!region||!region.polygon.length||!region.polygon.every(valid))return;
  // Display anchor only: mean of supplied polygon vertices, not an ancient city coordinate.
  const p:Point=[region.polygon.reduce((a,v)=>a+v[0],0)/region.polygon.length,region.polygon.reduce((a,v)=>a+v[1],0)/region.polygon.length];
  return {p,precision:'region',name:region.name};
}
