import Image from 'next/image';
import type { AnimalTalkSection } from '@/lib/content/types';

interface AnimalSectionProps {
  section: AnimalTalkSection;
}

export function AnimalSection({ section }: AnimalSectionProps) {
  return (
    <section className="animal-section" aria-labelledby={`section-title-${section.id}`}>
      <h2 id={`section-title-${section.id}`} className="animal-section__title">
        {section.title}
      </h2>

      {section.paragraphs.map((paragraph, index) => (
        <p key={`${section.id}-paragraph-${index}`} className="animal-section__copy">
          {paragraph}
        </p>
      ))}

      <div className="media-grid media-grid--photos">
        {section.photos.map((photo) => (
          <figure key={photo.id} className="media-card">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className="media-image"
              sizes="(max-width: 980px) 100vw, 50vw"
            />
            <figcaption className="media-caption">{photo.caption}</figcaption>
          </figure>
        ))}
      </div>

      {section.video ? (
        <figure className="media-card media-card--video">
          <video
            controls
            preload="metadata"
            poster={section.video.posterSrc}
            className="media-video"
            playsInline
            aria-label={section.video.alt}
          >
            <source src={section.video.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <figcaption className="media-caption">
            {section.video.durationLabel ? `${section.video.durationLabel} · ` : ''}
            {section.video.caption}
          </figcaption>
        </figure>
      ) : null}
    </section>
  );
}
