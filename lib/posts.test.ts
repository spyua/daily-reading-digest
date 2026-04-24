import { describe, it, expect } from 'vitest';
import { slugFromFilename, parsePost, groupPostsByYearMonth } from './posts';
import type { Post } from './types';

describe('slugFromFilename', () => {
  it('extracts slug from analysis-YYYYMMDD-slug.md', () => {
    expect(slugFromFilename('analysis-20260424-mcp-is-dead.md')).toBe('mcp-is-dead');
  });

  it('handles multi-hyphen slugs', () => {
    expect(slugFromFilename('analysis-20260424-dont-become-devops-2026.md')).toBe(
      'dont-become-devops-2026',
    );
  });

  it('throws on invalid filename', () => {
    expect(() => slugFromFilename('random.md')).toThrow();
  });
});

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

  it('defaults tags to empty array when front-matter omits them', () => {
    const noTags = `---\ntitle: X\ndate: 2026-01-01\ntopic: misc\n---\n\nbody`;
    const post = parsePost({
      filename: 'analysis-20260101-x.md',
      rawContent: noTags,
      filePath: 'topics/misc/analysis-20260101-x.md',
    });
    expect(post.tags).toEqual([]);
  });
});

function makePost(overrides: Partial<Post> & Pick<Post, 'slug' | 'date'>): Post {
  return {
    slug: overrides.slug,
    title: overrides.title ?? overrides.slug,
    date: overrides.date,
    topic: overrides.topic ?? 'misc',
    tags: overrides.tags ?? [],
    readingTimeMinutes: overrides.readingTimeMinutes ?? 1,
    content: overrides.content ?? '',
    filePath: overrides.filePath ?? `topics/misc/analysis-${overrides.date.replace(/-/g, '')}-${overrides.slug}.md`,
  };
}

describe('groupPostsByYearMonth', () => {
  it('groups posts by year then month, newest first', () => {
    const posts = [
      makePost({ slug: 'a', date: '2026-04-24' }),
      makePost({ slug: 'b', date: '2026-04-10' }),
      makePost({ slug: 'c', date: '2026-03-01' }),
      makePost({ slug: 'd', date: '2025-12-15' }),
    ];
    const grouped = groupPostsByYearMonth(posts);

    expect(grouped.map((y) => y.year)).toEqual(['2026', '2025']);
    expect(grouped[0].count).toBe(3);
    expect(grouped[0].months.map((m) => m.month)).toEqual(['04', '03']);
    expect(grouped[0].months[0].posts.map((p) => p.slug)).toEqual(['a', 'b']);
    expect(grouped[1].months[0].posts.map((p) => p.slug)).toEqual(['d']);
  });

  it('returns empty array for no posts', () => {
    expect(groupPostsByYearMonth([])).toEqual([]);
  });
});
