'use client';

import { useEffect, useState } from 'react';

const SESSION_KEY = 'zot24.booted';

const lines: Array<{ label: string; ms: string; size?: string }> = [
  { label: 'mount /identity', ms: '1.2', size: '1 entry' },
  { label: 'load  /work', ms: '3.4', size: '8 entries' },
  { label: 'load  /projects', ms: '0.8', size: '2 entries' },
  { label: 'load  /writing', ms: '0.3', size: '1 post' },
  { label: 'load  /contact', ms: '0.1', size: '4 channels' },
  { label: 'start scroll-spy daemon', ms: '0.6', size: 'pid 1' },
];

/**
 * Cold-boot intro overlay. Plays once per browser session (sessionStorage-gated)
 * so visitors who return in a new tab don't see it again, but a fresh browser
 * session does. Dismissable with any key or click.
 *
 * Renders nothing during SSR — gates entirely on the client `useEffect`, so
 * there is no hydration mismatch and no FOUC on returning visitors.
 */
export function BootLoader() {
  const [stage, setStage] = useState<'idle' | 'playing' | 'fading' | 'done'>('idle');
  const [shownLines, setShownLines] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seen =
      window.sessionStorage.getItem(SESSION_KEY) === '1' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (seen) {
      setStage('done');
      return;
    }
    window.sessionStorage.setItem(SESSION_KEY, '1');
    setStage('playing');

    const timers: number[] = [];
    lines.forEach((_, i) => {
      timers.push(window.setTimeout(() => setShownLines(i + 1), 120 + i * 110));
    });
    timers.push(window.setTimeout(() => setReady(true), 120 + lines.length * 110 + 200));
    timers.push(window.setTimeout(() => setStage('fading'), 120 + lines.length * 110 + 900));
    timers.push(window.setTimeout(() => setStage('done'), 120 + lines.length * 110 + 1500));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  // Dismiss on any key or click while playing
  useEffect(() => {
    if (stage !== 'playing' && stage !== 'fading') return;
    function skip() {
      setStage('fading');
      window.setTimeout(() => setStage('done'), 200);
    }
    window.addEventListener('keydown', skip, { once: true });
    return () => window.removeEventListener('keydown', skip);
  }, [stage]);

  if (stage === 'idle' || stage === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-[60] bg-[color:var(--t-bg)] flex items-center justify-center px-6 transition-opacity duration-300 ${
        stage === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading site"
      onClick={() => setStage('fading')}
    >
      <div className="w-full max-w-2xl font-mono-feature">
        <div className="dim text-xs uppercase tracking-widest mb-6 flex items-center justify-between">
          <span>
            zot24@asuncion v23.05.17 <span className="dimmer">·</span> boot 0.7s
          </span>
          <span className="dimmer hidden sm:inline">click or any key to skip</span>
        </div>

        <ul className="space-y-1 text-sm">
          {lines.slice(0, shownLines).map((line, i) => (
            <li key={i} className="flex items-baseline justify-between gap-4">
              <div className="flex gap-3 min-w-0">
                <span className="accent shrink-0">[ OK ]</span>
                <span className="truncate">{line.label}</span>
                {line.size && (
                  <span className="dim hidden sm:inline">({line.size})</span>
                )}
              </div>
              <span className="dim num-tab shrink-0 text-xs">{line.ms}ms</span>
            </li>
          ))}
        </ul>

        {ready && (
          <div className="mt-6 accent text-sm">
            ready in 0.6s
            <span className="t-cursor ml-1" />
          </div>
        )}
      </div>
    </div>
  );
}
