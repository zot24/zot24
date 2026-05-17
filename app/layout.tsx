import './globals.css';
import type { Metadata } from 'next';
import { JetBrains_Mono, IBM_Plex_Serif } from 'next/font/google';
import Script from 'next/script';
import { NavigationMenu } from '@/components/navigation-menu';
import { NowStripe } from '@/components/now-stripe';

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

export const metadata: Metadata = {
  title: 'zot24 — software engineer, founder, seed investor',
  description:
    '23 years writing software, the last decade building cloud platforms. Currently in Asunción, Paraguay.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${mono.variable} ${serif.variable} t-crt relative`}>
        <NavigationMenu />
        <NowStripe />
        {children}
        <Script
          src="https://umami.motty.io/script.js"
          data-website-id="c9e30775-03c2-4b26-bdbd-90006ac86727"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
