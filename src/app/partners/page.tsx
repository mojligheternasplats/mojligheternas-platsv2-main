import { TranslatedPageHeader } from "@/components/partners/TranslatedPageHeader";
import { getPartners } from "@/lib/api/partners";
import { PartnerLogo } from "@/components/partners/PartnerLogo";

export default async function PartnersPage() {
  const partners = await getPartners();

  return (
    <div>
      <TranslatedPageHeader ns="partners" />

      <div className="container py-16 md:py-24">
        {partners.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {partners.map((partner) => (
              <PartnerLogo key={partner.id} partner={partner} />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg text-muted-foreground">
              No partners to display.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
