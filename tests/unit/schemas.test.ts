import { describe, expect, it } from 'vitest';
import { LOCAL_POSTS, CANONICAL_SPELLINGS } from '@/lib/content/local-seed';
import { blogPostsSchema } from '@/lib/validation/schemas';

describe('blog schema contracts', () => {
  it('validates local post seed', () => {
    const parsed = blogPostsSchema.safeParse(LOCAL_POSTS);
    expect(parsed.success).toBe(true);
  });

  it('contains canonical spellings in Toronto Zoo copy', () => {
    const torontoPost = LOCAL_POSTS.find((post) => post.slug === 'toronto-zoo-field-notes');
    expect(torontoPost).toBeDefined();

    const joined = JSON.stringify(torontoPost);
    for (const spelling of CANONICAL_SPELLINGS) {
      expect(joined).toContain(spelling);
    }
  });
});
