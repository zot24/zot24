import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

/**
 * /robots.txt — allow every well-behaved crawler, gate `/preview/*`
 * (the variant explorations aren't canonical content), point them at
 * the sitemap and the LLM-friendly indices.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/preview/'],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
