'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link as IntlLink, usePathname as useIntlPathname } from '@/i18n/routing';
import { SITE_CONFIG } from '@/lib/config';
import { MessageCircle, Phone, Menu, X, Globe, Sparkles } from 'lucide-react';

export const Header = () => {
  const t = useTranslations('header');
  const navT = useTranslations('nav');
  const locale = useLocale();
  const intlPathname = useIntlPathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Dynamic scroll listener for smooth elevation and compression
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Derive target locale for robust next-intl switching
  const targetLocale = (locale === 'ur' ? 'en' : 'ur') as 'en' | 'ur';

  // Handle ESC key to close mobile drawer and trap focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const prefix = locale === 'ur' ? '/ur' : '';

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-50 focus:rounded-full focus:bg-[#d4af61] focus:px-4 focus:py-2 focus:text-black focus:font-semibold focus:shadow-lg"
      >
        Skip to content
      </a>

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-500 ${
          scrolled
            ? 'border-b border-[rgba(201,162,75,0.25)] bg-[#0a0908]/90 backdrop-blur-xl shadow-[0_12px_36px_rgba(0,0,0,0.85)] py-2.5 sm:py-3'
            : 'border-b border-[rgba(201,162,75,0.16)] bg-[#0a0908]/75 backdrop-blur-md py-3 sm:py-3.5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo with AURA Gold Emblem */}
          <Link
            href={prefix || '/'}
            className="group flex items-center gap-2.5 sm:gap-3 transition-transform duration-300 hover:scale-105"
            aria-label={t('ariaLogo')}
          >
            <div className="relative h-11 w-11 sm:h-12 sm:w-12 shrink-0 drop-shadow-[0_2px_12px_rgba(212,175,97,0.35)]">
              <Image
                src="/images/aura-emblem.webp"
                alt="Aura Marriage Bureau"
                fill
                sizes="48px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-gold-gradient leading-none">
                AURA
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest text-[#ecd290]/85 uppercase mt-0.5 font-medium">
                Marriage Bureau
              </span>
            </div>
          </Link>

          {/* Central Floating Frosted Pill Navigation (Desktop) */}
          <nav
            className="hidden items-center rounded-full border border-[rgba(201,162,75,0.22)] bg-black/45 p-1 backdrop-blur-md shadow-inner md:flex lg:gap-0.5"
            aria-label="Main Navigation"
          >
            <Link
              href={`${prefix}/#how-it-works`}
              className="rounded-full px-4 py-2 text-xs lg:text-[13px] font-medium tracking-wide text-[#f4ecda]/85 transition-all duration-300 hover:text-[#ecd290] hover:bg-[#d4af61]/10"
            >
              {navT('howItWorks')}
            </Link>

            <Link
              href={`${prefix}/form`}
              className="group relative rounded-full px-4 py-2 text-xs lg:text-[13px] font-semibold tracking-wide text-[#ecd290] transition-all duration-300 hover:bg-[#d4af61]/15"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d4af61] animate-pulse" />
                {navT('fillForm')}
              </span>
            </Link>

            <Link
              href={`${prefix}/#reviews`}
              className="rounded-full px-4 py-2 text-xs lg:text-[13px] font-medium tracking-wide text-[#f4ecda]/85 transition-all duration-300 hover:text-[#ecd290] hover:bg-[#d4af61]/10"
            >
              {navT('reviews')}
            </Link>

            <Link
              href={`${prefix}/#contact`}
              className="rounded-full px-4 py-2 text-xs lg:text-[13px] font-medium tracking-wide text-[#f4ecda]/85 transition-all duration-300 hover:text-[#ecd290] hover:bg-[#d4af61]/10"
            >
              {navT('contact')}
            </Link>
          </nav>

          {/* Header Action Controls (Harmonized Heights & Clean Frosted Pills) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Direct Phone Consultant (Desktop xl+) */}
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="hidden xl:inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[rgba(201,162,75,0.2)] bg-black/50 px-3.5 py-2 text-xs font-mono text-[#a79c82] transition-colors hover:border-[#d4af61]/50 hover:text-[#ecd290]"
              aria-label={`Call ${SITE_CONFIG.name}`}
            >
              <Phone className="h-3.5 w-3.5 text-[#d4af61]" />
              <bdi dir="ltr">{SITE_CONFIG.phone}</bdi>
            </a>

            {/* Language Switcher Capsule (100% Reliable via next-intl routing) */}
            <IntlLink
              href={intlPathname || '/'}
              locale={targetLocale}
              lang={targetLocale}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[rgba(201,162,75,0.28)] bg-black/60 px-3.5 sm:px-4 text-xs font-semibold tracking-wider text-[#ecd290] shadow-sm transition-all duration-300 hover:border-[#d4af61] hover:bg-[#d4af61]/15 hover:shadow-[0_0_16px_rgba(212,175,97,0.25)]"
              aria-label={`Switch language to ${targetLocale === 'ur' ? 'Urdu' : 'English'}`}
            >
              <Globe className="h-3.5 w-3.5 text-[#d4af61]" />
              <span className={targetLocale === 'ur' ? 'urdu-text text-sm' : 'text-xs'}>
                {t('langToggle')}
              </span>
            </IntlLink>

            {/* Desktop WhatsApp Action Button (Frosted Luxury Pill User Loved) */}
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[rgba(201,162,75,0.35)] bg-black/60 px-4 sm:px-5 py-2 text-xs font-semibold text-[#ecd290] backdrop-blur-md shadow-sm transition-all duration-300 hover:border-[#d4af61] hover:bg-[#d4af61]/15 hover:text-white hover:shadow-[0_0_16px_rgba(212,175,97,0.25)]"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366] shrink-0" />
              <span>{t('whatsapp')}</span>
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[rgba(201,162,75,0.25)] bg-[#14110d] text-[#ecd290] transition hover:bg-[#d4af61]/15 md:hidden"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={t('menuOpen')}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          ref={menuRef}
          className="fixed inset-0 z-50 flex flex-col bg-[#0a0908]/98 px-6 py-7 backdrop-blur-2xl md:hidden"
        >
          {/* Header row in mobile menu */}
          <div className="flex items-center justify-between border-b border-[rgba(201,162,75,0.2)] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="relative h-10 w-10 shrink-0 drop-shadow-[0_2px_8px_rgba(212,175,97,0.3)]">
                <Image
                  src="/images/aura-emblem.webp"
                  alt="Aura Marriage Bureau"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base font-bold tracking-wider text-gold-gradient leading-none">
                  AURA
                </span>
                <span className="text-[9px] tracking-widest text-[#ecd290]/85 uppercase mt-0.5 font-medium">
                  Marriage Bureau
                </span>
              </div>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[rgba(201,162,75,0.3)] bg-white/5 text-[#ecd290] hover:bg-white/10"
              aria-label={t('menuClose')}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 flex flex-col gap-3.5 text-base font-medium text-[#f4ecda]" aria-label="Mobile Navigation">
            <Link
              href={`${prefix}/#how-it-works`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[48px] items-center justify-between rounded-xl border border-[rgba(201,162,75,0.12)] bg-[#14110d]/80 px-4 py-2.5 text-[#f4ecda] hover:border-[#d4af61]/40 hover:text-[#ecd290]"
            >
              <span>{navT('howItWorks')}</span>
              <span className="text-xs text-[#d4af61]">→</span>
            </Link>

            <Link
              href={`${prefix}/form`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[48px] items-center justify-between rounded-xl border border-[#d4af61]/45 bg-[#d4af61]/10 px-4 py-2.5 text-[#ecd290] font-semibold"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#d4af61]" />
                {navT('fillForm')}
              </span>
              <span className="text-xs text-[#d4af61]">✦</span>
            </Link>

            <Link
              href={`${prefix}/#reviews`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[48px] items-center justify-between rounded-xl border border-[rgba(201,162,75,0.12)] bg-[#14110d]/80 px-4 py-2.5 text-[#f4ecda] hover:border-[#d4af61]/40 hover:text-[#ecd290]"
            >
              <span>{navT('reviews')}</span>
              <span className="text-xs text-[#d4af61]">→</span>
            </Link>

            <Link
              href={`${prefix}/#contact`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[48px] items-center justify-between rounded-xl border border-[rgba(201,162,75,0.12)] bg-[#14110d]/80 px-4 py-2.5 text-[#f4ecda] hover:border-[#d4af61]/40 hover:text-[#ecd290]"
            >
              <span>{navT('contact')}</span>
              <span className="text-xs text-[#d4af61]">→</span>
            </Link>

            <div className="pt-2 flex items-center justify-around border-t border-[rgba(201,162,75,0.15)] mt-2">
              <Link
                href={`${prefix}/terms`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-[#a79c82] hover:text-[#ecd290]"
              >
                {navT('terms')}
              </Link>
              <span className="text-[rgba(201,162,75,0.3)]">&bull;</span>
              <Link
                href={`${prefix}/privacy`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-[#a79c82] hover:text-[#ecd290]"
              >
                {navT('privacy')}
              </Link>
            </div>
          </nav>

          {/* Mobile Bottom Quick Actions */}
          <div className="mt-auto space-y-3 pt-6 border-t border-[rgba(201,162,75,0.2)]">
            {/* Language Switcher in Mobile Drawer */}
            <IntlLink
              href={intlPathname || '/'}
              locale={targetLocale}
              lang={targetLocale}
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-[rgba(201,162,75,0.35)] bg-black/60 py-3 text-sm font-semibold text-[#ecd290]"
            >
              <Globe className="h-4 w-4 text-[#d4af61]" />
              <span>{targetLocale === 'ur' ? 'اردو میں دیکھیں (Switch to Urdu)' : 'Switch to English'}</span>
            </IntlLink>

            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-[rgba(201,162,75,0.4)] bg-black/60 py-3 text-sm font-semibold text-[#ecd290]"
            >
              <MessageCircle className="h-5 w-5 text-[#25D366]" />
              <span>{t('whatsapp')}</span>
            </a>

            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-[rgba(201,162,75,0.3)] bg-white/5 py-3 text-sm font-semibold text-[#f4ecda]"
            >
              <Phone className="h-4 w-4 text-[#d4af61]" />
              <bdi dir="ltr">{SITE_CONFIG.phone}</bdi>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
