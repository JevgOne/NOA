'use server';

import { revalidatePath } from 'next/cache';
import { createReview, setReviewStatus, deleteReview } from '@/lib/reviews-db';
import { getAdminKey } from '@/lib/admin';

// Odeslání recenze návštěvníkem — uloží se jako "pending" (čeká na schválení).
export async function submitReview(
  _prev: { ok?: boolean; error?: string },
  formData: FormData,
): Promise<{ ok?: boolean; error?: string }> {
  // Honeypot: skrytý field, který vyplní jen boti.
  if (String(formData.get('website') || '')) return { ok: true };

  const author = String(formData.get('author') || '').trim();
  const rating = Number(formData.get('rating'));
  const body = String(formData.get('body') || '').trim();
  const lang = String(formData.get('lang') || 'cs') === 'en' ? 'en' : 'cs';

  if (author.length < 2 || author.length > 60) return { error: 'name' };
  if (!Number.isFinite(rating) || rating < 1 || rating > 5) return { error: 'rating' };
  if (body.length < 10 || body.length > 1000) return { error: 'body' };

  const ok = await createReview({ author, rating: Math.round(rating), body, lang });
  return ok ? { ok: true } : { error: 'db' };
}

function revalidateReviews() {
  for (const p of ['/cs', '/en', '/cs/recenze', '/en/reviews', '/admin/recenze']) revalidatePath(p);
}

function authorized(formData: FormData): boolean {
  const key = String(formData.get('key') || '');
  const admin = getAdminKey();
  return Boolean(admin) && key === admin;
}

export async function approveReviewAction(formData: FormData): Promise<void> {
  if (!authorized(formData)) return;
  await setReviewStatus(Number(formData.get('id')), 'approved');
  revalidateReviews();
}

export async function deleteReviewAction(formData: FormData): Promise<void> {
  if (!authorized(formData)) return;
  await deleteReview(Number(formData.get('id')));
  revalidateReviews();
}
