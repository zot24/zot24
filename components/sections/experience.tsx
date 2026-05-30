import profileData from '@/content/profile.json';
import { ReferenceWindow } from '@/components/reference-window';

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

function companyPath(company: string): string {
  return `~/refs/${company.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

function isOngoing(period: string): boolean {
  return /present/i.test(period);
}

function ExperienceItem({ exp }: { exp: Experience }) {
  return (
    <li className="grid grid-cols-12 gap-x-6 gap-y-3">
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
            {exp.testimonials && exp.testimonials.length > 0 && (
              <ReferenceWindow
                path={companyPath(exp.company)}
                testimonials={exp.testimonials}
              />
            )}
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
      </div>
    </li>
  );
}

function GroupHeader({ label }: { label: string }) {
  // 60-char visual rule, matching the existing "── work ──..." style.
  const dashCount = Math.max(2, 60 - label.length - 6);
  return (
    <div className="dim text-xs select-none mb-6">
      ── {label} {'─'.repeat(dashCount)}
    </div>
  );
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

  const current = experiences.filter((e) => isOngoing(e.period));
  const past = experiences.filter((e) => !isOngoing(e.period));

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

      <div className="t-stagger space-y-16">
        {current.length > 0 && (
          <div>
            <GroupHeader label="current · ongoing" />
            <ol className="space-y-12">
              {current.map((exp, index) => (
                <ExperienceItem key={`current-${index}`} exp={exp} />
              ))}
            </ol>
          </div>
        )}

        {past.length > 0 && (
          <div>
            <GroupHeader label="past" />
            <ol className="space-y-12">
              {past.map((exp, index) => (
                <ExperienceItem key={`past-${index}`} exp={exp} />
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
