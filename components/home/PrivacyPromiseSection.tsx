import React from 'react';
import { useTranslations } from 'next-intl';
import { ShieldCheck, EyeOff, Hash, Camera, Users } from 'lucide-react';
import { StarDivider } from '@/components/BrandIcons';

export const PrivacyPromiseSection = () => {
  const t = useTranslations('privacyPromise');

  const promises = [
    {
      icon: EyeOff,
      text: t('point1'),
    },
    {
      icon: Hash,
      text: t('point2'),
    },
    {
      icon: Camera,
      text: t('point3'),
    },
    {
      icon: Users,
      text: t('point4'),
    },
  ];

  return (
    <section className="relative bg-[#0d0b09] py-14 sm:py-20 border-y border-[rgba(201,162,75,0.18)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af61]/30 bg-[#d4af61]/10 px-4 py-1 text-xs text-[#ecd290]">
            <ShieldCheck className="h-4 w-4" />
            <span>{t('eyebrow')}</span>
          </div>
          <h2 className="mt-3 font-serif text-2xl font-bold text-[#f4ecda] sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-2 font-serif text-lg text-[#d4af61]" lang="ur" dir="rtl">
            {t('urduSubtitle')}
          </p>
          <p className="mt-3 text-sm text-[#a79c82] max-w-2xl mx-auto sm:text-base">
            {t('desc')}
          </p>
        </div>

        <StarDivider className="my-8" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {promises.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 rounded-xl border border-[rgba(201,162,75,0.2)] bg-[#16130f]/80 p-5 backdrop-blur-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(201,162,75,0.4)] bg-black/40 text-[#ecd290]">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-sm text-[#f4ecda]/90 leading-relaxed sm:text-base">
                  {p.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
