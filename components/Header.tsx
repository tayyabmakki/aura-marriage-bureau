'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { SITE_CONFIG } from '@/lib/config';
import { MessageCircle, Phone, Menu, X } from 'lucide-react';

export const Header = () => {
  const t = useTranslations('header');
  const navT = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Derive target locale url
  const targetLocale = locale === 'ur' ? 'en' : 'ur';
  // Remove current locale prefix if present, then rebuild
  const pathWithoutLocale = pathname.replace(/^\/(ur|en)(\/|$)/, '$2') || '';
  const cleanPath = pathWithoutLocale.startsWith('/') ? pathWithoutLocale : `/${pathWithoutLocale}`;
  const switchLocaleHref = targetLocale === 'ur'
    ? `/ur${cleanPath === '/' ? '' : cleanPath}`
    : cleanPath;

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

      <header className="sticky top-0 z-40 w-full border-b border-[rgba(201,162,75,0.18)] bg-[#0a0908]/90 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href={prefix || '/'}
            className="flex items-center gap-3 transition-opacity hover:opacity-90 min-h-[48px] min-w-[48px]"
            aria-label={t('ariaLogo')}
          >
            <div className="relative h-10 w-28 sm:h-12 sm:w-36">
              <Image
                src="/images/logo.png"
                alt="Aura Marriage Bureau"
                fill
                sizes="(max-width: 640px) 112px, 144px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main Navigation">
            <Link
              href={`${prefix}/#how-it-works`}
              className="text-sm font-medium tracking-wide text-[#f4ecda]/90 transition-colors hover:text-[#ecd290] min-h-[48px] inline-flex items-center"
            >
              {navT('howItWorks')}
            </Link>
            <Link
              href={`${prefix}/form`}
              className="text-sm font-medium tracking-wide text-[#f4ecda]/90 transition-colors hover:text-[#ecd290] min-h-[48px] inline-flex items-center"
            >
              {navT('fillForm')}
            </Link>
            <Link
              href={`${prefix}/#reviews`}
              className="text-sm font-medium tracking-wide text-[#f4ecda]/90 transition-colors hover:text-[#ecd290] min-h-[48px] inline-flex items-center"
            >
              {navT('reviews')}
            </Link>
            <Link
              href={`${prefix}/#contact`}
              className="text-sm font-medium tracking-wide text-[#f4ecda]/90 transition-colors hover:text-[#ecd290] min-h-[48px] inline-flex items-center"
            >
              {navT('contact')}
            </Link>
          </nav>

          {/* Header Action Controls */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <Link
              href={switchLocaleHref}
              lang={targetLocale}
              className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full border border-[rgba(201,162,75,0.3)] bg-black/40 px-3.5 text-xs font-semibold tracking-wider text-[#ecd290] transition hover:border-[#d4af61] hover:bg-[#d4af61]/10"
              aria-label={`Switch language to ${targetLocale === 'ur' ? 'Urdu' : 'English'}`}
            >
              {t('langToggle')}
            </Link>

            {/* Desktop WhatsApp Button */}
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold hidden sm:inline-flex text-xs px-4 py-2 font-semibold shadow-sm"
            >
              <MessageCircle className="me-2 h-4 w-4" />
              {t('whatsapp')}
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-lg text-[#ecd290] transition hover:bg-white/5 md:hidden"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={t('menuOpen')}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Focus-Trapped Sheet Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          ref={menuRef}
          className="fixed inset-0 z-50 flex flex-col bg-[#0a0908] px-6 py-8 backdrop-blur-xl md:hidden"
        >
          <div className="flex items-center justify-between border-b border-[rgba(201,162,75,0.2)] pb-4">
            <span className="font-serif text-lg font-bold text-[#ecd290]">
              {SITE_CONFIG.name}
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full text-[#ecd290] hover:bg-white/10"
              aria-label={t('menuClose')}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="mt-8 flex flex-col gap-5 text-lg font-medium text-[#f4ecda]" aria-label="Mobile Navigation">
            <Link
              href={`${prefix}/#how-it-works`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[48px] items-center border-b border-[rgba(201,162,75,0.1)] py-2 text-[#f4ecda] hover:text-[#ecd290]"
            >
              {navT('howItWorks')}
            </Link>
            <Link
              href={`${prefix}/form`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[48px] items-center border-b border-[rgba(201,162,75,0.1)] py-2 text-[#ecd290] font-semibold"
            >
              {navT('fillForm')}
            </Link>
            <Link
              href={`${prefix}/#reviews`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[48px] items-center border-b border-[rgba(201,162,75,0.1)] py-2 text-[#f4ecda] hover:text-[#ecd290]"
            >
              {navT('reviews')}
            </Link>
            <Link
              href={`${prefix}/#contact`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[48px] items-center border-b border-[rgba(201,162,75,0.1)] py-2 text-[#f4ecda] hover:text-[#ecd290]"
            >
              {navT('contact')}
            </Link>
            <Link
              href={`${prefix}/terms`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[48px] items-center text-sm text-[#a79c82] hover:text-[#f4ecda]"
            >
              {navT('terms')}
            </Link>
            <Link
              href={`${prefix}/privacy`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[48px] items-center text-sm text-[#a79c82] hover:text-[#f4ecda]"
            >
              {navT('privacy')}
            </Link>
          </nav>

          <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-[rgba(201,162,75,0.2)]">
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-full text-center text-sm font-semibold"
            >
              <MessageCircle className="me-2 h-5 w-5" />
              {t('whatsapp')}
            </a>
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="btn-line w-full text-center text-sm font-semibold"
            >
              <Phone className="me-2 h-4 w-4" />
              {SITE_CONFIG.phone}
            </a>
          </div>
        </div>
      )}
    </>
  );
};
