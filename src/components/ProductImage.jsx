import { useState } from 'react';
import { imageFor } from '../data/productImages.js';

// Real product photo with a graceful colored fallback if the image is missing.
export default function ProductImage({ id, name, colors, className = '', eager = false }) {
  const src = imageFor(id);
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    const c = colors || { a: '#e6e4d8', b: '#cfcbb8' };
    return (
      <span className={`prod-fallback ${className}`} aria-label={name} role="img"
        style={{ background: `linear-gradient(150deg, ${c.a}, ${c.b})` }}>
        {(name || '?').charAt(0)}
      </span>
    );
  }

  return (
    <img
      className={`prod-img ${className}`}
      src={src}
      alt={name}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
