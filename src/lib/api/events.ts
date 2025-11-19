import { apiFetch as serverFetch } from './apiClient.server';
import { apiFetch as clientFetch } from './apiClient';
import type { Event } from '@/lib/definitions';


interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

export async function getEvents(): Promise<Event[]> {
  try {
    const response = await serverFetch<PaginatedResponse<Event>>('/events');
    return response.data; // ✅ return only the array
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return [];
  }
}

export async function getEventsClient(): Promise<Event[]> {
  try {
    const response = await clientFetch<PaginatedResponse<Event>>('/events');
    return response.data; // ✅ return only the array
  } catch (error) {
    console.error('Failed to fetch events on client:', error);
    return [];
  }
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  try {
    return await serverFetch<Event>(`/events/slug/${slug}`);
  } catch (error) {
    console.error(`Failed to fetch event by slug ${slug}:`, error);
    return null;
  }
}
















// export async function getEvents(): Promise<Event[]> {
//   try {
//     return await serverFetch<Event[]>('/events');
//   } catch (error) {
//     console.error('Failed to fetch events:', error);
//     return [];
//   }
// }

// export async function getEventsClient(): Promise<Event[]> {
//   try {
//     return await clientFetch<Event[]>('/events');
//   } catch (error) {
//     console.error('Failed to fetch events on client:', error);
//     return [];
//   }
// }

// export async function getEventBySlug(slug: string): Promise<Event | null> {
//   try {
//     return await serverFetch<Event>(`/events/${slug}`);
//   } catch (error) {
//     console.error(`Failed to fetch event by slug ${slug}:`, error);
//     return null;
//   }
// }
