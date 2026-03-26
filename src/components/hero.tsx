"use client";

import { motion } from "framer-motion";
import { Hero3DText } from "./hero-3d-text";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* 3D Background / Hero Text */}
      <Hero3DText />

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-8 inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] animate-pulse" />
            <span className="text-white/60 text-xs font-semibold tracking-widest uppercase">
              Available for high-end projects
            </span>
          </div>
        </motion.div>

        {/* Space for 3D Text handled by Hero3DText component which is absolute inset-0 */}
        <div className="h-[40vh] sm:h-[50vh] flex items-center justify-center">
            {/* The 3D text is rendered here by the canvas behind this div */}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xl sm:text-2xl md:text-3xl text-white/50 font-light tracking-wide max-w-2xl mx-auto mb-12">
            Crafting immersive digital experiences through <span className="text-white">motion</span> and <span className="text-white">depth</span>.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#work"
            className="group relative px-10 py-4 bg-white text-black rounded-full font-bold transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Explore Work</span>
            <div className="absolute inset-0 bg-white blur-xl opacity-0 group-hover:opacity-40 transition-opacity rounded-full" />
          </a>
          <a
            href="#contact"
            className="px-10 py-4 border border-white/20 hover:border-white/50 text-white rounded-full font-semibold transition-all hover:bg-white/5 backdrop-blur-sm"
          >
            Start a Conversation
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.5 }}
      >
        <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">Scroll Down</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}

