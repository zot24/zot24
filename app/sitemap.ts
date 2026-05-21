import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { site } from '@/lib/site';

/**
 * /sitemap.xml — homepage + writing index + every internal post.
 * External / off-site project URLs (zskills.zot24.com etc.) are out of
 * scope since they have their own sitemaps.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const posts = getAllPosts().filter((p) => !p.externalLink);

  return [
    {
      url: `${site.url}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${site.url}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
