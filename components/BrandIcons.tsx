import React from 'react';

export const StarDivider = ({ className = "my-6" }: { className?: string }) => (
  <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
    <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9a24b]/40" />
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#ecd290]">
      <path
        d="M12 2L13.8 9.2L21 11L13.8 12.8L12 20L10.2 12.8L3 11L10.2 9.2L12 2Z"
        fill="currentColor"
      />
    </svg>
    <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9a24b]/40" />
  </div>
);

export const GoldDustOverlay = () => (
  <div
    className="pointer-events-none absolute inset-0 z-10 select-none overflow-hidden"
    aria-hidden="true"
  >
    <picture>
      <source srcSet="/images/fx-gold-dust.avif" type="image/avif" />
      <source srcSet="/images/fx-gold-dust.webp" type="image/webp" />
      <img
        src="/images/fx-gold-dust.webp"
        alt=""
        className="h-full w-full object-cover opacity-35 mix-blend-screen"
        loading="lazy"
        decoding="async"
      />
    </picture>
  </div>
);

export const GoldWaveDivider = ({ flip = false }: { flip?: boolean }) => (
  <div
    className={`pointer-events-none relative w-full overflow-hidden select-none ${
      flip ? "rotate-180" : ""
    }`}
    aria-hidden="true"
  >
    <picture>
      <source srcSet="/images/fx-gold-wave.avif" type="image/avif" />
      <source srcSet="/images/fx-gold-wave.webp" type="image/webp" />
      <img
        src="/images/fx-gold-wave.webp"
        alt=""
        className="h-12 md:h-20 w-full object-cover opacity-60 mix-blend-screen"
        loading="lazy"
        decoding="async"
      />
    </picture>
  </div>
);
