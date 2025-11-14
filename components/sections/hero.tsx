'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SocialLinks } from '@/components/social-links';

export function Hero() {
  return (
    <section className="container relative px-4 pt-32 pb-24 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative w-32 h-32 overflow-hidden rounded-full"
          >
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
              alt="Profile picture"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h1 className="text-4xl font-bold">Israel Soto</h1>
              <p className="text-xl text-muted-foreground mt-2">
                Head of Engineering at Insight Partners
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-3xl space-y-4"
        >
          <p className="text-lg text-muted-foreground">
            Engineering leader with extensive experience in cloud infrastructure, DevOps, and web technologies.
          </p>
          <p className="text-lg text-muted-foreground">
            Joined Insight Partners through acquisition of roadmap.sh, which I founded and ran solo since 2017.
          </p>
          <p className="text-lg text-muted-foreground">
            Currently responsible for all aspects of product development including engineering, content, marketing and growth.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <SocialLinks />
        </motion.div>
      </motion.div>
    </section>
  );
}