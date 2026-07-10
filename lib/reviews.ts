// Placeholder recenze. Text je v messages (r1..r3), autor + hodnocení zde.
// Nahraď reálnými recenzemi (např. z Google/Instagramu).

export type Review = { author: string; rating: number; textKey: string };

export const reviews: Review[] = [
  { author: 'Tereza N.', rating: 5, textKey: 'r1' },
  { author: 'Marek P.', rating: 5, textKey: 'r2' },
  { author: 'Anna K.', rating: 5, textKey: 'r3' },
];
