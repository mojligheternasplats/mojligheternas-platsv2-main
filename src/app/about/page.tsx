"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="animate-fadeIn">
      <PageHeader
        title={t("about.title")}
        description={t("about.subtitle")}
      />

      <div className="container py-16 md:py-24 space-y-24">
        {/* Intro */}
        <section className="max-w-4xl mx-auto prose lg:prose-xl animate-slideUp">
          <p>{t("about.intro")}</p>

          <div className="my-12 not-prose group">
            <div className="overflow-hidden rounded-xl shadow-xl">
              <Image
                src="https://picsum.photos/seed/about-us/1200/500"
                alt={t("about.imageAlt")}
                width={1200}
                height={500}
                className="rounded-lg w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="max-w-4xl mx-auto animate-slideUp delay-150">
          <h2 className="text-3xl font-bold mb-4">{t("about.visionTitle")}</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {t("about.visionText")}
          </p>
        </section>

        {/* What We Do Section */}
        <section className="max-w-4xl mx-auto animate-slideUp delay-300">
          <h2 className="text-3xl font-bold mb-4">{t("about.whatWeDoTitle")}</h2>
          <p className="text-lg leading-relaxed text-muted-foreground mb-6">
            {t("about.whatWeDoIntro")}
          </p>

          <ul className="space-y-6">
            <li className="p-6 rounded-xl bg-muted/40 backdrop-blur-sm border hover:bg-muted/60 transition">
              <strong>{t("about.researchTitle")}</strong> — {t("about.researchText")}
            </li>

            <li className="p-6 rounded-xl bg-muted/40 backdrop-blur-sm border hover:bg-muted/60 transition">
              <strong>{t("about.appliedTitle")}</strong> — {t("about.appliedText")}
            </li>

            <li className="p-6 rounded-xl bg-muted/40 backdrop-blur-sm border hover:bg-muted/60 transition">
              <strong>{t("about.educationTitle")}</strong> — {t("about.educationText")}
            </li>
          </ul>
        </section>

        {/* Quote */}
        <section className="max-w-4xl mx-auto animate-slideUp delay-500">
          <blockquote className="p-8 rounded-xl bg-primary/5 border-l-4 border-primary text-xl italic">
            {t("about.quote")}
          </blockquote>
        </section>

        {/* Closing */}
        <section className="max-w-4xl mx-auto animate-slideUp delay-700">
          <p className="text-lg leading-relaxed text-muted-foreground">
            {t("about.closing")}
          </p>
        </section>
      </div>
    </div>
  );
}
