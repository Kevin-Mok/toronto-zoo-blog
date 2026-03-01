import { describe, expect, it } from 'vitest';
import {
  getPostCanonicalPath,
  getPostDateParts,
  getPostPathFromPublishDate,
  isYearSegment,
  postMatchesDateRoute,
} from '@/lib/utils/post-path';

describe('post path utils', () => {
  it('normalizes publish date parts for route segments', () => {
    expect(getPostDateParts('2026-03-01')).toEqual({
      year: '2026',
      month: '3',
      day: '1',
    });
  });

  it('builds canonical post path with date and title slug', () => {
    expect(
      getPostCanonicalPath({
        publishDate: '2026-03-01',
        slug: 'toronto-zoo-field-notes',
      }),
    ).toBe('/blog/2026/3/1/toronto-zoo-field-notes');
  });

  it('builds archive day path from publish date', () => {
    expect(getPostPathFromPublishDate('2026-03-01')).toBe('/blog/2026/3/1');
  });

  it('matches canonical date route segments with padded or unpadded values', () => {
    expect(postMatchesDateRoute('2026-03-01', '2026', '03', '01')).toBe(true);
    expect(postMatchesDateRoute('2026-03-01', '2026', '3', '1')).toBe(true);
    expect(postMatchesDateRoute('2026-03-01', '2026', '4', '1')).toBe(false);
  });

  it('validates year segments for archive routing', () => {
    expect(isYearSegment('2026')).toBe(true);
    expect(isYearSegment('26')).toBe(false);
    expect(isYearSegment('abcd')).toBe(false);
  });
});
