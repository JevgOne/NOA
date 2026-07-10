import Image from 'next/image';
import { type Locale, getT } from '@/lib/i18n';
import { galleryPhotos, photoUrl } from '@/lib/gallery';
import Footline from '@/components/Footline';
import LeafRule from '@/components/LeafRule';

export default function GalleryContent({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <main id="main">
      <div className="container">
        <div className="page-head">
          <LeafRule marginBottom="1rem" />
          <h1>{t('galleryH')}</h1>
        </div>
        <div className="prose" style={{ marginBottom: 'clamp(2rem,5vw,3rem)' }}>
          <p className="lead">{t('galleryLead')}</p>
        </div>

        <div className="gallery reveal">
          {galleryPhotos.map((p, i) => (
            <figure key={p.id} className={`gphoto${p.wide ? ' wide' : ''}`}>
              <Image
                src={photoUrl(p.id)}
                alt={t(p.altKey)}
                fill
                sizes="(max-width: 560px) 100vw, (max-width: 820px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                loading={i < 3 ? 'eager' : 'lazy'}
              />
              <div className="frame" />
            </figure>
          ))}
        </div>

        <Footline locale={locale} />
      </div>
    </main>
  );
}
