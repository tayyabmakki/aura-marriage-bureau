import React from 'react';
import { useTranslations } from 'next-intl';
import { SITE_CONFIG } from '@/lib/config';
import { Instagram, Facebook, AtSign } from 'lucide-react';

export const FollowUsSection = () => {
  const t = useTranslations('follow');

  return (
    <section className="relative bg-[#0d0b09] py-12 border-t border-[rgba(201,162,75,0.18)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs uppercase tracking-widest text-[#ecd290]">
          {t('eyebrow')}
        </p>
        <h2 className="mt-2 font-serif text-2xl font-bold text-[#f4ecda] sm:text-3xl">
          {t('title')}
        </h2>
        <p className="mt-2 text-sm text-[#a79c82] max-w-lg mx-auto">
          {t('desc')}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* Instagram */}
          <a
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Aura on Instagram"
            className="btn-line inline-flex items-center gap-2 text-xs sm:text-sm font-medium py-2.5 px-4"
          >
            <Instagram className="h-4 w-4 text-[#ecd290]" />
            <span>{SITE_CONFIG.instagramHandle}</span>
          </a>

          {/* Threads */}
          <a
            href={SITE_CONFIG.threadsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Aura on Threads"
            className="btn-line inline-flex items-center gap-2 text-xs sm:text-sm font-medium py-2.5 px-4"
          >
            <AtSign className="h-4 w-4 text-[#ecd290]" />
            <span>{SITE_CONFIG.threadsHandle}</span>
          </a>

          {/* Facebook */}
          <a
            href={SITE_CONFIG.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Aura on Facebook"
            className="btn-line inline-flex items-center gap-2 text-xs sm:text-sm font-medium py-2.5 px-4"
          >
            <Facebook className="h-4 w-4 text-[#ecd290]" />
            <span>{SITE_CONFIG.facebookName}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
