// This is the server-side API client.
// It uses the absolute URL for the currently running instance.

// Use NEXT_PUBLIC_URL if available, otherwise default to localhost for development.
const API_URL =  "http://localhost:3000";

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // We need to append /api to the base URL for server-side calls
  const url = `${API_URL}/api${endpoint}`;
  
  try {
    const res = await fetch(url, {
      headers: { 
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
      // Use a short revalidation time for server-side fetches
      next: { revalidate: 60, ...(options.next || {}) },
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`API Error: ${res.status} ${res.statusText} on ${url}. Body: ${errorBody}`);
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error);
    throw error;
  }
}
