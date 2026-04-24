'use client';

import { useEffect, useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import Link from 'next/link';
import type { SearchDoc } from '@/lib/search-index';
import { withBasePath } from '@/lib/config';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [docs, setDocs] = useState<SearchDoc[]>([]);
  const [query, setQuery] = useState('');
  const [mac, setMac] = useState(true);

  useEffect(() => {
    setMac(typeof navigator !== 'undefined' && /Mac|iPhone|iPad/i.test(navigator.platform));
    fetch(withBasePath('/api/search.json'))
      .then((r) => r.json())
      .then(setDocs)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(docs, {
        keys: ['title', 'summary', 'tags', 'topic', 'excerpt'],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [docs],
  );

  const results = query ? fuse.search(query).slice(0, 10).map((r) => r.item) : docs.slice(0, 8);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md border border-border px-3 h-9 text-xs text-muted-foreground hover:bg-muted transition"
        aria-label="Open search"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <span className="hidden sm:inline">搜尋</span>
        <kbd className="hidden sm:inline font-mono text-[10px] border border-border rounded px-1 py-0.5 ml-1">
          {mac ? '⌘K' : 'Ctrl K'}
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="mx-auto mt-24 max-w-xl rounded-lg border border-border bg-card shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center border-b border-border px-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜尋文章、主題、tags…"
                className="w-full h-12 bg-transparent outline-none text-base ml-3"
              />
              <kbd className="font-mono text-[10px] text-muted-foreground border border-border rounded px-1 py-0.5">
                ESC
              </kbd>
            </div>
            <ul className="max-h-96 overflow-y-auto py-2">
              {results.map((doc) => (
                <li key={doc.slug}>
                  <Link
                    href={`/posts/${doc.slug}`}
                    className="block px-4 py-2.5 hover:bg-muted transition"
                    onClick={() => setOpen(false)}
                  >
                    <div className="font-medium">{doc.title}</div>
                    <div className="text-xs text-muted-foreground font-mono mt-0.5">
                      {doc.date} · {doc.topic}
                      {doc.tags.length > 0 && (
                        <span>
                          {' · '}
                          {doc.tags.slice(0, 3).map((t, i) => (
                            <span key={t}>
                              {i > 0 && ' '}
                              #{t}
                            </span>
                          ))}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
              {results.length === 0 && (
                <li className="px-4 py-8 text-center text-sm text-muted-foreground">
                  找不到符合的文章
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
