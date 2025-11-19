// src/app/projects/[slug]/page.tsx
import { getProjectBySlug } from "@/lib/api/projects";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { getMediaUrl } from "@/lib/getMediaUrl";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  if (!project) notFound();

  // 🔹 Determine hero background image
  const headerImage = 
    project.media?.[0]?.url
      ? getMediaUrl(project.media[0].url)
      : project.imageUrl
        ? project.imageUrl
        : null;

  return (
    <div>
      {/* ------------------------------------------
          🟦 PAGE HEADER (Hero Section)
      ------------------------------------------- */}
      <PageHeader
        title={project.title}
        description={project.description || ""}
        backgroundImage={headerImage}
     
      />

      {/* ------------------------------------------
          🟦 PAGE CONTENT
      ------------------------------------------- */}
      <div className="container max-w-4xl mx-auto py-12">
        {/* Inline image only if needed (since we already use hero) */}
        {project.imageUrl && (
          <Image
            src={project.imageUrl}
            width={1200}
            height={600}
            alt={project.title}
            className="rounded-lg shadow mb-8"
          />
        )}

        {/* HTML Content */}
        <div
          className="prose dark:prose-invert lg:prose-xl"
          dangerouslySetInnerHTML={{ __html: project.content || "" }}
        />
      </div>
    </div>
  );
}

// Static Params
export async function generateStaticParams() {
  const { getProjects } = await import("@/lib/api/projects");
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}
