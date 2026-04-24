# Deployment

網站部署走 **Vercel**。第一次設定是手動的（一次性），之後 push 到 GitHub `main` 就自動 deploy。

## 一次性設定

1. **推 repo 到 GitHub**（如果還沒）：
   ```bash
   git remote add origin git@github.com:<your-user>/daily-reading-digest.git
   git push -u origin main
   ```

2. **連 Vercel**：
   - 到 https://vercel.com/new
   - Import `daily-reading-digest` repo
   - Framework Preset 會自動偵測為 Next.js，保留預設 build command（`npm run build`）與 output（`.next`）
   - 不用設 Environment Variables（先不設也能跑，但 RSS 與 OG image 裡的 URL 會是 `localhost:3000`）
   - 點 **Deploy**

3. **設 `NEXT_PUBLIC_SITE_URL`**（deploy 完再設，然後 redeploy）：
   - Settings → Environment Variables
   - 新增 `NEXT_PUBLIC_SITE_URL`，值填 `https://daily-reading-digest-xxx.vercel.app`（Vercel 給你的網址）或自訂 domain
   - Deployments → 最新那筆點 "Redeploy"

## 自訂 domain（可選）

- Settings → Domains → Add
- 依指示設 DNS（A record 或 CNAME）
- 設完回頭把 `NEXT_PUBLIC_SITE_URL` 改成自訂 domain，redeploy

## 日常發布

- 新文章：`topics/<主題>/analysis-YYYYMMDD-slug.md`（含 YAML front-matter）
- `git commit && git push origin main`
- Vercel 自動 build + deploy（~30 秒）
- PR 也會自動有 Preview URL

## 本地驗證

```bash
npm run build   # 確認沒 type / lint error
npm run start   # production mode 跑一次
npm test        # 單元測試
```

## 技術棧速查

- Next.js 15.5 App Router + React 19
- Tailwind CSS 3.4（class-based dark mode）
- react-markdown + remark-gfm + rehype-slug + rehype-autolink-headings + rehype-highlight
- next-themes, fuse.js, pangu (browser), next/og
- vitest（lib/posts 單元測試）

## 版本 / 相依問題排查

- **Next 有新的 CVE** → `npm install next@latest` 並同步 `eslint-config-next`
- **react-markdown / rehype 版本衝突** → `npm ls react-markdown` 查 peer deps
- **OG image 500 Error** → 檢查 `app/og/[slug]/route.tsx` 裡每個有多個 children 的 `<div>` 都有 `display: flex`（Satori 的要求）
