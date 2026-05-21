'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

interface Testimonial {
  name: string;
  role: string;
  image?: string;
  text: string;
}

interface ReferenceWindowProps {
  /** Path shown in the popover's title bar (e.g. `~/refs/blackrock`). */
  path: string;
  testimonials: Testimonial[];
}

/**
 * A small "OS window" popover that surfaces a job's recommendation /
 * testimonial on hover (desktop) and click (touch). Renders via portal
 * so it escapes the parent TerminalFrame's `overflow: hidden`.
 */
export function ReferenceWindow({ path, testimonials }: ReferenceWindowProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; arrowOffset: number } | null>(
    null
  );

  // Recompute position whenever the popover opens (or window scrolls/resizes).
  useEffect(() => {
    if (!open && !pinned) return;

    function place() {
      const el = triggerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const popWidth = Math.min(420, window.innerWidth - 24);
      // Center horizontally over the trigger, clamped to the viewport.
      let left = r.left + r.width / 2 - popWidth / 2;
      left = Math.max(12, Math.min(window.innerWidth - popWidth - 12, left));
      const top = r.bottom + 8;
      setCoords({
        top: top + window.scrollY,
        left: left + window.scrollX,
        arrowOffset: r.left + r.width / 2 - left,
      });
    }

    place();
    window.addEventListener('scroll', place, { passive: true });
    window.addEventListener('resize', place);
    return () => {
      window.removeEventListener('scroll', place);
      window.removeEventListener('resize', place);
    };
  }, [open, pinned]);

  // Click-outside / Escape closes a pinned popover.
  useEffect(() => {
    if (!pinned) return;
    function onDoc(e: MouseEvent) {
      const t = e.target as Node | null;
      if (triggerRef.current?.contains(t) || (t && (t as HTMLElement).closest?.('[data-ref-window]'))) {
        return;
      }
      setPinned(false);
      setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setPinned(false);
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [pinned]);

  const isVisible = open || pinned;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={(e) => {
          e.preventDefault();
          setPinned((v) => !v);
        }}
        aria-expanded={isVisible}
        aria-label="Reference / recommendation"
        className={`t-press inline-flex items-center gap-1 px-1.5 py-0.5 ml-2 align-middle text-[0.65rem] uppercase tracking-widest border transition-colors ${
          isVisible
            ? 'border-[color:var(--t-accent)] text-[color:var(--t-accent)]'
            : 'border-[color:var(--t-bg-rule)] dim hover:border-[color:var(--t-fg-dim)] hover:text-[color:var(--t-fg)]'
        }`}
      >
        ref
        <span aria-hidden="true" className="text-[0.85em] leading-none">
          ↗
        </span>
      </button>

      {isVisible && coords && typeof window !== 'undefined' &&
        createPortal(
          <div
            data-ref-window
            role="dialog"
            aria-label="Recommendation"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => !pinned && setOpen(false)}
            style={{
              position: 'absolute',
              top: coords.top,
              left: coords.left,
              width: 'min(420px, calc(100vw - 24px))',
              zIndex: 70,
            }}
            className="bg-[color:var(--t-bg)] border border-[color:var(--t-bg-rule)] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6),0_0_0_1px_rgba(132,255,0,0.05)]"
          >
            {/* Title bar */}
            <div
              className="flex items-center justify-between gap-3 px-3 h-6 border-b border-[color:var(--t-bg-rule)] bg-[color:var(--t-bg)]/40 text-[0.65rem] uppercase tracking-widest"
              aria-hidden="true"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="hidden sm:flex items-center gap-1.5 mr-1.5 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-[color:var(--t-fg-dimmer)]" />
                  <span className="w-2 h-2 rounded-full bg-[color:var(--t-fg-dimmer)]" />
                  <span className="w-2 h-2 rounded-full bg-[color:var(--t-fg-dimmer)]" />
                </span>
                <span className="dim truncate">
                  <span className="hidden sm:inline">
                    <span>zot24@asuncion</span>
                    <span className="dimmer">:</span>
                  </span>
                  <span className="text-[color:var(--t-fg)]">{path}</span>
                </span>
              </div>
              {pinned && (
                <button
                  type="button"
                  onClick={() => {
                    setPinned(false);
                    setOpen(false);
                  }}
                  className="dim hover:text-[color:var(--t-fg)] text-base leading-none"
                  aria-label="Close"
                >
                  ×
                </button>
              )}
            </div>

            {/* Body */}
            <div className="px-4 py-4 space-y-4">
              {testimonials.map((t, i) => (
                <figure key={i} className="text-sm space-y-2">
                  <blockquote className="font-serif-feature italic text-[color:var(--t-fg)]/90 leading-relaxed pretty">
                    “{t.text}”
                  </blockquote>
                  <figcaption className="flex items-center gap-2 text-[0.7rem] uppercase tracking-widest dim">
                    {t.image ? (
                      <span className="relative inline-block w-5 h-5 rounded-full overflow-hidden ring-1 ring-[color:var(--t-bg-rule)]">
                        <Image src={t.image} alt={t.name} fill className="object-cover" sizes="20px" />
                      </span>
                    ) : (
                      <span className="accent">—</span>
                    )}
                    <span className="text-[color:var(--t-fg)]/90">{t.name}</span>
                    <span className="dimmer">·</span>
                    <span>{t.role.toLowerCase()}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
