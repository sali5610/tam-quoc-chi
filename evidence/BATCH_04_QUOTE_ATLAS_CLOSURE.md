# BATCH-04 — quote & variant checkpoint
Do not allocate production QTE IDs until registry collision check. Candidate research IDs local to this file; source IDs resolve to full work/juan URL in registry. Short exact anchors only; do not extend into unverified dialogue.
| Candidate | Speaker / context | Source | Original anchor | Vietnamese sense / limit |
|---|---|---|---|---|
| B04-Q01 | Lü Bu, 196 intervention | 015 卷07 呂布 | 術若破備 | Nếu Thuật phá được Bị…; excerpt of political rationale, not literal full speech |
| B04-Q02 | Cao Cao, 199 conversation | 046 卷32 先主 | 今天下英雄，唯使君與操耳 | Anh hùng thiên hạ hôm nay chỉ có sứ quân và Tháo; historical reported speech |
| B04-Q03 | Yuan Shu, 199 last complaint | 042 通鑑卷063 | 袁術乃至是乎 | Viên Thuật đến nông nỗi này sao; other historical source, not certain verbatim |
| B04-Q04 | Sun Ce, 200 succession | 059 卷46 孫策 | 舉賢任能 | Cất nhắc người hiền, dùng người có năng lực; excerpt only |
| B04-Q05 | Xun Yu, strategic comparison | 066 卷10 荀彧 | 度勝、謀勝、武勝、德勝 | Four advantages paraphrase categories; not one continuous quotation, retain as analytic summary |
| B04-Q06 | Wang Lang on Sun Ce | 068 卷13 王朗 裴注引漢晉春秋 | 策勇冠一世 | Sách dũng khí hơn người cùng thời; Bùi chú, not main text; dating of audience uncertain |
| B04-Q07 | Zhang Zhao to Sun Quan | 067 卷52 張昭 | 方今天下鼎沸，群盜滿山 | Thiên hạ lúc này sôi sục, loạn khắp nơi; succession context |
Candidate 05 should NOT become a literal quote; others require complete quotation boundaries, attribution review and unique ID allocation. No invented community commentary. See surface file for comparison guardrails; original Romance passage validation remains open.

## Additional verified anchors / ID reservation
Existing content/wiki/quotes.json has QTE-0001–0029, all distinct. Reserve QTE-0030–0037 here (not runtime import).
| ID | Person / EP | Original | Translation | Source and limit |
|---|---|---|---|---|
| QTE-0030 | lu-bu / 11 | 術若破備，則北連太山諸將，吾爲在術圍中，不得不救也。 | Nếu Thuật phá Bị, rồi nối thế lực phía bắc với Thái Sơn, ta sẽ bị vây trong thế của Thuật, không thể không cứu. | SGZ7 呂布 L142, EVD-B04-015; Chính sử https://zh.wikisource.org/wiki/三國志/卷07 |
| QTE-0031 | cao-cao / 17 | 今天下英雄，唯使君與操耳。 | Anh hùng thiên hạ hôm nay chỉ có sứ quân và Tháo. | SGZ32 046 chính văn |
| QTE-0032 | yuan-shu / 16 | 袁術至於此乎！ | Viên Thuật lại đến nông nỗi này sao! | SGZ6 袁術 Bùi chú dẫn 吳書, L183, EVD-B04-085; reported speech |
| QTE-0033 | sun-ce / 12 | 今日之事，當與卿共之。 | Việc hôm nay, ta sẽ cùng ông làm. | SGZ49 太史慈 071; after capture, exact date unclear |
| QTE-0034 | taishi-ci / 12 | 未可量也。 | Chưa thể đoán được. | SGZ49 071; response to hypothetical encounter, not self praise |
| QTE-0035 | jia-xu / 17 | 不如從曹公。 | Chi bằng theo Tào công. | SGZ10 賈詡 077; followed by three reasons |
| QTE-0036 | zhang-zhao / 18 | 方今天下鼎沸，群盜滿山。 | Nay thiên hạ sôi sục, giặc khắp núi. | SGZ52 張昭 067; short speech excerpt |
| QTE-0037 | wang-lang / 12 | 策勇冠一世，有儁才大志。 | Sách dũng khí hơn người cùng thời, có tài xuất chúng và chí lớn. | SGZ13 王朗 Bùi chú dẫn Hán Tấn xuân thu 068; retrospective, audience date uncertain; display timeline as 198+ not 196 |
QTE-0037 should be linked to EP18/198 bridge or withheld rather than prematurely inserted in EP12; reserve ID for the research context only. B04-Q04 succession quote boundary still requires review. QTE-0033/0034 directly checked SGZ49 L151; QTE-0030 SGZ7 L142; QTE-0032 corrected to exact SGZ6 Wu Shu variant. Do not import other candidates as exact until checked.

## Source and geography continuation
Full SGZ6 retrieved; see EVD-B04-079–080,083–085,088,097. Literary comparisons now recorded with exact chapter and locators EVD-B04-098–113; still outstanding chapter16/18/21/24 specifics. Atlas artifact resolution supersedes previous grouped unresolved list; inspect BATCH_04_ATLAS_RESOLUTION.json. Dataset site/region match is not historical coordinate proof.

## Further quote closure
| QTE-0038 | sun-ce / EP18 | 舉賢任能，各盡其心，以保江東，我不如卿。 | Cất nhắc hiền tài, để mỗi người tận tâm bảo vệ Giang Đông, ta không bằng em. | SGZ46 孫策 chính văn, EVD-B04-128; source-reported speech, not Romance division of duties. |
B04-Q04 superseded by QTE-0038; do not duplicate. 124 preserves Fuzi layer for ten victories. 121/123/125/126–127 distinguish literary additions. QTE-0031/0035/0036/0037 still require exact witness recheck before runtime import.

## Quote disposition — checked exact witness
- QTE-0031 exact SGZ32 L135 (今天下英雄，唯使君與操耳), pre-interception 199; no wine implied. QTE-0035 exact SGZ10 賈詡 Siku 魏志卷10 (不如從曹公); year 199 from SGZ1; narrative context 官渡 in biography not decisive battle. QTE-0036 exact SGZ52 張昭 (方今天下鼎沸，群盜滿山); after Sun Ce death. QTE-0037 exact SGZ13 王朗 L153, Bùi chú 漢晉春秋, retrospective after summons 198; retain date uncertainty. QTE-0038 exact SGZ46 孫策. All nine reserved IDs QTE-0030–0038 distinct from existing 29. QTE-0037 only show at retrospective beat; if not written leave reservation, no forced display.
- 129 and 130 close remaining specific grain steward / physician literary comparison; no verified date for 129, omit from dated sequence. Do not create quotes from literary-only doctors. No quote quotas; per-person remaining audit below remains required.
