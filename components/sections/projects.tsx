'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export function Projects() {
  const projects = [
    {
      title: 'Infinity Photos',
      description: 'A decentralized photo backup solution leveraging blockchain technology.',
      image: 'https://images.unsplash.com/photo-1516542076529-1ea3854896f2',
      technologies: ['Blockchain', 'Web3', 'React', 'Node.js'],
      github: '#',
      demo: '#',
    },
    {
      title: 'Cloud Infrastructure Automation',
      description: 'Automated deployment pipeline reducing environment creation time by 25%.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
      technologies: ['Terraform', 'AWS', 'Kubernetes', 'Docker'],
      github: '#',
      demo: '#',
    },
  ];

  return (
    <section id="projects" className="py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-4 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Projects</h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Showcase of my recent work and technical achievements.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}