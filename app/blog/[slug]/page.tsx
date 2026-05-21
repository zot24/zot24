import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { site } from '@/lib/site';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'post not found' };

  const url = `${site.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
      types: {
        'text/markdown': [
          { url: `/blog/${post.slug}.md`, title: 'Markdown source' },
        ],
      },
    },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [site.author.name],
      tags: post.tags,
      images: [site.ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      site: site.twitter,
      creator: site.twitter,
      title: post.title,
      description: post.description,
      images: [site.ogImage],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const dateStr = format(new Date(post.date), 'yyyy-MM-dd');
  const url = `${site.url}/blog/${post.slug}`;

  // JSON-LD Article schema — rich results in search engines, also
  // consumed by some LLM crawlers for structured ingestion.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: site.author.name,
      url: site.url,
    },
    publisher: {
      '@type': 'Person',
      name: site.author.name,
      url: site.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    keywords: post.tags?.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-6 md:px-10 pt-14 md:pt-20 pb-24">
        <Link
          href="/blog"
          className="t-press inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-widest dim hover:accent transition-colors mb-10"
        >
          <span>←</span> back to writing
        </Link>

        <header className="mb-10 space-y-4 t-stagger">
          <div className="flex flex-wrap items-center gap-3 text-[0.72rem] uppercase tracking-widest dim num-tab">
            <time dateTime={post.date}>{dateStr}</time>
            {post.tags?.map((tag) => (
              <span key={tag}>
                <span className="dimmer mr-1">·</span>
                <span className="t-tag">{tag}</span>
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl leading-tight balance font-medium">
            {post.title}
          </h1>

          {post.description && (
            <p className="dim text-base md:text-lg leading-relaxed pretty">
              {post.description}
            </p>
          )}
        </header>

        <div className="dim text-xs select-none mb-8">
          ── article ──────────────────────────────────────────────────
        </div>

        <div className="prose-terminal">
          <MarkdownRenderer content={post.content} />
        </div>

        <div className="dim text-xs select-none mt-12 mb-6">
          ── eof ──────────────────────────────────────────────────────
        </div>

        <div className="flex items-center justify-between gap-4">
          <Link
            href="/blog"
            className="t-press inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-widest dim hover:accent transition-colors"
          >
            <span>←</span> all posts
          </Link>
          <a
            href={`/blog/${post.slug}.md`}
            className="t-press inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-widest dim hover:accent transition-colors"
            title="View raw markdown source"
          >
            view as markdown <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    </>
  );
}
