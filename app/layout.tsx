import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { NavigationMenu } from '@/components/navigation-menu';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={`${inter.className} bg-background text-foreground`}>
        <Providers attribute="class" defaultTheme="dark" enableSystem>
          <NavigationMenu />
          {children}
        </Providers>
      </body>
    </html>
  );
}