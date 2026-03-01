import type { BlogPost } from '@/lib/content/types';

export const LOCAL_POSTS: BlogPost[] = [
  {
    id: 'post-toronto-zoo-2026-02-28',
    slug: 'toronto-zoo-field-notes',
    title: 'Toronto Zoo Field Notes (February 28, 2026)',
    excerpt:
      'Transcript-grounded animal talks with close-up media selections and conservation context for families planning an educational visit.',
    publishDate: '2026-02-28',
    authorName: 'Toronto Zoo Report Team',
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
    id: 'post-toronto-zoo-2026-03-01',
    slug: 'toronto-zoo-field-notes-march-1-2026',
    title: 'Toronto Zoo Field Notes (March 1, 2026)',
    excerpt:
      'A family-first Toronto Zoo field note focused on pygmy hippo, penguin, and gorilla behavior, with practical media picks and conservation context.',
    publishDate: '2026-03-01',
    authorName: 'Toronto Zoo Report Team',
    category: 'field-notes',
    tags: ['family-guide', 'toronto-zoo', 'pygmy-hippo', 'penguin', 'gorilla'],
    readingMinutes: 7,
    hero: {
      id: 'hero-pygmy-hippo',
      kind: 'image',
      src: '/media/toronto-zoo/2026-03-01/images/pygmy-hippo-closeup-1.webp',
      alt: 'Pygmy hippopotamus standing in a sandy indoor habitat beside a feeding area',
      caption: 'Pygmy hippo paused near browse and hay, with enclosure features visible for behavior context.',
      width: 4080,
      height: 3072,
    },
    content: {
      intro: [
        'This field note is designed for families who want clear, talk-through observations while moving through the zoo at a steady pace. The selected media emphasizes short, readable behavior moments that connect directly to habitat design and daily care.',
        'Because transcript text was not available in this run, the draft is grounded in visual evidence and filename-traceable assets only. Each animal section follows the same repeatable structure: two photo highlights, one optional video highlight, and concise conservation-aware context.',
      ],
      sections: [
        {
          id: 'pygmy-hippo',
          title: 'Pygmy Hippopotamus Talk',
          paragraphs: [
            'The pygmy hippo sequence is the strongest cluster in this drop, with clear feeding behavior across both stills and motion footage. Families can see the animal shift between hay and browse at a calm pace, making posture and route changes easy to discuss with younger readers.',
            'This section supports a simple welfare lesson: enclosure layout, substrate, and food placement shape visible behavior. The selected media keeps the focus on animal-environment interaction instead of broad scene coverage.',
          ],
          photos: [
            {
              id: 'pygmy-hippo-photo-1',
              kind: 'image',
              src: '/media/toronto-zoo/2026-03-01/images/pygmy-hippo-closeup-1.webp',
              alt: 'Pygmy hippopotamus standing in a sandy indoor habitat beside a feeding area',
              caption:
                'Pygmy hippo paused near browse and hay, with enclosure features visible for behavior context.',
              width: 4080,
              height: 3072,
            },
            {
              id: 'pygmy-hippo-photo-2',
              kind: 'image',
              src: '/media/toronto-zoo/2026-03-01/images/pygmy-hippo-closeup-2.webp',
              alt: 'Close view of a pygmy hippopotamus eating hay near the exhibit wall',
              caption:
                'Tight framing on feeding behavior to support a family-friendly observation prompt.',
              width: 4080,
              height: 3072,
            },
          ],
          video: {
            id: 'pygmy-hippo-video-1',
            kind: 'video',
            src: '/media/toronto-zoo/2026-03-01/videos/pygmy-hippo-highlight.mp4',
            posterSrc: '/media/toronto-zoo/2026-03-01/images/pygmy-hippo-video-poster.webp',
            alt: 'Pygmy hippopotamus moving between feeding spots in its habitat',
            caption:
              'Short hippo movement clip showing feeding transitions and pacing in the enclosure.',
            width: 1080,
            height: 1920,
            durationLabel: '12.5s',
          },
        },
        {
          id: 'african-penguin',
          title: 'African Penguin Talk',
          paragraphs: [
            'The penguin media captures group resting and small repositioning around the pool edge, giving families a clear opening to discuss social spacing and routine behavior. Body orientation and clustering remain readable across both selected stills.',
            'For conservation framing, this section links visible behavior to care systems children can understand: water quality, managed temperature, and predictable rest zones. The selected visuals keep attention on posture and movement rather than distant habitat details.',
          ],
          photos: [
            {
              id: 'african-penguin-photo-1',
              kind: 'image',
              src: '/media/toronto-zoo/2026-03-01/images/african-penguin-closeup-1.webp',
              alt: 'Group of penguins standing and resting beside an indoor pool',
              caption:
                'Penguin group cluster near the pool edge with clear resting and social spacing cues.',
              width: 3024,
              height: 3024,
            },
            {
              id: 'african-penguin-photo-2',
              kind: 'image',
              src: '/media/toronto-zoo/2026-03-01/images/african-penguin-closeup-2.webp',
              alt: 'Penguins distributed across rocks and deck around a shallow pool',
              caption:
                'Wider penguin scene showing multiple positions around the same water feature.',
              width: 3024,
              height: 3024,
            },
          ],
          video: {
            id: 'african-penguin-video-1',
            kind: 'video',
            src: '/media/toronto-zoo/2026-03-01/videos/african-penguin-highlight.mp4',
            posterSrc: '/media/toronto-zoo/2026-03-01/images/african-penguin-video-poster.webp',
            alt: 'Penguins shifting positions near the pool and rocky deck',
            caption:
              'Short movement clip to pair group stills with live behavior.',
            width: 3840,
            height: 2160,
            durationLabel: '11.8s',
          },
        },
        {
          id: 'western-lowland-gorilla',
          title: 'Western Lowland Gorilla Talk',
          paragraphs: [
            'The gorilla section centers on rest and perch use in a rope-and-platform enrichment environment. A seated portrait and hammock frame together show grip, weight distribution, and how suspended structures support comfortable positioning.',
            'This section works best as welfare-by-design framing rather than spectacle: enrichment complexity, vertical space, and routine stability all influence visible behavior. The selected assets keep the writing grounded in observable body language.',
          ],
          photos: [
            {
              id: 'western-lowland-gorilla-photo-1',
              kind: 'image',
              src: '/media/toronto-zoo/2026-03-01/images/western-lowland-gorilla-closeup-1.webp',
              alt: 'Gorilla seated upright on a raised platform while holding overhead rope',
              caption: 'Calm seated posture in the primate habitat with rope structure clearly visible.',
              width: 3024,
              height: 4032,
            },
            {
              id: 'western-lowland-gorilla-photo-2',
              kind: 'image',
              src: '/media/toronto-zoo/2026-03-01/images/western-lowland-gorilla-closeup-2.webp',
              alt: 'Gorilla reclining in a hammock-like enrichment net',
              caption: 'Resting position in suspended enrichment, highlighting grip and body support.',
              width: 3024,
              height: 3024,
            },
          ],
          video: {
            id: 'western-lowland-gorilla-video-1',
            kind: 'video',
            src: '/media/toronto-zoo/2026-03-01/videos/western-lowland-gorilla-highlight.mp4',
            posterSrc: '/media/toronto-zoo/2026-03-01/images/western-lowland-gorilla-video-poster.webp',
            alt: 'Gorillas moving through a netted enrichment space near the viewing glass',
            caption:
              'Gorilla movement and rest transitions in a rope-and-platform environment.',
            width: 1440,
            height: 1440,
            durationLabel: '14.7s',
          },
        },
      ],
      preservationLens: [
        'Preservation becomes easier for families to understand when behavior is tied to care systems they can see: feeding setup, enclosure complexity, and opportunities for rest and movement. This lens turns a zoo stop into a practical conservation conversation.',
        'For future posts, the highest educational value will come from pairing transcript-backed notes with traceable media and explicit uncertainty labels where transcripts are missing. That keeps the writing factual, reusable, and transparent.',
      ],
    },
  },
];

export const CANONICAL_SPELLINGS = ['Pemba', 'Jita', 'Zoya', 'Minu', 'Akron'] as const;
