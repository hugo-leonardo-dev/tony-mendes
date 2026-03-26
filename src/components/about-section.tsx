"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Years Experience", value: "5+" },
  { label: "Projects Completed", value: "50+" },
  { label: "Happy Clients", value: "20+" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-sm uppercase tracking-[0.4em] text-white/40 font-bold mb-8">
              The Designer
            </h2>
            <h3 className="text-5xl sm:text-6xl font-bold text-white tracking-tighter mb-10 leading-[0.9]">
              Tony <br />
              <span className="text-white/30 italic font-light">Mendes</span>
            </h3>
            <div className="space-y-6 text-xl text-white/60 font-light leading-relaxed">
              <p>
3D Animator with 5 years of experience creating  high-quality animations for games and cinematics. I specialize in Stylized, Cartoon
and Realistic Animation, with advanced skills in Keyframe Animation, Acting, Body Mechanics, Gameplay Animation and Lip Sync.
              </p>
              <p>
I possess a comprehensive understanding of the game development pipeline,
allowing me for seamless communication across all project areas and departments. I'm also passionate about mentoring and helping
to develop fellow artists and new talents.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-8"
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className="group border-l border-white/10 pl-8 py-4 transition-colors hover:border-white/40">
                <motion.p 
                   className="text-5xl font-bold text-white mb-2 tabular-nums"
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-sm uppercase tracking-widest text-white/30 font-bold group-hover:text-white/60 transition-colors">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

