// src/app/projects/[slug]/page.tsx
import { getProjectBySlug } from "@/lib/api/projects";
import { notFound } from "next/navigation";
import { getMediaUrl } from "@/lib/getMediaUrl";
import Image from "next/image";

import Link from "next/link";
import { Button } from "@/components/ui/button";
 import {ArrowLeft } from "lucide-react";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import { ProjectContent } from "@/components/projects/ProjectContent";

export default async function ProjectDetailPage({
    params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ Await params ONCE
  const { slug } = await params;

  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  // Primary hero image
const fallbackImage = (project as any).imageUrl ?? "/fallback.png";

const latestMedia = project.media?.length
  ? project.media[project.media.length - 1]
  : null;

const headerImage = latestMedia?.url
  ? getMediaUrl(latestMedia.url)
  : fallbackImage;


  return (
    <div className="min-h-screen bg-background text-foreground">
       {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-14">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/eu" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Tillbaka</span>
            </Link>
          </Button>
        
          <div className="w-8" />
        </div>
      </nav>
      {/* 🟦 HERO FEATURE SECTION */}
      <section className="relative isolate overflow-hidden bg-background px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        {/* Decorative background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            aria-hidden="true"
            className="absolute top-0 left-[max(50%,25rem)] h-64 w-[32rem] -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-border"
          >
            <defs>
              <pattern
                id="project-pattern"
                width="200"
                height="200"
                x="50%"
                y="-1"
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#project-pattern)" strokeWidth="0" />
          </svg>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          {/* Text column */}
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
         <div className="px-4 sm:px-0 lg:pr-4">
  <div className="max-w-none sm:max-w-xl lg:max-w-lg">
    {/* Eyebrow */}
    <p className="text-sm sm:text-base font-semibold text-primary tracking-wide uppercase">
      Projekt
    </p>

    {/* Title */}
    <h1 className="
      mt-2
      text-2xl
      sm:text-3xl
      md:text-4xl
      lg:text-4xl
      xl:text-5xl
      font-bold
      tracking-tight
      text-foreground
      leading-tight
    ">
      {project.title}
    </h1>

    {/* Description */}
    {project.description && (
      <p className="
        mt-4
        sm:mt-6
        text-base
        sm:text-lg
        md:text-xl
        text-muted-foreground
        leading-relaxed
      ">
        {project.description}
      </p>
    )}
  </div>
</div>

          </div>

          {/* Sticky image column */}
          {headerImage && (
            <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
             <Image
     src={`${headerImage}?w=800&h=600&f_auto&q_auto`}
    alt={project.title}
     width={800}
                height={600}
                className="w-full max-w-none rounded-xl bg-card shadow-xl ring-1 ring-border"
    priority
  />
            </div>
          )}

          {/* Content column */}
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
         {project.content && <ProjectContent content={project.content} />}

              {/* Divider line */}
              <div className="my-12 border-t border-border"></div>

              {/* Call to action */}
              <div className="text-center">
                <h3 className="text-2xl font-headline font-bold mb-4">Vill du veta mer?</h3>
                <p className="text-muted-foreground mb-6">
                  Kontakta oss om du vill samarbeta eller veta mer om projektet.
                </p>
                <a
                  href="/engage"
                  className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow hover:shadow-lg transition-all"
                >
                  Kontakta oss
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🟦 RELATED PROJECTS */}
      <RelatedProjects currentSlug={slug} />
    </div>
  );
}

/* 🔹 Related Projects Section (Dynamic) */
async function RelatedProjects({ currentSlug }: { currentSlug: string }) {
  const { getProjects } = await import("@/lib/api/projects");
  const projects = (await getProjects()).filter((p) => p.slug !== currentSlug);

  if (projects.length === 0) return null;

  return (
    <section className="bg-muted/30 py-16 mt-12 border-t">
      <div className="container max-w-5xl mx-auto">
        <h2 className="text-3xl font-headline font-bold mb-10 text-center">
          Relaterade Projekt
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((p) => {
            const img = p.media?.[0]?.url ? getMediaUrl(p.media[0].url) : null;
            

            return (
              <a
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group rounded-xl overflow-hidden shadow hover:shadow-xl transition-all"
              >
                {img && (
                  <Image
                    src={p.media[0].url!}
                    width={600}
                    height={400}
                    alt={p.title}
                    className="h-40 object-cover w-full transition-transform group-hover:scale-105"
                  />
                )}
                <div className="p-4 bg-card">
                  <h3 className="font-headline text-lg font-semibold group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2 mt-1">
                    {p.description}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
