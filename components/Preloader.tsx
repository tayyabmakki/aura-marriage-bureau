'use client';

import React, { useState, useEffect } from 'react';
import { BrandLogo } from '@/components/BrandLogo';

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
      className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center bg-[#0a0908] backdrop-blur-xl transition-all duration-700 select-none animate-fadeIn"
    >
      {/* Subtle radial gold background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,97,0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Unified Brand Logo Component */}
        <BrandLogo
          size="xl"
          layout="vertical"
          asLink={false}
          priority
        />

        <p className="mt-2 font-tagline italic text-sm text-[#a79c82]">
          Where Destinies Align &amp; Aura’s Connect
        </p>

        <span className="mt-6 rounded-full border border-[rgba(201,162,75,0.2)] bg-black/40 px-3 py-1 text-xs tracking-wider text-[#a79c82]/80 transition hover:text-[#ecd290]">
          Tap anywhere to enter
        </span>
      </div>
    </div>
  );
};
