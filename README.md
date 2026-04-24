# Document Read — 每日文章閱讀留存

個人閱讀文章的分析留存庫。每篇文章會轉成結構化分析報告，依主題歸檔、按日期索引。

## 結構

```
document-read/
├── README.md                 ← 本檔案（自動生成）
├── _inbox/                   ← 還沒分類的文章暫存
├── topics/                   ← 主題資料夾
│   ├── devops-infra/
│   ├── ai-ml/
│   ├── product-engineering/
│   ├── career-mindset/
│   └── misc/
├── templates/                ← 分析報告模板
├── assets/                   ← 共用圖片、附件
└── update-index.sh           ← 重新生成本 README 的腳本
```

## 檔案命名規則

```
analysis-YYYYMMDD-slug.md
```

範例：`analysis-20260424-mcp-is-dead.md`

## 工作流程

1. 讀完一篇文章後，用 `article-discussion-analysis` skill 產出分析報告
2. 依主題放進 `topics/<主題>/`，若還沒想好類別先丟 `_inbox/`
3. 執行 `bash update-index.sh` 更新本 README 索引
4. commit 並推上 GitHub

---

**總計：2 篇分析**

最近更新：2026-04-24

## 全部文章（按日期倒序）

| 日期 | 主題 | 標題 |
| --- | --- | --- |
| 2026-04-24 | career-mindset | [dont-become-devops-2026](topics/career-mindset/analysis-20260424-dont-become-devops-2026.md) |
| 2026-04-24 | ai-ml | [mcp-is-dead](topics/ai-ml/analysis-20260424-mcp-is-dead.md) |

## 按主題分類

### ai-ml (1)

- **2026-04-24** — [mcp-is-dead](topics/ai-ml/analysis-20260424-mcp-is-dead.md)

### career-mindset (1)

- **2026-04-24** — [dont-become-devops-2026](topics/career-mindset/analysis-20260424-dont-become-devops-2026.md)

