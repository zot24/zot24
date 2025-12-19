'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, MessageCircle, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackNavClick, type NavClickData } from '@/lib/analytics';

const navItems: Array<{
  href: string;
  icon: typeof Home;
  label: string;
  destination: NavClickData['destination'];
}> = [
  { href: '/', icon: Home, label: 'Home', destination: 'home' },
  { href: '/#work', icon: Briefcase, label: 'Work', destination: 'work' },
  { href: '/blog', icon: BookOpen, label: 'Writing', destination: 'writing' },
  { href: '/#contact', icon: MessageCircle, label: 'Contact', destination: 'contact' },
];

export function NavigationMenu() {
  const [isHovering, setIsHovering] = useState(false);
  const [isInitial, setIsInitial] = useState(true);

  const [hasHiddenOnce, setHasHiddenOnce] = useState(false);

  // Handle initial visibility
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitial(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Show if mouse is within top 100px
      setIsHovering(e.clientY <= 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const isVisible = isInitial || isHovering;

  const navVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 }
    },
    hidden: {
      y: -100,
      opacity: 0,
      transition: hasHiddenOnce ? { type: "spring", stiffness: 260, damping: 20 } : { duration: 2, ease: "easeInOut" }
    }
  };

  return (
    <AnimatePresence onExitComplete={() => setHasHiddenOnce(true)}>
      {isVisible && (
        <motion.nav
          className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={navVariants}
        >
          <div className="bg-black/20 backdrop-blur-md border border-white/10 shadow-2xl rounded-full px-6 py-2 pointer-events-auto">
            <div className="flex items-center gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-full px-4"
                  asChild
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-2"
                    onClick={() => trackNavClick({ destination: item.destination, href: item.href })}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}