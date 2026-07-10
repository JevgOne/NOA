import { createClient, type Client } from '@libsql/client';

// Turso (libSQL). Lokálně bez env se použije soubor local.db (pro vývoj/testy).
// Na produkci nastav TURSO_DATABASE_URL + TURSO_AUTH_TOKEN (viz README).

let client: Client | null = null;
let ready: Promise<void> | null = null;

// Seed = ukázkové schválené recenze (placeholder — smaž po přidání reálných).
const SEED = [
  { author: 'Tereza N.', rating: 5, body: 'Nejlepší matcha, jakou jsem v Praze měla. Krémová, sytá a připravená s péčí. Chodím sem každý týden.' },
  { author: 'Marek P.', rating: 5, body: 'Klidné místo s neuvěřitelnou atmosférou. Coconut Cloud Matcha je zážitek sám o sobě.' },
  { author: 'Anna K.', rating: 5, body: 'Konečně kavárna, kde matcha není jen módní doplněk, ale hlavní hvězda. Doporučuji všem.' },
];

function getClient(): Client | null {
  if (client) return client;
  const url = process.env.TURSO_DATABASE_URL || 'file:local.db';
  try {
    client = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });
  } catch {
    return null;
  }
  return client;
}

// Zajistí schéma (a jednorázový seed). Při chybě (např. bez DB na produkci) vrátí null.
export async function ensureDb(): Promise<Client | null> {
  const c = getClient();
  if (!c) return null;
  if (!ready) {
    ready = (async () => {
      await c.execute(`CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        author TEXT NOT NULL,
        rating INTEGER NOT NULL,
        body TEXT NOT NULL,
        lang TEXT NOT NULL DEFAULT 'cs',
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`);
      const cnt = await c.execute(`SELECT COUNT(*) AS n FROM reviews`);
      if (Number(cnt.rows[0].n) === 0) {
        for (const s of SEED) {
          await c.execute({
            sql: `INSERT INTO reviews (author, rating, body, lang, status) VALUES (?, ?, ?, 'cs', 'approved')`,
            args: [s.author, s.rating, s.body],
          });
        }
      }
    })();
  }
  try {
    await ready;
    return c;
  } catch {
    ready = null; // umožni pozdější retry (po nastavení env / restartu)
    return null;
  }
}
