"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validators";
import { getVideoThumbnail } from "@/lib/video";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function createProject(formData: FormData) {
  await requireAuth();

  const raw = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    videoUrl: formData.get("videoUrl") as string,
    thumbnailUrl: (formData.get("thumbnailUrl") as string) || "",
    tags: formData.get("tags") as string,
    tools: formData.get("tools") as string,
    year: formData.get("year") as string,
    client: formData.get("client") as string,
    published: formData.get("published") === "true",
  };

  const validated = projectSchema.parse(raw);

  const tags = validated.tags || "";

  const thumbnailUrl =
    validated.thumbnailUrl || (await getVideoThumbnail(validated.videoUrl)) || "";

  await prisma.project.create({
    data: {
      title: validated.title,
      description: validated.description,
      videoUrl: validated.videoUrl,
      thumbnailUrl,
      tags,
      tools: validated.tools || null,
      year: validated.year || null,
      client: validated.client || null,
      published: validated.published,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  await requireAuth();

  const raw = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    videoUrl: formData.get("videoUrl") as string,
    thumbnailUrl: (formData.get("thumbnailUrl") as string) || "",
    tags: formData.get("tags") as string,
    tools: formData.get("tools") as string,
    year: formData.get("year") as string,
    client: formData.get("client") as string,
    published: formData.get("published") === "true",
  };

  const validated = projectSchema.parse(raw);

  const tags = validated.tags || "";

  const thumbnailUrl =
    validated.thumbnailUrl || (await getVideoThumbnail(validated.videoUrl)) || "";

  await prisma.project.update({
    where: { id },
    data: {
      title: validated.title,
      description: validated.description,
      videoUrl: validated.videoUrl,
      thumbnailUrl,
      tags,
      tools: validated.tools || null,
      year: validated.year || null,
      client: validated.client || null,
      published: validated.published,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/");
  revalidatePath(`/projects/${id}`);
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireAuth();

  await prisma.project.delete({ where: { id } });

  revalidatePath("/admin/projects");
  revalidatePath("/");
}

export async function togglePublished(id: string) {
  await requireAuth();

  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) throw new Error("Project not found");

  await prisma.project.update({
    where: { id },
    data: { published: !project.published },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/");
}
