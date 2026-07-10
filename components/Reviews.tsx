import Link from 'next/link';
import { type Locale, getT, pathFor } from '@/lib/i18n';
import { getApprovedReviews, getAggregate } from '@/lib/reviews-db';

const Star = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 18.9 6.1 21l1.2-6.5L2.5 9.9l6.6-.9L12 2.5Z" />
  </svg>
);

function Stars({ n }: { n: number }) {
  return (
    <span className="stars" aria-hidden="true">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} />
      ))}
    </span>
  );
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

// Home sekce: pár nejnovějších schválených recenzí + odkaz na celou stránku.
export default async function Reviews({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const [list, agg] = await Promise.all([getApprovedReviews(3), getAggregate()]);
  if (!list.length) return null;

  return (
    <section className="reviews reveal" aria-label={t('reviewsH')}>
      <div className="sec-title">
        <span className="l" />
        <h2>{t('reviewsH')}</h2>
        <span className="l" />
      </div>

      {agg && (
        <div className="rating-summary">
          <Stars n={5} />
          <span className="rating-num">{agg.ratingValue.toLocaleString(locale)}</span>
          <span className="rating-count">· {agg.reviewCount}</span>
        </div>
      )}

      <div className="review-grid">
        {list.map((r) => (
          <figure key={r.id} className="review-card">
            <Stars n={r.rating} />
            <blockquote>{r.body}</blockquote>
            <figcaption>
              <span className="review-avatar" aria-hidden="true">{initials(r.author)}</span>
              <span className="review-name">{r.author}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="reviews-cta">
        <Link className="cafe-cta" href={pathFor(locale, 'reviews')}>
          <span>{t('allReviewsCta')}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
