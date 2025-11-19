// src/app/eu/page.tsx
import { getEUProjects } from '@/lib/api/projects';
import { PageHeader } from '@/components/shared/PageHeader'; // updated import path
import { ProjectCard } from '@/components/projects/ProjectCard';

export default async function EuProjectsPage() {
  const projects = await getEUProjects();
  // Optional: choose header image from first EU project
  const headerImage = projects?.[0]?.media?.[0]?.url
    ? projects[0].media[0].url
    : null;

  return (
    <div>
      <PageHeader
        title="EU Collaborations"
        description="Explore our European partnerships and Erasmus+ initiatives."
        backgroundImage={headerImage??undefined}
    
      />

      <div className="container py-12 md:py-16">
        {projects.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No EU projects yet.</p>
        )}
      </div>
    </div>
  );
}
