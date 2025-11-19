// src/app/eu/[slug]/page.tsx
import { getProjectBySlug } from '@/lib/api/projects';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { normalizeSlug } from '@/lib/utils';
import { PageHeader } from '@/components/shared/PageHeader';
import { getMediaUrl } from '@/lib/getMediaUrl';

export default async function EuProjectDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  
  const project = await getProjectBySlug(normalizeSlug(slug));

  if (!project) notFound();
  if ((project as any).category !== 'EU') notFound();

  // 🔹 Pick header image from media[]
  const headerImage = project.media?.[0]?.url
    ? getMediaUrl(project.media[0].url)
    : null;

  return (
    <div>
      {/* --- Professional Page Header --- */}
      <PageHeader
        title={project.title}
        description={project.description || ""}
        backgroundImage={headerImage??undefined}
       
      />

      {/* --- Main Article Content --- */}
      <div className="container max-w-4xl mx-auto py-12 md:py-20">
        <Link href="/eu" className="inline-flex items-center gap-2 text-accent hover:underline mb-8">
          <ArrowLeft size={16} /> Back to EU Projects
        </Link>

        <article>
          {/* Tags */}
          {Array.isArray((project as any).tags) && (project as any).tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {(project as any).tags.map((tag: string) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Inline Image Inside Article */}
          {(project as any).imageUrl && (
            <Image
              src={(project as any).imageUrl}
              alt={project.title}
              width={1200}
              height={675}
              className="w-full rounded-lg shadow-lg mb-8"
              data-ai-hint={(project as any).imageHint}
              priority
            />
          )}

          {/* Content */}
          <div
            className="prose dark:prose-invert lg:prose-xl mx-auto"
            dangerouslySetInnerHTML={{ __html: project.content || '' }}
          />
        </article>
      </div>
    </div>
  );
}
