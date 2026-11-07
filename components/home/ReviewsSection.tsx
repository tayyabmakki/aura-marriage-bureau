'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import reviewsData from '@/content/reviews.json';
import { SITE_CONFIG } from '@/lib/config';
import { Star, ExternalLink, ShieldCheck, CheckCircle2, MessageSquarePlus, Quote } from 'lucide-react';
import { StarDivider } from '@/components/BrandIcons';

interface Review {
  id: string;
  author: string;
  roleEn?: string;
  roleUr?: string;
  locationEn?: string;
  locationUr?: string;
  dateEn: string;
  dateUr: string;
  rating?: number;
  commentEn: string;
  commentUr?: string;
}

const GoogleIcon = ({ className = 'h-5 w-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.27 21.41 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.27 2.59 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

export const ReviewsSection = () => {
  const t = useTranslations('reviews');
  const locale = useLocale();
  const isUrdu = locale === 'ur';
  const reviews: Review[] = reviewsData as Review[];
  const googleUrl = SITE_CONFIG.googleReviewUrl || 'https://share.google/sZJY8BZlVrTdRIhrI';

  return (
    <section
      id="reviews"
      className="scroll-mt-24 sm:scroll-mt-28 relative bg-[#0a0908] py-16 sm:py-24 lg:py-28 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_15%,rgba(212,175,97,0.07),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-kicker text-[#ecd290] font-semibold">
            {t('eyebrow')}
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-[#f4ecda] sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-2.5 max-w-2xl mx-auto text-xs sm:text-sm text-[#a79c82] leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <StarDivider className="my-6" />

        {/* Google Reviews Trust Strip Banner */}
        <div className="mx-auto max-w-4xl mb-10 sm:mb-12 rounded-2xl sm:rounded-3xl border border-[rgba(201,162,75,0.25)] bg-gradient-to-r from-[#18140f] via-[#14100c] to-[#18140f] p-4 sm:p-6 shadow-[0_12px_36px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            {/* Left: Google Logo + Rating */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[rgba(201,162,75,0.3)] bg-black/40 shadow-inner">
                <GoogleIcon className="h-6 w-6" />
              </div>
              <div className="text-left rtl:text-right">
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-sm sm:text-base text-[#f4ecda] tracking-wide">
                    Google Reviews
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#4ade80] bg-[#4ade80]/10 px-2 py-0.5 rounded-full border border-[#4ade80]/30">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>{t('verifiedBadge')}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-0.5 text-[#eab308]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#ecd290]">5.0 / 5.0</span>
                  <span className="text-[11px] text-[#a79c82] hidden xs:inline">• {t('ratingNote')}</span>
                </div>
              </div>
            </div>

            {/* Right: Quick Review on Google Action */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0 justify-center">
              <a
                href={googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-line w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold hover:border-[#d4af61] hover:text-[#ecd290]"
              >
                <MessageSquarePlus className="h-3.5 w-3.5 text-[#d4af61]" />
                <span>{t('writeReview')}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {reviews.map((rev) => {
            const role = isUrdu && rev.roleUr ? rev.roleUr : rev.roleEn;
            const location = isUrdu && rev.locationUr ? rev.locationUr : rev.locationEn;
            const date = isUrdu && rev.dateUr ? rev.dateUr : rev.dateEn;
            const comment = isUrdu && rev.commentUr ? rev.commentUr : rev.commentEn;

            return (
              <div
                key={rev.id}
                className="group relative rounded-2xl border border-[rgba(201,162,75,0.2)] bg-[#14110d] p-5 sm:p-6 shadow-[0_8px_24px_rgba(0,0,0,0.35)] flex flex-col justify-between transition-all duration-300 hover:border-[#d4af61]/50 hover:bg-[#18140f] hover:-translate-y-0.5"
              >
                <div>
                  {/* Reviewer Header */}
                  <div className="flex items-start justify-between gap-3 border-b border-[rgba(201,162,75,0.12)] pb-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar with luxury gold initial */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(201,162,75,0.35)] bg-gradient-to-br from-[#d4af61]/25 via-[#1a150f] to-black text-[#ecd290] font-bold text-sm shadow-inner">
                        {rev.author.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <span className="font-semibold text-xs sm:text-sm text-[#f4ecda] block truncate">
                          {rev.author}
                        </span>
                        {(role || location) && (
                          <span className="text-[11px] text-[#a79c82] block truncate">
                            {[role, location].filter(Boolean).join(' • ')}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Google G watermark */}
                    <div className="shrink-0 p-1.5 rounded-full bg-white/5 border border-[rgba(201,162,75,0.15)] opacity-85">
                      <GoogleIcon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Rating Stars & Relative Date */}
                  <div className="flex items-center justify-between mt-3.5 text-xs text-[#a79c82]">
                    <div className="flex items-center gap-0.5 text-[#eab308]">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px]">{date}</span>
                  </div>

                  {/* Review Quote Body */}
                  <div className="mt-3 relative">
                    <Quote className="h-5 w-5 text-[#d4af61]/25 absolute -top-1 -left-1 rtl:-right-1 rtl:left-auto" aria-hidden="true" />
                    <p className="pl-4 rtl:pr-4 rtl:pl-0 font-tagline italic text-xs sm:text-sm text-[#f4ecda]/90 leading-relaxed">
                      &ldquo;{comment}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Card Footer: Verified Family Google Feedback */}
                <div className="mt-5 pt-3 border-t border-[rgba(201,162,75,0.1)] flex items-center justify-between text-[10.5px] text-[#a79c82]">
                  <span className="inline-flex items-center gap-1 text-[#4ade80]">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>{isUrdu ? 'گوگل تصدیق شدہ' : 'Google Verified'}</span>
                  </span>
                  <span className="text-[#ecd290]/80">5.0 ★</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section Actions & Direct Link to Google Reviews */}
        <div className="mt-12 text-center space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center justify-center gap-2.5 py-3 px-6 sm:px-8 text-xs sm:text-sm font-bold shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              <GoogleIcon className="h-4 w-4 shrink-0" />
              <span>{t('readReview')}</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-75" />
            </a>

            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-line inline-flex items-center justify-center gap-2 py-3 px-6 text-xs sm:text-sm font-semibold hover:border-[#d4af61] hover:text-[#ecd290]"
            >
              <MessageSquarePlus className="h-4 w-4 text-[#d4af61] shrink-0" />
              <span>{t('writeReview')}</span>
            </a>
          </div>

          {/* Privacy & Discretion Reassurance */}
          <div className="pt-4 flex items-center justify-center gap-2 text-center text-[11px] text-[#a79c82]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#d4af61] shrink-0" />
            <p className="max-w-xl">{t('privacyNote')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
