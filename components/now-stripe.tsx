'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Persistent CRT-green status bar under the nav. Polls the GitHub
 * releases endpoint at mount and shows the most-recent release across
 * a fixed list of repos as 'NOW', and the second-most-recent as 'NEXT'.
 *
 * Auto-updates via the browser's HTTP cache (GitHub's /releases/latest
 * endpoint sets Cache-Control: max-age=60), so within ~1 minute of a
 * new release publishing the bar reflects it for every visitor —
 * no rebuild required.
 *
 * Hidden on preview routes that ship their own chrome.
 */

const REPOS = ['zot24/zskills', 'zot24/nworth'] as const;

interface Release {
  repo: string;
  tagName: string;
  publishedAt: string;
  url: string;
}

async function fetchRelease(repo: string): Promise<Release | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/releases/latest`,
      {
        headers: { Accept: 'application/vnd.github+json' },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      repo: repo.split('/')[1],
      tagName: data.tag_name,
      publishedAt: data.published_at,
      url: data.html_url,
    };
  } catch {
    return null;
  }
}

export function NowStripe() {
  const pathname = usePathname();
  const hidden = pathname.startsWith('/preview');
  const [releases, setReleases] = useState<Release[]>([]);
  const [state, setState] = useState<'loading' | 'ready' | 'empty'>('loading');

  useEffect(() => {
    if (hidden) return;
    let cancelled = false;
    Promise.all(REPOS.map(fetchRelease)).then((results) => {
      if (cancelled) return;
      const valid = results.filter((r): r is Release => r !== null);
      valid.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
      setReleases(valid);
      setState(valid.length > 0 ? 'ready' : 'empty');
    });
    return () => {
      cancelled = true;
    };
  }, [hidden]);

  if (hidden) return null;

  const latest = releases[0];
  const next = releases[1];

  return (
    <div className="sticky top-11 z-40 bg-[rgba(132,255,0,0.025)] border-b border-[rgba(132,255,0,0.18)] now-broadcast">
      <div className="max-w-5xl mx-auto px-6 md:px-10 h-6 flex items-center justify-between gap-4 text-[0.62rem] uppercase tracking-[0.12em]">
        {/* NOW */}
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="text-[color:var(--t-accent)] shrink-0 t-pulse"
            aria-hidden="true"
          >
            ▸
          </span>
          <span className="text-[color:var(--t-accent)]/70 shrink-0">now</span>
          {state === 'loading' ? (
            <span className="text-[color:var(--t-accent)]/50 truncate">
              checking releases…
            </span>
          ) : latest ? (
            <a
              href={latest.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--t-accent)] truncate hover:underline underline-offset-2"
            >
              {latest.repo} {latest.tagName}
            </a>
          ) : (
            <span className="text-[color:var(--t-accent)]/40">no releases</span>
          )}
        </div>

        {/* NEXT */}
        {next && (
          <div className="hidden sm:flex items-center gap-2 min-w-0">
            <span
              className="text-[color:var(--t-accent)]/65 shrink-0"
              aria-hidden="true"
            >
              →
            </span>
            <span className="text-[color:var(--t-accent)]/65 shrink-0">
              next
            </span>
            <a
              href={next.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--t-accent)]/85 truncate hover:underline underline-offset-2"
            >
              {next.repo} {next.tagName}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
