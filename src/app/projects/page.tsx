import { getProjects } from '@/lib/api/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';

import HeroSection from '@/components/projects/herosection';

export default async function ProjectsPage() {
  const projects = await getProjects();
  const localProjects = projects.filter(
    (p) => p?.category?.toUpperCase() === "LOCAL"
  ).slice(0, 24);
  return (
    <div className="container py-10">
      <HeroSection type='local'/>
      {localProjects.length ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-10">
          {localProjects.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      ) : <p className="text-muted-foreground">No projects yet.</p>}
    </div>
  );
}

