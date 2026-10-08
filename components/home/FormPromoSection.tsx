import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { SITE_CONFIG } from '@/lib/config';
import { FileText, Copy, Send, ArrowRight, ShieldCheck } from 'lucide-react';

export const FormPromoSection = () => {
  const t = useTranslations('formPromo');
  const locale = useLocale();
  const prefix = locale === 'ur' ? '/ur' : '';

  return (
    <section className="relative overflow-hidden bg-[#0d0b09] py-14 sm:py-20 border-y border-[rgba(201,162,75,0.18)]">
      {/* Background with hero-hands backdrop */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" aria-hidden="true">
        <picture>
          <source srcSet="/images/hero-hands-1080.avif" type="image/avif" />
          <source srcSet="/images/hero-hands-1080.webp" type="image/webp" />
          <Image
            src="/images/hero-hands.webp"
            alt="Henna wedding hands backdrop, AI-generated illustration"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0908] via-[#0a0908]/90 to-[#0a0908]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-widest text-[#ecd290]">
              {t('eyebrow')}
            </span>
            <h2 className="mt-2 font-serif text-2xl font-bold text-[#f4ecda] sm:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-3 text-sm text-[#a79c82] sm:text-base leading-relaxed">
              {t('desc')}
            </p>

            {/* Zero transmission reassurance */}
            {!SITE_CONFIG.ENABLE_SUBMIT && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-black/40 border border-[#d4af61]/20 px-3.5 py-2 text-xs text-[#ecd290]">
                <ShieldCheck className="h-4 w-4 shrink-0 text-[#d4af61]" />
                <span>{t('noSubmitNote')}</span>
              </div>
            )}

            <div className="mt-6">
              <Link
                href={`${prefix}/form`}
                className="btn-gold inline-flex text-base py-3 px-6 font-semibold shadow-lg"
              >
                <span>{t('cta')}</span>
                <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-4 rounded-xl border border-[rgba(201,162,75,0.2)] bg-[#16130f]/80 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d4af61]/20 text-[#ecd290]">
                <FileText className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-[#f4ecda]">{t('step1')}</span>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-[rgba(201,162,75,0.2)] bg-[#16130f]/80 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d4af61]/20 text-[#ecd290]">
                <Copy className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-[#f4ecda]">{t('step2')}</span>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-[rgba(201,162,75,0.2)] bg-[#16130f]/80 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d4af61]/20 text-[#ecd290]">
                <Send className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-[#f4ecda]">{t('step3')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
