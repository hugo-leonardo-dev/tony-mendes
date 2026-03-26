"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string | null;
    tags: string;
    year: string | null;
  };
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/projects/${project.id}`} className="group block">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-zinc-900 border border-white/5 transition-colors duration-500 hover:border-white/20"
        >
          {/* Thumbnail */}
          <div 
            className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ transform: "translateZ(0px)" }}
          >
            {project.thumbnailUrl ? (
              <img
                src={project.thumbnailUrl}
                alt={project.title}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                <span className="text-white/10 text-xl font-bold uppercase tracking-tighter">Tony Mendes</span>
              </div>
            )}
          </div>

          {/* Grain mask for image */}
          <div className="absolute inset-0 z-[1] bg-black/20 pointer-events-none" />

          {/* Content Overlay */}
          <div 
            className="absolute inset-x-0 bottom-0 p-8 z-[2] translate-z-[40px]"
            style={{ transform: "translateZ(40px)" }}
          >
            <div className="flex items-end justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white tracking-tight leading-none group-hover:text-glow">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.split(",").map((tag) => tag.trim()).filter(Boolean).slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-widest text-white/40 font-bold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {project.year && (
                <span className="text-sm font-mono text-white/20 mb-1">
                  /{project.year}
                </span>
              )}
            </div>
          </div>

          {/* Hover Play State */}
          <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
             <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center translate-z-[60px]" style={{ transform: "translateZ(60px)" }}>
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
             </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

