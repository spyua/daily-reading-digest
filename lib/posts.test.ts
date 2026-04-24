import { describe, it, expect } from 'vitest';
import { slugFromFilename, parsePost } from './posts';

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
