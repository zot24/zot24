'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { Project } from '@/lib/projects';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container relative px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
              Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Tools and platforms I build and maintain.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const primaryHref = project.url || project.github;

            const cardContent = (
              <Card className="p-6 h-full hover:bg-muted/5 transition-colors border-white/10 flex flex-col justify-between group bg-card/40 backdrop-blur-md relative overflow-hidden">
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    {project.status && (
                      <Badge
                        variant="secondary"
                        className="text-xs font-mono bg-primary/10 text-primary border-primary/20 capitalize"
                      >
                        {project.status}
                      </Badge>
                    )}
                    {project.tags?.[0] && (
                      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        {project.tags[0]}
                      </span>
                    )}
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold font-heading group-hover:text-primary transition-colors leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm font-medium text-foreground/80">
                      {project.tagline}
                    </p>
                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {project.tags && project.tags.length > 1 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.slice(1).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[10px] rounded-full bg-primary/5 text-primary/80 border border-primary/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-6 mt-6 flex items-center justify-between gap-3 relative z-10">
                  <div className="flex items-center text-sm font-medium text-primary opacity-60 group-hover:opacity-100 transition-all duration-300">
                    {project.url ? 'Visit site' : 'View on GitHub'}
                    <ArrowRight className="ml-2 w-4 h-4 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  {project.github && project.url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      onClick={(e) => e.stopPropagation()}
                      className="text-muted-foreground hover:text-foreground h-8 px-2"
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} on GitHub`}
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </Card>
            );

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {primaryHref ? (
                  <a
                    href={primaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    {cardContent}
                  </a>
                ) : (
                  cardContent
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
