'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NavigationMenu() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition(e.clientY);
      setIsVisible(e.clientY <= 100); // Show menu when mouse is within 100px from top
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className="fixed top-0 left-0 right-0 z-50 p-4"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="container mx-auto flex justify-center">
            <motion.div
              className="bg-secondary/50 backdrop-blur-lg rounded-full px-6 py-2 inline-flex"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center space-x-6">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/">
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="#work">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Work
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="#contact">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Say Hi
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}