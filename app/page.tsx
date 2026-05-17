import { Hero } from '@/components/sections/hero';
import { Experience } from '@/components/sections/experience';
import { Projects } from '@/components/sections/projects';
import { Writing } from '@/components/sections/writing';
import { Contact } from '@/components/sections/contact';
import { BootLoader } from '@/components/boot-loader';
import { getAllPosts } from '@/lib/blog';
import { getAllProjects } from '@/lib/projects';

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  const projects = getAllProjects();

  return (
    <main>
      <BootLoader />
      <Hero />
      <SectionDivider label="work" />
      <Experience />
      <SectionDivider label="projects" />
      <Projects projects={projects} />
      <SectionDivider label="writing" />
      <Writing posts={posts} />
      <SectionDivider label="contact" />
      <Contact />
      <Footer />
    </main>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div
      aria-hidden="true"
      className="max-w-5xl mx-auto px-6 md:px-10 dimmer text-[0.7rem] uppercase tracking-widest select-none"
    >
      <pre className="m-0 leading-tight">{`╌╌╌╌ /${label} ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌`}</pre>
    </div>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="max-w-5xl mx-auto px-6 md:px-10 py-12 dim text-xs">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span>
          ─── eof ─── <span className="dimmer">© {year} zot24</span>
        </span>
        <span className="dimmer">
          set in jetbrains mono &amp; ibm plex serif · built on next.js
        </span>
      </div>
    </footer>
  );
}
