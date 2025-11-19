import { getNewsBySlug } from '@/lib/api/news';
import { notFound, redirect } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getMediaUrl } from '@/lib/getMediaUrl';

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  let slug = await params?.slug;
  if (slug.includes('+')) {
    slug = slug.replace(/\+/g, 'plus');
    redirect(`/news/${slug}`);
  }

  const article = await getNewsBySlug(slug);
  if (!article) notFound();

  const image = article.media?.find((m) => m.mediaType === 'IMAGE') ?? null;
  const imageUrl = getMediaUrl(image?.url);

  return (
    <div className="container max-w-4xl mx-auto py-12 md:py-20">
      <Link href="/news" className="inline-flex items-center gap-2 text-accent hover:underline mb-8">
        <ArrowLeft size={16} />
        Back to News
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-primary">
            {article.title}
          </h1>
        </header>

        {imageUrl && (
          <Image
            src={imageUrl}
            alt={article.title}
            width={1200}
            height={600}
            className="rounded-lg mb-8"
          />
        )}

        <div
          className="prose dark:prose-invert lg:prose-xl mx-auto"
          dangerouslySetInnerHTML={{ __html: article.content ?? '' }}
        />
      </article>
    </div>
  );
}
