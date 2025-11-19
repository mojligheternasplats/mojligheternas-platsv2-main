// src/app/projects/page.tsx
import { getProjects } from "@/lib/api/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { PageHeader } from "@/components/shared/PageHeader";

export default async function ProjectsPage() {
  const projects = await getProjects(); // ALL projects

  return (
    <div className="container py-10">
      <PageHeader 
        title="Projects" 
        description="All projects, collaborations and initiatives."
      />

      {projects.length ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-10">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No projects yet.</p>
      )}
    </div>
  );
}
