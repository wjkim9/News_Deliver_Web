export interface NewsItem {
  id: string;
  title: string;
  description: string;
  originallink: string;
  link: string;
  pubDate: string;
  category: string;
  imageUrl?: string;
}

export interface HotTopic {
  id: string;
  keyword: string;
  count: number;
  rank: number;
}

export interface UserSettings {
  keywords: string[];
  deliveryTime: string;
  newsCount: number;
  selectedDays: string[];
  userId?: string;
}

export interface NewsDelivery {
  date: string;
  news: NewsItem[];
  keywords: string[];
}

export interface KakaoMessage {
  id: string;
  date: string;
  news: NewsItem[];
  keywords: string[];
  sentTime: string;
}