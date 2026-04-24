# Deployment

網站部署走 **GitHub Pages + GitHub Actions**。推到 `main` 會自動 build 靜態站並 deploy。

## 一次性設定

1. **推 repo 到 GitHub**（如果還沒）：
   ```bash
   git push -u origin main
   ```

2. **啟用 Pages**：
   - GitHub repo → Settings → Pages
   - Source 選 **"GitHub Actions"**（不是 "Deploy from a branch"）

3. **第一次 push 後**：Actions tab 會看到 `Deploy to GitHub Pages` workflow 跑起來，建 → deploy 大概 2–3 分鐘。
   - 完成後網址：`https://spyua.github.io/daily-reading-digest/`

## 日常發布

- 新文章：`topics/<主題>/analysis-YYYYMMDD-slug.md`（含 YAML front-matter）
- `git commit && git push origin main` → GitHub Actions 自動重 build + deploy

## 自訂 domain（可選）

1. Settings → Pages → Custom domain 填入（例如 `reading.example.com`）
2. DNS 設 CNAME 指向 `spyua.github.io`
3. 修改 `.github/workflows/deploy.yml` 裡的 env：
   ```yaml
   NEXT_PUBLIC_BASE_PATH: ''           # 自訂 domain 放 root，basePath 拿掉
   NEXT_PUBLIC_SITE_URL: https://reading.example.com
   ```

## 本地驗證

```bash
npm install
npm test                      # lib/posts 單元測試
npm run dev                   # 開發模式（無 basePath，http://localhost:3000）
npm run build                 # 產出 out/（含 .nojekyll、.png OG、.json search index）
```

本地要看靜態版效果，可以裝 `http-server`：
```bash
npx serve out -l 3000
# 然後開 http://localhost:3000/daily-reading-digest/ 不會 work
# 因為 out/ 根目錄沒有 /daily-reading-digest 子資料夾
# 真實驗證建議直接 push 到 GitHub，看 Actions run 結果
```

## GH Pages 適應點（以下都已處理）

1. **Static export** — `next.config.mjs` 設 `output: 'export'`
2. **basePath** — 所有路徑會自動加 `/daily-reading-digest` 前綴；手動 `fetch()` 用 `withBasePath()` helper（見 `lib/config.ts`）
3. **OG image** — build 時透過 `generateStaticParams` + next/og 產生 PNG。`scripts/post-build.mjs` 把 `out/og/<slug>` rename 成 `<slug>.png` 讓 Pages 用正確 Content-Type
4. **API search** — `/api/search` 在 `out/` 是 extensionless JSON，post-build 改名為 `search.json`；client `fetch` 指向 `.json` 路徑
5. **.nojekyll** — 自動建立，讓 GH Pages 不跑 Jekyll（Jekyll 會忽略 `_next/` 資料夾）
6. **Route Handlers** — `/feed.xml` 和 `/api/search.json` 都標 `dynamic = 'force-static'`，build 時寫成真正的靜態檔案

## 版本 / 相依問題排查

- **Next.js CVE** → `npm install next@latest eslint-config-next@latest`
- **`ImageResponse` 500** → 檢查 `app/og/[slug]/route.tsx` 裡每個有多個 children 的 `<div>` 都有 `display: 'flex'`（Satori 要求）
- **Pages 部署後 404** → 確認 Pages source 是 "GitHub Actions"（不是 branch）
- **CSS / JS 壞掉** → 檢查 `out/.nojekyll` 存在；檢查 HTML 裡 asset URL 有 `/daily-reading-digest/_next/...` 前綴
