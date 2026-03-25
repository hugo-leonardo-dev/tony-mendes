import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProject } from "@/app/actions/projects";
import { ProjectForm } from "@/components/admin/project-form";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) notFound();

  const updateWithId = updateProject.bind(null, project.id);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Edit Project</h1>
        <p className="text-zinc-400 mt-1">
          Update &ldquo;{project.title}&rdquo;
        </p>
      </div>
      <ProjectForm
        action={updateWithId}
        defaultValues={{
          title: project.title,
          description: project.description,
          videoUrl: project.videoUrl,
          thumbnailUrl: project.thumbnailUrl ?? "",
          tags: project.tags,
          tools: project.tools ?? "",
          year: project.year ?? "",
          client: project.client ?? "",
          published: project.published,
        }}
        submitLabel="Update Project"
      />
    </div>
  );
}
