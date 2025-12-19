import { getAllPosts } from '@/lib/blog';
import { BookOpen } from 'lucide-react';
import { BlogCard } from '@/components/blog-card';

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
                            <BlogCard key={post.slug} post={post} />
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
