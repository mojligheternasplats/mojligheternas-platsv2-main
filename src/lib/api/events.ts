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
    return response.data;
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return [];
  }
}

export async function getEventsClient(): Promise<Event[]> {
  try {
    const response = await clientFetch<PaginatedResponse<Event>>('/events');
    return response.data;
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



export async function registerForEvent(
  eventId: string,
  payload: { name: string; email: string }
) {
  try {
    const res = await clientFetch(`/eventAttendance/${eventId}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res && typeof res === "object" && !Array.isArray(res)) {
      return { success: true, ...res };
    }

    return { success: true, data: res };
  } catch (error) {
    console.error("Event registration failed:", error);
    return { success: false, error: "Registreringen misslyckades. Försök igen." };
  }
}

