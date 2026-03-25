import { createProject } from "@/app/actions/projects";
import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">New Project</h1>
        <p className="text-zinc-400 mt-1">
          Add a new project to your portfolio
        </p>
      </div>
      <ProjectForm action={createProject} submitLabel="Create Project" />
    </div>
  );
}
