import Link from 'next/link';
import { getPostSummaries } from '@/lib/directus/queries';
import { getPostCanonicalPath } from '@/lib/utils/post-path';
import { PostCard } from '@/components/PostCard';

export const revalidate = 300;

export default async function HomePage() {
  const posts = await getPostSummaries();
  const featured = posts.slice(0, 2);
  const latestPostPath = posts[0] ? getPostCanonicalPath(posts[0]) : '/blog';

  return (
    <main>
      <section className="home-hero shell">
        <p className="eyebrow">2026 recruiter-ready full-stack build</p>
        <h1>Conservation storytelling engineered for performance, accessibility, and editorial scale.</h1>
        <p>
          Toronto Zoo Report is a family-first wildlife publication with strict TypeScript contracts,
          SSR-first rendering, and a media pipeline built for repeatable quality.
        </p>
        <div className="cta-row">
          <Link href="/blog" className="button button--primary">
            Explore blog
          </Link>
          <Link href={latestPostPath} className="button button--secondary">
            Read Toronto Zoo field notes
          </Link>
        </div>
      </section>

      <section className="shell proof-strip" aria-label="Impact highlights">
        <article>
          <h2>SSR-first routes</h2>
          <p>Fast initial loads on `/`, `/blog`, and dynamic post pages.</p>
        </article>
        <article>
          <h2>Media constraints enforced</h2>
          <p>Per-animal two-photo + one-video structure with captions and consistent cropping.</p>
        </article>
        <article>
          <h2>Accessibility baseline</h2>
          <p>Semantic landmarks, visible focus states, keyboard-safe interactions, reduced motion support.</p>
        </article>
      </section>

      <section className="shell featured-grid" aria-label="Featured stories">
        <div className="section-head">
          <h2>Featured stories</h2>
          <Link href="/blog" className="text-link">
            View all posts
          </Link>
        </div>
        <div className="post-grid">
          {featured.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
