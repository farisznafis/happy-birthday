import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  Gift,
  PartyPopper,
  Volume2,
  VolumeX,
  Star,
  Cake,
  Sparkles,
  ChevronRight,
  Camera,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

// --- Types ---
interface BalloonProps {
  color: string;
  delay: number;
  x: number;
  key?: number | string;
}

type Step = "landing" | "gift" | "gallery" | "message";

// --- Components ---

const Balloon = ({ color, delay, x }: BalloonProps) => {
  return (
    <motion.div
      initial={{ y: "110vh", opacity: 0 }}
      animate={{
        y: "-20vh",
        opacity: [0, 1, 1, 0],
        x: [x + "%", x + 5 + "%", x - 5 + "%", x + "%"],
      }}
      transition={{
        duration: 15,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute pointer-events-none"
      style={{ left: `${x}%` }}
    >
      <div
        className={`w-12 h-16 rounded-full relative ${color} shadow-lg shadow-black/10`}
      >
        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-1 h-3 bg-black/10 rounded-full" />
      </div>
    </motion.div>
  );
};

const ConfettiPiece = ({
  color,
  delay,
}: {
  color: string;
  delay: number;
  key?: number | string;
}) => {
  const x = Math.random() * 100;
  const rotation = Math.random() * 360;

  return (
    <motion.div
      initial={{ y: -20, x: `${x}vw`, rotate: 0, opacity: 1 }}
      animate={{
        y: "110vh",
        x: `${x + (Math.random() * 10 - 5)}vw`,
        rotate: rotation + 720,
        opacity: [1, 1, 0],
      }}
      transition={{ duration: 3 + Math.random() * 2, delay, ease: "easeOut" }}
      className={`absolute w-3 h-3 rounded-sm ${color} z-50`}
    />
  );
};

const PhotoMarquee = ({
  images,
  reverse = false,
  speed = 20,
}: {
  images: string[];
  reverse?: boolean;
  speed?: number;
}) => {
  return (
    <div className="relative flex overflow-hidden py-4 select-none">
      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex gap-4 whitespace-nowrap min-w-max"
      >
        {[...images, ...images].map((src, i) => (
          <div
            key={i}
            className="w-48 h-64 md:w-64 md:h-80 rounded-2xl overflow-hidden shadow-xl border-4 border-white rotate-2 group hover:rotate-0 hover:scale-105 transition-all duration-300"
          >
            <img
              src={src}
              alt={`Memory ${i}`}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function App() {
  const [step, setStep] = useState<Step>("landing");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const colors = [
    "bg-pink-400",
    "bg-purple-400",
    "bg-blue-400",
    "bg-yellow-400",
    "bg-red-400",
    "bg-green-400",
    "bg-orange-400",
    "bg-cyan-400",
  ];

  const balloons = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    color: colors[i % colors.length],
    delay: Math.random() * 10,
    x: Math.random() * 90,
  }));

  const galleryImagesRow1 = [
    "https://picsum.photos/seed/hb1/500/700",
    "https://picsum.photos/seed/hb2/500/700",
    "https://picsum.photos/seed/hb3/500/700",
    "https://picsum.photos/seed/hb4/500/700",
    "https://picsum.photos/seed/hb5/500/700",
  ];

  const galleryImagesRow2 = [
    "https://picsum.photos/seed/hb6/500/700",
    "https://picsum.photos/seed/hb7/500/700",
    "https://picsum.photos/seed/hb8/500/700",
    "https://picsum.photos/seed/hb9/500/700",
    "https://picsum.photos/seed/hb10/500/700",
  ];

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((e) => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStart = () => {
    setStep("gift");
    if (audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5F8] overflow-x-hidden relative font-sans text-gray-800">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <AnimatePresence>
          {step !== "landing" &&
            balloons.map((b) => (
              <Balloon key={b.id} color={b.color} delay={b.delay} x={b.x} />
            ))}
        </AnimatePresence>
      </div>

      {/* Floating Sparkles Background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            <Star
              className="text-pink-200 fill-pink-100"
              size={12 + Math.random() * 12}
            />
          </motion.div>
        ))}
      </div>

      {/* Music Toggle */}
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-[60] bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-pink-100 hover:scale-110 transition-transform active:scale-95"
      >
        {isPlaying ? (
          <Volume2 className="text-pink-500" />
        ) : (
          <VolumeX className="text-gray-400" />
        )}
      </button>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        loop
        src="public/Nadhif Basalamah - bergema sampai selamanya (Official Lyric Video).mp3"
      />

      <main className="relative z-10 min-h-screen flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {step === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50 }}
              className="flex flex-col items-center space-y-8 p-6 text-center"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-white p-8 rounded-[2.5rem] shadow-2xl relative z-10 border-4 border-pink-200"
                >
                  <PartyPopper className="w-16 h-16 text-pink-500 mx-auto mb-4" />
                  <h1 className="text-4xl md:text-5xl font-black text-pink-600 tracking-tight mb-2">
                    TING TING HALO SAYANG!
                  </h1>
                  <p className="text-pink-400 font-medium">coba bukaa</p>
                </motion.div>
                <div className="absolute inset-0 bg-pink-100 rounded-[2.5rem] rotate-3 -z-10" />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStart}
                className="px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-full font-bold text-xl shadow-xl shadow-pink-200 hover:shadow-2xl transition-all"
              >
                Lihat Kejutannya! ✨
              </motion.button>
            </motion.div>
          )}

          {step === "gift" && (
            <motion.div
              key="gift"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center p-6 text-center"
            >
              <motion.div
                className="cursor-pointer group relative"
                onClick={() => setStep("gallery")}
                animate={{
                  rotate: [-1, 1, -1],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute -inset-10 bg-pink-200/30 rounded-full blur-3xl group-hover:bg-pink-300/40 transition-all" />
                <Gift className="w-48 h-48 md:w-64 md:h-64 text-pink-500 drop-shadow-2xl fill-pink-50/50" />
                <p className="mt-8 text-2xl font-bold text-pink-600 animate-bounce">
                  Klik hadiahnya! 🎁
                </p>
              </motion.div>
            </motion.div>
          )}

          {step === "gallery" && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-20"
            >
              <div className="text-center mb-12 px-6">
                <Camera className="w-12 h-12 text-pink-500 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-black text-pink-600 mb-2">
                  Moments with You
                </h2>
                <p className="text-pink-400 font-medium">
                  Beberapa kenangan manis yang tak terlupakan...
                </p>
              </div>

              <div className="w-full space-y-8">
                <PhotoMarquee images={galleryImagesRow1} speed={25} />
                <PhotoMarquee images={galleryImagesRow2} reverse speed={30} />
              </div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                onClick={() => setStep("message")}
                className="mt-16 group flex items-center gap-3 px-8 py-3 bg-white text-pink-600 rounded-full font-bold shadow-lg hover:shadow-xl transition-all border-2 border-pink-100"
              >
                Lanjutkan{" "}
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          )}

          {step === "message" && (
            <motion.div
              key="message"
              className="w-full max-w-4xl mx-auto px-6 py-20 flex flex-col items-center"
            >
              {/* Confetti Explosion handled by global effect or simple component */}
              <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                {Array.from({ length: 60 }).map((_, i) => (
                  <ConfettiPiece
                    key={i}
                    color={colors[i % colors.length]}
                    delay={i * 0.05}
                  />
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/80 backdrop-blur-lg p-10 md:p-16 rounded-[3rem] border-8 border-white shadow-2xl relative text-center w-full"
              >
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white p-4 rounded-3xl shadow-lg border-2 border-pink-100">
                  <Cake className="w-12 h-12 text-rose-500" />
                </div>

                <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-600 to-purple-600 mb-8 mt-4">
                  Happy Birthday!
                </h2>

                <div className="space-y-6 text-xl md:text-2xl text-gray-700 font-medium leading-relaxed max-w-2xl mx-auto">
                  <p>Selamat ulang tahun untuk orang yang paling spesial! 🎂</p>
                  <p>
                    Semoga harimu penuh dengan tawa, cinta, dan kejutan manis.
                    Terima kasih sudah menjadi bagian terindah dalam hidupku! ❤️
                  </p>
                  <p>
                    Teruslah bersinar dan jangan pernah berhenti bermimpi. 🌟
                  </p>
                </div>

                <div className="mt-12 flex flex-wrap justify-center gap-4">
                  <div className="px-6 py-2 bg-pink-100 text-pink-600 rounded-full font-bold text-sm flex items-center gap-2">
                    <Heart size={16} className="fill-pink-600" /> Stay Happy
                  </div>
                  <div className="px-6 py-2 bg-purple-100 text-purple-600 rounded-full font-bold text-sm flex items-center gap-2">
                    <Sparkles size={16} className="fill-purple-600" /> Keep
                    Shining
                  </div>
                  <div className="px-6 py-2 bg-blue-100 text-blue-600 rounded-full font-bold text-sm flex items-center gap-2">
                    <Star size={16} className="fill-blue-600" /> You're Amazing
                  </div>
                </div>
              </motion.div>

              {/* Extra Section: Wish Wall */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-20 w-full"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-1 flex-1 bg-pink-200 rounded-full" />
                  <MessageCircle className="text-pink-400" />
                  <div className="h-1 flex-1 bg-pink-200 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-8 rounded-3xl shadow-md border-l-8 border-yellow-400">
                    <h3 className="font-black text-xl mb-4 flex items-center gap-2 italic">
                      "Harapan Terbaik..."
                    </h3>
                    <p className="text-gray-600">
                      Semoga tahun ini adalah tahun terbaikmu. Aku akan selalu
                      ada mendukung setiap langkahmu!
                    </p>
                  </div>
                  <div className="bg-white p-8 rounded-3xl shadow-md border-l-8 border-pink-400">
                    <h3 className="font-black text-xl mb-4 flex items-center gap-2 italic">
                      "Terima Kasih..."
                    </h3>
                    <p className="text-gray-600">
                      Untuk semua momen bahagia dan dukunganmu selama ini. Kamu
                      yang terbaik!
                    </p>
                  </div>
                </div>

                <div className="mt-12 text-center">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-block p-1 bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400 rounded-full"
                  >
                    <button
                      onClick={() => setStep("landing")}
                      className="px-8 py-3 bg-white text-pink-600 rounded-full font-bold flex items-center gap-2 hover:bg-pink-50 transition-colors"
                    >
                      Mulai Dari Awal <ArrowRight size={18} />
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Decoration */}
      <footer className="py-12 px-6 text-center text-pink-300 font-medium">
        <p>Created with Love ❤️ For Someone Special</p>
      </footer>

      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-pink-100/50 to-transparent pointer-events-none" />
    </div>
  );
}
