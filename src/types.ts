export type CategoryType =
  | 'all'
  | 'कहानी'
  | 'कविता'
  | 'शायरी'
  | 'आलेख'
  | 'धरोहर'
  | 'शख्सियत'
  | 'यात्रा'
  | 'समाचार';

export interface ArticleItem {
  id: string;
  title: string;
  category: CategoryType;
  subCategory?: string;
  excerpt: string;
  content: string;
  author?: string;
  date?: string;
  readTime?: string;
  originalUrl?: string;
  featured?: boolean;
  icon?: string;
}

export interface CategoryInfo {
  id: CategoryType;
  number: string;
  title: string;
  description: string;
  icon: string;
  tileClass: string;
}

export interface NewsItem {
  id: string;
  day: string;
  month: string;
  tag: string;
  title: string;
  excerpt: string;
  content: string;
  originalUrl: string;
}

export interface HeritageItem {
  id: string;
  role: string;
  title: string;
  subtitle: string;
  colorClass: string;
  content: string;
  originalUrl: string;
}
