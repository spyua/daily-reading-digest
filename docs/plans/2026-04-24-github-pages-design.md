# Design: Daily Reading Digest — GitHub Pages Site

- **Date:** 2026-04-24
- **Owner:** spyua
- **Status:** Approved, ready for implementation planning

## Goal

把現有的 `daily-reading-digest` repo（markdown 分析報告按 topic 歸檔、檔名 `analysis-YYYYMMDD-slug.md`）變成一個視覺有設計感、方便閱讀與回顧的網站。風格參考 Vercel blog（雜誌感、大字標題、卡片式文章列表、dark mode、精緻 typography）。

## Non-goals

- 不做多作者、不做留言、不做訂閱電子報、不做會員制
- 不做 SSR 動態內容（全站靜態即可）
- 不做手機 App、不做 PWA 離線
- 不重組既有 `topics/` 資料結構

## Constraints

- 內容以繁體中文為主，必要時混英文
- 現有兩篇文章沒有 YAML front-matter，metadata 散在內容裡
- 內容會以 `article-discussion-analysis` skill 持續產生新文章，設計必須能自動吸收新檔案
- 個人使用，免費額度即可

---

## Architecture

### Stack

| 層 | 技術 | 理由 |
|---|---|---|
| Framework | **Next.js 15** (App Router, RSC) | Vercel blog 原生技術棧，最貼近目標風格 |
| Content | **MDX** via `@next/mdx` | 可保留純 markdown，必要時嵌入 React 組件 |
| Styling | **Tailwind CSS v4** + 少量 **shadcn/ui**（Command、Dialog） | 快速打造 Vercel 風格的精緻 UI |
| Metadata | **gray-matter** | 解析 YAML front-matter |
| Code highlight | **shiki** | 與 Vercel blog 一致，支援雙主題 |
| Reading time | **reading-time** | 自動估算閱讀時間 |
| Theme | **next-themes** | Light/Dark 切換 + 跟隨系統 |
| 中英空白 | **pangu** | 中英文之間自動加空白，排版更細緻 |
| Search | **fuse.js**（client-side） | 輕量、無需 server，build 時生成 index |
| Fonts | **next/font** + Geist + Noto Sans TC | self-host，無 layout shift |
| Hosting | **Vercel** | Next.js 原生支援，push 自動 deploy，免費額度足夠 |

### 專案結構

```
daily-reading-digest/
├── _inbox/                  ← 維持現狀（不上站）
├── topics/                  ← 維持現狀（上站的內容源）
│   ├── ai-ml/
│   ├── career-mindset/
│   ├── devops-infra/
│   ├── product-engineering/
│   └── misc/
├── templates/               ← 更新：加 front-matter 範本
├── assets/                  ← 遷移部分到 public/，其餘保留
├── docs/plans/              ← 設計 + 實作計畫
├── app/                     ← Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx             ← 首頁
│   ├── posts/[slug]/page.tsx
│   ├── topics/page.tsx
│   ├── topics/[topic]/page.tsx
│   ├── tags/[tag]/page.tsx
│   ├── feed.xml/route.ts    ← RSS
│   ├── og/[slug]/route.tsx  ← OG image
│   └── api/search/route.ts
├── components/
│   ├── post-card.tsx
│   ├── toc.tsx
│   ├── command-palette.tsx  ← ⌘K
│   ├── theme-toggle.tsx
│   ├── site-nav.tsx
│   └── mdx-components.tsx
├── lib/
│   ├── posts.ts             ← 掃 topics/、解析、建索引
│   ├── search-index.ts      ← build-time 生成
│   └── og.tsx               ← OG image 元件
├── public/
│   └── fonts/
├── next.config.mjs
├── tailwind.config.ts
├── package.json
├── README.md                ← 既有
└── update-index.sh          ← 保留（選用）
```

### 資料流

```
topics/**/analysis-*.md
   │
   ▼  lib/posts.ts（build 時）
   │  - fast-glob 掃全部 .md
   │  - gray-matter 抽 front-matter
   │  - reading-time 算閱讀時間
   │  - 按 date 倒序
   │
   ▼  getAllPosts / getPostBySlug / getPostsByTopic / getAllTopics / getAllTags
   │
   ▼  Next.js SSG 全站靜態輸出
```

---

## Content Pipeline

### Front-matter 規格

```yaml
---
title: MCP is Dead
slug: mcp-is-dead                  # 可選，預設從檔名推
date: 2026-04-24
topic: ai-ml                       # 對應 topics/ 子資料夾
author: Nick Babich
source_url: https://medium.com/...
source_published: 2026-04-06
summary: 為什麼不要在 Claude Code 裡用 MCP，以及該改用什麼
tags: [mcp, claude-code, ai-protocol]
cover: /covers/mcp-is-dead.png     # 可選
---
```

### 舊檔 migration

為既有 2 篇文章（`mcp-is-dead`、`dont-become-devops-2026`）補 front-matter：從檔名抓 date/slug，從 `# heading` 抓 title，從開頭 blockquote 抓 author / source_published / summary，topic 取自父資料夾。

### Template 更新

`templates/` 裡的 analysis 範本頂部加上 front-matter 區塊，讓未來 `article-discussion-analysis` skill 產出的檔案直接符合規格。

### Slug 規則

- 預設從檔名 `analysis-YYYYMMDD-slug.md` 取 `slug` 段
- URL 不含日期或 topic：`/posts/mcp-is-dead`
- 有衝突時用 front-matter `slug:` 覆寫

---

## Routing

| URL | 內容 |
|---|---|
| `/` | 首頁，hero + 主題 tag chip 列 + 所有文章卡片（日期倒序） |
| `/posts/[slug]` | 單篇文章（大標題、metadata、TOC、內文） |
| `/topics` | 所有主題 overview（每個主題一張卡） |
| `/topics/[topic]` | 該主題所有文章 |
| `/tags/[tag]` | 該 tag 所有文章 |
| `/feed.xml` | RSS 2.0 |
| `/og/[slug]` | OG image 動態生成 |
| `/api/search` | build 時生成 JSON，client fuse.js 查詢 |

---

## Design System

### Typography

- English / UI：**Geist Sans** (body, nav) + **Geist Mono** (code)
- Chinese：**Noto Sans TC** (400, 500, 700)
- Stack：`Geist, 'Noto Sans TC', system-ui, sans-serif`
- 中英空白：`pangu.js` 處理

Scale（桌面，手機等比縮）：
- H1 文章標題：48px / 600 / letter-spacing -0.02em
- H2：30px / 600
- H3：20px / 600
- Body：17px / line-height 1.75
- Small/meta：14px / text-muted

### Colors

| Token | Light | Dark |
|---|---|---|
| bg | `#fafafa` | `#0a0a0a` |
| bg-elevated | `#ffffff` | `#111111` |
| border | `#e4e4e7` | `#27272a` |
| text | `#0a0a0a` | `#fafafa` |
| text-muted | `#71717a` | `#a1a1aa` |
| accent | `#0070f3` | `#3291ff` |

- CSS variables + `next-themes`，`suppressHydrationWarning` 避免切換閃爍
- 預設跟隨 `prefers-color-scheme`

### Layout

**首頁**：sticky nav（半透明 + backdrop-blur）、hero 大標 + tagline、主題 chip 列、文章卡片 grid / list。

**文章頁**：置中 `max-w-prose`（約 65ch）、右側浮動 TOC（滾動高亮當前段落）、頂部 metadata 行（日期 · topic · 閱讀時間 · source link）。

### 組件語彙

- **Card**：`rounded-lg border bg-elevated p-6 hover:border-accent hover:translate-y-[-2px] transition`
- **Tag chip**：`rounded-full border px-3 py-1 text-xs font-mono`
- **Code block**：shiki 雙主題（`github-light` / `github-dark`），檔名/語言標籤顯示在右上
- **Callout**（MDX 組件）：info / warn / tip 三種
- **Divider**：subtle 單色線

### 微動效

- 卡片 hover：border 變 accent + 輕微 lift
- 頁面進入：內容 fade-in + 輕微位移
- 克制，不過度

---

## Features（核心清單）

| # | 功能 | 說明 |
|---|---|---|
| 1 | 全文搜尋 | ⌘K command palette，shadcn `<Command>`，fuse.js client-side fuzzy search |
| 2 | 主題分類頁 | `/topics/[topic]` 列出該主題所有文章 |
| 3 | 閱讀時間 | 文章頂部顯示「約 X 分鐘閱讀」 |
| 4 | RSS feed | `/feed.xml`，可被 reader 訂閱 |
| 5 | TOC | 文章右側浮動目錄，滾動高亮 |
| 6 | OG image | 貼連結到社群有漂亮預覽圖，`@vercel/og` 動態生成 |

---

## Deploy Workflow

```
本地寫文章/改站 → git push origin main
                        │
                        ▼
          GitHub (source of truth)
                        │
                        ▼
      Vercel 偵測 push → 自動 build → deploy
                        │
                        ▼
         daily-reading-digest.vercel.app
                        │
                        └─→（可選）綁自訂 domain
```

### 日常寫作 workflow

1. 讀完文章 → 用 `article-discussion-analysis` skill 產出分析（template 已含 front-matter）
2. 檔案放 `topics/<主題>/`
3. `git commit && git push`
4. 網站自動更新（約 30 秒）
5. （可選）`bash update-index.sh` 更新 README

---

## 實作階段（高層規劃，交給 writing-plans 細化）

| 階段 | 產出 | 驗證 |
|---|---|---|
| P0 | Next.js 15 + Tailwind 骨架 | `npm run dev` 顯示空白首頁 |
| P1 | `lib/posts.ts` + 舊檔加 front-matter + `/posts/[slug]` | 能瀏覽單篇文章 |
| P2 | 首頁 + `/topics` + `/topics/[topic]` | 卡片導流 |
| P3 | 字體、色彩、dark mode、pangu | 切換 dark 正常、中英排版對齊 |
| P4 | TOC、閱讀時間、shiki、sticky nav | 右側 TOC 跟隨滾動 |
| P5 | ⌘K 搜尋 | 搜尋能找到文章 |
| P6 | RSS + OG image + `/tags/[tag]` | reader 訂閱、預覽圖正常 |
| P7 | Vercel 部署（+ 可選自訂 domain） | 線上可訪問 |
| P8 | `templates/` 加 front-matter 範本、README 更新 | 新文章自帶 front-matter |

---

## Risks & Mitigations

| 風險 | 對策 |
|---|---|
| Noto Sans TC 完整字形檔過大 | 用 subset 或 CSS `@font-face` + `unicode-range` 分片；P3 處理 |
| fuse.js 對繁中 tokenization 不理想 | 若搜尋體驗差，P5 擴充點改走 `flexsearch` + `nodejieba` 分詞 |
| Vercel 免費額度超標 | 個人站幾乎不會超（100GB 頻寬/月）；超了再評估 Cloudflare Pages |
| 舊 markdown 格式未來變更 | 把解析邏輯集中在 `lib/posts.ts`，front-matter 欄位變更只改一處 |

---

## Open questions（部署時再決定，不 block 實作）

- 是否綁自訂 domain？（可之後再加）
- OG image 樣式（簡單用標題 + 站名，或做更細緻的主題色配色）
- Analytics（可選：Vercel Analytics 或 Plausible，都免費/超低成本）
