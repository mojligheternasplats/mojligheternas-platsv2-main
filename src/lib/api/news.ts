import { apiFetch as serverFetch } from './apiClient.server';
import { apiFetch as clientFetch } from './apiClient';
import type { Article } from '@/lib/definitions';

interface PaginatedResponse<T> {
  data: T[];
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

// ---- SERVER SIDE FETCH ----
export async function getNews(): Promise<Article[]> {
  try {
    const response = await serverFetch<PaginatedResponse<Article>>('/news');
    return response.data;
  } catch (error) {
    console.error('❌ Failed to fetch news (server):', error);
    return [];
  }
}

// ---- CLIENT SIDE FETCH ----
export async function getNewsClient(): Promise<Article[]> {
  try {
    const response = await clientFetch<PaginatedResponse<Article>>('/news');
    return response.data;
  } catch (error) {
    console.error('❌ Failed to fetch news (client):', error);
    return [];
  }
}

// ---- GET BY SLUG ----
export async function getNewsBySlug(slug: string): Promise<Article | null> {
  try {
    return await serverFetch<Article>(`/news/slug/${slug}`);
  } catch (error) {
    console.error(`❌ Failed to fetch news by slug ${slug}:`, error);
    return null;
  }
}
