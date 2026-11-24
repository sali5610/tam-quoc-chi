# Tam Quốc Chí — Historical Storytelling

Vietnamese cinematic history reader + Wiki + Historical Atlas, centered on Trần Thọ's 《三國志》 with distinct Bùi Tùng Chi commentary and other source layers.

**Canonical production site: Visual System v6 on free GitHub Pages.** [Open Tam Quốc Chí](https://sali5610.github.io/tam-quoc-chi/). Repository is currently public despite personal-use intent; no access-control guarantee.

React + TypeScript + Vite + Leaflet; Markdown/JSON and localStorage. No backend, paid services or Vercel. Run npm install and npm run dev locally; npm run build validates/builds content and retrieves the Atlas dataset/portraits.

Read AGENTS.md, docs/LATEST_HANDOFF.md, docs/DECISION_LOG.md, docs/HISTORICAL_RULES.md, docs/BATCH_DELIVERY_RULES.md and content/manifest.json before work. One scoped batch per chat; no release without PO authorization. Keep evidence and source provenance distinct from editorial and presentation layers.

Chat 00 reconciliation is docs-only; do not merge/deploy merely to update docs.

Publication uses only the Vite `dist` artifact at the repository root URL. Historical `docs/` prototypes remain archival source files, not a second hosted site. CI runs on GitHub runners; no publicly hosted preview. The old `/react-preview/` URL is retired. Existing same-origin localStorage keys and hash routes are unchanged.

All future content batches must meet the v6 end-to-end Reader/visual/motion/Wiki/Atlas delivery contract in docs/BATCH_DELIVERY_RULES.md; prose completion is not release readiness.
