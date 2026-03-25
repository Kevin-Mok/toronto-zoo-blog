import { describe, expect, it } from 'vitest';
import { CANONICAL_SPELLINGS, LOCAL_POSTS } from '@/lib/content/local-seed';
import { blogPostsSchema } from '@/lib/validation/schemas';

describe('blog schema contracts', () => {
  it('validates local post seed', () => {
    const parsed = blogPostsSchema.safeParse(LOCAL_POSTS);
    expect(parsed.success).toBe(true);
  });

  it('preserves canonical spellings in the original Toronto post', () => {
    const originalPost = LOCAL_POSTS.find(
      (post) =>
        post.slug ===
        'toronto-zoo-field-notes-snow-leopard-polar-bear-and-gibbon-highlights-february-28-2026',
    );
    expect(originalPost).toBeDefined();

    const joined = JSON.stringify(originalPost);
    for (const spelling of CANONICAL_SPELLINGS) {
      expect(joined).toContain(spelling);
    }
  });

  it('contains expected sections in the March Toronto post', () => {
    const marchPost = LOCAL_POSTS.find(
      (post) =>
        post.slug ===
        'toronto-zoo-field-notes-pygmy-hippo-penguins-gorillas-and-white-lions-march-1-2026',
    );
    expect(marchPost).toBeDefined();
    const titles = marchPost?.content.sections.map((section) => section.title) ?? [];
    expect(titles).toEqual([
      'Pygmy Hippopotamus Talk',
      'African Penguin Talk',
      'Western Lowland Gorilla Talk',
      'White Lion Talk',
    ]);

    const lionSection = marchPost?.content.sections.find((section) => section.id === 'white-lion');
    expect(lionSection).toBeDefined();
    expect(lionSection?.paragraphs.length).toBe(3);
    expect(lionSection?.photos.length).toBe(0);
    expect(lionSection?.video).toBeUndefined();
  });

  it('contains the expected white-lion deep-dive sections in the March 8 post', () => {
    const lionPost = LOCAL_POSTS.find(
      (post) =>
        post.slug ===
        'toronto-zoo-field-notes-white-lion-care-genetics-and-family-status-march-8-2026',
    );
    expect(lionPost).toBeDefined();
    const titles = lionPost?.content.sections.map((section) => section.title) ?? [];
    expect(titles).toEqual([
      'White Lion Habitat and Winter Care',
      'Lion-by-Lion Status and Family Context',
      'White Lion Genetics and Conservation Context',
    ]);

    for (const section of lionPost?.content.sections ?? []) {
      expect(section.photos.length).toBe(0);
      expect(section.video).toBeUndefined();
    }
  });

  it('stores rounded Toronto weather summaries in local seed posts', () => {
    const zooPosts = LOCAL_POSTS.filter((post) => post.slug.startsWith('toronto-zoo-field-notes-'));
    expect(zooPosts.length).toBeGreaterThan(0);

    for (const post of zooPosts) {
      expect(post.weatherSummary).toBeDefined();
      expect(post.weatherSummary).toMatch(/^Toronto weather: -?\d+°C$/);
      expect(post.weatherSummary).not.toMatch(/\d+\.\d+/);
    }
  });
});
