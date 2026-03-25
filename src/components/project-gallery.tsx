"use client";

import { useState, useMemo } from "react";
import { ProjectCard } from "@/components/project-card";
import { motion } from "framer-motion";

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
    <section id="work" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Selected Work
          </h2>
          <p className="text-zinc-400 max-w-md mx-auto">
            A curated collection of motion design and 3D projects
          </p>
        </motion.div>

        {/* Tag filters */}
        {allTags.length > 0 && (
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <button
              onClick={() => setActiveTag(null)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTag === null
                  ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-600"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeTag === tag
                    ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                    : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-600"
                }`}
              >
                {tag}
              </button>
            ))}
          </motion.div>
        )}

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-zinc-500 py-12">
            No projects found for this filter.
          </p>
        )}
      </div>
    </section>
  );
}
