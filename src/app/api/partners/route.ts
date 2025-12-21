// app/api/partners/route.ts
import { getPartners } from "@/lib/api/partners";

export async function GET() {
  const partners = await getPartners();
  return Response.json(partners);
}
