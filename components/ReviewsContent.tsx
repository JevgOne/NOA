import { type Locale, getT } from '@/lib/i18n';
import { getApprovedReviews, getAggregate } from '@/lib/reviews-db';
import { reviewsSchema } from '@/lib/seo';
import Footline from '@/components/Footline';
import LeafRule from '@/components/LeafRule';
import JsonLd from '@/components/JsonLd';
import ReviewForm from '@/components/ReviewForm';

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

export default async function ReviewsContent({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const [list, agg] = await Promise.all([getApprovedReviews(), getAggregate()]);
  const schema = reviewsSchema(agg, list);

  const labels = {
    rating: t('fRating'),
    name: t('fName'),
    text: t('fText'),
    submit: t('fSubmit'),
    sending: t('fSending'),
    success: t('fSuccess'),
    errors: { name: t('fErrName'), rating: t('fErrRating'), body: t('fErrBody'), db: t('fErrDb') },
  };

  return (
    <main id="main">
      <div className="container">
        <div className="page-head">
          <LeafRule marginBottom="1rem" />
          <h1>{t('reviewsPageH')}</h1>
        </div>
        <div className="prose" style={{ marginBottom: 'clamp(1.6rem,4vw,2.4rem)' }}>
          <p className="lead">{t('reviewsLead')}</p>
        </div>

        {agg && (
          <div className="rating-summary">
            <Stars n={5} />
            <span className="rating-num">{agg.ratingValue.toLocaleString(locale)}</span>
            <span className="rating-count">· {agg.reviewCount}</span>
          </div>
        )}

        {list.length ? (
          <div className="review-list">
            {list.map((r) => (
              <figure key={r.id} className="review-card">
                <Stars n={r.rating} />
                <blockquote>{r.body}</blockquote>
                <figcaption>{r.author}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <p className="reviews-empty">{t('reviewsEmpty')}</p>
        )}

        <div className="review-form-block">
          <div className="sec-title">
            <span className="l" />
            <h2>{t('formH')}</h2>
            <span className="l" />
          </div>
          <ReviewForm locale={locale} labels={labels} />
        </div>

        <Footline locale={locale} />
      </div>
      {schema && <JsonLd data={schema} />}
    </main>
  );
}
