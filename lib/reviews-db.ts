import { ensureDb } from '@/lib/db';

export type Review = {
  id: number;
  author: string;
  rating: number;
  body: string;
  lang: string;
  status: 'pending' | 'approved';
  createdAt: string;
};

export type Aggregate = { ratingValue: number; reviewCount: number };

/* eslint-disable @typescript-eslint/no-explicit-any */
function rowToReview(r: any): Review {
  return {
    id: Number(r.id),
    author: String(r.author),
    rating: Number(r.rating),
    body: String(r.body),
    lang: String(r.lang),
    status: r.status as Review['status'],
    createdAt: String(r.created_at),
  };
}

export async function getApprovedReviews(limit?: number): Promise<Review[]> {
  const c = await ensureDb();
  if (!c) return [];
  try {
    const sql = `SELECT * FROM reviews WHERE status = 'approved' ORDER BY created_at DESC${limit ? ` LIMIT ${Number(limit)}` : ''}`;
    const res = await c.execute(sql);
    return res.rows.map(rowToReview);
  } catch {
    return [];
  }
}

export async function getAggregate(): Promise<Aggregate | null> {
  const c = await ensureDb();
  if (!c) return null;
  try {
    const res = await c.execute(`SELECT COUNT(*) AS n, AVG(rating) AS avg FROM reviews WHERE status = 'approved'`);
    const n = Number(res.rows[0].n);
    if (!n) return null;
    return { ratingValue: Math.round(Number(res.rows[0].avg) * 10) / 10, reviewCount: n };
  } catch {
    return null;
  }
}

export async function createReview(input: {
  author: string;
  rating: number;
  body: string;
  lang: string;
}): Promise<boolean> {
  const c = await ensureDb();
  if (!c) return false;
  try {
    await c.execute({
      sql: `INSERT INTO reviews (author, rating, body, lang, status) VALUES (?, ?, ?, ?, 'pending')`,
      args: [input.author, input.rating, input.body, input.lang],
    });
    return true;
  } catch {
    return false;
  }
}

export async function getPendingReviews(): Promise<Review[]> {
  const c = await ensureDb();
  if (!c) return [];
  try {
    const res = await c.execute(`SELECT * FROM reviews WHERE status = 'pending' ORDER BY created_at ASC`);
    return res.rows.map(rowToReview);
  } catch {
    return [];
  }
}

export async function setReviewStatus(id: number, status: 'approved' | 'pending'): Promise<void> {
  const c = await ensureDb();
  if (!c) return;
  try {
    await c.execute({ sql: `UPDATE reviews SET status = ? WHERE id = ?`, args: [status, id] });
  } catch {
    /* ignore */
  }
}

export async function deleteReview(id: number): Promise<void> {
  const c = await ensureDb();
  if (!c) return;
  try {
    await c.execute({ sql: `DELETE FROM reviews WHERE id = ?`, args: [id] });
  } catch {
    /* ignore */
  }
}

export function isDbConfigured(): boolean {
  return Boolean(process.env.TURSO_DATABASE_URL);
}
