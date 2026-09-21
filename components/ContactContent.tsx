import { type Locale, getT } from '@/lib/i18n';
import { business, operator, transport } from '@/lib/site';
import Footline from '@/components/Footline';
import LeafRule from '@/components/LeafRule';
import OpenStatus from '@/components/OpenStatus';
import HoursTable from '@/components/HoursTable';

export default function ContactContent({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const mapQuery = encodeURIComponent(`${business.street}, ${business.postalCode} ${business.city}`);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

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

        <div className="contact-grid">
          {/* ---- Kde nás najdete ---- */}
          <section className="ccard">
            <h2 className="ccard-k">{t('cAddr')}</h2>
            <p className="ccard-addr">
              {business.street}
              <br />
              {business.postalCode} {business.city} – {business.district}
            </p>
            <a className="ccard-link" href={directionsUrl} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11Z" />
                <circle cx="12" cy="10" r="2.3" />
              </svg>
              {t('cDirections')}
            </a>

            <h2 className="ccard-k ccard-k2">{t('cTransport')}</h2>
            <ul className="transit">
              <li>
                <span className="transit-ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                    <rect x="6" y="6" width="12" height="12" rx="2.5" />
                    <path d="M6 12.5h12M9 18l-1.5 2.5M15 18l1.5 2.5M9 3.5h6M12 3.5V6" />
                    <circle cx="9.3" cy="15.3" r=".7" fill="currentColor" />
                    <circle cx="14.7" cy="15.3" r=".7" fill="currentColor" />
                  </svg>
                </span>
                <span className="transit-body">
                  <span className="transit-stop">
                    {t('cTram')} · {transport.tram.stop}
                  </span>
                  <span className="transit-lines">
                    {transport.tram.lines.map((l) => (
                      <span key={l} className="line-pill">{l}</span>
                    ))}
                    <span className="transit-walk">{t('cWalk').replace('{min}', String(transport.tram.walkMin))}</span>
                  </span>
                </span>
              </li>
              <li>
                <span className="transit-ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="M8 16V8l4 5 4-5v8" />
                  </svg>
                </span>
                <span className="transit-body">
                  <span className="transit-stop">
                    {t('cMetro')} · {transport.metro.stop}
                  </span>
                  <span className="transit-lines">
                    <span className="line-pill line-pill--metro-b">{transport.metro.line}</span>
                    <span className="transit-walk">{t('cWalk').replace('{min}', String(transport.metro.walkMin))}</span>
                  </span>
                </span>
              </li>
            </ul>
          </section>

          {/* ---- Otevírací doba + kontakt ---- */}
          <section className="ccard">
            <h2 className="ccard-k">{t('cHours')}</h2>
            <HoursTable locale={locale} />

            <h2 className="ccard-k ccard-k2">{t('cReach')}</h2>
            <ul className="reach">
              <li>
                <span className="reach-k">{t('cPhone')}</span>
                <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a>
              </li>
              <li>
                <span className="reach-k">{t('cMail')}</span>
                <a href={`mailto:${business.email}`}>{business.email}</a>
              </li>
            </ul>
          </section>
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

        <p className="operator-note">
          {t('cOperator')}: {operator.name} · {t('cIco')} {operator.ico} · {t('cDic')} {operator.dic} · {t('cResponsible')}: {operator.responsible}
        </p>

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
