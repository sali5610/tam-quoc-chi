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
