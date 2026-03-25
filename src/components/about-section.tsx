"use client";

import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-[1fr_1.5fr] gap-12 items-start"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              About
            </h2>
            <div className="h-1 w-12 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
          </div>
          <div className="space-y-5">
            <p className="text-zinc-300 leading-relaxed text-lg">
              I&apos;m Tony Mendes, a motion designer and 3D artist passionate
              about bringing ideas to life through animation and visual
              storytelling.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              With years of experience in motion design, I specialize in
              creating compelling visual experiences using tools like Blender,
              Cinema 4D, After Effects, and Houdini. From concept to final
              render, I craft each project with meticulous attention to detail
              and a focus on narrative.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Whether it&apos;s a brand identity animation, a product
              visualization, or an experimental art piece, I bring the same
              level of creativity and technical precision to every project.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-800">
              <div>
                <p className="text-2xl font-bold text-white">5+</p>
                <p className="text-zinc-500 text-sm">Years Experience</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">50+</p>
                <p className="text-zinc-500 text-sm">Projects Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">20+</p>
                <p className="text-zinc-500 text-sm">Happy Clients</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
