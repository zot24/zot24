'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SocialLinks } from '@/components/social-links';
import { HyperText } from '@/components/ui/hyper-text';
import { Badge } from '@/components/ui/badge';

const coreSkills = [
  "Kubernetes", "Terraform", "AWS", "GCP", "Azure", "Go", "Platform Engineering"
];

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-32 pb-20 lg:py-0">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-xl font-medium text-primary tracking-wide uppercase">
                Founder, Builder & Engineer
              </h2>
              <div className="flex justify-center lg:justify-start">
                <HyperText
                  text="zot24"
                  className="text-5xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500"
                />
              </div>
              <div className="space-y-3 max-w-2xl mx-auto lg:mx-0">
                <p className="text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed">
                  15+ years building <span className="text-foreground font-medium">cloud platforms</span> and <span className="text-foreground font-medium">scalable infrastructure</span> at companies like BlackRock, Anaplan, and Entelo.
                </p>
                <p className="text-lg text-muted-foreground/80 font-light leading-relaxed">
                  Entrepreneur and seed investor. Currently based in <span className="text-foreground font-medium">Paraguay</span> after years of traveling across the globe.
                </p>
              </div>
            </div>

            {/* Skills integrated into hero */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {coreSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="px-3 py-1 text-xs bg-white/5 border border-white/10 hover:border-primary/30 transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <SocialLinks />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-64 h-64 lg:w-96 lg:h-96">
              {/* Glass Card Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-sm border border-white/10 rotate-6 shadow-2xl" />

              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-card">
                <Image
                  src="/images/profile.jpg"
                  alt="zot24 Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}