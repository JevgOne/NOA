import Image from 'next/image';
import { type Locale, getT } from '@/lib/i18n';
import { social } from '@/lib/site';
import { galleryPhotos, photoUrl } from '@/lib/gallery';

const IgIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export default function Instagram({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const tiles = galleryPhotos.slice(0, 6);

  return (
    <section className="insta reveal" aria-label={t('instaH')}>
      <div className="sec-title">
        <span className="l" />
        <h2>{t('instaH')}</h2>
        <span className="l" />
      </div>
      <p className="insta-handle">
        <a href={social.instagram} target="_blank" rel="noopener noreferrer">
          {social.instagramHandle}
        </a>
      </p>

      <div className="insta-grid">
        {tiles.map((p) => (
          <a
            key={p.id}
            className="insta-tile"
            href={social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('instaCta')}
          >
            <Image
              src={photoUrl(p.id, 500)}
              alt={t(p.altKey)}
              fill
              sizes="(max-width: 560px) 33vw, 160px"
              style={{ objectFit: 'cover' }}
              loading="lazy"
            />
            <span className="insta-ic" aria-hidden="true">
              <IgIcon />
            </span>
          </a>
        ))}
      </div>

      <div className="insta-cta">
        <a className="cafe-cta" href={social.instagram} target="_blank" rel="noopener noreferrer">
          <span>{t('instaCta')}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </section>
  );
}
