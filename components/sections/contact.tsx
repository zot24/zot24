import { SocialLinks } from '@/components/social-links';

export function Contact() {
  return (
    <section
      id="contact"
      className="max-w-5xl mx-auto px-6 md:px-10 py-20"
    >
      <div className="mb-10">
        <div className="text-sm md:text-base mb-2">
          <span className="dimmer">$</span>{' '}
          <span className="accent">contact</span>{' '}
          <span className="dim">--list</span>
        </div>
        <div className="dim text-xs select-none">
          ── contact ───────────────────────────────────────────────────
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-7 space-y-4">
          <h2 className="text-2xl md:text-3xl">
            Got a project, an idea, or just want to{' '}
            <span className="accent">say hi</span>?
          </h2>
          <p className="dim text-sm md:text-base leading-relaxed pretty max-w-xl">
            Open to early-stage advisory, infra-heavy contracts, and the occasional
            seed cheque.
          </p>
          <p className="dim text-sm md:text-base leading-relaxed pretty max-w-xl">
            Also happy to compare notes on{' '}
            <span className="text-[color:var(--t-fg)]">Paraguay residency</span>,{' '}
            business structure, and personal finance for builders — I&apos;ve walked
            that path and learned a few things worth sharing.
          </p>
          <p className="dim text-sm md:text-base leading-relaxed pretty max-w-xl">
            Email is fastest; LinkedIn for slow conversations.
          </p>
        </div>

        <div className="md:col-span-5 t-card p-5 md:p-6">
          <div className="dim text-[0.7rem] uppercase tracking-widest mb-4">
            ── channels ──────────────────
          </div>
          <SocialLinks variant="list" />
        </div>
      </div>
    </section>
  );
}
