import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import type { Partner } from '@/lib/definitions';

type PartnerLogoProps = {
  partner: Partner;
};

export function PartnerLogo({ partner }: PartnerLogoProps) {
  return (
    <Card className="p-6 flex justify-center items-center h-40 bg-card hover:bg-muted transition-colors duration-300">
      <Link href={partner.website || '#'} target="_blank" rel="noopener noreferrer" className="h-full w-full relative">
        {partner.logoUrl ? (
          <>
            <Image
              src={partner.logoUrl}
              alt={`${partner.name} logo`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 40vw,
         (max-width: 1200px) 25vw,
         15vw"

              data-ai-hint="company logo"
            />
            <span className="sr-only">{partner.name}</span>
          </>
        ) : (
          <span className="text-sm font-medium">{partner.name}</span>
        )}
      </Link>
    </Card>
  );
}
