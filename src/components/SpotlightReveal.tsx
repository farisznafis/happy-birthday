import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Flame } from 'lucide-react';

interface SpotlightRevealProps {
  onReveal: () => void;
}

export default function SpotlightReveal({ onReveal }: SpotlightRevealProps) {
  const [isLit, setIsLit] = useState(false);
  const [showInstruction, setShowInstruction] = useState(true);

  // Flame position
  const x = useMotionValue(window.innerWidth / 2);
  const y = useMotionValue(window.innerHeight - 100);

  // Smooth the flame movement
  const smoothX = useSpring(x, { damping: 25, stiffness: 200 });
  const smoothY = useSpring(y, { damping: 25, stiffness: 200 });

  // Fixed Cake position for better mobile reachability (Top Center)
  const cakePos = useRef({
    top: window.innerHeight * 0.25, // 25% from top
    left: window.innerWidth * 0.5, // 50% from left (center)
  });

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isLit) return;
    x.set(e.clientX);
    y.set(e.clientY);

    // Check proximity
    const dx = e.clientX - cakePos.current.left;
    const dy = e.clientY - cakePos.current.top;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 60) {
      onReveal();
    }
  };

  const startLighting = () => {
    setIsLit(true);
    setShowInstruction(false);
  };

  const spotlightStyle: React.CSSProperties = {
    background: isLit
      ? `radial-gradient(circle 140px at var(--x) var(--y), rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.98) 100%)`
      : 'black',
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 20,
    // Add a slight flicker to the spotlight scale via transform or just opacity
    transition: 'background 0.1s ease-out',
  };

  return (
    <div
      className="relative w-full h-full bg-[#050505] overflow-hidden touch-none"
      onPointerMove={handlePointerMove}
      style={{
        ['--x' as any]: `${smoothX.get()}px`,
        ['--y' as any]: `${smoothY.get()}px`,
      }}
    >
      {/* Hidden Cake (Revealed by spotlight) */}
      <div
        className="absolute flex flex-col items-center justify-center"
        style={{
          top: cakePos.current.top,
          left: cakePos.current.left,
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
        }}
      >
        <span className="text-8xl select-none">🎂</span>
        <div className="w-12 h-2 bg-black/40 blur-xl mt-2" />
      </div>

      {/* Spotlight Overlay */}
      <motion.div
        animate={isLit ? {
          opacity: [0.98, 1, 0.97, 1],
        } : {}}
        transition={{ repeat: Infinity, duration: 0.1 }}
        style={spotlightStyle}
      />

      {/* Instruction Text */}
      <AnimatePresence>
        {showInstruction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-32 left-0 right-0 text-center z-30 px-6"
          >
            <p className="text-gold-200 font-serif italic text-xl animate-pulse tracking-widest text-[#D4AF37]">
              Hold to light the match...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Matchstick / Flame */}
      <div className="absolute inset-x-0 bottom-10 flex justify-center z-40">
        {!isLit ? (
          <motion.div
            whileTap={{ scale: 0.9 }}
            onPointerDown={startLighting}
            className="relative cursor-pointer group"
          >
             {/* Matchstick handle */}
             <div className="w-2 h-24 bg-[#3d2b1f] rounded-b-sm border-t-4 border-[#8b0000] shadow-lg relative">
                <div className="absolute inset-0 bg-black/20" />
             </div>

             {/* Interaction Glow */}
             <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-orange-500/20 blur-xl group-hover:bg-orange-500/40 transition-colors" />
          </motion.div>
        ) : (
          <motion.div
            style={{ x: smoothX, y: smoothY, position: 'fixed', left: 0, top: 0 }}
            className="pointer-events-none -translate-x-1/2 -translate-y-1/2"
          >
            {/* Flame effect */}
            <div className="relative">
               <motion.div
                 animate={{ scale: [1, 1.1, 1], rotate: [-1, 1, -1] }}
                 transition={{ repeat: Infinity, duration: 0.2 }}
                 className="w-10 h-16 bg-gradient-to-t from-orange-600 via-yellow-400 to-transparent rounded-full blur-[2px] shadow-[0_0_20px_#f59e0b]"
               />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-4 h-8 bg-blue-400/30 blur-md rounded-full" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Dark Ambient Instruction (once lit) */}
      <AnimatePresence>
        {isLit && (
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 0.6 }}
             transition={{ delay: 1 }}
             className="absolute top-20 left-0 right-0 text-center pointer-events-none"
          >
            <p className="font-serif text-sm tracking-[0.3em] text-white/40 uppercase">
              Drag the flame to find the cake
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
