import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, SITE_URL } from '@/lib/site';

const ABOUT_DESCRIPTION =
  'Toronto Zoo Report documents animal updates and talk summaries with a balanced reporter + gentle watchdog approach focused on welfare, care systems, and conservation context.';

export const metadata: Metadata = {
  title: 'About',
  description: ABOUT_DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: `About | ${SITE_NAME}`,
    description: ABOUT_DESCRIPTION,
    type: 'website',
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
  },
};

export default function AboutPage() {
  return (
    <main className="shell about-page">
      <header className="about-page__header">
        <p className="eyebrow">About</p>
        <h1>Reporter + gentle watchdog coverage for Toronto Zoo animals</h1>
        <p>
          Toronto Zoo Report documents what visitors can actually observe: animal behavior, habitat use, keeper and
          volunteer talk updates, and conservation framing that families can discuss together. We publish clear
          summaries, 4K clips, and context that explains care without sensationalizing.
        </p>
      </header>

      <section className="about-page__section" aria-labelledby="about-publishes">
        <h2 id="about-publishes">What this site publishes</h2>
        <p>
          Each post is built to be readable on-site and useful afterward. You get concise updates on animals,
          plain-language talk summaries, visual evidence from photos and 4K videos, and conservation notes that stay
          grounded in what was observed or stated during talks.
        </p>
      </section>

      <section className="about-page__section" aria-labelledby="about-script">
        <h2 id="about-script">Our reporter + gentle watchdog script</h2>
        <ol className="about-page__list">
          <li>Welfare signals: We track visible comfort, stress, and routine behavior.</li>
          <li>Substrates and setup: We report how ground type, climbing structures, and layout shape behavior.</li>
          <li>Stereotypies: We note repetitive or stress-linked patterns when they appear and avoid over-claiming causes.</li>
          <li>Endangeredness: We frame species risk and conservation relevance in visitor-friendly language.</li>
          <li>Birthing and life-stage updates: We cover pregnancy, cub/chick/infant updates, and social transitions when discussed.</li>
          <li>
            What good habitat means: We evaluate whether spaces provide choice, enrichment, climate support, and
            appropriate social management.
          </li>
        </ol>
      </section>

      <section className="about-page__section" aria-labelledby="about-care">
        <h2 id="about-care">How we report animal care</h2>
        <p>
          We highlight practical care indicators mentioned in talks and visible in habitats, including enrichment
          cycles, indoor-outdoor access, temperature support, feeding routines, and rotation patterns. The goal is to
          inform visitors about how daily care systems affect animal welfare.
        </p>
      </section>

      <section className="about-page__section" aria-labelledby="about-activism">
        <h2 id="about-activism">Activism stance</h2>
        <p>
          Our activism is evidence-led and non-combative: protect endangered species, reward good welfare practice,
          and question unclear conditions through transparent reporting. The focus is education, accountability, and
          conservation literacy for families.
        </p>
      </section>

      <section className="about-page__section" aria-labelledby="about-evidence">
        <h2 id="about-evidence">Evidence standard</h2>
        <p>
          This site uses transcript-backed reporting and direct observations. When details are uncertain, we label
          them clearly instead of presenting guesses as fact.
        </p>
        <p>
          <Link href="/blog" className="text-link">
            Read the latest field notes
          </Link>
        </p>
      </section>
    </main>
  );
}
