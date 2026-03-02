import { describe, expect, it } from 'vitest';
import { getPostByDateAndSlug, getPostBySlug, getPostSummaries } from '@/lib/directus/queries';

describe('content provider', () => {
  it('returns post summaries with valid route slugs', async () => {
    const posts = await getPostSummaries();

    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]?.slug).toMatch(/^[a-z0-9-]+$/);
  });

  it('enforces Toronto Zoo media constraints in fallback data', async () => {
    const post = await getPostBySlug(
      'toronto-zoo-field-notes-snow-leopard-polar-bear-and-gibbon-highlights-february-28-2026',
    );

    expect(post).not.toBeNull();
    expect(post?.content.sections.length).toBeGreaterThan(0);

    for (const section of post?.content.sections ?? []) {
      expect(section.paragraphs.length).toBeGreaterThanOrEqual(2);
      expect(section.photos.length).toBe(2);
      expect(section.video?.kind).toBe('video');
    }
  });

  it('supports transcript-only sections in the March follow-up post', async () => {
    const post = await getPostBySlug(
      'toronto-zoo-field-notes-pygmy-hippo-penguins-gorillas-and-white-lions-march-1-2026',
    );

    expect(post).not.toBeNull();

    for (const section of post?.content.sections ?? []) {
      expect(section.paragraphs.length).toBeGreaterThanOrEqual(2);
      expect([0, 2]).toContain(section.photos.length);
    }

    const lionSection = post?.content.sections.find((section) => section.id === 'white-lion');
    expect(lionSection).toBeDefined();
    expect(lionSection?.paragraphs.length).toBe(3);
    expect(lionSection?.photos.length).toBe(0);
    expect(lionSection?.video).toBeUndefined();
  });

  it('resolves post by canonical date + title slug segments', async () => {
    const post = await getPostByDateAndSlug(
      '2026',
      '2',
      '28',
      'toronto-zoo-field-notes-snow-leopard-polar-bear-and-gibbon-highlights-february-28-2026',
    );
    expect(post?.slug).toBe(
      'toronto-zoo-field-notes-snow-leopard-polar-bear-and-gibbon-highlights-february-28-2026',
    );
  });

  it('resolves the March follow-up post by canonical date + slug', async () => {
    const post = await getPostByDateAndSlug(
      '2026',
      '3',
      '1',
      'toronto-zoo-field-notes-pygmy-hippo-penguins-gorillas-and-white-lions-march-1-2026',
    );
    expect(post?.slug).toBe(
      'toronto-zoo-field-notes-pygmy-hippo-penguins-gorillas-and-white-lions-march-1-2026',
    );
  });
});
