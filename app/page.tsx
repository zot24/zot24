import { Hero } from '@/components/sections/hero';
import { Experience } from '@/components/sections/experience';
import { Writing } from '@/components/sections/writing';
import { Contact } from '@/components/sections/contact';
import { getAllPosts } from '@/lib/blog';

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <main className="min-h-screen">
      <div className="relative">
        <Hero />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-muted/50" />
      </div>

      <div className="relative bg-muted/50">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent" />
        <Experience />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-muted/50 to-background" />
      </div>

      <div className="relative">
        <Writing posts={posts} />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-muted/50" />
      </div>

      <div className="relative bg-muted/50">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent" />
        <Contact />
      </div>
    </main>
  );
}