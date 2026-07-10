import crypto from 'node:crypto';

// Přístupový klíč do /admin/recenze.
// Priorita: ADMIN_KEY (pokud je nastavený), jinak se deterministicky odvodí
// z už existující proměnné TURSO_AUTH_TOKEN — takže není potřeba přidávat nic navíc.
export function getAdminKey(): string {
  if (process.env.ADMIN_KEY) return process.env.ADMIN_KEY;
  const token = process.env.TURSO_AUTH_TOKEN;
  if (!token) return '';
  return crypto.createHash('sha256').update(`${token}::noa-admin-v1`).digest('hex').slice(0, 20);
}
