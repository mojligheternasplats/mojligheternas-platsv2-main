import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { Article } from '@/lib/definitions';
import { formatDate } from '@/lib/utils';
import { getMediaUrl } from "@/lib/getMediaUrl";

type NewsCardProps = {
  article: Article;
};

export function NewsCard({ article }: NewsCardProps) {
   const image = article?.media?.find((m) => m.mediaType === "IMAGE") ?? null;
    
   const imageUrl = getMediaUrl(image?.url);

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <Link href={`/news/${article.slug}`} className="block">
         {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={article.title}
                  width={600}
                  height={400}
                />
              )}
      </Link>
      <CardHeader>
        <CardDescription>{formatDate(article.publishedDate)}</CardDescription>
        <CardTitle className="font-headline text-2xl leading-tight">
          <Link href={`/news/${article.slug}`} className="hover:text-accent transition-colors">
            {article.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3">{article.language}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className="p-0 h-auto text-accent font-semibold">
          <Link href={`/news/${article.slug}`}>
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
