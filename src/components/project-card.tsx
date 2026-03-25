"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/projects/${project.id}`} className="group block">
        <div className="relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/5">
          {/* Thumbnail */}
          <div className="aspect-video overflow-hidden bg-zinc-800 relative">
            {project.thumbnailUrl ? (
              <img
                src={project.thumbnailUrl}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-zinc-600 text-lg">No thumbnail</span>
              </div>
            )}
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Play icon on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="h-14 w-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <svg
                  className="h-6 w-6 text-white ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-white font-semibold text-lg group-hover:text-violet-400 transition-colors">
                {project.title}
              </h3>
              {project.year && (
                <span className="text-zinc-500 text-sm shrink-0">
                  {project.year}
                </span>
              )}
            </div>
            <p className="text-zinc-400 text-sm line-clamp-2 mb-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.split(",").map((tag) => tag.trim()).filter(Boolean).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs text-zinc-400 border-zinc-700 bg-zinc-800/50"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
