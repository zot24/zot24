'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen } from 'lucide-react';
import { format } from 'date-fns';
import type { BlogPost } from '@/lib/blog';

interface WritingProps {
    posts: BlogPost[];
}

export function Writing({ posts }: WritingProps) {
    if (!posts || posts.length === 0) return null;

    return (
        <section id="writing" className="py-24 relative overflow-hidden">
            <div className="container relative px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
                >
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">Recent Writing</h2>
                        <p className="text-lg text-muted-foreground max-w-xl">
                            Thoughts on engineering, leadership, and technology.
                        </p>
                    </div>
                    <Button asChild variant="outline" className="hidden md:flex group">
                        <Link href="/blog">
                            View All Articles
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post, index) => {
                        const isExternal = !!post.externalLink;
                        const href = post.externalLink || `/blog/${post.slug}`;
                        // We use a simple conditional rendering approach
                        const CardContent = (
                            <Card className="p-6 h-full hover:bg-muted/5 transition-colors border-white/10 flex flex-col justify-between group bg-card/40 backdrop-blur-md relative overflow-hidden">
                                {post.platform === 'X' && (
                                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <svg viewBox="0 0 24 24" className="w-24 h-24 fill-foreground" aria-hidden="true">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </div>
                                )}
                                <div className="space-y-4 relative z-10">
                                    <div className="flex items-center justify-between">
                                        <Badge variant="secondary" className="text-xs font-mono bg-primary/10 text-primary border-primary/20">
                                            {format(new Date(post.date), 'MMM d, yyyy')}
                                        </Badge>
                                        {post.platform === 'X' ? (
                                            <Badge variant="outline" className="text-xs border-white/10 bg-black/50 text-foreground/80">
                                                X Thread
                                            </Badge>
                                        ) : (
                                            post.tags?.[0] && (
                                                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                                                    #{post.tags[0]}
                                                </span>
                                            )
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="text-xl font-bold font-heading group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                            {post.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                                            {post.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-6 mt-6 flex items-center text-sm font-medium text-primary opacity-60 group-hover:opacity-100 transition-all duration-300 relative z-10">
                                    {post.platform === 'X' ? 'Read thread on X' : 'Read Article'}
                                    {isExternal ? (
                                        <ArrowRight className="ml-2 w-4 h-4 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    ) : (
                                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    )}
                                </div>
                            </Card>
                        );

                        return (
                            <motion.div
                                key={post.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {isExternal ? (
                                    <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
                                        {CardContent}
                                    </a>
                                ) : (
                                    <Link href={href} className="block h-full">
                                        {CardContent}
                                    </Link>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Button asChild variant="outline" className="w-full group">
                        <Link href="/blog">
                            View All Articles
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
