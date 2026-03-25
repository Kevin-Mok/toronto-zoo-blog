import { readItems } from '@directus/sdk';
import { unstable_cache } from 'next/cache';
import { LOCAL_POSTS } from '@/lib/content/local-seed';
import type {
  ArchiveMonthSummary,
  ArchiveYearSummary,
  BlogPost,
  BlogPostSummary,
  MediaAsset,
} from '@/lib/content/types';
import { getDirectusClient } from '@/lib/directus/client';
import type { DirectusPost, DirectusMediaAsset } from '@/lib/directus/schema';
import { getPostDateParts, postMatchesDateRoute } from '@/lib/utils/post-path';
import { blogPostsSchema, blogPostSchema } from '@/lib/validation/schemas';

const TORONTO_WEATHER_FALLBACK_BY_DATE: Record<string, string> = {
  '2026-02-28': 'Toronto weather: -1°C',
  '2026-03-01': 'Toronto weather: -10°C',
  '2026-03-08': 'Toronto weather: 9°C',
};

function mapMediaAsset(asset: DirectusMediaAsset) {
  return {
    id: asset.id,
    kind: asset.kind,
    src: asset.src,
    posterSrc: asset.poster_src ?? undefined,
    alt: asset.alt,
    caption: asset.caption,
    width: asset.width,
    height: asset.height,
    credit: asset.credit ?? undefined,
    durationLabel: asset.duration_label ?? undefined,
  };
}

function mapDirectusPost(post: DirectusPost): BlogPost {
  const mapSectionPhotos = (section: DirectusPost['animal_sections'][number]) => {
    if (section.photos.length === 0) {
      return [] as [];
    }

    const first = section.photos[0];
    const second = section.photos[1];

    if (section.photos.length === 2 && first && second) {
      return [mapMediaAsset(first), mapMediaAsset(second)] as [MediaAsset, MediaAsset];
    }

    throw new Error(`Directus section "${section.section_id}" must have either 0 or 2 photos`);
  };

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    publishDate: post.publish_date,
    authorName: post.author_name,
    weatherSummary: post.weather_summary ?? TORONTO_WEATHER_FALLBACK_BY_DATE[post.publish_date],
    category: post.category,
    tags: post.tags,
    readingMinutes: post.reading_minutes,
    hero: mapMediaAsset(post.hero),
    content: {
      intro: post.intro_blocks,
      preservationLens: post.preservation_lens,
      sections: post.animal_sections.map((section) => ({
        id: section.section_id,
        title: section.title,
        paragraphs: [
          section.paragraphs[0] ?? 'Paragraph missing from CMS section.',
          section.paragraphs[1] ?? 'Paragraph missing from CMS section.',
          ...section.paragraphs.slice(2),
        ],
        photos: mapSectionPhotos(section),
        video: section.video ? mapMediaAsset(section.video) : undefined,
      })),
    },
  };
}

async function tryGetDirectusPosts(): Promise<BlogPost[] | null> {
  if (!process.env.DIRECTUS_URL) {
    return null;
  }

  try {
    const client = getDirectusClient();
    const posts = await client.request(
      readItems('posts', {
        sort: ['-publish_date'],
      }),
    );

    const mapped = posts.map(mapDirectusPost);
    return blogPostsSchema.parse(mapped);
  } catch {
    return null;
  }
}

async function fetchPostsUncached(): Promise<BlogPost[]> {
  const directusPosts = await tryGetDirectusPosts();
  if (directusPosts && directusPosts.length > 0) {
    return directusPosts;
  }

  return blogPostsSchema.parse(LOCAL_POSTS);
}

const getCachedPosts = unstable_cache(
  async () => fetchPostsUncached(),
  ['all-posts'],
  {
    revalidate: 300,
    tags: ['posts'],
  },
);

function sortByPublishDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => {
    const dateComparison = b.publishDate.localeCompare(a.publishDate);
    if (dateComparison !== 0) {
      return dateComparison;
    }

    return a.slug.localeCompare(b.slug);
  });
}

function toSummary(post: BlogPost): BlogPostSummary {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    publishDate: post.publishDate,
    category: post.category,
    tags: post.tags,
    readingMinutes: post.readingMinutes,
    hero: {
      src: post.hero.src,
      alt: post.hero.alt,
      width: post.hero.width,
      height: post.hero.height,
    },
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const posts = await getCachedPosts();
    return sortByPublishDateDesc(posts);
  } catch {
    const posts = await fetchPostsUncached();
    return sortByPublishDateDesc(posts);
  }
}

export async function getPostSummaries(): Promise<BlogPostSummary[]> {
  const posts = await getAllPosts();
  return posts.map(toSummary);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  const found = posts.find((post) => post.slug === slug);
  return found ? blogPostSchema.parse(found) : null;
}

export async function getPostByDateAndSlug(
  year: string,
  month: string,
  day: string,
  slug: string,
): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  const found = posts.find(
    (post) => post.slug === slug && postMatchesDateRoute(post.publishDate, year, month, day),
  );

  return found ? blogPostSchema.parse(found) : null;
}

function filterPostsByDate(posts: BlogPost[], year: string, month?: string, day?: string): BlogPost[] {
  return posts.filter((post) => {
    const parts = getPostDateParts(post.publishDate);

    if (parts.year !== year) {
      return false;
    }

    if (month && parts.month !== month) {
      return false;
    }

    if (day && parts.day !== day) {
      return false;
    }

    return true;
  });
}

export async function getPostsByYear(year: string): Promise<BlogPostSummary[]> {
  const posts = await getAllPosts();
  return filterPostsByDate(posts, year).map(toSummary);
}

export async function getPostsByYearMonth(year: string, month: string): Promise<BlogPostSummary[]> {
  const posts = await getAllPosts();
  return filterPostsByDate(posts, year, month).map(toSummary);
}

export async function getPostsByDate(year: string, month: string, day: string): Promise<BlogPostSummary[]> {
  const posts = await getAllPosts();
  return filterPostsByDate(posts, year, month, day).map(toSummary);
}

export async function getLatestPostSummaries(limit = 5): Promise<BlogPostSummary[]> {
  const posts = await getPostSummaries();
  return posts.slice(0, limit);
}

export async function getArchiveTree(): Promise<ArchiveYearSummary[]> {
  const posts = await getPostSummaries();
  const yearMap = new Map<string, Map<string, Map<string, number>>>();

  for (const post of posts) {
    const { year, month, day } = getPostDateParts(post.publishDate);

    let monthMap = yearMap.get(year);
    if (!monthMap) {
      monthMap = new Map<string, Map<string, number>>();
      yearMap.set(year, monthMap);
    }

    let dayMap = monthMap.get(month);
    if (!dayMap) {
      dayMap = new Map<string, number>();
      monthMap.set(month, dayMap);
    }

    dayMap.set(day, (dayMap.get(day) ?? 0) + 1);
  }

  const sortNumericDesc = (a: string, b: string) => Number.parseInt(b, 10) - Number.parseInt(a, 10);

  const years: ArchiveYearSummary[] = [...yearMap.entries()]
    .sort(([leftYear], [rightYear]) => sortNumericDesc(leftYear, rightYear))
    .map(([year, monthMap]) => {
      const months: ArchiveMonthSummary[] = [...monthMap.entries()]
        .sort(([leftMonth], [rightMonth]) => sortNumericDesc(leftMonth, rightMonth))
        .map(([month, dayMap]) => {
          const days = [...dayMap.entries()]
            .sort(([leftDay], [rightDay]) => sortNumericDesc(leftDay, rightDay))
            .map(([day, count]) => ({ day, count }));

          return {
            month,
            count: days.reduce((total, dayEntry) => total + dayEntry.count, 0),
            days,
          };
        });

      return {
        year,
        count: months.reduce((total, monthEntry) => total + monthEntry.count, 0),
        months,
      };
    });

  return years;
}

export async function getRelatedPosts(post: BlogPost): Promise<BlogPostSummary[]> {
  const posts = await getAllPosts();

  const related = posts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const overlap = candidate.tags.filter((tag) => post.tags.includes(tag)).length;
      return { candidate, overlap };
    })
    .filter(({ overlap }) => overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 3)
    .map(({ candidate }) => toSummary(candidate));

  return related;
}
