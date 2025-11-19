export async function getHeroClient(page: string = "home") {
  const res = await fetch(`http://localhost:3000/api/heroSections/page/${page}`);
  const json = await res.json();
  return json.data; // <-- return data only
}