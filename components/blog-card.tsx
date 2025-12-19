'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import type { BlogPost } from '@/lib/blog';
import { trackArticleClick } from '@/lib/analytics';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const isExternal = !!post.externalLink;
  const href = post.externalLink || `/blog/${post.slug}`;

  const handleClick = () => {
    trackArticleClick({
      title: post.title,
      slug: post.slug,
      isExternal,
      platform: post.platform,
    });
  };

  const CardContent = (
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
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
        {CardContent}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick}>
      {CardContent}
    </Link>
  );
}
