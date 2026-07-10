import { type Locale, getT } from '@/lib/i18n';
import { reviews } from '@/lib/reviews';
import { business } from '@/lib/site';

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

export default function Reviews({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const { ratingValue, reviewCount } = business.aggregateRating;

  return (
    <section className="reviews reveal" aria-label={t('reviewsH')}>
      <div className="sec-title">
        <span className="l" />
        <h2>{t('reviewsH')}</h2>
        <span className="l" />
      </div>

      <div className="rating-summary">
        <Stars n={5} />
        <span className="rating-num">{ratingValue.toLocaleString(locale)}</span>
        <span className="rating-count">· {reviewCount}</span>
      </div>

      <div className="review-grid">
        {reviews.map((r) => (
          <figure key={r.textKey} className="review-card">
            <Stars n={r.rating} />
            <blockquote>{t(r.textKey)}</blockquote>
            <figcaption>{r.author}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
