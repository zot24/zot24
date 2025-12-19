'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import profileData from '@/content/profile.json';

export function Skills() {
    const skills = profileData.skills || [];

    return (
        <section id="skills" className="py-24 relative overflow-hidden">
            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 space-y-4"
                >
                    <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">Technical Expertise</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        A comprehensive toolbelt built over 23 years of engineering leadership and development.
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Badge
                                variant="secondary"
                                className="px-4 py-2 text-sm bg-background/50 backdrop-blur border border-white/10 hover:border-primary/50 transition-colors"
                            >
                                {skill}
                            </Badge>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
