"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="py-20 px-6 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-black font-black text-sm italic ml-0.5">T</span>
              </div>
              <span className="text-white font-bold tracking-tighter text-xl">TONY MENDES</span>
            </div>
            <p className="text-white/30 text-xs font-bold uppercase tracking-[0.2em]">
              High-End Motion Design & 3D Art
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
             <p className="text-white/20 text-xs font-medium tracking-wide">
               &copy; {new Date().getFullYear()} Tony Mendes Studio. All rights reserved.
             </p>
             <div className="flex gap-6">
                <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">Based in Brazil</span>
                <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">Available Worldwide</span>
             </div>
          </div>
        </div>
        
        <motion.div 
           className="mt-20 pt-8 border-t border-white/5 text-center"
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
        >
           <span className="text-[15vw] font-black text-white/[0.02] tracking-tighter leading-none select-none">TONY MENDES</span>
        </motion.div>
      </div>
    </footer>
  );
}

