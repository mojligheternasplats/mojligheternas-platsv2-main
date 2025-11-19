import { apiFetch as serverFetch } from './apiClient.server';
import { apiFetch as clientFetch } from './apiClient';
import type { Media } from '@/lib/definitions';

/**
 * Optional filters for media retrieval
 */
interface MediaFilters {
  entityType?: "news" | "event" | "project" | "partner";
  entityId?: string;
  mediaType?: "IMAGE" | "VIDEO";
}

/**
 * Build query string dynamically
 */
function buildQuery(filters: MediaFilters): string {
  const params = new URLSearchParams();

  if (filters.entityType) params.set('entityType', filters.entityType);
  if (filters.entityId) params.set('entityId', filters.entityId);
  if (filters.mediaType) params.set('mediaType', filters.mediaType);

  const q = params.toString();
  return q ? `?${q}` : '';
}

/**
 * ✅ Fetch Media (Server Side) - returns Media[]
 */
export async function getMedia(filters: MediaFilters = {}): Promise<Media[]> {
  try {
    const query = buildQuery(filters);
    return await serverFetch<Media[]>(`/media/gallery${query}`);
  } catch (error) {
    console.error("❌ Failed to fetch media:", error);
    return [];
  }
}

/**
 * 🌐 Fetch Media (Client Side) - returns Media[]
 */
export async function getMediaClient(filters: MediaFilters = {}): Promise<Media[]> {
  try {
    const query = buildQuery(filters);
    return await clientFetch<Media[]>(`/media/all${query}`);
  } catch (error) {
    console.error("❌ Failed to fetch media (client):", error);
    return [];
  }
}

/**
 * 🔍 Fetch single Media by ID
 */
export async function getMediaById(id: string): Promise<Media | null> {
  try {
    return await serverFetch<Media>(`/media/${id}`);
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------
   🎨 IMAGE & VIDEO GALLERY HELPERS
-------------------------------------------------------------------*/

/** 📸 Get Image Gallery */
export function getImageGallery() {
  return getMedia({ mediaType: "IMAGE" });
}

/** 🎥 Get Video Gallery */
export function getVideoGallery() {
  return getMedia({ mediaType: "VIDEO" });
}

/** 🌐 Client-side Image Gallery */
export function getImageGalleryClient() {
  return getMediaClient({ mediaType: "IMAGE" });
}

/** 🌐 Client-side Video Gallery */
export function getVideoGalleryClient() {
  return getMediaClient({ mediaType: "VIDEO" });
}
