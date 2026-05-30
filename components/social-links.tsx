'use client';

import { Github, Linkedin, Mail } from 'lucide-react';
import { trackSocialClick, type SocialClickData } from '@/lib/analytics';

// X brand mark — lucide-react doesn't ship the post-rebrand logo, so we
// inline the official path from x.com. Matches the visual weight of the
// surrounding lucide icons closely enough at small sizes.
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialLinks: Array<{
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  handle: string;
  platform: SocialClickData['platform'];
  external: boolean;
}> = [
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/zot24',
    handle: 'zot24',
    platform: 'github',
    external: true,
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/zot24/',
    handle: 'in/zot24',
    platform: 'linkedin',
    external: true,
  },
  {
    name: 'X',
    icon: XIcon,
    href: 'https://x.com/zot24',
    handle: '@zot24',
    // analytics key kept as 'twitter' for historical continuity
    platform: 'twitter',
    external: true,
  },
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:hi@zot24.com',
    handle: 'hi@zot24.com',
    platform: 'email',
    external: false,
  },
];

interface SocialLinksProps {
  variant?: 'inline' | 'list';
}

export function SocialLinks({ variant = 'inline' }: SocialLinksProps) {
  if (variant === 'list') {
    return (
      <ul className="space-y-2 text-sm">
        {socialLinks.map((link) => (
          <li key={link.name} className="flex items-center gap-3">
            <link.icon className="w-3.5 h-3.5 dim shrink-0" aria-hidden="true" />
            <span className="dim text-[0.72rem] uppercase tracking-widest w-16 shrink-0">
              {link.name}
            </span>
            <a
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              onClick={() =>
                trackSocialClick({ platform: link.platform, href: link.href })
              }
              className="t-press accent hover:underline underline-offset-4"
            >
              {link.handle}
              {link.external && <span className="ml-1 text-xs">↗</span>}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
      {socialLinks.map((link, i) => (
        <span key={link.name} className="flex items-center gap-2">
          {i > 0 && <span className="dimmer">·</span>}
          <a
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            onClick={() =>
              trackSocialClick({ platform: link.platform, href: link.href })
            }
            className="t-press inline-flex items-center gap-1.5 dim hover:text-[color:var(--t-fg)] transition-colors"
          >
            <link.icon className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{link.handle}</span>
          </a>
        </span>
      ))}
    </div>
  );
}
