---
title: Staff Engineers Are Quietly Becoming the New Overhead
date: 2026-04-24
topic: career-mindset
author: Adonis
source_url: https://medium.com/@kakamber07/staff-engineers-are-quietly-becoming-the-new-overhead-c90d8f832ccf
source_published: 2026-04-08
summary: AI 讓 Staff Engineer 的「廣度」工作變便宜，2.4x 薪酬正在 budget meeting 被默默質疑；生存策略是從 generalist reviewer 轉為 scarce decision maker
tags: [staff-engineer, career, ai-impact, role-evolution, engineering-management]
---

# Article and Discussion Analysis: Staff Engineers Are Quietly Becoming the New Overhead

> 產生時間：2026-04-24
> 作者：Adonis｜發表：2026-04-08｜8 min read｜1.1K claps / 84 comments
> 副標：Nobody's getting laid off. Roles are just quietly disappearing from budget spreadsheets.

---

## 1. 此篇文章探討什麼問題？

### 表層議題

> Staff Engineer 正從預算表上悄悄消失。沒有頭條式裁員，只是個別角色在 spreadsheet 上被點到名。

作者描述一個 VP 在 Q3 headcount meeting 上指著 Staff Engineer 欄位說「that's where we need to have a hard conversation」，整間公司心知肚明、但沒人把話說透。再加上他從四、五家公司的朋友聽來的類似故事：提問、轉入「special projects」、自己先離職。

### 底層真正的問題

> **當 AI 讓「廣度」這件事變便宜後，以廣度為核心定價的角色會被重新估值。2.4x 薪酬差該對應到什麼「還只有人類能做」的工作？**

這篇文章真正在辯論的不是「Staff Engineer 會不會死」，而是：

> **判斷力（judgment）與執行力（execution）的價差正在被 AI 重新校準，廣度不再是 moat，深度判斷才是。**

作者把 Staff 的時間解剖成 30% code review / 25% architecture / 20% mentor / 15% 寫 code / 10% meetings，然後指出：**code review 被 AI 吃掉約 60%、mentoring 被部分取代、寫 hard code 的「hard」定義一直在縮**。剩下真正稀缺的是「看到六個月後才會浮現的問題」的系統判斷力——而這也是 staff-engineer 朋友對他說「我每週只有兩小時工作真的需要我的判斷」的那兩小時。

### 為何重要

- 對 **現任 Staff Engineer**：影響接下來 12~24 個月的角色存續與薪酬談判籌碼。
- 對 **Mid-level**：AI 讓你「看起來」可以做 Staff 的事——但這是雙面刃，升遷通道可能消失或改名。
- 對 **Engineering Manager / Director**：budget 壓力下要選誠實對話還是讓人默默蒸發。
- 對 **企業決策者（CTO / VP Eng）**：過度砍 Staff 等於把「六個月後才爆的問題」變成真的會爆，MTTR 與事故賠款會反撲省下的薪資差。

### 誰會被影響

- **主要受衝擊**：以 generalist code reviewer / 程式碼百科 為主要輸出的 Staff Engineer
- **次要受衝擊**：Mid-level（升遷天花板可能提前）
- **受益方**：Finance / CFO 視角的 headcount planner（有新的壓薪資 narrative）
- **暫時未受影響**：Junior（作者正確指出先學 fundamentals，politics 可以晚點再擔心）

### 產業 / 職涯轉變意涵

這不是又一篇「AI 會取代工程師」的炒作文。**它真正在描述的是：AI 時代的工程組織正在把薪資結構從「以年資 / 廣度定價」轉向「以不可替代性定價」**。未來兩年會看到「Staff Engineer 頭銜還在、pay grade 還在、但做的事完全不同」的組織大量出現。

---

## 2. 觀點結構是什麼？

| Layer | Argument | Meaning |
|---|---|---|
| Problem framing | budget spreadsheet 上的 Staff Engineer 欄位開始被質疑 | 裁員這波不走新聞，走 headcount planning |
| Cause | Staff 成本 2.4x mid-level，但 AI 填掉 Staff 原本 ~60% 可模仿工作 | 不是 Staff 變差，是 gap 變窄、廣度變便宜 |
| Impact | 三家公司的 pattern：question → special projects → self-exit | 不是 mass layoff，是 quiet & individual |
| Suggested direction | 四個 survival moves：專家化、綁 revenue、說 No、對「只有你能做的事」誠實 | 從「廣度」轉向「narrow but unreplaceable」 |
| Final thesis | 角色不會死但會變到「同名不同物」；等通知不如自己先動 | 主動重塑 > 被動等待；waiting to be told is worse |

這篇的論證品質比多數「AI 取代 X」的文章好，原因是**作者把 Staff Engineer 的工作解剖成百分比再逐項檢查 AI 的覆蓋率**，而不是籠統地講「AI 讓工程師變快」。這個做法把炒作與事實分得比較乾淨。

---

## 3. 是否有解決方案？

### 解法層級：L2 + 半個 L3

作者給了角色層級的策略（L2），部分觸及到具體行動（L3），但沒到完整框架（L4）。

### 作者提出的 4 個 survival moves

1. **從 generalist reviewer 變 specialist decision maker**：停止 review 每一個 PR，只在沒人能做的架構決策時出現。「Less visible but more essential」。
2. **綁到 revenue**：「我設計了 payment system」vs「我讓 code quality 變好」——前者是 revenue dependency，後者是 cost center，在 budget meeting 上是兩個世界。
3. **學會說 No**：Staff 過去靠 always-available 往上爬，現在這反而讓你 spread thin on work that increasingly doesn't need you。Narrow value is harder to cut。
4. **對「哪些事真的只有你能做」誠實**：不是舒服的誠實，是那種會讓人不舒服的誠實——「這個 meeting 不需要我」「這個 review 不需要我」「這個決策需要我」。

### 是否可執行

方向對、但缺幾個關鍵環節：

- **政治層面**：「I review nothing」在多數組織會被解讀成「不合作、不 helpful、不 team player」。作者沒處理這個轉換期怎麼跟 manager / peers 溝通。
- **機會取得**：revenue-attached 工作在很多中大型企業早就被 director 或跨組 architect 把持，Staff IC 要怎麼擠進去？作者沒給路徑。
- **時間表**：3 個月？6 個月？一年？從 generalist 轉 narrow specialist 要多久，中間的考核怎麼辦？
- **說 No 的成本**：不同組織文化、不同 manager，說 No 的代價差很多。作者的建議默認「大家都會理解」，但現實常常不會。

### 缺少什麼、如何補強

- **補 transition playbook**：怎麼跟 manager 主動談角色重塑、用什麼 narrative、給什麼 artifact（ADR、design review cadence、office hours）證明自己還 essential。
- **補產業別分析**：金融 / 醫療 / 受監管產業的 Staff Engineer 不可替代性遠高於 SaaS，這篇完全沒區分。
- **補組織制度面**：個人 survival 講完了，組織層面呢？CTO 裁 Staff 前應該先檢查什麼？

---

## 4. 是否有盲點？

### A. 誇大

標題「Becoming the New Overhead」偏煽動，但作者後續自己有軟化，算是自我修正。比較關鍵的是這一句：

> "A mid-level engineer with Cursor or Copilot can now produce code that, honestly, looks a lot like what a staff engineer would have written two years ago."

留言 Bernard Igiri 直接點到：

> "Syntax isn't engineering. Claude doesn't have a credible model of whatever it is you are building. Large Language Model—syntax."

這句話本身**在 finance 眼裡會被讀成「mid + AI ≈ Staff」**，放大了可替代性。作者在文中有說「Not always, not for everything」，但這種澄清擋不住 CFO 快速掃 headline 的傷害。

### B. 缺少企業脈絡

完全沒區分產業與組織規模：

- **金融 / 保險 / 醫療 / 受監管產業**：Staff Engineer 背負 audit 責任、合規簽核、事故當責。裁 Staff 不是省薪資，是把罰款風險內化。
- **新創（20~50 人）**：Staff Engineer 本來就綁 revenue，這篇描述的根本不是他們。
- **中大型（400+ 人）**：才是作者真正在講的對象，但他沒說清楚。

這會讓不同讀者誤用文章的結論。

### C. 缺少維運現實

作者寫「AI handles maybe 60% of what staff engineers used to catch in code review」——然後輕描淡寫地帶過剩下的 40%。

> **那剩下的 40% 就是正式環境會出事的那 40%。**

具體是什麼？作者自己也講了：「not the architectural concerns, not the 'this will cause a problem at scale' observations」。這剛好是：

- 隱性耦合（implicit coupling）與跨服務 race condition
- 非功能性需求（NFR）的長期影響：效能、一致性、可恢復性
- 資料遷移、schema 演進的回溯相容風險
- Incident response 時的 pager escalation 路徑

**Staff Engineer 的不可替代性應該用「事故發生時 MTTR 會差多少」來估，不是用 code review 速度。** 作者沒算這筆帳，CFO 更不會算。

### D. 缺少人才培育問題

這是最大的盲點。留言 Paul Riley 已經直接點到：

> "Juniors who are having their mentors replaced with statistical word generators... they're going to consider themselves senior when they have to learn how to [actually engineer]."

作者有一段說「If you're junior, don't worry about this yet」——這是片面的。真正的問題是：

> **如果今年砍掉 20% 的 Staff Engineer，3 年後 mid-level 升 Staff 的 talent pipeline 從哪裡來？**

AI 能教 syntax、能給 explanation、但教不了「跨系統的直覺判斷」——那需要在實戰中被 Staff mentor 帶著犯錯、復盤、打過幾次生產環境事故才長得出來。這個 pipeline 斷掉，下一代 Staff 就得靠自學，良率會很差。

### E. 缺少治理模型

「Review nothing, only get pulled in for architectural decisions」聽起來很乾淨，但：

- **哪些決策算 architectural？** 誰 gate-keep？
- **如果 Staff 不 review，mid + AI 直接 merge，codebase 的長期健康怎麼監測？** 熵增誰負責？
- **怎麼讓 scarce 同時 visible？** 作者承認「less visible but more essential」——但在 budget meeting 上「less visible」就是死亡訊號。

作者沒談 ADR / RFC 流程、Staff office hours、weekly architecture review 這類能讓 narrow value 被組織看見的制度設計。Individual 層面的建議多，系統層面的建議少。

---

## 5. 如果有盲點，建議解決方案是什麼？

| Blind Spot | Why It Matters | Recommended Fix |
|---|---|---|
| 「mid + AI ≈ Staff」的敘事會誤導 finance | CFO 不讀細節，只看 headline 做預算決策 | 把 narrative 改成「AI 讓 pattern-matching 便宜了，但 system-judgment 沒便宜」；把 2.4x 的價值重新綁在後半（事故避免、決策品質） |
| 忽略產業別與組織規模差異 | 同一篇文章在 SaaS 與金融業會導出相反結論 | 分 unregulated / regulated 討論；分 <50 人 / 50~500 / >500 討論；Staff 的不可替代性在 regulated + 大組織最高 |
| 60/40 的 40% 是事故源頭沒強調 | 砍 Staff 省的薪資可能換來更長 MTTR 與更高事故成本 | 算「Staff 年薪 × 人數」vs「預期事故成本上升 + MTTR 變化 × incident 次數」的真實 ROI，而非純 cost |
| Talent pipeline 斷裂 | 3 年後組織沒有能升 Staff 的 mid-level 可用 | 設計 "AI-augmented Staff track"：讓 mid-level 有計畫地接觸跨系統判斷題（shadow incident、主筆 ADR、輪調 architecture review）；Staff 的 mentoring 時間改成 structured 而非 ad-hoc |
| 個人建議多、制度設計少 | 「review nothing」沒配套會被解讀成「不合作」並反噬 | 組織層面要同步建 ADR/RFC 流程、Staff office hours、weekly design review、Technical Spec Sign-off gate——讓 Staff 的 scarce work 有組織可見的 artifact |
| 缺少 transition playbook | Staff 知道該轉但不知道怎麼啟動 | 提供 90 天轉型範本：第一個月盤點時間、第二個月跟 manager 重訂 OKR、第三個月產出第一個 judgment artifact（ADR / architecture review） |

---

## 6. 歸納關鍵字學習

這篇是職涯趨勢文，關鍵字偏 role evolution / organization design，技術關鍵字較少。

| Keyword | 中文說明 | Why It Matters | Learn Next |
|---|---|---|---|
| Staff Engineer Archetypes | Staff Engineer 四原型（Tech Lead / Architect / Solver / Right Hand） | 自己是哪一型、哪一型在 AI 時代比較抗壓縮 | Will Larson《Staff Engineer》、StaffEng.com |
| Judgment-based work | 以判斷力為核心的工作 | AI 時代真正稀缺的那 2 小時就在這裡 | 刻意練習寫 ADR、主持 design review |
| ADR / RFC | Architecture Decision Record / Request for Comments | 把不可見的判斷變成可驗證的 artifact，解決「scarce 但 invisible」問題 | adr-tools、Kubernetes KEP 流程、Rust RFC 流程 |
| Revenue-attached engineering | 與營收直接相關的工程 | budget 寒冬的護身符：從 cost center 變 revenue dependency | 讀自家公司 P&L、哪些系統直接決定 ARR |
| Cost center vs revenue dependency | 成本中心 vs 營收依賴 | 跟 finance 溝通的 narrative 切換 | 讀 CFO 視角的 engineering ROI 論述 |
| Narrow value | 收窄的價值定位 | 廣度被 AI 填便宜後的對策；narrow value is harder to cut | 選一個具體 domain（payment / search / billing）深挖 |
| Scarce but visible | 稀缺但可見 | Staff 2026 的生存原則：不是躲起來，是少出現但每次出現都有重量 | 建立個人 ADR cadence、quarterly design review |
| AI-augmented code review | AI 輔助程式碼審查 | 了解 AI 還 catch 不到的 40% 在哪，才能證明人類 Staff 還值得 | 記一個月的 AI review miss 清單 |
| Mentorship pipeline collapse | 導師制斷鏈 | 組織 3 年後人才問題的預警 | 內部 Staff track 設計、shadow programme |
| Talent arbitrage | 人才套利 | Finance 視角：用 mid + AI 取代 Staff 的會計算盤 | 讀 finance-side 的 engineering headcount 分析（非 engineering blog） |
| Systems thinking | 系統思考 | 「六個月後才會爆」那種判斷力的底層能力 | Donella Meadows《Thinking in Systems》、Gall's Law |
| Incident response & MTTR | 事故應變與平均復原時間 | Staff 價值最硬的護城河：你在、MTTR 就短 | 自家 incident post-mortem、Google SRE Book Ch.14 |

---

## 7. 對使用者的實務 / 職涯建議

### A. 職涯定位

#### 如果你是 Staff Engineer

1. **立刻做時間盤點**：把上週的日曆切成「code review / architecture / mentor / 寫 code / meetings」五類，算百分比。如果 code review 超過 20%，高風險區；架構決策低於 20%，紅燈。
2. **找一個 revenue-attached 專案黏上去**：不是「讓 code 變好」，是「我讓 payment / search / checkout 這條線可靠」。讓你的 resume narrative 從 quality metric 改成 business metric。
3. **建立 judgment artifact cadence**：每季至少 2 份 ADR、每月至少 1 場 design review 主筆。讓「scarce but essential」變成組織看得見的東西。
4. **主動跟 manager 談角色重塑**：不要等 budget meeting 的結果。帶著「我未來 6 個月要減少 X、增加 Y」的提案去談，而不是被動接任務。
5. **對自己誠實**：作者的原話——「this meeting doesn't need me / this review doesn't need me / this decision does need me」。每週花 15 分鐘做這個盤點，然後實際退出不需要你的場子。

#### 如果你是 Mid-level Engineer

1. **別高興太早**：升遷通道可能消失或改名。公司裁 Staff 的同時**不會把 Staff 的工作給你並加薪**，只會給工作。
2. **刻意練習跨系統判斷**：AI 填不起來的就是這塊。不是學更多 framework，是學「在資訊不完整時做合理決策」——主動要 shadow 一場 incident、主動寫一份有疑慮的 ADR 交給 Staff 看。
3. **觀察「剩下的那 40%」**：把 AI code review miss 的 case 記下來，一個月後你就擁有一份「人類 Staff 還能 catch 什麼」的實證清單——這是你自己升 Staff 的材料。
4. **先想好談判條件**：如果公司只剩少數 Staff，你被迫要做 Staff 的事情時，怎麼主張升級 / 加薪。

#### 如果你是 Engineering Manager / Director

1. **誠實對話 >> 默默改組**：作者原話——「one is harder, the other is crueler」。你沒有第三個選項。
2. **設計 AI-augmented Staff track**：Staff 的時間從 generalist review 轉到少數高 leverage 決策，並**同時**給組織可見的 artifact（ADR / architecture review）作為 performance 依據。
3. **保住 mentorship pipeline**：如果你打算減少 Staff 人數，至少把 Staff 的 mentoring 時間從 ad-hoc 改成 structured（shadow programme、rotation、主筆 ADR 評點）。不然三年後你自己會缺人。

### B. 技術學習路徑（P0~P3）

注意：這是職涯文，P0/P1 偏職涯 + 能力組合，非純技術。

| Priority | Topic | Reason |
|---|---|---|
| P0 | **Judgment artifacts**（ADR / Design doc / RFC） | 把判斷變可驗證的 artifact，解決 scarce-but-invisible 的要命問題 |
| P0 | **Business literacy**（P&L、ARR、unit economics） | 綁到 revenue 的前提是聽得懂 revenue 的語言 |
| P1 | **AI-augmented code review 盲區** | 用實證證明自己還 catch 得到 AI miss 的事 |
| P1 | **Systems thinking / dependency modeling** | 「六個月後會出事」那種預測能力的底層 |
| P1 | **Incident response + MTTR** | Staff 最硬的護城河 |
| P2 | **組織制度設計**（office hours、weekly design review、RFC gate） | 讓 narrow value 被組織看見 |
| P3 | **Staff+ 社群**（StaffEng.com、Rands in Repose、Lara Hogan） | 長期職涯 signal 收集 |

### C. 企業導入建議

CTO / VP Eng 在裁 Staff Engineer 前，建議強制走完這張 checklist：

1. **我們裁的是哪一型的 Staff？** generalist reviewer / codebase encyclopedia / architectural judge？**只裁前兩者，留最後一者。**
2. **我們是受監管產業嗎？** compliance / audit 責任有沒有落在 Staff 身上？失去之後誰簽核？
3. **這個 Staff 過去 12 個月被拉進多少 P0 / P1 incident？** 沒有他，MTTR 會變多長？事故賠款 / 客戶流失成本是多少？
4. **有沒有替代的 architecture gate？** ADR 流程、design review cadence、RFC sign-off——還是我們只是把工作「默默地省下」讓 mid + AI 自行 merge？
5. **3 年後組織的下一代 Staff 從哪來？** 現在的 mid-level 升 Staff 的 pipeline 還在運作嗎？還是我們把自己三年後的招聘難度內化了？

如果這五題都沒有好答案，那裁 Staff 不是省錢，是把成本遞延 + 放大。

---

## 8. 最終結論

這篇文章不應該被解讀為「Staff Engineer 要死了」，而應該被解讀為一個訊號：**AI 把「廣度」這件事變便宜了，所以以廣度為主要定價的角色首當其衝——但深度判斷、系統思考、跨團隊架構權衡沒變便宜，反而變更稀缺**。

實務上的回應不是恐慌、不是否認、也不是等 manager 來告知。是：

> **主動把自己的工作從「廣而 always-available」重塑為「narrow but unreplaceable」，並且在組織裡建立可見的 judgment artifact，讓 budget meeting 上 CFO 看到的是你的 ADR 與事故避免紀錄，而不是 code review 次數。**

這篇有個微妙但重要的洞見：**等通知不如自己先動**。作者結尾那句「the VP looked uncomfortable, like he was about to do something he didn't enjoy—that's somehow worse than if he'd been eager about it」，講的其實是整個業界的氣氛——這波壓縮不是 dramatic、不是 aggressive，就是一種疲憊的預算計算。不會有 rally、不會有 headline。所以 individual 必須自己把自己拉出風暴圈。

留言區的集體情緒也值得注意：Bernard Igiri 的「syntax ≠ engineering」是必要的反論，但對 budget-holder 無效；Mark Grandau 補充這波會蔓延到其他工程學科（mechanical / electrical），擴大了 scope；Paul Riley 點出 junior mentorship pipeline 的斷裂，是作者沒處理的大洞。這些留言加起來說的是同一件事：**作者的問題診斷對，但組織層面的治理還沒人認真想**。

所以如果你是 Staff，這篇不是叫你 panic，是叫你從今天開始把自己的工作做 audit、重塑、並且**刻意讓你的價值被看見**。Narrow value is harder to cut——但前提是那個 narrow value 要有人能認得出來。
