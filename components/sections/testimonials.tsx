'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import testimonialsData from '@/content/testimonials.json';

export function Testimonials() {
    return (
        <section id="reviews" className="py-24 relative overflow-hidden bg-muted/30">
            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 space-y-4"
                >
                    <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">Kind Words</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Feedback from colleagues and leaders I've had the privilege to work with.
                    </p>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {testimonialsData.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="h-full"
                        >
                            <Card className="h-full bg-card/50 backdrop-blur border-white/10 flex flex-col hover:border-primary/20 transition-colors">
                                <CardHeader className="pb-2">
                                    <Quote className="w-8 h-8 text-primary/40 mb-4" />
                                    <p className="text-muted-foreground leading-relaxed italic text-sm">
                                        "{testimonial.text}"
                                    </p>
                                </CardHeader>
                                <CardContent className="mt-auto pt-6 border-t border-white/5 mx-6 px-0 pb-6">
                                    <div>
                                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                                        <p className="text-xs text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
