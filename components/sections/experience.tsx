'use client';

import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Quote, User } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  name: string;
  role: string;
  company?: string;
  image?: string;
  text: string;
}

interface Experience {
  location: string;
  period: string;
  title: string;
  company: string;
  tag?: string;
  highlights: string[];
  technologies: string[];
  testimonials?: Testimonial[];
}

import profileData from '@/content/profile.json';

export function Experience() {
  const experiences: Experience[] = (profileData.experience || []).map((exp: any) => ({
    location: exp.location || "Remote / Global",
    period: exp.period,
    title: exp.title,
    company: exp.company,
    tag: "",
    highlights: exp.highlights || [],
    technologies: exp.technologies || [],
    testimonials: exp.testimonials ? exp.testimonials.map((t: any) => ({
      name: t.name,
      role: t.role,
      company: exp.company,
      image: t.image,
      text: t.text
    })) : []
  }));

  return (
    <section id="work" className="relative py-24 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-background/50" />
      <div className="absolute top-1/4 -right-64 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="container relative px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">Employment History</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg font-light">
            A timeline of my professional journey and key achievements.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-8 md:p-10 bg-card/40 backdrop-blur-md border border-white/5 shadow-xl rounded-2xl relative overflow-hidden group">
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className={`relative z-10 ${experience.testimonials && experience.testimonials.length > 0 ? 'grid gap-10 lg:grid-cols-[1.5fr,1fr]' : ''}`}>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex flex-wrap justify-between items-baseline gap-2">
                        <p className="text-sm font-medium text-primary/80 uppercase tracking-widest">{experience.location}</p>
                        <p className="text-sm text-muted-foreground font-mono">{experience.period}</p>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-2xl md:text-3xl font-heading font-bold leading-tight">{experience.title}</h3>
                        <div className="flex items-center gap-2 text-lg text-muted-foreground">
                          <span>at</span>
                          <span className="font-medium text-foreground">{experience.company}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bullet point highlights */}
                    {experience.highlights.length > 0 && (
                      <ul className="space-y-3">
                        {experience.highlights.map((highlight, hIndex) => (
                          <li key={hIndex} className="flex gap-3 text-muted-foreground/90">
                            <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                            <span className="leading-relaxed">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {experience.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {experience.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {experience.testimonials && experience.testimonials.length > 0 && (
                    <div className="relative pl-0 lg:pl-10 lg:border-l border-white/10 space-y-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Quote className="w-5 h-5 text-primary/60" />
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Review</h4>
                      </div>
                      <div className="space-y-6">
                        {experience.testimonials.map((testimonial, tIndex) => (
                          <div key={tIndex} className="p-5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <p className="text-muted-foreground italic text-sm mb-4 leading-relaxed">"{testimonial.text}"</p>
                            <div className="flex items-center gap-3">
                              {testimonial.image ? (
                                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10">
                                  <Image
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/20 text-primary">
                                  <User className="w-5 h-5" />
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {testimonial.role}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}