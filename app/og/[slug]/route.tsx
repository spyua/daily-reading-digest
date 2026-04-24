import { ImageResponse } from 'next/og';
import { getAllPosts, getPostBySlug } from '@/lib/posts';

export const runtime = 'nodejs';
export const dynamic = 'force-static';

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

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
        <div style={{ display: 'flex', fontSize: 24, color: '#a1a1aa', fontFamily: 'monospace' }}>
          {post.date} · {post.topic}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 64,
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {post.title}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <div style={{ display: 'flex', fontSize: 20, color: '#a1a1aa', fontFamily: 'monospace' }}>
            reading-digest
          </div>
          <div style={{ display: 'flex', fontSize: 20, color: '#3291ff' }}>
            {post.readingTimeMinutes} min read
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
