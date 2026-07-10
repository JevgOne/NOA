'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { type Locale, getT, pathFor, alternatePath } from '@/lib/i18n';

export default function Nav({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const t = getT(locale);
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname === `${href}/`;

  const links: { key: 'menu' | 'gallery' | 'about' | 'contact'; label: string }[] = [
    { key: 'menu', label: t('navMenu') },
    { key: 'gallery', label: t('navGallery') },
    { key: 'about', label: t('navAbout') },
    { key: 'contact', label: t('navContact') },
  ];

  return (
    <header>
      <nav>
        <Link className="nav-brand" href={pathFor(locale, 'home')} onClick={() => setOpen(false)}>
          NOA
        </Link>
        <button
          className="burger"
          aria-label={t('openMenuLabel')}
          aria-expanded={open}
          aria-controls="nl"
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
            <line x1="4" y1="8" x2="20" y2="8" />
            <line x1="4" y1="16" x2="20" y2="16" />
          </svg>
        </button>
        <ul className={`nav-links${open ? ' open' : ''}`} id="nl">
          {links.map(({ key, label }) => {
            const href = pathFor(locale, key);
            return (
              <li key={key}>
                <Link
                  href={href}
                  className={isActive(href) ? 'active' : undefined}
                  aria-current={isActive(href) ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </li>
            );
          })}
          <li>
            <span className="lang" role="group" aria-label={t('langSwitchLabel')}>
              <Link
                className={locale === 'cs' ? 'active' : undefined}
                href={alternatePath(pathname, 'cs')}
                hrefLang="cs"
                aria-current={locale === 'cs' ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                CZ
              </Link>
              <Link
                className={locale === 'en' ? 'active' : undefined}
                href={alternatePath(pathname, 'en')}
                hrefLang="en"
                aria-current={locale === 'en' ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                EN
              </Link>
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
}
