import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().min(1, "Description is required"),
  videoUrl: z
    .string()
    .url("Must be a valid URL")
    .refine(
      (url) =>
        /youtube\.com|youtu\.be|vimeo\.com/.test(url),
      "Must be a valid YouTube or Vimeo URL"
    ),
  thumbnailUrl: z.string().url().optional().or(z.literal("")),
  tags: z.string().optional(), // comma-separated
  tools: z.string().optional(),
  year: z.string().optional(),
  client: z.string().optional(),
  published: z.boolean().default(false),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
