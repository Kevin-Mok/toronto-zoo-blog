import { BlogSidebar } from '@/components/BlogSidebar';
import { PostCard } from '@/components/PostCard';
import { getArchiveTree, getLatestPostSummaries, getPostSummaries } from '@/lib/directus/queries';

export const revalidate = 300;

export default async function BlogIndexPage() {
  const [posts, latestPosts, archiveYears] = await Promise.all([
    getPostSummaries(),
    getLatestPostSummaries(),
    getArchiveTree(),
  ]);

  return (
    <main className="shell blog-layout blog-index">
      <section className="blog-layout__main">
        <header className="blog-index__header">
          <p className="eyebrow">Blog</p>
          <h1>Family-friendly conservation stories</h1>
          <p>
            Editorially structured posts for parents first, with section-by-section clarity that can be
            shared with children during and after a visit.
          </p>
        </header>

        <section className="category-strip" aria-label="Categories and tags">
          <span className="tag-pill">field-notes</span>
          <span className="tag-pill">conservation</span>
          <span className="tag-pill">family-guide</span>
          <span className="tag-pill">visit-planning</span>
        </section>

        <section className="post-grid" aria-label="Blog posts">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      </section>

      <BlogSidebar latestPosts={latestPosts} archiveYears={archiveYears} />
    </main>
  );
}
