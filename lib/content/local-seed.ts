import type { BlogPost } from '@/lib/content/types';

export const LOCAL_POSTS: BlogPost[] = [
  {
    id: 'post-toronto-zoo-2026-02-28',
    slug: 'toronto-zoo-field-notes-snow-leopard-polar-bear-and-gibbon-highlights-february-28-2026',
    title: 'Toronto Zoo Field Notes: Snow Leopard, Polar Bear & Gibbon Highlights (February 28, 2026)',
    excerpt:
      'Transcript-grounded animal talks with close-up media selections and conservation context for families planning an educational visit.',
    publishDate: '2026-02-28',
    authorName: 'Toronto Zoo Report Team',
    weatherSummary: 'Toronto weather: -1°C',
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
    slug: 'toronto-zoo-field-notes-pygmy-hippo-penguins-gorillas-and-white-lions-march-1-2026',
    title: 'Toronto Zoo Field Notes: Pygmy Hippo, Penguins, Gorillas & White Lions (March 1, 2026)',
    excerpt:
      'A family-first Toronto Zoo field note combining media-backed hippo and penguin highlights with transcript-grounded gorilla and white lion updates.',
    publishDate: '2026-03-01',
    authorName: 'Toronto Zoo Report Team',
    weatherSummary: 'Toronto weather: -10°C',
    category: 'field-notes',
    tags: ['family-guide', 'toronto-zoo', 'pygmy-hippo', 'penguin', 'gorilla', 'white-lion'],
    readingMinutes: 8,
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
        'This revision incorporates transcript-backed notes from the lion and species audio files while preserving the same media-backed format for sections with photo and video coverage. Where animals were not visible during capture, the section is presented as transcript-only with explicit context.',
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
            'The species transcripts describe active social management rather than one static troop view. Keepers distinguish between a bachelor grouping and a family grouping, and they avoid direct male-to-male mixing because that can escalate into fights.',
            'Introductions are staged in steps: first with two barriers, then with one wire barrier, so gorillas can see and acclimate before closer integration. The transcript frames this as a gradual process based on behavior cues instead of a one-time release.',
            'Visitors may see different groupings depending on timing and season. The transcripts note half-day rotation between boys and girls and summer outside and inside rotation, which explains why visibility can change between passes.',
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
        {
          id: 'white-lion',
          title: 'White Lion Talk',
          paragraphs: [
            'Lion transcripts note that the white lions were in-house during part of this window, so visitors could not always see them at the glass. Keepers described indoor access around 23C and emphasized gradual temperature transitions when animals move between indoor and outdoor spaces.',
            'Family context in the transcripts identifies two females, Lemon and Makali, with Makali also called Mac. The same conversation references the male Fintan and provides lifespan framing: roughly 10 to 14 years in the wild and up to around 20 years in human care.',
            'Conservation context in the keeper discussion states these are white lions, not albino lions, and explains the white coat as a genetic trait that requires both parents to carry the relevant gene. The same transcript cluster links rarity to poaching and trophy-hunting pressure in their regional range.',
          ],
          photos: [],
        },
      ],
      preservationLens: [
        'Preservation becomes easier for families to understand when behavior is tied to care systems they can see: feeding setup, enclosure complexity, and opportunities for rest and movement. This lens turns a zoo stop into a practical conservation conversation.',
        'For future posts, the highest educational value will come from pairing transcript-backed notes with traceable media and explicit uncertainty labels where transcripts are missing. That keeps the writing factual, reusable, and transparent.',
      ],
    },
  },
  {
    id: 'post-toronto-zoo-2026-03-08-white-lion',
    slug: 'toronto-zoo-field-notes-white-lion-care-genetics-and-family-status-march-8-2026',
    title: 'Toronto Zoo Field Notes: White Lion Care, Genetics & Family Status (March 8, 2026)',
    excerpt:
      'Transcript-led Toronto Zoo white lion reporting that expands the March 1 keeper talk into care systems, lion-by-lion status, and conservation context.',
    publishDate: '2026-03-08',
    authorName: 'Toronto Zoo Report Team',
    weatherSummary: 'Toronto weather: 9°C',
    category: 'field-notes',
    tags: ['family-guide', 'toronto-zoo', 'white-lion', 'lion', 'conservation'],
    readingMinutes: 7,
    hero: {
      id: 'hero-white-lion-placeholder',
      kind: 'image',
      src: '/media/logo.png',
      alt: 'Toronto Zoo Report placeholder graphic for a transcript-led white lion post without lion-specific media.',
      caption: 'Placeholder site graphic used until Toronto Zoo white lion media is added to the repository.',
      width: 1536,
      height: 1024,
    },
    content: {
      intro: [
        'This follow-up post pulls the White Lion Talk out of the March 1 mixed-species field note and gives it enough room to stand on its own. The goal is not to sensationalize the animals, but to make the keeper discussion easier to reuse: what visitors could learn about winter care, who is currently in the habitat, and which questions should be taken back on the next visit.',
        'The reporting lens stays the same as the About page: visible welfare signals, enclosure setup, enrichment, life-stage updates, and conservation context. Where a transcript line is noisy or incomplete, that uncertainty is labeled instead of turned into a stronger claim than the audio supports.',
      ],
      sections: [
        {
          id: 'white-lion-winter-care',
          title: 'White Lion Habitat and Winter Care',
          paragraphs: [
            'The clearest operational detail in the transcript is that the white lions were sometimes kept in their house during colder conditions, which meant visitors could not always see them at the viewing glass. The keeper described the indoor space as being around 23C that morning and framed the setup as a gradual temperature transition rather than a hard jump between indoor heat and outdoor cold.',
            'That matters from a welfare-reporting standpoint because it points to a care system, not just a viewing outcome. Visitors may experience a no-lions-visible moment, but the transcript suggests that indoor choice, temperature moderation, and controlled movement between spaces are part of the husbandry logic rather than an arbitrary closure.',
            'The transcript cluster is thinner on substrate and enrichment specifics than on climate management, which leaves a useful reporting gap for the next talk. The next visit should prioritize habitat photos wide enough to show pacing routes, ground surfaces, heated or sheltered rest areas, climbing or rubbing points, and the density and freshness of enrichment objects.',
          ],
          photos: [],
        },
        {
          id: 'white-lion-family-status',
          title: 'Lion-by-Lion Status and Family Context',
          paragraphs: [
            'The family-identification segment names two females in the current setup: Lemon and Makali, with Makali also called Mac. The transcript states that both are around 15 years old in 2026. It also references the male Fintan, spelling his name out in the conversation and saying he died last October at age 14, which the keeper described as old for a lion even though lions in human care can sometimes live to around 20.',
            'That gives this post a more precise status frame than the shorter March 1 section had. The current habitat story is not simply white lions in the abstract; it is a pair of older adult females with a recent loss in the group history. The transcript does not cleanly establish whether Lemon and Makali are related, so that point should stay unclaimed until a cleaner source confirms it.',
            'One noisier transcript fragment describes Lemon as affectionate and includes a brief visitor question about one eye looking slightly smaller or squintier. The keeper response appears to be that this is a known small visual quirk rather than an active issue, but the audio is not clean enough to treat that as a firm medical statement. The safe framing is that visitors have noticed a minor eye-appearance difference and that a cleaner follow-up should be requested directly from management or welfare-science staff if health context is needed.',
          ],
          photos: [],
        },
        {
          id: 'white-lion-genetics',
          title: 'White Lion Genetics and Conservation Context',
          paragraphs: [
            'The conservation segment is the strongest and most reusable public-facing part of the talk. The keeper explicitly states that these are white lions, not albino lions, and explains the coat color as a genetic trait that requires both parents to carry the relevant gene. That distinction is important because visitors often collapse white coloration into albinism, which would misstate both the biology and the conservation story.',
            'The transcript places the animals in the Timbavati region and says the white coat helps them blend into that background. It also links rarity to human pressure, especially poaching and trophy hunting. Whether every detail of that framing would survive a formal conservation write-up is secondary to the key public takeaway: rarity increases attention, and attention can increase risk.',
            'The transcript also says the lions are part of a species survival plan. That is the right place for a next-step follow-up because public talks often compress breeding, genetics, and regional program language. A future post would be stronger if it could verify which current SSP or institutional program terminology Toronto Zoo staff want used on the record for these lions.',
          ],
          photos: [],
        },
      ],
      preservationLens: [
        'The most useful family-facing welfare lesson from this talk is that not visible does not automatically mean inactive or poorly managed. In this transcript, lack of visibility is partly explained by indoor access, thermal management, and giving the animals choice during cold conditions.',
        'The bigger unfinished reporting job is habitat sufficiency. The transcript gives enough to discuss care philosophy, but not enough to independently judge substrate variety, enrichment turnover, or the practical amount of usable space. That is why the next talk needs both better questions and better evidence capture from the public side of the enclosure.',
      ],
    },
  },
];

export const CANONICAL_SPELLINGS = ['Pemba', 'Jita', 'Zoya', 'Minu', 'Akron'] as const;
