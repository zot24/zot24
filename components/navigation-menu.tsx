'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { trackNavClick, type NavClickData } from '@/lib/analytics';
import { dispatchExpandPane } from '@/components/terminal-frame';

type SectionId = 'home' | 'work' | 'projects' | 'writing' | 'contact';

const navItems: Array<{
  href: string;
  label: string;
  destination: NavClickData['destination'];
  section: SectionId;
}> = [
  { href: '/', label: 'home', destination: 'home', section: 'home' },
  { href: '/#work', label: 'work', destination: 'work', section: 'work' },
  { href: '/#projects', label: 'projects', destination: 'projects', section: 'projects' },
  { href: '/blog', label: 'writing', destination: 'writing', section: 'writing' },
  { href: '/#contact', label: 'contact', destination: 'contact', section: 'contact' },
];

function useClock() {
  const [time, setTime] = useState<string>('');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const fmt = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'America/Asuncion',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      setTime(fmt.format(now));
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/**
 * Tracks which #section is currently in the viewport "active band"
 * (the middle ~20% of the screen). Returns null when nothing matches
 * or when we're not on a page that hosts the sections (e.g. /blog).
 */
function useActiveSection(enabled: boolean): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') {
      setActive(null);
      return;
    }

    const ids: SectionId[] = ['home', 'work', 'projects', 'writing', 'contact'];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Track per-id intersection ratio; pick the highest each time anything changes.
    const ratios = new Map<SectionId, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id as SectionId, entry.intersectionRatio);
        }
        let best: SectionId | null = null;
        let bestRatio = 0;
        for (const id of ids) {
          const r = ratios.get(id) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            best = id;
          }
        }
        // If nothing is visibly intersecting (e.g., between sections during fast scroll),
        // keep the previous active value rather than blanking out.
        if (best) setActive(best);
      },
      {
        // Active band = middle 30% of the viewport.
        rootMargin: '-35% 0px -35% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));

    // Default to "home" when sitting at the top before any section trips the observer.
    if (window.scrollY < 20) setActive('home');

    return () => observer.disconnect();
  }, [enabled]);

  return active;
}

export function NavigationMenu() {
  const pathname = usePathname();
  const time = useClock();
  const onHome = pathname === '/';
  const activeSection = useActiveSection(onHome);

  // Preview variants that ship their own chrome — hide the global nav.
  if (pathname === '/preview/split' || pathname === '/preview/panels') {
    return null;
  }

  function isActive(href: string, section: SectionId): boolean {
    // /blog and /blog/* always light up the writing item.
    if (pathname.startsWith('/blog')) return section === 'writing';
    if (onHome && activeSection) return section === activeSection;
    // Fallback for any other route — light up the exact-match item if it exists.
    return href === pathname;
  }

  return (
    <header className="sticky top-0 z-50 bg-[color:var(--t-bg-rule)]">
      <div className="max-w-5xl mx-auto px-6 md:px-10 h-11 flex items-center justify-between text-[0.72rem] uppercase tracking-widest">
        <div className="flex items-center gap-3 dim">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[color:var(--t-accent)] t-pulse" />
          <span className="text-[color:var(--t-fg)]">zot24@asuncion</span>
          <span className="dimmer">·</span>
          <span className="num-tab tabular-nums">{time || '--:--'}</span>
          <span className="dimmer hidden md:inline">·</span>
          <span className="dimmer hidden md:inline">GMT-3</span>
        </div>

        <nav className="flex items-center gap-1 md:gap-2">
          {navItems.map((item) => {
            const active = isActive(item.href, item.section);
            const isInPageJump = onHome && item.href.startsWith('/#');
            const isHomeFromHome = onHome && item.href === '/';

            function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
              trackNavClick({ destination: item.destination, href: item.href });

              // Cross-page nav (e.g. clicking writing → /blog) keeps default behavior.
              if (!onHome) return;

              // In-page hash link: expand the target pane first, then scroll.
              if (isInPageJump) {
                e.preventDefault();
                const targetId = item.href.slice(2); // strip "/#"
                dispatchExpandPane(targetId);

                // Give React a frame to commit the expand state change so
                // the grid-row transition starts before the scroll begins;
                // the smooth scroll then animates into a layout that's
                // already growing toward its final size.
                requestAnimationFrame(() => {
                  document
                    .getElementById(targetId)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  if (typeof window !== 'undefined') {
                    window.history.replaceState(null, '', item.href);
                  }
                });
                return;
              }

              // Home from homepage: scroll to top and expand the hero pane.
              if (isHomeFromHome) {
                e.preventDefault();
                dispatchExpandPane('home');
                requestAnimationFrame(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  window.history.replaceState(null, '', '/');
                });
              }
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleClick}
                aria-current={active ? 'true' : undefined}
                className={`t-press relative px-2 md:px-3 py-2 transition-colors ${
                  active
                    ? 'text-[color:var(--t-accent)]'
                    : 'dim hover:text-[color:var(--t-fg)]'
                }`}
              >
                {active && (
                  <span className="dimmer mr-1" aria-hidden="true">
                    {'>'}
                  </span>
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
