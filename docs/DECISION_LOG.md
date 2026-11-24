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

## Current decisions / observed state — 2026-11-24 (Chat 00 reconciliation)
The earlier decisions remain historical records; the following supersede stale descriptions, not retroactive approvals.
- DEC-001: superseded as factual repository status; GitHub reports PUBLIC. Personal use intent remains distinct from actual access. No visibility change authorized in Chat 00.
- DEC-006/007: superseded by approved Phase 4 architecture: free GitHub Pages only; React + Vite + TypeScript + Leaflet, Markdown/JSON/localStorage. No Vercel/backend/paid services.
- DEC-009/012/016: pilot research-only restriction superseded by subsequent PO approval to draft and implement pilot; three episodes exist and are deployed. Separate editorial acceptance is not inferred.
- DEC-018: community reactions optional and must be real, original satire separately labeled.
- DEC-019 (PO direction carried from prior work): prioritize 三國志圖像 for suitable verified illustrations; supplement with other suitable sourced artwork; no AI art without explicit request. Ink & Silk remains.
- DEC-020 (PO instruction for Chat 00): reconcile docs/backlog only, no feature code, narrative or deployment; work package handoff and stop.
- Release evidence: main 20c0b7cde08914da707cd4b490b780f2c0ea427a, successful runs 45312216495 and 45312216688. Actual public site fetch not independently verified in Chat 00.


## UI design decision — 2026-11-24
- DEC-021: PO selects Hybrid: cinematic homepage and story-first Reader, Chronicle information architecture/Wiki/Library, War Room Atlas. Preserve Ink & Silk and existing stack/components. Approved direction only; refine isolated HTML prototype, no deploy. Prototype visual acceptance and production implementation are separate gates.

- DEC-022: PO prioritizes iPhone and iPad, desktop secondary; enrich Hybrid through existing Three Kingdoms and Chinese UI/UX/motion resources. Reuse only license-compatible code/assets; reference patterns otherwise. Keep source provenance, Ink & Silk, reduced motion and existing free architecture. No deploy.
