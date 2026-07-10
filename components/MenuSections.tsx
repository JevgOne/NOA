import { type Locale, getT } from '@/lib/i18n';

const LeafSmall = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
    <path d="M12 3C7 6 5 11 5 15c0 3 2 6 7 6 0-6 0-12 0-18Z" />
  </svg>
);

export default function MenuSections({ locale, leadingRule = false }: { locale: Locale; leadingRule?: boolean }) {
  const t = getT(locale);

  return (
    <>
      {leadingRule && (
        <div className="menu-open reveal">
          <div className="leafrule">
            <span className="l" />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
              <path d="M12 3C7 6 5 11 5 15c0 3 2 6 7 6 0-6 0-12 0-18Z" />
              <path d="M12 6c3 2 4 5 4 8" />
            </svg>
            <span className="l" />
          </div>
        </div>
      )}

      {/* ---- Classic Matcha ---- */}
      <div className="sec-title reveal">
        <span className="l" />
        <h2>{t('classic')}</h2>
        <span className="l" />
      </div>
      <div className="grid4 reveal">
        <div className="item">
          <h3>{t('m1n')}</h3>
          <div className="badge">{t('m1b')}</div>
          <div className="desc">{t('m1d')}</div>
          <div className="price">109 <small>Kč</small></div>
        </div>
        <div className="item">
          <h3>{t('m2n')}</h3>
          <div className="cz">{t('m2c')}</div>
          <div className="desc">{t('m2d')}</div>
          <div className="price">129 <small>Kč</small></div>
        </div>
        <div className="item">
          <h3>{t('m3n')}</h3>
          <div className="cz">{t('m3c')}</div>
          <div className="desc">{t('m3d')}</div>
          <div className="price">129 <small>Kč</small></div>
        </div>
        <div className="item">
          <h3>{t('m4n')}</h3>
          <div className="cz">{t('m4c')}</div>
          <div className="desc">{t('m4d')}</div>
          <div className="price">129 <small>Kč</small></div>
        </div>
      </div>

      {/* ---- Signature Matcha ---- */}
      <div className="sec-title reveal">
        <span className="l" />
        <h2>{t('signature')}</h2>
        <span className="l" />
      </div>
      <div className="grid3 reveal">
        <div className="item reveal">
          <div className="ico ico-cup">
            <svg viewBox="0 0 64 72" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 26h28l-3 38a6 6 0 0 1-6 5H27a6 6 0 0 1-6-5Z" />
              <path d="M18 34h28" />
              <ellipse cx="32" cy="26" rx="14" ry="4" fill="currentColor" fillOpacity=".08" />
              <path d="M22 20c-3 0-5-2-5-4s2-4 4.5-3.8A7 7 0 0 1 34 9a5.5 5.5 0 0 1 5.5 5.5c2 0 3.5 1.4 3.5 3.3S41.5 20 39.5 20Z" fill="currentColor" fillOpacity=".12" />
              <path d="M25 44v14M32 42v18M39 44v14" strokeOpacity=".5" />
            </svg>
          </div>
          <h3>{t('s1n')}</h3>
          <div className="desc">{t('s1d')}</div>
          <div className="price">149 <small>Kč</small></div>
        </div>
        <div className="item reveal">
          <div className="ico ico-cup">
            <svg viewBox="0 0 64 72" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 30h24l-3 34a6 6 0 0 1-6 5H29a6 6 0 0 1-6-5Z" />
              <path d="M20 37h24" />
              <path d="M44 40c5 0 8 2 8 6s-4 5-7 5" />
              <g transform="translate(32 20)" strokeOpacity=".85">
                <circle cx="0" cy="0" r="2.4" fill="currentColor" fillOpacity=".15" />
                <path d="M0-9C2.5-5 2.5-2.5 0 0M0 9C-2.5 5-2.5 2.5 0 0M-9 0C-5 2.5-2.5 2.5 0 0M9 0C5-2.5 2.5-2.5 0 0M-6.4-6.4C-3.5-3.5-2-2-1-1M6.4 6.4C3.5 3.5 2 2 1 1M6.4-6.4C3.5-3.5 2-2 1-1M-6.4 6.4C-3.5 3.5-2 2-1 1" />
              </g>
            </svg>
          </div>
          <h3>{t('s2n')}</h3>
          <div className="desc">{t('s2d')}</div>
          <div className="price">129 <small>Kč</small></div>
        </div>
        <div className="item reveal">
          <div className="ico ico-cup">
            <svg viewBox="0 0 64 72" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 30h24l-3 34a6 6 0 0 1-6 5H29a6 6 0 0 1-6-5Z" />
              <path d="M20 37h24" />
              <path d="M44 40c5 0 8 2 8 6s-4 5-7 5" />
              <path d="M32 8c-3 5-6 8-6 12a6 6 0 0 0 12 0c0-4-3-7-6-12Z" fill="currentColor" fillOpacity=".14" />
              <path d="M32 13v11" strokeOpacity=".7" />
              <circle cx="26" cy="45" r="1" fill="currentColor" />
              <circle cx="38" cy="48" r="1" fill="currentColor" />
              <circle cx="32" cy="43" r="1" fill="currentColor" />
            </svg>
          </div>
          <h3>{t('s3n')}</h3>
          <div className="desc">{t('s3d')}</div>
          <div className="price">139 <small>Kč</small></div>
        </div>
      </div>

      {/* ---- boyfriends coffee box ---- */}
      <div className="bfbox reveal">
        <div className="bftitle">
          <LeafSmall />
          <span>{t('bftitle')}</span>
          <LeafSmall />
        </div>
        <div className="bfcols">
          <div className="bfrow"><span className="n">{t('bf1')}</span><span className="d" /><span className="p">59 <small>Kč</small></span></div>
          <div className="bfrow"><span className="n">{t('bf6')}</span><span className="d" /><span className="p">99 <small>Kč</small></span></div>
          <div className="bfrow"><span className="n">{t('bf2')}</span><span className="d" /><span className="p">79 <small>Kč</small></span></div>
          <div className="bfrow"><span className="n">{t('bf7')}</span><span className="d" /><span className="p">109 <small>Kč</small></span></div>
          <div className="bfrow"><span className="n">{t('bf3')}</span><span className="d" /><span className="p">69 <small>Kč</small></span></div>
          <div className="bfrow"><span className="n">{t('bf8')}</span><span className="d" /><span className="p">109 <small>Kč</small></span></div>
          <div className="bfrow"><span className="n">{t('bf4')}</span><span className="d" /><span className="p">89 <small>Kč</small></span></div>
          <div className="bfrow"><span className="n">{t('bf9')}</span><span className="d" /><span className="p">119 <small>Kč</small></span></div>
          <div className="bfrow"><span className="n">{t('bf5')}</span><span className="d" /><span className="p">99 <small>Kč</small></span></div>
        </div>
      </div>
    </>
  );
}
