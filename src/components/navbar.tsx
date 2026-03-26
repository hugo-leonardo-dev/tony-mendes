"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        scrolled
          ? "py-4"
          : "py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          <div className="relative h-10 w-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-white rounded-full group-hover:scale-110 transition-transform duration-500" />
            <span className="relative z-10 text-black font-black text-xl italic leading-none ml-0.5">T</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold tracking-tighter text-lg leading-none">TONY MENDES</span>
            <span className="text-[10px] text-white/40 font-bold tracking-[0.2em] leading-none mt-1 uppercase">Visual Artist</span>
          </div>
        </Link>

        <div className="flex items-center p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
          {[
            { label: "Work", href: "#work" },
            { label: "About", href: "#about" },
            { label: "Contact", href: "#contact" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

