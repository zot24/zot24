import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { MarkdownRenderer } from '@/components/markdown-renderer';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'post not found' };
  return {
    title: `${post.title} — zot24`,
    description: post.description,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const dateStr = format(new Date(post.date), 'yyyy-MM-dd');

  return (
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

      <Link
        href="/blog"
        className="t-press inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-widest dim hover:accent transition-colors"
      >
        <span>←</span> all posts
      </Link>
    </article>
  );
}
