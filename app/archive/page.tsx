import Link from 'next/link';
import { getArchive } from '@/lib/posts';

export const metadata = {
  title: 'Archive',
  description: '按年、月瀏覽所有文章分析。',
};

const MONTH_LABEL: Record<string, string> = {
  '01': '1 月',
  '02': '2 月',
  '03': '3 月',
  '04': '4 月',
  '05': '5 月',
  '06': '6 月',
  '07': '7 月',
  '08': '8 月',
  '09': '9 月',
  '10': '10 月',
  '11': '11 月',
  '12': '12 月',
};

export default function ArchivePage() {
  const archive = getArchive();
  const total = archive.reduce((n, y) => n + y.count, 0);

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-semibold tracking-tight mb-3">Archive</h1>
        <p className="text-sm text-muted-foreground">
          {total} 篇文章 · 按年、月歸檔
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_8rem]">
        <div className="space-y-16">
          {archive.map((year) => (
            <section key={year.year} id={`y-${year.year}`} className="scroll-mt-20">
              <div className="mb-6 flex items-baseline gap-3 border-b border-border pb-2">
                <h2 className="text-3xl font-semibold tracking-tight">{year.year}</h2>
                <span className="text-xs font-mono text-muted-foreground">
                  {year.count} posts
                </span>
              </div>

              <div className="space-y-8">
                {year.months.map((month) => (
                  <section key={month.month} id={`y-${year.year}-${month.month}`} className="scroll-mt-20">
                    <h3 className="mb-3 text-sm font-mono uppercase tracking-wider text-muted-foreground">
                      {MONTH_LABEL[month.month] ?? month.month} · {month.count}
                    </h3>
                    <ul className="divide-y divide-border/60">
                      {month.posts.map((post) => (
                        <li key={post.slug} className="py-2.5">
                          <Link
                            href={`/posts/${post.slug}`}
                            className="group grid grid-cols-[5rem_1fr] items-baseline gap-4 sm:grid-cols-[6rem_1fr_auto]"
                          >
                            <span className="font-mono text-xs text-muted-foreground tabular-nums">
                              {post.date.slice(5)}
                            </span>
                            <span className="text-sm leading-snug group-hover:underline decoration-muted-foreground underline-offset-4">
                              {post.title}
                            </span>
                            <span className="hidden sm:inline font-mono text-[11px] text-muted-foreground">
                              {post.topic}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </section>
          ))}

          {archive.length === 0 && (
            <p className="text-sm text-muted-foreground">尚未有任何文章。</p>
          )}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-2">
            <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              years
            </div>
            <ul className="space-y-1 text-sm">
              {archive.map((year) => (
                <li key={year.year}>
                  <a
                    href={`#y-${year.year}`}
                    className="flex items-baseline justify-between gap-2 text-muted-foreground hover:text-foreground transition"
                  >
                    <span>{year.year}</span>
                    <span className="font-mono text-[11px]">{year.count}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
