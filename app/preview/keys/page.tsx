'use client';

import { useEffect, useState } from 'react';
import { Hero } from '@/components/sections/hero';
import { Experience } from '@/components/sections/experience';
import { Projects } from '@/components/sections/projects';
import { Contact } from '@/components/sections/contact';
import { getAllProjects } from '@/lib/projects';

type SectionId = 'home' | 'work' | 'projects' | 'writing' | 'contact';

const shortcuts: Array<{ keys: string; label: string; id?: SectionId; href?: string }> = [
  { keys: 'g h', label: 'jump to home', id: 'home' },
  { keys: 'g w', label: 'jump to work', id: 'work' },
  { keys: 'g p', label: 'jump to projects', id: 'projects' },
  { keys: 'g r', label: 'jump to writing', href: '/blog' },
  { keys: 'g c', label: 'jump to contact', id: 'contact' },
  { keys: 'j', label: 'scroll to next section' },
  { keys: 'k', label: 'scroll to previous section' },
  { keys: '?', label: 'open this overlay' },
  { keys: 'esc', label: 'close overlay' },
];

function scrollToSection(id: SectionId) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function jumpNeighbor(direction: 1 | -1) {
  const ids: SectionId[] = ['home', 'work', 'projects', 'contact'];
  const els = ids
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null);
  if (els.length === 0) return;

  const middle = window.scrollY + window.innerHeight * 0.35;
  let currentIdx = 0;
  for (let i = 0; i < els.length; i++) {
    if (els[i].offsetTop <= middle) currentIdx = i;
  }
  const nextIdx = Math.max(0, Math.min(els.length - 1, currentIdx + direction));
  els[nextIdx].scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function KeysPreview() {
  const projects = getAllProjects();
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [pendingG, setPendingG] = useState(false);

  useEffect(() => {
    let gTimer: number | undefined;

    function onKey(e: KeyboardEvent) {
      // Ignore if user is typing in an input
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (target?.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      // Escape closes overlay
      if (e.key === 'Escape') {
        setOverlayOpen(false);
        setPendingG(false);
        return;
      }

      // Single keys
      if (e.key === '?') {
        e.preventDefault();
        setOverlayOpen((v) => !v);
        return;
      }
      if (e.key === 'j') {
        jumpNeighbor(1);
        return;
      }
      if (e.key === 'k') {
        jumpNeighbor(-1);
        return;
      }

      // Sequences starting with `g`
      if (pendingG) {
        const map: Record<string, () => void> = {
          h: () => scrollToSection('home'),
          w: () => scrollToSection('work'),
          p: () => scrollToSection('projects'),
          c: () => scrollToSection('contact'),
          r: () => {
            window.location.href = '/blog';
          },
        };
        if (map[e.key]) {
          e.preventDefault();
          map[e.key]();
        }
        setPendingG(false);
        if (gTimer) window.clearTimeout(gTimer);
        return;
      }

      if (e.key === 'g') {
        setPendingG(true);
        // Reset if user doesn't press the second key within 1.2s
        if (gTimer) window.clearTimeout(gTimer);
        gTimer = window.setTimeout(() => setPendingG(false), 1200);
      }
    }

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      if (gTimer) window.clearTimeout(gTimer);
    };
  }, [pendingG]);

  return (
    <>
      <main>
        <Hero />
        <SectionDivider label="work" />
        <Experience />
        <SectionDivider label="projects" />
        <Projects projects={projects} />
        <SectionDivider label="contact" />
        <Contact />
        <Footer />
      </main>

      {/* Sequence indicator — quiet hint when waiting for the second key */}
      {pendingG && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-3 py-1.5 border border-[color:var(--t-accent)] bg-[color:var(--t-bg)] text-[color:var(--t-accent)] font-mono-feature text-xs uppercase tracking-widest pointer-events-none"
          role="status"
        >
          g _   {' '}<span className="dim">(h / w / p / r / c)</span>
        </div>
      )}

      {/* Hint pill — bottom right */}
      <button
        onClick={() => setOverlayOpen(true)}
        className="t-press fixed bottom-5 right-5 z-30 px-3 py-1.5 border border-[color:var(--t-bg-rule)] hover:border-[color:var(--t-accent)] dim hover:text-[color:var(--t-fg)] bg-[color:var(--t-bg)]/85 backdrop-blur-sm text-[0.7rem] uppercase tracking-widest transition-colors"
        aria-label="Open keyboard shortcuts"
      >
        press <span className="accent mx-0.5">?</span> for keys
      </button>

      {/* Help overlay */}
      {overlayOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[color:var(--t-bg)]/85 backdrop-blur-sm p-6"
          onClick={() => setOverlayOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-lg border border-[color:var(--t-accent)] bg-[color:var(--t-bg)] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm">
                <span className="dimmer">$</span>{' '}
                <span className="accent">keys</span>{' '}
                <span className="dim">--list</span>
              </div>
              <button
                onClick={() => setOverlayOpen(false)}
                className="dim hover:accent text-xs uppercase tracking-widest"
                aria-label="Close"
              >
                esc
              </button>
            </div>

            <div className="dim text-xs select-none mb-4">
              ┌─ keyboard navigation ────────────────────────┐
            </div>

            <ul className="space-y-1.5 text-sm">
              {shortcuts.map((s) => (
                <li key={s.keys} className="flex items-baseline justify-between gap-4">
                  <kbd className="font-mono-feature accent shrink-0 min-w-[3.5rem]">
                    {s.keys}
                  </kbd>
                  <span className="dim flex-1">{s.label}</span>
                </li>
              ))}
            </ul>

            <div className="dim text-xs select-none mt-4">
              └──────────────────────────────────────────────┘
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div
      aria-hidden="true"
      className="max-w-5xl mx-auto px-6 md:px-10 dimmer text-[0.7rem] uppercase tracking-widest select-none"
    >
      <pre className="m-0 leading-tight">{`╌╌╌╌ /${label} ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌`}</pre>
    </div>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="max-w-5xl mx-auto px-6 md:px-10 py-12 dim text-xs">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span>─── eof ─── <span className="dimmer">© {year} zot24</span></span>
        <span className="dimmer">press <span className="accent">?</span> for keys</span>
      </div>
    </footer>
  );
}
