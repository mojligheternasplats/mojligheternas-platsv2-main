import { getNewsBySlug } from "@/lib/api/news";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getMediaUrl } from "@/lib/getMediaUrl";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ Await params ONCE
  const { slug } = await params;

  const decodedSlug = decodeURIComponent(
    slug.replace(/\+/g, " ")
  );

  const article = await getNewsBySlug(decodedSlug);
  if (!article) notFound();

  // ...


 

  // ✅ Get latest IMAGE (same pattern as projects / gallery)
  const images = article.media?.filter(
    (m) => m.mediaType === "IMAGE"
  );

  const image = images?.[images.length - 1] ?? null;
  const imageUrl = image ? getMediaUrl(image.url) : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto flex items-center justify-between h-14">
          <ButtonBack />
          <span className="hidden sm:block text-sm font-semibold">
            Möjligheternas Plats
          </span>
          <div className="w-8" />
        </div>
      </nav>

      {/* Hero */}
      <section className="py-10 md:py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container max-w-3xl mx-auto space-y-6">
          {/* Title */}
          <header className="space-y-4">
            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground">
              {article.title}
            </h1>
          </header>

          {/* Image */}
          {imageUrl && (
            <div className="relative h-60 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-md">
              <Image
                src={imageUrl}
                alt={article.title}
                fill
                priority
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container max-w-3xl mx-auto">
          <article
            className="
              prose prose-base
              sm:prose-lg
              md:prose-xl
              lg:prose-2xl
              dark:prose-invert

              max-w-none
              leading-relaxed

              prose-headings:font-headline
              prose-headings:font-bold

              prose-p:text-foreground
              prose-strong:text-foreground
              prose-strong:font-semibold

              prose-img:rounded-xl
            "
            dangerouslySetInnerHTML={{
              __html: article.content ?? "",
            }}
          />
        </div>
      </section>
    </div>
  );
}

/* Back Button */
function ButtonBack() {
  return (
    <Link
      href="/news"
      className="inline-flex items-center gap-2 text-accent hover:underline"
    >
      <ArrowLeft size={16} />
      <span className="hidden sm:inline">Tillbaka</span>
    </Link>
  );
}
