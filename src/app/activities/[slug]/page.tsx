// src/app/projects/[slug]/page.tsx
import { getProjectBySlug } from "@/lib/api/projects";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { getMediaUrl } from "@/lib/getMediaUrl";
import Image from "next/image";
import { Calendar, Users, Building2 } from "lucide-react";
import { TextWithGaps } from "@/components/TextWithGaps";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  // Primary hero image
  const fallbackImage = (project as any).imageUrl ?? null;
  const headerImage =
    project.media?.[0]?.url
      ? getMediaUrl(project.media[0].url)
      : fallbackImage;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/70">

      {/* 🟦 HERO HEADER */}
      <PageHeader
        title={project.title}
        description={project.description || ""}
        backgroundImage={headerImage}
      />

      {/* 🟦 PROJECT INFO BAR */}
      <section className="border-b bg-card/40 backdrop-blur py-6">
        <div className="container max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 text-center gap-6">
          <InfoBox
            icon={<Calendar className="w-5 h-5" />}
            label="Skapad"
            value={new Date(project.createdAt).toLocaleDateString("sv-SE")}
          />

          <InfoBox
            icon={<Building2 className="w-5 h-5" />}
            label="Kategori"
            value={project.category || "Projekt"}
          />

          <InfoBox
            icon={<Users className="w-5 h-5" />}
            label="Målgrupp"
            value={project.targetGroup || "Unga & samhälle"}
          />
        </div>
      </section>

      {/* 🟦 PROJECT CONTENT */}
      <section className="py-12 md:py-16">
        <div className="container max-w-3xl mx-auto animate-fadeIn">

          {/* Optional inline image */}
          {fallbackImage && (
            <Image
              src={fallbackImage}
              width={1400}
              height={800}
              alt={project.title}
              className="rounded-xl shadow-xl mb-10 object-cover"
            />
          )}

          {/* Content */}
             {project.content && (
                     <TextWithGaps text={project.content} />
                   )}
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
      </section>

      {/* 🟦 RELATED PROJECTS */}
      <RelatedProjects currentSlug={slug} />
    </div>
  );
}

/* 🔹 Small reusable detail box */
function InfoBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-2 text-primary">{icon}</div>
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-base font-semibold">{value}</span>
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
                    src={img}
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
