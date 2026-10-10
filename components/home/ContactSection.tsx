'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { SITE_CONFIG } from '@/lib/config';
import { MessageCircle, Phone, Mail, Navigation, Clock, MapPin, User, ExternalLink } from 'lucide-react';

export const ContactSection = () => {
  const t = useTranslations('contact');
  const locale = useLocale();

  return (
    <section id="contact" className="relative bg-[#0a0908] py-18 sm:py-24 lg:py-28 overflow-hidden">
      {/* Ambient gold glow highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(212,175,97,0.07),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-[#ecd290]">
            {t('eyebrow')}
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-[#f4ecda] sm:text-4xl">
            {t('title')}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Pre-loaded Interactive Map & Office Card */}
          <div className="lg:col-span-6 flex flex-col overflow-hidden rounded-2xl border border-[rgba(201,162,75,0.25)] bg-[#14120e] shadow-[0_16px_40px_rgba(0,0,0,0.6)]">
            {/* Top: Office Lounge Preview Header */}
            <div className="relative h-44 sm:h-48 w-full shrink-0 overflow-hidden">
              <Image
                src="/images/visit-office.webp"
                alt={t('mapAlt')}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14120e] via-[#14120e]/40 to-transparent pointer-events-none" />
              <div className="absolute top-3 start-3 rounded-full border border-[rgba(201,162,75,0.35)] bg-black/75 px-3 py-1 text-xs font-medium text-[#ecd290] backdrop-blur-md">
                Private Consultation Lounge &bull; Lahore
              </div>
              <div className="absolute bottom-3 start-3 text-xs text-[#c4b99f] font-serif italic">
                &ldquo;Where families meet with dignity and peace&rdquo;
              </div>
            </div>

            {/* Embedded Live Map - ALREADY LOADED & DISPLAYING LOCATION PIN */}
            <div className="relative flex-1 min-h-[260px] sm:min-h-[290px] w-full border-t border-[rgba(201,162,75,0.18)]">
              <iframe
                title="Aura Marriage Bureau Office Map"
                src={SITE_CONFIG.mapEmbedUrl}
                className="h-full w-full border-0 min-h-[260px]"
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Interactive Google Map showing Aura Marriage Bureau location in Paragon City Lahore"
              />
            </div>

            {/* Direct Interactive Link Bar */}
            <div className="p-4 border-t border-[rgba(201,162,75,0.18)] bg-[#0d0b09] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-[#ecd290]">
                <MapPin className="h-4 w-4 text-[#d4af61] shrink-0" />
                <span className="font-medium">Paragon City, Barki Rd, Cantt, Lahore</span>
              </div>
              <a
                href={SITE_CONFIG.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full sm:w-auto text-center text-xs font-bold py-2.5 px-4 inline-flex items-center justify-center gap-1.5 shadow-md"
                title="Open in Google Maps in a new tab"
              >
                <span>{locale === 'ur' ? 'گوگل میپس پر کھولیں' : 'Open in Google Maps'}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Contact Details & Action Buttons */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="rounded-2xl border border-[rgba(201,162,75,0.22)] bg-[#14120e] p-6 sm:p-7 space-y-5 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
              {/* Consultant */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(201,162,75,0.35)] bg-black/60 text-[#ecd290] shadow-[0_2px_10px_rgba(212,175,97,0.2)]">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#f4ecda]">
                    {SITE_CONFIG.consultant}
                  </h3>
                  <p className="text-xs text-[#ecd290] font-medium">{t('consultantRole')}</p>
                </div>
              </div>

              {/* Office Address (FULLY INTERACTIVE - OPENS GOOGLE MAPS IN NEW TAB) */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-[rgba(201,162,75,0.12)]">
                <a
                  href={SITE_CONFIG.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open office location in Google Maps"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(201,162,75,0.35)] bg-black/60 text-[#ecd290] shadow-[0_2px_10px_rgba(212,175,97,0.2)] hover:border-[#d4af61] hover:bg-[#d4af61]/20 transition-all"
                >
                  <MapPin className="h-5 w-5" />
                </a>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#a79c82]">
                    Location
                  </h4>
                  <a
                    href={SITE_CONFIG.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block text-sm text-[#f4ecda] mt-1 leading-relaxed hover:text-[#ecd290] transition-colors"
                    title="Click to open exact location in Google Maps (opens in new tab)"
                  >
                    <span>{SITE_CONFIG.officeAddress}</span>
                    <span className="ms-1.5 inline-flex items-center text-xs font-semibold text-[#d4af61] group-hover:underline">
                      ↗ Google Maps
                    </span>
                  </a>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-[rgba(201,162,75,0.12)]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(201,162,75,0.35)] bg-black/60 text-[#ecd290] shadow-[0_2px_10px_rgba(212,175,97,0.2)]">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#a79c82]">
                    Consultation Hours
                  </h4>
                  <p className="text-sm text-[#f4ecda]/90 mt-1">
                    <bdi dir="ltr">
                      {locale === 'ur' ? SITE_CONFIG.openingHoursDisplayUr : SITE_CONFIG.openingHoursDisplay}
                    </bdi>
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons (Touch targets >= 48px) */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message Aura Marriage Bureau on WhatsApp"
                className="btn-gold text-center text-sm font-semibold py-3.5 shadow-md"
              >
                <MessageCircle className="me-2 h-4 w-4" />
                {t('btnWhatsApp')}
              </a>

              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                aria-label={`Call ${SITE_CONFIG.name}`}
                className="btn-line text-center text-sm font-semibold py-3.5"
              >
                <Phone className="me-2 h-4 w-4" />
                {t('btnCall')}
              </a>

              <a
                href={`mailto:${SITE_CONFIG.email}`}
                aria-label={`Email ${SITE_CONFIG.name}`}
                className="btn-line text-center text-sm font-semibold py-3.5"
              >
                <Mail className="me-2 h-4 w-4" />
                {t('btnEmail')}
              </a>

              <a
                href={SITE_CONFIG.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={locale === 'ur' ? 'اورا میرج بیورو کی لوکیشن اور راستہ' : 'Directions to Aura Marriage Bureau'}
                className="btn-line text-center text-sm font-semibold py-3.5"
              >
                <Navigation className="me-2 h-4 w-4" />
                {t('btnDirections')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
