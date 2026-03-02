import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

const DEFAULT_OG_IMAGE = '/media/opengraph-image-resized.jpg';
const HOMEPAGE_OG_TITLE = 'Toronto Zoo Report: animal updates and keeper talks';
const HOMEPAGE_OG_IMAGE_ALT =
  'Open Graph card for Toronto Zoo Report with a snow leopard resting in snow as the background, the TorontoZooReport wordmark, a short headline and description, and an "Explore Blog" button.';
const HOMEPAGE_TWITTER_IMAGE_ALT =
  'Snow leopard background with TorontoZooReport branding, a clear headline and description about animal updates and conservation context, and an "Explore Blog" call-to-action.';
const HOMEPAGE_OG_IMAGE_WIDTH = 1024;
const HOMEPAGE_OG_IMAGE_HEIGHT = 541;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: HOMEPAGE_OG_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: HOMEPAGE_OG_IMAGE_WIDTH,
        height: HOMEPAGE_OG_IMAGE_HEIGHT,
        alt: HOMEPAGE_OG_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOMEPAGE_OG_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        alt: HOMEPAGE_TWITTER_IMAGE_ALT,
      },
    ],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: '/media/logo-cr.png',
    shortcut: '/media/logo-cr.png',
    apple: '/media/logo-cr.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
