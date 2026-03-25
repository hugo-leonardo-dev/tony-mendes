"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getYouTubeThumbnail } from "@/lib/youtube";

interface ProjectFormProps {
  action: (formData: FormData) => void;
  defaultValues?: {
    title?: string;
    description?: string;
    youtubeUrl?: string;
    thumbnailUrl?: string;
    tags?: string;
    tools?: string;
    year?: string;
    client?: string;
    published?: boolean;
  };
  submitLabel?: string;
}

export function ProjectForm({
  action,
  defaultValues,
  submitLabel = "Create Project",
}: ProjectFormProps) {
  const [published, setPublished] = useState(
    defaultValues?.published ?? false
  );
  const [youtubeUrl, setYoutubeUrl] = useState(
    defaultValues?.youtubeUrl ?? ""
  );
  const [previewThumb, setPreviewThumb] = useState<string | null>(null);

  useEffect(() => {
    if (youtubeUrl) {
      const thumb = getYouTubeThumbnail(youtubeUrl, "hqdefault");
      setPreviewThumb(thumb);
    } else {
      setPreviewThumb(null);
    }
  }, [youtubeUrl]);

  return (
    <form action={action} className="space-y-6">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white text-lg">Project Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-zinc-300">
              Title *
            </Label>
            <Input
              id="title"
              name="title"
              defaultValue={defaultValues?.title}
              required
              placeholder="Enter project title"
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-zinc-300">
              Description *
            </Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={defaultValues?.description}
              required
              placeholder="Describe your project..."
              rows={4}
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="youtubeUrl" className="text-zinc-300">
              YouTube URL *
            </Label>
            <Input
              id="youtubeUrl"
              name="youtubeUrl"
              defaultValue={defaultValues?.youtubeUrl}
              required
              placeholder="https://youtube.com/watch?v=..."
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />
            {previewThumb && (
              <div className="mt-2 rounded-lg overflow-hidden border border-zinc-700 w-48">
                <img
                  src={previewThumb}
                  alt="YouTube thumbnail preview"
                  className="w-full h-auto"
                />
                <p className="text-xs text-zinc-500 p-2">
                  Auto-generated thumbnail
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white text-lg">Metadata</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tags" className="text-zinc-300">
                Tags (comma-separated)
              </Label>
              <Input
                id="tags"
                name="tags"
                defaultValue={defaultValues?.tags ?? ""}
                placeholder="3D, VFX, Animation"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tools" className="text-zinc-300">
                Tools Used
              </Label>
              <Input
                id="tools"
                name="tools"
                defaultValue={defaultValues?.tools ?? ""}
                placeholder="Blender, After Effects"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year" className="text-zinc-300">
                Year
              </Label>
              <Input
                id="year"
                name="year"
                defaultValue={defaultValues?.year ?? ""}
                placeholder="2024"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="client" className="text-zinc-300">
                Client
              </Label>
              <Input
                id="client"
                name="client"
                defaultValue={defaultValues?.client ?? ""}
                placeholder="Client name"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnailUrl" className="text-zinc-300">
              Custom Thumbnail URL (optional)
            </Label>
            <Input
              id="thumbnailUrl"
              name="thumbnailUrl"
              defaultValue={defaultValues?.thumbnailUrl ?? ""}
              placeholder="Leave empty to auto-extract from YouTube"
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Published</p>
              <p className="text-zinc-500 text-sm">
                Make this project visible on the public portfolio
              </p>
            </div>
            <Switch
              checked={published}
              onCheckedChange={setPublished}
            />
            <input
              type="hidden"
              name="published"
              value={published ? "true" : "false"}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3 justify-end">
        <Button
          type="button"
          variant="ghost"
          className="text-zinc-400 hover:text-zinc-200"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white"
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
