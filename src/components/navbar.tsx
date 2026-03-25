"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-white font-bold text-lg"
        >
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-sm">
            T
          </div>
          <span className="hidden sm:inline">Tony Mendes</span>
        </Link>

        <div className="flex items-center gap-6">
          <a
            href="#work"
            className="text-zinc-400 hover:text-white text-sm font-medium transition-colors"
          >
            Work
          </a>
          <a
            href="#about"
            className="text-zinc-400 hover:text-white text-sm font-medium transition-colors"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-zinc-400 hover:text-white text-sm font-medium transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
