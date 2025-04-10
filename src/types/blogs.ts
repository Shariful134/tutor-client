export interface NewsArticle {
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  source: {
    id: string | null;
    name: string;
  };
}
