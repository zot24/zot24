import { SocialLinks } from '@/components/social-links';

export function Contact() {
  return (
    <section
      id="contact"
      className="max-w-5xl mx-auto px-6 md:px-10 py-20"
    >
      <div className="mb-12">
        <div className="text-sm md:text-base mb-2">
          <span className="dimmer">$</span>{' '}
          <span className="accent">contact</span>{' '}
          <span className="dim">--list</span>
        </div>
        <div className="dim text-xs select-none">
          ── contact ───────────────────────────────────────────────────
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-7 space-y-5">
          <h2 className="text-3xl md:text-4xl font-medium leading-tight balance">
            Got a project, an idea, or just want to{' '}
            <span className="accent">say hi</span>?
          </h2>
          <p className="text-base md:text-lg leading-relaxed pretty max-w-xl">
            Open to early-stage advisory, infra-heavy contracts, and the occasional
            seed cheque.
          </p>
          <p className="dim text-sm md:text-base leading-relaxed pretty max-w-xl">
            Also happy to compare notes on{' '}
            <span className="text-[color:var(--t-fg)]">Paraguay residency</span>,{' '}
            business structure, and personal finance for builders — I&apos;ve walked
            that path and learned a few things worth sharing.
          </p>
          <p className="dimmer text-sm md:text-base leading-relaxed pretty max-w-xl">
            Email is fastest; LinkedIn for slow conversations.
          </p>
        </div>

        <div className="md:col-span-5 border border-[color:var(--t-bg-rule)] bg-[color:var(--t-bg-elev)] p-5 md:p-6">
          <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-[color:var(--t-bg-rule)]">
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-[color:var(--t-accent)] t-pulse"
                aria-hidden="true"
              />
              <span className="text-[0.7rem] uppercase tracking-widest text-[color:var(--t-fg)]">
                open for messages
              </span>
            </div>
            <span className="dimmer text-[0.7rem] uppercase tracking-widest num-tab">
              gmt&minus;3
            </span>
          </div>

          <SocialLinks variant="list" />

          <div className="mt-5 pt-4 border-t border-[color:var(--t-bg-rule)] dimmer text-[0.7rem] uppercase tracking-widest leading-relaxed">
            usually replies within 48h
          </div>
        </div>
      </div>
    </section>
  );
}
