
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
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
      console.error(`❌ API Error: ${res.status} ${res.statusText} on ${url}. Body: ${errorBody}`);
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    // ✅ Log full JSON response
    //console.log(`✅ Fetched from ${url}:`, data);

    return data;
  } catch (error) {
    console.error(`🚨 Fetch error for ${url}:`, error);
    throw error;
  }
}
