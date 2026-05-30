import { getAllPosts } from '@/lib/blog';
import { getAllProjects } from '@/lib/projects';
import { getNow } from '@/lib/now';
import { site } from '@/lib/site';
import profileData from '@/content/profile.json';

export const dynamic = 'force-static';

/**
 * /llms-full.txt — the entire site content as a single markdown file.
 *
 * Companion to /llms.txt. LLMs preferring "ingest everything in one
 * fetch" can grab this. Format intentionally simple: H1 site title,
 * H2 per section, H3 per post, plain markdown body. No HTML, no
 * React, no chrome.
 */
export function GET() {
  const posts = getAllPosts();
  const projects = getAllProjects();
  const now = getNow();
  const profile = profileData as {
    name: string;
    summary: string;
    skills?: string[];
    experience?: Array<{
      title: string;
      company: string;
      period: string;
      location?: string;
      highlights?: string[];
      technologies?: string[];
    }>;
  };

  const out: string[] = [];

  out.push(`# ${site.name}`);
  out.push('');
  out.push(`> ${profile.summary}`);
  out.push('');
  out.push(`Site: ${site.url}`);
  out.push(`Contact: ${site.author.email}`);
  out.push('');

  // ─── Now
  out.push('## Now');
  out.push('');
  out.push(`- **Currently shipping:** ${now.now}`);
  if (now.next) out.push(`- **Next:** ${now.next}`);
  if (now.updated) out.push(`- Updated: ${now.updated}`);
  out.push('');

  // ─── Studio
  out.push('## Studio');
  out.push('');
  out.push(`### ${site.studio.name} — ${site.studio.description}`);
  out.push('');
  out.push(
    `zot24 is the principal at ${site.studio.name} (${site.studio.url}) — a boutique software studio offering custom application development (TypeScript, Rust, Go), cloud and infrastructure engineering (Kubernetes, Terraform, AWS, GCP), observability stacks (Prometheus, Thanos, Grafana), technical consulting, and team augmentation. Engagements are limited to one or two at a time. Operating since 2012.`
  );
  out.push('');
  out.push(`**URL:** ${site.studio.url}`);
  out.push(`**llms.txt:** ${site.studio.url}/llms.txt`);
  out.push('');

  // ─── Projects
  if (projects.length > 0) {
    out.push('## Projects');
    out.push('');
    for (const p of projects) {
      out.push(`### ${p.title} — ${p.tagline}`);
      out.push('');
      out.push(p.description);
      out.push('');
      if (p.tags && p.tags.length > 0) {
        out.push(`**Stack:** ${p.tags.join(', ')}`);
      }
      if (p.url) out.push(`**URL:** ${p.url}`);
      if (p.github) out.push(`**Source:** ${p.github}`);
      if (p.status) out.push(`**Status:** ${p.status}`);
      out.push('');
    }
  }

  // ─── Experience
  if (profile.experience && profile.experience.length > 0) {
    out.push('## Experience');
    out.push('');
    for (const exp of profile.experience) {
      out.push(`### ${exp.title} — ${exp.company} (${exp.period})`);
      if (exp.location) out.push(`*${exp.location}*`);
      out.push('');
      if (exp.highlights && exp.highlights.length > 0) {
        for (const h of exp.highlights) out.push(`- ${h}`);
        out.push('');
      }
      if (exp.technologies && exp.technologies.length > 0) {
        out.push(`**Technologies:** ${exp.technologies.join(', ')}`);
        out.push('');
      }
    }
  }

  // ─── Writing
  if (posts.length > 0) {
    out.push('## Writing');
    out.push('');
    for (const post of posts) {
      out.push(`### ${post.title}`);
      out.push(`*${post.date}*${post.tags?.length ? ' · ' + post.tags.join(', ') : ''}`);
      out.push('');
      if (post.description) {
        out.push(post.description);
        out.push('');
      }
      if (post.externalLink) {
        out.push(`Read at: ${post.externalLink}`);
        out.push('');
      } else if (post.content) {
        out.push(post.content.trim());
        out.push('');
      }
      out.push('---');
      out.push('');
    }
  }

  // ─── Topics
  out.push('## Open to talk about');
  out.push('');
  out.push('- Cloud platform engineering, infrastructure-as-code, Kubernetes');
  out.push('- Building agentic CLI tools (Rust)');
  out.push('- Paraguay residency and geo-arbitrage');
  out.push('- Business structure for remote engineers');
  out.push('- Personal finance & long-term optionality');
  out.push('');

  // ─── Contact
  out.push('## Contact');
  out.push('');
  out.push(`- Email: ${site.author.email}`);
  out.push(`- X: ${site.author.twitter}`);
  out.push(`- GitHub: ${site.author.github}`);
  out.push(`- LinkedIn: ${site.author.linkedin}`);
  out.push('');

  return new Response(out.join('\n'), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
