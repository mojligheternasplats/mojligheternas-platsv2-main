import { getNews } from '@/lib/api/news';

export async function generateStaticParams() {
  const articles = await getNews();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}
