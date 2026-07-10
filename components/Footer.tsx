import Link from 'next/link';
import { type Locale, getT, pathFor } from '@/lib/i18n';

export default function Footer({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const items: { key: 'home' | 'menu' | 'gallery' | 'about' | 'contact'; label: string }[] = [
    { key: 'home', label: t('navHome') },
    { key: 'menu', label: t('navMenu') },
    { key: 'gallery', label: t('navGallery') },
    { key: 'about', label: t('navAbout') },
    { key: 'contact', label: t('navContact') },
  ];

  return (
    <footer className="site">
      <div className="fb">NOA MATCHA</div>
      <nav className="foot-nav" aria-label={locale === 'cs' ? 'Patička' : 'Footer'}>
        {items.map(({ key, label }) => (
          <Link key={key} href={pathFor(locale, key)}>
            {label}
          </Link>
        ))}
      </nav>
      <div className="fc">© 2026 · Praha</div>
    </footer>
  );
}
