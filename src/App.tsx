/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import SpotlightReveal from "./components/SpotlightReveal";
import Celebration from "./components/Celebration";
import LoveLetter from "./components/LoveLetter";
import MemoryCollage from "./components/MemoryCollage";
import { AnimatePresence, motion } from "motion/react";

type Scene = "start" | "search" | "revealed" | "letter" | "memories";

export default function App() {
  const [scene, setScene] = useState<Scene>("start");
  const [name, setName] = useState("Sayangkuww"); // Default name, could be made dynamic
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(
      "/happy-birthday/bergema-sampai-selamanya.mp3",
    );
    audioRef.current.volume = 0.5;
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((e) => console.log("Audio play blocked:", e));
    }
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleReveal = () => {
    setScene("revealed");
  };

  const handleCelebrationComplete = () => {
    setScene("letter");
  };

  const handleSeeMemories = () => {
    setScene("memories");
  };

  const handleBackToStory = () => {
    stopMusic();
    setScene("start"); // Or back to letter/celebration
  };

  return (
    <main className="w-full h-full bg-black">
      <AnimatePresence mode="wait">
        {scene === "start" && (
          <motion.div
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center bg-black cursor-pointer"
            onClick={() => {
              playMusic();
              setScene("search");
            }}
          >
            <div className="flex flex-col items-center gap-4">
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-white rounded-full" />
              </motion.div>
              <p className="text-white/30 font-serif lowercase tracking-[0.4em] text-xs">
                Tap to Enter
              </p>
            </div>
          </motion.div>
        )}

        {scene === "search" && (
          <motion.div
            key="search"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <SpotlightReveal onReveal={handleReveal} />
          </motion.div>
        )}

        {scene === "revealed" && (
          <motion.div
            key="revealed"
            initial={{ opacity: 1 }}
            className="w-full h-full"
          >
            <Celebration
              name={name}
              onComplete={handleCelebrationComplete}
              onPlayMusic={playMusic}
            />
          </motion.div>
        )}

        {scene === "letter" && (
          <motion.div
            key="letter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="w-full h-full"
          >
            <LoveLetter onSeeOthers={handleSeeMemories} />
          </motion.div>
        )}

        {scene === "memories" && (
          <motion.div
            key="memories"
            initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            className="w-full h-full"
          >
            <MemoryCollage onBack={handleBackToStory} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
