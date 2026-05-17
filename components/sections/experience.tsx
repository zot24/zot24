import Image from 'next/image';
import profileData from '@/content/profile.json';

interface Testimonial {
  name: string;
  role: string;
  image?: string;
  text: string;
}

interface Experience {
  location: string;
  period: string;
  title: string;
  company: string;
  highlights: string[];
  technologies: string[];
  testimonials?: Testimonial[];
}

function shortPeriod(period: string): string {
  // "Apr 2023 - Present" → "apr 2023 — present"
  return period.toLowerCase().replace(/\s*-\s*/g, ' — ');
}

export function Experience() {
  const experiences: Experience[] = (profileData.experience || []).map(
    (exp: any) => ({
      location: exp.location || 'Remote / Global',
      period: exp.period,
      title: exp.title,
      company: exp.company,
      highlights: exp.highlights || [],
      technologies: exp.technologies || [],
      testimonials: exp.testimonials,
    })
  );

  return (
    <section id="work" className="max-w-5xl mx-auto px-6 md:px-10 py-20">
      {/* Section header */}
      <div className="mb-12">
        <div className="text-sm md:text-base mb-2">
          <span className="dimmer">$</span>{' '}
          <span className="accent">history</span>{' '}
          <span className="dim">--all</span>
        </div>
        <div className="dim text-xs select-none">
          ── work ──────────────────────────────────────────────────────
        </div>
      </div>

      <ol className="space-y-12 t-stagger">
        {experiences.map((exp, index) => (
          <li key={index} className="grid grid-cols-12 gap-x-6 gap-y-3">
            {/* Period column (left rail) */}
            <div className="col-span-12 md:col-span-3 md:pt-1">
              <div className="text-[0.7rem] uppercase tracking-widest dim num-tab">
                {shortPeriod(exp.period)}
              </div>
              <div className="mt-1 text-[0.7rem] uppercase tracking-widest dimmer">
                {exp.location.toLowerCase()}
              </div>
            </div>

            {/* Role + body */}
            <div className="col-span-12 md:col-span-9 space-y-4">
              <div>
                <div className="text-lg md:text-xl">
                  <span className="text-[color:var(--t-fg)]">{exp.title}</span>{' '}
                  <span className="dim">@</span>{' '}
                  <span className="accent">{exp.company}</span>
                </div>
              </div>

              {exp.highlights.length > 0 && (
                <ul className="space-y-1.5 text-sm md:text-[0.95rem] text-[color:var(--t-fg)]/90 pretty">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3 leading-relaxed">
                      <span className="accent shrink-0">↳</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              {exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="t-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {exp.testimonials && exp.testimonials.length > 0 && (
                <div className="mt-5 border-l border-[color:var(--t-accent)]/40 pl-4 space-y-3">
                  {exp.testimonials.map((t, i) => (
                    <figure key={i} className="text-sm space-y-2">
                      <blockquote className="font-serif-feature italic text-[color:var(--t-fg)]/90 leading-relaxed pretty">
                        “{t.text}”
                      </blockquote>
                      <figcaption className="flex items-center gap-2 text-[0.72rem] uppercase tracking-widest dim">
                        {t.image ? (
                          <span className="relative inline-block w-5 h-5 rounded-full overflow-hidden ring-1 ring-[color:var(--t-bg-rule)]">
                            <Image
                              src={t.image}
                              alt={t.name}
                              fill
                              className="object-cover"
                              sizes="20px"
                            />
                          </span>
                        ) : (
                          <span className="accent">—</span>
                        )}
                        <span className="text-[color:var(--t-fg)]/90">
                          {t.name}
                        </span>
                        <span className="dimmer">·</span>
                        <span>{t.role.toLowerCase()}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
