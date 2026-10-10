'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { SITE_CONFIG } from '@/lib/config';
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  AtSign,
  Clock,
  ArrowUp,
  FileText,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { GoldWaveDivider } from '@/components/BrandIcons';

export const Footer = () => {
  const t = useTranslations('footer');
  const navT = useTranslations('nav');
  const locale = useLocale();
  const prefix = locale === 'ur' ? '/ur' : '';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#070605] border-t border-[rgba(201,162,75,0.22)] pb-28 sm:pb-16 md:pb-12 text-[#a79c82] overflow-hidden">
      {/* Ambient gold radial glow at top */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(212,175,97,0.08),transparent_70%)]"
        aria-hidden="true"
      />

      {/* Curved gold wave decoration at top */}
      <div className="mb-8 sm:mb-12">
        <GoldWaveDivider flip />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Pre-Footer Floating Luxury Trust Card */}
        <div className="relative mb-16 overflow-hidden rounded-3xl border border-[rgba(201,162,75,0.24)] bg-gradient-to-b from-[#14120e]/95 via-[#0e0c0a]/95 to-[#070605]/95 p-6 sm:p-10 lg:p-12 shadow-[0_24px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl">
          {/* Subtle interior glow */}
          <div
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-[radial-gradient(ellipse,rgba(212,175,97,0.15),transparent_70%)] blur-2xl"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(201,162,75,0.25)] bg-[rgba(212,175,97,0.08)] px-3.5 py-1 text-xs font-medium text-[#ecd290]">
                <Sparkles className="h-3.5 w-3.5 text-[#d4af61]" />
                <span>{t('prefooterEyebrow')}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#f4ecda] tracking-wide leading-tight">
                {t('prefooterTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-[#c4b99f] leading-relaxed">
                {t('prefooterSubtitle')}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 shrink-0">
              <Link
                href={`${prefix}/form`}
                className="btn-gold group inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider shadow-[0_8px_24px_rgba(212,175,97,0.25)] hover:shadow-[0_12px_32px_rgba(212,175,97,0.4)] transition-all"
              >
                <FileText className="h-4 w-4" />
                <span>{navT('fillForm')}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
              </Link>

              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(201,162,75,0.35)] bg-black/60 px-6 py-3.5 text-xs font-semibold text-[#ecd290] backdrop-blur-md transition-all hover:border-[#d4af61] hover:bg-[#d4af61]/15 hover:text-white"
                aria-label="Message on WhatsApp"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main 4-Column Architectural Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Column 1: Brand Heritage & Credibility */}
          <div className="space-y-5">
            {/* Round & Big Aura Brand Emblem Medallion */}
            <Link
              href={prefix || '/'}
              className="group inline-flex items-center gap-3.5 transition-transform duration-300 hover:scale-105"
              aria-label="Aura Marriage Bureau Home"
            >
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full border-2 border-[rgba(201,162,75,0.45)] bg-black shadow-[0_0_28px_rgba(212,175,97,0.28)] overflow-hidden p-1 shrink-0 group-hover:border-[#ecd290] transition-colors">
                <Image
                  src="/images/logo.png"
                  alt="Aura Marriage Bureau"
                  fill
                  sizes="(max-width: 640px) 80px, 96px"
                  className="object-contain scale-110 drop-shadow-[0_2px_12px_rgba(212,175,97,0.35)]"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-wider text-gold-gradient leading-none">
                  AURA
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#ecd290]/90 font-medium mt-1">
                  Marriage Bureau
                </span>
                <span className="text-[9px] text-[#a79c82] tracking-wider uppercase">
                  Lahore &bull; Overseas
                </span>
              </div>
            </Link>

            <p className="font-serif italic text-sm text-[#ecd290]/90 leading-snug">
              &ldquo;{SITE_CONFIG.tagline}&rdquo;
            </p>

            <p className="font-urdu text-sm text-[#ecd290]/80">
              جہاں تقدیریں ملیں اور روحیں جڑیں
            </p>

            {/* Bureau Distinction Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(201,162,75,0.2)] bg-black/40 px-2.5 py-1 text-[11px] text-[#ecd290]/90">
                <ShieldCheck className="h-3 w-3 text-[#d4af61]" />
                Family-Led
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(201,162,75,0.2)] bg-black/40 px-2.5 py-1 text-[11px] text-[#ecd290]/90">
                Ref ID Only
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(201,162,75,0.2)] bg-black/40 px-2.5 py-1 text-[11px] text-[#ecd290]/90">
                Pakistan &amp; Overseas
              </span>
            </div>

            {/* Round & Big Glowing Social Pills */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Aura on Instagram"
                className="group flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[rgba(201,162,75,0.35)] bg-black/60 text-[#ecd290] transition-all duration-300 hover:border-[#d4af61] hover:bg-[#d4af61] hover:text-black hover:shadow-[0_0_18px_rgba(212,175,97,0.5)]"
              >
                <Instagram className="h-5 w-5 transition-transform group-hover:scale-110" />
              </a>
              <a
                href={SITE_CONFIG.threadsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Aura on Threads"
                className="group flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[rgba(201,162,75,0.35)] bg-black/60 text-[#ecd290] transition-all duration-300 hover:border-[#d4af61] hover:bg-[#d4af61] hover:text-black hover:shadow-[0_0_18px_rgba(212,175,97,0.5)]"
              >
                <AtSign className="h-5 w-5 transition-transform group-hover:scale-110" />
              </a>
              <a
                href={SITE_CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Aura on Facebook"
                className="group flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[rgba(201,162,75,0.35)] bg-black/60 text-[#ecd290] transition-all duration-300 hover:border-[#d4af61] hover:bg-[#d4af61] hover:text-black hover:shadow-[0_0_18px_rgba(212,175,97,0.5)]"
              >
                <Facebook className="h-5 w-5 transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Column 2: Direct Consultation & Office */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4af61]" />
              <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#ecd290]">
                {t('colContact')}
              </h3>
            </div>

            <p className="text-xs text-[#d4af61]/90 font-medium">
              {SITE_CONFIG.consultant} &bull; {t('consultantTitle')}
            </p>

            <ul className="space-y-3.5 text-xs sm:text-sm">
              {/* Phone Row */}
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="group flex items-center gap-3 text-[#c4b99f] hover:text-[#f4ecda] transition-colors"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(201,162,75,0.35)] bg-black/60 text-[#ecd290] shadow-[0_4px_14px_rgba(0,0,0,0.5)] group-hover:border-[#d4af61] group-hover:bg-[#d4af61]/20 group-hover:scale-105 transition-all">
                    <Phone className="h-5 w-5 text-[#ecd290]" />
                  </div>
                  <bdi dir="ltr" className="text-xs sm:text-sm font-medium">{SITE_CONFIG.phone}</bdi>
                </a>
              </li>

              {/* Email Row (Resolved Mail Icon Issue: Big, Round & Crystal Clear) */}
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="group flex items-center gap-3 text-[#c4b99f] hover:text-[#f4ecda] transition-colors"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(201,162,75,0.35)] bg-black/60 text-[#ecd290] shadow-[0_4px_14px_rgba(0,0,0,0.5)] group-hover:border-[#d4af61] group-hover:bg-[#d4af61]/20 group-hover:scale-105 transition-all">
                    <Mail className="h-5 w-5 text-[#ecd290]" />
                  </div>
                  <span className="truncate text-xs sm:text-sm font-medium">{SITE_CONFIG.email}</span>
                </a>
              </li>

              {/* Address Row (Interactive - Opens Google Maps in New Tab) */}
              <li className="flex items-start gap-3 text-xs sm:text-sm text-[#a79c82]">
                <a
                  href={SITE_CONFIG.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open office location in Google Maps (opens in new tab)"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(201,162,75,0.35)] bg-black/60 text-[#ecd290] shadow-[0_4px_14px_rgba(0,0,0,0.5)] hover:border-[#d4af61] hover:bg-[#d4af61]/20 hover:scale-105 transition-all mt-0.5"
                >
                  <MapPin className="h-5 w-5 text-[#ecd290]" />
                </a>
                <div className="leading-relaxed">
                  <a
                    href={SITE_CONFIG.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block text-[#c4b99f] hover:text-[#ecd290] transition-colors"
                    title="Click to open office location in Google Maps (opens in new tab)"
                  >
                    <span>{SITE_CONFIG.officeAddress}</span>
                    <span className="ms-1.5 inline-flex items-center text-[11px] font-semibold text-[#d4af61] group-hover:underline">
                      ↗ Google Maps
                    </span>
                  </a>
                </div>
              </li>

              {/* Hours Row */}
              <li className="flex items-center gap-3 text-xs sm:text-sm text-[#a79c82]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(201,162,75,0.35)] bg-black/60 text-[#ecd290] shadow-[0_4px_14px_rgba(0,0,0,0.5)]">
                  <Clock className="h-5 w-5 text-[#ecd290]" />
                </div>
                <span>
                  <bdi dir="ltr">
                    {locale === 'ur' ? SITE_CONFIG.openingHoursDisplayUr : SITE_CONFIG.openingHoursDisplay}
                  </bdi>
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation & Services */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4af61]" />
              <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#ecd290]">
                {t('colNav')}
              </h3>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href={`${prefix}/#how-it-works`}
                  className="inline-flex items-center gap-2 text-[#c4b99f] hover:text-[#ecd290] transition-colors"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d4af61]/50" />
                  <span>{navT('howItWorks')}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/form`}
                  className="inline-flex items-center gap-2 text-[#ecd290] font-medium hover:text-white transition-colors"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ecd290] animate-pulse" />
                  <span>{navT('fillForm')}</span>
                  <span className="rounded bg-[#d4af61]/20 px-1.5 py-0.5 text-[10px] text-[#ecd290] border border-[rgba(201,162,75,0.3)]">
                    VIP
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/#reviews`}
                  className="inline-flex items-center gap-2 text-[#c4b99f] hover:text-[#ecd290] transition-colors"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d4af61]/50" />
                  <span>{navT('reviews')}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/#moments-of-union`}
                  className="inline-flex items-center gap-2 text-[#c4b99f] hover:text-[#ecd290] transition-colors"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d4af61]/50" />
                  <span>{locale === 'ur' ? 'اتحاد کے لمحات' : 'Moments of Union'}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/#faq`}
                  className="inline-flex items-center gap-2 text-[#c4b99f] hover:text-[#ecd290] transition-colors"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d4af61]/50" />
                  <span>{locale === 'ur' ? 'اکثر پوچھے جانے والے سوالات' : 'Parent FAQs'}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/#contact`}
                  className="inline-flex items-center gap-2 text-[#c4b99f] hover:text-[#ecd290] transition-colors"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d4af61]/50" />
                  <span>{navT('contact')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Confidentiality & Trust */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4af61]" />
              <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#ecd290]">
                {t('colTrust')}
              </h3>
            </div>

            <p className="text-xs text-[#a79c82] leading-relaxed">
              {t('disclaimer')}
            </p>

            <div className="rounded-xl border border-[rgba(201,162,75,0.18)] bg-black/40 p-3.5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#ecd290]">
                <ShieldCheck className="h-4 w-4 text-[#d4af61]" />
                <span>{locale === 'ur' ? 'رازداری کی ضمانت' : 'Strict Confidentiality'}</span>
              </div>
              <p className="text-[11px] text-[#a79c82] leading-normal">
                {t('privacyPromise')}
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-1 text-xs">
              <Link
                href={`${prefix}/terms`}
                className="text-[#a79c82] hover:text-[#ecd290] transition-colors"
              >
                &bull; {navT('terms')}
              </Link>
              <Link
                href={`${prefix}/privacy`}
                className="text-[#a79c82] hover:text-[#ecd290] transition-colors"
              >
                &bull; {navT('privacy')}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar with Back to Top */}
        <div className="mt-14 pt-8 border-t border-[rgba(201,162,75,0.14)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a79c82]/80">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-start">
            <p>{t('rights')}</p>
            <span className="hidden sm:inline text-[rgba(201,162,75,0.3)]">&bull;</span>
            <span className="text-[11px] text-[#a79c82]/60">
              Lahore, Pakistan &bull; Worldwide Consultancy
            </span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-medium text-[#ecd290]/80 hover:text-[#f4ecda] transition-all cursor-pointer"
            aria-label={t('backToTop')}
          >
            <span>{t('backToTop')}</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(201,162,75,0.25)] bg-black/40 group-hover:border-[#d4af61] group-hover:bg-[#d4af61]/15 group-hover:scale-105 transition-all">
              <ArrowUp className="h-4 w-4 text-[#d4af61] group-hover:text-[#ecd290]" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
