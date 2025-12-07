'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Briefcase, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NavigationMenu() {
  return (
    <motion.nav
      className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="bg-black/20 backdrop-blur-md border border-white/10 shadow-2xl rounded-full px-6 py-2 pointer-events-auto">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-full px-4" asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span className="font-medium">Home</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-full px-4" asChild>
            <Link href="#work" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="font-medium">Work</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-full px-4" asChild>
            <Link href="#contact" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span className="font-medium">Contact</span>
            </Link>
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}