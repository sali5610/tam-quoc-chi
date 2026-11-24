# Phase 3 — Ink & Silk Cinematic Experience (PO APPROVED, 2026-11-24)

## Scope and status
PO approves **visual design, responsive interactive prototype, cinematic animation/motion and optional sound effects**. No public deployment, external paid service, AI, or source-fictionalization approved. Build as a local/static preview first. Existing repo currently has no package.json at root; start with a self-contained prototype before selecting React dependencies.

## Experience thesis
**History as political suspense.** The user should feel the dramatic reversal of real, sourced events, not merely scroll a timeline. The medium is a cinematic editorial reader, not a game or fake reenactment. Core art direction: Ink & Silk — ivory paper, charcoal ink, muted cinnabar, silk layers, restrained metallic accents, readable Vietnamese typography.

## Motion grammar: rhythm before spectacle
| Motion primitive | Trigger / narrative job | Behavior | Sound (opt-in) |
|---|---|---|---|
| Silk Unveil | Enter episode / open chapter | Two soft silk curtains part; title emerges with slight parallax and delayed ink wash | Short fabric swish |
| Ink Bloom | Introduce historical consequence | Ink expands behind typography; never obscures readable text | Soft brush |
| Shock Dispatch | Verified sudden death, betrayal or imperial deposition | Quiet pre-beat → condensed headline scales in with controlled 1–2px camera shake → ink shock ring → settle into source-linked prose | Single low drum/impact, not loud explosion |
| Twist Unveil | Reveal reversal already established in narrative | Obscured statement wipes into focus; preserve text in DOM for accessibility | Subtle reverse swell |
| Seal Stamp | Source receipt / historical fact confirmed | Cinnabar stamp lands once, then rests | Dry seal tap |
| Character Entrance | First meaningful appearance | Silhouette/name plate emerges with offset and future-impact teaser | None by default |
| Thread Connect | Setup→payoff callback | Fine red silk thread connects earlier hint to current event | Soft chime |
| Page Turn | Next episode | Paper/silk slide, with history scroll position preserved | Paper flick |

**Never** use a shock effect on invented events, trivial facts or all cards. One major impact sequence per episode is a reasonable default, not a quota. Historical quote/variant attribution must remain visible.

## Interaction choreography
1. Home: open on still paper, one gentle moving ink/silk detail; **Enter the Chronicle** triggers Silk Unveil (or instant if reduced motion).
2. Reader: comfortable line length, high contrast, chapter progress, stable reading position. Context appears before historical names/offices. Narrative prose is never delayed behind mandatory animations.
3. Event beat: source tag remains clearly distinct from **[Tiểu thuyết]**, **[Bùi chú]**, **[Ngẫm chuyện nay]** and editorial satire.
4. Twist beat: user can tap to reveal or scroll naturally; no forced wait. A large shock headline is optional, dismissible and never steals keyboard focus.
5. Character: tappable name opens contextual sheet with identity, role in this scene, earlier appearances, future payoff hint (spoiler-conscious), relationship and source.
6. Atlas: timeline and relationship links visually connect episodes, people and events; disputed edges visually distinguish certainty.
7. Audio: OFF by default; explicit unmute toggle with persistence local to device. User gesture unlocks Web Audio. Respect iOS silent mode/OS behavior; never claim guaranteed sound in all device modes.

## Design tokens (provisional)
- paper #F2EBDD; silk #E4D9C6; ink #1D2425; ink-soft #56605F; cinnabar #A73B32; gold #A18453; border #C8BDA8.
- serif display for dramatic titles; Vietnamese-readable sans-serif for body/UI; text 16–19px mobile with ~1.65 line height; avoid thin strokes on small screens.
- Motion: micro 120–240ms, normal 350–650ms, cinematic 900–1800ms; pauses and asymmetry are deliberate. Avoid constant looping motion.
- Breakpoints: 390px iPhone baseline, 768px tablet, 1280px desktop; accommodate safe-area and landscape.

## Accessibility, UX and performance
- `prefers-reduced-motion: reduce`: instant reveal/no shake/no parallax; content stays available.
- Mute toggle, captions/textual equivalent for every audio cue, pause/replay/skip for nonessential sequences; no autoplay audio.
- Avoid flashes, strobes, excessive shaking, scroll hijack and vestibular triggers. Use transforms/opacity, not heavy layout animation.
- Preload only near-future assets; graceful fallback when fonts, effects or Web Audio fail. Respect battery/data saver where possible.
- Character sheets keyboard accessible; Escape closes, focus returns; touch targets >=44px; sources readable without animation.
- Motion must improve comprehension or anticipation, not punish repeat readers.

## Component map for later React implementation
`ChronicleShell`, `SilkUnveil`, `InkBloom`, `ShockDispatch`, `TwistReveal`, `CharacterEntrance`, `HistoricalSourceNote`, `ModernInsightNote`, `CharacterSheet`, `SetupPayoffThread`, `TimelineAtlas`, `AudioDirector`, `ReducedMotionProvider`.

First inspect mature React options for animation and accessibility (Motion, Radix UI / React Aria) **before custom-building**; do not add dependencies to this docs-only repository without a concrete implementation plan. Avoid paid APIs and unnecessary third-party tracking.

## Phase 3 prototype acceptance
- Interactive responsive Reader demonstrating silk reveal, shock, twist, source layer, modern note and audio toggle.
- Historical content accurately pulled from approved EP1–3, not invented dialogue or dramatized private thoughts.
- All key interactions work on touch and keyboard; reduced motion and muted mode fully functional.
- Clear transition from prototype to React implementation; no deployment without separate approval.
