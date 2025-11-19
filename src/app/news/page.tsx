import { getNews } from '@/lib/api/news';
import { NewsCard } from '@/components/news/NewsCard';
import { PageHeader } from '@/components/shared/PageHeader';

export default async function NewsListPage() {
  const articles = await getNews();

  return (
    <div>
      <PageHeader
        title="News & Updates"
        description="The latest articles, announcements, and stories from our team."
      />
      <div className="container py-16 md:py-24">
        {articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg text-muted-foreground">No news articles found.</p>
          </div>
        )}
        {/* Pagination could go here */}
      </div>
    </div>
  );
}
