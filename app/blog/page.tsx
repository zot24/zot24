import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

export const metadata = {
    title: 'Writing - zot24',
    description: 'Thoughts on engineering, leadership, and technology.',
};

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <main className="min-h-screen pt-32 pb-24 px-4 bg-background">
            <div className="container mx-auto max-w-4xl space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl lg:text-5xl font-heading font-bold">Writing</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Thoughts, tutorials, and insights on software engineering and leadership.
                    </p>
                </div>

                <div className="grid gap-6">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`}>
                                <Card className="p-6 md:p-8 hover:bg-muted/5 transition-colors border-white/10 group cursor-pointer h-full">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <h2 className="text-2xl font-bold font-heading group-hover:text-primary transition-colors">
                                                {post.title}
                                            </h2>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 px-3 py-1 rounded-full w-fit">
                                                <Calendar className="w-4 h-4" />
                                                <time dateTime={post.date}>
                                                    {format(new Date(post.date), 'MMMM d, yyyy')}
                                                </time>
                                            </div>
                                        </div>

                                        <p className="text-muted-foreground text-lg leading-relaxed">
                                            {post.description}
                                        </p>

                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex gap-2">
                                                {post.tags?.map((tag) => (
                                                    <Badge key={tag} variant="secondary" className="text-xs bg-primary/10 text-primary hover:bg-primary/20">
                                                        #{tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-1 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                                                Read Article <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))
                    ) : (
                        <div className="text-center py-20 text-muted-foreground">
                            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p>No posts found. Coming soon!</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
