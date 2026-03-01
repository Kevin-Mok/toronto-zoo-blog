import type { BlogPost } from '@/lib/content/types';

export const LOCAL_POSTS: BlogPost[] = [
  {
    id: 'post-toronto-zoo-2026-03-01',
    slug: 'toronto-zoo-field-notes',
    title: 'Toronto Zoo Field Notes (March 1, 2026)',
    excerpt:
      'Transcript-grounded animal talks with close-up media selections and conservation context for families planning an educational visit.',
    publishDate: '2026-03-01',
    authorName: 'Toronto Zoo Blog Team',
    category: 'field-notes',
    tags: ['family-guide', 'toronto-zoo', 'snow-leopard', 'polar-bear', 'gibbon'],
    readingMinutes: 7,
    hero: {
      id: 'hero-snow-leopard',
      kind: 'image',
      src: '/media/toronto-zoo/2026-02-28/images/snow-leopard-closeup-1.webp',
      alt: 'Snow leopard close-up at Toronto Zoo',
      caption: 'Snow leopard close-up highlight with facial and coat detail.',
      width: 3072,
      height: 4080,
    },
    content: {
      intro: [
        'This field note is designed for family-first readers: clear context for parents, then visuals and story details that children can engage with section by section.',
        'Each animal talk is grounded in the original source content and follows one consistent media structure: two highlighted photos and one highlighted video where source media exists.',
      ],
      sections: [
        {
          id: 'snow-leopard',
          title: 'Snow Leopard Talk',
          paragraphs: [
            'The snow leopard recordings repeatedly frame planning around Pemba, Jita, and the two cubs, Zoya and Minu, with staff noting that transfer dates can shift as cross-border paperwork changes. The conservation focus is less about a single timeline and more about matching social structure, genetics, and habitat readiness across accredited zoos, including Akron destination planning.',
            'Behavior notes in the talk match the selected close-up media: long rest phases, short movement bursts, and strong camouflage against rock and snow. Staff commentary on feeding differences and enrichment turnover provides context for the stretch-and-reset patterns visible in the cropped highlight clip.',
          ],
          photos: [
            {
              id: 'snow-leopard-photo-1',
              kind: 'image',
              src: '/media/toronto-zoo/2026-02-28/images/snow-leopard-closeup-1.webp',
              alt: 'Snow leopard close portrait in winter habitat',
              caption:
                'Snow leopard close-up highlight showing facial detail and coat pattern.',
              width: 3072,
              height: 4080,
            },
            {
              id: 'snow-leopard-photo-2',
              kind: 'image',
              src: '/media/toronto-zoo/2026-02-28/images/snow-leopard-closeup-2.webp',
              alt: 'Snow leopard resting in a tight frame near the enclosure fence',
              caption:
                'Second snow leopard close-up highlight with resting posture and eye line.',
              width: 3072,
              height: 4080,
            },
          ],
          video: {
            id: 'snow-leopard-video-1',
            kind: 'video',
            src: '/media/toronto-zoo/2026-02-28/videos/snow-leopard-highlight.mp4',
            posterSrc: '/media/toronto-zoo/2026-02-28/images/snow-leopard-video-poster.webp',
            alt: 'Snow leopard highlight video frame',
            caption:
              'Square crop style, centered on the animal, encoded for compatibility with H.264 and AAC.',
            width: 1080,
            height: 1080,
            durationLabel: '14.9s',
          },
        },
        {
          id: 'polar-bear',
          title: 'Polar Bear Talk',
          paragraphs: [
            'The polar bear audio emphasizes rotation through larger spaces, climate-controlled indoor access, and enrichment pacing throughout the day. That operational detail explains why behavior can look cyclical at the viewing window even when the animals have broader off-camera access.',
            'The strongest interpretation theme is welfare-by-design: pacing routes, object interaction, and temperature control are managed together rather than as isolated tasks. The two tight photos and square crop clip prioritize body language and enrichment contact over wide habitat coverage.',
          ],
          photos: [
            {
              id: 'polar-bear-photo-1',
              kind: 'image',
              src: '/media/toronto-zoo/2026-02-28/images/polar-bear-closeup-1.webp',
              alt: 'Polar bear close to viewing glass in snow',
              caption:
                'Polar bear close-up highlight at the viewing edge in winter conditions.',
              width: 3072,
              height: 4080,
            },
            {
              id: 'polar-bear-photo-2',
              kind: 'image',
              src: '/media/toronto-zoo/2026-02-28/images/polar-bear-closeup-2.webp',
              alt: 'Polar bear standing near den opening in a tighter frame',
              caption:
                'Second polar bear close-up highlight near den-side rock structures.',
              width: 1850,
              height: 2500,
            },
          ],
          video: {
            id: 'polar-bear-video-1',
            kind: 'video',
            src: '/media/toronto-zoo/2026-02-28/videos/polar-bear-highlight.mp4',
            posterSrc: '/media/toronto-zoo/2026-02-28/images/polar-bear-video-poster.webp',
            alt: 'Polar bear highlight video frame',
            caption:
              'Square crop from source footage to keep focus on enrichment behavior and body language.',
            width: 1080,
            height: 1080,
            durationLabel: '18.3s',
          },
        },
        {
          id: 'gibbon',
          title: 'Gibbon Talk',
          paragraphs: [
            'The gibbon segment in this format is observation-driven from media rather than keeper transcript. The selected highlights focus on elevated perch use, hand-and-foot balance control, and short repositioning movements around enrichment objects in a dense structural environment.',
            'Framing is intentionally tight to keep attention on posture, grip transitions, and interaction with nearby fixtures instead of background architecture. The same square crop style used for the other species is applied to preserve visual consistency across all animal sections.',
          ],
          photos: [
            {
              id: 'gibbon-photo-1',
              kind: 'image',
              src: '/media/toronto-zoo/2026-02-28/images/gibbon-closeup-1.webp',
              alt: 'Gibbon close-up screenshot with face and upper body detail',
              caption: 'Gibbon close-up highlight from on-site screenshot media.',
              width: 1050,
              height: 1080,
            },
            {
              id: 'gibbon-photo-2',
              kind: 'image',
              src: '/media/toronto-zoo/2026-02-28/images/gibbon-closeup-2.webp',
              alt: 'White-cheeked gibbon portrait reference image',
              caption: 'Second gibbon close-up highlight from curated reference media.',
              width: 1536,
              height: 1024,
            },
          ],
          video: {
            id: 'gibbon-video-1',
            kind: 'video',
            src: '/media/toronto-zoo/2026-02-28/videos/gibbon-highlight.mp4',
            posterSrc: '/media/toronto-zoo/2026-02-28/images/gibbon-video-poster.webp',
            alt: 'Gibbon highlight video frame',
            caption:
              'Square crop from source footage with the same visual treatment used across all animal videos.',
            width: 1080,
            height: 1080,
            durationLabel: '32.8s',
          },
        },
      ],
      preservationLens: [
        'Wildlife preservation is not only about population counts. It is also about whether enclosure design, enrichment cadence, and observation practices support natural behavior with minimal stress over time.',
        'For families, this framing helps children connect visible animal behavior to care decisions and long-term conservation planning.',
      ],
    },
  },
  {
    id: 'post-family-planning-guide',
    slug: 'family-guide-planning-a-learning-day-at-the-zoo',
    title: 'Family Guide: Planning a Learning Day at the Zoo',
    excerpt:
      'A practical visit structure for parents who want educational pacing, short breaks, and kid-friendly learning prompts at each habitat.',
    publishDate: '2026-02-21',
    authorName: 'Toronto Zoo Blog Team',
    category: 'conservation',
    tags: ['family-guide', 'visit-planning', 'education'],
    readingMinutes: 4,
    hero: {
      id: 'hero-family-guide',
      kind: 'image',
      src: '/media/toronto-zoo/2026-02-28/images/polar-bear-closeup-1.webp',
      alt: 'Family viewing a polar bear habitat',
      caption: 'A short-interval pacing model keeps kids engaged while reducing fatigue.',
      width: 3072,
      height: 4080,
    },
    content: {
      intro: [
        'A strong zoo day for families is less about walking every path and more about pacing visits around energy windows and attention span.',
        'Use this structure as a reusable plan for observation, recovery breaks, and short teaching moments.',
      ],
      sections: [],
      preservationLens: [
        'Children retain more when each stop is anchored to one clear animal behavior question.',
      ],
    },
  },
];

export const CANONICAL_SPELLINGS = ['Pemba', 'Jita', 'Zoya', 'Minu', 'Akron'] as const;
