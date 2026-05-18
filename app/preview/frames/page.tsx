import { Hero } from '@/components/sections/hero';
import { Experience } from '@/components/sections/experience';
import { Projects } from '@/components/sections/projects';
import { Writing } from '@/components/sections/writing';
import { Contact } from '@/components/sections/contact';
import { TerminalFrame } from '@/components/terminal-frame';
import { getAllPosts } from '@/lib/blog';
import { getAllProjects } from '@/lib/projects';
import profileData from '@/content/profile.json';

export default function FramesPreview() {
  const posts = getAllPosts().slice(0, 3);
  const projects = getAllProjects();
  const workCount = profileData.experience?.length ?? 0;

  return (
    <main className="py-6 md:py-10">
      <TerminalFrame id="home" path="~" meta="zot24 v23.05.17">
        <Hero />
      </TerminalFrame>

      <TerminalFrame
        id="work"
        path="~/work"
        meta={`${workCount} entries`}
      >
        <Experience />
      </TerminalFrame>

      <TerminalFrame
        id="projects"
        path="~/projects"
        meta={`${projects.length} entries`}
      >
        <Projects projects={projects} />
      </TerminalFrame>

      <TerminalFrame
        id="writing"
        path="~/writing"
        meta={`${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`}
      >
        <Writing posts={posts} />
      </TerminalFrame>

      <TerminalFrame id="contact" path="~/contact" meta="4 channels">
        <Contact />
      </TerminalFrame>

      <footer className="max-w-5xl mx-auto px-4 md:px-6 py-12 dim text-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span>
            ─── eof ─── <span className="dimmer">© {new Date().getFullYear()} zot24</span>
          </span>
          <span className="dimmer">5 panes · all attached</span>
        </div>
      </footer>
    </main>
  );
}
