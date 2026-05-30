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

const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

/**
 * Compute "Xy Ym" duration from a period string like "Apr 2023 - Present"
 * or "Nov 2019 - Jan 2022". Months are inclusive of the start month and
 * exclusive of the end month, matching how LinkedIn counts tenure.
 * For "Present" entries, evaluated at render/build time.
 */
function computeDuration(period: string): string {
  const match = period.match(
    /^(\w{3})\s+(\d{4})\s*-\s*(?:Present|(\w{3})\s+(\d{4}))$/i
  );
  if (!match) return '';

  const startMonth = MONTHS[match[1].toLowerCase()];
  const startYear = parseInt(match[2], 10);
  if (startMonth === undefined || isNaN(startYear)) return '';

  let endMonth: number;
  let endYear: number;
  if (match[3] && match[4]) {
    endMonth = MONTHS[match[3].toLowerCase()];
    endYear = parseInt(match[4], 10);
    if (endMonth === undefined || isNaN(endYear)) return '';
  } else {
    const now = new Date();
    endMonth = now.getMonth();
    endYear = now.getFullYear();
  }

  const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
  if (totalMonths < 1) return '';

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years > 0 && months > 0) return `${years}y ${months}m`;
  if (years > 0) return `${years}y`;
  return `${months}m`;
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
          {computeDuration(exp.period) && (
            <span className="dimmer ml-2">{computeDuration(exp.period)}</span>
          )}
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
      <div className="text-sm md:text-base mb-10">
        <span className="dimmer">$</span>{' '}
        <span className="accent">history</span>{' '}
        <span className="dim">--all</span>
      </div>

      <div className="t-stagger space-y-16">
        {current.length > 0 && (
          <div>
            <GroupHeader label="work · current ongoing" />
            <ol className="space-y-12">
              {current.map((exp, index) => (
                <ExperienceItem key={`current-${index}`} exp={exp} />
              ))}
            </ol>
          </div>
        )}

        {past.length > 0 && (
          <div>
            <GroupHeader label="work · past" />
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
