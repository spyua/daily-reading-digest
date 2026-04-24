# Output Templates

兩種標準輸出格式。依使用者需求選擇。

---

## 必備：YAML Front-Matter

每篇 `analysis-YYYYMMDD-slug.md` 檔案頂部**必須**有 YAML front-matter 區塊，供網站的 post 頁面、首頁卡片、RSS、OG image、搜尋使用。

```yaml
---
title: <文章中文/英文標題>
date: <分析產出日期 YYYY-MM-DD>
topic: <ai-ml | devops-infra | product-engineering | career-mindset | misc>
author: <原文作者姓名>
source_url: <原文 URL>
source_published: <原文發表日期 YYYY-MM-DD>
summary: <一句話摘要，60~80 字中文>
tags: [<tag1>, <tag2>, <tag3>]  # 3~5 個，小寫、用連字號
---
```

**欄位規則**

| 欄位 | 必填 | 說明 |
|---|---|---|
| title | ✅ | 卡片與文章頁大標題 |
| date | ✅ | 分析產出日期（不是原文發表日），格式 `YYYY-MM-DD`，不加引號 |
| topic | ✅ | 必須對應 `topics/` 下的子資料夾名 |
| author |  | 原文作者（非本人） |
| source_url |  | 原文連結；文章頁會渲染成「原文連結」 |
| source_published |  | 原文發表日，格式 `YYYY-MM-DD` |
| summary |  | 首頁卡片副文案、OG meta description、RSS item description |
| tags |  | 小寫、短、用 `-` 連接（例：`claude-code`、`ai-protocol`）；會建 `/tags/<tag>` 頁 |
| cover |  | 選填，自訂 OG image 路徑；不填則 fallback 自動生成的 `/og/<slug>` |
| slug |  | 選填，覆寫檔名推斷的 slug（有衝突時才用） |

---

## 完整版（Full Version）

```markdown
# Article and Discussion Analysis

## 1. 此篇文章探討什麼問題？

- 表層議題：
- 底層真正的問題：
- 為何重要：
- 誰會被影響：
- 產業 / 職涯轉變意涵：

## 2. 觀點結構是什麼？

| Layer               | Argument | Meaning |
| ------------------- | -------- | ------- |
| Problem framing     |          |         |
| Cause               |          |         |
| Impact              |          |         |
| Suggested direction |          |         |
| Final thesis        |          |         |

## 3. 是否有解決方案？

- 解法層級（L0~L4）：
- 作者提出的解法：
- 是否可執行：
- 缺少什麼：
- 如何補強：

## 4. 是否有盲點？

### A. 誇大
### B. 缺少企業脈絡
### C. 缺少維運現實
### D. 缺少人才培育問題
### E. 缺少治理模型

## 5. 如果有盲點，建議解決方案是什麼？

| Blind Spot | Why It Matters | Recommended Fix |
| ---------- | -------------- | --------------- |

## 6. 歸納關鍵字學習

| Keyword | 中文說明 | Why It Matters | Learn Next |
| ------- | -------- | -------------- | ---------- |

## 7. 對使用者的實務 / 職涯建議

### A. 職涯定位
### B. 技術學習路徑（P0~P3）
### C. 企業導入建議（若適用）

## 8. 最終結論

（用 default final conclusion template 或自訂）
```

---

## 精簡版（Short Version）

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

## 留言區分析格式

```markdown
## 留言分類總覽

| Comment Type               | 數量 | 代表性摘要 |
| -------------------------- | ---- | ---------- |
| Agreement                  |      |            |
| Correction                 |      |            |
| Rebuttal                   |      |            |
| Practical field experience |      |            |
| Career anxiety             |      |            |
| Deeper systemic issue      |      |            |

## 最有價值的反論（3~5 則）

1.
2.
3.

## 整體訊號

（留言區整體在說什麼？它強化還是削弱作者論點？）
```
