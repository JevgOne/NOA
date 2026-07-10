import { type Locale, getT } from '@/lib/i18n';
import { business } from '@/lib/site';
import Footline from '@/components/Footline';
import LeafRule from '@/components/LeafRule';

export default function ContactContent({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <main id="main">
      <div className="container">
        <div className="page-head">
          <LeafRule marginBottom="1rem" />
          <h1>{t('contactH')}</h1>
        </div>
        <div className="prose" style={{ marginBottom: 'clamp(2rem,5vw,3rem)' }}>
          <p className="lead">{t('contactLead')}</p>
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
