import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { VideoEmbed } from "@/components/video-embed";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { getVideoThumbnail } from "@/lib/video";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) return { title: "Not Found" };

  const thumbnail = project.thumbnailUrl || await getVideoThumbnail(project.videoUrl);

  return {
    title: `${project.title} — Tony Mendes`,
    description: project.description.substring(0, 160),
    openGraph: {
      title: project.title,
      description: project.description.substring(0, 160),
      images: thumbnail ? [thumbnail] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description.substring(0, 160),
      images: thumbnail ? [thumbnail] : [],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id, published: true },
  });

  if (!project) notFound();

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Link>

          {/* Video */}
          <VideoEmbed url={project.videoUrl} title={project.title} />

          {/* Project info */}
          <div className="mt-8 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                {project.title}
              </h1>
              {project.year && (
                <span className="text-zinc-500 text-lg">{project.year}</span>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.split(",").map(t => t.trim()).filter(Boolean).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-sm text-zinc-300 border-zinc-700 bg-zinc-900"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Description */}
            <div className="prose prose-invert prose-zinc max-w-none">
              <p className="text-zinc-300 leading-relaxed text-lg whitespace-pre-line">
                {project.description}
              </p>
            </div>

            {/* Metadata */}
            {(project.tools || project.client) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-zinc-800">
                {project.tools && (
                  <div>
                    <h3 className="text-zinc-500 text-sm font-medium uppercase tracking-wider mb-1">
                      Tools
                    </h3>
                    <p className="text-zinc-300">{project.tools}</p>
                  </div>
                )}
                {project.client && (
                  <div>
                    <h3 className="text-zinc-500 text-sm font-medium uppercase tracking-wider mb-1">
                      Client
                    </h3>
                    <p className="text-zinc-300">{project.client}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
