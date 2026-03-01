import { describe, expect, it } from 'vitest';
import { formatPublishDate } from '@/lib/utils/date';

describe('formatPublishDate', () => {
  it('formats ISO date as a readable UTC date', () => {
    expect(formatPublishDate('2026-02-28')).toBe('February 28, 2026');
  });
});
