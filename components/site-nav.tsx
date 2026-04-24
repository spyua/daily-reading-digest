import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-mono text-sm font-medium">
          reading-digest
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/topics"
            className="text-muted-foreground hover:text-foreground transition"
          >
            topics
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
