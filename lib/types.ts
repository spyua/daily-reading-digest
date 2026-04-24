export type PostFrontmatter = {
  title: string;
  slug?: string;
  date: string;
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
  content: string;
  filePath: string;
};
