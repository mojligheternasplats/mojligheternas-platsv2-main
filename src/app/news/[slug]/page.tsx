import { getNewsBySlug } from "@/lib/api/news";
import { notFound } from "next/navigation";
import { getMediaUrl } from "@/lib/getMediaUrl";
import Image from "next/image";
import { ProjectContent } from "@/components/projects/ProjectContent";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug.replace(/\+/g, " "));
  const article = await getNewsBySlug(decodedSlug);
  if (!article) notFound();



  const fallbackImage = (article as any).imageUrl ?? "/fallback.png";

  const latestMedia = article.media?.length
    ? article.media[article .media.length - 1]
    : null;

  const headerImage = latestMedia?.url
    ? getMediaUrl(latestMedia.url)
    : fallbackImage;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto h-14 flex items-center">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/news" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Tillbaka
            </Link>
          </Button>
        </div>
      </nav>

      {/* TWO COLUMN LAYOUT */}
      <section className="relative isolate px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* LEFT — TEXT */}
          <div className="lg:pr-8">
            <p className="text-base font-semibold text-primary">Nyhet</p>

            <h1 className="mt-2 text-3xl sm:text-4xl xl:text-5xl font-bold leading-tight">
              {article.title}
            </h1>

            {article.description && (
              <p className="mt-6 text-xl text-muted-foreground">
                {article.description}
              </p>
            )}

            <div className="mt-12">
              <ProjectContent content={article.content||""} />
            </div>
          </div>

          {/* RIGHT — STICKY IMAGE */}
          <div className="lg:sticky lg:top-24">
            <Image
              src={headerImage}
              alt={article.title}
              width={800}
              height={600}
              priority
              className="rounded-xl shadow-xl ring-1 ring-border"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
