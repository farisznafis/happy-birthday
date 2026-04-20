import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MESSAGE = `On your special day, I wanted to create something as magical and unique as you are.

May your year be filled with the same light you bring into my life every single day. You deserve all the gold in the world and more.

Happy Birthday, my love. Forever and always.`;

interface LoveLetterProps {
  onSeeOthers: () => void;
}

export default function LoveLetter({ onSeeOthers }: LoveLetterProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(MESSAGE.slice(0, index));
      index++;
      if (index > MESSAGE.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center p-6 overflow-hidden">
      {/* Background Image with Referrer Policy */}
      <img
        src="https://picsum.photos/seed/luxury-night/1000/1800?blur=10"
        alt=""
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
        className="relative z-10 w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden"
      >
        {/* Subtle decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-serif text-[#D4AF37] mb-8 tracking-[0.2em] uppercase text-xs text-center"
        >
          A Private Message
        </motion.div>

        <div className="font-serif text-white/90 text-lg md:text-xl leading-relaxed whitespace-pre-line text-center min-h-[300px]">
          {displayedText}
          <motion.span
            animate={{ opacity: [0, 1] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
            className="inline-block w-1 h-5 bg-[#D4AF37] ml-1 align-middle"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 8 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
           <div className="w-12 h-[1px] bg-[#D4AF37]/30" />
           <motion.button
             whileTap={{ scale: 0.95 }}
             onClick={onSeeOthers}
             className="px-6 py-2 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37]/10 transition-colors"
           >
             See Others
           </motion.button>
        </motion.div>

        {/* Ambient light inside card */}
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-[60px]" />
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/5 rounded-full blur-[60px]" />
      </motion.div>
    </div>
  );
}
