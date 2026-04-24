---
name: article-discussion-analysis
description: Deeply analyze a technical article, its comment/discussion section, and any follow-up conversation. Converts scattered article content, community reactions, and user reflections into a structured analytical report. Use when the user asks to 分析文章、整理觀點與盲點、從文章萃取方法論、或產出職涯 / 學習建議；也用在使用者提供文章連結、貼文截圖、留言串、或先前討論內容並要求深度整理時。特別適用於 DevOps、Platform Engineering、SRE、AIOps、AI Infrastructure、LLMOps、AI SDLC、Agentic Workflow、Cloud Architecture、軟體工程趨勢、企業 IT 轉型等主題。
---

# Article Discussion Analysis Skill

## Purpose

把一篇技術文章 + 留言 + 使用者反思，轉成結構化的分析報告。
不只做摘要，而是抽出：核心問題、論證結構、解決方案、盲點、留言反論、實務建議、學習關鍵字、職涯 / 實作意涵。

---

## When to Use

當使用者說出以下任一類型的請求時觸發：

- 幫我分析這篇文章
- 整理這篇文章、留言和我們的討論
- 這篇文章在講什麼？
- 這篇文章有什麼盲點？
- 幫我整理成觀點、結論、反思
- 幫我整理成可學習的關鍵字
- 幫我生成職涯建議
- 幫我把文章變成方法論
- 幫我從文章中找出趨勢和應對策略

或使用者提供以下輸入之一：文章全文、文章網址、留言文字、截圖轉錄、使用者自己的解讀、先前對話、目標使用情境（職涯規劃 / 學習 / 架構設計 / 內部分享 / LinkedIn / Medium / 企業提案）。

---

## Workflow

執行分析時，依序完成以下步驟：

0. **分類與落檔計畫（動筆前必做）**：讀完輸入後，**先**決定 topic 與檔案位置，才開始分析內容：
   1. 從合法 topic 清單選**主** topic：`ai-ml`、`devops-infra`、`product-engineering`、`career-mindset`、`misc`（判準、tie-breaking、範例見 `references/topic-taxonomy.md`）。
   2. 跨類文章用「作者核心命題 > 讀者最大 takeaway」決定主軸，次要面向放 `tags`。
   3. 無法 confidently 歸類 → **預設寫 `_inbox/`**（不會上站），不要用 `misc` 迴避。
   4. 檔案規格：
      - 路徑：`topics/<topic>/analysis-YYYYMMDD-slug.md`（或 `_inbox/analysis-YYYYMMDD-slug.md`）
      - slug：小寫 kebab-case，取原文標題的 3~6 個英文字（中文標題自己音譯或濃縮為英文短句）
      - `date`：**分析產出日（今天）**，不是原文發表日；原文發表日放 `source_published`
   5. **開始寫分析前，在對話中先宣告**：「我把這篇歸到 `<topic>`，因為 ...」，讓使用者有機會在內容產出前糾正。
1. **確認輸入類型**：判斷使用者提供的是文章全文、URL、留言、截圖、或先前討論。若只有 URL，先用 WebFetch 抓取內容。
2. **選擇輸出格式**：依使用者需求決定用「完整版」或「精簡版」輸出（見 `assets/output-templates.md`）。
3. **套用核心分析框架**：依 8 個步驟進行分析（見 `references/analysis-framework.md`）。
4. **遵守品質規則**：套用 6 條 Analysis Quality Rules（見 `references/quality-rules.md`）。
5. **產出交付物**：依使用者情境選擇適合的 Deliverable 類型（見 `references/deliverables.md`）。
6. **落檔（寫檔案，不是貼聊天室）**：用 `Write` tool 把完整分析寫入 Step 0 決定的路徑。檔案開頭**必須**是 YAML front-matter（完整欄位規格見 `assets/output-templates.md` 的「必備：YAML Front-Matter」段）；`title` / `date` / `topic` 為必填，缺一個 `lib/posts.ts::parsePost` 會直接炸。
7. **最終檢查**：跑完 Final Checklist 才回覆（見本檔末段）。

---

## Core Analysis Framework（8 Steps）

詳細內容請讀 `references/analysis-framework.md`，以下為摘要：

1. **What Problem Is the Article Discussing?** — 不要停在標題，抽出底層真正的問題。
2. **What Is the Argument Structure?** — 把文章拆成 Claim → Reason → Evidence → Conclusion 的論證鏈。
3. **Does the Article Provide a Solution?** — 用 L0~L4 分級解決方案的實務可行性。
4. **What Are the Blind Spots?** — 從 5 個角度檢查：誇大、企業脈絡、維運現實、人才培育、治理模型。
5. **What Counterpoints Appear in Comments?** — 分類留言：同意 / 修正 / 反駁 / 實務補充 / 焦慮 / 系統性議題 / 低價值。
6. **Recommended Fixes for the Blind Spots** — 每個盲點都要給可執行的修正方案。
7. **Extract Learning Keywords** — 產出關鍵字表（英文 + 中文說明 + 為何重要 + 下一步學習）。
8. **Provide Practical Recommendations** — 職涯建議 / 技術路徑 / 企業導入建議。

---

## Analysis Quality Rules（必守 6 條）

完整說明在 `references/quality-rules.md`。摘要：

1. **Do Not Trust the Title** — 標題常為了吸引注意而誇大，要區分 headline / actual argument / evidence。
2. **Separate Trend from Hype** — 每個強聲明都要分類：Real trend / Partially true / Hype / False framing。
3. **Always Ask "What Still Requires Human Judgment?"** — AI 類文章要明確指出哪些事仍需人類決策。
4. **Convert Anxiety into Strategy** — 不要只說「AI 會改變一切」，要說「哪一層變便宜、哪一層變值錢」。
5. **Respect Enterprise Reality** — 金融 / 醫療 / 受監管產業，永遠要考慮 audit / approval / rollback / 權責。
6. **Include Comment-Section Intelligence** — 留言常揭露文章被誇大之處，把它當作 field signal。

---

## Output Format

完整版與精簡版模板見 `assets/output-templates.md`。

完整版結構：

```markdown
# Article and Discussion Analysis

## 1. 此篇文章探討什麼問題？
## 2. 觀點結構是什麼？
## 3. 是否有解決方案？
## 4. 是否有盲點？
## 5. 如果有盲點，建議解決方案是什麼？
## 6. 歸納關鍵字學習
## 7. 對使用者的實務 / 職涯建議
## 8. 最終結論
```

精簡版結構：

```markdown
## 核心問題
## 主要觀點
## 解法
## 盲點
## 修正建議
## 關鍵字
## 結論
```

---

## Language & Tone

- 使用繁體中文（台灣用語）。
- 專業詞彙對照表見 `references/taiwan-terminology.md`。
- 語氣：嚴謹、實務、略帶批判、不盲目中立、不跟隨炒作、明確指出弱論證。

---

## Deliverable Types

依使用者需求，可以產出以下任一種（詳見 `references/deliverables.md`）：

1. 文章分析報告
2. 留言區分析
3. 盲點檢視
4. 職涯策略備忘錄
5. 學習路徑圖
6. 關鍵字詞彙表
7. LinkedIn 貼文草稿
8. Medium 文章草稿
9. 內部分享筆記
10. 高管簡報
11. 技術學習指南
12. 方法論萃取

---

## Reference Files

- `references/topic-taxonomy.md` — **（動筆前必讀）** 5 個合法 topic 的定義、判準、tie-breaking、範例
- `references/analysis-framework.md` — 8 步驟分析框架完整說明與範例
- `references/quality-rules.md` — 6 條品質規則與誤用範例
- `references/deliverables.md` — 12 種交付物格式與使用時機
- `references/taiwan-terminology.md` — 繁中 / 台灣技術用語對照
- `references/example-devops-analysis.md` — DevOps 文章完整分析範例
- `assets/output-templates.md` — YAML front-matter 規格 + 完整版 / 精簡版輸出模板
- `assets/keyword-glossary.md` — DevOps / AI 時代平台文章推薦關鍵字表
- `assets/career-recommendation-template.md` — 職涯建議固定格式

---

## Final Checklist Before Responding

回覆前必須確認：

**分析品質**
- 有抽出真正的問題（而不是只停在標題）？
- 有重建論證結構？
- 有把作者主張和留言反論分開？
- 有指出盲點？
- 有給盲點的修正方案？
- 有抽出可學習的關鍵字？
- 有把文章轉成實務 / 職涯建議？
- 有避免盲目接受 AI 炒作？
- 若涉及受監管產業，有考慮企業現實？
- 有使用繁體中文與台灣技術用語？

**歸類與落檔**
- YAML front-matter 齊全？`title` / `date` / `topic` 三個必填都有？
- `topic` 值落在 5 個合法清單內（`ai-ml` / `devops-infra` / `product-engineering` / `career-mindset` / `misc`）？沒拼錯字？
- 檔名符合 `analysis-YYYYMMDD-slug.md`，slug 是小寫 kebab-case？
- 檔案實際寫到 `topics/<topic>/` 或 `_inbox/`（不是 CWD、不是聊天室訊息）？
- 有在動筆前宣告「我把這篇歸到 `<topic>`，因為 ...」讓使用者有糾正的機會？

---

## Default Final Conclusion Template

適用時使用：

> 這篇文章不應該被解讀為某個角色即將消失，而應該被解讀為一個訊號：低層次的執行工作正在被壓縮，但高層次的判斷力、平台設計、可靠性工程、治理、整合能力正在變得更有價值。實務上的回應不是恐慌或放棄這個領域，而是往抽象層的上方移動。
