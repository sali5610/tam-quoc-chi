# Latest Handoff — 2026-11-24 — Chat 00 Project Sync

## Baseline
- MVP implemented; do not restart Phase 0–4. React 19, TypeScript, Vite, Leaflet 1.9.4, Markdown/JSON, localStorage; free GitHub Pages only.
- Main inspected: 20c0b7cde08914da707cd4b490b780f2c0ea427a. Latest successful React preview run 45312216495 (preview job 138170459209, deploy 138170834198); Pages run 45312216688 also success at same SHA. Reported deployed SHA is the baseline; independent live HTTP/browser verification BLOCKED in Chat 00. URL: https://sali5610.github.io/tam-quoc-chi/react-preview/
- Repository visibility observed PUBLIC; personal-reader intent is not access control. Do not change visibility/hosting without PO decision. No secrets/private material.
- Existing workflow release trigger: manual dispatch or main push changing .github/workflows/react-preview.yml; automatic Pages workflow also observed on main pushes. Chat 00 docs-only branch, no merge to main, no dispatch, no deploy.
- Historical rules remain canonical, with project instruction taking precedence on publication provenance/rights. Earlier blanket rights/print-edition audits are not a research gate.

## Inventory / evidence
- Manifest v1: 1 era, 1 arc, 3 chapters/episodes EP-0001 (168–183), EP-0002 (184), EP-0003 (189). Complete prose exists and is included in MVP; do not infer separate editorial PO acceptance from deploy.
- Wiki src/entities.json and Atlas content/atlas/pilot.json: 11 people; 3 atlas events court-168, changshe-184, capital-189. Wiki entries are compact, not full verified biographies.
- Portrait registry: 8 enabled; named fallbacks lingdi, huangfu-song, zhu-jun. Preferred 三國志圖像 (Tam Quốc Chí Đồ Tượng) for identified scenes; no isolated pilot portraits verified from that source in registry. Existing artwork is later depiction, not authenticated likeness.
- Two optional journeys: huangfu-song-184 (6 stops), zhu-jun-184 (4 stops), default off. Sword & State CC BY-SA 4.0. Preserve precision labels and dashed event links.
- Code evidence: src/main.tsx hash routes, lazy Markdown, manifest tree, previous/next; src/features.tsx people, bookmarks, reading position, sound; StrategyMap, HistoricalMap, portrait.ts. Existing pilot route/map choices and CI assertions are hard-coded to 3 episodes/11 people/8 portraits/2 journeys; expansion integration will need targeted changes, not this chat.
- PASS inherited from exact release: npm build, dataset validation, Chromium mobile smoke, navigation/marker regression, portrait crop/fallback, Wiki portrait/credit, journey toggling and deploy. No new tests run. Real iPhone/iPad and direct live HTTP NOT TESTED/BLOCKED respectively in this chat.
- Prior detailed phase history retained in Git at baseline docs/LATEST_HANDOFF.md.

## Backlog / next batch
**BATCH-02: 190–192, anti-Dong Zhuo coalition and fall of Dong Zhuo. Proposed working scope for research, not an approved historical chronology or release.**
- EP-0004 (190): coalition forms, Cao Cao/Yuan Shao/Sun Jian roles, coalition constraints; research capital relocation chronology and relevant literary differences.
- EP-0005 (190–191): campaign outcomes, coalition fractures, Sun Jian and Luoyang; research conflicting accounts including imperial seal tradition; assign boundaries after source research.
- EP-0006 (192): Dong Zhuo's fall, Wang Yun/Lü Bu, immediate consequences for Han court; research Diao Chan/Fengyi Pavilion literary layers, and Li Jue/Guo Si aftermath as bridge, without expanding into later arc.
- Carry forward OPEN setups in content/PHASE_2_SETUP_PAYOFF_LEDGER.md: coalition unity, control of Emperor Xian, Yuan Shao/Cao Cao relationship (future rivalry not prematurely paid off). IDs EP-0004–6 provisional until actual records created.
- P1 for later batch integration: reuse components and stable IDs, add only sourced entities/events needed; align manifest/routes/data and update pilot-specific assertions to retain existing regressions. No feature redesign. P1 illustration: scene-specific source candidates, prioritize 三國志圖像; verify provenance/reuse before publication; supplement missing pilot portraits only when verified. P2 remaining device QA and full wiki depth when needed; no new framework.
- No story prose, feature code or deployment in Chat 00.

## Next chat
Chat 1 — Historical Research for BATCH-02. Read this docs-only branch handoff plus main baseline, Decision Log, Historical Rules, evidence registry and setup/payoff ledger. Source research only: claim evidence with stable IDs, work/juan/section/original text/meaning/URL/precision, distinguish Chen Shou, Pei, other histories, meaningful Romance variants and uncertainty; chronology, character/office/place candidates, scene illustration search candidates and setup/payoff map. Stop at a concise source/beat handoff; no prose, feature code, art generation or deploy.
