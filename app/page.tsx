import Link from 'next/link';
import { getAllPosts, getAllTopics } from '@/lib/posts';
import { PostCard } from '@/components/post-card';

export default function HomePage() {
  const posts = getAllPosts();
  const topics = getAllTopics();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <section className="mb-16">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-4 leading-[1.05]">
          Daily Reading Digest
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          個人閱讀文章的結構化分析留存。每篇文章會拆出核心議題、方法論、啟發與盲點。
        </p>
      </section>

      {topics.length > 0 && (
        <section className="mb-12">
          <div className="flex flex-wrap gap-2">
            {topics.map(({ topic, count }) => (
              <Link
                key={topic}
                href={`/topics/${topic}`}
                className="rounded-full border border-border px-3 py-1 text-xs font-mono hover:border-muted-foreground/50 transition"
              >
                {topic} <span className="text-muted-foreground">({count})</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </main>
  );
}
