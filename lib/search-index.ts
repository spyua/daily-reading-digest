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
      .replace(/[#>*_`[\]]/g, '')
      .replace(/\s+/g, ' ')
      .slice(0, 500),
  }));
}
