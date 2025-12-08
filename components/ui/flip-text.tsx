'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const PREFERRED_CHARS = ['Z', 'O', 'T', '2', '4'];
const OTHER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const MIXED_CHARS = [
    ...Array(15).fill(PREFERRED_CHARS).flat(), // High weight to Z, O, T, 2, 4
    ...OTHER_CHARS.split('')
];

const FlipCard = ({ char, nextChar }: { char: string; nextChar: string }) => {
    return (
        <div className="relative w-12 h-20 bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 shadow-xl">
            {/* Top Half (Next Char) - Static behind */}
            <div className="absolute top-0 left-0 right-0 h-1/2 overflow-hidden bg-zinc-800 border-b border-black/50">
                <div className="absolute top-0 left-0 right-0 h-20 flex items-center justify-center text-4xl font-mono font-bold text-zinc-400">
                    {nextChar}
                </div>
            </div>

            {/* Bottom Half (Current Char) - Static behind */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden bg-zinc-800 flex items-end justify-center">
                <div className="absolute top-[-40px] left-0 right-0 h-20 flex items-center justify-center text-4xl font-mono font-bold text-zinc-400">
                    {char}
                </div>
            </div>

            {/* Top Flip (Current Char) - Animating */}
            <motion.div
                key={`top-${char}`}
                initial={{ rotateX: 0 }}
                animate={{ rotateX: -90 }}
                transition={{ duration: 0.6, ease: "easeIn" }}
                style={{ transformOrigin: "bottom" }}
                className="absolute top-0 left-0 right-0 h-1/2 overflow-hidden bg-zinc-900 border-b border-black/50 z-20 backface-hidden"
            >
                <div className="absolute top-0 left-0 right-0 h-20 flex items-center justify-center text-4xl font-mono font-bold text-white">
                    {char}
                </div>
            </motion.div>

            {/* Bottom Flip (Next Char) - Animating */}
            <motion.div
                key={`bottom-${nextChar}`}
                initial={{ rotateX: 90 }}
                animate={{ rotateX: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }} // Wait for top to finish (approx)
                style={{ transformOrigin: "top" }}
                className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden bg-zinc-900 z-30 backface-hidden"
            >
                <div className="absolute top-[-40px] left-0 right-0 h-20 flex items-center justify-center text-4xl font-mono font-bold text-white">
                    {nextChar}
                </div>
            </motion.div>

            {/* Split Line */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/80 z-40 transform -translate-y-1/2 shadow-sm" />
        </div>
    );
};

// Simplified Flip Card without complex 3D logic for better performance/stability in loop
// The previous "complex" one often glitches with React state updates in loops. 
// A simpler "Fold" effect:
const SimpleFlipCard = ({ char }: { char: string }) => {
    return (
        <div className="relative w-10 md:w-14 h-16 md:h-24 bg-card/80 backdrop-blur-md rounded-md border border-white/5 flex flex-col perspective-1000 shadow-2xl">
            <AnimatePresence mode='popLayout'>
                <motion.div
                    key={char}
                    initial={{ rotateX: -90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    exit={{ rotateX: 90, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 150, damping: 15 }}
                    className="absolute inset-0 flex items-center justify-center text-3xl md:text-5xl font-mono font-bold text-primary"
                >
                    {char}
                    {/* Split line decoration */}
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/40 w-full" />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export function FlipText() {
    const [chars, setChars] = useState<string[]>(Array(8).fill('')); // Length 8

    useEffect(() => {
        // Initialize random chars
        setChars(current => current.map(() => MIXED_CHARS[Math.floor(Math.random() * MIXED_CHARS.length)]));

        const interval = setInterval(() => {
            setChars(current =>
                current.map(originalChar => {
                    // 30% chance to NOT change to keep it readable/calmer
                    if (Math.random() > 0.7) return originalChar;
                    return MIXED_CHARS[Math.floor(Math.random() * MIXED_CHARS.length)];
                })
            );
        }, 800); // Slower update for "slow rolling" feel

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex gap-2 md:gap-3 p-4 bg-black/10 rounded-xl border border-white/5 backdrop-blur-sm">
            {chars.map((char, i) => (
                <SimpleFlipCard key={i} char={char} />
            ))}
        </div>
    );
}
