# Decision Log

| ID | Decision | Status |
|---|---|---|
| DEC-001 | Repo `sali5610/tam-quoc-chi` is private | Approved |
| DEC-002 | Trần Thọ's 《三國志》 primary; source layers clearly separated | Approved |
| DEC-003 | Vietnamese gossip-style without fabricated historical facts | Approved |
| DEC-004 | Character wiki, hierarchy, citations, atlas | Approved vision |
| DEC-005 | PO gates and protected source history | Approved |
| DEC-006 | No Vercel deployment yet | Approved |
| DEC-007 | Detailed MVP, art direction and stack | Pending Phase 0 |
| DEC-008 | Product direction A: Cinematic Reader + Wiki + Atlas | Approved 2026-11-24 |
| DEC-009 | MVP pilot: 3 episodes and 6–10 sourced wiki pages | Approved 2026-11-24 |
| DEC-010 | Art exploration: Ink & Silk | Approved 2026-11-24 |
| DEC-011 | Tone: strong gossip, no fabricated facts | Approved 2026-11-24 |
| DEC-012 | Phase 1 source research may proceed; source list requires PO approval before writing | Approved 2026-11-24 |

| DEC-013 | Phase 1: four-tier source hierarchy approved | Approved 2026-11-24 |
| DEC-014 | CText/Wikisource conditional access sources pending fidelity/license verification | Approved 2026-11-24 |
| DEC-015 | Pilot research begins in late Eastern Han; exact episodes pending approval | Approved 2026-11-24 |

| DEC-016 | Three pilot episode outlines (168–190) and nine wiki candidates approved for detailed research; no storytelling/deploy | Approved 2026-11-24 |

| DEC-017 | Include noteworthy Romance/folklore versions with explicit literary provenance, comparison and citations; perform completeness sweep, never silently omit | Approved 2026-11-24 |

| DEC-018 | Inline reader includes sourced history/literary comparisons, verifiable public community jokes and clearly labeled original editorial satire; distinct UI provenance required | Approved 2026-11-24 |


## Hybrid UI — 2026-11-24
- DEC-021/022: PO approved Hybrid, iPhone/iPad first, Ink & Silk; source-compatible Chinese motion patterns.
- DEC-023: PO approved Hybrid v4 prototype integration into React on isolated branch, regression required, no deployment or main merge. See docs/hybrid-ui-refinement for prototype decisions. Batch-02 content remains separate.

- DEC-024: PO explicitly approves release of Hybrid v4 to existing GitHub Pages. Publish only tested Hybrid code plus release verification/docs; no Batch-02 content, stack changes or paid services. Require public SHA and live smoke evidence; physical device acceptance separate.

## Batch 02 reconciliation
## Current decisions / observed state — 2026-11-24 (Chat 00 reconciliation)
The earlier decisions remain historical records; the following supersede stale descriptions, not retroactive approvals.
- DEC-001: superseded as factual repository status; GitHub reports PUBLIC. Personal use intent remains distinct from actual access. No visibility change authorized in Chat 00.
- DEC-006/007: superseded by approved Phase 4 architecture: free GitHub Pages only; React + Vite + TypeScript + Leaflet, Markdown/JSON/localStorage. No Vercel/backend/paid services.
- DEC-009/012/016: pilot research-only restriction superseded by subsequent PO approval to draft and implement pilot; three episodes exist and are deployed. Separate editorial acceptance is not inferred.
- DEC-018: community reactions optional and must be real, original satire separately labeled.
- DEC-019 (PO direction carried from prior work): prioritize 三國志圖像 for suitable verified illustrations; supplement with other suitable sourced artwork; no AI art without explicit request. Ink & Silk remains.
- DEC-020 (PO instruction for Chat 00): reconcile docs/backlog only, no feature code, narrative or deployment; work package handoff and stop.
- Release evidence: main 20c0b7cde08914da707cd4b490b780f2c0ea427a, successful runs 45312216495 and 45312216688. Actual public site fetch not independently verified in Chat 00.

- B02-DEC-021 (PO, 2026-11-24): personal-use intent; do not block visual discovery, mapping or local prototype evaluation solely because explicit image reuse permission has not been established. Record known rights or unknown without exhaustive clearance research; prefer suitable openly reusable art where available. Keep original source, scene/person accuracy, file decode, crop and dedup checks mandatory. Public GitHub repo/Pages is not private; personal-use intent does not establish legal permission for public redistribution. Flag unresolved rights for public release, do not claim clearance, bypass access restrictions, or auto-deploy.

- DEC-025: PO approves BATCH-02 release, initially excluding Hybrid v4, then explicitly requests integration with Hybrid v4. Main already contains released Hybrid v4, so integrate on isolated branch based on exact main, keep both QA suites and publish only after combined QA passes. No rollback to old UI, no extra stack or costs.

- PO approved Wiki timeline radar: six axes (strategy, military, leadership, politics, power, legitimacy), time-specific evidence, explicitly editorial ordinal scale, unknown axes not scored. No future narrative spoilers, no deploy authorization.

- PO requested notable sourced quotations on Wiki in prior package. Consolidate with approved radar on integration branch only; source layers and existing stable person IDs retained; no new release authorization.

- 2026-11-25: PO approves publishing combined Wiki quotations and time-varying radar on existing GitHub Pages after exact combined CI PASS. Scope limited to these features and release verification, no other changes.

- DEC-026 (PO, 2026-11-25): all six Wiki radar ratings mandatory at every character timeline snapshot; assess/update as part of each content batch, including new characters. Supersedes earlier optional/omitted-axis decision. Keep explicit editorial inference and evidence safeguards; do not invent historical facts. Backfill existing incomplete snapshots in next content package; no separate deployment authorized by this instruction.

- PO correction to DEC-026: fix existing data now, every timeline snapshot must show all six ratings, not merely the first snapshot per character. Preserve uncertainty disclosures. Separate release approval remains required.

- 2026-11-25: PO explicitly approves release of DEC-026 radar completeness fix to existing GitHub Pages, based on passed CI 45457431703. No unrelated branch changes authorized.

- 2026-11-25: PO authorizes Chat 03B to complete inline visual coverage of EP01–06 before next batch. Preserve Ink & Silk, prefer 三國志圖像, use sourced supplemental plates and clearly labeled context if exact scenes unavailable; no AI art. Preview and regression only; separate release approval required.

- DEC-027 (PO, 2026-11-25): approved publishing Chat 03B visual package, 16 illustrations across EP01–06, including 13 三國志圖像 panels. Retain already approved radar, Wiki, Atlas and Hybrid UI. Accept the documented interim coverage limitations; require exact tested release and live verification. No new costs or unrelated features authorized.

- DEC-UX-027: PO requested story-first copy (previous cleanup PR #2 used duplicate DEC-027). Research/QA/EVD IDs and scaffolding remain internal; optional meaningful variants and compact source disclosures. Preserve main DEC-027 visual release independently.
- DEC-UX-028: PO agreed Hybrid v5 redesign work packages. Chat 02 implements Home/Reader only, based on latest main, preserving art, narrative and functions; no deployment authorization. Design spec on ui/hybrid-v5-design.

- DEC-UX-029 (PO, 2026-11-25): explicitly approves publishing tested Hybrid v5 to the existing single canonical GitHub Pages website https://sali5610.github.io/tam-quoc-chi/react-preview/ for live visual review. From now on use this one website for PO review and iterative fixes; do not maintain additional hosted test/staging pages. Keep pre-release automated CI and temporary build artifacts (not separate hosted websites); preserve the existing free stack and release gate. Live publication is not visual acceptance. No URL migration, deletion of legacy files or new hosting authorized. Publish each approved batch once; avoid redundant dispatches.

- DEC-UX-030 (PO, 2026-11-25): Hybrid v5.1 uses existing quality UI/motion libraries and reusable components before writing custom effects; all functional UI icons use Lucide. Scope: progressive story unveil, ink wash, animated handwritten circles/underlines, optional key-content tap reveal, decision stamp, torn-paper collage for art/quotes, bounded rearrangement of selected scraps. Preserve Ink & Silk, story readability, historical evidence and art, free React/Vite/Leaflet stack, canonical website only. Prefer existing CSS and native accessible controls where sufficient; no wholesale theme or Tailwind/Next migration, paid tier, external runtime service, or unnecessary dependency. New packages subject to React 19 compatibility, license, bundle, touch/keyboard/reduced-motion checks. This is design direction, not deployment approval.

- DEC-UX-031 (PO, 2026-11-25): explicitly approves publishing Hybrid v5.1 after CI 45471413661 SUCCESS (tested app 7c680edf4745380717f16c1bb1d5c5f39abc1b82). Publish only to the existing canonical GitHub Pages URL under DEC-UX-029; preserve data, current stack and free hosting. Approval authorizes this release; animated aesthetic and physical iPhone touch acceptance remain separate. No new hosted staging site.

- DEC-UX-032 (PO, 2026-11-25): live v5.1 visual feedback: improved appearance, but replacing global bottom navigation while reading is inappropriate. Keep the same five primary tabs everywhere (Sử truyện active in Reader); move existing four contextual Reader tools and progress into sticky top header, with settings opening beneath it. Preserve labels, behavior, bookmarks, reading position and Lucide. No unrelated redesign. Release only after regression and PO approval.

- DEC-UX-032 clarification (PO): remove redundant Sử truyện link from Reader header; episode number is a static context label, not another library link. Primary Sử truyện destination exists in persistent bottom navigation only; keep Mục lục and the four contextual Reader tools.

- DEC-UX-032 clarification (PO): approved differentiating contextual Reader actions from app destinations: top labels Trong tập, Cỡ chữ (opens existing reading settings), Dấu trang, Địa điểm (Lucide MapPin, jumps to current episode map); bottom Atlas retains Lucide Map and global route. No changes to map data or destination behavior.

- DEC-UX-033 (PO, 2026-11-25): approves release of the Reader navigation consistency and contextual labels fix after CI 45476166397 SUCCESS (tested app 7ae01fdc28ac2b989ebd9ba73c90cfe32b6245d0). Publish once to canonical GitHub Pages only. Preserve all other UI, historical content and motion behavior. Physical iPhone acceptance remains separate.

- DEC-UX-034 (PO, 2026-11-25): approves Visual System v6 mapping across ALL episodes, not only battle scenes. Match political, social, military, alliance, succession and character visuals to sourced narrative beats. Reuse existing components and assets, use Lucide for functional UI and curated Game-icons for content symbols, prioritize 三國志圖像 and period-appropriate art. Do not force identical visual quotas or invent facts. Mapping approved scope only, no deployment authorization.

- DEC-UX-034 clarification (PO): do not import additional historical artwork, museum photographs or historical image assets in v6. Use symbolic icons and editorial illustrations/diagrams only, reuse existing verified character portraits and all 16 scene illustrations. No AI image generation or external illustration acquisition authorized in this batch.

- DEC-UX-035 (PO, 2026-11-25): approves publishing Visual System v6 after CI 45486364768 SUCCESS (tested app 7e970cd894078d524250d516c1f3fb06de40ddc3). Publish once to the canonical GitHub Pages site only, no new historical image assets or additional hosting. Physical device acceptance remains separate.

- DEC-UX-036 (PO, 2026-11-25): accepts current Visual System v6 as production baseline. Publish one website at https://sali5610.github.io/tam-quoc-chi/; retire /react-preview/ and old hosted prototype. No separate hosted React testing version. Keep private CI/browser regression before deployment (runner-local only), unchanged stack, assets and localStorage keys. Publish only dist, not docs. Legacy path returns 404; no duplicate app. PO authorizes this migration and release.

- DEC-UX-037 (PO, 2026-11-25): current accepted v6 is the mandatory production design and interaction baseline for every subsequent batch. Require complete per-episode Reader visuals and motion metadata, full affected Wiki profiles/six-axis timelines/quote research/backlinks and episode/global Atlas data, timeline, relations and journeys where supported. No silently missing components; document justified optional absence, block mandatory gaps. Adopt AGENTS.md and docs/BATCH_DELIVERY_RULES.md as mandatory entrypoints; preserve one work package per chat, scope and separate release approval. Docs-only decision, no code changes or deployment.

- B03-DEC-038 (PO, 2026-11-25): explicitly approves production release of BATCH-03 EP07–09, exact tested candidate 7de30009857454e674efd43dd30a4052583eb21e / non-deploy CI 45516014682 SUCCESS. Publish once to canonical root via existing workflow; preserve v6, free stack and EP01–06 regression; verify public SHA, live Reader/Wiki/Atlas/visual regression and retired preview 404. No redesign, new features, content expansion or costs. Release approval is not physical-device acceptance.

- DEC-B04-039 (PO, 2026-11-25): approves nine consecutive episodes per standard batch starting BATCH-04 EP10–18, followed by B05 EP19–27, etc. Retain seven work packages/chats 00–06; three internal three-episode checkpoints per relevant package, no separate PO approval or deployment per checkpoint. Maintain full historical research, storytelling, Visual System v6, Wiki/Atlas and QA requirements; preserve existing free stack and single canonical site. Only docs/process change approved here; no content implementation or production release authorization. Chat00 determines specific narrative scope; Chat06 requires separate release approval.

- DEC-B04-040 (PO, 2026-11-25): accepts the proposed BATCH-04 research roster disposition in candidate c95353ce638f5b37abade6f39847a20e6b71f5ae: 88 assessed identities, two carried existing profiles, and 17 contextual/variant identities retained in sourced narrative without mandatory standalone Wiki profiles for the scoped beats. Low-confidence ratings remain editorial estimates of demonstrated remit, not inherent talent; no fabricated score, omitted required axis, or future-event attribution. Reopen targeted research if an incidental actor becomes a material independent figure or an estimate has no defensible basis. This is acceptance of the research scope and transition to Chat02, not acceptance of unimplemented content, UI, QA, or release. Existing six-axis contract and separate release authorization remain unchanged.

- DEC-B04-041 (PO, 2026-11-26): explicitly approves production release of BATCH-04 EP10–18, exact tested candidate e5a84d7d970a4df7fa869d0add9b2a3b6b5e3abc / CI 45691861514 SUCCESS plus verified handoff-only delta 6a9479c. Merge PR #7 and publish once via existing main workflow to https://sali5610.github.io/tam-quoc-chi/; verify public release SHA, live EP01–18 regression and retired react-preview 404. Preserve v6, existing free stack; no redesign, new feature, BATCH-05, or physical-device acceptance implied. Merge 5af8a0885fdfa50aefdc4510a83c29a19b67fc0c; release run 45694080738. Authorization is not evidence of successful deployment.

- DEC-UX-042 (PO, 2026-11-26): Wiki faction information and filtering plus character role/category filtering (e.g. mưu sĩ, tướng) are mandatory for tracking characters as the corpus grows. Implement in Navigation & IA Chat04 with source-backed time-specific affiliations and editorial multi-role categories, combined filtering and explicit uncertainty; no invented affiliation or classification, no future spoilers; preserve v6 and existing Wiki/Atlas data. Taxonomy and filter interaction details are design proposals, not separate PO approval. No release authorization.

- DEC-UX-043 (PO, 2026-11-26): explicitly approves dynamic faction history and role/category filtering design (DEC-UX-042) and mandates ongoing Wiki updates in every future content batch, including changed allegiances/roles of existing characters, evidence-based temporal context, one canonical profile, combined filters, shared Reader/Wiki/Atlas faction semantics and spoiler control. Adopt as permanent AGENTS.md and BATCH_DELIVERY_RULES.md requirement. Implementation remains Navigation & IA Chat04 and QA Chat05; no production release authorization.

- DEC-UX-044 (PO, 2026-11-27): instructs remediation of remaining Navigation & IA limitations rather than deferring them to a later batch or accepting residual uncovered contexts. Close legacy Wiki appearance gaps and missing event reveal anchors with evidence and regression; preserve historical uncertainty without fabrication. Distinguishing narrative-only references and requiring exact anchors are implementation choices. No approval of release or unverified QA.

- DEC-UX-045 (PO, 2026-11-27): explicitly approves publishing Navigation & IA (DEC-UX-042–044 and associated navigation/chronology work) to canonical root, exact tested application 6fde477a40850e20efddb8eadb7df83da26a6c4c / CI 45893094194 SUCCESS, with disclosed outstanding full manual visual review, physical-device testing and exhaustive independent historical re-collation. Release verification may reuse existing IA assertions on live; no change to approved application/content, no additional hosting, costs or deployment dispatch. Approval authorizes release, not proof of deployment or physical-device acceptance.

- DEC-UX-046 (PO, 2026-11-27): accepts the generated red seal on ivory artwork (three strokes and three fortress banners) as the Tam Quốc Chí PWA and favicon identity. Production release is not authorized by this design approval. Vector tracing, size-specific padding and icon metadata are implementation choices. No offline/service worker or UI redesign in scope.

- DEC-UX-047 (PO, 2026-11-27): explicitly approves one production release of PWA/favicon identity (DEC-UX-046), exact tested candidate e7f40c3dc8932590e2d84727d553048b46077c72 / CI 45941834872 SUCCESS, plus handoff-only delta 7315160c453a18c8b109870f3239f69b29e7a675. Keep canonical root and existing free stack, no service worker/offline, UI or content changes. Add release-only live asset byte verification and HTML reference checks to existing Pages workflow; main push triggers the single release, no dispatch. Physical iOS Home Screen installation/refresh and visual favicon acceptance remain separate. Approval is not proof of deployment.
