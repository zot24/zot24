import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface BlogPostPageProps {
    params: {
        slug: string;
    };
}

// Generate static params for all posts
export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
    const post = getPostBySlug(params.slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} - zot24`,
        description: post.description,
    };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
    const post = getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen pt-32 pb-24 px-4 bg-background">
            <div className="container mx-auto max-w-3xl">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to All Posts
                </Link>

                <header className="mb-12 space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 px-3 py-1 rounded-full">
                            <Calendar className="w-4 h-4" />
                            <time dateTime={post.date}>
                                {format(new Date(post.date), 'MMMM d, yyyy')}
                            </time>
                        </div>
                        {post.tags?.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight text-foreground">
                        {post.title}
                    </h1>

                    <p className="text-xl text-muted-foreground leading-relaxed">
                        {post.description}
                    </p>
                </header>

                <div className="prose prose-zincl prose-invert max-w-none prose-headings:font-heading prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-a:text-primary hover:prose-a:text-primary/80 prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:rounded prose-pre:bg-muted/50 prose-pre:border prose-pre:border-white/10">
                    <MarkdownRenderer content={post.content} />
                </div>
            </div>
        </article>
    );
}
