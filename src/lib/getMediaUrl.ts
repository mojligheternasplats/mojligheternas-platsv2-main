import { PlaceHolderImages } from "./placeholder-images";
export function getMediaUrl(url?: string | null) {
  const fallback = PlaceHolderImages[0]?.imageUrl || null;

  // ❗ If no url and no fallback, return null (NOT empty string)
  if (!url || url.trim() === "") return fallback;

  // Already a full URL (ex: Cloudinary, Unsplash)
  if (url.startsWith("http")) return url;

  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

  // If base is missing, avoid returning invalid URL
  if (!base) return fallback;

  return `${base}${url.startsWith("/") ? url : "/" + url}`;
}
