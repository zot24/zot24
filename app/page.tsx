import { Hero } from '@/components/sections/hero';
import { Experience } from '@/components/sections/experience';
import { Projects } from '@/components/sections/projects';
import { Writing } from '@/components/sections/writing';
import { Contact } from '@/components/sections/contact';
import { TerminalFrame } from '@/components/terminal-frame';
import { BootLoader } from '@/components/boot-loader';
import { getAllPosts } from '@/lib/blog';
import { getAllProjects } from '@/lib/projects';
import profileData from '@/content/profile.json';
import { site } from '@/lib/site';

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  const projects = getAllProjects();
  const workCount = profileData.experience?.length ?? 0;

  // JSON-LD: Person + WebSite. Person gets rich knowledge-graph results
  // in search; WebSite enables sitelinks search box and identifies the
  // canonical site. Both are also consumed by some LLM crawlers.
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.author.name,
    url: site.url,
    email: `mailto:${site.author.email}`,
    jobTitle: 'Software Engineer · Founder · Seed Investor',
    description: profileData.summary,
    image: `${site.url}/images/profile.jpg`,
    sameAs: [
      site.author.github,
      site.author.twitter,
      site.author.linkedin,
    ],
    knowsAbout: [
      'Cloud platform engineering',
      'Infrastructure as Code',
      'Kubernetes',
      'Terraform',
      'Observability',
      'Prometheus',
      'Grafana',
      'Rust',
      'Go',
      'Agentic CLI tools',
      'AI agents',
      'Paraguay residency',
      'Geo-arbitrage',
    ],
    worksFor: [
      {
        '@type': 'Organization',
        name: site.studio.name,
        url: site.studio.url,
        description: site.studio.description,
      },
      ...projects.map((p) => ({
        '@type': 'Organization',
        name: p.title,
        url: p.url || p.github,
      })),
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    author: { '@type': 'Person', name: site.author.name },
  };

  return (
    <main className="py-4 md:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <BootLoader />

      <TerminalFrame id="home" path="~" meta="zot24 v23.05.17">
        <Hero />
      </TerminalFrame>

      <TerminalFrame id="work" path="~/work" meta={`${workCount} entries`}>
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

      <Footer />
    </main>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="max-w-5xl mx-auto px-4 md:px-6 py-10 dim text-xs">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span>
          ─── eof ───{' '}
          <span className="dimmer">© {year} zot24</span>
        </span>
        <span className="dimmer">5 panes · all attached</span>
      </div>
    </footer>
  );
}
