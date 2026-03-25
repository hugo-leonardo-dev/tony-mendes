import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProjectActions } from "@/components/admin/project-actions";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-zinc-400 mt-1">
            Manage your portfolio projects
          </p>
        </div>
        <Link href="/admin/projects/new">
          <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-16">
          <div className="h-16 w-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4">
            <FolderIcon className="h-8 w-8 text-zinc-500" />
          </div>
          <p className="text-zinc-400 text-lg">No projects yet</p>
          <p className="text-zinc-500 text-sm mt-1">
            Create your first project to get started
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center gap-4 hover:border-zinc-700 transition-colors"
            >
              {project.thumbnailUrl && (
                <div className="w-24 h-16 rounded-lg overflow-hidden bg-zinc-800 shrink-0">
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-medium truncate">
                    {project.title}
                  </h3>
                  <Badge
                    variant={project.published ? "default" : "secondary"}
                    className={
                      project.published
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-zinc-800 text-zinc-400 border-zinc-700"
                    }
                  >
                    {project.published ? "Published" : "Draft"}
                  </Badge>
                </div>
                <p className="text-zinc-500 text-sm truncate mt-1">
                  {project.description}
                </p>
                <div className="flex gap-1.5 mt-2">
                  {project.tags.split(",").map(t => t.trim()).filter(Boolean).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs text-zinc-400 border-zinc-700"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <ProjectActions project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
      />
    </svg>
  );
}
