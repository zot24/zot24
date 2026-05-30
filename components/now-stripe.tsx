'use client';

import { usePathname } from 'next/navigation';
import { getNow } from '@/lib/now';

/**
 * Thin persistent strip below the global nav showing what I'm actively
 * shipping. Source of truth is `content/now.json` — update that file and
 * the stripe updates everywhere.
 *
 * Hidden on preview variants that ship their own chrome.
 */
export function NowStripe() {
  const pathname = usePathname();
  // Preview variants are self-contained explorations; don't leak the global
  // stripe into them.
  if (pathname.startsWith('/preview')) {
    return null;
  }

  const now = getNow();
  const title = now.updated ? `Updated ${now.updated}` : undefined;

  return (
    <div
      className="sticky top-11 z-40 bg-[color:var(--t-bg-rule)] shadow-[0_1px_0_rgba(255,255,255,0.05)]"
      title={title}
      aria-label={`Currently shipping: ${now.now}`}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10 h-7 flex items-center justify-between text-[0.7rem] uppercase tracking-widest">
        <div className="flex items-center gap-2 min-w-0">
          <span className="accent shrink-0" aria-hidden="true">▸</span>
          <span className="dim shrink-0">now:</span>
          <span className="text-[color:var(--t-fg)] truncate">{now.now}</span>
        </div>
        {now.next && (
          <div className="hidden sm:flex items-center gap-2 shrink-0 ml-4">
            <span className="dim">next:</span>
            <span className="text-[color:var(--t-fg)]">{now.next}</span>
          </div>
        )}
      </div>
    </div>
  );
}
