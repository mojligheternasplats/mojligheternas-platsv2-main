const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003";

export async function getHeroClient(page: string = "home") {
  const res = await fetch(`${API_URL}/api/heroSections/page/${page}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("❌ Failed to fetch hero section:", res.status);
    return null;
  }

  const json = await res.json();
  return json.data; // return only the data
}
