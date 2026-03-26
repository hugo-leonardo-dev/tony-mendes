"use client";

import { motion } from "framer-motion";
import { MailIcon, ArrowUpRight } from "lucide-react";

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/tonymendes",
  },
  {
    label: "Twitter / X",
    href: "https://x.com/tonymendes",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/tonymendes",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@tonymendes",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-40 px-6 bg-black relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="mb-12"
            >
                <h2 className="text-sm uppercase tracking-[0.4em] text-white/40 font-bold mb-8">
                    Get In Touch
                </h2>
                <h3 className="text-6xl sm:text-8xl md:text-9xl font-bold text-white tracking-tighter mb-8 leading-none">
                    LETS <span className="text-white/20 italic font-light">CREATE.</span>
                </h3>
                <p className="text-xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed">
                    Elevate your next project with high-end motion design and 3D visual experiences. 
                    I&apos;m currently accepting new collaborations.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
                <a
                    href="mailto:hello@tonymendes.com"
                    className="group relative inline-flex items-center gap-4 px-12 py-6 bg-white text-black rounded-full font-bold text-2xl transition-all hover:scale-105 active:scale-95"
                >
                    <MailIcon className="h-6 w-6" />
                    hello@tonymendes.com
                    <div className="absolute inset-0 bg-white blur-2xl opacity-0 group-hover:opacity-30 transition-opacity rounded-full" />
                </a>
            </motion.div>

            <motion.div 
                className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 mt-24"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
            >
                {socials.map((social) => (
                    <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-1 text-xs font-bold uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors"
                    >
                        {social.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </a>
                ))}
            </motion.div>
        </div>
      </div>
    </section>
  );
}

