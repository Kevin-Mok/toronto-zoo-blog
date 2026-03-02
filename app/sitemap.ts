import type { MetadataRoute } from 'next';
import { getArchiveTree, getPostSummaries } from '@/lib/directus/queries';
import { SITE_URL } from '@/lib/site';
import { getPostCanonicalPath } from '@/lib/utils/post-path';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, archiveYears] = await Promise.all([getPostSummaries(), getArchiveTree()]);

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}${getPostCanonicalPath(post)}`,
    lastModified: post.publishDate,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const archiveRoutes: MetadataRoute.Sitemap = [];
  for (const year of archiveYears) {
    archiveRoutes.push({
      url: `${SITE_URL}/blog/${year.year}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.6,
    });

    for (const month of year.months) {
      archiveRoutes.push({
        url: `${SITE_URL}/blog/${year.year}/${month.month}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.55,
      });

      for (const day of month.days) {
        archiveRoutes.push({
          url: `${SITE_URL}/blog/${year.year}/${month.month}/${day.day}`,
          lastModified: new Date().toISOString(),
          changeFrequency: 'weekly',
          priority: 0.5,
        });
      }
    }
  }

  return [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.65,
    },
    ...archiveRoutes,
    ...postRoutes,
  ];
}
