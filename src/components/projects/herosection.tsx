'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { useTranslation } from '@/hooks/useTranslation';

type HeroSectionProps = {
  type: 'local' | 'eu';
};

export default function HeroSection({ type }: HeroSectionProps) {
  const { t } = useTranslation();

  const keyPrefix =
    type === 'local' ? 'localProjects.hero' : 'euCollaborationsPage.hero';

  return (
    <PageHeader
      title={t(`${keyPrefix}.title`)}
      description={t(`${keyPrefix}.subtitle`)}
    />
  );
}
