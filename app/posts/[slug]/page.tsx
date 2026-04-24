import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import { getAllPosts, getPostBySlug, extractHeadings } from '@/lib/posts';
import { getMarkdownComponents } from '@/components/mdx-components';
import { Toc } from '@/components/toc';

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

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
      type: 'article',
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
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

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const headings = extractHeadings(post.content);

  return (
    <div className="relative">
      <Toc headings={headings} />
    <article className="mx-auto max-w-[680px] px-6 py-16">
      <div className="text-sm text-muted-foreground font-mono mb-4">
        {post.date} · {post.topic} · 約 {post.readingTimeMinutes} 分鐘閱讀
      </div>
      <h1 className="text-5xl font-semibold tracking-tight mb-6 leading-tight">
        {post.title}
      </h1>
      {post.summary && (
        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{post.summary}</p>
      )}
      {post.author && (
        <div className="text-sm text-muted-foreground mb-10">
          {post.author}
          {post.sourceUrl && (
            <>
              {' · '}
              <a
                href={post.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-border underline-offset-2 hover:decoration-foreground"
              >
                原文連結
              </a>
            </>
          )}
          {post.sourcePublished && <> · 發表 {post.sourcePublished}</>}
        </div>
      )}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          [rehypeHighlight, { detect: true, ignoreMissing: true }],
        ]}
        components={getMarkdownComponents()}
      >
        {post.content}
      </ReactMarkdown>
    </article>
    </div>
  );
}
