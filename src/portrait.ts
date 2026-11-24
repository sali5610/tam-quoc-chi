import registry from '../content/atlas/portraits.json';
import pilot from '../content/atlas/pilot.json';
export function portraitForId(id:string){return registry.portraits.find(p=>p.id===id&&p.enabled)}
export function portraitForName(name:string){return portraitForId(pilot.people.find(p=>p.name===name)?.id||'')}
export function portraitUrl(path:string){return new URL(path,document.baseURI).href}
