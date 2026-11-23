# Phase 0 — Product Requirements & Roadmap (Draft for PO Approval)

Status: PROPOSED — not approved. Scope: product discovery only. No implementation or Vercel deployment.

## Product proposition
A Vietnamese historical storytelling website about the Three Kingdoms, grounded in Chen Shou's *Sanguozhi* (65 juan). Gossip-like narration is editorial framing, never invented facts. Pei Songzhi's annotations are explicitly separate evidence.

## Three product directions
1. **Cinematic Reader + Wiki (recommended)**: episode-led narrative with contextual character popovers, wiki, timeline and source receipts. Pros: compelling entry, mobile-friendly, scalable; cons: editorial workload.
2. **Historical Atlas First**: interactive chronology/maps/factions as primary navigation. Pros: strong exploration; cons: maps and contested borders demand extensive research.
3. **Encyclopedia First**: searchable biographies and events with story links. Pros: structured research; cons: weaker narrative onboarding.

Recommendation: #1 as core; Atlas as progressive enhancement; encyclopedia as a connected layer.

## Audience and principles
Curious Vietnamese readers who know pop-culture Three Kingdoms but want historical accuracy. Reader-first, traceable claims, no novel plots masquerading as history, no paywalled dependencies by default, responsive iPhone/iPad/desktop.

## Information architecture
- Home: entry into chronology, featured arc, continue reading.
- Read: Era > Arc > Chapter > Episode > Event > Evidence.
- People: directory > Character Wiki > relationships, timeline, appearances, citations.
- Timeline: dated events and concurrent faction tracks.
- Sources: work > juan > excerpt and editorial explanation.
- Search: people, episodes, events, alternate names.
- About / Methodology: source distinctions and reconstruction disclaimers.

## Episode template
Hook → Context → Trigger → Stakes → Moves → Turning Point (when justified) → Fallout → Bigger Picture → Receipts → What's Next. Include sourced claims, character links and previous/next navigation.

## Character wiki template
Names and variants; verified life dates or unknown; offices/faction by period; biography timeline; sourced relationship edges; appearances; history-vs-legend clearly separated; sources. Portraits labeled artistic reconstructions.

## Pilot MVP proposal (not final)
- One tightly bounded early arc (late Eastern Han context) chosen after chronology/source validation.
- 3 fully researched episodes and 6–10 genuinely sourced character wiki pages (no filler).
- One timeline view, local search, linked citations, bookmarks/reading progress stored locally.
- Responsive editorial reader and one approved Chinese-classical illustration system.
- Static content first, Next.js/TypeScript candidate, Vercel preview only after approval.
- Out of scope for pilot: full 65-juan adaptation, live AI, user accounts, paid CMS, precise historical territorial map.

## Data entities
SourceEdition, SourcePassage, Evidence, Claim, Event, Character, Relationship, Episode, Illustration, Decision, Revision. Stable IDs; traceability Claim→Evidence→SourcePassage→SourceEdition. Explicit uncertainty and conflicts.

## Visual options for PO review
A. Ink & Silk: elegant monochrome ink wash with restrained cinnabar.
B. Woodblock Chronicle: engraved-line portraits, textured archival layouts.
C. Court Archive: indigo, jade, seal red and formal historical document design.
All portraits are reconstructions; avoid TV/game likenesses. Generate only after concept approval.

## Gates and acceptance
0. Approve direction, sitemap, MVP boundaries, art exploration and content voice.
1. Approve source registry and verification workflow.
2. Approve two fully sourced editorial pilot episodes and character samples.
3. Approve art bible, responsive UX and prototype.
4. Approve tested MVP build.
5. Approve content QA, citation coverage and accessibility/performance.
6. Approve Vercel preview, then separately production deployment.

## Risks
- Source translations/copyright: write original Vietnamese paraphrases; check licenses.
- Pei commentary may contradict base text: model separate attestations.
- Chronology uncertainty: never invent exact dates.
- Artistic anachronisms: evidence-informed costume and clear reconstruction label.
- Scope explosion: phase content by verified arc, no placeholder biographies.
- AI regressions: immutable source versions, reviewable changes, PRs, link integrity checks.

## PO decisions requested
1. Choose direction (recommended Cinematic Reader + Wiki).
2. Approve pilot size: 3 episodes / 6–10 wiki pages, or adjust.
3. Select art exploration priority: Ink & Silk / Woodblock Chronicle / Court Archive.
4. Choose default narration intensity: mildly witty / strongly gossipy (always sourced).

No coding, art generation or deployment authorized by this draft.
