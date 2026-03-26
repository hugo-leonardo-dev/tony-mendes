"use client";

import { useState, useMemo } from "react";
import { ProjectCard } from "@/components/project-card";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string | null;
  tags: string;
  year: string | null;
}

interface ProjectGalleryProps {
  projects: Project[];
}

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach((p) => {
      p.tags.split(",").forEach((t) => {
        const trimmed = t.trim();
        if (trimmed) tagSet.add(trimmed);
      });
    });
    return Array.from(tagSet).sort();
  }, [projects]);

  const filtered = activeTag
    ? projects.filter((p) => 
        p.tags.split(",").map(t => t.trim()).includes(activeTag)
      )
    : projects;

  return (
    <section id="work" className="py-32 px-6 bg-black relative">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-5xl sm:text-6xl font-bold text-white tracking-tighter mb-4">
              Selected <span className="text-white/30 italic font-light">Works</span>
            </h2>
          </motion.div>

          {/* Tag filters */}
          {allTags.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <button
                onClick={() => setActiveTag(null)}
                className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
                  activeTag === null
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white/40 border-white/10 hover:border-white/30"
                }`}
              >
                All Projects
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
                    activeTag === tag
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-white/40 border-white/10 hover:border-white/30"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </motion.div>
          )}
        </header>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white/20 py-32 text-xl font-light"
          >
            No projects matched the selected criteria.
          </motion.p>
        )}
      </div>
    </section>
  );
}

