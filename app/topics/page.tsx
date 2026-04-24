import Link from 'next/link';
import { getAllTopics, getPostsByTopic } from '@/lib/posts';

export default function TopicsPage() {
  const topics = getAllTopics();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight mb-10">All Topics</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {topics.map(({ topic, count }) => {
          const latest = getPostsByTopic(topic)[0];
          return (
            <Link
              key={topic}
              href={`/topics/${topic}`}
              className="group rounded-lg border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-muted-foreground/40 hover:shadow-sm"
            >
              <div className="text-xs text-muted-foreground font-mono mb-2">{count} posts</div>
              <div className="text-xl font-semibold tracking-tight mb-2 group-hover:underline decoration-muted-foreground underline-offset-4">
                {topic}
              </div>
              {latest && (
                <div className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  最新：{latest.title}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </main>
  );
}
