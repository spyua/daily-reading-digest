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
        <div className="text-sm text-zinc-500 font-mono mb-2">Topic</div>
        <h1 className="text-4xl font-semibold tracking-tight">{topic}</h1>
        <p className="text-zinc-600 mt-2">{posts.length} posts</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </main>
  );
}
