import { getNewsBySlug } from '@/lib/api/news';
import { redirect } from 'next/navigation';

export default async function Head({ params }: { params: { slug: string } }) {
  let slug = decodeURIComponent(params.slug);
  if (slug.includes('+')) {
    slug = slug.replace(/\+/g, 'plus');
    redirect(`/news/${slug}`);
  }

  const article = await getNewsBySlug(slug);
  if (!article) return null;

  return (
    <>
      <title>{article.title}</title>
      <meta name="description" content={article.description ?? ''} />
      <meta property="og:title" content={article.title} />
      <meta property="og:description" content={article.description ?? ''} />
    </>
  );
}
