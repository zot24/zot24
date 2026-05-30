import Link from 'next/link';
import { format } from 'date-fns';
import { getAllPosts } from '@/lib/blog';

export const metadata = {
  title: 'writing — zot24',
  description:
    'Thoughts on engineering, leadership, and the systems underneath them.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-5xl mx-auto px-6 md:px-10 pt-14 md:pt-20 pb-24">
      <div className="t-stagger">
        <div className="mb-10">
          <div className="text-sm md:text-base mb-2">
            <span className="dimmer">$</span>{' '}
            <span className="accent">writing</span>{' '}
            <span className="dim">cat ./posts/*.md | head</span>
            <span className="t-cursor" />
          </div>
          <h1 className="text-3xl md:text-4xl font-medium">
            writing.
          </h1>
          <p className="dim mt-2 text-sm max-w-xl pretty">
            Thoughts on engineering, leadership, and the platforms underneath them.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="t-card p-8 text-center dim text-sm">
            <span className="dimmer">→</span> no posts yet. coming soon.
          </div>
        ) : (
          <ul className="space-y-3 md:space-y-4">
            {posts.map((post) => {
              const isExternal = !!post.externalLink;
              const href = post.externalLink || `/blog/${post.slug}`;
              const dateStr = format(new Date(post.date), 'yyyy-MM-dd');

              const inner = (
                <article className="t-card group p-4 md:p-5 relative">
                  <div className="grid grid-cols-12 gap-4 items-start">
                    <div className="col-span-12 md:col-span-10 space-y-2">
                      <h2 className="text-lg md:text-xl font-medium leading-tight">
                        {post.title}
                        {isExternal && (
                          <span className="dim ml-2 text-xs">↗</span>
                        )}
                      </h2>
                      {post.description && (
                        <p className="dim text-[0.95rem] leading-relaxed pretty">
                          {post.description}
                        </p>
                      )}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {post.tags.map((t) => (
                            <span key={t} className="t-tag">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="col-span-12 md:col-span-2 md:text-right space-y-1.5">
                      <div className="text-[0.7rem] uppercase tracking-widest dimmer">
                        {post.platform === 'X' ? 'thread' : 'post'}
                      </div>
                      <time
                        dateTime={post.date}
                        className="block text-[0.7rem] uppercase tracking-widest dim num-tab"
                      >
                        {dateStr}
                      </time>
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
        )}
      </div>
    </main>
  );
}
