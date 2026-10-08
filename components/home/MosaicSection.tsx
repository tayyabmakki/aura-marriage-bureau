import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export const MosaicSection = () => {
  const t = useTranslations('mosaic');

  const photos = [
    {
      src: '/images/mosaic-families.webp',
      alt: t('altFamilies'),
      aspect: 'aspect-[4/3]',
      brighten: true,
      colSpan: 'col-span-2 sm:col-span-1',
    },
    {
      src: '/images/mosaic-mehndi.webp',
      alt: t('altMehndi'),
      aspect: 'aspect-[3/4]',
      colSpan: 'col-span-1',
    },
    {
      src: '/images/mosaic-nikah.webp',
      alt: t('altNikah'),
      aspect: 'aspect-square',
      colSpan: 'col-span-1',
    },
    {
      src: '/images/mosaic-blessing.webp',
      alt: t('altBlessing'),
      aspect: 'aspect-[3/4]',
      colSpan: 'col-span-1',
    },
    {
      src: '/images/mosaic-venue.webp',
      alt: t('altVenue'),
      aspect: 'aspect-[16/9]',
      colSpan: 'col-span-2 sm:col-span-1',
    },
    {
      src: '/images/hero-hands.webp',
      alt: t('altHands'),
      aspect: 'aspect-[4/3]',
      colSpan: 'col-span-2',
    },
  ];

  return (
    <section className="relative bg-[#0a0908] py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-[#ecd290]">
            {t('eyebrow')}
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-[#f4ecda] sm:text-3xl">
            {t('title')}
          </h2>
        </div>

        {/* 2-column masonry grid on mobile, 3-column on larger screens */}
        <div className="mosaic-grade mt-8 grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 sm:gap-4">
          {photos.map((item, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-xl border border-[rgba(201,162,75,0.2)] bg-[#16130f] ${item.colSpan} ${item.aspect} ${
                item.brighten ? 'brighten-family' : ''
              }`}
            >
              <picture>
                <source srcSet={item.src.replace('.webp', '.avif')} type="image/avif" />
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </picture>
              {/* Subtle bottom gradient to ensure elegance and warmth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Factual disclaimer note required by prompt */}
        <p className="mt-4 text-center text-xs text-[#a79c82]">
          {t('disclaimer')}
        </p>
      </div>
    </section>
  );
};
