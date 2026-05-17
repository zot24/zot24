'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Hero } from '@/components/sections/hero';
import { Experience } from '@/components/sections/experience';
import { Projects } from '@/components/sections/projects';
import { Contact } from '@/components/sections/contact';
import { getAllProjects } from '@/lib/projects';

type PanelId = 'home' | 'work' | 'projects' | 'writing' | 'contact';
const panels: Array<{ id: PanelId; label: string }> = [
  { id: 'home', label: 'home' },
  { id: 'work', label: 'work' },
  { id: 'projects', label: 'projects' },
  { id: 'writing', label: 'writing' },
  { id: 'contact', label: 'contact' },
];

function useClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const fmt = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'America/Asuncion',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      setTime(fmt.format(new Date()));
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function PanelsPreview() {
  const time = useClock();
  const projects = getAllProjects();
  const [active, setActive] = useState<PanelId>('home');
  const [previous, setPrevious] = useState<PanelId | null>(null);

  // Track previous so the outgoing panel can fade out as the new one fades in.
  useEffect(() => {
    if (!previous) return;
    const id = window.setTimeout(() => setPrevious(null), 200);
    return () => window.clearTimeout(id);
  }, [previous]);

  function switchTo(id: PanelId) {
    if (id === active) return;
    setPrevious(active);
    setActive(id);
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Top status bar — variant's own chrome */}
      <header className="shrink-0 border-b border-[color:var(--t-bg-rule)] bg-[color:var(--t-bg)]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-11 flex items-center justify-between text-[0.72rem] uppercase tracking-widest">
          <div className="flex items-center gap-3 dim">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[color:var(--t-accent)] t-pulse" />
            <span className="text-[color:var(--t-fg)]">zot24@asuncion</span>
            <span className="dimmer">·</span>
            <span className="num-tab tabular-nums">{time || '--:--'}</span>
          </div>

          <nav className="flex items-center gap-1 md:gap-2">
            {panels.map((p) => {
              const isActive = active === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => switchTo(p.id)}
                  className={`t-press px-2 md:px-3 py-2 transition-colors ${
                    isActive
                      ? 'text-[color:var(--t-accent)]'
                      : 'dim hover:text-[color:var(--t-fg)]'
                  }`}
                >
                  {isActive && <span className="dimmer mr-1">{'>'}</span>}
                  {p.label}
                </button>
              );
            })}
            <Link
              href="/preview"
              className="ml-2 dim hover:text-[color:var(--t-fg)] transition-colors"
            >
              ← variants
            </Link>
          </nav>
        </div>
      </header>

      {/* Single panel viewport */}
      <main className="flex-1 overflow-y-auto relative">
        {panels.map((p) => {
          const isActive = active === p.id;
          const isPrevious = previous === p.id;
          const visible = isActive || isPrevious;
          if (!visible) return null;
          return (
            <div
              key={p.id}
              className={`absolute inset-0 overflow-y-auto transition-opacity duration-200 ease-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              aria-hidden={!isActive}
            >
              <PanelContent id={p.id} projects={projects} />
            </div>
          );
        })}
      </main>
    </div>
  );
}

function PanelContent({ id, projects }: { id: PanelId; projects: any[] }) {
  if (id === 'home') return <Hero />;
  if (id === 'work') return <Experience />;
  if (id === 'projects') return <Projects projects={projects} />;
  if (id === 'contact') return <Contact />;
  // writing
  return (
    <section className="max-w-3xl mx-auto px-6 md:px-10 py-12">
      <div className="text-sm md:text-base mb-2">
        <span className="dimmer">$</span>{' '}
        <span className="accent">writing</span>{' '}
        <span className="dim">list --recent</span>
      </div>
      <div className="dim text-xs select-none mb-6">
        ── writing ───────────────────────────────────────────────────
      </div>
      <p className="dim text-sm">
        Full writing list lives at{' '}
        <Link href="/blog" className="accent hover:underline underline-offset-4">
          /blog
        </Link>
        .
      </p>
    </section>
  );
}
