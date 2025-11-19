// components/partners/PartnerPreviewSection.tsx
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PartnerLogo } from './partners/PartnerLogo';
import { getPartners } from '@/lib/api/partners';

export default async function PartnerPreviewSection() {
  const partners = await getPartners();
  const maxItems = 3;

  const topPartners = partners
    .filter((p) => p.isPublished)
    .sort((a, b) => a.order - b.order)
    .slice(0, maxItems);

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
          Våra samarbetspartners
        </h2>
        <Button asChild variant="link" className="text-accent p-0 h-auto">
          <Link href="/partners">
            Visa alla <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide">
        {topPartners.map((partner) => (
          <div key={partner.id} className="min-w-[200px] md:min-w-[240px] snap-start">
            <PartnerLogo partner={partner} />
          </div>
        ))}
      </div>
    </section>
  );
}
