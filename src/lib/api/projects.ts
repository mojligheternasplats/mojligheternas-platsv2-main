// src/lib/api/projects.ts
import { apiFetch as serverFetch } from './apiClient.server';
import { apiFetch as clientFetch } from './apiClient';
import type { Project } from '@/lib/definitions';

interface PaginatedResponse<T> {
  data: T[];
  meta: { page: number; limit: number; total: number };
}

// LOCAL activity categories (your predefined programs)
const LOCAL_SLUGS = [
  "ledarskapsutbildning",
  "dreamacademy",
  "summercamp",
  "hostcamp",
  "kvallsoppet"
];

// ------------------------------
// GET ALL PROJECTS (server)
// ------------------------------
export async function getProjects(): Promise<Project[]> {
  try {
    const res = await serverFetch<PaginatedResponse<Project>>('/projects');
    return res.data ?? [];
  } catch (e) {
    console.error('❌ Failed to fetch projects (server):', e);
    return [];
  }
}

// ------------------------------
// CLIENT-FETCH ALL PROJECTS
// ------------------------------
export async function getProjectsClient(): Promise<Project[]> {
  try {
    const res = await clientFetch<PaginatedResponse<Project>>('/projects');
    return res.data ?? [];
  } catch (e) {
    console.error('❌ Failed to fetch projects (client):', e);
    return [];
  }
}

// ------------------------------
// LOCAL PROJECTS (client)
// ------------------------------
export async function getLocalProjects(): Promise<Project[]> {
  try {
    const all = await getProjectsClient();
    return all.filter(p => LOCAL_SLUGS.includes((p.category || '').toLowerCase()));
  } catch {
    return [];
  }
}

// ------------------------------
// EU (server) — category = "eu"
// ------------------------------
export async function getEUProjects(): Promise<Project[]> {
  try {
    const res = await serverFetch<PaginatedResponse<Project>>('/projects');
    const all = res.data ?? [];
    return all.filter(p => (p.category || '').toLowerCase() === 'eu');
  } catch {
    return [];
  }
}

// For navbar dropdown (server)
export async function getLatestEUProjects(): Promise<Project[]> {
  try {
    const response = await serverFetch<{ data: Project[] }>(`/projects/eu/latest`);
    return response.data;
  } catch (error) {
    console.error("❌ Failed to fetch EU projects for navbar:", error);
    return [];
  }
}

// ------------------------------
// EU PROJECTS (client)
// ------------------------------
export async function getEUProjectsClient(): Promise<Project[]> {
  try {
    const all = await getProjectsClient();
    return all.filter(p => (p.category || '').toLowerCase() === 'eu');
  } catch {
    return [];
  }
}

// ------------------------------
// GET PROJECT BY SLUG
// ------------------------------
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const res = await serverFetch<{ data: Project }>(
      `/projects/slug/${encodeURIComponent(slug)}`
    );
    return res.data ?? null;
  } catch (e) {
    console.error(`❌ Failed to fetch project by slug "${slug}":`, e);
    return null;
  }
}
