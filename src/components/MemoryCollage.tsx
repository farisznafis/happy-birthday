import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Camera, Heart, Sparkles } from 'lucide-react';

interface PhotoProps {
  src: string;
  rotation: number;
  delay: number;
  x: string;
  y: string;
  mouseX: any;
  mouseY: any;
}

const PhotoCard: React.FC<PhotoProps> = ({ src, rotation, delay, x, y, mouseX, mouseY }) => {
  // Parallax effect based on mouse/touch movement
  const px = useTransform(mouseX, [0, window.innerWidth], [-20, 20]);
  const py = useTransform(mouseY, [0, window.innerHeight], [-20, 20]);
  const smoothPX = useSpring(px, { damping: 20, stiffness: 100 });
  const smoothPY = useSpring(py, { damping: 20, stiffness: 100 });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: rotation - 20, x: 0, y: 50 }}
      animate={{ opacity: 1, scale: 1, rotate: rotation, x: 0, y: 0 }}
      transition={{
        delay,
        duration: 1.2,
        ease: [0.19, 1, 0.22, 1],
        scale: { type: "spring", damping: 15, stiffness: 100 }
      }}
      style={{
        left: x,
        top: y,
        x: smoothPX,
        y: smoothPY
      }}
      className="absolute"
    >
      <motion.div
        whileHover={{ scale: 1.05, zIndex: 50, rotate: rotation + 5 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white p-3 pb-10 shadow-2xl rounded-sm border border-black/5 flex flex-col gap-2 group cursor-pointer"
      >
        <div className="relative overflow-hidden w-40 md:w-56 aspect-[4/5] bg-neutral-100">
           <img
             src={src}
             alt="Memory"
             referrerPolicy="no-referrer"
             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="flex justify-between items-center px-1">
          <Heart size={14} className="text-red-400 fill-red-400 opacity-60" />
          <span className="font-serif text-[10px] text-gray-400 italic">2024</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface MemoryCollageProps {
  onBack: () => void;
}

export default function MemoryCollage({ onBack }: MemoryCollageProps) {
  const mouseX = useMotionValue(window.innerWidth / 2);
  const mouseY = useMotionValue(window.innerHeight / 2);

  const handlePointerMove = (e: React.PointerEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const images = [
    { src: 'https://picsum.photos/seed/love1/400/500', rot: -5, x: '10%', y: '15%', delay: 0.2 },
    { src: 'https://picsum.photos/seed/love2/400/500', rot: 8, x: '55%', y: '10%', delay: 0.5 },
    { src: 'https://picsum.photos/seed/love3/400/500', rot: -3, x: '25%', y: '45%', delay: 0.8 },
    { src: 'https://picsum.photos/seed/love4/400/500', rot: 6, x: '60%', y: '50%', delay: 1.1 },
    { src: 'https://picsum.photos/seed/love5/400/500', rot: -10, x: '5%', y: '65%', delay: 1.4 },
  ];

  return (
    <div
      onPointerMove={handlePointerMove}
      className="relative w-full h-full overflow-hidden flex flex-col bg-[#1a0f0a] touch-none select-none"
    >
      {/* Background with warm glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#1a0f0a] via-[#3d2b1f] to-[#1a0f0a]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8b4513]/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Floating Particles/Sparkles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            animate={{
              opacity: [0, 1, 0],
              y: [null, '-100vh'],
              x: [null, `${(Math.random() - 0.5) * 100}px`]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-[#D4AF37] rounded-full blur-[1px]"
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-20 pt-12 text-center flex flex-col items-center gap-2 pointer-events-none px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Sparkles className="text-[#D4AF37] mb-2" size={24} />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-display text-4xl md:text-5xl text-[#D4AF37] tracking-tight"
        >
          Our Memories
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1, duration: 1 }}
          className="font-serif italic text-white/60 text-sm md:text-base max-w-xs"
        >
          Every moment with you means everything to me
        </motion.p>
      </header>

      {/* Collage Area */}
      <div className="relative flex-1 w-full max-w-lg mx-auto mt-10">
        {images.map((img, i) => (
          <PhotoCard
            key={i}
            src={img.src}
            rotation={img.rot}
            delay={img.delay}
            x={img.x}
            y={img.y}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        ))}
      </div>

      {/* Footer Button */}
      <footer className="relative z-30 pb-16 flex justify-center">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="group relative px-8 py-3 rounded-full overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] opacity-20 group-hover:opacity-30 blur-md transition-opacity" />
          <div className="absolute inset-0 border border-[#D4AF37]/30 rounded-full" />
          <span className="relative z-10 text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-sans font-medium">
            Back to Story
          </span>
        </motion.button>
      </footer>
    </div>
  );
}
