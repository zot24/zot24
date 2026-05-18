'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Experience } from '@/components/sections/experience';
import { Projects } from '@/components/sections/projects';
import { Writing } from '@/components/sections/writing';
import { Contact } from '@/components/sections/contact';
import { SocialLinks } from '@/components/social-links';
import { getAllProjects } from '@/lib/projects';

const stats = [
  { num: '24', label: 'yrs' },
  { num: '10+', label: 'cloud' },
  { num: '12', label: 'co' },
  { num: 'PY', label: 'base' },
];

type SectionId = 'work' | 'projects' | 'writing' | 'contact';
const navItems: Array<{ id: SectionId; label: string }> = [
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

/** Scroll-spy scoped to the right-pane scroll container. */
function useActiveSection(scrollRoot: HTMLElement | null): SectionId | null {
  const [active, setActive] = useState<SectionId | null>('work');
  useEffect(() => {
    if (!scrollRoot) return;
    const ids: SectionId[] = ['work', 'projects', 'writing', 'contact'];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;
    const ratios = new Map<SectionId, number>();
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) ratios.set(e.target.id as SectionId, e.intersectionRatio);
        let best: SectionId | null = null;
        let bestR = 0;
        for (const id of ids) {
          const r = ratios.get(id) ?? 0;
          if (r > bestR) { bestR = r; best = id; }
        }
        if (best) setActive(best);
      },
      { root: scrollRoot, rootMargin: '-35% 0px -35% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [scrollRoot]);
  return active;
}

export default function SplitPreview() {
  const time = useClock();
  const projects = getAllProjects();
  const [scrollRoot, setScrollRoot] = useState<HTMLElement | null>(null);
  const active = useActiveSection(scrollRoot);

  // Stub for the writing section (no actual posts loaded client-side; show empty state)
  const posts: any[] = [];

  return (
    <div className="lg:fixed lg:inset-0 lg:flex">
      {/* ── LEFT PANE ── identity card pinned ─────────────────────────────── */}
      <aside className="lg:w-[34%] lg:max-w-[480px] lg:min-w-[360px] lg:h-screen lg:overflow-y-auto lg:border-r lg:border-[color:var(--t-bg-rule)] px-6 md:px-10 py-10 flex flex-col gap-8">
        {/* Status row */}
        <div className="flex items-center justify-between text-[0.72rem] uppercase tracking-widest dim">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[color:var(--t-accent)] t-pulse" />
            <span className="text-[color:var(--t-fg)]">zot24@asuncion</span>
            <span className="dimmer">·</span>
            <span className="num-tab tabular-nums">{time || '--:--'}</span>
          </div>
          <Link href="/preview" className="dim hover:accent transition-colors">
            ← variants
          </Link>
        </div>

        {/* Identity block */}
        <div className="space-y-1">
          <div className="dim text-[0.7rem]">┌─ identity ────────────────────┐</div>
          <pre className="m-0 text-xs md:text-sm leading-relaxed font-mono-feature whitespace-pre-wrap">
{` name   `}<span className="accent">zot24</span>{`
 role   sw engineer · founder
        seed investor
 base   Asunción, PY  `}<span className="dim">(GMT-3)</span>{`
 prior  BlackRock · Anaplan
        Entelo · Moltin
 mail   `}<a href="mailto:hi@zot24.com" className="accent hover:underline underline-offset-4">hi@zot24.com</a>
          </pre>
          <div className="dim text-[0.7rem]">└───────────────────────────────┘</div>
        </div>

        {/* Stat strip */}
        <div className="grid grid-cols-4 gap-px bg-[color:var(--t-bg-rule)] border border-[color:var(--t-bg-rule)]">
          {stats.map((s) => (
            <div key={s.label} className="bg-[color:var(--t-bg)] p-3 text-center">
              <div className="text-xl font-light num-tab accent">{s.num}</div>
              <div className="mt-1 text-[0.65rem] uppercase tracking-widest dim">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <p className="font-serif-feature italic text-lg leading-snug balance">
          “I build the platforms that other platforms run on.”
        </p>
        <p className="dim text-sm leading-relaxed pretty">
          23 years writing software. Now mostly head-down building the next ones myself.
        </p>

        {/* In-pane navigation (anchors into the right pane) */}
        <nav className="border-t border-[color:var(--t-bg-rule)] pt-5">
          <div className="dim text-[0.68rem] uppercase tracking-widest mb-3">
            ── navigate ──────────────────
          </div>
          <ul className="space-y-1.5">
            {navItems.map((it) => {
              const isActive = active === it.id;
              return (
                <li key={it.id}>
                  <a
                    href={`#${it.id}`}
                    className={`block px-2 py-1.5 text-sm transition-colors ${
                      isActive
                        ? 'text-[color:var(--t-accent)] bg-[color:var(--t-accent-soft)]'
                        : 'dim hover:text-[color:var(--t-fg)]'
                    }`}
                  >
                    {isActive && <span className="dimmer mr-1">{'>'}</span>}
                    {it.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto pt-6 border-t border-[color:var(--t-bg-rule)]">
          <SocialLinks />
        </div>
      </aside>

      {/* ── RIGHT PANE ── scrollable content ──────────────────────────────── */}
      <section
        ref={setScrollRoot}
        className="lg:flex-1 lg:h-screen lg:overflow-y-auto"
      >
        <div className="max-w-3xl mx-auto px-6 md:px-10 py-10 lg:py-12">
          <Experience />
          <Projects projects={projects} />
          {posts.length > 0 ? (
            <Writing posts={posts} />
          ) : (
            <section id="writing" className="py-20">
              <div className="text-sm md:text-base mb-2">
                <span className="dimmer">$</span>{' '}
                <span className="accent">writing</span>{' '}
                <span className="dim">list --recent</span>
              </div>
              <div className="dim text-xs select-none mb-6">
                ── writing ───────────────────────────────────────────────────
              </div>
              <p className="dim text-sm">
                Writing lives at{' '}
                <Link href="/blog" className="accent hover:underline underline-offset-4">
                  /blog
                </Link>
                .
              </p>
            </section>
          )}
          <Contact />
          <footer className="py-12 dim text-xs">
            <span>─── eof ─── © zot24</span>
          </footer>
        </div>
      </section>
    </div>
  );
}
