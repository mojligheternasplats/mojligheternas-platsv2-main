// src/app/activities/[slug]/page.tsx
import { getProjectBySlug } from "@/lib/api/projects";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader"; // adjust path
import { getMediaUrl } from "@/lib/getMediaUrl"; // if you use this helper

export default async function ActivityPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  if (!project) notFound();
  if (project.category?.toUpperCase() !== "LOCAL") notFound();

  // 🔹 Pick first project media (if exists)
  const mediaImage = project.media?.[0]?.url
    ? getMediaUrl(project.media[0].url) // If you use Cloudinary helper
    : null;

  return (
    <>
      <PageHeader
        title={project.title}
        description={project.description || ""}
        backgroundImage={mediaImage??undefined}
     
      />

      <div className="container py-10">
        <div
          className="prose dark:prose-invert lg:prose-xl"
          dangerouslySetInnerHTML={{ __html: project.content || "" }}
        />
      </div>
    </>
  );
}

// For static generation
export async function generateStaticParams() {
  const { getLocalProjects } = await import("@/lib/api/projects");
  const projects = await getLocalProjects();
  return projects.map((p) => ({ slug: p.slug }));
}
