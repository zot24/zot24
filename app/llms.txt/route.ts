import { getAllPosts } from '@/lib/blog';
import { getAllProjects } from '@/lib/projects';
import { getNow } from '@/lib/now';
import { site } from '@/lib/site';

// Statically generated at build time alongside the rest of the site.
export const dynamic = 'force-static';

/**
 * /llms.txt — the structured LLM index per https://llmstxt.org.
 *
 * This is the "table of contents" version: short summary, links to the
 * full content. LLMs hitting this file get a fast overview of the site
 * without having to crawl every page or render React.
 *
 * The companion is /llms-full.txt (full content as one markdown file).
 */
export function GET() {
  const posts = getAllPosts();
  const projects = getAllProjects();
  const now = getNow();

  const lines: string[] = [];

  lines.push(`# ${site.name}`);
  lines.push('');
  lines.push(
    `> Software engineer, founder, and seed investor. 24 years writing software, the last decade designing cloud platforms and the scalable infrastructure underneath them. Currently building from Asunción, Paraguay.`
  );
  lines.push('');

  lines.push(
    `**Now:** ${now.now}${now.next ? ` · **Next:** ${now.next}` : ''}`
  );
  lines.push('');

  // Studio
  lines.push('## Studio');
  lines.push('');
  lines.push(
    `- [${site.studio.name}](${site.studio.url}): ${site.studio.description}. Where the professional engineering work happens. zot24 is the principal.`
  );
  lines.push('');

  // Projects
  if (projects.length > 0) {
    lines.push('## Projects');
    lines.push('');
    for (const p of projects) {
      const url = p.url || p.github;
      lines.push(`- [${p.title}](${url}): ${p.tagline}. ${p.description}`);
    }
    lines.push('');
  }

  // Writing
  lines.push('## Writing');
  lines.push('');
  lines.push(`- [Blog index](${site.url}/blog): all writing`);
  for (const post of posts) {
    const href = post.externalLink || `${site.url}/blog/${post.slug}.md`;
    const desc = post.description ? `: ${post.description}` : '';
    lines.push(`- [${post.title}](${href})${desc}`);
  }
  lines.push('');

  // Topics — what to ask zot24 about
  lines.push('## Topics zot24 is open to talk about');
  lines.push('');
  lines.push('- Cloud platform engineering, infrastructure-as-code, Kubernetes');
  lines.push('- Building agentic CLI tools (Rust)');
  lines.push('- Paraguay residency and geo-arbitrage');
  lines.push('- Business structure for remote engineers');
  lines.push('- Personal finance & long-term optionality');
  lines.push('');

  // Contact
  lines.push('## Contact');
  lines.push('');
  lines.push(`- Email: ${site.author.email}`);
  lines.push(`- X: ${site.author.twitter}`);
  lines.push(`- GitHub: ${site.author.github}`);
  lines.push(`- LinkedIn: ${site.author.linkedin}`);
  lines.push('');

  lines.push('## Optional');
  lines.push('');
  lines.push(`- [Full content](${site.url}/llms-full.txt): every post body and section inlined`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
