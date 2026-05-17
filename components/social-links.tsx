'use client';

import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { trackSocialClick, type SocialClickData } from '@/lib/analytics';

const socialLinks: Array<{
  name: string;
  icon: typeof Github;
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
    name: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com/zot24',
    handle: '@zot24',
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
