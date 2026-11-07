'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { SITE_CONFIG } from '@/lib/config';
import {
  MessageCircle,
  Phone,
  Mail,
  Navigation,
  Clock,
  MapPin,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

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
          <p className="text-xs uppercase tracking-kicker text-[#ecd290] font-semibold">
            {t('eyebrow')}
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-[#f4ecda] sm:text-4xl">
            {t('title')}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Left Column: Office Lounge & Pre-Loaded Live Map Card */}
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
              <div className="absolute top-3 start-3 rounded-full border border-[rgba(201,162,75,0.35)] bg-black/75 px-3 py-1 text-xs font-medium text-[#ecd290] backdrop-blur-md flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#d4af61]" />
                <span>{locale === 'ur' ? 'پرائیویٹ کنسلٹیشن لاؤنج · لاہور' : 'Private Consultation Lounge · Lahore'}</span>
              </div>
              <div className="absolute bottom-3 start-3 text-xs text-[#c4b99f] font-serif italic">
                &ldquo;{locale === 'ur' ? 'جہاں باوقار خاندان سکون اور اعتماد سے ملتے ہیں' : 'Where families meet with dignity and peace'}&rdquo;
              </div>
            </div>

            {/* Embedded Live Map - DISPLAYING LOCATION PIN */}
            <div className="relative flex-1 min-h-[280px] sm:min-h-[320px] w-full border-t border-[rgba(201,162,75,0.18)] overflow-hidden">
              {/* Pinned Marker Indicator Pill */}
              <div className="pointer-events-none absolute top-3 end-3 z-10 flex items-center gap-1.5 rounded-full border border-[rgba(201,162,75,0.45)] bg-[#14120e]/95 px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-medium text-[#ecd290] shadow-[0_4px_16px_rgba(0,0,0,0.6)] backdrop-blur-md max-w-[calc(100%-24px)] truncate">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af61] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af61]"></span>
                </span>
                <span className="truncate">
                  {locale === 'ur'
                    ? `پن لوکیشن: ${SITE_CONFIG.dmsCoordinates}`
                    : `Pinned: ${SITE_CONFIG.dmsCoordinates}`}
                </span>
              </div>

              <iframe
                title="Aura Marriage Bureau Office Map"
                src={SITE_CONFIG.mapEmbedUrl}
                className="h-full w-full border-0 min-h-[280px] sm:min-h-[320px]"
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Interactive Google Map showing Aura Marriage Bureau location in Paragon City Lahore"
              />
            </div>

            {/* Direct Interactive Link Bar */}
            <div className="p-4 border-t border-[rgba(201,162,75,0.18)] bg-[#0d0b09] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-xs text-[#ecd290]">
                <MapPin className="h-4 w-4 text-[#d4af61] shrink-0" />
                <div className="flex flex-col">
                  <span className="font-medium" title={SITE_CONFIG.officeAddress}>
                    {locale === 'ur'
                      ? '95 - ایس بلاک، بالمقابل لاکاس، پیراگون سٹی، لاہور'
                      : '95 - S Block, Opp. LACAS, Paragon City, Lahore'}
                  </span>
                  <span className="text-[10px] text-[#a79c82] font-mono">
                    {SITE_CONFIG.dmsCoordinates}
                  </span>
                </div>
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

          {/* Right Column: Executive Consultant Profile Card */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-5">
            <div className="flex-1 flex flex-col justify-between rounded-2xl border border-[rgba(201,162,75,0.25)] bg-[#14120e] p-6 sm:p-7 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
              {/* Top: Consultant Real Picture & Identity */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 pb-5 border-b border-[rgba(201,162,75,0.16)]">
                <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-2xl border-2 border-[rgba(201,162,75,0.45)] bg-[#1a1713] shadow-[0_8px_24px_rgba(212,175,97,0.25)]">
                  <Image
                    src="/images/consultant-tayyab.webp"
                    alt={`${SITE_CONFIG.consultant} - Matrimonial Consultant`}
                    fill
                    sizes="(max-width: 640px) 96px, 112px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(201,162,75,0.25)] bg-[rgba(212,175,97,0.08)] px-3 py-0.5 text-xs font-medium text-[#ecd290]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#d4af61]" />
                    <span>{locale === 'ur' ? 'فیملی میچ میکنگ کنسلٹنٹ' : 'Matrimonial Consultant'}</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#f4ecda]">
                    {SITE_CONFIG.consultant}
                  </h3>
                  <p className="text-xs text-[#c4b99f] leading-relaxed">
                    {locale === 'ur'
                      ? 'والدین اور سرپرستوں کے ساتھ براہِ راست، باوقار اور مکمل پرائیویٹ فیملی مشاورت۔'
                      : 'Personal, dignified matrimonial consultations conducted directly with parents & guardians.'}
                  </p>
                </div>
              </div>

              {/* Middle: Key Advisory Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 py-4 border-b border-[rgba(201,162,75,0.12)]">
                <div className="flex items-center gap-2 text-xs text-[#c4b99f]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#d4af61] shrink-0" />
                  <span>{locale === 'ur' ? 'خاندانی وقار اور مکمل رازداری' : 'Parent-Supervised Dignity'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#c4b99f]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#d4af61] shrink-0" />
                  <span>{locale === 'ur' ? 'محفوظ ریفرنس آئی ڈی سسٹم' : 'Confidential Ref ID Matching'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#c4b99f]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#d4af61] shrink-0" />
                  <span>{locale === 'ur' ? 'تعلیم یافتہ اور کاروباری گھرانے' : 'Educated & Business Families'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#c4b99f]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#d4af61] shrink-0" />
                  <span>{locale === 'ur' ? 'لاہور اور گلوبل اوورسیز' : 'Lahore & Global Overseas'}</span>
                </div>
              </div>

              {/* Bottom Details: Location & Hours */}
              <div className="space-y-3.5 pt-4">
                {/* Office Location */}
                <div className="flex items-start gap-3.5">
                  <a
                    href={SITE_CONFIG.directionsUrl || 'https://www.google.com/maps/search/?api=1&query=Paragon+City+Barki+Rd+Cantt+Lahore+Pakistan'}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open office location in Google Maps"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(201,162,75,0.35)] bg-black/60 text-[#ecd290] shadow-[0_2px_10px_rgba(212,175,97,0.2)] hover:border-[#d4af61] hover:bg-[#d4af61]/20 transition-all mt-0.5"
                  >
                    <MapPin className="h-5 w-5" />
                  </a>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#a79c82]">
                      {locale === 'ur' ? 'دفتر کا پتہ' : 'Office Location'}
                    </h4>
                    <a
                      href={SITE_CONFIG.directionsUrl || 'https://www.google.com/maps/search/?api=1&query=Paragon+City+Barki+Rd+Cantt+Lahore+Pakistan'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block text-xs sm:text-sm text-[#f4ecda] mt-0.5 leading-relaxed hover:text-[#ecd290] transition-colors"
                      title="Click to open exact location in Google Maps (opens in new tab)"
                    >
                      <span>{locale === 'ur' ? SITE_CONFIG.officeAddressUr : SITE_CONFIG.officeAddress}</span>
                      <span className="ms-1.5 inline-flex items-center text-xs font-semibold text-[#d4af61] group-hover:underline">
                        ↗ Google Maps
                      </span>
                    </a>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3.5 pt-2">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(201,162,75,0.35)] bg-black/60 text-[#ecd290] shadow-[0_2px_10px_rgba(212,175,97,0.2)]">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#a79c82]">
                      {locale === 'ur' ? 'اوقاتِ مشاورت' : 'Consultation Hours'}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#f4ecda]/90 mt-0.5">
                      <bdi dir="ltr">
                        {locale === 'ur' ? SITE_CONFIG.openingHoursDisplayUr : SITE_CONFIG.openingHoursDisplay}
                      </bdi>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons (Spacious 2-column grid so WhatsApp Chat never wraps) */}
            <div className="grid grid-cols-1 gap-2.5 sm:gap-3 sm:grid-cols-2 shrink-0">
              {/* WhatsApp Button */}
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message Aura Marriage Bureau on WhatsApp"
                className="flex min-h-[42px] sm:min-h-[48px] items-center justify-center gap-2 rounded-full border border-[rgba(201,162,75,0.35)] bg-black/60 px-3.5 sm:px-5 py-2.5 sm:py-3 text-[11px] sm:text-sm font-semibold text-[#ecd290] backdrop-blur-md shadow-sm transition-all duration-300 hover:border-[#d4af61] hover:bg-[#d4af61]/15 hover:text-white hover:shadow-[0_0_16px_rgba(212,175,97,0.25)]"
              >
                <MessageCircle className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-[#25D366] shrink-0" />
                <span className="whitespace-nowrap">{t('btnWhatsApp')}</span>
              </a>

              {/* Direct Call Button */}
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                aria-label={`Call ${SITE_CONFIG.name}`}
                className="flex min-h-[42px] sm:min-h-[48px] items-center justify-center gap-2 rounded-full border border-[rgba(201,162,75,0.25)] bg-black/40 px-3.5 sm:px-5 py-2.5 sm:py-3 text-[11px] sm:text-sm font-semibold text-[#f4ecda] backdrop-blur-md transition-all duration-300 hover:border-[#d4af61] hover:bg-[#d4af61]/10 hover:text-[#ecd290]"
              >
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#d4af61] shrink-0" />
                <span className="whitespace-nowrap">{t('btnCall')}</span>
              </a>

              {/* Send Email Button */}
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                aria-label={`Email ${SITE_CONFIG.name}`}
                className="flex min-h-[42px] sm:min-h-[48px] items-center justify-center gap-2 rounded-full border border-[rgba(201,162,75,0.25)] bg-black/40 px-3.5 sm:px-5 py-2.5 sm:py-3 text-[11px] sm:text-sm font-semibold text-[#f4ecda] backdrop-blur-md transition-all duration-300 hover:border-[#d4af61] hover:bg-[#d4af61]/10 hover:text-[#ecd290]"
              >
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#d4af61] shrink-0" />
                <span className="whitespace-nowrap">{t('btnEmail')}</span>
              </a>

              {/* Get Directions Button */}
              <a
                href={SITE_CONFIG.directionsUrl || 'https://www.google.com/maps/search/?api=1&query=Paragon+City+Barki+Rd+Cantt+Lahore+Pakistan'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={locale === 'ur' ? 'اورا میرج بیورو کی لوکیشن اور راستہ' : 'Directions to Aura Marriage Bureau'}
                className="flex min-h-[42px] sm:min-h-[48px] items-center justify-center gap-2 rounded-full border border-[rgba(201,162,75,0.25)] bg-black/40 px-3.5 sm:px-5 py-2.5 sm:py-3 text-[11px] sm:text-sm font-semibold text-[#f4ecda] backdrop-blur-md transition-all duration-300 hover:border-[#d4af61] hover:bg-[#d4af61]/10 hover:text-[#ecd290]"
              >
                <Navigation className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#d4af61] shrink-0" />
                <span className="whitespace-nowrap">{t('btnDirections')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
