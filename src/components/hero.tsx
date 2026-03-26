"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50 overflow-hidden">
        <iframe
          src="https://player.vimeo.com/video/838705297?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&t=5s"
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 object-cover scale-[1.05]"
          allow="autoplay; fullscreen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/40 to-zinc-950/60" />
      </div>
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-6xl sm:text-7xl md:text-9xl font-black text-white tracking-tighter mb-6 uppercase drop-shadow-2xl">
            Tony Mendes
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xl sm:text-2xl md:text-3xl text-white/80 font-light tracking-wide max-w-2xl mx-auto mb-12 drop-shadow-md">
            Crafting immersive digital experiences through <span className="text-white font-medium">motion</span> and <span className="text-white font-medium">depth</span>.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#work"
            className="group relative px-10 py-4 bg-white text-black rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10">Explore Work</span>
            <div className="absolute inset-0 bg-white blur-xl opacity-0 group-hover:opacity-40 transition-opacity rounded-full" />
          </a>
          <a
            href="#contact"
            className="px-10 py-4 border border-white/30 hover:border-white text-white rounded-full font-semibold transition-all hover:bg-white/10 backdrop-blur-md shadow-lg"
          >
            Start a Conversation
          </a>
        </motion.div>
      </div>
    </section>
  );
}

