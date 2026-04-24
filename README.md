# Daily Reading Digest — 每日文章閱讀留存

個人閱讀文章的分析留存庫。每篇文章會轉成結構化分析報告，依主題歸檔、按日期索引，並透過部署在 Vercel 的網站呈現。

🌐 **網站**：`https://<your-vercel-domain>`（部署後替換）

## 結構

```
daily-reading-digest/
├── README.md                 ← 本檔案（部分自動生成）
├── _inbox/                   ← 還沒分類的文章暫存
├── topics/                   ← 主題資料夾（上站內容源）
│   ├── devops-infra/
│   ├── ai-ml/
│   ├── product-engineering/
│   ├── career-mindset/
│   └── misc/
├── templates/                ← 分析報告模板（含 front-matter 規格）
├── assets/                   ← 共用圖片、附件
├── app/ components/ lib/     ← Next.js 網站原始碼
├── DEPLOY.md                 ← Vercel 部署說明
└── update-index.sh           ← 重新生成本 README 索引的腳本
```

## 檔案命名規則

```
analysis-YYYYMMDD-slug.md
```

範例：`analysis-20260424-mcp-is-dead.md`

每個 `.md` 檔頂部**必須**有 YAML front-matter（欄位規格見 `templates/analysis-template.md`）。

## 工作流程

1. 讀完一篇文章後，用 `article-discussion-analysis` skill 產出分析報告（含 YAML front-matter）
2. 依主題放進 `topics/<主題>/`，若還沒想好類別先丟 `_inbox/`（_inbox 不會上站）
3. `git commit && git push origin main` — Vercel 自動 deploy 網站（~30 秒）
4. （可選）`bash update-index.sh` 更新本 README 索引

## 本地開發

```bash
npm install       # 首次
npm run dev       # 開發，http://localhost:3000
npm test          # 單元測試（lib/posts）
npm run build     # production build
```

部署細節見 [DEPLOY.md](DEPLOY.md)。

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

