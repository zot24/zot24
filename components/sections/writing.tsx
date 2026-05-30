import Link from 'next/link';
import { format } from 'date-fns';
import type { BlogPost } from '@/lib/blog';

interface WritingProps {
  posts: BlogPost[];
}

export function Writing({ posts }: WritingProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section id="writing" className="max-w-5xl mx-auto px-6 md:px-10 py-20">
      {/* Section header */}
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <div className="text-sm md:text-base mb-2">
            <span className="dimmer">$</span>{' '}
            <span className="accent">writing</span>{' '}
            <span className="dim">list --recent 3</span>
          </div>
          <div className="dim text-xs select-none">
            ── writing ───────────────────────────────────────────────────
          </div>
        </div>
        <Link
          href="/blog"
          className="t-press shrink-0 text-[0.72rem] uppercase tracking-widest dim hover:accent transition-colors"
        >
          all posts →
        </Link>
      </div>

      <ul className="space-y-3 md:space-y-4 t-stagger">
        {posts.map((post) => {
          const isExternal = !!post.externalLink;
          const href = post.externalLink || `/blog/${post.slug}`;
          const dateStr = format(new Date(post.date), 'yyyy-MM-dd');

          const inner = (
            <article className="t-card group p-4 md:p-5 relative">
              <div className="grid grid-cols-12 gap-4 items-baseline">
                <time
                  dateTime={post.date}
                  className="col-span-12 md:col-span-2 text-[0.72rem] uppercase tracking-widest dim num-tab"
                >
                  {dateStr}
                </time>
                <div className="col-span-12 md:col-span-8 space-y-1.5">
                  <h3 className="text-base md:text-lg">
                    {post.title}
                    {isExternal && <span className="dim ml-2 text-xs">↗</span>}
                  </h3>
                  {post.description && (
                    <p className="dim text-sm leading-relaxed pretty">
                      {post.description}
                    </p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {post.tags.map((t) => (
                        <span key={t} className="t-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="col-span-12 md:col-span-2 md:text-right text-[0.7rem] uppercase tracking-widest dimmer">
                  {post.platform === 'X' ? 'thread' : 'post'}
                </div>
              </div>
            </article>
          );

          return (
            <li key={post.slug}>
              {isExternal ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {inner}
                </a>
              ) : (
                <Link href={href} className="block">
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
