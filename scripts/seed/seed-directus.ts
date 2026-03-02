import { createDirectus, rest, staticToken, createItem } from '@directus/sdk';
import { LOCAL_POSTS } from '../../lib/content/local-seed';
import type { DirectusSchema } from '../../lib/directus/schema';

async function main() {
  const directusUrl = process.env.DIRECTUS_URL;
  const directusToken = process.env.DIRECTUS_TOKEN;

  if (!directusUrl || !directusToken) {
    throw new Error('DIRECTUS_URL and DIRECTUS_TOKEN are required for seeding');
  }

  const client = createDirectus<DirectusSchema>(directusUrl).with(rest()).with(staticToken(directusToken));

  for (const post of LOCAL_POSTS) {
    const payload = {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      publish_date: post.publishDate,
      author_name: post.authorName,
      weather_summary: post.weatherSummary ?? null,
      category: post.category,
      tags: post.tags,
      reading_minutes: post.readingMinutes,
      hero: {
        id: post.hero.id,
        kind: post.hero.kind,
        src: post.hero.src,
        alt: post.hero.alt,
        caption: post.hero.caption,
        width: post.hero.width,
        height: post.hero.height,
      },
      intro_blocks: post.content.intro,
      preservation_lens: post.content.preservationLens,
      animal_sections: post.content.sections.map((section) => ({
        id: section.id,
        section_id: section.id,
        title: section.title,
        paragraphs: section.paragraphs,
        photos: section.photos.map((photo) => ({
          id: photo.id,
          kind: photo.kind,
          src: photo.src,
          alt: photo.alt,
          caption: photo.caption,
          width: photo.width,
          height: photo.height,
        })),
        video: section.video
          ? {
              id: section.video.id,
              kind: section.video.kind,
              src: section.video.src,
              poster_src: section.video.posterSrc,
              alt: section.video.alt,
              caption: section.video.caption,
              width: section.video.width,
              height: section.video.height,
              duration_label: section.video.durationLabel,
            }
          : null,
      })),
    };

    await client.request(createItem('posts', payload));
    process.stdout.write(`Seeded post ${post.slug}\n`);
  }

  process.stdout.write('Directus seed completed.\n');
}

main().catch((error) => {
  process.stderr.write(`Seed failed: ${(error as Error).message}\n`);
  process.exit(1);
});
