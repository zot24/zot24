'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackSocialClick, type SocialClickData } from '@/lib/analytics';

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/zot24',
    color: 'hover:text-[#333]',
    bgColor: 'hover:bg-[#333]/10',
    platform: 'github' as const,
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/zot24/',
    color: 'hover:text-[#0077B5]',
    bgColor: 'hover:bg-[#0077B5]/10',
    platform: 'linkedin' as const,
  },
  {
    name: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com/zot24',
    color: 'hover:text-[#1DA1F2]',
    bgColor: 'hover:bg-[#1DA1F2]/10',
    platform: 'twitter' as const,
  },
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:hi@zot24.com',
    color: 'hover:text-primary',
    bgColor: 'hover:bg-primary/10',
    platform: 'email' as const,
  },
];

export function SocialLinks() {
  return (
    <div className="flex gap-3">
      {socialLinks.map((link) => (
        <motion.div
          key={link.name}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            size="icon"
            className={`relative transition-colors duration-300 ${link.color} ${link.bgColor}`}
            asChild
          >
            <a
              href={link.href}
              target={link.name !== 'Email' ? '_blank' : undefined}
              rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
              onClick={() => trackSocialClick({ platform: link.platform, href: link.href })}
            >
              <link.icon className="w-5 h-5" />
              <span className="sr-only">{link.name}</span>
            </a>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}