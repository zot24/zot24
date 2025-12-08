'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

interface ScrambleTextProps {
    text: string;
    className?: string;
    duration?: number;
    delay?: number;
}

export function ScrambleText({ text, className, duration = 3, delay = 0 }: ScrambleTextProps) {
    const [displayText, setDisplayText] = useState('');
    const [isScrambling, setIsScrambling] = useState(true);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let startTime = Date.now();
        let frame = 0;

        const runScramble = () => {
            const now = Date.now();
            const elapsed = (now - startTime) / 1000;

            if (elapsed < delay) {
                requestAnimationFrame(runScramble);
                return;
            }

            const progress = Math.min((elapsed - delay) / duration, 1);

            // Calculate how many characters should be fixed based on progress
            const length = text.length;
            const fixedChars = Math.floor(progress * length);

            let result = '';
            for (let i = 0; i < length; i++) {
                if (i < fixedChars) {
                    result += text[i];
                } else {
                    // "Falling" character effect - simulate randomized "encrypted" stream
                    result += CHARS[Math.floor(Math.random() * CHARS.length)];
                }
            }

            setDisplayText(result);

            if (progress < 1) {
                // Slow down the scramble frame rate slightly for a "clock/mechanical" feel
                if (frame % 3 === 0) {
                    // Update random chars
                }
                frame++;
                requestAnimationFrame(runScramble);
            } else {
                setIsScrambling(false);
                setDisplayText(text);
            }
        };

        runScramble();

        return () => { };
    }, [text, duration, delay]);

    return (
        <span className={`${className} font-mono relative inline-block`}>
            {displayText.split('').map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.3,
                        delay: delay + (index * 0.1), // Staggered "falling" entrance
                        type: "spring",
                        stiffness: 200
                    }}
                    className="inline-block"
                >
                    {char}
                </motion.span>
            ))}
        </span>
    );
}
