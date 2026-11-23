# Phase 1 — 184 campaign source QA and character connections
Date: 2026-11-24. Status: direct digital-text inspection, **not print-edition verified**.

## Directly inspected
- SRC-0002: Fan Ye, 《後漢書》卷71 皇甫嵩朱儁列傳, https://zh.wikisource.org/wiki/後漢書/卷71 ; section 皇甫嵩, uprising / 長社 paragraphs.
- SRC-0012: Chen Shou, 《三國志》卷06, https://zh.wikisource.org/wiki/三國志/卷06 ; section 董卓, base text (outside Pei annotations).
- SRC-0013: Fan Ye, 《後漢書》卷9, https://zh.wikisource.org/wiki/後漢書/卷9 ; 中平六年 annals.

## Passage-level additions
| Evidence | Claim | Short literal anchor | Source | Notes |
|---|---|---|---|---|
| EVD-0032 | Zhang Jiao's movement described as organized into thirty-six 方 | 遂置三十六方 | SRC-0002, 皇甫嵩 | Source-reported organization; numbers are not independently measured |
| EVD-0033 | Court appoints Huangfu Song and Zhu Jun as commanders, with separate forces | 以嵩為左中郎將 | SRC-0002, 皇甫嵩 | Source passage also names Zhu Jun 右中郎將 |
| EVD-0034 | Zhu Jun loses to Bo Cai before Huangfu Song holds Changshe | 儁前與賊波才戰，戰敗 | SRC-0002, 長社 | Do not collapse separate encounters |
| EVD-0035 | Huangfu Song breaks siege using fire, then Cao Cao joins combined attack | 會帝遣騎都尉曹操將兵適至 | SRC-0002, 長社 | Narrative describes fire and later allied attack; exact tactical claims are source-reported |
| EVD-0036 | Dong Zhuo earlier sent against Yellow Turbans and defeated | 遷中郎將，討黃巾，軍敗抵罪 | SRC-0012, 董卓 base | Dong Zhuo belongs in EP-0002 as a sourced cameo; not only EP-0003 |
| EVD-0037 | Emperor Xian accedes in 189, ninth lunar month jiaxu day | 九月甲戌，即皇帝位，年九歲 | SRC-0013 | Duplicate claim of EVD-0030; DO NOT count as a new distinct fact |

## Historical interpretation boundaries
- 《後漢書》卷71 describes religious practices, organizational figures, violent acts and campaign losses from a later dynastic historiographical perspective. Attribute source-reported numbers, labels and tactics; do not present polemical language as neutral modern analysis.
- Zhu Jun, Huangfu Song and Cao Cao have different roles and timings. Do not turn the episode into one uninterrupted battle.
- Pei annotations in 《三國志》卷6 are distinct from the Dong Zhuo base passage.
- Source access does not certify a print edition, date conversion, or independent corroboration.
- EVD-0037 is a deliberate duplicate-claim detection record. Consolidate with EVD-0030 before structured import.

## Reader / Atlas consequences
- EP-0002: Zhang Jiao's organization → court mobilization → Zhu Jun's setback → Changshe fire attack and Cao Cao arrival → Dong Zhuo's separate failed campaign. Avoid asserting all occurred at Changshe.
- Character connections: Zhang Jiao ↔ Huangfu Song / Zhu Jun; Huangfu Song ↔ Cao Cao; Dong Zhuo ↔ Yellow Turbans (earlier failure); He Jin ↔ 184 mobilization.
- Atlas locations from source names only until historical geocoding and temporal geography are reviewed: 潁川, 長社, 汝南, 陳國. No fabricated lat/long.
- Do not draft narrative or public UI yet.
