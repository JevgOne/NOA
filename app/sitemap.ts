import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { locales, type PageKey, pathFor, languageAlternates } from '@/lib/i18n';

const pages: PageKey[] = ['home', 'menu', 'gallery', 'reviews', 'about', 'contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const page of pages) {
      const langs = languageAlternates(page);
      entries.push({
        url: `${SITE_URL}${pathFor(locale, page)}`,
        changeFrequency: 'monthly',
        priority: page === 'home' ? 1 : 0.8,
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
