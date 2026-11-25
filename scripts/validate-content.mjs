import fs from 'node:fs';
const m=JSON.parse(fs.readFileSync('content/manifest.json','utf8'));const ids=new Set();function check(x){if(!x.id||ids.has(x.id)||!x.title)throw Error('Invalid or duplicate ID: '+x.id);ids.add(x.id)}for(const e of m.eras){check(e);for(const a of e.arcs){check(a);for(const c of a.chapters){check(c);for(const p of c.episodes){check(p);if(!p.source||!fs.existsSync(p.source))throw Error('Missing source '+p.id)}}}}console.log('Validated '+ids.size+' content IDs');
const atlas=JSON.parse(fs.readFileSync('content/atlas/pilot.json','utf8'));const entities=JSON.parse(fs.readFileSync('src/entities.json','utf8'));const portraits=JSON.parse(fs.readFileSync('content/atlas/portraits.json','utf8'));const scenes=JSON.parse(fs.readFileSync('content/scene-art.json','utf8'));const registry=fs.readFileSync('evidence/BATCH_02_EVIDENCE_REGISTRY.md','utf8');const allEvidence=fs.readdirSync('evidence').filter(n=>n.endsWith('.md')).map(n=>fs.readFileSync('evidence/'+n,'utf8')).join('\n');const names=new Set(atlas.people.map(p=>p.name));const peopleIds=new Set(atlas.people.map(p=>p.id));const placeIds=new Set(atlas.places.map(p=>p.id));if(names.size!==atlas.people.length||peopleIds.size!==atlas.people.length||Object.keys(entities.people).some(n=>!names.has(n)))throw Error('Duplicate or missing wiki identity');for(const e of atlas.events){if(!ids.has(e.episode)||!placeIds.has(e.place)||e.people.some(id=>!peopleIds.has(id)||!e.roles[id]))throw Error('Invalid event '+e.id);}for(const p of [...portraits.portraits.map(p=>p.id),...portraits.fallback])if(!peopleIds.has(p))throw Error('Unknown portrait ID '+p);for(const ref of Object.values(entities.references)){if(ref.episodes.some(id=>!ids.has(id))||ref.evidence.some(id=>!allEvidence.includes(id)))throw Error('Invalid wiki reference');}const pilotRegistry=["evidence/PILOT_EVIDENCE_REGISTRY_V0_1.md","evidence/PHASE_1_BATCH_VERIFICATION_2026-11-24.md"].map(p=>fs.readFileSync(p,'utf8')).join('\n');for(const a of scenes){const evidenceRegistry=a.episode<'ep-0004'?pilotRegistry:registry;if(!ids.has(a.episode)||!a.evidence||!new Set(evidenceRegistry.match(/\bEVD-(?:B02-)?(?:L)?\d+\b/g)||[]).has(a.evidence)||!a.sourceUrl||!a.path.startsWith('assets/scenes/'))throw Error('Invalid scene '+a.id);}console.log('Validated wiki, atlas and scene references');

const metricAxes=['strategy','military','leadership','politics','power','legitimacy'];
const metricSnapshots=JSON.parse(fs.readFileSync('content/wiki/character-metrics.json','utf8'));
const metricEvidence=new Set(fs.readdirSync('evidence').filter(n=>n.endsWith('.md')).flatMap(n=>fs.readFileSync('evidence/'+n,'utf8').match(/EVD-(?:B0[23]-)?[0-9]{3,4}\b/g)||[]));
const metricKeys=new Set();const metricPeople=new Set();
for(const s of metricSnapshots){
 const key=s.personId+'|'+s.year+'|'+s.label;
 if(!peopleIds.has(s.personId)||!ids.has(s.episodeId)||!Number.isInteger(s.year)||!s.label||metricKeys.has(key))throw Error('Invalid radar snapshot '+key);
 metricKeys.add(key);metricPeople.add(s.personId);
 if(Object.keys(s.ratings||{}).length!==6)throw Error('Radar requires six axes '+key);
 for(const axis of metricAxes){const v=s.ratings[axis];if(!v||!Number.isInteger(v.level)||v.level<1||v.level>5||!v.reason?.trim()||!metricEvidence.has(v.evidence)||v.confidence!==undefined&&v.confidence!=='low')throw Error('Invalid radar rating '+key+' '+axis);}
}
for(const person of atlas.people){if(Object.hasOwn(entities.people,person.name)&&!metricPeople.has(person.id))throw Error('Missing Wiki radar '+person.id);}
console.log('Validated six radar axes for '+metricSnapshots.length+' snapshots / '+metricPeople.size+' people');

const visualData=JSON.parse(fs.readFileSync('content/episode-visuals.json','utf8'));
const iconData=JSON.parse(fs.readFileSync('content/story-icon-assets.json','utf8'));
const visualIds=new Set(),iconKeys=new Set(iconData.map(a=>a.key));
for(const a of iconData){if(!a.author||!a.source||!a.license||!fs.existsSync('public/'+a.path))throw Error('Invalid story icon '+a.key)}
const visualEpisodes=m.eras.flatMap(e=>e.arcs.flatMap(a=>a.chapters.flatMap(c=>c.episodes)));
for(const v of visualData){const ep=visualEpisodes.find(e=>e.id===v.episode);if(!ep||visualIds.has(v.id)||!v.title||!['network','sequence','comparison'].includes(v.kind)||!v.items.length||!v.sources.length)throw Error('Invalid visual '+v.id);visualIds.add(v.id);const lines=fs.readFileSync(ep.source,'utf8').split(/^---\s*$/m)[0].split('\n').map(l=>l.replaceAll('**',''));if(lines.filter(l=>v.placement==='blockquote'?l.startsWith('>')&&l.includes(v.anchor):l.startsWith(v.anchor)).length!==1)throw Error('Visual anchor mismatch '+v.id);for(const n of [...v.items,...(v.center?[v.center]:[])])if(!n.name||!n.text||n.person&&!Object.hasOwn(entities.people,n.person)||n.icon&&!iconKeys.has(n.icon))throw Error('Invalid visual node '+v.id);for(const s of v.sources)if(!s.label||!s.url.startsWith('https://'))throw Error('Missing visual source '+v.id)}
for(const ep of visualEpisodes)if(!visualData.some(v=>v.episode===ep.id))throw Error('Episode without contextual visual '+ep.id);
console.log('Validated '+visualIds.size+' contextual visuals across '+visualEpisodes.length+' episodes');

const staged=JSON.parse(fs.readFileSync('evidence/BATCH_03_STORY_ANCHORS.json','utf8'));
for(const plan of staged.visuals){const v=visualData.find(v=>v.id===plan.id);if(!v||v.episode!==plan.episode||v.kind!==plan.kind||!v.anchor.includes(plan.anchor)||JSON.stringify(v.evidenceIds)!==JSON.stringify(plan.evidenceIds)||v.evidenceIds.some(id=>!allEvidence.includes(id)))throw Error('Missing B03 visual plan '+plan.id);}
console.log('Validated '+staged.visuals.length+' B03 staged visual beats');

const quotes=JSON.parse(fs.readFileSync('content/wiki/quotes.json','utf8'));
if(atlas.people.length!==67||metricSnapshots.length!==116||quotes.length!==29||atlas.events.length!==23||atlas.places.length!==53||atlas.relations.length!==46||atlas.trajectories.length!==3)throw Error('B03 integration counts');
for(const q of quotes)if(!peopleIds.has(q.personId)||!q.original||!q.translation||!q.context||!q.sourceUrl||!q.source||Number(q.id.slice(-4))>9&&(!q.evidence||!allEvidence.includes(q.evidence)||!ids.has(q.episodeId)))throw Error('Invalid quote '+q.id);
for(const e of staged.atlas.events){const actual=atlas.events.find(x=>x.id===e.id);if(!actual||actual.year!==e.year||actual.place!==e.place||JSON.stringify(actual.people)!==JSON.stringify(e.markers.map(x=>x.person))||!actual.sources.length)throw Error('B03 event mismatch '+e.id);}
for(const r of staged.atlas.relations){const actual=atlas.relations.find(x=>x.id===r.id);if(!actual||actual.from!==r.from||actual.to!==r.to||actual.event!==r.event||!actual.sources.length)throw Error('B03 relation mismatch '+r.id);}
console.log('Validated B03 Atlas data and Wiki counts');

const resolved=JSON.parse(fs.readFileSync('evidence/BATCH_03_ATLAS_RESOLUTION.json','utf8'));
for(const p of resolved.places){const a=atlas.places.find(x=>x.id===p.id);if(!a||a.display!==p.display||JSON.stringify(a.regionAliases)!==JSON.stringify(p.regionAliases)||p.id!=='changan'&&JSON.stringify(a.atlasIds)!==JSON.stringify(p.atlasIds))throw Error('Atlas place precision mismatch '+p.id);}
const court=atlas.trajectories.find(t=>t.id==='xiandi-195');if(!court||court.stops.length!==11||JSON.stringify(court.expectedSegments)!==JSON.stringify(resolved.journey.expectedSegments)||!court.allApproximate||court.stops[8].place!=='yellow-river-crossing'||!atlas.places.find(p=>p.id==='yellow-river-crossing')||atlas.places.find(p=>p.id==='yellow-river-crossing').atlasIds.length)throw Error('Court journey policy');
if(atlas.additionalGraphContexts.length!==2||atlas.additionalGraphContexts.some(c=>!c.sources.length||!c.edges.length||c.edges.some(e=>!peopleIds.has(e.from)||!peopleIds.has(e.to))))throw Error('Missing graph context');
if(portraits.fallback.length!==59||new Set([...portraits.fallback,...portraits.portraits.filter(p=>p.enabled).map(p=>p.id)]).size!==67)throw Error('Portrait fallback coverage');
for(const person of atlas.people){const refs=entities.references[person.name];for(const ep of visualEpisodes.filter(e=>e.id<'ep-0010')){const text=fs.readFileSync(ep.source,'utf8').split(/^---\\s*$/m)[0].replaceAll('**','');if(text.includes(person.name)!==refs.episodes.includes(ep.id))throw Error('Wiki backlink '+person.id+' '+ep.id);}}
for(const e of staged.atlas.events){const ep=visualEpisodes.find(p=>p.id===e.episode);if(!fs.readFileSync(ep.source,'utf8').replaceAll('**','').includes(e.anchor))throw Error('Missing Atlas story anchor '+e.id);}
console.log('PASS B03 place policy, court route, graph context, 67 Wiki backlinks, 17 event anchors');

// B04 Chat03: validate the staged visual plans, not unintegrated Wiki/Atlas.
const b04=JSON.parse(fs.readFileSync('evidence/BATCH_04_STORY_ANCHORS.json','utf8'));
for(const plan of b04.visuals){const v=visualData.find(v=>v.id===plan.id);if(!v||v.episode!==plan.episode||v.kind!==plan.kind||(v.plannedAnchor||v.anchor)!==plan.anchor||JSON.stringify(v.evidenceIds)!==JSON.stringify(plan.evidenceIds)||v.evidenceIds.some(id=>!allEvidence.includes(id)))throw Error('B04 visual mismatch '+plan.id);}
if(b04.visuals.length!==36||visualData.filter(v=>v.episode>='ep-0010').length!==36)throw Error('B04 visual count');
console.log('PASS B04 36 visual plans, 9 episodes; downstream Wiki/Atlas verification pending Chat04');
