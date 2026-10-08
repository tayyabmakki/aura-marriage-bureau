import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { SITE_CONFIG } from '@/lib/config';
import { Phone, Mail, MapPin, Instagram, Facebook, AtSign } from 'lucide-react';
import { GoldWaveDivider } from '@/components/BrandIcons';

export const Footer = () => {
  const t = useTranslations('footer');
  const navT = useTranslations('nav');
  const locale = useLocale();
  const prefix = locale === 'ur' ? '/ur' : '';

  return (
    <footer className="relative bg-[#070605] border-t border-[rgba(201,162,75,0.22)] pb-24 md:pb-12 text-[#a79c82]">
      {/* Curved gold wave decoration at top */}
      <div className="mb-8">
        <GoldWaveDivider flip />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="relative h-12 w-44">
              <Image
                src="/images/aura-logo-transparent.png"
                alt="Aura Marriage Bureau"
                fill
                sizes="176px"
                className="object-contain object-left"
              />
            </div>
            <p className="font-serif italic text-sm text-[#ecd290]/90 max-w-sm">
              &ldquo;{SITE_CONFIG.tagline}&rdquo;
            </p>
            <p className="text-xs text-[#a79c82] max-w-md leading-relaxed">
              {t('disclaimer')}
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#ecd290]">
              Direct Contact
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#d4af61]" />
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="hover:text-[#f4ecda] transition-colors"
                  dir="ltr"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#d4af61]" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-[#f4ecda] transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#d4af61] mt-0.5 shrink-0" />
                <span>{SITE_CONFIG.city}, {SITE_CONFIG.country}</span>
              </li>
            </ul>
          </div>

          {/* Quick Links & Legal */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#ecd290]">
              Navigation & Legal
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href={`${prefix}/#how-it-works`}
                  className="hover:text-[#f4ecda] transition-colors"
                >
                  {navT('howItWorks')}
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/form`}
                  className="text-[#ecd290] hover:underline"
                >
                  {navT('fillForm')}
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/terms`}
                  className="hover:text-[#f4ecda] transition-colors"
                >
                  {navT('terms')}
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/privacy`}
                  className="hover:text-[#f4ecda] transition-colors"
                >
                  {navT('privacy')}
                </Link>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(201,162,75,0.3)] text-[#ecd290] transition hover:border-[#d4af61] hover:bg-[#d4af61]/10"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={SITE_CONFIG.threadsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Threads"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(201,162,75,0.3)] text-[#ecd290] transition hover:border-[#d4af61] hover:bg-[#d4af61]/10"
              >
                <AtSign className="h-4 w-4" />
              </a>
              {SITE_CONFIG.facebookUrl && (
                <a
                  href={SITE_CONFIG.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(201,162,75,0.3)] text-[#ecd290] transition hover:border-[#d4af61] hover:bg-[#d4af61]/10"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[rgba(201,162,75,0.12)] text-center text-xs text-[#a79c82]/80">
          <p>{t('rights')}</p>
        </div>
      </div>
    </footer>
  );
};
