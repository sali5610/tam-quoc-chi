# Historical Rules

1. Labels: `[Chính sử]`, `[Bùi chú]`, `[Sử liệu khác]`, `[Sử liệu mâu thuẫn]`, `[Suy luận]`, `[Chưa xác minh]`.
2. Source category is not a confidence score; preserve contradictory attestations.
3. Never present 《三國演義》 plots as historical facts; compare only in clearly labeled sections.
4. Substantive claims require traceable evidence: work, juan, section, excerpt, edition and locator.
5. Never invent dialogue, private thoughts, motives or historical events.
6. Distinguish late Eastern Han from the formal Three Kingdoms era.
7. For this private single-reader project, rights/license QA is out of scope; retain historical attribution and provenance.
8. Portraits are artistic reconstructions, not authenticated likenesses.

## Historical completeness and popular tradition (PO direction, 2026-11-24)
**Do not omit culturally significant, relevant accounts merely because they are not in Chen Shou's base text.** Include notable traditions, literary adaptations, later legends, and conflicting versions when they materially enrich the reader's understanding, but keep their provenance and evidentiary weight explicit.

Labels added:
- **[Tiểu thuyết]**: literary narrative, e.g. Luo Guanzhong's 《三國演義》, with chapter/edition when known.
- **[Truyền thuyết]**: popular tradition or folklore, identify earliest verifiable witness if possible; do not treat widespread retelling as proof.
- **[Đối chiếu]**: side-by-side comparison of historical and literary/legendary claims. Clearly distinguish “not recorded in consulted histories” from “proved not to have happened”.

For each notable event/character, perform a **completeness sweep**: (1) base history; (2) Pei commentary; (3) other histories; (4) major Romance/folklore versions; (5) disagreements and gaps. Record omissions intentionally, with reason, not by silent filtering. No invented dialogue; quotations from novels must be labeled literary. Source links and precise chapter/juan references are mandatory before publication. Historical evidence and literary narrative must never be merged into a single asserted fact.

**Case: Peach Garden oath**: Liu Bei's role in anti-Yellow-Turban action is historical evidence in 《三國志》蜀書·先主傳. The Peach Garden oath is a celebrated episode in 《三國演義》 chapter 1; its ceremony is not confirmed by the cited historical biographies. Historical texts describe Liu Bei's close ties with Guan Yu and Zhang Fei; locate exact passages before publishing. Do not write “the oath never happened” as a proven historical negative.


## Inline reader layers: historical vs literary vs community vs editorial (PO-approved, 2026-11-24)
Relevant comparisons, popular reactions and humor appear **at the relevant moment in the reading flow**, not buried in footnotes. Distinct UI treatment and provenance are mandatory:
- **[Chính sử] / [Bùi chú] / [Sử liệu khác]** — historical claim with work, juan/section and passage.
- **[Tiểu thuyết] / [Truyền thuyết]** — recognizable alternate narrative, explicitly attributed to work/chapter or tradition witness; no invented literary quotations.
- **[Cộng đồng]** — genuinely attested public reactions, interpretations, memes or jokes. Include permalink/platform, date accessed, and enough context to avoid misrepresenting opinion as consensus. Do not fabricate comments, usernames, vote counts, popularity, or imply consensus from isolated examples. Paraphrase by default; quote briefly with rights/privacy judgment. If no actual public evidence was researched, omit the community claim or mark [Chưa xác minh], never generate fake 'netizens say'.
- **[Lão kể thêm] / [Châm biếm của biên tập]** — original author/assistant-created joke or satirical observation; explicitly marked original editorial humor, not a historical quotation, community consensus or historical fact.

### Reading experience rules
1. Insert compact inline comparison or reaction cards **immediately after the relevant sourced narrative beat**, without interrupting every paragraph.
2. Use persistent visual labels, different iconography and a visible source/action link; color alone must not encode evidence class.
3. Provide expand/collapse for secondary commentary, with a readable default on mobile; allow hide/show optional jokes and community reactions while never hiding essential historical context.
4. Editorial humor must not invent speeches, motives, private thoughts or facts. Punch up at political absurdities rather than present-day identity groups; avoid defaming modern people.
5. A community meme's existence is not evidence for the underlying event. Distinguish actual documented reaction, interpretive editorial summary and original joke.
6. Content completeness sweep now includes sourced community reception when materially relevant; lack of verifiable reactions is a documented gap, not permission to fabricate.
7. Every inline module links to evidence IDs/source locators, and optional reaction records have their own provenance and retrieval timestamp.

### Example structural treatment (illustrative, not approved historical prose)
- Historical beat: Liu Bei's documented participation against Yellow Turbans [Chính sử].
- Inline comparison: Peach Garden oath as a famous *Romance of the Three Kingdoms* literary episode [Tiểu thuyết].
- Community reaction: only when an actual public post or discussion has been located and verified [Cộng đồng].
- Original satirical observation: labeled [Châm biếm của biên tập], never attributed to historical actors or commenters.


## Mandatory storytelling contract — PO approved 2026-11-24

**Trigger:** When PO says “kể tiếp”, continue the historical narrative using this contract by default; do not require the PO to repeat storytelling requirements. Treat the fully rewritten EP-0001/2/3 as the style and reader-onboarding baseline, not early dry drafts.

1. **Vietnamese beginner-first:** Assume no knowledge of Eastern Han, Three Kingdoms, geography, offices, factions, dynastic family ties, or characters. Explain necessary context naturally *before* it becomes necessary to understand an event. Never throw out a name or era as if readers already know it.
2. **Political historical drama, not textbook chronology:** Each section has a compelling hook or paradox, comprehensible setting and stakes, organically introduced people, conflict, reversal, consequences and a forward-driving ending. Use varied pacing, vivid but sourced concrete details, and witty/gossipy Vietnamese storytelling without fake historical scenes.
3. **Character introduction = role now + reason to care + later impact:** When a significant character first appears, tell readers who they are in plain language, what they are doing, and foreshadow their future role, twist or consequence. Introduce no cast list just to dump names.
4. **Foreshadow and pay off:** Seed later events/character impacts and, when the hinted event arrives, explicitly connect it back to the earlier setup. Build cross-episode continuity. Hint enough to build suspense; do not reveal every twist in advance.
5. **Historical integrity:** Never fabricate historical dialogue, unverified motives, internal thoughts, dates or events. Distinguish [Chính sử], [Bùi chú], [Sử liệu khác], [Sử liệu mâu thuẫn], [Tiểu thuyết], [Truyền thuyết], [Đối chiếu], [Chưa xác minh], [Châm biếm của biên tập]. Embed source-vs-novel comparisons at the relevant dramatic beat, with traceable work/juan/source link, without breaking narrative unnecessarily.
6. **Natural, playful Vietnamese:** Conversational, occasionally sharp/sarcastic, not academic or monotonous; humor is modern editorial commentary, clearly labeled where needed. No dry 'Hook:', 'Scene N', 'Cliffhanger:' or writing-instruction scaffolding in reader-facing prose.
7. **Finish the work in a substantive pass:** Plan the arc, explain context, plant future hooks, write complete scenes, self-edit for coherence/pace/payoffs and source fidelity *before* presenting. Avoid tiny endless incremental rewrites and unnecessary approval loops within authorized scope.
8. **Project scope remains controlled:** “Kể tiếp” means continue prose content within the approved narrative direction; it is not permission to generate illustrations, modify UI or deploy. Request separate approval for genuinely new project phase/scope.
