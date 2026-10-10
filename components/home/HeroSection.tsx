import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { SITE_CONFIG } from '@/lib/config';
import { MessageCircle, Phone, FileText, MapPin, Clock, Users, Sparkles } from 'lucide-react';
import { FLAG_MAP } from '@/components/FlagBadges';
import { StarDivider, GoldDustOverlay, GoldWaveDivider } from '@/components/BrandIcons';

export const HeroSection = () => {
  const t = useTranslations('hero');
  const locale = useLocale();
  const prefix = locale === 'ur' ? '/ur' : '';

  // Select hero image based on license flag
  const heroImageSrc = SITE_CONFIG.HERO_PHOTO_LICENSED
    ? '/images/hero-main.webp'
    : '/images/hero-hands.webp';

  return (
    <section className="relative overflow-hidden bg-[#0a0908] pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pb-20">
      {/* Static Gold Dust Overlay */}
      <GoldDustOverlay />

      {/* Hero Background Photo with Safe Gradient Overlay */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden" aria-hidden="true">
        <Image
          src={heroImageSrc}
          alt="Solemn wedding ceremony hands clasping with festive gold glow"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1920px"
          className="object-cover object-[center_30%] opacity-40 md:opacity-35"
        />
        {/* Multilayer gradient for perfect text contrast (55-75% darkness) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0908]/90 via-[#0a0908]/75 to-[#0a0908]" />
      </div>

      <div className="relative z-20 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
        {/* Urdu Hook Line */}
        <div className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(201,162,75,0.25)] bg-[rgba(212,175,97,0.08)] px-4 py-1.5 backdrop-blur-md mb-2">
          <Sparkles className="h-3.5 w-3.5 text-[#d4af61]" />
          <p
            className="font-serif text-base sm:text-lg lg:text-xl font-medium text-[#ecd290]"
            lang="ur"
            dir="rtl"
          >
            {t('urduHook')}
          </p>
        </div>

        {/* H1 Heading */}
        <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#f4ecda] sm:text-5xl lg:text-6xl leading-[1.15] text-center max-w-3xl">
          <span className="block text-gold-gradient">{t('titleLine1')}</span>
          <span className="block">{t('titleLine2')}</span>
        </h1>

        {/* Tagline */}
        <p className="mt-4 font-serif italic text-base text-[#ecd290]/90 sm:text-lg lg:text-xl max-w-2xl mx-auto text-center leading-relaxed">
          &ldquo;{t('tagline')}&rdquo;
        </p>

        <StarDivider className="my-6 sm:my-8" />

        {/* Modernized Luxury Action Buttons (Centered & Harmonized) */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto">
          {/* Primary WhatsApp Button */}
          <a
            href={SITE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-full border border-[#d4af61]/60 bg-gradient-to-r from-[#d4af61] via-[#ecd290] to-[#b88a35] px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-black shadow-[0_8px_24px_rgba(212,175,97,0.32)] hover:shadow-[0_12px_36px_rgba(212,175,97,0.5)] hover:scale-[1.02] transition-all"
          >
            <MessageCircle className="h-4.5 w-4.5 text-[#144f2b] fill-current" />
            <span>{t('ctaWhatsApp')}</span>
          </a>

          {/* Fill Profile Form Button */}
          <Link
            href={`${prefix}/form`}
            className="w-full sm:w-auto inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-full border border-[rgba(201,162,75,0.4)] bg-black/60 px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#ecd290] backdrop-blur-md shadow-sm hover:border-[#d4af61] hover:bg-[#d4af61]/15 hover:text-white hover:scale-[1.02] transition-all"
          >
            <FileText className="h-4 w-4 text-[#d4af61]" />
            <span>{t('ctaForm')}</span>
          </Link>

          {/* Call Consultant Button */}
          <a
            href={`tel:${SITE_CONFIG.phoneRaw}`}
            className="w-full sm:w-auto inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-[rgba(201,162,75,0.25)] bg-black/40 px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#f4ecda] backdrop-blur-md hover:border-[#d4af61]/50 hover:bg-white/5 hover:text-[#ecd290] transition-all"
          >
            <Phone className="h-4 w-4 text-[#d4af61]" />
            <span>{t('ctaCall')}</span>
          </a>
        </div>

        {/* Factual Proof Strip */}
        <div className="mt-10 w-full max-w-3xl rounded-2xl border border-[rgba(201,162,75,0.22)] bg-black/60 p-4 backdrop-blur-md sm:p-6 text-center">
          {/* Countries served flag row */}
          <div className="mb-4 text-center">
            <span className="text-xs uppercase tracking-widest text-[#a79c82] block text-center">
              {t('countriesLabel')}
            </span>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {SITE_CONFIG.countriesServed.map((c) => {
                const Flag = FLAG_MAP[c.code];
                return (
                  <div
                    key={c.code}
                    className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[rgba(201,162,75,0.2)] bg-[#16130f]/80 px-3 py-1.5 text-xs text-[#f4ecda]"
                  >
                    {Flag && <Flag className="h-4.5 w-4.5" />}
                    <span>{locale === 'ur' ? c.nameUr : c.nameEn}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-3 border-t border-[rgba(201,162,75,0.15)] text-xs text-[#a79c82] sm:grid-cols-3">
            <a
              href={SITE_CONFIG.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-[#a79c82] hover:text-[#ecd290] transition-colors group"
              title="View office location on Google Maps (opens in new tab)"
            >
              <MapPin className="h-4 w-4 text-[#d4af61] group-hover:scale-110 transition-transform" />
              <span className="group-hover:underline">{t('proofCity')} ↗</span>
            </a>
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4 text-[#d4af61]" />
              <span>
                <bdi dir="ltr">
                  {locale === 'ur' ? SITE_CONFIG.openingHoursDisplayUr : SITE_CONFIG.openingHoursDisplay}
                </bdi>
              </span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Users className="h-4 w-4 text-[#d4af61]" />
              <span>{t('proofGuardian')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Wave Edge Motif */}
      <div className="mt-8">
        <GoldWaveDivider />
      </div>
    </section>
  );
};
