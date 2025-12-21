"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PartnerLogo } from "./partners/PartnerLogo";
import { getPartners } from "@/lib/api/partners";
import type { Partner } from '@/lib/definitions';


export default function PartnerPreviewSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [partners, setPartners] = useState<Partner[]>([]);

  /* -------------------------------------------
   * Load partners
   * ------------------------------------------- */
  useEffect(() => {
    async function load() {
      const data = await getPartners();
   
      const top = data
        .filter((p: Partner) => p.isPublished)
        .sort((a: Partner, b: Partner) => a.order - b.order)
        .slice(0, 10);

      setPartners(top);
    }

    load();
  }, []);

  /* -------------------------------------------
   * Auto scroll (interval-based, stable)
   * ------------------------------------------- */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || partners.length === 0) return;

    let index = 0;
    const gap = 16; // Tailwind gap-4 = 16px

    const getCardWidth = () =>
      container.firstElementChild?.clientWidth ?? 240;

    const scrollNext = () => {
      const cardWidth = getCardWidth();
      index = (index + 1) % partners.length;

      container.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth",
      });
    };

    const interval = setInterval(scrollNext, 3000);

    return () => clearInterval(interval);
  }, [partners]);
const SKELETON_HEIGHT = 120;
  /* -------------------------------------------
   * Loading state
   * ------------------------------------------- */
  if (partners.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        Laddar samarbetspartners…
      </div>
    );
  }

  /* -------------------------------------------
   * Render
   * ------------------------------------------- */
  return (
    <section className="container mx-auto px-4 py-16 md:py-24" style={{ minHeight: SKELETON_HEIGHT }}>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
          Våra samarbetspartners
        </h2>

        <Button asChild variant="link" className="text-accent p-0 h-auto">
          <Link href="/partners" className="flex items-center">
            Visa alla <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-hidden pb-4 -mx-4 px-4 scrollbar-hide"
      >
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="min-w-[200px] md:min-w-[240px]"
          >
            <PartnerLogo partner={partner} />
          </div>
        ))}
      </div>
    </section>
  );
}
