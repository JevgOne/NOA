import { getPendingReviews, getApprovedReviews, isDbConfigured } from '@/lib/reviews-db';
import { approveReviewAction, deleteReviewAction } from '@/app/actions/reviews';
import { getAdminKey } from '@/lib/admin';

export const dynamic = 'force-dynamic';

const box: React.CSSProperties = {
  border: '1px solid #d8d2c4',
  borderRadius: 6,
  padding: '1rem 1.1rem',
  marginBottom: '.9rem',
  background: '#fff',
};
const btn: React.CSSProperties = {
  fontSize: '.85rem',
  padding: '.45rem .9rem',
  borderRadius: 5,
  border: '1px solid transparent',
  cursor: 'pointer',
};

function Stars({ n }: { n: number }) {
  return <span style={{ color: '#C69A3A', letterSpacing: 1 }}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>;
}

export default async function AdminReviews({
  searchParams,
}: {
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const key = typeof sp.key === 'string' ? sp.key : '';
  const admin = getAdminKey();
  const authed = Boolean(admin) && key === admin;

  if (!authed) {
    return (
      <main>
        <h1>Admin — recenze</h1>
        {!admin ? (
          <p>
            Chybí databázová konfigurace (<code>TURSO_AUTH_TOKEN</code> / <code>ADMIN_KEY</code>).
          </p>
        ) : (
          <p>Neplatný nebo chybějící klíč v URL.</p>
        )}
      </main>
    );
  }

  const [pending, approved] = await Promise.all([getPendingReviews(), getApprovedReviews()]);

  return (
    <main>
      <h1 style={{ marginBottom: '.3rem' }}>Recenze — moderace</h1>
      {!isDbConfigured() && (
        <p style={{ color: '#a15c00', background: '#fff6e5', padding: '.6rem .8rem', borderRadius: 5 }}>
          ⚠️ Databáze Turso není nastavená (běží lokální/dočasná). Nastav <code>TURSO_DATABASE_URL</code> a{' '}
          <code>TURSO_AUTH_TOKEN</code>.
        </p>
      )}

      <h2 style={{ marginTop: '1.6rem' }}>Čeká na schválení ({pending.length})</h2>
      {pending.length === 0 && <p style={{ color: '#777' }}>Nic ke schválení.</p>}
      {pending.map((r) => (
        <div key={r.id} style={box}>
          <div style={{ marginBottom: '.4rem' }}>
            <strong>{r.author}</strong> · <Stars n={r.rating} />{' '}
            <span style={{ color: '#999', fontSize: '.8rem' }}>({r.lang}, {r.createdAt})</span>
          </div>
          <p style={{ margin: '0 0 .7rem' }}>{r.body}</p>
          <div style={{ display: 'flex', gap: '.5rem' }}>
            <form action={approveReviewAction}>
              <input type="hidden" name="key" value={key} />
              <input type="hidden" name="id" value={r.id} />
              <button style={{ ...btn, background: '#33401F', color: '#fff' }}>Schválit</button>
            </form>
            <form action={deleteReviewAction}>
              <input type="hidden" name="key" value={key} />
              <input type="hidden" name="id" value={r.id} />
              <button style={{ ...btn, background: '#fff', color: '#8A3B36', borderColor: '#8A3B36' }}>Smazat</button>
            </form>
          </div>
        </div>
      ))}

      <h2 style={{ marginTop: '2rem' }}>Schválené ({approved.length})</h2>
      {approved.map((r) => (
        <div key={r.id} style={{ ...box, background: '#fbfaf7' }}>
          <div style={{ marginBottom: '.4rem' }}>
            <strong>{r.author}</strong> · <Stars n={r.rating} />{' '}
            <span style={{ color: '#999', fontSize: '.8rem' }}>({r.lang})</span>
          </div>
          <p style={{ margin: '0 0 .7rem' }}>{r.body}</p>
          <form action={deleteReviewAction}>
            <input type="hidden" name="key" value={key} />
            <input type="hidden" name="id" value={r.id} />
            <button style={{ ...btn, background: '#fff', color: '#8A3B36', borderColor: '#8A3B36' }}>Smazat</button>
          </form>
        </div>
      ))}
    </main>
  );
}
