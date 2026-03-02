import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { AnimalSection } from '@/components/AnimalSection';
import { BlogSidebar } from '@/components/BlogSidebar';
import { PostCard } from '@/components/PostCard';
import { ReadingProgress } from '@/components/ReadingProgress';
import {
  getArchiveTree,
  getLatestPostSummaries,
  getPostByDateAndSlug,
  getPostBySlug,
  getPostSummaries,
  getPostsByDate,
  getPostsByYear,
  getPostsByYearMonth,
  getRelatedPosts,
} from '@/lib/directus/queries';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import { formatPublishDate } from '@/lib/utils/date';
import { getPostCanonicalPath, isYearSegment } from '@/lib/utils/post-path';

interface BlogSegmentsPageProps {
  params: Promise<{ segments: string[] }>;
}

type ParsedSegments =
  | { kind: 'legacy-slug'; slug: string }
  | { kind: 'year'; year: string }
  | { kind: 'month'; year: string; month: string }
  | { kind: 'day'; year: string; month: string; day: string }
  | { kind: 'post'; year: string; month: string; day: string; slug: string }
  | { kind: 'invalid' };

export const revalidate = 300;

function normalizeNumberSegment(value: string): string {
  return String(Number.parseInt(value, 10));
}

function isValidMonthSegment(value: string): boolean {
  if (!/^\d+$/.test(value)) {
    return false;
  }

  const numeric = Number.parseInt(value, 10);
  return numeric >= 1 && numeric <= 12;
}

function isValidDaySegment(value: string): boolean {
  if (!/^\d+$/.test(value)) {
    return false;
  }

  const numeric = Number.parseInt(value, 10);
  return numeric >= 1 && numeric <= 31;
}

function parseSegments(segments: string[]): ParsedSegments {
  if (segments.length === 1) {
    const [single] = segments;
    if (!single) {
      return { kind: 'invalid' };
    }

    if (isYearSegment(single)) {
      return { kind: 'year', year: single };
    }

    return { kind: 'legacy-slug', slug: single };
  }

  if (segments.length === 2) {
    const [year, month] = segments;
    if (!year || !month || !isYearSegment(year) || !isValidMonthSegment(month)) {
      return { kind: 'invalid' };
    }

    return { kind: 'month', year, month: normalizeNumberSegment(month) };
  }

  if (segments.length === 3) {
    const [year, month, day] = segments;
    if (!year || !month || !day || !isYearSegment(year) || !isValidMonthSegment(month) || !isValidDaySegment(day)) {
      return { kind: 'invalid' };
    }

    return {
      kind: 'day',
      year,
      month: normalizeNumberSegment(month),
      day: normalizeNumberSegment(day),
    };
  }

  if (segments.length === 4) {
    const [year, month, day, slug] = segments;
    if (
      !year ||
      !month ||
      !day ||
      !slug ||
      !isYearSegment(year) ||
      !isValidMonthSegment(month) ||
      !isValidDaySegment(day)
    ) {
      return { kind: 'invalid' };
    }

    return {
      kind: 'post',
      year,
      month: normalizeNumberSegment(month),
      day: normalizeNumberSegment(day),
      slug,
    };
  }

  return { kind: 'invalid' };
}

function getRequestedPath(segments: string[]): string {
  return `/blog/${segments.join('/')}`;
}

function getArchivePath(parsed: Extract<ParsedSegments, { kind: 'year' | 'month' | 'day' }>): string {
  if (parsed.kind === 'year') {
    return `/blog/${parsed.year}`;
  }

  if (parsed.kind === 'month') {
    return `/blog/${parsed.year}/${parsed.month}`;
  }

  return `/blog/${parsed.year}/${parsed.month}/${parsed.day}`;
}

function getBlogOgImageUrl(canonicalPath: string): string {
  const segmentPath = canonicalPath.replace(/^\/blog\//, '');
  return `${SITE_URL}/blog/opengraph-image/${segmentPath}`;
}

const FEBRUARY_28_2026_POST_SLUG = 'toronto-zoo-field-notes-snow-leopard-polar-bear-and-gibbon-highlights-february-28-2026';
const MARCH_1_2026_POST_SLUG = 'toronto-zoo-field-notes-pygmy-hippo-penguins-gorillas-and-white-lions-march-1-2026';
const FIXED_POST_OG_IMAGES: Record<string, { url: string; width: number; height: number; alt: string }> = {
  [FEBRUARY_28_2026_POST_SLUG]: {
    url: `${SITE_URL}/media/toronto-zoo/2026-02-28/images/og-img.jpg`,
    width: 1024,
    height: 541,
    alt: 'Snow Leopard, Polar Bear, and Gibbon preview card for the February 28, 2026 Toronto Zoo field notes post.',
  },
  [MARCH_1_2026_POST_SLUG]: {
    url: `${SITE_URL}/media/toronto-zoo/2026-03-01/images/opengraph-image.jpg`,
    width: 1024,
    height: 541,
    alt: 'African Penguin Talk preview card for the March 1, 2026 Toronto Zoo field notes post.',
  },
};

function archiveMetadata(
  title: string,
  description: string,
  canonicalPath: string,
): Pick<Metadata, 'title' | 'description' | 'alternates' | 'openGraph' | 'twitter'> {
  const absoluteUrl = `${SITE_URL}${canonicalPath}`;
  const ogImageUrl = getBlogOgImageUrl(canonicalPath);

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: absoluteUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} preview card`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

function postMetadata(post: Awaited<ReturnType<typeof getPostBySlug>>): Metadata {
  if (!post) {
    return {};
  }

  const summary = post.excerpt.trim();
  const canonicalPath = getPostCanonicalPath(post);
  const absoluteUrl = `${SITE_URL}${canonicalPath}`;
  const fixedOgImage = FIXED_POST_OG_IMAGES[post.slug];
  const ogImageUrl = fixedOgImage?.url ?? getBlogOgImageUrl(canonicalPath);
  const ogImageWidth = fixedOgImage?.width ?? 1200;
  const ogImageHeight = fixedOgImage?.height ?? 630;
  const ogImageAlt = fixedOgImage?.alt ?? `${post.title} preview card`;

  return {
    title: post.title,
    description: summary,
    alternates: {
      canonical: absoluteUrl,
    },
    openGraph: {
      title: post.title,
      description: summary,
      type: 'article',
      url: absoluteUrl,
      siteName: SITE_NAME,
      publishedTime: `${post.publishDate}T00:00:00Z`,
      images: [
        {
          url: ogImageUrl,
          width: ogImageWidth,
          height: ogImageHeight,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: summary,
      images: [ogImageUrl],
    },
  };
}

interface ArchivePageViewProps {
  eyebrow: string;
  title: string;
  description: string;
  postsCountLabel: string;
  posts: Awaited<ReturnType<typeof getPostSummaries>>;
  latestPosts: Awaited<ReturnType<typeof getLatestPostSummaries>>;
  archiveYears: Awaited<ReturnType<typeof getArchiveTree>>;
  backHref: string;
  backLabel: string;
}

function ArchivePageView({
  eyebrow,
  title,
  description,
  postsCountLabel,
  posts,
  latestPosts,
  archiveYears,
  backHref,
  backLabel,
}: ArchivePageViewProps) {
  return (
    <main className="shell blog-layout blog-index">
      <section className="blog-layout__main">
        <header className="blog-index__header">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
          <p className="blog-index__count">{postsCountLabel}</p>
          <Link href={backHref} className="text-link">
            {backLabel}
          </Link>
        </header>

        <section className="post-grid" aria-label="Blog posts">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <p>No posts found for this date range.</p>
          )}
        </section>
      </section>

      <BlogSidebar latestPosts={latestPosts} archiveYears={archiveYears} />
    </main>
  );
}

export async function generateStaticParams() {
  const [posts, archiveYears] = await Promise.all([getPostSummaries(), getArchiveTree()]);
  const seen = new Set<string>();

  for (const year of archiveYears) {
    seen.add(year.year);

    for (const month of year.months) {
      seen.add(`${year.year}/${month.month}`);

      for (const day of month.days) {
        seen.add(`${year.year}/${month.month}/${day.day}`);
      }
    }
  }

  for (const post of posts) {
    const canonicalPath = getPostCanonicalPath(post).replace('/blog/', '');
    seen.add(canonicalPath);
  }

  return [...seen].map((value) => ({ segments: value.split('/') }));
}

export async function generateMetadata({ params }: BlogSegmentsPageProps): Promise<Metadata> {
  const { segments } = await params;
  const parsed = parseSegments(segments);

  if (parsed.kind === 'invalid') {
    return {};
  }

  if (parsed.kind === 'legacy-slug') {
    const post = await getPostBySlug(parsed.slug);
    return postMetadata(post);
  }

  if (parsed.kind === 'year') {
    return archiveMetadata(
      `${parsed.year} Archives`,
      `Toronto Zoo Report posts published in ${parsed.year}.`,
      `/blog/${parsed.year}`,
    );
  }

  if (parsed.kind === 'month') {
    return archiveMetadata(
      `${parsed.year}/${parsed.month} Archives`,
      `Toronto Zoo Report posts published in ${parsed.year}/${parsed.month}.`,
      `/blog/${parsed.year}/${parsed.month}`,
    );
  }

  if (parsed.kind === 'day') {
    return archiveMetadata(
      `${parsed.year}/${parsed.month}/${parsed.day} Archives`,
      `Toronto Zoo Report posts published on ${parsed.year}/${parsed.month}/${parsed.day}.`,
      `/blog/${parsed.year}/${parsed.month}/${parsed.day}`,
    );
  }

  const post = await getPostByDateAndSlug(parsed.year, parsed.month, parsed.day, parsed.slug);
  if (post) {
    return postMetadata(post);
  }

  const bySlug = await getPostBySlug(parsed.slug);
  return postMetadata(bySlug);
}

export default async function BlogSegmentsPage({ params }: BlogSegmentsPageProps) {
  const { segments } = await params;
  const parsed = parseSegments(segments);

  if (parsed.kind === 'invalid') {
    notFound();
  }

  if (parsed.kind === 'legacy-slug') {
    const post = await getPostBySlug(parsed.slug);
    if (!post) {
      notFound();
    }

    redirect(getPostCanonicalPath(post));
  }

  const [latestPosts, archiveYears] = await Promise.all([getLatestPostSummaries(), getArchiveTree()]);
  const requestedPath = getRequestedPath(segments);

  if (parsed.kind === 'year') {
    const canonicalPath = getArchivePath(parsed);
    if (requestedPath !== canonicalPath) {
      redirect(canonicalPath);
    }

    const posts = await getPostsByYear(parsed.year);
    return (
      <ArchivePageView
        eyebrow="Archive"
        title={`Posts from ${parsed.year}`}
        description="Browse every Toronto Zoo Report post from this year."
        postsCountLabel={`${posts.length} post${posts.length === 1 ? '' : 's'}`}
        posts={posts}
        latestPosts={latestPosts}
        archiveYears={archiveYears}
        backHref="/blog"
        backLabel="Back to all posts"
      />
    );
  }

  if (parsed.kind === 'month') {
    const canonicalPath = getArchivePath(parsed);
    if (requestedPath !== canonicalPath) {
      redirect(canonicalPath);
    }

    const posts = await getPostsByYearMonth(parsed.year, parsed.month);
    return (
      <ArchivePageView
        eyebrow="Archive"
        title={`Posts from ${parsed.year}/${parsed.month}`}
        description="Browse Toronto Zoo Report posts from this month."
        postsCountLabel={`${posts.length} post${posts.length === 1 ? '' : 's'}`}
        posts={posts}
        latestPosts={latestPosts}
        archiveYears={archiveYears}
        backHref={`/blog/${parsed.year}`}
        backLabel={`Back to ${parsed.year}`}
      />
    );
  }

  if (parsed.kind === 'day') {
    const canonicalPath = getArchivePath(parsed);
    if (requestedPath !== canonicalPath) {
      redirect(canonicalPath);
    }

    const posts = await getPostsByDate(parsed.year, parsed.month, parsed.day);
    return (
      <ArchivePageView
        eyebrow="Archive"
        title={`Posts from ${parsed.year}/${parsed.month}/${parsed.day}`}
        description="Browse Toronto Zoo Report posts from this day."
        postsCountLabel={`${posts.length} post${posts.length === 1 ? '' : 's'}`}
        posts={posts}
        latestPosts={latestPosts}
        archiveYears={archiveYears}
        backHref={`/blog/${parsed.year}/${parsed.month}`}
        backLabel={`Back to ${parsed.year}/${parsed.month}`}
      />
    );
  }

  const post = await getPostByDateAndSlug(parsed.year, parsed.month, parsed.day, parsed.slug);
  if (!post) {
    const bySlug = await getPostBySlug(parsed.slug);
    if (bySlug) {
      redirect(getPostCanonicalPath(bySlug));
    }

    notFound();
  }

  const canonicalPath = getPostCanonicalPath(post);
  if (requestedPath !== canonicalPath) {
    redirect(canonicalPath);
  }

  const related = await getRelatedPosts(post);
  const dayArchivePath = `/blog/${parsed.year}/${parsed.month}/${parsed.day}`;

  return (
    <main className="shell blog-layout blog-post">
      <ReadingProgress />

      <section className="blog-layout__main">
        <article className="blog-post__article">
          <header className="blog-post__header">
            <p className="eyebrow">{post.category}</p>
            <h1>{post.title}</h1>
            <p className="blog-post__excerpt">{post.excerpt}</p>
            <div className="meta-row">
              <span>{formatPublishDate(post.publishDate)}</span>
              <span aria-hidden="true">•</span>
              <span>{post.readingMinutes} min read</span>
              <span aria-hidden="true">•</span>
              <span>{post.authorName}</span>
            </div>
            {post.weatherSummary ? <p className="blog-post__weather">{post.weatherSummary}</p> : null}
          </header>

          <section className="intro-stack">
            {post.content.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          {post.content.sections.map((section) => (
            <AnimalSection key={section.id} section={section} />
          ))}

          <section className="preservation-lens" aria-labelledby="preservation-lens-title">
            <h2 id="preservation-lens-title">Preservation Lens</h2>
            {post.content.preservationLens.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        </article>

        <section className="related-posts" aria-label="Related posts">
          <div className="section-head">
            <h2>Related posts</h2>
            <div className="related-posts__links">
              <Link href={dayArchivePath} className="text-link">
                Day archive
              </Link>
              <Link href="/blog" className="text-link">
                Back to all posts
              </Link>
            </div>
          </div>

          <div className="post-grid">
            {related.length > 0 ? (
              related.map((candidate) => <PostCard key={candidate.id} post={candidate} />)
            ) : (
              <p>No related stories yet. More family conservation guides are in progress.</p>
            )}
          </div>
        </section>
      </section>

      <BlogSidebar latestPosts={latestPosts} archiveYears={archiveYears} />
    </main>
  );
}
