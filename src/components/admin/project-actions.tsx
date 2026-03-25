"use client";

import { useRouter } from "next/navigation";
import { togglePublished, deleteProject } from "@/app/actions/projects";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon, PencilIcon, Trash2Icon, EyeIcon, EyeOffIcon } from "lucide-react";
import { useTransition } from "react";

interface ProjectActionsProps {
  project: {
    id: string;
    published: boolean;
  };
}

export function ProjectActions({ project }: ProjectActionsProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center justify-center h-9 w-9 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors shrink-0 disabled:opacity-50"
        disabled={isPending}
      >
        <MoreVerticalIcon className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-zinc-900 border-zinc-800"
      >
        <DropdownMenuItem
          className="text-zinc-300 cursor-pointer"
          onClick={() => router.push(`/admin/projects/${project.id}/edit`)}
        >
          <PencilIcon className="h-4 w-4 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-zinc-300 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            startTransition(() => togglePublished(project.id));
          }}
        >
          {project.published ? (
            <>
              <EyeOffIcon className="h-4 w-4 mr-2" />
              Unpublish
            </>
          ) : (
            <>
              <EyeIcon className="h-4 w-4 mr-2" />
              Publish
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-zinc-800" />
        <DropdownMenuItem
          className="text-red-400 cursor-pointer focus:text-red-400 focus:bg-red-500/10"
          onClick={(e) => {
            e.preventDefault();
            if (confirm("Are you sure you want to delete this project?")) {
              startTransition(() => deleteProject(project.id));
            }
          }}
        >
          <Trash2Icon className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
