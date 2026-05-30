/**
 * Single source of truth for site-wide constants.
 * Imported by sitemap, robots, llms.txt, OG metadata, JSON-LD, etc.
 */
export const site = {
  url: 'https://zot24.com',
  name: 'zot24',
  ogImage: '/images/og.png',
  twitter: '@zot24',
  author: {
    name: 'zot24',
    email: 'hi@zot24.com',
    github: 'https://github.com/zot24',
    twitter: 'https://twitter.com/zot24',
    linkedin: 'https://www.linkedin.com/in/zot24/',
  },
  studio: {
    name: 'Motty',
    url: 'https://motty.io',
    description: 'Software, infrastructure & technical consulting',
  },
} as const;
