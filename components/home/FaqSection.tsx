import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { FAQ_ITEMS } from '@/content/faq';
import { ChevronDown } from 'lucide-react';
import { StarDivider } from '@/components/BrandIcons';

export const FaqSection = () => {
  const t = useTranslations('faq');
  const locale = useLocale();

  return (
    <section className="relative bg-[#0d0b09] py-18 sm:py-24 lg:py-28 border-t border-[rgba(201,162,75,0.18)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-kicker text-[#ecd290] font-semibold">
            {t('eyebrow')}
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-[#f4ecda] sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-2 text-sm text-[#a79c82] sm:text-base">
            {t('desc')}
          </p>
        </div>

        <StarDivider className="my-8" />

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => (
            <details
              key={item.id}
              className="group rounded-2xl border border-[rgba(201,162,75,0.2)] bg-[#16130f]/90 p-5 transition-all open:border-[#d4af61]/50 open:bg-[#16130f]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold text-[#f4ecda] transition-colors group-hover:text-[#ecd290] sm:text-lg">
                <span className="pe-4">
                  {locale === 'ur' ? item.questionUr : item.questionEn}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(201,162,75,0.3)] bg-black/40 text-[#ecd290] transition-transform duration-200 group-open:rotate-180">
                  <ChevronDown className="h-4 w-4" />
                </span>
              </summary>
              <div className="mt-4 pt-3 border-t border-[rgba(201,162,75,0.12)] text-sm leading-relaxed text-[#a79c82] sm:text-base">
                <p>
                  {locale === 'ur' ? item.answerUr : item.answerEn}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
