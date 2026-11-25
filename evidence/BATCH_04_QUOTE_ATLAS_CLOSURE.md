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

## Additional exact quote candidates (unique reservation)
| ID | Person / EP | Original | Translation | Source/context |
|---|---|---|---|---|
| QTE-0039 | dong-zhao / 10 | 惟有移駕幸許耳。 | Chỉ còn cách dời xa giá tới Hứa. | 135 chính văn, 196 court relocation advice |
| QTE-0040 | gao-shun / 15 | 但患不見用耳。 | Chỉ lo người có tài không được dùng mà thôi. | 136 Bùi chú dẫn Anh hùng ký, repeated advice, no exact date |
| QTE-0041 | chen-gong / 15 | 老母在公，不在宮也。 | Mẹ già sống hay không ở ngài, không còn ở Cung. | 137 chính văn, after capture; do not merge with Điển lược |

## Per-person quote coverage disposition
Reviewed packet disposition, not proof that a person never spoke or that no other passage exists. Existing runtime quotes untouched; do not create a blank fake section. Additional quote research for material identities may still be required if a relevant primary passage remains unchecked.
| Person ID | Existing/reserved IDs | Reviewed evidence refs (B04 unless noted) | Disposition |
|---|---|---|---|
| cao-bao | No selected verified new quote in reviewed packet | 011–013 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| cao-cao | QTE-0001, QTE-0002, QTE-0003, QTE-0015; QTE-0031 | 004–009; 028–032,062–063; 033–037,066; 049–050 | Exact candidate witness above; check display date |
| cao-ren | No selected verified new quote in reviewed packet | 132; 041,132 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| cao-xing | No selected verified new quote in reviewed packet | 016 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| chen-deng | QTE-0023 | 024; 024,057,138; 138,024 | Preserve existing; no new quote selected from packet |
| chen-gong | QTE-0019, QTE-0020; QTE-0041 | 035–036 | Exact candidate witness above; check display date |
| chen-gui | No selected verified new quote in reviewed packet | 023–025; 097,023–025 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| cheng-pu | No selected verified new quote in reviewed packet | 093; 094 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| cheng-yu | QTE-0021 | 004; prior B03 | Preserve existing; no new quote selected from packet |
| chunyu-qiong | No selected verified new quote in reviewed packet | 080; prior 195 snapshot | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| dian-wei | QTE-0013 | 063 | Preserve existing; no new quote selected from packet |
| dong-cheng | No selected verified new quote in reviewed packet | 001–002; 045,049,134 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| dong-zhao | QTE-0039 | 005 | Exact candidate witness above; check display date |
| duan-wei | No selected verified new quote in reviewed packet | 038 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| gao-shun | QTE-0040 | 016; 033,035–036 | Exact candidate witness above; check display date |
| gongsun-zan | No selected verified new quote in reviewed packet | 039 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| guan-jing | No selected verified new quote in reviewed packet | 086 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| guan-yu | No selected verified new quote in reviewed packet | 047,120; 095,120 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| guo-jia | No selected verified new quote in reviewed packet | 034 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| guo-si | No selected verified new quote in reviewed packet | 133; prior 195 snapshot | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| guo-tu | No selected verified new quote in reviewed packet | 079–080 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| han-hao | QTE-0028 | 008; B03-070 | Preserve existing; no new quote selected from packet |
| han-xian | No selected verified new quote in reviewed packet | 025 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| hou-cheng | No selected verified new quote in reviewed packet | 035,139 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| hua-xin | No selected verified new quote in reviewed packet | 055 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| huang-zu | No selected verified new quote in reviewed packet | 054 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| ji-ling | No selected verified new quote in reviewed packet | 015 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| jia-xu | QTE-0035 | 076; 077 | Exact candidate witness above; check display date |
| ju-shou | QTE-0026 | 079–080 | Preserve existing; no new quote selected from packet |
| li-jue | No selected verified new quote in reviewed packet | 038 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| liu-bei | QTE-0008, QTE-0022 | 011,014–015; 045–048; 050–051 | Preserve existing; no new quote selected from packet |
| liu-biao | No selected verified new quote in reviewed packet | 030,032,076; prior B03 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| liu-xun | No selected verified new quote in reviewed packet | 053–054 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| liu-yao | No selected verified new quote in reviewed packet | 017,019,070–072 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| lu-bu | QTE-0025; QTE-0030 | 011–016; 023–025; 033–036 | Exact candidate witness above; check display date |
| mi-zhu | No selected verified new quote in reviewed packet | 014 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| ren-jun | No selected verified new quote in reviewed packet | 081–082 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| sun-ben | No selected verified new quote in reviewed packet | 116,017; 116 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| sun-ce | QTE-0027; QTE-0033, QTE-0038 | 017–020,065,070–071,078; 022,065,074; 053–059 | Exact candidate witness above; check display date |
| sun-fu | No selected verified new quote in reviewed packet | 091 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| sun-qian | No selected verified new quote in reviewed packet | 089 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| sun-quan | No selected verified new quote in reviewed packet | 054,060–061,067; 054 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| taishi-ci | QTE-0034 | 070–072 | Exact candidate witness above; check display date |
| tian-feng | No selected verified new quote in reviewed packet | 052 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| tian-kai | No selected verified new quote in reviewed packet | 039 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| wang-lang | QTE-0037 | 078 | Exact candidate witness above; check display date |
| wei-zhong | No selected verified new quote in reviewed packet | 041 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| wu-furen | No selected verified new quote in reviewed packet | 118 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| wu-jing | No selected verified new quote in reviewed packet | 017,117 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| xiahou-dun | No selected verified new quote in reviewed packet | 033,122 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| xiandi | QTE-0016 | 001–003,005–010 | Preserve existing; no new quote selected from packet |
| xun-you | No selected verified new quote in reviewed packet | 034 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| xun-yu | QTE-0011 | 004–005 | Preserve existing; no new quote selected from packet |
| yang-feng | No selected verified new quote in reviewed packet | 025 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| yu-fan | No selected verified new quote in reviewed packet | 078; 055 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| yuan-shao | QTE-0007 | 007; prior B03-072/073; 039,043 | Preserve existing; no new quote selected from packet |
| yuan-shu | QTE-0032 | 021–026,073–074; 042,075 | Exact candidate witness above; check display date |
| yuan-tan | No selected verified new quote in reviewed packet | 051,088 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| yue-jin | No selected verified new quote in reviewed packet | 090 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| zang-ba | No selected verified new quote in reviewed packet | 037 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| zao-zhi | No selected verified new quote in reviewed packet | 008–009; B03-069 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| zhang-fei | No selected verified new quote in reviewed packet | 012–013; 131 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| zhang-hong | No selected verified new quote in reviewed packet | 092 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| zhang-ji | No selected verified new quote in reviewed packet | 027 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| zhang-liao | No selected verified new quote in reviewed packet | 114 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| zhang-xiu | No selected verified new quote in reviewed packet | 027–032,062,076; 044,064,077 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| zhang-xun | No selected verified new quote in reviewed packet | 025 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| zhang-yan | No selected verified new quote in reviewed packet | 039,087; prior 192 snapshot | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| zhang-yang | No selected verified new quote in reviewed packet | 040–041 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| zhang-zhao | QTE-0036 | 065,067 | Exact candidate witness above; check display date |
| zhou-yu | No selected verified new quote in reviewed packet | 019; 053,061,069 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |
| zhu-zhi | No selected verified new quote in reviewed packet | 065 | Current evidence describes actions/office or insufficient exact attributable speech; no fake quote; broader biography quote search not exhaustive |

## Targeted quote recheck — 9 additional reservations
| ID | Person / EP | Original | Translation | Layer / source / evidence / context |
|---|---|---|---|---|
| QTE-0042 | xu-qiu / 16 | 昔蘇武困於匈奴，不隊七尺之節，況此方寸印乎？ | Xưa Tô Vũ gặp nạn nơi Hung Nô còn không đánh mất tiết trượng bảy thước, huống gì ấn nhỏ vuông tấc này? | [Sử liệu khác] 後漢書卷48 徐璆 L222 https://zh.wikisource.org/zh-hant/後漢書/卷48 · EVD-B04-144 · 199 sau trả ấn; 隊 nghĩa rơi/mất, không phải quân đội |
| QTE-0043 | zhu-ling / 17 | 今已遇，復何之？ | Nay đã gặp được người ấy, còn đi đâu nữa? | [Chính sử] 三國志卷17 朱靈 L171 https://zh.wikisource.org/zh-hant/三國志/卷17 · EVD-B04-143 · hồi tưởng lúc ở lại theo Tào sau chiến dịch Đào Khiêm; không gán năm 199 |
| QTE-0044 | yan-xiang / 13 | 漢室雖微，未若殷紂之暴也。 | Nhà Hán tuy suy yếu nhưng chưa tàn bạo như Trụ nhà Ân. | [Chính sử] 三國志卷06 袁術 L183 https://zh.wikisource.org/zh-hant/三國志/卷06 · EVD-B04-148 · cuối 195, hồi tưởng khi Thuật xưng đế |
| QTE-0045 | yu-jin / 14 | 青州兵同屬曹公，而還為賊乎！ | Quân Thanh Châu cũng thuộc Tào công, sao lại làm giặc? | [Chính sử] 三國志卷17 于禁 L145 https://zh.wikisource.org/zh-hant/三國志/卷17 · EVD-B04-149 · 197, phản ứng trước báo cáo cướp bóc, không quy cho toàn bộ lực lượng |
| QTE-0046 | zhang-yang / 10 | 天子當與天下共之 | Thiên tử phải cùng thiên hạ phụng sự. | [Chính sử] 三國志卷08 張楊 L159 https://zh.wikisource.org/zh-hant/三國志/卷08 · EVD-B04-154 · 196, không độc chiếm vua; dịch ý theo đoạn tiếp |
| QTE-0047 | xu-gong / 18 | 若放於外必作世患。 | Nếu để ở ngoài, ắt thành mối họa cho đời. | [Bùi chú] 三國志卷46 孫策 引江表傳 L152 https://zh.wikisource.org/zh-hant/三國志/卷46 · EVD-B04-147 · tấu biểu được thuật lại, trước 200; không có bản gốc còn được xác nhận |
| QTE-0048 | cao-xing / 11 | 不意萌狂惑不止。 | Không ngờ Manh cứ mê muội không dừng. | [Bùi chú] 三國志卷07 呂布 引英雄記 L142 https://zh.wikisource.org/zh-hant/三國志/卷07 · EVD-B04-158 · 196, lời tường thuật của Cao Tính, không chứng minh mọi cáo buộc |
| QTE-0049 | chen-gui / 13 | 勢不俱棲，可解離也。 | Thế ấy không thể cùng đậu một chỗ, có thể chia rẽ. | [Chính sử] 三國志卷07 呂布 L145 https://zh.wikisource.org/zh-hant/三國志/卷07 · EVD-B04-025 · 197, kế tách Hàn Xiêm/Dương Phụng khỏi Thuật |
| QTE-0050 | lu-bu / 15 | 明公將步，令布將騎，則天下不足定也。 | Minh công chỉ huy bộ binh, để Bố chỉ huy kỵ binh, thì bình định thiên hạ không khó. | [Chính sử] 三國志卷07 呂布 L146 https://zh.wikisource.org/zh-hant/三國志/卷07 · EVD-B04-035 · sau đầu hàng, lời đề nghị chứ không phải kế hoạch đã thực hiện |

## Effective per-person quote disposition (supersedes previous packet table where new records found)
| Person | Available existing/reserved QTE | Disposition |
|---|---|---|
| cao-ang | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| cao-bao | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| cao-cao | QTE-0001, QTE-0002, QTE-0003, QTE-0015, QTE-0031 | Use only the attested context and date; preserve old records |
| cao-ren | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| cao-xing | QTE-0048 | Use only the attested context and date; preserve old records |
| chen-deng | QTE-0023 | Use only the attested context and date; preserve old records |
| chen-gong | QTE-0019, QTE-0020, QTE-0041 | Use only the attested context and date; preserve old records |
| chen-gui | QTE-0049 | Use only the attested context and date; preserve old records |
| cheng-pu | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| cheng-yu | QTE-0021 | Use only the attested context and date; preserve old records |
| chunyu-qiong | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| dian-wei | QTE-0013 | Use only the attested context and date; preserve old records |
| dong-cheng | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| dong-zhao | QTE-0039 | Use only the attested context and date; preserve old records |
| duan-wei | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| gao-gan | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| gao-shun | QTE-0040 | Use only the attested context and date; preserve old records |
| gongsun-zan | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| guan-jing | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| guan-yu | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| guo-jia | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| guo-si | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| guo-tu | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| han-hao | QTE-0028 | Use only the attested context and date; preserve old records |
| han-xian | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| hao-meng | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| hou-cheng | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| hua-xin | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| huang-zu | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| ji-ling | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| jia-xu | QTE-0035 | Use only the attested context and date; preserve old records |
| ju-shou | QTE-0026 | Use only the attested context and date; preserve old records |
| kong-rong | QTE-0024 | Use only the attested context and date; preserve old records |
| li-jue | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| liu-bei | QTE-0008, QTE-0022 | Use only the attested context and date; preserve old records |
| liu-biao | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| liu-dai-199 | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| liu-xun | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| liu-yao | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| lu-bu | QTE-0025, QTE-0030, QTE-0050 | Use only the attested context and date; preserve old records |
| mao-jie | QTE-0010 | Use only the attested context and date; preserve old records |
| mi-zhu | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| ren-jun | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| shi-huan | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| sui-gu | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| sun-ben | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| sun-ce | QTE-0027, QTE-0033, QTE-0038 | Use only the attested context and date; preserve old records |
| sun-fu | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| sun-qian | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| sun-quan | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| taishi-ci | QTE-0034 | Use only the attested context and date; preserve old records |
| tian-feng | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| tian-kai | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| wang-lang | QTE-0037 | Use only the attested context and date; preserve old records |
| wang-zhong | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| wei-xu | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| wei-zhong | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| wu-furen | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| wu-jing | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| xiahou-dun | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| xiandi | QTE-0016 | Use only the attested context and date; preserve old records |
| xu-gong | QTE-0047 | Use only the attested context and date; preserve old records |
| xu-huang | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| xu-qiu | QTE-0042 | Use only the attested context and date; preserve old records |
| xun-you | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| xun-yu | QTE-0011 | Use only the attested context and date; preserve old records |
| yan-xiang | QTE-0044 | Use only the attested context and date; preserve old records |
| yang-feng | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| yu-fan | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| yu-jin | QTE-0045 | Use only the attested context and date; preserve old records |
| yuan-shao | QTE-0007 | Use only the attested context and date; preserve old records |
| yuan-shu | QTE-0032 | Use only the attested context and date; preserve old records |
| yuan-tan | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| yuan-xi | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| yue-jin | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| zang-ba | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| zao-zhi | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| zhang-fei | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| zhang-he | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| zhang-hong | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| zhang-ji | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| zhang-liao | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| zhang-xiu | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| zhang-xun | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| zhang-yan | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| zhang-yang | QTE-0046 | Use only the attested context and date; preserve old records |
| zhang-zhao | QTE-0036 | Use only the attested context and date; preserve old records |
| zhou-yu | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
| zhu-ling | QTE-0043 | Use only the attested context and date; preserve old records |
| zhu-zhi | No selected attributable quote in reviewed evidence | No verified suitable new speech from reviewed packet; optional quote absence, not assertion of exhaustive search or silence in all histories |
