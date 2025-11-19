import { apiFetch as serverFetch } from './apiClient.server';
import { apiFetch as clientFetch } from './apiClient';
import type { YouthTestimonial } from '@/lib/definitions';

// Fetch testimonials on the server
export async function getTestimonials(): Promise<YouthTestimonial[]> {
  try {
    const res = await serverFetch<YouthTestimonial[]>('/testimonials');
    return res ?? [];
  } catch (error) {
    console.error('Failed to fetch testimonials:', error);
    return [];
  }
}

// Fetch testimonials on the client
export async function getTestimonialsClient(): Promise<YouthTestimonial[]> {
  try {
    const res = await clientFetch<YouthTestimonial[]>('/testimonials');
    return res ?? [];
  } catch (error) {
    console.error('Failed to fetch testimonials on client:', error);
    return [];
  }
}
