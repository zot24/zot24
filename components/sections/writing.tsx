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
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`/blog/${post.slug}`} className="block h-full">
                                <Card className="p-6 h-full hover:bg-muted/5 transition-colors border-white/10 flex flex-col justify-between group bg-card/40 backdrop-blur-md">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Badge variant="secondary" className="text-xs font-mono bg-primary/10 text-primary border-primary/20">
                                                {format(new Date(post.date), 'MMM d, yyyy')}
                                            </Badge>
                                            {post.tags?.[0] && (
                                                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                                                    #{post.tags[0]}
                                                </span>
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

                                    <div className="pt-6 mt-6 flex items-center text-sm font-medium text-primary opacity-60 group-hover:opacity-100 transition-all duration-300">
                                        Read Article
                                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
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
