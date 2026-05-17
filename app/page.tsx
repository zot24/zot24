import { Hero } from '@/components/sections/hero';
import { Experience } from '@/components/sections/experience';
import { Projects } from '@/components/sections/projects';
import { Writing } from '@/components/sections/writing';
import { Contact } from '@/components/sections/contact';
import { getAllPosts } from '@/lib/blog';
import { getAllProjects } from '@/lib/projects';

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  const projects = getAllProjects();

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
        <Projects projects={projects} />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-muted/50" />
      </div>

      <div className="relative bg-muted/50">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent" />
        <Writing posts={posts} />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-muted/50 to-background" />
      </div>

      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-muted/50 to-transparent" />
        <Contact />
      </div>
    </main>
  );
}
