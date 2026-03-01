import Link from 'next/link';
import type { ArchiveYearSummary, BlogPostSummary } from '@/lib/content/types';
import { formatPublishDate } from '@/lib/utils/date';
import { getPostCanonicalPath } from '@/lib/utils/post-path';

interface BlogSidebarProps {
  latestPosts: BlogPostSummary[];
  archiveYears: ArchiveYearSummary[];
}

export function BlogSidebar({ latestPosts, archiveYears }: BlogSidebarProps) {
  return (
    <aside className="blog-sidebar" aria-label="Latest posts and archive navigation">
      <section className="blog-sidebar__card" aria-labelledby="latest-posts-heading">
        <h2 id="latest-posts-heading">Latest posts</h2>
        <ul className="blog-sidebar__list">
          {latestPosts.map((post) => (
            <li key={post.id}>
              <Link href={getPostCanonicalPath(post)}>{post.title}</Link>
              <p>{formatPublishDate(post.publishDate)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="blog-sidebar__card" aria-labelledby="archive-heading">
        <h2 id="archive-heading">Browse by date</h2>

        <ul className="archive-tree">
          {archiveYears.map((year) => (
            <li key={year.year}>
              <Link href={`/blog/${year.year}`}>{year.year}</Link>
              <span aria-label={`${year.count} posts`}> ({year.count})</span>

              <ul className="archive-tree archive-tree--nested">
                {year.months.map((month) => (
                  <li key={`${year.year}-${month.month}`}>
                    <Link href={`/blog/${year.year}/${month.month}`}>
                      {year.year}/{month.month}
                    </Link>
                    <span aria-label={`${month.count} posts`}> ({month.count})</span>

                    <ul className="archive-tree archive-tree--nested">
                      {month.days.map((day) => (
                        <li key={`${year.year}-${month.month}-${day.day}`}>
                          <Link href={`/blog/${year.year}/${month.month}/${day.day}`}>
                            {year.year}/{month.month}/{day.day}
                          </Link>
                          <span aria-label={`${day.count} posts`}> ({day.count})</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
