'use client';

import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from 'next/image';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
}

interface Experience {
  location: string;
  period: string;
  title: string;
  company: string;
  tag?: string;
  description: string;
  details: string;
  technologies: string[];
  testimonials?: Testimonial[];
}

export function Experience() {
  const experiences: Experience[] = [
    {
      location: "England, UK",
      period: "Dec 2021 — Present",
      title: "Head of Engineering",
      company: "Insight Partners",
      tag: "via acquisition",
      description: "Insight Partners is a leading global venture capital firm investing in high-growth technology and software companies.",
      details: "Joined following the acquisition of roadmap.sh (founded 2017). Currently leading product development, engineering strategy, and growth initiatives.",
      technologies: [
        "TypeScript", "React.js", "Node.js", "Astro", "Tailwind", "AWS", "Terraform", "Docker", "CI/CD"
      ],
      testimonials: [
        {
          name: "Sarah Johnson",
          role: "Product Manager",
          company: "Insight Partners",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
          text: "An exceptional leader who combines technical expertise with strategic thinking. Their ability to navigate complex challenges while maintaining team morale is remarkable."
        }
      ]
    }
  ];

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

        <div className="max-w-5xl mx-auto">
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

                <div className="grid gap-10 lg:grid-cols-[1.5fr,1fr] relative z-10">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex flex-wrap justify-between items-baseline gap-2">
                        <p className="text-sm font-medium text-primary/80 uppercase tracking-widest">{experience.location}</p>
                        <p className="text-sm text-muted-foreground font-mono">{experience.period}</p>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-3xl font-heading font-bold leading-tight">{experience.title}</h3>
                        <div className="flex items-center gap-2 text-lg text-muted-foreground">
                          <span>at</span>
                          <span className="font-medium text-foreground">{experience.company}</span>
                          {experience.tag && (
                            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 text-xs ml-2">
                              {experience.tag}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 text-base leading-relaxed text-muted-foreground/90">
                      <p>{experience.description}</p>
                      <p>{experience.details}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4">
                      {experience.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {experience.testimonials && (
                    <div className="relative pl-0 lg:pl-10 lg:border-l border-white/10 space-y-6">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Colleague Reviews</h4>
                      <div className="space-y-6">
                        {experience.testimonials.map((testimonial, tIndex) => (
                          <div key={tIndex} className="p-5 rounded-xl bg-white/5 border border-white/5">
                            <p className="text-muted-foreground italic text-sm mb-4 leading-relaxed">"{testimonial.text}"</p>
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10">
                                <Image
                                  src={testimonial.image}
                                  alt={testimonial.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {testimonial.role}, {testimonial.company}
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