import React from 'react';
import { useTranslations } from 'next-intl';
import reviewsData from '@/content/reviews.json';
import { SITE_CONFIG } from '@/lib/config';
import { MessageSquarePlus } from 'lucide-react';
import { StarDivider } from '@/components/BrandIcons';

interface Review {
  id: string;
  author: string;
  date: string;
  commentEn: string;
  commentUr?: string;
}

export const ReviewsSection = () => {
  const t = useTranslations('reviews');
  const reviews: Review[] = reviewsData as Review[];

  return (
    <section id="reviews" className="relative bg-[#0a0908] py-18 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-[#ecd290]">
            {t('eyebrow')}
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-[#f4ecda] sm:text-4xl">
            {t('title')}
          </h2>
        </div>

        <StarDivider className="my-6" />

        {/* If reviews array is empty, render the elegant "Be the first to review" state */}
        {reviews.length === 0 ? (
          <div className="mx-auto max-w-md rounded-2xl border border-[rgba(201,162,75,0.22)] bg-[#16130f]/80 p-6 text-center backdrop-blur-sm sm:p-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af61]/40 bg-[#d4af61]/10 text-[#ecd290]">
              <MessageSquarePlus className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-serif text-xl font-bold text-[#f4ecda]">
              {t('emptyTitle')}
            </h3>
            <p className="mt-2 text-sm text-[#a79c82] leading-relaxed">
              {t('emptyDesc')}
            </p>

            {SITE_CONFIG.googleReviewUrl && (
              <div className="mt-6">
                <a
                  href={SITE_CONFIG.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-line inline-flex text-xs font-semibold py-2.5 px-5"
                >
                  {t('writeReview')}
                </a>
              </div>
            )}
          </div>
        ) : (
          /* When real reviews are supplied, render Google review cards without fabricated counts/ratings */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="rounded-2xl border border-[rgba(201,162,75,0.2)] bg-[#16130f] p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[rgba(201,162,75,0.15)] pb-3">
                    <span className="font-semibold text-sm text-[#f4ecda]">{rev.author}</span>
                    <span className="text-xs text-[#a79c82]">{rev.date}</span>
                  </div>
                  <p className="mt-4 text-sm text-[#f4ecda]/90 leading-relaxed">
                    {rev.commentEn}
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
