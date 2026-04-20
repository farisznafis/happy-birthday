import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface CelebrationProps {
  name: string;
  onComplete: () => void;
}

export default function Celebration({ name, onComplete }: CelebrationProps) {
  const [phase, setPhase] = useState<'flash' | 'reveal' | 'exit'>('flash');

  useEffect(() => {
    // 1. Trigger Confetti
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    // 2. Initial Burst
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FFD700', '#F5F5DC', '#FFFFFF']
    });

    // 3. Phase Timeline
    const timer1 = setTimeout(() => setPhase('reveal'), 1000);
    const timer2 = setTimeout(() => setPhase('exit'), 6000);
    const timer3 = setTimeout(() => onComplete(), 7000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
      {/* Light Burst Layer */}
      <AnimatePresence>
        {phase === 'flash' && (
          <motion.div
            initial={{ opacity: 1, scale: 0.5 }}
            animate={{ opacity: 0, scale: 4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 bg-white z-[60] rounded-full blur-[100px]"
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {phase === 'reveal' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col items-center justify-center z-50 text-center px-6"
          >
            {/* The Cake */}
            <motion.div
               initial={{ y: 20 }}
               animate={{ y: [0, -10, 0] }}
               transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
               className="text-9xl mb-12 drop-shadow-[0_0_30px_rgba(212,175,55,0.8)]"
            >
              🎂
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-display font-bold tracking-tight text-[#D4AF37] leading-tight"
              style={{ textShadow: '0 0 20px rgba(212,175,55,0.4)' }}
            >
              Happy Birthday<br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white font-serif italic text-6xl md:text-8xl"
              >
                {name}
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-8 flex gap-2"
            >
               {[...Array(3)].map((_, i) => (
                 <motion.div
                   key={i}
                   animate={{
                     opacity: [0, 1, 0],
                     scale: [0.8, 1.2, 0.8]
                   }}
                   transition={{
                     repeat: Infinity,
                     duration: 2,
                     delay: i * 0.4
                   }}
                   className="w-2 h-2 bg-[#D4AF37] rounded-full"
                 />
               ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(61,43,31,0.2)_0%,transparent_70%)]" />
    </div>
  );
}
