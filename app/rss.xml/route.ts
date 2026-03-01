import { getPostSummaries } from '@/lib/directus/queries';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import { getPostCanonicalPath } from '@/lib/utils/post-path';

export async function GET() {
  const posts = await getPostSummaries();

  const items = posts
    .map((post) => {
      const canonicalPath = getPostCanonicalPath(post);
      return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${SITE_URL}${canonicalPath}</link>
        <guid>${SITE_URL}${canonicalPath}</guid>
        <pubDate>${new Date(`${post.publishDate}T00:00:00Z`).toUTCString()}</pubDate>
        <description><![CDATA[${post.excerpt}]]></description>
      </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>Family-first Toronto Zoo field notes and conservation stories.</description>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
