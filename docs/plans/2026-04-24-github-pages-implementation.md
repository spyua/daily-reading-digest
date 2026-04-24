# Daily Reading Digest Site — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 把既有 `topics/**/analysis-*.md` 變成一個 Vercel-blog 風格的靜態網站，部署到 Vercel，支援 ⌘K 搜尋、TOC、RSS、OG image、dark mode。

**Architecture:** Next.js 15 (App Router, RSC) + MDX + Tailwind v4。文章從 `topics/` 資料夾 build 時掃描、gray-matter 解析 front-matter、SSG 全站靜態。搜尋用 build 時生成的 JSON + client-side fuse.js。

**Tech Stack:** Next.js 15, React 19, Tailwind CSS v4, @next/mdx, gray-matter, reading-time, shiki, next-themes, fuse.js, pangu, fast-glob, vitest, @vercel/og。

**Reference Design Doc:** `docs/plans/2026-04-24-github-pages-design.md`

---

## Pre-flight

Before starting,確認 Node.js ≥ 20：

```bash
node --version   # 預期 v20.x 或 v22.x
```

若沒有，安裝 Node 22 LTS。Windows 上建議用 `nvm-windows` 或官方安裝包。

---

## P0 — Scaffolding

### Task 0.1: 初始化 Next.js 專案於 repo 根目錄

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `next-env.d.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `.gitignore`（追加）

**Step 1:** 在 repo 根目錄跑 Next.js 初始化（非互動，避免被 prompt 卡住）：

```bash
cd /c/Users/Mario.Yu/workspace/daily-reading-digest
npx --yes create-next-app@latest . \
  --typescript --tailwind --app --src-dir=false \
  --import-alias="@/*" --eslint --no-turbopack --use-npm
```

如果 CLI 抱怨「directory not empty」，改用 `--yes` 並手動合併已有的 `.gitignore` 與 `README.md`（保留原始內容，追加 Next.js 需要的忽略項即可）。

**Step 2:** 確認生成檔案：

```bash
ls -la app/ public/ package.json tsconfig.json next.config.mjs
```

預期：`app/layout.tsx`、`app/page.tsx`、`app/globals.css`、`package.json`、`tsconfig.json`、`next.config.mjs` 存在。

**Step 3:** 把 `.gitignore` 追加以下（若尚未包含）：

```gitignore
# Next.js
.next/
out/
.vercel/
node_modules/
*.tsbuildinfo
next-env.d.ts

# env
.env*.local
```

**Step 4:** 跑 dev server 確認：

```bash
npm run dev
```

預期：`Ready in X s`，開 http://localhost:3000 看到 Next.js 預設首頁。Ctrl+C 關掉。

**Step 5:** Commit：

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 app with TypeScript and Tailwind"
```

---

### Task 0.2: 安裝核心依賴

**Files:**
- Modify: `package.json`

**Step 1:** 安裝 runtime deps：

```bash
npm install gray-matter reading-time fast-glob next-themes fuse.js pangu \
  remark-gfm rehype-slug rehype-autolink-headings \
  @next/mdx @mdx-js/loader @mdx-js/react @types/mdx \
  shiki @shikijs/rehype
```

**Step 2:** 安裝 dev deps：

```bash
npm install -D vitest @vitest/ui @testing-library/react @testing-library/dom jsdom
```

**Step 3:** 驗證 `package.json` 有所有依賴：

```bash
npm ls gray-matter reading-time fast-glob shiki fuse.js pangu vitest
```

預期：每個套件都顯示版本號，沒有 `UNMET DEPENDENCY`。

**Step 4:** Commit：

```bash
git add package.json package-lock.json
git commit -m "chore: install content pipeline and UI dependencies"
```

---

### Task 0.3: 設定 MDX 與 Next.js config

**Files:**
- Modify: `next.config.mjs`

**Step 1:** 覆寫 `next.config.mjs`：

```javascript
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeShiki from '@shikijs/rehype';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [
        rehypeShiki,
        {
          themes: { light: 'github-light', dark: 'github-dark' },
        },
      ],
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  experimental: {
    mdxRs: false,
  },
};

export default withMDX(nextConfig);
```

**Step 2:** 跑 dev server 驗證沒 config error：

```bash
npm run dev
```

預期：無錯誤啟動。Ctrl+C。

**Step 3:** Commit：

```bash
git add next.config.mjs
git commit -m "chore: configure MDX with remark-gfm, shiki, and heading anchors"
```

---

### Task 0.4: 設定 Vitest

**Files:**
- Create: `vitest.config.mts`
- Modify: `package.json`（加 scripts）

**Step 1:** 建立 `vitest.config.mts`：

```typescript
import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts', 'lib/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
```

**Step 2:** 在 `package.json` 的 `scripts` 加：

```json
"test": "vitest run",
"test:watch": "vitest"
```

**Step 3:** 建立一個 smoke test `tests/smoke.test.ts`：

```typescript
import { describe, it, expect } from 'vitest';

describe('smoke', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```

**Step 4:** 跑 test：

```bash
npm test
```

預期：`1 passed`。

**Step 5:** Commit：

```bash
git add vitest.config.mts tests/smoke.test.ts package.json
git commit -m "chore: set up vitest with node environment"
```

---

## P1 — Content Pipeline

### Task 1.1: 定義 Post type 與 front-matter schema

**Files:**
- Create: `lib/types.ts`

**Step 1:** 建立 `lib/types.ts`：

```typescript
export type PostFrontmatter = {
  title: string;
  slug?: string;
  date: string;           // ISO yyyy-mm-dd
  topic: string;
  author?: string;
  source_url?: string;
  source_published?: string;
  summary?: string;
  tags?: string[];
  cover?: string;
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  topic: string;
  author?: string;
  sourceUrl?: string;
  sourcePublished?: string;
  summary?: string;
  tags: string[];
  cover?: string;
  readingTimeMinutes: number;
  content: string;          // raw markdown body（不含 front-matter）
  filePath: string;         // 相對 repo root
};
```

**Step 2:** Commit：

```bash
git add lib/types.ts
git commit -m "feat: define Post and PostFrontmatter types"
```

---

### Task 1.2: 寫 lib/posts.ts 測試 — slug 解析

**Files:**
- Create: `lib/posts.test.ts`

**Step 1:** 建立 `lib/posts.test.ts`：

```typescript
import { describe, it, expect } from 'vitest';
import { slugFromFilename } from './posts';

describe('slugFromFilename', () => {
  it('extracts slug from analysis-YYYYMMDD-slug.md', () => {
    expect(slugFromFilename('analysis-20260424-mcp-is-dead.md')).toBe('mcp-is-dead');
  });

  it('handles multi-hyphen slugs', () => {
    expect(slugFromFilename('analysis-20260424-dont-become-devops-2026.md')).toBe('dont-become-devops-2026');
  });

  it('throws on invalid filename', () => {
    expect(() => slugFromFilename('random.md')).toThrow();
  });
});
```

**Step 2:** 跑測試確認 fail：

```bash
npm test -- lib/posts.test.ts
```

預期：FAIL（`slugFromFilename` 不存在）。

---

### Task 1.3: 實作 slugFromFilename

**Files:**
- Create: `lib/posts.ts`

**Step 1:** 建立 `lib/posts.ts`：

```typescript
export function slugFromFilename(filename: string): string {
  const m = filename.match(/^analysis-\d{8}-(.+)\.md$/);
  if (!m) throw new Error(`Invalid filename pattern: ${filename}`);
  return m[1];
}
```

**Step 2:** 跑測試：

```bash
npm test -- lib/posts.test.ts
```

預期：3 passed。

**Step 3:** Commit：

```bash
git add lib/posts.ts lib/posts.test.ts
git commit -m "feat: slugFromFilename helper with tests"
```

---

### Task 1.4: 寫 parsePost 測試

**Files:**
- Modify: `lib/posts.test.ts`

**Step 1:** 在 `lib/posts.test.ts` 追加：

```typescript
import { parsePost } from './posts';

const SAMPLE = `---
title: Test Post
date: 2026-04-24
topic: ai-ml
tags: [foo, bar]
summary: A test
---

# Test Post

Hello world. This is the body.
`;

describe('parsePost', () => {
  it('extracts frontmatter and content', () => {
    const post = parsePost({
      filename: 'analysis-20260424-test-post.md',
      rawContent: SAMPLE,
      filePath: 'topics/ai-ml/analysis-20260424-test-post.md',
    });
    expect(post.slug).toBe('test-post');
    expect(post.title).toBe('Test Post');
    expect(post.date).toBe('2026-04-24');
    expect(post.topic).toBe('ai-ml');
    expect(post.tags).toEqual(['foo', 'bar']);
    expect(post.summary).toBe('A test');
    expect(post.readingTimeMinutes).toBeGreaterThanOrEqual(1);
    expect(post.content).toContain('Hello world');
    expect(post.content).not.toContain('title: Test Post');
  });

  it('respects explicit slug override', () => {
    const withSlug = SAMPLE.replace('topic: ai-ml', 'topic: ai-ml\nslug: custom-slug');
    const post = parsePost({
      filename: 'analysis-20260424-test-post.md',
      rawContent: withSlug,
      filePath: 'topics/ai-ml/analysis-20260424-test-post.md',
    });
    expect(post.slug).toBe('custom-slug');
  });

  it('defaults tags to empty array', () => {
    const noTags = `---\ntitle: X\ndate: 2026-01-01\ntopic: misc\n---\n\nbody`;
    const post = parsePost({
      filename: 'analysis-20260101-x.md',
      rawContent: noTags,
      filePath: 'topics/misc/analysis-20260101-x.md',
    });
    expect(post.tags).toEqual([]);
  });
});
```

**Step 2:** 跑測試確認 fail：

```bash
npm test -- lib/posts.test.ts
```

預期：FAIL（`parsePost` 不存在）。

---

### Task 1.5: 實作 parsePost

**Files:**
- Modify: `lib/posts.ts`

**Step 1:** 在 `lib/posts.ts` 追加：

```typescript
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { Post, PostFrontmatter } from './types';

export function parsePost(args: {
  filename: string;
  rawContent: string;
  filePath: string;
}): Post {
  const { filename, rawContent, filePath } = args;
  const { data, content } = matter(rawContent);
  const fm = data as PostFrontmatter;

  const slug = fm.slug ?? slugFromFilename(filename);
  const rt = readingTime(content);

  return {
    slug,
    title: fm.title,
    date: fm.date,
    topic: fm.topic,
    author: fm.author,
    sourceUrl: fm.source_url,
    sourcePublished: fm.source_published,
    summary: fm.summary,
    tags: fm.tags ?? [],
    cover: fm.cover,
    readingTimeMinutes: Math.max(1, Math.round(rt.minutes)),
    content,
    filePath,
  };
}
```

**Step 2:** 跑測試：

```bash
npm test -- lib/posts.test.ts
```

預期：6 passed。

**Step 3:** Commit：

```bash
git add lib/posts.ts lib/posts.test.ts
git commit -m "feat: parsePost with gray-matter and reading-time"
```

---

### Task 1.6: 實作 getAllPosts / getPostBySlug / getPostsByTopic

**Files:**
- Modify: `lib/posts.ts`

**Step 1:** 在 `lib/posts.ts` 追加：

```typescript
import fg from 'fast-glob';
import fs from 'node:fs';
import path from 'node:path';

const REPO_ROOT = process.cwd();
const CONTENT_GLOB = 'topics/**/analysis-*.md';

let cache: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (cache) return cache;
  const files = fg.sync(CONTENT_GLOB, { cwd: REPO_ROOT });
  const posts = files.map((rel) => {
    const abs = path.join(REPO_ROOT, rel);
    const raw = fs.readFileSync(abs, 'utf8');
    return parsePost({
      filename: path.basename(rel),
      rawContent: raw,
      filePath: rel,
    });
  });
  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  cache = posts;
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostsByTopic(topic: string): Post[] {
  return getAllPosts().filter((p) => p.topic === topic);
}

export function getAllTopics(): { topic: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of getAllPosts()) {
    counts.set(p.topic, (counts.get(p.topic) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of getAllPosts()) {
    for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}
```

**Step 2:** 快速 sanity check（不寫測試，因為相依檔案系統 — 由下一 task 的舊檔 migration + 實際頁面渲染驗證）：

```bash
npx tsx -e "import('./lib/posts.ts').then(m => console.log(m.getAllPosts().length))"
```

此時可能回報 0（因為舊檔還沒加 front-matter，會拋錯）。沒關係，下一 task 處理。

**Step 3:** Commit：

```bash
git add lib/posts.ts
git commit -m "feat: filesystem-based getAllPosts/getPostBySlug/getPostsByTopic"
```

---

### Task 1.7: 為舊文章加 front-matter（mcp-is-dead）

**Files:**
- Modify: `topics/ai-ml/analysis-20260424-mcp-is-dead.md`

**Step 1:** 讀現有內容，確認頂部結構（日期、作者、副標、來源）。

**Step 2:** 在檔案最頂端插入 front-matter（保留原有 body 不動）：

```markdown
---
title: MCP is Dead
date: 2026-04-24
topic: ai-ml
author: Nick Babich
source_published: 2026-04-06
summary: 為什麼不要在 Claude Code 裡用 MCP，以及該改用什麼
tags: [mcp, claude-code, ai-protocol, agent]
---

# Article and Discussion Analysis: MCP is Dead
...（原有內容）
```

**Step 3:** Sanity check：

```bash
npx tsx -e "import('./lib/posts.ts').then(m => { const p = m.getPostBySlug('mcp-is-dead'); console.log(p?.title, p?.tags); })"
```

預期：`MCP is Dead [ 'mcp', 'claude-code', 'ai-protocol', 'agent' ]`。

**Step 4:** Commit：

```bash
git add topics/ai-ml/analysis-20260424-mcp-is-dead.md
git commit -m "content: add front-matter to mcp-is-dead"
```

---

### Task 1.8: 為舊文章加 front-matter（dont-become-devops-2026）

**Files:**
- Modify: `topics/career-mindset/analysis-20260424-dont-become-devops-2026.md`

**Step 1:** 讀取檔案確認作者/日期/摘要。

**Step 2:** 在頂端插入 front-matter（欄位根據實際內容填入；以下為 placeholder，依文章實際內容調整）：

```markdown
---
title: Don't Become a DevOps Engineer in 2026
date: 2026-04-24
topic: career-mindset
author: <依文章填>
source_published: <依文章填>
summary: <一句話摘要，依文章寫>
tags: [devops, career, sre]
---

...（原有內容）
```

**Step 3:** Sanity check：

```bash
npx tsx -e "import('./lib/posts.ts').then(m => console.log(m.getAllPosts().map(p => p.slug)))"
```

預期：`[ 'mcp-is-dead', 'dont-become-devops-2026' ]`（順序可能依日期）。

**Step 4:** Commit：

```bash
git add topics/career-mindset/analysis-20260424-dont-become-devops-2026.md
git commit -m "content: add front-matter to dont-become-devops-2026"
```

---

### Task 1.9: 單篇文章頁 /posts/[slug]

**Files:**
- Create: `app/posts/[slug]/page.tsx`
- Create: `components/mdx-components.tsx`

**Step 1:** 建立 `components/mdx-components.tsx`（先做最小版，P3 再美化）：

```tsx
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(): MDXComponents {
  return {
    h1: (props) => <h1 className="text-4xl font-semibold mt-12 mb-6" {...props} />,
    h2: (props) => <h2 className="text-2xl font-semibold mt-10 mb-4" {...props} />,
    h3: (props) => <h3 className="text-xl font-semibold mt-8 mb-3" {...props} />,
    p: (props) => <p className="leading-[1.75] my-5" {...props} />,
    a: (props) => <a className="underline decoration-accent underline-offset-4" {...props} />,
    ul: (props) => <ul className="list-disc pl-6 my-5 space-y-2" {...props} />,
    ol: (props) => <ol className="list-decimal pl-6 my-5 space-y-2" {...props} />,
    blockquote: (props) => <blockquote className="border-l-2 pl-4 my-5 text-muted-foreground" {...props} />,
    code: (props) => <code className="font-mono text-sm bg-muted px-1 py-0.5 rounded" {...props} />,
  };
}
```

**Step 2:** 建立 `app/posts/[slug]/page.tsx`（先用 `react-markdown`-style 最小版；真 MDX 運行在 P1.10 接上）：

```tsx
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeShiki from '@shikijs/rehype';
import { getMDXComponents } from '@/components/mdx-components';

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    components: getMDXComponents(),
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          [
            rehypeShiki,
            { themes: { light: 'github-light', dark: 'github-dark' } },
          ],
        ],
      },
    },
  });

  return (
    <article className="mx-auto max-w-[680px] px-6 py-16">
      <div className="text-sm text-muted-foreground mb-4">
        {post.date} · {post.topic} · 約 {post.readingTimeMinutes} 分鐘閱讀
      </div>
      <h1 className="text-5xl font-semibold tracking-tight mb-6">{post.title}</h1>
      {post.summary && <p className="text-lg text-muted-foreground mb-10">{post.summary}</p>}
      <div className="prose-content">{content}</div>
    </article>
  );
}
```

**Step 3:** 安裝 `next-mdx-remote`（拿 RSC-friendly 版本）：

```bash
npm install next-mdx-remote
```

**Step 4:** 啟動 dev 驗證：

```bash
npm run dev
```

開 http://localhost:3000/posts/mcp-is-dead，預期看到文章標題 + 內文。

**Step 5:** Commit：

```bash
git add app/posts components/mdx-components.tsx package.json package-lock.json
git commit -m "feat: single post page with MDX rendering"
```

---

## P2 — 首頁與主題頁

### Task 2.1: PostCard 組件

**Files:**
- Create: `components/post-card.tsx`

**Step 1:** 建立：

```tsx
import Link from 'next/link';
import type { Post } from '@/lib/types';

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group block rounded-lg border bg-card p-6 transition hover:-translate-y-0.5 hover:border-foreground/30"
    >
      <div className="text-xs text-muted-foreground font-mono mb-3">
        {post.date} · {post.topic} · {post.readingTimeMinutes} min read
      </div>
      <h2 className="text-xl font-semibold tracking-tight mb-2 group-hover:underline">
        {post.title}
      </h2>
      {post.summary && (
        <p className="text-sm text-muted-foreground line-clamp-2">{post.summary}</p>
      )}
      {post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border px-2.5 py-0.5 text-[11px] font-mono text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
```

**Step 2:** Commit：

```bash
git add components/post-card.tsx
git commit -m "feat: PostCard component"
```

---

### Task 2.2: 首頁 /

**Files:**
- Modify: `app/page.tsx`

**Step 1:** 覆寫 `app/page.tsx`：

```tsx
import Link from 'next/link';
import { getAllPosts, getAllTopics } from '@/lib/posts';
import { PostCard } from '@/components/post-card';

export default function HomePage() {
  const posts = getAllPosts();
  const topics = getAllTopics();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <section className="mb-16">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-4">
          Daily Reading Digest
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          個人閱讀文章的結構化分析留存。每篇文章會拆出核心議題、方法論、啟發與盲點。
        </p>
      </section>

      <section className="mb-12">
        <div className="flex flex-wrap gap-2">
          {topics.map(({ topic, count }) => (
            <Link
              key={topic}
              href={`/topics/${topic}`}
              className="rounded-full border px-3 py-1 text-xs font-mono hover:border-foreground/40"
            >
              {topic} <span className="text-muted-foreground">({count})</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </main>
  );
}
```

**Step 2:** 啟 dev，開 http://localhost:3000，驗證：
- 看到 hero + tagline
- 看到 topic chips
- 看到兩張卡片，點擊進文章頁

**Step 3:** Commit：

```bash
git add app/page.tsx
git commit -m "feat: homepage with hero, topic chips, and post cards"
```

---

### Task 2.3: /topics overview 頁

**Files:**
- Create: `app/topics/page.tsx`

**Step 1:** 建立：

```tsx
import Link from 'next/link';
import { getAllTopics, getPostsByTopic } from '@/lib/posts';

export default function TopicsPage() {
  const topics = getAllTopics();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight mb-10">All Topics</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {topics.map(({ topic, count }) => {
          const latest = getPostsByTopic(topic)[0];
          return (
            <Link
              key={topic}
              href={`/topics/${topic}`}
              className="rounded-lg border bg-card p-6 transition hover:border-foreground/30"
            >
              <div className="text-sm text-muted-foreground font-mono mb-2">{count} posts</div>
              <div className="text-xl font-semibold mb-2">{topic}</div>
              {latest && (
                <div className="text-sm text-muted-foreground line-clamp-2">
                  最新：{latest.title}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </main>
  );
}
```

**Step 2:** 驗證 http://localhost:3000/topics。

**Step 3:** Commit：

```bash
git add app/topics/page.tsx
git commit -m "feat: /topics overview page"
```

---

### Task 2.4: /topics/[topic] 頁

**Files:**
- Create: `app/topics/[topic]/page.tsx`

**Step 1:** 建立：

```tsx
import { notFound } from 'next/navigation';
import { getAllTopics, getPostsByTopic } from '@/lib/posts';
import { PostCard } from '@/components/post-card';

export async function generateStaticParams() {
  return getAllTopics().map(({ topic }) => ({ topic }));
}

type Props = { params: Promise<{ topic: string }> };

export default async function TopicPage({ params }: Props) {
  const { topic } = await params;
  const posts = getPostsByTopic(topic);
  if (posts.length === 0) notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10">
        <div className="text-sm text-muted-foreground font-mono mb-2">Topic</div>
        <h1 className="text-4xl font-semibold tracking-tight">{topic}</h1>
        <p className="text-muted-foreground mt-2">{posts.length} posts</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </main>
  );
}
```

**Step 2:** 驗證 http://localhost:3000/topics/ai-ml。

**Step 3:** Commit：

```bash
git add "app/topics/[topic]/page.tsx"
git commit -m "feat: per-topic listing page"
```

---

## P3 — Design System

### Task 3.1: 字體（Geist + Noto Sans TC）

**Files:**
- Modify: `app/layout.tsx`

**Step 1:** 覆寫 `app/layout.tsx`：

```tsx
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Noto_Sans_TC } from 'next/font/google';
import './globals.css';

const notoSansTC = Noto_Sans_TC({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-tc',
});

export const metadata: Metadata = {
  title: 'Daily Reading Digest',
  description: '個人閱讀文章的結構化分析留存',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh-Hant"
      className={`${GeistSans.variable} ${GeistMono.variable} ${notoSansTC.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

**Step 2:** 安裝 `geist` 字體套件：

```bash
npm install geist
```

**Step 3:** 驗證 dev server 沒字體錯誤，開頁面 inspect body CSS 能看到 `--font-geist-sans` 變數。

**Step 4:** Commit：

```bash
git add app/layout.tsx package.json package-lock.json
git commit -m "feat: load Geist Sans/Mono and Noto Sans TC via next/font"
```

---

### Task 3.2: Tailwind v4 token 與 CSS 變數

**Files:**
- Modify: `app/globals.css`

**Step 1:** 覆寫 `app/globals.css`：

```css
@import "tailwindcss";

@theme {
  --font-sans: var(--font-geist-sans), var(--font-noto-tc), system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace;
}

:root {
  --background: #fafafa;
  --foreground: #0a0a0a;
  --card: #ffffff;
  --muted: #f4f4f5;
  --muted-foreground: #71717a;
  --border: #e4e4e7;
  --accent: #0070f3;
}

.dark {
  --background: #0a0a0a;
  --foreground: #fafafa;
  --card: #111111;
  --muted: #18181b;
  --muted-foreground: #a1a1aa;
  --border: #27272a;
  --accent: #3291ff;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-accent: var(--accent);
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans);
  font-feature-settings: "ss01", "cv11";
}

/* Shiki dual-theme support */
html.dark .shiki,
html.dark .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
}

/* Code block styling */
pre {
  @apply rounded-lg border p-4 my-5 overflow-x-auto text-sm;
  background-color: var(--muted);
}
```

**Step 2:** 重啟 dev server，驗證顏色 token 套用。

**Step 3:** Commit：

```bash
git add app/globals.css
git commit -m "feat: Tailwind v4 theme tokens with dark mode CSS variables"
```

---

### Task 3.3: 安裝 next-themes 與 ThemeProvider

**Files:**
- Create: `components/theme-provider.tsx`
- Modify: `app/layout.tsx`

**Step 1:** 建立 `components/theme-provider.tsx`：

```tsx
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ComponentProps } from 'react';

export function ThemeProvider(props: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props} />;
}
```

**Step 2:** 在 `app/layout.tsx` 包 `<ThemeProvider>`：

```tsx
// 在 body 裡：
<body className="antialiased">
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    {children}
  </ThemeProvider>
</body>
```

記得 `import { ThemeProvider } from '@/components/theme-provider';`。

**Step 3:** Commit：

```bash
git add components/theme-provider.tsx app/layout.tsx
git commit -m "feat: wire up next-themes ThemeProvider"
```

---

### Task 3.4: Sticky nav + theme toggle

**Files:**
- Create: `components/site-nav.tsx`
- Create: `components/theme-toggle.tsx`
- Modify: `app/layout.tsx`

**Step 1:** 建立 `components/theme-toggle.tsx`：

```tsx
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" aria-hidden />;

  const isDark = resolvedTheme === 'dark';
  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="w-9 h-9 rounded-md border flex items-center justify-center hover:bg-muted transition"
    >
      {isDark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
```

**Step 2:** 建立 `components/site-nav.tsx`：

```tsx
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-mono text-sm font-medium">
          reading-digest
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/topics" className="text-muted-foreground hover:text-foreground transition">
            topics
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
```

**Step 3:** 在 `app/layout.tsx` 的 `<ThemeProvider>` 裡 `{children}` 之前加：

```tsx
<SiteNav />
{children}
```

記得 import。

**Step 4:** 重啟 dev，驗證：
- 頂部 sticky nav 顯示
- 切換 dark/light 正常，顏色平滑過渡
- 重整後主題持久

**Step 5:** Commit：

```bash
git add components/site-nav.tsx components/theme-toggle.tsx app/layout.tsx
git commit -m "feat: sticky nav with theme toggle"
```

---

### Task 3.5: pangu 中英空白處理

**Files:**
- Create: `components/pangu-provider.tsx`
- Modify: `app/layout.tsx`

**Step 1:** 建立 `components/pangu-provider.tsx`：

```tsx
'use client';

import { useEffect } from 'react';
import pangu from 'pangu';

export function PanguProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    pangu.autoSpacingPage();
  }, []);
  return <>{children}</>;
}
```

**Step 2:** 在 `app/layout.tsx` 包裹 children：

```tsx
<ThemeProvider ...>
  <PanguProvider>
    <SiteNav />
    {children}
  </PanguProvider>
</ThemeProvider>
```

**Step 3:** 開文章頁檢查：英文字與中文字之間自動插入空白（例如「使用 MCP 會」而不是「使用MCP會」）。

**Step 4:** Commit：

```bash
git add components/pangu-provider.tsx app/layout.tsx
git commit -m "feat: pangu auto-spacing for CJK + Latin mix"
```

---

## P4 — TOC、代碼區塊微調

### Task 4.1: TOC 組件（含滾動高亮）

**Files:**
- Create: `components/toc.tsx`
- Modify: `lib/posts.ts`（加 heading 抽取）
- Modify: `app/posts/[slug]/page.tsx`

**Step 1:** 在 `lib/posts.ts` 追加 heading 抽取：

```typescript
export type Heading = { depth: 2 | 3; id: string; text: string };

export function extractHeadings(markdown: string): Heading[] {
  const lines = markdown.split('\n');
  const headings: Heading[] = [];
  let inFence = false;
  for (const line of lines) {
    if (line.trim().startsWith('```')) inFence = !inFence;
    if (inFence) continue;
    const m = line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (!m) continue;
    const depth = m[1].length as 2 | 3;
    const text = m[2].replace(/[`*_]/g, '');
    const id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w一-鿿-]/g, '');
    headings.push({ depth, id, text });
  }
  return headings;
}
```

（注意：`rehype-slug` 產生的 id 規則和這個簡化版可能不完全一致；若發現 TOC 連結跳不到對應段，再改用 `github-slugger` 套件對齊。）

**Step 2:** 建立 `components/toc.tsx`：

```tsx
'use client';

import { useEffect, useState } from 'react';
import type { Heading } from '@/lib/posts';

export function Toc({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -70% 0px' },
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden xl:block fixed top-24 right-8 w-56 text-sm">
      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
        On this page
      </div>
      <ul className="space-y-2 border-l">
        {headings.map((h) => (
          <li key={h.id} className={h.depth === 3 ? 'ml-3' : ''}>
            <a
              href={`#${h.id}`}
              className={`block -ml-px pl-3 border-l transition ${
                activeId === h.id
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

**Step 3:** 在 `app/posts/[slug]/page.tsx` 加：

```tsx
import { Toc } from '@/components/toc';
import { extractHeadings } from '@/lib/posts';

// 在 component 內：
const headings = extractHeadings(post.content);

// 在 return 的 <article> 外層加 wrapper，在 article 旁放 <Toc>：
return (
  <div className="relative">
    <Toc headings={headings} />
    <article className="mx-auto max-w-[680px] px-6 py-16">
      {/* 原有內容 */}
    </article>
  </div>
);
```

**Step 4:** 驗證：開文章頁，視窗寬 >= 1280px 時右側顯示 TOC，滾動時當前段高亮。

**Step 5:** Commit：

```bash
git add lib/posts.ts components/toc.tsx "app/posts/[slug]/page.tsx"
git commit -m "feat: floating TOC with scroll spy"
```

---

### Task 4.2: Code block 外觀微調

**Files:**
- Modify: `app/globals.css`

**Step 1:** 在 `globals.css` 的 `pre` 規則下追加：

```css
pre code {
  background-color: transparent !important;
  padding: 0 !important;
  font-size: 13px;
  line-height: 1.6;
}

/* inline code 差別化 */
:not(pre) > code {
  font-size: 0.875em;
  background-color: var(--muted);
  padding: 0.1em 0.35em;
  border-radius: 0.25rem;
}
```

**Step 2:** 驗證：文章裡有 code block 的段落顯示正常，inline code 與 block code 樣式不混。

**Step 3:** Commit：

```bash
git add app/globals.css
git commit -m "style: refine code block typography"
```

---

## P5 — 搜尋

### Task 5.1: Build-time 搜尋索引

**Files:**
- Create: `lib/search-index.ts`

**Step 1:** 建立：

```typescript
import { getAllPosts } from './posts';

export type SearchDoc = {
  slug: string;
  title: string;
  summary?: string;
  topic: string;
  tags: string[];
  date: string;
  excerpt: string;
};

export function buildSearchIndex(): SearchDoc[] {
  return getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    topic: p.topic,
    tags: p.tags,
    date: p.date,
    excerpt: p.content
      .replace(/[#>*_`\[\]]/g, '')
      .replace(/\s+/g, ' ')
      .slice(0, 500),
  }));
}
```

**Step 2:** 建立 API route `app/api/search/route.ts`：

```typescript
import { NextResponse } from 'next/server';
import { buildSearchIndex } from '@/lib/search-index';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json(buildSearchIndex());
}
```

**Step 3:** 驗證：`npm run dev` → 開 http://localhost:3000/api/search → 看到 JSON 陣列。

**Step 4:** Commit：

```bash
git add lib/search-index.ts app/api/search/route.ts
git commit -m "feat: build-time search index endpoint"
```

---

### Task 5.2: Command palette 組件

**Files:**
- Create: `components/command-palette.tsx`
- Modify: `components/site-nav.tsx`

**Step 1:** 建立 `components/command-palette.tsx`：

```tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import Link from 'next/link';
import type { SearchDoc } from '@/lib/search-index';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [docs, setDocs] = useState<SearchDoc[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('/api/search')
      .then((r) => r.json())
      .then(setDocs);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(docs, {
        keys: ['title', 'summary', 'tags', 'topic', 'excerpt'],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [docs],
  );

  const results = query ? fuse.search(query).slice(0, 10).map((r) => r.item) : docs.slice(0, 8);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md border px-3 h-9 text-xs text-muted-foreground hover:bg-muted transition"
        aria-label="Open search"
      >
        <span>搜尋</span>
        <kbd className="font-mono text-[10px] border rounded px-1">⌘K</kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div
        className="mx-auto mt-32 max-w-xl rounded-lg border bg-card shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜尋文章…"
          className="w-full px-4 h-12 bg-transparent border-b outline-none text-base"
        />
        <ul className="max-h-96 overflow-y-auto py-2">
          {results.map((doc) => (
            <li key={doc.slug}>
              <Link
                href={`/posts/${doc.slug}`}
                className="block px-4 py-2 hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                <div className="font-medium">{doc.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {doc.date} · {doc.topic}
                </div>
              </Link>
            </li>
          ))}
          {results.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-muted-foreground">找不到符合的文章</li>
          )}
        </ul>
      </div>
    </div>
  );
}
```

**Step 2:** 在 `components/site-nav.tsx` 把 `<ThemeToggle />` 旁加 `<CommandPalette />`：

```tsx
<nav className="flex items-center gap-3 text-sm">
  <Link href="/topics" className="text-muted-foreground hover:text-foreground transition">
    topics
  </Link>
  <CommandPalette />
  <ThemeToggle />
</nav>
```

記得 import。

**Step 3:** 驗證：按 `⌘K`（或 `Ctrl+K`）跳出搜尋框、打字有結果、點擊跳到文章、Esc 關閉。

**Step 4:** Commit：

```bash
git add components/command-palette.tsx components/site-nav.tsx
git commit -m "feat: ⌘K command palette with fuse.js search"
```

---

## P6 — RSS、OG image、Tags

### Task 6.1: /feed.xml

**Files:**
- Create: `app/feed.xml/route.ts`

**Step 1:** 建立：

```typescript
import { getAllPosts } from '@/lib/posts';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const TITLE = 'Daily Reading Digest';
const DESC = '個人閱讀文章的結構化分析留存';

export const dynamic = 'force-static';

export async function GET() {
  const posts = getAllPosts();
  const items = posts
    .map(
      (p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${SITE_URL}/posts/${p.slug}</link>
      <guid>${SITE_URL}/posts/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <category>${p.topic}</category>
      <description><![CDATA[${p.summary ?? ''}]]></description>
    </item>`,
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${DESC}</description>
    <language>zh-Hant</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
```

**Step 2:** 驗證：開 http://localhost:3000/feed.xml 看到合法 RSS。

**Step 3:** Commit：

```bash
git add "app/feed.xml/route.ts"
git commit -m "feat: RSS 2.0 feed at /feed.xml"
```

---

### Task 6.2: /og/[slug] 動態 OG image

**Files:**
- Create: `app/og/[slug]/route.tsx`
- Modify: `app/posts/[slug]/page.tsx`（加 metadata）

**Step 1:** 建立 `app/og/[slug]/route.tsx`：

```tsx
import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/posts';

export const runtime = 'nodejs';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return new Response('Not found', { status: 404 });

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: 72,
          background: '#0a0a0a',
          color: '#fafafa',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 24, color: '#a1a1aa', fontFamily: 'monospace' }}>
          {post.date} · {post.topic}
        </div>
        <div style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.1 }}>{post.title}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontSize: 20, color: '#a1a1aa', fontFamily: 'monospace' }}>
            reading-digest
          </div>
          <div style={{ fontSize: 20, color: '#3291ff' }}>
            {post.readingTimeMinutes} min read
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
```

**Step 2:** 在 `app/posts/[slug]/page.tsx` 加 `generateMetadata`：

```tsx
import type { Metadata } from 'next';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [`/og/${slug}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [`/og/${slug}`],
    },
  };
}
```

**Step 3:** 驗證：開 http://localhost:3000/og/mcp-is-dead → 看到 OG 圖片。

**Step 4:** Commit：

```bash
git add "app/og/[slug]/route.tsx" "app/posts/[slug]/page.tsx"
git commit -m "feat: dynamic OG image and per-post metadata"
```

---

### Task 6.3: /tags/[tag] 頁

**Files:**
- Create: `app/tags/[tag]/page.tsx`

**Step 1:** 建立：

```tsx
import { notFound } from 'next/navigation';
import { getAllPosts, getAllTags } from '@/lib/posts';
import { PostCard } from '@/components/post-card';

export async function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

type Props = { params: Promise<{ tag: string }> };

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = getAllPosts().filter((p) => p.tags.includes(tag));
  if (posts.length === 0) notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10">
        <div className="text-sm text-muted-foreground font-mono mb-2">Tag</div>
        <h1 className="text-4xl font-semibold tracking-tight">#{tag}</h1>
        <p className="text-muted-foreground mt-2">{posts.length} posts</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </main>
  );
}
```

**Step 2:** 在 `components/post-card.tsx` 的 tag chips 加連結（把 `<span>` 換成 `<Link>`）：

```tsx
import Link from 'next/link';
...
{post.tags.slice(0, 4).map((t) => (
  <Link
    key={t}
    href={`/tags/${t}`}
    onClick={(e) => e.stopPropagation()}
    className="rounded-full border px-2.5 py-0.5 text-[11px] font-mono text-muted-foreground hover:border-foreground/30"
  >
    {t}
  </Link>
))}
```

注意：卡片外層已經是 `<Link>`，裡面再包 `<Link>` 會 hydration 錯誤。改成把卡片外層不用 `<Link>`，改成 `<article>` + `<Link>` 包在標題上，或用 `onClick` + `router.push`。最簡單：tag 連結用 `<a>` + `onClick stopPropagation`。

為避免上述問題，把 `post-card.tsx` 改為「整張卡片可點 → 標題用 Link；tag chips 是 Link 且 `stopPropagation`」：

```tsx
import Link from 'next/link';
import type { Post } from '@/lib/types';

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group rounded-lg border bg-card p-6 transition hover:-translate-y-0.5 hover:border-foreground/30">
      <div className="text-xs text-muted-foreground font-mono mb-3">
        {post.date} · {post.topic} · {post.readingTimeMinutes} min read
      </div>
      <Link href={`/posts/${post.slug}`}>
        <h2 className="text-xl font-semibold tracking-tight mb-2 group-hover:underline">
          {post.title}
        </h2>
      </Link>
      {post.summary && <p className="text-sm text-muted-foreground line-clamp-2">{post.summary}</p>}
      {post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 4).map((t) => (
            <Link
              key={t}
              href={`/tags/${t}`}
              className="rounded-full border px-2.5 py-0.5 text-[11px] font-mono text-muted-foreground hover:border-foreground/30"
            >
              {t}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
```

**Step 3:** 驗證：首頁點 tag → 跳到 `/tags/[tag]`；點標題 → 跳到文章。

**Step 4:** Commit：

```bash
git add "app/tags/[tag]/page.tsx" components/post-card.tsx
git commit -m "feat: /tags/[tag] page and linkable tag chips"
```

---

## P7 — 部署

### Task 7.1: 本地完整 build 驗證

**Step 1:** 跑 production build：

```bash
npm run build
```

預期：`✓ Compiled successfully`，列出生成的所有靜態頁面路由（`/`、`/posts/...`、`/topics/...`、`/tags/...`、`/feed.xml`、`/api/search`）。

若有 TypeScript / ESLint 錯誤，逐個修掉再重跑。

**Step 2:** 跑 production server 實際訪問：

```bash
npm run start
```

開 http://localhost:3000 驗證整站功能：首頁、文章頁、topic、tag、搜尋、dark mode、RSS、OG image 全部 OK。

**Step 3:** 測試：

```bash
npm test
```

預期：所有 test pass。

**Step 4:** Commit 如有修正：

```bash
git add -A
git commit -m "chore: fix production build errors"
```

---

### Task 7.2: Vercel 部署（手動步驟 — 不自動化）

這步驟需要使用者手動操作（要登入 Vercel），plan 文件記錄 checklist：

**Step 1:** 推目前 commits 上 GitHub：

```bash
git push origin main
```

**Step 2:** 使用者在瀏覽器：
1. 到 https://vercel.com/new
2. Import `daily-reading-digest` repo
3. Framework Preset 自動偵測 Next.js，保留預設 build command `npm run build`
4. 不需要設 env vars（目前全靜態）
5. 點 Deploy

**Step 3:** 部署完成後 Vercel 會給 `https://daily-reading-digest-xxx.vercel.app`。

**Step 4:**（可選）在 Vercel 專案 Settings → Environment Variables 加：
```
NEXT_PUBLIC_SITE_URL = https://daily-reading-digest.vercel.app
```
（或綁自訂 domain 後填真實網址）。這樣 RSS 裡的連結會對。設完 re-deploy。

**Step 5:** 在 README.md 加一行：

```markdown
🌐 **網站**：https://daily-reading-digest.vercel.app
```

Commit：

```bash
git add README.md
git commit -m "docs: add live site URL to README"
git push
```

---

## P8 — Templates 與 README 更新

### Task 8.1: 更新 template 加 front-matter

**Files:**
- Modify: `templates/`（若已有 analysis 模板；若沒有，建立）

**Step 1:** 先看 `templates/` 有什麼：

```bash
ls templates/
```

**Step 2:** 若有模板檔，在最頂端加：

```markdown
---
title: <文章標題>
date: <YYYY-MM-DD>
topic: <ai-ml | devops-infra | product-engineering | career-mindset | misc>
author: <作者姓名>
source_url: <原文 URL>
source_published: <原文發表日期 YYYY-MM-DD>
summary: <一句話摘要>
tags: [<tag1>, <tag2>, <tag3>]
---

# <文章標題>

...（原本模板內容）
```

**Step 3:** 若沒有模板，建立 `templates/analysis-template.md` 套上述內容。

**Step 4:** Commit：

```bash
git add templates/
git commit -m "docs: add front-matter schema to analysis template"
```

---

### Task 8.2: 更新 README 的 workflow 段

**Files:**
- Modify: `README.md` 及 `update-index.sh`（若需要）

**Step 1:** 編輯 `README.md` 的「工作流程」段：

```markdown
## 工作流程

1. 讀完一篇文章後，用 `article-discussion-analysis` skill 產出分析報告（含 YAML front-matter）
2. 依主題放進 `topics/<主題>/`，若還沒想好類別先丟 `_inbox/`
3. `git commit && git push` — Vercel 會自動 deploy 網站
4. （可選）執行 `bash update-index.sh` 更新本 README 索引
```

**Step 2:** Commit：

```bash
git add README.md
git commit -m "docs: update workflow to reflect auto-deploy"
```

---

## Done Criteria

全部完成時應該能：

- [x] http://localhost:3000 首頁顯示 hero + topic chips + 文章卡片
- [x] 點卡片進文章頁，看到大標題、metadata、TOC（桌面版右側）、shiki 代碼區
- [x] 切換 dark/light 正常
- [x] `⌘K` 開搜尋，打字有結果
- [x] `/topics`、`/topics/ai-ml`、`/tags/mcp` 都 work
- [x] `/feed.xml` 是合法 RSS
- [x] `/og/mcp-is-dead` 回傳 1200x630 圖
- [x] `npm test` 全 pass
- [x] `npm run build` 成功
- [x] Vercel 線上版可訪問

## Notes for Executor

- **TDD 範圍**：`lib/posts.ts` 的純函式用 vitest TDD；React 組件以 dev server 視覺驗證為主，不強制寫 component test
- **小步提交**：每個 task 結尾都 commit，避免大爆炸 refactor
- **Windows 路徑**：所有 `fs` / `fast-glob` 呼叫用 `path.join` 跨平台；不要 hardcode `/`
- **遇到 TypeScript 型別錯誤不確定時**：先把 type 改成 `unknown` + type guard，不要 `any` 敷衍
- **遇到 rehype-slug id 與 `extractHeadings` 不一致**：換用 `github-slugger` 套件，兩邊用同一個 slugger 實例
