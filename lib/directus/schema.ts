export interface DirectusMediaAsset {
  id: string;
  kind: 'image' | 'video';
  src: string;
  poster_src?: string | null;
  alt: string;
  caption: string;
  width: number;
  height: number;
  credit?: string | null;
  duration_label?: string | null;
}

export interface DirectusAnimalSection {
  id: string;
  section_id: string;
  title: string;
  paragraphs: string[];
  photos: DirectusMediaAsset[];
  video?: DirectusMediaAsset | null;
}

export interface DirectusPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publish_date: string;
  author_name: string;
  category: 'field-notes' | 'conservation' | 'engineering';
  tags: string[];
  reading_minutes: number;
  hero: DirectusMediaAsset;
  intro_blocks: string[];
  preservation_lens: string[];
  animal_sections: DirectusAnimalSection[];
}

export interface DirectusSchema {
  posts: DirectusPost[];
}
