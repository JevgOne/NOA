import { type Locale, getT } from '@/lib/i18n';
import { business } from '@/lib/site';
import Footline from '@/components/Footline';
import LeafRule from '@/components/LeafRule';
import OpenStatus from '@/components/OpenStatus';

export default function ContactContent({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const mapQuery = encodeURIComponent(`${business.street}, ${business.postalCode} ${business.city}`);

  return (
    <main id="main">
      <div className="container">
        <div className="page-head">
          <LeafRule marginBottom="1rem" />
          <h1>{t('contactH')}</h1>
        </div>
        <div className="prose" style={{ marginBottom: 'clamp(1.6rem,4vw,2.4rem)' }}>
          <p className="lead">{t('contactLead')}</p>
        </div>

        <div className="reserve-wrap">
          <a className="reserve-cta" href={`tel:${business.phone}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M6.5 4h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z" />
            </svg>
            <span>{t('reserveCta')}</span>
          </a>
          <OpenStatus locale={locale} className="contact-status" />
        </div>

        <div className="contact-info">
          <div className="crow">
            <span className="k">{t('cAddr')}</span>
            <span className="v">
              {business.street}, {business.postalCode} {business.city}
            </span>
          </div>
          <div className="crow">
            <span className="k">{t('cPhone')}</span>
            <span className="v">
              <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a>
            </span>
          </div>
          <div className="crow">
            <span className="k">{t('cMail')}</span>
            <span className="v">
              <a href={`mailto:${business.email}`}>{business.email}</a>
            </span>
          </div>
          <div className="crow">
            <span className="k">{t('cHours')}</span>
            <span className="v" style={{ minWidth: '170px' }}>
              <span className="hours-row"><span>{t('dMonFri')}</span><span>8:00 – 20:00</span></span>
              <span className="hours-row"><span>{t('dSat')}</span><span>9:00 – 20:00</span></span>
              <span className="hours-row"><span>{t('dSun')}</span><span>9:00 – 18:00</span></span>
            </span>
          </div>
        </div>

        <div className="map-block">
          <div className="sec-title">
            <span className="l" />
            <h2>{t('mapH')}</h2>
            <span className="l" />
          </div>
          <div className="map-frame">
            <iframe
              title={t('mapTitle')}
              src={`https://www.google.com/maps?q=${mapQuery}&z=16&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <div className="socials">
          <a href="#" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a href="#" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
              <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8a1 1 0 0 1 1-1Z" />
            </svg>
          </a>
        </div>
        <Footline locale={locale} />
      </div>
    </main>
  );
}
