import matter from 'gray-matter';
import readingTime from 'reading-time';
import fg from 'fast-glob';
import fs from 'node:fs';
import path from 'node:path';
import GithubSlugger from 'github-slugger';
import type { Post, PostFrontmatter } from './types';

export type Heading = { depth: 2 | 3; id: string; text: string };

export function extractHeadings(markdown: string): Heading[] {
  const lines = markdown.split('\n');
  const headings: Heading[] = [];
  const slugger = new GithubSlugger();
  let inFence = false;
  for (const line of lines) {
    if (line.trim().startsWith('```')) inFence = !inFence;
    if (inFence) continue;
    const m = line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (!m) continue;
    const depth = m[1].length as 2 | 3;
    const text = m[2].replace(/[`*_]/g, '');
    const id = slugger.slug(text);
    headings.push({ depth, id, text });
  }
  return headings;
}

export function slugFromFilename(filename: string): string {
  const m = filename.match(/^analysis-\d{8}-(.+)\.md$/);
  if (!m) throw new Error(`Invalid filename pattern: ${filename}`);
  return m[1];
}

function normalizeDate(raw: unknown): string {
  if (raw instanceof Date) return raw.toISOString().slice(0, 10);
  if (typeof raw === 'string') return raw;
  throw new Error(`Invalid date in frontmatter: ${String(raw)}`);
}

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
    date: normalizeDate(fm.date),
    topic: fm.topic,
    author: fm.author,
    sourceUrl: fm.source_url,
    sourcePublished: fm.source_published ? normalizeDate(fm.source_published) : undefined,
    summary: fm.summary,
    tags: fm.tags ?? [],
    cover: fm.cover,
    readingTimeMinutes: Math.max(1, Math.round(rt.minutes)),
    content,
    filePath,
  };
}

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

export type ArchiveMonth = { month: string; count: number; posts: Post[] };
export type ArchiveYear = { year: string; count: number; months: ArchiveMonth[] };

export function groupPostsByYearMonth(posts: Post[]): ArchiveYear[] {
  const byYear = new Map<string, Map<string, Post[]>>();
  for (const p of posts) {
    const [year, month] = p.date.split('-');
    if (!year || !month) continue;
    if (!byYear.has(year)) byYear.set(year, new Map());
    const months = byYear.get(year)!;
    if (!months.has(month)) months.set(month, []);
    months.get(month)!.push(p);
  }
  return Array.from(byYear.entries())
    .map(([year, months]) => ({
      year,
      count: Array.from(months.values()).reduce((n, arr) => n + arr.length, 0),
      months: Array.from(months.entries())
        .map(([month, mPosts]) => ({
          month,
          count: mPosts.length,
          posts: [...mPosts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)),
        }))
        .sort((a, b) => (a.month < b.month ? 1 : a.month > b.month ? -1 : 0)),
    }))
    .sort((a, b) => (a.year < b.year ? 1 : a.year > b.year ? -1 : 0));
}

export function getArchive(): ArchiveYear[] {
  return groupPostsByYearMonth(getAllPosts());
}
