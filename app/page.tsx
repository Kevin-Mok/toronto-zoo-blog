import Image from 'next/image';
import Link from 'next/link';
import { getPostSummaries } from '@/lib/directus/queries';
import { PostCard } from '@/components/PostCard';

export const revalidate = 300;

export default async function HomePage() {
  const posts = await getPostSummaries();
  const featured = posts.slice(0, 2);

  return (
    <main>
      <section className="home-hero shell" aria-label="Toronto Zoo Report hero">
        <Image
          src="/media/hero-image.png"
          alt="Close-up of a snow leopard resting in a snowy habitat."
          width={1536}
          height={1024}
          className="home-hero__image"
          priority
          sizes="(max-width: 1120px) calc(100vw - 2rem), 1120px"
        />
        <div className="home-hero__overlay">
          <p className="eyebrow">Toronto Zoo Report</p>
          <h1 className="home-hero__title">Animal updates from the Toronto Zoo, reported with a gentle watchdog lens.</h1>
          <p className="home-hero__copy">
            We turn zoo talks and on-site observations into clear family-friendly reporting: animal updates, talk
            summaries, 4K video highlights, and conservation context on endangeredness, birthing, and daily care.
          </p>
          <div className="cta-row">
            <Link href="/blog" className="button button--primary">
              Explore blog
            </Link>
            <Link href="/about" className="button button--secondary">
              About our reporting
            </Link>
          </div>
        </div>
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
