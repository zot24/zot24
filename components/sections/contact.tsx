'use client';

import { motion } from 'framer-motion';
import { SocialLinks } from '@/components/social-links';
import { Card } from '@/components/ui/card';

export function Contact() {
  return (
    <section id="contact" className="container px-4 py-24 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <Card className="p-8">
          <div className="flex flex-col items-center gap-8 text-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-lg text-muted-foreground">
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