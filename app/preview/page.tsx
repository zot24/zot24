import Link from 'next/link';

const variants = [
  {
    slug: 'split',
    name: 'Two-pane (tmux split)',
    tagline:
      'Identity card pinned left; content scrolls in the right pane. Reads like a real terminal multiplexer.',
  },
  {
    slug: 'panels',
    name: 'Single-screen panel switcher',
    tagline:
      'One section visible at a time. Click a tab to swap (~150ms cross-fade). No scrolling.',
  },
  {
    slug: 'keys',
    name: 'Scroll + keyboard nav',
    tagline:
      'Same homepage. Layered with `g h` / `g w` / `g p` jumps and a `?` help overlay. Invisible to mouse users.',
  },
  {
    slug: 'boot',
    name: 'Boot intro + status stripe',
    tagline:
      "Cold-boot animation on first visit; persistent 'now building' stripe across every page.",
  },
  {
    slug: 'frames',
    name: 'Each section as its own terminal pane',
    tagline:
      'Every section wrapped in a window-frame with title bar (~/work, ~/projects, …) and active-pane dot. Stronger visual distinction between sections.',
  },
];

export default function PreviewIndex() {
  return (
    <main className="max-w-3xl mx-auto px-6 md:px-10 pt-14 md:pt-20 pb-20">
      <div className="mb-10">
        <div className="text-sm md:text-base mb-2">
          <span className="dimmer">$</span>{' '}
          <span className="accent">preview</span>{' '}
          <span className="dim">list --variants</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-medium mb-2">
          Four homepage UX directions
        </h1>
        <p className="dim text-sm max-w-2xl">
          Each variant rebuilds (or layers on top of) the current homepage. Pick
          one to expand to the full site, or remix pieces from several.
        </p>
      </div>

      <ul className="divide-y divide-[color:var(--t-bg-rule)] border-y border-[color:var(--t-bg-rule)]">
        {variants.map((v, i) => (
          <li key={v.slug}>
            <Link
              href={`/preview/${v.slug}`}
              className="group block py-5 px-2 md:px-4 -mx-2 md:-mx-4 hover:bg-[color:var(--t-accent-soft)] transition-colors"
            >
              <div className="grid grid-cols-12 gap-4 items-baseline">
                <span className="col-span-12 md:col-span-2 text-[0.72rem] uppercase tracking-widest dim num-tab">
                  {String(i + 1).padStart(2, '0')} · /{v.slug}
                </span>
                <div className="col-span-12 md:col-span-9 space-y-1">
                  <h2 className="text-base md:text-lg group-hover:text-[color:var(--t-accent)] transition-colors">
                    {v.name}
                  </h2>
                  <p className="dim text-sm leading-relaxed pretty">
                    {v.tagline}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-1 md:text-right text-[0.7rem] uppercase tracking-widest dimmer group-hover:text-[color:var(--t-fg)] transition-colors">
                  open →
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10 dim text-xs">
        current site → <Link href="/" className="accent hover:underline underline-offset-4">/</Link>
      </p>
    </main>
  );
}
