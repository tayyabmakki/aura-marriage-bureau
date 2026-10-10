import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export const WhoWeServeSection = () => {
  const t = useTranslations('whoWeServe');

  const cards = [
    {
      title: t('card1Title'),
      desc: t('card1Desc'),
      image: '/images/serve-pakistan.webp',
      alt: t('card1Alt'),
    },
    {
      title: t('card2Title'),
      desc: t('card2Desc'),
      image: '/images/serve-overseas.webp',
      alt: t('card2Alt'),
    },
    {
      title: t('card3Title'),
      desc: t('card3Desc'),
      image: '/images/serve-second-marriage.webp',
      alt: t('card3Alt'),
    },
    {
      title: t('card4Title'),
      desc: t('card4Desc'),
      image: '/images/serve-professionals.webp',
      alt: t('card4Alt'),
    },
  ];

  return (
    <section className="relative bg-[#0a0908] py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-[#ecd290]">
            {t('eyebrow')}
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-[#f4ecda] sm:text-4xl">
            {t('title')}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, idx) => (
            <div
              key={idx}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[rgba(201,162,75,0.2)] bg-[#16130f] transition-all hover:border-[#d4af61]/40"
            >
              <div className="relative h-48 w-full overflow-hidden sm:h-56">
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16130f] via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#ecd290]">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#a79c82] leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
