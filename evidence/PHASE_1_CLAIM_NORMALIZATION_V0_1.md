# Phase 1 — Claim normalization and evidence ID reconciliation
Date 2026-11-24. This is a non-destructive audit. Prior records remain immutable for traceability.

## Identity model
- An **EVD ID** denotes a passage-level record; multiple EVDs can describe one claim.
- A **CLM ID** denotes one historical proposition; distinct passages can support the same CLM.
- An **SRC ID** denotes an online witness/work-section, not a print edition or independent author.
- Source count is not independent corroboration count; later historians may rely on predecessors.

## Known duplicates
| Canonical claim | Records | Normalization action |
|---|---|---|
| CLM-0001 Lingdi accession 168 | EVD-0015, EVD-0017 | Keep both archival IDs; group under one claim, do not count as two historical events |
| CLM-0002 Dou Wu / Chen Fan court crisis 168 | EVD-0016, EVD-0018 | Same action |
| CLM-0003 Emperor Xian accession 189 ninth lunar month jiaxu | EVD-0030, EVD-0037 | Same action; latter explicitly flagged duplicate |
| CLM-0004 Sun Jian 184 Yellow Turban participation | EVD-0014, EVD-0021 | Same campaign claim, with distinct passage locators if confirmed |
| CLM-0005 Liu Bei fought Yellow Turbans under Zou Jing | EVD-0011, EVD-0020 | Same passage, do not treat as independent corroboration |
| CLM-0006 Peach Garden oath as Romance chapter 1 narrative | EVD-0023 and literary source note | Literary motif only, not historical event |
| CLM-0007 Lingdi party-prohibition amnesty in 184 | EVD-0026 | Single located passage, cross-check pending |

## Normalization policy
1. Never renumber published EVD IDs or delete old evidence notes.
2. In downstream data, map every EVD to CLM and preserve source and textual layer.
3. No automatic confidence increase when multiple records quote the same underlying work.
4. Editorial claim status: located / cross-checked / edition-collated / PO-reviewed / published.
5. Historical date precision: year, lunar month, sexagenary day, and Gregorian conversion are separate fields.
6. A negative historical claim such as 'Peach Garden oath never occurred' is NOT authorized by absence in cited histories.

## Pending mechanical audit
Other potential duplicates require line-by-line comparison of the entire registry and addenda before ingest. This file is a *known-duplicate resolution*, not a claim that all records are normalized.
