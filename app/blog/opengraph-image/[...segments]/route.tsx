import { ImageResponse } from 'next/og';
import type { BlogPost } from '@/lib/content/types';
import { getPostByDateAndSlug, getPostBySlug } from '@/lib/directus/queries';
import { SITE_NAME } from '@/lib/site';
import { isYearSegment } from '@/lib/utils/post-path';

interface BlogOpengraphImageProps {
  params: Promise<{ segments: string[] }>;
}

type ParsedSegments =
  | { kind: 'legacy-slug'; slug: string }
  | { kind: 'year'; year: string }
  | { kind: 'month'; year: string; month: string }
  | { kind: 'day'; year: string; month: string; day: string }
  | { kind: 'post'; year: string; month: string; day: string; slug: string }
  | { kind: 'invalid' };

type OgCardContent =
  | {
      kind: 'post';
      title: string;
      imageUrl: string;
      logoUrl: string;
    }
  | {
      kind: 'generic';
      eyebrow: string;
      title: string;
      description: string;
    };

export const revalidate = 300;
const OG_SIZE = {
  width: 1200,
  height: 630,
};

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

function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 3).trimEnd()}...`;
}

function toAbsoluteAssetUrl(src: string, requestOrigin: string): string {
  if (/^https?:\/\//.test(src)) {
    return src;
  }

  return new URL(src, requestOrigin).toString();
}

function buildFallbackCardContent(): OgCardContent {
  return {
    kind: 'generic',
    eyebrow: `${SITE_NAME} | Blog`,
    title: 'Toronto Zoo field notes and conservation reporting',
    description: 'Animal updates, transcript-backed talk summaries, and family-first conservation context.',
  };
}

function buildArchiveCardContent(parsed: Extract<ParsedSegments, { kind: 'year' | 'month' | 'day' }>): OgCardContent {
  if (parsed.kind === 'year') {
    return {
      kind: 'generic',
      eyebrow: `${SITE_NAME} | Archive`,
      title: `${parsed.year} blog archive`,
      description: `Browse all Toronto Zoo Report stories published in ${parsed.year}.`,
    };
  }

  if (parsed.kind === 'month') {
    return {
      kind: 'generic',
      eyebrow: `${SITE_NAME} | Archive`,
      title: `${parsed.year}/${parsed.month} archive`,
      description: `Browse Toronto Zoo Report stories from ${parsed.year}/${parsed.month}.`,
    };
  }

  return {
    kind: 'generic',
    eyebrow: `${SITE_NAME} | Archive`,
    title: `${parsed.year}/${parsed.month}/${parsed.day} archive`,
    description: `Browse Toronto Zoo Report stories from ${parsed.year}/${parsed.month}/${parsed.day}.`,
  };
}

function buildPostCardContent(post: BlogPost, requestOrigin: string): OgCardContent {
  return {
    kind: 'post',
    title: truncate(post.title, 110),
    imageUrl: toAbsoluteAssetUrl(post.hero.src, requestOrigin),
    logoUrl: toAbsoluteAssetUrl('/media/logo-word.png', requestOrigin),
  };
}

function renderCard(content: OgCardContent) {
  if (content.kind === 'post') {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          color: '#f8fafc',
          fontFamily: 'system-ui, sans-serif',
          overflow: 'hidden',
        }}
      >
        <img
          src={content.imageUrl}
          alt=""
          width={1200}
          height={630}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(5, 11, 20, 0.42) 0%, rgba(5, 11, 20, 0.3) 30%, rgba(5, 11, 20, 0.78) 100%)',
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            padding: '44px 56px',
          }}
        >
          <img
            src={content.logoUrl}
            alt="Toronto Zoo Report"
            width={380}
            height={116}
            style={{
              objectFit: 'contain',
            }}
          />
          <h1
            style={{
              margin: 0,
              fontSize: 62,
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: 1060,
              textWrap: 'balance',
              textShadow: '0 6px 24px rgba(0, 0, 0, 0.5)',
            }}
          >
            {content.title}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        color: '#ecfeff',
        fontFamily: 'system-ui, sans-serif',
        background:
          'radial-gradient(circle at 85% 10%, rgba(16, 96, 136, 0.5), transparent 45%), linear-gradient(140deg, #0f1f2f 0%, #0f5138 52%, #121a2c 100%)',
        padding: '56px 64px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '-140px',
          bottom: '-190px',
          width: 520,
          height: 520,
          borderRadius: '50%',
          border: '2px solid rgba(236, 254, 255, 0.16)',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          maxWidth: 1000,
          zIndex: 2,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 24,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            opacity: 0.9,
            fontWeight: 700,
          }}
        >
          {content.eyebrow}
        </p>
        <h1
          style={{
            margin: 0,
            fontSize: 58,
            lineHeight: 1.07,
            fontWeight: 800,
          }}
        >
          {content.title}
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 30,
            lineHeight: 1.25,
            opacity: 0.95,
            maxWidth: 980,
          }}
        >
          {content.description}
        </p>
      </div>
    </div>
  );
}

async function getCardContent(parsed: ParsedSegments, requestOrigin: string): Promise<OgCardContent> {
  if (parsed.kind === 'invalid') {
    return buildFallbackCardContent();
  }

  if (parsed.kind === 'year' || parsed.kind === 'month' || parsed.kind === 'day') {
    return buildArchiveCardContent(parsed);
  }

  if (parsed.kind === 'legacy-slug') {
    const post = await getPostBySlug(parsed.slug);
    return post ? buildPostCardContent(post, requestOrigin) : buildFallbackCardContent();
  }

  const byDateAndSlug = await getPostByDateAndSlug(parsed.year, parsed.month, parsed.day, parsed.slug);
  if (byDateAndSlug) {
    return buildPostCardContent(byDateAndSlug, requestOrigin);
  }

  const bySlug = await getPostBySlug(parsed.slug);
  return bySlug ? buildPostCardContent(bySlug, requestOrigin) : buildFallbackCardContent();
}

export async function GET(
  request: Request,
  { params }: BlogOpengraphImageProps,
) {
  const { segments } = await params;
  const parsed = parseSegments(segments);
  const requestOrigin = new URL(request.url).origin;
  const content = await getCardContent(parsed, requestOrigin);

  return new ImageResponse(renderCard(content), {
    ...OG_SIZE,
  });
}
