'use client';

import { motion } from 'framer-motion';
import { SocialLinks } from '@/components/social-links';
import { Card } from '@/components/ui/card';

export function Contact() {
  return (
    <section id="contact" className="container relative px-4 py-24 mx-auto overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto relative z-10"
      >
        <Card className="p-12 text-center bg-card/40 backdrop-blur-lg border border-white/5 shadow-2xl rounded-3xl">
          <div className="flex flex-col items-center gap-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-heading font-bold text-foreground">Get in Touch</h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Feel free to reach out if you want to collaborate on a project, have a question, or just want to connect.
              </p>
            </div>

            <SocialLinks />
          </div>
        </Card>
      </motion.div>
    </section>
  );
}