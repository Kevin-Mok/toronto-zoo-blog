import { ImageResponse } from 'next/og';
import { SITE_NAME } from '@/lib/site';

const HOME_OG_TITLE = 'Family-first Toronto Zoo reporting';
const HOME_OG_SUMMARY = 'Animal updates, talk summaries, and conservation context for parents and kids.';

export const revalidate = 300;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';
export const alt =
  'Open Graph card for Toronto Zoo Report with a snow leopard resting in snow as the background, the TorontoZooReport wordmark, a short headline and description, and an "Explore Blog" button.';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          color: '#f8fafc',
          fontFamily: 'system-ui, sans-serif',
          background:
            'radial-gradient(circle at 20% 10%, rgba(40, 110, 180, 0.45), transparent 46%), linear-gradient(135deg, #0f1d30 0%, #154f43 55%, #0b1324 100%)',
          padding: '56px 64px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: '-140px',
            top: '-180px',
            width: 520,
            height: 520,
            borderRadius: '50%',
            border: '2px solid rgba(248, 250, 252, 0.22)',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
            maxWidth: 980,
            zIndex: 2,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              opacity: 0.92,
            }}
          >
            {SITE_NAME}
          </p>
          <h1
            style={{
              margin: 0,
              fontSize: 68,
              lineHeight: 1.05,
              fontWeight: 800,
            }}
          >
            {HOME_OG_TITLE}
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 32,
              lineHeight: 1.25,
              maxWidth: 920,
              opacity: 0.95,
            }}
          >
            {HOME_OG_SUMMARY}
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
