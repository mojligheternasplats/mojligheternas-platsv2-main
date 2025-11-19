import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { Project } from '@/lib/definitions';
import { Badge } from '@/components/ui/badge';
import { resolveProjectHref } from '@/lib/utils';


type ProjectCardProps = { project: Project };

export function ProjectCard({ project }: ProjectCardProps) {
  const href = resolveProjectHref(project);

  // ✅ Use first media image as project cover (fallback if none exists)
  const coverImage = project.media?.find(m => m.mediaType === "IMAGE")?.url ?? null;
      console.log("coverImage",coverImage)
  // ✅ Show category badge: LOCAL or EU
  const categoryColor = project.category === "EU" ? "default" : "secondary";
  const finalImage =
  coverImage ||
  project.media?.[0]?.url ||
  "/image/default-header.png";

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <Link href={href} className="block">
        <Image
          src={finalImage}
          alt={project.title}
          width={600}
          height={400}
          className="w-full h-56 object-cover"
          data-ai-hint={project.imageHint}
        />
      </Link>

      <CardHeader>
        <Badge variant={categoryColor} className="w-fit">
          {project.category === "EU" ? "EU Project" : "Local Project"}
        </Badge>

        <CardTitle className="font-headline text-2xl leading-tight pt-2">
          <Link href={href} className="hover:text-accent transition-colors">
            {project.title}
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-grow">
        {project.description && (
          <p className="text-muted-foreground line-clamp-3">{project.description}</p>
        )}
      </CardContent>

      <CardFooter className="mt-auto">
        <Button asChild variant="link" className="p-0 h-auto text-accent font-semibold">
          <Link href={href}>
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
