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
