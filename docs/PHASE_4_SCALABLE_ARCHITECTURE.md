# Phase 4 — Scalable Architecture
PO approved 2026-11-24. GitHub Pages free only. Preserve current docs/index.html until replacement passes integration checks.

## Content model
Era > Arc > Chapter > Episode > Event > Evidence. Stable opaque IDs independent of display titles and ordering. People, places, factions and sources are cross-linked entities, not duplicated tree children. Chronological ordering separate from IDs. Unwritten content must be marked planned, never fabricated.
## Navigation
Global: Home, Story Library, People, Atlas, Collection. Search accessible globally. Desktop expandable sidebar; mobile drawer; breadcrumb and episode-local scene index. Previous/next follow manifest order. Hash routes for GitHub Pages; direct links to episode, event and person. Preserve reading anchor when opening contextual sheets. Reveal spoilers only after explicit action; browsing ahead is deliberate.
## Foundation
React + TypeScript + Vite, static output, relative base. Markdown source files remain canonical; generate validated manifest and per-episode payloads at build time. Lazy load episode payloads; static search index; local versioned bookmarks/progress. No backend, paid services or Cloudflare. Preserve cinematic motion, opt-in sound, reduced motion and source distinctions.
## Migration gates
4A: manifest, stable IDs and schema validation.
4B: React shell, routes, responsive tree navigation.
4C: migrate reader, wiki, atlas, motion, source notes, bookmarks and search.
4D: build and test; verify parity with existing preview; publish replacement only after checks.
Do not mark implementation complete merely because documentation exists.
