"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { useTranslation } from "@/hooks/useTranslation";

export function TranslatedPageHeader({ ns }: { ns: string }) {
  const { t } = useTranslation();

  return (
    <PageHeader
      title={t(`${ns}.title`)}
      description={t(`${ns}.description`)}
    />
  );
}
