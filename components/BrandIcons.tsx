import React from 'react';
import Image from 'next/image';

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

export const SvgWaveDivider = ({ className = "" }: { className?: string }) => (
  <svg
    className={`w-full h-10 sm:h-14 block select-none ${className}`}
    viewBox="0 0 1440 56"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="wg" x1="0" x2="1">
        <stop offset="0" stopColor="#b88a35" stopOpacity="0" />
        <stop offset=".5" stopColor="#ecd290" />
        <stop offset="1" stopColor="#b88a35" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d="M0 30C300 62 560 6 860 22S1260 50 1440 20V56H0Z" fill="#0a0908" />
    <path d="M0 30C300 62 560 6 860 22S1260 50 1440 20" fill="none" stroke="url(#wg)" strokeWidth="1.6" />
  </svg>
);

export const GoldDustOverlay = () => (
  <div
    className="pointer-events-none absolute inset-0 z-10 select-none overflow-hidden"
    aria-hidden="true"
  >
    <Image
      src="/images/fx-gold-dust.webp"
      alt=""
      fill
      sizes="100vw"
      className="object-cover opacity-35 mix-blend-screen"
    />
  </div>
);

export const GoldWaveDivider = ({ flip = false }: { flip?: boolean }) => (
  <div
    className={`pointer-events-none relative h-12 md:h-20 w-full overflow-hidden select-none ${
      flip ? "rotate-180" : ""
    }`}
    aria-hidden="true"
  >
    <Image
      src="/images/fx-gold-wave.webp"
      alt=""
      fill
      sizes="100vw"
      className="object-cover opacity-60 mix-blend-screen"
    />
  </div>
);
