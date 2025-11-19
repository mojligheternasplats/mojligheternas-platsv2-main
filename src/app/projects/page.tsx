import { getProjects } from '@/lib/api/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { PageHeader } from '@/components/shared/PageHeader';

export default async function ProjectsPage() {
  const projects = await getProjects();
  const localProjects = projects.filter(
    (p) => p?.category?.toUpperCase() === "LOCAL"
  ).slice(0, 24);
  return (
    <div className="container py-10">
      <PageHeader title="Projects" description="Local projects and initiatives." />
      {localProjects.length ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-10">
          {localProjects.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      ) : <p className="text-muted-foreground">No projects yet.</p>}
    </div>
  );
}
// Basic translation function implementation
function t(key: string): string {
  // Basic translations map
  const translations: Record<string, string> = {
    'nav.euCollaborations': 'EU Collaborations',
    'nav.futureNarrative': 'Future Narrative'
  };

  // Return the translation if it exists, otherwise return the key
  return translations[key] ?? key;
}
