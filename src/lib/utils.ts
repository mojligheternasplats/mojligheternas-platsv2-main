import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export function normalizeSlug(raw: string) {
  const s = raw.toLowerCase();
  // special cases you mentioned
  if (s === "erasmus" || s === "erasmus+") return "erasmus";
  if (s === "future narrative" || s === "future-narrative") return "future-narrative";
  return slugify(raw);
}

export function formatDate(dateString: string): string {
  try {
    return format(new Date(dateString), "MMMM d, yyyy");
  } catch {
    return dateString;
  }
}

export function resolveProjectHref(project: { slug: string; category?: "EU" | "LOCAL" | string }) {
  const safe = normalizeSlug(project.slug);
  return project.category === "EU" ? `/eu/${safe}` : `/projects/${safe}`;
}
