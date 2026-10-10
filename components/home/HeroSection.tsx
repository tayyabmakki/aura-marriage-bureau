import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { SITE_CONFIG } from '@/lib/config';
import { MessageCircle, Phone, FileText, MapPin, Clock, Users } from 'lucide-react';
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
    <section className="relative overflow-hidden bg-[#0a0908] pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pb-20">
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

      <div className="relative z-20 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Urdu Hook Line */}
        <p
          className="font-serif text-lg font-medium text-[#ecd290] sm:text-xl lg:text-2xl"
          lang="ur"
          dir="rtl"
        >
          {t('urduHook')}
        </p>

        {/* H1 Heading */}
        <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#f4ecda] sm:text-5xl lg:text-6xl leading-[1.15]">
          <span className="block text-gold-gradient">{t('titleLine1')}</span>
          <span className="block">{t('titleLine2')}</span>
        </h1>

        {/* Tagline */}
        <p className="mt-4 font-serif italic text-base text-[#ecd290]/90 sm:text-lg lg:text-xl max-w-2xl mx-auto">
          &ldquo;{t('tagline')}&rdquo;
        </p>

        <StarDivider className="my-6 sm:my-8" />

        {/* Stacked CTAs for Mobile (Touch targets >= 48px) */}
        <div className="mx-auto flex max-w-md flex-col gap-3 sm:max-w-xl sm:flex-row sm:justify-center">
          <a
            href={SITE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold w-full text-base font-semibold shadow-md sm:w-auto"
          >
            <MessageCircle className="me-2 h-5 w-5" />
            {t('ctaWhatsApp')}
          </a>

          <a
            href={`tel:${SITE_CONFIG.phoneRaw}`}
            className="btn-line w-full text-base font-semibold sm:w-auto"
          >
            <Phone className="me-2 h-4 w-4" />
            {t('ctaCall')}
          </a>

          <Link
            href={`${prefix}/form`}
            className="btn-line w-full text-base font-semibold sm:w-auto border-[#d4af61]/60 text-[#ecd290]"
          >
            <FileText className="me-2 h-4 w-4" />
            {t('ctaForm')}
          </Link>
        </div>

        {/* Factual Proof Strip */}
        <div className="mt-10 rounded-2xl border border-[rgba(201,162,75,0.22)] bg-black/60 p-4 backdrop-blur-md sm:p-6">
          {/* Countries served flag row (horizontal scroll on mobile, marquee/flex on lg) */}
          <div className="mb-4">
            <span className="text-xs uppercase tracking-widest text-[#a79c82]">
              {t('countriesLabel')}
            </span>
            <div className="mt-2.5 flex items-center justify-start gap-3 overflow-x-auto pb-2 scrollbar-none sm:justify-center">
              {SITE_CONFIG.countriesServed.map((c) => {
                const Flag = FLAG_MAP[c.code];
                return (
                  <div
                    key={c.code}
                    className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[rgba(201,162,75,0.2)] bg-[#16130f]/80 px-3 py-1.5 text-xs text-[#f4ecda]"
                  >
                    {Flag && <Flag className="h-5 w-5" />}
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
