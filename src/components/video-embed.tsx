"use client";

interface VideoEmbedProps {
  url: string;
  title?: string;
}

import { getVideoEmbedUrl } from "@/lib/video";

export function VideoEmbed({ url, title = "Video" }: VideoEmbedProps) {
  const embedUrl = getVideoEmbedUrl(url);

  if (!embedUrl) {
    return (
      <div className="aspect-video rounded-xl bg-zinc-800 flex items-center justify-center">
        <p className="text-zinc-500">Invalid video URL</p>
      </div>
    );
  }

  return (
    <div className="aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full"
        loading="lazy"
      />
    </div>
  );
}
