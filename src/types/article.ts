// /types/article.ts
export interface ArticleMedia {
  id: string;
  url: string;
  mediaType: string;
  altText?: string | null;
}

export interface ArticleCreator {
  id: string;
  name?: string | null;
  avatarUrl?: string | null;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  content: string;
  description?: string | null;
  publishedDate: string;
  isPublished: boolean;
  language?: string;
  media?: ArticleMedia[];
  creator?: ArticleCreator | null;
}
