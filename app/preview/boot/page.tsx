'use client';

import { useEffect, useState } from 'react';
import { Hero } from '@/components/sections/hero';
import { Experience } from '@/components/sections/experience';
import { Projects } from '@/components/sections/projects';
import { Contact } from '@/components/sections/contact';
import { getAllProjects } from '@/lib/projects';

// Tweak this to control how often the boot sequence shows.
// In production we'd cache via localStorage so it only plays on first visit.
// In the preview we always show it so you can see the effect.
const ALWAYS_PLAY_IN_PREVIEW = true;

const bootLines: Array<{ label: string; ms: string; size?: string }> = [
  { label: 'mount /identity', ms: '1.2', size: '1 entry' },
  { label: 'load  /work', ms: '3.4', size: '8 entries' },
  { label: 'load  /projects', ms: '0.8', size: '2 entries' },
  { label: 'load  /writing', ms: '0.3', size: '1 post' },
  { label: 'load  /contact', ms: '0.1', size: '4 channels' },
  { label: 'start scroll-spy daemon', ms: '0.6', size: 'pid 1' },
];

export default function BootPreview() {
  const projects = getAllProjects();
  const [booting, setBooting] = useState(true);
  const [shownLines, setShownLines] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ALWAYS_PLAY_IN_PREVIEW && typeof window !== 'undefined') {
      const seen = window.sessionStorage.getItem('zot24-booted');
      if (seen) {
        setBooting(false);
        return;
      }
      window.sessionStorage.setItem('zot24-booted', '1');
    }

    const timers: number[] = [];
    bootLines.forEach((_, i) => {
      timers.push(window.setTimeout(() => setShownLines(i + 1), 120 + i * 110));
    });
    timers.push(window.setTimeout(() => setReady(true), 120 + bootLines.length * 110 + 200));
    timers.push(
      window.setTimeout(() => setBooting(false), 120 + bootLines.length * 110 + 900)
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  return (
    <>
      {/* ── persistent NOW stripe ──────────────────────────────────────────── */}
      {!booting && <NowStripe />}

      {/* ── bootloader overlay ─────────────────────────────────────────────── */}
      {booting && (
        <div className="fixed inset-0 z-50 bg-[color:var(--t-bg)] flex items-center justify-center px-6">
          <div className="w-full max-w-2xl font-mono-feature">
            <div className="dim text-xs uppercase tracking-widest mb-6">
              zot24@asuncion v23.05.17{'  '}
              <span className="dimmer">·</span>{' '}
              boot 0.7s
            </div>

            <div className="space-y-1 text-sm">
              {bootLines.slice(0, shownLines).map((line, i) => (
                <div key={i} className="flex items-baseline justify-between gap-4">
                  <div className="flex gap-3 min-w-0">
                    <span className="accent shrink-0">[ OK ]</span>
                    <span className="truncate">{line.label}</span>
                    {line.size && (
                      <span className="dim hidden sm:inline">({line.size})</span>
                    )}
                  </div>
                  <span className="dim num-tab shrink-0 text-xs">{line.ms}ms</span>
                </div>
              ))}
            </div>

            {ready && (
              <div className="mt-6 accent text-sm">
                ready in 0.6s
                <span className="t-cursor ml-1" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── homepage reveal ──────────────────────────────────────────────── */}
      <div className={`transition-opacity duration-500 ${booting ? 'opacity-0' : 'opacity-100'}`}>
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
      </div>
    </>
  );
}

/**
 * Thin persistent strip below the global nav. In production this would read
 * from a single source-of-truth JSON ("/content/now.json") so it can be
 * updated without touching React code.
 */
function NowStripe() {
  return (
    <div className="sticky top-11 z-40 bg-[color:var(--t-bg)]/90 backdrop-blur-sm border-b border-[color:var(--t-bg-rule)]">
      <div className="max-w-5xl mx-auto px-6 md:px-10 h-7 flex items-center justify-between text-[0.7rem] uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <span className="accent">▸</span>
          <span className="dim">now:</span>
          <span className="text-[color:var(--t-fg)]">shipping nworth 0.4</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="dim">next:</span>
          <span className="text-[color:var(--t-fg)]">zskills 0.8 release</span>
        </div>
      </div>
    </div>
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
        <span className="dimmer">boot 0.6s · 6 services up</span>
      </div>
    </footer>
  );
}
