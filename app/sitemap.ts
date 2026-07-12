import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { locales, type PageKey, pathFor, languageAlternates } from '@/lib/i18n';
import { galleryPhotos, photoUrl } from '@/lib/gallery';

const galleryImages = galleryPhotos.map((p) => photoUrl(p.id, 1200));

const pages: PageKey[] = [
  'home', 'menu', 'gallery', 'reviews', 'about', 'contact',
  'lpLatte', 'lpZizkov', 'lpCeremonial', 'lpTogo', 'lpIced', 'lpCatering', 'lpRecipe',
];

const priorityFor: Partial<Record<PageKey, number>> = { home: 1, menu: 0.9, reviews: 0.8, contact: 0.8 };

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const page of pages) {
      const langs = languageAlternates(page);
      entries.push({
        url: `${SITE_URL}${pathFor(locale, page)}`,
        lastModified,
        changeFrequency: page === 'reviews' ? 'weekly' : 'monthly',
        priority: priorityFor[page] ?? 0.7,
        ...(page === 'gallery' ? { images: galleryImages } : {}),
        alternates: {
          languages: {
            cs: `${SITE_URL}${langs.cs}`,
            en: `${SITE_URL}${langs.en}`,
            'x-default': `${SITE_URL}${langs['x-default']}`,
          },
        },
      });
    }
  }
  return entries;
}
