import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { Post, PostFrontmatter } from './types';

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
    sourcePublished: fm.source_published,
    summary: fm.summary,
    tags: fm.tags ?? [],
    cover: fm.cover,
    readingTimeMinutes: Math.max(1, Math.round(rt.minutes)),
    content,
    filePath,
  };
}
