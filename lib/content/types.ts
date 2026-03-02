export type BlogCategory = 'field-notes' | 'conservation' | 'engineering';

export interface MediaAsset {
  id: string;
  kind: 'image' | 'video';
  src: string;
  posterSrc?: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  credit?: string;
  durationLabel?: string;
}

export interface AnimalTalkSection {
  id: string;
  title: string;
  paragraphs: [string, string, ...string[]];
  photos: [] | [MediaAsset, MediaAsset];
  video?: MediaAsset;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishDate: string;
  authorName: string;
  category: BlogCategory;
  tags: string[];
  readingMinutes: number;
  hero: MediaAsset;
  content: {
    intro: string[];
    sections: AnimalTalkSection[];
    preservationLens: string[];
  };
}

export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishDate: string;
  category: BlogCategory;
  tags: string[];
  readingMinutes: number;
  hero: Pick<MediaAsset, 'src' | 'alt' | 'width' | 'height'>;
}

export interface ArchiveDaySummary {
  day: string;
  count: number;
}

export interface ArchiveMonthSummary {
  month: string;
  count: number;
  days: ArchiveDaySummary[];
}

export interface ArchiveYearSummary {
  year: string;
  count: number;
  months: ArchiveMonthSummary[];
}
