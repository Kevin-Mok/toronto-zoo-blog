import type { BlogPost, BlogPostSummary } from '@/lib/content/types';

interface DateParts {
  year: string;
  month: string;
  day: string;
}

function normalizeDatePart(value: string): string {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? String(parsed) : value;
}

export function getPostDateParts(publishDate: string): DateParts {
  const [year = '', month = '', day = ''] = publishDate.split('-');
  return {
    year,
    month: normalizeDatePart(month),
    day: normalizeDatePart(day),
  };
}

export function getPostPathFromPublishDate(publishDate: string): string {
  const { year, month, day } = getPostDateParts(publishDate);
  return `/blog/${year}/${month}/${day}`;
}

export function getPostCanonicalPath(post: Pick<BlogPost | BlogPostSummary, 'publishDate' | 'slug'>): string {
  return `${getPostPathFromPublishDate(post.publishDate)}/${post.slug}`;
}

export function postMatchesDateRoute(
  publishDate: string,
  year: string,
  month: string,
  day: string,
): boolean {
  const parts = getPostDateParts(publishDate);
  return (
    parts.year === normalizeDatePart(year) &&
    parts.month === normalizeDatePart(month) &&
    parts.day === normalizeDatePart(day)
  );
}

export function isYearSegment(value: string): boolean {
  return /^\d{4}$/.test(value);
}
