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
    </section>
  );
}

