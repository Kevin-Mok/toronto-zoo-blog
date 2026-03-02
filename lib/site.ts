export const SITE_NAME = 'Toronto Zoo Report';
export const SITE_DESCRIPTION =
  'Explore the blog for animal updates, keeper-talk summaries, and conservation context from on-site visits to the Toronto Zoo.';
const PRODUCTION_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://torontozooreport.com';

// Use a local origin in development so OG/Twitter preview URLs are testable in `next dev`.
export const SITE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : PRODUCTION_SITE_URL;
