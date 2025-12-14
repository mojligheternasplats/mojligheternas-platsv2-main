'use client';

import React from 'react'
import { useTranslation } from '@/hooks/useTranslation';
import { PageHeader } from '@/components/shared/PageHeader';

export default  function MediaHeroSection() {

     const { t } =  useTranslation();
     if (!t) {
        return (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              Loading translations...
            </p>
          </div>
        );
      }


  return (
    <div>
          <PageHeader
            title={t('mediaGallery.title')}
            description={t('mediaGallery.description')}

          /></div>
  )
}

