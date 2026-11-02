export type CategoryType =
  | 'all'
  | 'कहानी'
  | 'कविता'
  | 'ग़ज़ल'
  | 'उपन्यास'
  | 'आलेख'
  | 'धरोहर'
  | 'शख्सियत'
  | 'भारतीय वाङ्मय'
  | 'समाचार'
  | 'विशेषांक';

export interface ArticleItem {
  id: string;
  title: string;
  titleEn?: string;
  category: CategoryType;
  genre: string;
  author: string;
  authorId: string;
  authorRole?: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  verses?: string[];
  originalUrl?: string;
  featured?: boolean;
  editorPick?: boolean;
  coverImage?: string;
  views?: number;
  likes?: number;
}

export interface AuthorItem {
  id: string;
  name: string;
  nameEn: string;
  era: string;
  role: string;
  birthDeath: string;
  bio: string;
  notableWorks: string[];
  honors: string[];
  quote: string;
  avatar?: string;
  isEmerging?: boolean;
  articlesCount?: number;
}

export interface BookItem {
  id: string;
  title: string;
  titleEn?: string;
  author: string;
  authorId: string;
  year: string;
  genre: string;
  synopsis: string;
  keyThemes: string[];
  excerpt: string;
  coverColor: string;
  rating?: string;
}

export interface AudioItem {
  id: string;
  title: string;
  poet: string;
  narrator: string;
  duration: string;
  durationSec: number;
  genre: string;
  description: string;
  versesSnippet: string;
}

export interface VideoItem {
  id: string;
  title: string;
  speaker: string;
  event: string;
  duration: string;
  category: string;
  summary: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  mode: 'भौतिक' | 'वर्चुअल' | 'हाइब्रिड';
  description: string;
  speakers: string[];
  registrationOpen: boolean;
}

export interface CompetitionItem {
  id: string;
  title: string;
  deadline: string;
  prize: string;
  wordLimit: string;
  theme: string;
  guidelines: string[];
  status: 'active' | 'evaluating' | 'completed';
}

export interface SpecialEditionItem {
  id: string;
  issueNumber: string;
  title: string;
  season: string;
  theme: string;
  curator: string;
  articleCount: number;
  description: string;
  highlights: string[];
}

export interface SubmissionItem {
  id: string;
  authorName: string;
  email: string;
  title: string;
  category: CategoryType;
  genre: string;
  content: string;
  bio: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  feedback?: string;
}

export interface CommentItem {
  id: string;
  articleId: string;
  userName: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'reader' | 'author' | 'admin';
  bookmarks: string[];
  history: { articleId: string; readAt: string; progress: number }[];
  preferences: {
    fontSize: 'sm' | 'base' | 'lg' | 'xl';
    theme: 'paper' | 'dark' | 'sepia';
    fontFamily: 'devanagari' | 'editorial' | 'sans';
  };
}

export type SectionView =
  | 'home'
  | 'about'
  | 'featured'
  | 'stories'
  | 'poetry'
  | 'ghazals'
  | 'novels'
  | 'articles'
  | 'authors'
  | 'emerging'
  | 'indian-lit'
  | 'heritage'
  | 'news'
  | 'special-editions'
  | 'audio'
  | 'videos'
  | 'events'
  | 'competitions'
  | 'submit'
  | 'contact';
