import Image from 'next/image';
import Link from 'next/link';
import type { BlogPostSummary } from '@/lib/content/types';
import { formatPublishDate } from '@/lib/utils/date';
import { getPostCanonicalPath } from '@/lib/utils/post-path';
import { TagPill } from '@/components/TagPill';

interface PostCardProps {
  post: BlogPostSummary;
}

export function PostCard({ post }: PostCardProps) {
  const canonicalPath = getPostCanonicalPath(post);

  return (
    <article className="post-card">
      <div className="post-card__meta">
        <span>{formatPublishDate(post.publishDate)}</span>
        <span aria-hidden="true">•</span>
        <span>{post.readingMinutes} min read</span>
      </div>

      <h2 className="post-card__title">
        <Link href={canonicalPath}>{post.title}</Link>
      </h2>
      <p className="post-card__excerpt">{post.excerpt}</p>
      <div className="post-card__preview">
        <Link
          className="post-card__preview-link"
          href={canonicalPath}
          aria-label={`Preview image for ${post.title}`}
        >
          <span className="post-card__preview-frame">
            <Image
              src={post.hero.src}
              alt={post.hero.alt}
              fill
              className="post-card__preview-image"
              sizes="(max-width: 920px) 100vw, 50vw"
            />
          </span>
        </Link>
      </div>

      <div className="post-card__tags" aria-label="Post tags">
        {post.tags.slice(0, 3).map((tag) => (
          <TagPill key={tag} tag={tag} />
        ))}
      </div>

      <Link className="text-link" href={canonicalPath}>
        Read article
      </Link>
    </article>
  );
}
