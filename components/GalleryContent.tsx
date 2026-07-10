import { type Locale, getT } from '@/lib/i18n';
import { galleryPhotos, photoUrl } from '@/lib/gallery';
import Footline from '@/components/Footline';
import LeafRule from '@/components/LeafRule';
import GalleryGrid, { type GalleryItem } from '@/components/GalleryGrid';

export default function GalleryContent({ locale }: { locale: Locale }) {
  const t = getT(locale);

  const items: GalleryItem[] = galleryPhotos.map((p) => ({
    src: photoUrl(p.id, 1100),
    large: photoUrl(p.id, 1600),
    alt: t(p.altKey),
    wide: p.wide,
  }));

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

        <GalleryGrid
          items={items}
          labels={{ close: t('lbClose'), prev: t('lbPrev'), next: t('lbNext') }}
        />

        <Footline locale={locale} />
      </div>
    </main>
  );
}
