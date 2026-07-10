'use client';

import { useActionState, useState } from 'react';
import { submitReview } from '@/app/actions/reviews';

type SubmitState = { ok?: boolean; error?: string };

export type ReviewFormLabels = {
  rating: string;
  name: string;
  text: string;
  submit: string;
  sending: string;
  success: string;
  errors: { name: string; rating: string; body: string; db: string };
};

const StarSvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 18.9 6.1 21l1.2-6.5L2.5 9.9l6.6-.9L12 2.5Z" />
  </svg>
);

export default function ReviewForm({ locale, labels }: { locale: string; labels: ReviewFormLabels }) {
  const [state, action, pending] = useActionState(submitReview, {} as SubmitState);
  const [rating, setRating] = useState(0);

  if (state.ok) {
    return <p className="form-success" role="status">{labels.success}</p>;
  }

  const errMsg = state.error ? labels.errors[state.error as keyof ReviewFormLabels['errors']] : null;

  return (
    <form action={action} className="review-form">
      <input type="hidden" name="lang" value={locale} />
      {/* honeypot proti botům — skrytý, lidé nevyplní */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />

      <div className="field">
        <span className="field-label">{labels.rating}</span>
        <div className="star-input" role="radiogroup" aria-label={labels.rating}>
          {[1, 2, 3, 4, 5].map((v) => (
            <button
              type="button"
              key={v}
              className={`star-btn${v <= rating ? ' on' : ''}`}
              onClick={() => setRating(v)}
              aria-label={String(v)}
              aria-pressed={v === rating}
            >
              <StarSvg />
            </button>
          ))}
        </div>
        <input type="hidden" name="rating" value={rating} />
      </div>

      <div className="field">
        <label htmlFor="rf-name">{labels.name}</label>
        <input id="rf-name" name="author" type="text" maxLength={60} required />
      </div>

      <div className="field">
        <label htmlFor="rf-body">{labels.text}</label>
        <textarea id="rf-body" name="body" rows={4} maxLength={1000} required />
      </div>

      {errMsg && <p className="form-error" role="alert">{errMsg}</p>}

      <button type="submit" className="reserve-cta" disabled={pending}>
        {pending ? labels.sending : labels.submit}
      </button>
    </form>
  );
}
