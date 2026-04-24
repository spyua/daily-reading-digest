import Link from 'next/link';
import type { Post } from '@/lib/types';

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group rounded-lg border border-zinc-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-sm">
      <div className="text-xs text-zinc-500 font-mono mb-3">
        {post.date} · {post.topic} · {post.readingTimeMinutes} min read
      </div>
      <Link href={`/posts/${post.slug}`}>
        <h2 className="text-xl font-semibold tracking-tight mb-2 group-hover:underline decoration-zinc-400 underline-offset-4">
          {post.title}
        </h2>
      </Link>
      {post.summary && (
        <p className="text-sm text-zinc-600 line-clamp-2 leading-relaxed">{post.summary}</p>
      )}
      {post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 4).map((t) => (
            <Link
              key={t}
              href={`/tags/${t}`}
              className="rounded-full border border-zinc-200 px-2.5 py-0.5 text-[11px] font-mono text-zinc-600 hover:border-zinc-400 transition"
            >
              {t}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
