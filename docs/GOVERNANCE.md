# Historical Knowledge Governance

## Protected layers
1. Source/provenance: immutable verified snapshots; corrections via new versions and comparison.
2. Evidence/knowledge: sourced entities, chronology and relationships.
3. Editorial: episode storytelling and wiki prose.
4. Presentation: UI, illustrations, animations and atlas.

## Stable IDs
`SRC-0001`, `EVD-0001`, `EVT-0001`, `CHR-0001`, `REL-0001`, `EP-0001`; never recycle IDs.

## Change protocol
Read → Impact Analysis → Minimal Change → Validation → Review → PO Approval → Merge. UI and style edits must not silently alter historical facts. Preserve superseded evidence and reasons.

## Review states
Draft → Researched → Reviewed → PO Approved → Published. Approved content requires tracked revisions.

## Git policy
`main` for approved work; scoped branches and PRs for changes; never force-push. Use branch protection when supported. Git history does not prove historical accuracy.

## Integrity checks
Validate references, IDs, source locators, conflicting records and chronology anomalies. Automated checks cannot replace historical review.

## Continuity
Read repo state, decisions, changelog and latest handoff at each session; update handoff at end.