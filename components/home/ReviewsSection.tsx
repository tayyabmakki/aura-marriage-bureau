'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import reviewsData from '@/content/reviews.json';
import { SITE_CONFIG } from '@/lib/config';
import { Star, ExternalLink, ShieldCheck, CheckCircle2, MessageSquarePlus } from 'lucide-react';
import { StarDivider } from '@/components/BrandIcons';

interface Review {
  id: string;
  author: string;
  date: string;
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

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
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

        {/* Primary Google Reviews Showcase Card */}
        <div className="mx-auto max-w-2xl rounded-3xl border border-[rgba(201,162,75,0.28)] bg-gradient-to-b from-[#18140f] via-[#120f0c] to-[#0a0908] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md">
          {/* Top Badge Strip: Google Icon, 5 Gold Stars, and Verified Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(201,162,75,0.18)] pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(201,162,75,0.3)] bg-white/5 shadow-inner">
                <GoogleIcon className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-semibold text-sm sm:text-base text-[#f4ecda] tracking-wide">
                    Google Reviews
                  </span>
                  <CheckCircle2 className="h-4 w-4 text-[#4ade80]" aria-hidden="true" />
                </div>
                <span className="block text-[11px] text-[#a79c82]">
                  {t('verifiedBadge')}
                </span>
              </div>
            </div>

            {/* 5-Star Rating Pill */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(201,162,75,0.25)] bg-[#1c1712] px-3.5 py-1.5">
              <div className="flex items-center gap-0.5 text-[#eab308]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#ecd290]">5.0</span>
            </div>
          </div>

          {/* Card Body */}
          <div className="py-6 sm:py-8 text-center space-y-3">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#f4ecda]">
              {t('emptyTitle')}
            </h3>
            <p className="max-w-lg mx-auto text-xs sm:text-sm text-[#c4b99f] leading-relaxed">
              {t('emptyDesc')}
            </p>
          </div>

          {/* Action Buttons: View on Google & Write a Review */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 text-xs sm:text-sm font-bold shadow-lg transition-transform active:scale-[0.98]"
            >
              <GoogleIcon className="h-4 w-4 shrink-0" />
              <span>{t('readReview')}</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-70" />
            </a>

            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-line w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 text-xs sm:text-sm font-semibold transition-all hover:border-[#d4af61] hover:text-[#ecd290]"
            >
              <MessageSquarePlus className="h-4 w-4 text-[#d4af61] shrink-0" />
              <span>{t('writeReview')}</span>
            </a>
          </div>

          {/* Confidentiality & Discretion Footer Strip */}
          <div className="mt-8 pt-5 border-t border-[rgba(201,162,75,0.14)] flex items-center justify-center gap-2 text-center text-[11px] text-[#a79c82]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#d4af61] shrink-0" />
            <p className="max-w-md">{t('privacyNote')}</p>
          </div>
        </div>

        {/* When specific reviews are present in content/reviews.json, render them */}
        {reviews.length > 0 && (
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="rounded-2xl border border-[rgba(201,162,75,0.2)] bg-[#14110d] p-5 sm:p-6 shadow-sm flex flex-col justify-between hover:border-[rgba(201,162,75,0.4)] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[rgba(201,162,75,0.12)] pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d4af61]/15 text-[#ecd290] font-bold text-xs uppercase">
                        {rev.author.charAt(0)}
                      </div>
                      <div>
                        <span className="font-semibold text-xs sm:text-sm text-[#f4ecda] block">
                          {rev.author}
                        </span>
                        <span className="text-[10px] text-[#a79c82] block">{rev.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 text-[#eab308]">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 italic text-xs sm:text-sm text-[#f4ecda]/90 leading-relaxed font-tagline">
                    &ldquo;{isUrdu && rev.commentUr ? rev.commentUr : rev.commentEn}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
