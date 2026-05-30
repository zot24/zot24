import './globals.css';
import type { Metadata } from 'next';
import { JetBrains_Mono, IBM_Plex_Serif } from 'next/font/google';
import Script from 'next/script';
import { NavigationMenu } from '@/components/navigation-menu';
import { NowStripe } from '@/components/now-stripe';
import { site } from '@/lib/site';

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
});

const serif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const description =
  '24 years writing software, the last decade building cloud platforms. Currently in Asunción, Paraguay. Building zskills and nworth.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'zot24 — software engineer, founder, seed investor',
    template: '%s — zot24',
  },
  description,
  applicationName: site.name,
  authors: [{ name: site.author.name, url: site.url }],
  creator: site.author.name,
  publisher: site.author.name,
  keywords: [
    'software engineer',
    'cloud platforms',
    'platform engineering',
    'Kubernetes',
    'Terraform',
    'Rust',
    'Go',
    'agentic CLI',
    'AI agents',
    'Paraguay residency',
    'geo-arbitrage',
    'zskills',
    'nworth',
  ],
  alternates: {
    canonical: '/',
    types: {
      'text/plain': [
        { url: '/llms.txt', title: 'LLM-friendly index' },
        { url: '/llms-full.txt', title: 'LLM-friendly full content' },
      ],
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: site.name,
    title: 'zot24 — software engineer, founder, seed investor',
    description,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: 'zot24 — software engineer, founder, seed investor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: site.twitter,
    creator: site.twitter,
    title: 'zot24 — software engineer, founder, seed investor',
    description,
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* rel="me" links — IndieAuth / identity graph. Reciprocates the
            founder.sameAs block on motty.io and lets search engines
            and LLMs treat motty.io + zot24 + socials as one identity. */}
        <link rel="me" href={site.studio.url} />
        <link rel="me" href={site.author.github} />
        <link rel="me" href={site.author.linkedin} />
        <link rel="me" href={site.author.twitter} />
        <link rel="me" href={`mailto:${site.author.email}`} />
      </head>
      <body className={`${mono.variable} ${serif.variable} t-crt relative`}>
        <NavigationMenu />
        <NowStripe />
        {children}
        <Script
          src="https://umami.motty.io/script.js"
          data-website-id="4a796b97-aafc-4c14-8965-c9bb2c3df511"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
