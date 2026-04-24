'use client';

import { useEffect, useState } from 'react';
import type { Heading } from '@/lib/posts';

export function Toc({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -70% 0px' },
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="hidden xl:block fixed top-24 right-8 w-56 text-sm max-h-[calc(100vh-8rem)] overflow-y-auto"
    >
      <div className="text-xs uppercase tracking-wider text-muted-foreground font-mono mb-3">
        On this page
      </div>
      <ul className="space-y-2 border-l border-border">
        {headings.map((h) => (
          <li key={h.id} className={h.depth === 3 ? 'ml-3' : ''}>
            <a
              href={`#${h.id}`}
              className={`block -ml-px pl-3 border-l transition ${
                activeId === h.id
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
