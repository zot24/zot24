import type { Project } from '@/lib/projects';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="max-w-5xl mx-auto px-6 md:px-10 py-20">
      {/* Section header */}
      <div className="mb-10">
        <div className="text-sm md:text-base mb-2">
          <span className="dimmer">$</span>{' '}
          <span className="accent">projects</span>{' '}
          <span className="dim">list --mine --status=active</span>
          <span className="t-cursor" />
        </div>
        <div className="dim text-xs select-none">
          ── projects ──────────────────────────────────────────────────
        </div>
      </div>

      <div className="space-y-4 t-stagger">
        {projects.map((p, idx) => {
          const num = String(idx + 1).padStart(2, '0');
          return (
            <article
              key={p.slug}
              className="t-card p-5 md:p-6 relative group"
            >
              {/* Stretched primary link — no nested anchors */}
              {(p.url || p.github) && (
                <a
                  href={p.url || p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                  aria-label={`${p.title} — ${p.url ? 'visit' : 'view source'}`}
                />
              )}

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 relative z-0">
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex items-center gap-3 dim text-[0.72rem] uppercase tracking-widest">
                    <span className="num-tab accent">{num}</span>
                    <span className="dimmer">─</span>
                    <span>{p.status ?? '—'}</span>
                    {p.tags?.[0] && (
                      <>
                        <span className="dimmer">·</span>
                        <span>{p.tags[0]}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-medium">
                    <span className="dimmer">./</span>
                    {p.title}
                  </h3>
                  <p className="text-sm md:text-base max-w-2xl">{p.tagline}</p>
                  <p className="dim text-sm max-w-2xl leading-relaxed pt-1 pretty">
                    {p.description}
                  </p>
                  {p.tags && p.tags.length > 1 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {p.tags.slice(1).map((t) => (
                        <span key={t} className="t-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-start md:items-end gap-2 shrink-0 text-sm">
                  {p.url && (
                    <span className="accent">visit ↗</span>
                  )}
                  {p.github && p.url && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-20 dim hover:text-[color:var(--t-fg)] transition-colors"
                    >
                      source ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}

        {/* Placeholder rows for empty slots */}
        {[1, 2].map((i) => (
          <div
            key={`empty-${i}`}
            className="t-card border-dashed p-5 dim text-sm flex items-center justify-between"
          >
            <span>
              <span className="num-tab accent mr-3">
                {String(projects.length + i).padStart(2, '0')}
              </span>
              <span className="dimmer">─</span> awaiting next ship
            </span>
            <span className="dimmer text-xs">empty</span>
          </div>
        ))}
      </div>
    </section>
  );
}
