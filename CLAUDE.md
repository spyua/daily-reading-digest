# CLAUDE.md

個人閱讀分析留存庫 → 靜態站。Markdown 分析放在 `topics/<topic>/analysis-YYYYMMDD-slug.md`，由 Next.js 產生靜態網站部署到 GitHub Pages（https://spyua.github.io/daily-reading-digest/）。

## Content workflow

- 新分析放 `topics/<topic>/`；還沒分類的先丟 `_inbox/`（`_inbox` **不會**上站）
- 檔名：`analysis-YYYYMMDD-slug.md`（slug 可被 front-matter `slug:` 覆蓋）
- Front-matter 規格見 `templates/analysis-template.md`；`title` / `date` / `topic` 必填
- push 到 `main` → GitHub Actions 自動 build + deploy（~2-3 分鐘）
- （可選）`bash update-index.sh` 重建 README 索引

## Commands

- `npm run dev` — 本地開發（http://localhost:3000）
- `npm test` — vitest 單元測試（主要覆蓋 `lib/posts`）
- `npm run build` — production build + `scripts/post-build.mjs`
- `npm run preview` — 本地模擬 GH Pages（http://localhost:3459/daily-reading-digest/）

**Windows git-bash 跑 build 時要加 `MSYS_NO_PATHCONV=1`**，否則 `/daily-reading-digest` basePath 會被 MSYS 展開成 `C:/Program Files/Git/daily-reading-digest`。PowerShell / CI 不受影響。

## Stack gotchas（會踩坑，請尊重）

這些決定是踩過坑後定下來的，改動前請確認還站得住腳：

- **`react-markdown`，不是 MDX。** `next-mdx-remote` 在 React 19 + Next 15.5 RSC 下會炸 `Cannot read properties of undefined (reading 'stack')`。內容是純 markdown，不需要 JSX-in-MDX。若未來非做 MDX，需 pre-compile 而不是在 render time 處理。
- **`rehype-highlight`，不是 `rehype-pretty-code` / `@shikijs/rehype`。** shiki-based plugin 是 async，打不過 react-markdown 的 sync pipeline（`runSync finished async`）。highlight.js 的 GitHub light/dark 主題寫死在 `app/globals.css`。
- **`import pangu from 'pangu/browser'`，不是 `from 'pangu'`。** 預設 export 解析成 `NodePangu`，沒有 `autoSpacingPage`，type-check 會失敗。CJK+Latin 空格透過 `pangu-provider.tsx` 在 `usePathname()` 變動時 re-run。
- **`next/og` 每個多 child 的 `<div>` 都要 `display: 'flex'`。** Satori 硬性要求；也不吃 `WebkitLineClamp` / `-webkit-box`。
- **YAML front-matter 的 `date:` 會被 parse 成 JS `Date` object。** `lib/posts.ts::normalizeDate` 統一轉成 ISO string（YYYY-MM-DD）。新增任何 date-like 欄位時要記得正規化，否則會被 React 當 child 然後炸 `Objects are not valid as a React child`。
- **basePath / SITE_URL 從 env 讀。** Dev 空值；prod 靠 `.env.production`（已 commit，`NEXT_PUBLIC_*` 不是秘密）。client 端 `fetch()` 本地路徑一律用 `lib/config.ts::withBasePath()`——Next 的 basePath 自動 prefix 只對 `<Link>` 跟 routing 生效，`fetch` 不管。
- **Next.js 版本守在 15.5.x patched line。** 15.1.x 有 CVE；16.x 還沒測過整條 static export pipeline，別貿然升。ESLint 鎖在 8.57.1（9 的 flat config 跟現有 `.eslintrc.json` 衝）。

## Directory map

- `app/` — App Router pages（`/`, `/archive`, `/topics`, `/topics/[topic]`, `/posts/[slug]`, `/tags/[tag]`, `/feed.xml`, `/api/search`, `/og/[slug]`）
- `components/` — React components（`PostCard`, `SiteNav`, `Toc`, `CommandPalette` 等）
- `lib/posts.ts` — 單一真相：fast-glob 掃 `topics/**/analysis-*.md` → parse front-matter → 暴露 `getAllPosts` / `getPostBySlug` / `getArchive` 等
- `lib/config.ts` — `BASE_PATH` / `SITE_URL` / `withBasePath()`
- `scripts/post-build.mjs` — build 後把 `out/og/<slug>` 改名為 `.png`、`out/api/search` 改名為 `.json`、寫 `.nojekyll`。**新增任何非 HTML 的 route handler 都要在這裡補附檔名對應。**
- `scripts/test-gh-pages.mjs` — `npm run preview` 用的靜態 server（URL-decode path 是關鍵，讓 `%5Bslug%5D` 對到 disk 的 `[slug]/`）
- `topics/`, `_inbox/`, `templates/`, `assets/` — 實際內容 / 輔助資料夾

## Design & deploy docs

- `docs/plans/` — 所有設計／實作計畫（命名 `YYYY-MM-DD-<topic>-design.md`、`-implementation.md`）
- `DEPLOY.md` — GitHub Pages 部署設定與 troubleshooting
- `.github/workflows/deploy.yml` — CI：`npm ci` → `npm test` → `npm run build` → upload `out/` → deploy-pages

## Style notes

- Design aesthetic：Vercel blog — Geist Sans/Mono + Noto Sans TC；class-based dark mode（`next-themes`）；muted zinc palette + `#0070f3` accent；右側 TOC；card 式首頁
- Tailwind **3.4**（不是 v4）——`@theme` 語法不適用；顏色走 CSS vars + `theme.extend.colors` 的模式
