/**
 * Extract YouTube video ID from various URL formats.
 */
export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

/**
 * Extract Vimeo video ID from various URL formats.
 */
export function extractVimeoId(url: string): string | null {
  const patterns = [
    /(?:vimeo\.com\/)([0-9]+)/,
    /(?:player\.vimeo\.com\/video\/)([0-9]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

/**
 * Async generate a thumbnail URL from a generic Video URL (YouTube or Vimeo).
 */
export async function getVideoThumbnail(
  url: string,
  quality: "default" | "hqdefault" | "maxresdefault" = "maxresdefault"
): Promise<string | null> {
  const ytId = extractYouTubeId(url);
  if (ytId) {
    return `https://img.youtube.com/vi/${ytId}/${quality}.jpg`;
  }

  const vimeoId = extractVimeoId(url);
  if (vimeoId) {
    try {
      const res = await fetch(`https://vimeo.com/api/v2/video/${vimeoId}.json`);
      if (res.ok) {
        const data = await res.json();
        return data[0]?.thumbnail_large || data[0]?.thumbnail_medium || null;
      }
    } catch (err) {
      console.error("Failed to fetch Vimeo thumbnail:", err);
    }
  }

  return null;
}

/**
 * Get the standardized embed URL for an iframe.
 */
export function getVideoEmbedUrl(url: string): string | null {
  const ytId = extractYouTubeId(url);
  if (ytId) {
    return `https://www.youtube.com/embed/${ytId}`;
  }

  const vimeoId = extractVimeoId(url);
  if (vimeoId) {
    return `https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0`;
  }

  return null;
}
