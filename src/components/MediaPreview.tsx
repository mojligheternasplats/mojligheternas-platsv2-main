'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function MediaPreview({ mediaItems }: { mediaItems: any[] }) {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let index = 0;
    const interval = setInterval(() => {
      const cardWidth = container.firstElementChild?.clientWidth ?? 300;

      index = (index + 1) % mediaItems.length;

      container.scrollTo({
        left: index * (cardWidth + 16),
        behavior: 'smooth',
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [mediaItems]);

  function getMediaUrl(url?: string | null) {
    return url || "/image/log.png";
  }

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
          {t('home.media.title')}
        </h2>
        <Button asChild variant="link" className="text-accent p-0 h-auto">
          <Link href="/media">
            {t('home.media.viewAll')} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide"
      >
        {mediaItems.map((item) => {
          const imageUrl = getMediaUrl(item.url);
          return (
            <div
              key={item.id}
              className="min-w-[280px] md:min-w-[320px] snap-start rounded-lg overflow-hidden shadow-md bg-card group"
            >
              <Link href="/media">
                <div className="relative w-full h-48">
                  <Image
                    src={imageUrl}
                    alt={item.altText ?? 'Media item'}
                    fill
                    priority
                    className="object-cover transform transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={item.mediaType}
                  />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
