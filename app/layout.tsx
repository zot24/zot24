import './globals.css';
import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { Providers } from './providers';
import { NavigationMenu } from '@/components/navigation-menu';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Your Name - Engineering Leader',
  description: 'Engineering Leader and Developer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-background text-foreground antialiased selection:bg-cyan-500/30`}>
        <Providers attribute="class" defaultTheme="dark" enableSystem>
          <NavigationMenu />
          {children}
        </Providers>
      </body>
    </html>
  );
}