'use client';

import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
      description: "Insight Partners is a leading global venture capital and private equity firm investing in high-growth technology and software companies. The company has invested in more than 400 companies worldwide and has 90+ billion in assets under management.",
      details: "I joined the company after the acquisition of roadmap.sh which I have been running as a solo founder since 2017. I am now working full-time on the product and responsible for everything from content to engineering to product to marketing and growth.",
      technologies: [
        "TypeScript",
        "React.js",
        "Node.js",
        "Astro",
        "RESTful APIs",
        "Tailwind",
        "GitHub",
        "Git",
        "AWS",
        "Terraform",
        "Ansible",
        "Docker",
        "CI/CD",
        "SEO",
        "Content Writing"
      ],
      testimonials: [
        {
          name: "Sarah Johnson",
          role: "Product Manager",
          company: "Insight Partners",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
          text: "An exceptional leader who combines technical expertise with strategic thinking. Their ability to navigate complex challenges while maintaining team morale is remarkable."
        },
        {
          name: "Michael Chen",
          role: "Senior Developer",
          company: "Insight Partners",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
          text: "Working with them has been transformative for our team. Their technical insights and mentorship have significantly elevated our engineering practices."
        }
      ]
    }
  ];

  return (
    <section id="work" className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/50 to-background" />
      <div className="container relative px-4 py-24 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-2 text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Employment History</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            A timeline of my professional journey and key achievements.
          </p>
        </motion.div>

        <div className="space-y-24">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-8">
                <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-muted-foreground">{experience.location}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <h3 className="text-2xl font-semibold">{experience.title}</h3>
                            <span className="text-muted-foreground">at</span>
                            <span className="font-semibold">{experience.company}</span>
                            {experience.tag && (
                              <Badge variant="secondary" className="ml-2">
                                {experience.tag}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-muted-foreground">{experience.period}</p>
                      </div>

                      <p className="text-muted-foreground">{experience.description}</p>
                      <p className="text-muted-foreground">{experience.details}</p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {experience.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {experience.testimonials && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold">Colleague Reviews</h4>
                      <div className="space-y-4">
                        {experience.testimonials.map((testimonial, tIndex) => (
                          <div key={tIndex} className="p-4 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                <Image
                                  src={testimonial.image}
                                  alt={testimonial.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-semibold">{testimonial.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {testimonial.role} at {testimonial.company}
                                </p>
                              </div>
                            </div>
                            <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {index < experiences.length - 1 && (
                <div className="mt-12" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}