const API_URL = process.env.NEXT_PUBLIC_API_UR || "http://localhost:3003";

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // endpoint must start with "/api"
 const url = `${API_URL}/api${endpoint}`;

  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`❌ API Error: ${res.status} on ${url}\nBody: ${errorBody}`);
      throw new Error(`API error: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error(`🚨 Fetch error for ${url}:`, error);
    throw error;
  }
}
