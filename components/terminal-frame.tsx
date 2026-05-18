'use client';

import { ReactNode, useEffect, useState } from 'react';

/**
 * Fire this from any nav/in-page link to ensure the target pane is open
 * before scrolling lands on it. Each TerminalFrame listens for this event
 * and expands if its id matches.
 */
export function dispatchExpandPane(id: string) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent('zot24:expand-pane', { detail: { id } })
  );
}

interface TerminalFrameProps {
  /** Section anchor id — drives the URL hash. */
  id: string;
  /** Path shown in the title bar (e.g. `~/work`). */
  path: string;
  /** Optional metadata on the right of the title bar (e.g. "8 entries"). */
  meta?: string;
  /** Optional tone for the active-process dot. */
  status?: 'active' | 'idle';
  /** Whether the pane is collapsed by default. */
  defaultMinimized?: boolean;
  children: ReactNode;
}

/**
 * Wraps a section so it reads as its own terminal pane. Click the title
 * bar (or the yellow traffic-light dot) to minimize/expand. State is
 * per-mount (no persistence) — refreshing restores defaults.
 *
 * Mobile: edge-to-edge frame (no outer gutter), title bar shows just the
 * path, traffic-light dots hidden, tighter vertical rhythm between panes.
 *
 * Desktop: framed with a gutter, full title bar (`zot24@asuncion:~/work`),
 * traffic-light dots visible, more breathing room between panes.
 */
export function TerminalFrame({
  id,
  path,
  meta,
  status = 'active',
  defaultMinimized = false,
  children,
}: TerminalFrameProps) {
  const [minimized, setMinimized] = useState(defaultMinimized);
  const toggle = () => setMinimized((v) => !v);

  // Expand-on-demand: react to nav clicks and URL hash on first load so
  // visitors landing on `/#projects` (or clicking "projects" in the nav
  // while that pane is collapsed) always see the pane open.
  useEffect(() => {
    function onExpand(e: Event) {
      const detail = (e as CustomEvent).detail as { id?: string } | undefined;
      if (detail?.id === id) setMinimized(false);
    }
    window.addEventListener('zot24:expand-pane', onExpand);

    // Honor the URL hash on initial mount.
    if (typeof window !== 'undefined' && window.location.hash === `#${id}`) {
      setMinimized(false);
    }

    return () => window.removeEventListener('zot24:expand-pane', onExpand);
  }, [id]);

  return (
    <section
      id={id}
      className="md:max-w-5xl md:mx-auto md:px-6 mb-4 md:mb-10 scroll-mt-24"
    >
      <div className="md:border md:border-[color:var(--t-bg-rule)] border-y border-[color:var(--t-bg-rule)] bg-[color:var(--t-bg-elev)] overflow-hidden">
        {/* Title bar — the whole bar is clickable to toggle minimize. */}
        <header
          className="flex items-center justify-between gap-3 px-4 md:px-4 h-6 md:h-7 border-b border-[color:var(--t-bg-rule)] bg-[color:var(--t-bg)]/40 text-[0.68rem] md:text-[0.7rem] uppercase tracking-wider md:tracking-widest cursor-pointer select-none transition-colors hover:bg-[color:var(--t-accent-soft)]"
          onClick={toggle}
          role="button"
          tabIndex={0}
          aria-expanded={!minimized}
          aria-controls={`${id}-body`}
          aria-label={`${minimized ? 'Expand' : 'Minimize'} ${path}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggle();
            }
          }}
        >
          <div className="flex items-center gap-2 min-w-0">
            {/* Traffic-light dots — desktop only. Yellow is interactive
                (also toggles); red/green are decorative. */}
            <span className="hidden sm:flex items-center gap-1.5 mr-1.5 shrink-0">
              <span
                className="w-2 h-2 rounded-full bg-[color:var(--t-fg-dimmer)] hover:bg-[#ff5f57]/70 transition-colors"
                aria-hidden="true"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggle();
                }}
                className="w-2 h-2 rounded-full bg-[color:var(--t-fg-dimmer)] hover:bg-[#ffbd2e] transition-colors t-press"
                aria-label={minimized ? 'Expand pane' : 'Minimize pane'}
                title={minimized ? 'Expand' : 'Minimize'}
              />
              <span
                className="w-2 h-2 rounded-full bg-[color:var(--t-fg-dimmer)] hover:bg-[#28c840]/70 transition-colors"
                aria-hidden="true"
              />
            </span>

            <span className="dim truncate flex items-center">
              <span className="hidden sm:inline">
                <span>zot24@asuncion</span>
                <span className="dimmer">:</span>
              </span>
              <span className="text-[color:var(--t-fg)]">{path}</span>
            </span>

            {status === 'active' && !minimized && (
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-[color:var(--t-accent)] t-pulse shrink-0 ml-1"
                aria-label="active"
              />
            )}
          </div>

          <div className="hidden md:flex items-center gap-3 shrink-0">
            {meta && <span className="dim num-tab">{meta}</span>}
            <span className="dimmer" aria-hidden="true">
              {minimized ? '+' : '−'}
            </span>
          </div>
        </header>

        {/* Body — collapsible. The grid-template-rows trick gives a
            smooth height transition that handles dynamic content height
            without measuring. */}
        <div
          id={`${id}-body`}
          className="terminal-pane-collapser"
          data-minimized={minimized ? 'true' : 'false'}
          aria-hidden={minimized}
        >
          <div className="terminal-pane-body min-h-0">{children}</div>
        </div>
      </div>
    </section>
  );
}
