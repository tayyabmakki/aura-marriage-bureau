'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export const Preloader = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const alreadyLoaded = sessionStorage.getItem('aura_preloader_seen');
      if (alreadyLoaded) {
        return;
      }
      setVisible(true);
      sessionStorage.setItem('aura_preloader_seen', 'true');

      // Auto dismiss after 850ms on mobile
      const timer = setTimeout(() => {
        setVisible(false);
      }, 850);
      return () => clearTimeout(timer);
    } catch {
      // Storage blocked or private mode fallback
      setVisible(false);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Loading Aura Marriage Bureau"
      onClick={() => setVisible(false)}
      className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center bg-[#0a0908] transition-opacity duration-300"
    >
      <div className="relative h-20 w-48 animate-pulse sm:h-24 sm:w-60">
        <Image
          src="/images/aura-logo-transparent.png"
          alt="Aura Marriage Bureau"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="mt-4 flex items-center gap-2">
        <div className="h-1 w-1 rounded-full bg-[#d4af61] animate-ping" />
        <span className="font-serif text-xs tracking-widest text-[#ecd290]/80 uppercase">
          Aura Marriage Bureau
        </span>
      </div>
      <span className="mt-3 text-[11px] text-[#a79c82]/60">
        Tap to skip
      </span>
    </div>
  );
};
