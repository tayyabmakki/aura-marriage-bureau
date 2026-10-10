import React from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { StarDivider } from '@/components/BrandIcons';

export const MosaicSection = () => {
  const t = useTranslations('mosaic');
  const locale = useLocale();

  const moments = [
    {
      step: '01',
      tag: t('step1Tag'),
      title: t('step1Title'),
      titleUr: t('step1Ur'),
      src: '/images/mosaic-families.webp',
      alt: t('altFamilies'),
      brighten: true,
    },
    {
      step: '02',
      tag: t('step4Tag'),
      title: t('step4Title'),
      titleUr: t('step4Ur'),
      src: '/images/mosaic-nikah.webp',
      alt: t('altNikah'),
    },
    {
      step: '03',
      tag: t('step3Tag'),
      title: t('step3Title'),
      titleUr: t('step3Ur'),
      src: '/images/mosaic-mehndi.webp',
      alt: t('altMehndi'),
      isCenterpiece: true,
    },
    {
      step: '04',
      tag: t('step2Tag'),
      title: t('step2Title'),
      titleUr: t('step2Ur'),
      src: '/images/mosaic-blessing.webp',
      alt: t('altBlessing'),
    },
    {
      step: '05',
      tag: t('step5Tag'),
      title: t('step5Title'),
      titleUr: t('step5Ur'),
      src: '/images/mosaic-venue.webp',
      alt: t('altVenue'),
    },
  ];

  const cardFamilies = moments[0];
  const cardNikah = moments[1];
  const cardMehndi = moments[2];
  const cardBlessing = moments[3];
  const cardVenue = moments[4];

  const renderCardContent = (
    item: (typeof moments)[number],
    isFeatured = false
  ) => (
    <>
      <Image
        src={item.src}
        alt={item.alt}
        fill
        loading="lazy"
        sizes={
          isFeatured
            ? '(max-width: 768px) 100vw, 400px'
            : '(max-width: 768px) 50vw, 360px'
        }
        className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
          item.brighten ? 'brightness-[1.08] contrast-[1.05]' : ''
        }`}
      />

      {/* Multi-tier luxury vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/10 pointer-events-none transition-opacity duration-500 group-hover:via-black/20" />

      {/* Elegant double-hairline border frame */}
      <div className="pointer-events-none absolute inset-2.5 rounded-xl border border-[rgba(201,162,75,0.2)] transition-colors duration-500 group-hover:border-[#d4af61]/60" />

      {/* Top Floating Badge for Featured Centerpiece */}
      {isFeatured && (
        <div className="absolute top-4 start-4 z-20 flex items-center gap-1.5 rounded-full border border-[#d4af61]/50 bg-black/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#ecd290] backdrop-blur-md shadow-lg">
          <span className="text-[#ecd290]">✦</span>
          <span>{item.tag}</span>
        </div>
      )}

      {/* Bottom Editorial Caption */}
      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="rounded-full bg-[#d4af61]/25 px-2 py-0.5 font-mono text-[10px] font-bold text-[#ecd290] border border-[#d4af61]/40">
            {item.step}
          </span>
          <span className="text-[10.5px] uppercase tracking-wider text-[#cfc4a8] font-medium">
            {item.tag}
          </span>
        </div>

        <h3 className="font-serif text-base sm:text-lg font-semibold text-[#f4ecda] leading-snug transition-colors group-hover:text-[#ecd290]">
          {item.title}
        </h3>

        <p
          className="urdu-text text-xs text-[#d4af61]/90 mt-0.5 line-clamp-1"
          dir="rtl"
        >
          {item.titleUr}
        </p>
      </div>
    </>
  );

  return (
    <section className="relative overflow-hidden bg-[#0a0908] py-18 sm:py-24 lg:py-28">
      {/* Subtle Warm Golden Ambient Radial Backlight */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[700px] rounded-full bg-[#d4af61]/5 blur-[130px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Curated Editorial Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[#ecd290] font-semibold">
            {t('eyebrow')}
          </p>
          <h2 className="mt-2.5 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f4ecda] tracking-tight">
            {t('title')}
          </h2>
          <p className="mt-2.5 font-serif text-base sm:text-lg text-[#d4af61]" lang="ur" dir="rtl">
            {t('urduSubtitle')}
          </p>
          <StarDivider className="my-5" />
        </div>

        {/* 1. Desktop & Tablet (md+): Symmetrical Triptych Bento with Zero Gaps */}
        <div className="mt-10 hidden md:grid md:grid-cols-3 md:gap-5 md:h-[620px] lg:h-[660px]">
          {/* Left Column: Two Stacked Intimate Moments (Families + Blessing) */}
          <div className="flex flex-col gap-5 h-full">
            <div className="group relative flex-1 overflow-hidden rounded-2xl border border-[rgba(201,162,75,0.25)] bg-[#16130f] shadow-2xl transition-all duration-500 hover:border-[#d4af61]/70 hover:shadow-[0_12px_36px_rgba(212,175,97,0.12)]">
              {renderCardContent(cardFamilies)}
            </div>
            <div className="group relative flex-1 overflow-hidden rounded-2xl border border-[rgba(201,162,75,0.25)] bg-[#16130f] shadow-2xl transition-all duration-500 hover:border-[#d4af61]/70 hover:shadow-[0_12px_36px_rgba(212,175,97,0.12)]">
              {renderCardContent(cardBlessing)}
            </div>
          </div>

          {/* Center Column: Tall Majestic Focal Anchor (Auspicious Traditions) */}
          <div className="h-full">
            <div className="group relative h-full overflow-hidden rounded-2xl border-2 border-[#d4af61]/45 bg-[#16130f] shadow-[0_20px_50px_rgba(0,0,0,0.9)] transition-all duration-500 hover:border-[#ecd290] hover:shadow-[0_20px_50px_rgba(212,175,97,0.22)]">
              {renderCardContent(cardMehndi, true)}
            </div>
          </div>

          {/* Right Column: Two Stacked Ceremonial Moments (Nikah + Venue) */}
          <div className="flex flex-col gap-5 h-full">
            <div className="group relative flex-1 overflow-hidden rounded-2xl border border-[rgba(201,162,75,0.25)] bg-[#16130f] shadow-2xl transition-all duration-500 hover:border-[#d4af61]/70 hover:shadow-[0_12px_36px_rgba(212,175,97,0.12)]">
              {renderCardContent(cardNikah)}
            </div>
            <div className="group relative flex-1 overflow-hidden rounded-2xl border border-[rgba(201,162,75,0.25)] bg-[#16130f] shadow-2xl transition-all duration-500 hover:border-[#d4af61]/70 hover:shadow-[0_12px_36px_rgba(212,175,97,0.12)]">
              {renderCardContent(cardVenue)}
            </div>
          </div>
        </div>

        {/* 2. Mobile (< md): Curated 1-Hero + 2x2 Clean Balanced Layout */}
        <div className="mt-8 space-y-3.5 md:hidden">
          {/* Featured Hero on Mobile */}
          <div className="group relative aspect-[16/11] overflow-hidden rounded-2xl border-2 border-[#d4af61]/45 bg-[#16130f] shadow-xl">
            {renderCardContent(cardMehndi, true)}
          </div>

          {/* 2x2 Grid with Equal Aspect Ratios and Zero Gaps */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-[rgba(201,162,75,0.25)] bg-[#16130f]">
              {renderCardContent(cardFamilies)}
            </div>
            <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-[rgba(201,162,75,0.25)] bg-[#16130f]">
              {renderCardContent(cardNikah)}
            </div>
            <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-[rgba(201,162,75,0.25)] bg-[#16130f]">
              {renderCardContent(cardBlessing)}
            </div>
            <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-[rgba(201,162,75,0.25)] bg-[#16130f]">
              {renderCardContent(cardVenue)}
            </div>
          </div>
        </div>

        {/* Factual Disclaimer */}
        <p className="mt-8 text-center text-xs text-[#a79c82]">
          {t('disclaimer')}
        </p>
      </div>
    </section>
  );
};
