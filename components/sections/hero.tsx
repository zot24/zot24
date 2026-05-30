import { SocialLinks } from '@/components/social-links';
import { site } from '@/lib/site';

const stats = [
  { num: '24', label: 'years engineering' },
  { num: '10+', label: 'cloud / infra' },
  { num: '12', label: 'companies' },
  { num: 'PY', label: 'currently based' },
];

export function Hero() {
  return (
    <section id="home" className="max-w-5xl mx-auto px-6 md:px-10 pt-14 md:pt-20 pb-20">
      <div className="t-stagger">
        {/* Identity block */}
        <div className="space-y-1 mb-12">
          <div className="dim text-xs">
            ┌─ identity ───────────────────────────────────────────────┐
          </div>
          <pre className="m-0 text-sm md:text-base leading-relaxed font-mono-feature whitespace-pre-wrap">
{` name      `}<span className="accent">zot24</span>{`
 role      software engineer · founder · seed investor
 studio    `}<a
              href={site.studio.url}
              target="_blank"
              rel="me noopener noreferrer"
              className="accent hover:underline underline-offset-4"
            >motty.io</a>{` · `}<span className="dim">{site.studio.description.toLowerCase()}</span>{`
 base      Asunción, Paraguay  `}<span className="dim">(GMT-3)</span>{`
 prior     BlackRock · Anaplan · Entelo · Moltin
 asks      paraguay residency · biz structure · personal finance
 contact   `}<a
              href="mailto:hi@zot24.com"
              className="accent hover:underline underline-offset-4"
            >hi@zot24.com</a>
          </pre>
          <div className="dim text-xs">
            └─────────────────────────────────────────────────────────┘
          </div>
        </div>

        {/* Stat band — sharp grid with hairline borders */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[color:var(--t-bg-rule)] border border-[color:var(--t-bg-rule)] mb-12">
          {stats.map((s) => (
            <div key={s.label} className="bg-[color:var(--t-bg)] p-5">
              <div className="text-3xl md:text-4xl font-light num-tab">
                <span className="accent">{s.num}</span>
              </div>
              <div className="mt-2 text-[0.7rem] uppercase tracking-widest dim">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tagline — serif pull quote against mono noise */}
        <div className="mb-12 max-w-3xl">
          <p className="font-serif-feature italic text-2xl md:text-3xl leading-snug balance">
            “I build the platforms that other platforms run on.”
          </p>
          <p className="mt-5 dim text-sm md:text-base max-w-2xl pretty leading-relaxed">
            24 years writing software, the last decade designing cloud platforms and the
            scalable infrastructure underneath them. Now mostly head-down building the
            next ones myself.
          </p>
        </div>

        {/* Social row */}
        <div>
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
