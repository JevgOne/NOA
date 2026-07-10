'use client';

import Image from 'next/image';
import { useState } from 'react';

const SRC =
  'https://images.unsplash.com/photo-1743091584076-ea57d7aa161f?fm=jpg&q=70&w=900&auto=format&fit=crop';

export default function CafePhoto({ alt }: { alt: string }) {
  const [error, setError] = useState(false);

  return (
    <div className={`cafe-photo${error ? ' noimg' : ''}`}>
      {!error && (
        <Image
          src={SRC}
          alt={alt}
          fill
          sizes="(max-width: 820px) 100vw, 500px"
          style={{ objectFit: 'cover' }}
          loading="lazy"
          onError={() => setError(true)}
        />
      )}
      <div className="frame" />
    </div>
  );
}
