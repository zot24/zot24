'use client';

import { motion } from 'framer-motion';
import { Brain, Cloud, Code, Rocket } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function About() {
  const expertise = [
    {
      icon: Cloud,
      title: 'Cloud Infrastructure',
      description: 'Expert in AWS, Kubernetes, and Terraform',
    },
    {
      icon: Brain,
      title: 'AI Integration',
      description: 'Specializing in AI-driven solutions and ML operations',
    },
    {
      icon: Code,
      title: 'Web3 Development',
      description: 'Building decentralized applications and smart contracts',
    },
    {
      icon: Rocket,
      title: 'Technical Leadership',
      description: 'Proven track record in leading high-performance teams',
    },
  ];

  return (
    <section id="about" className="py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-4 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            I am a seasoned software engineer with two decades of experience, focusing on DevOps and cloud infrastructure.
            My expertise spans Terraform, Kubernetes, AWS, Docker, and modern web technologies.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {expertise.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <item.icon className="h-6 w-6 mb-2" />
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}