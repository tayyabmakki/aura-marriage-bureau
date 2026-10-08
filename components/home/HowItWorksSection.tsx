'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { MessageSquare, UserCheck, FileEdit, CheckCircle2, Search, HeartHandshake, Home, ArrowRight } from 'lucide-react';

export const HowItWorksSection = () => {
  const t = useTranslations('howItWorks');
  const locale = useLocale();
  const prefix = locale === 'ur' ? '/ur' : '';

  const steps = [
    {
      num: 1,
      icon: MessageSquare,
      title: t('step1Title'),
      desc: t('step1Desc'),
    },
    {
      num: 2,
      icon: UserCheck,
      title: t('step2Title'),
      desc: t('step2Desc'),
    },
    {
      num: 3,
      icon: FileEdit,
      title: t('step3Title'),
      desc: t('step3Desc'),
      showCtaAfter: true,
    },
    {
      num: 4,
      icon: CheckCircle2,
      title: t('step4Title'),
      desc: t('step4Desc'),
    },
    {
      num: 5,
      icon: Search,
      title: t('step5Title'),
      desc: t('step5Desc'),
    },
    {
      num: 6,
      icon: HeartHandshake,
      title: t('step6Title'),
      desc: t('step6Desc'),
    },
    {
      num: 7,
      icon: Home,
      title: t('step7Title'),
      desc: t('step7Desc'),
    },
  ];

  return (
    <section id="how-it-works" className="relative bg-[#0a0908] py-14 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-[#ecd290]">
            {t('eyebrow')}
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-[#f4ecda] sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-2 font-serif text-lg text-[#d4af61]" lang="ur" dir="rtl">
            {t('urduSubtitle')}
          </p>
        </div>

        {/* Vertical Stacked Timeline (Mobile-First, no heavy scroll-jacking) */}
        <div className="relative mt-12 space-y-6">
          {/* Vertical gold progress hairline */}
          <div
            className="absolute top-4 bottom-4 start-[23px] w-px bg-gradient-to-b from-[#d4af61]/60 via-[#d4af61]/30 to-transparent"
            aria-hidden="true"
          />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.num}>
                <div className="relative flex items-start gap-4 rounded-xl border border-[rgba(201,162,75,0.2)] bg-[#16130f]/90 p-4 transition-all hover:border-[#d4af61]/40 sm:p-6">
                  {/* Step Number Circle */}
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d4af61] bg-[#0a0908] text-sm font-bold text-[#ecd290] shadow-sm">
                    {step.num}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-[#d4af61]" />
                      <h3 className="font-serif text-lg font-semibold text-[#f4ecda] sm:text-xl">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-sm text-[#a79c82] sm:text-base leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Specific CTA after Step 3 to /form */}
                {step.showCtaAfter && (
                  <div className="ms-14 my-2">
                    <Link
                      href={`${prefix}/form`}
                      className="btn-gold inline-flex text-sm py-2 px-5 font-semibold shadow-md"
                    >
                      <span>{t('step3Cta')}</span>
                      <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
                    </Link>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};
