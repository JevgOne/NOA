// Struktura menu — pořadí odpovídá 1:1 prototypu. Ceny v Kč.
// Názvy/popisy se berou z messages/{locale}.json podle klíčů (viz `id`).

export type Drink = { id: string; price: number };

export const classic: Drink[] = [
  { id: 'm1', price: 109 },
  { id: 'm2', price: 129 },
  { id: 'm3', price: 129 },
  { id: 'm4', price: 129 },
];

export const signature: Drink[] = [
  { id: 's1', price: 149 },
  { id: 's2', price: 129 },
  { id: 's3', price: 139 },
];

// "boyfriends" káva — pořadí v boxu je prokládané (levý/pravý sloupec).
export const boyfriends: Drink[] = [
  { id: 'bf1', price: 59 },
  { id: 'bf2', price: 79 },
  { id: 'bf3', price: 69 },
  { id: 'bf4', price: 89 },
  { id: 'bf5', price: 99 },
  { id: 'bf6', price: 99 },
  { id: 'bf7', price: 109 },
  { id: 'bf8', price: 109 },
  { id: 'bf9', price: 119 },
];

// Vizuální pořadí řádků v boxu (prokládané do dvou sloupců) — přesně jako v prototypu.
export const boyfriendsOrder = ['bf1', 'bf6', 'bf2', 'bf7', 'bf3', 'bf8', 'bf4', 'bf9', 'bf5'];
