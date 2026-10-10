'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { SITE_CONFIG } from '@/lib/config';
import { MessageCircle, Phone, Mail, Navigation, Clock, MapPin, User, Compass } from 'lucide-react';

export const ContactSection = () => {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [loadMap, setLoadMap] = useState(false);

  return (
    <section id="contact" className="relative bg-[#0a0908] py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-[#ecd290]">
            {t('eyebrow')}
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-[#f4ecda] sm:text-4xl">
            {t('title')}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Office Image and Click-to-load Map Card */}
          <div className="lg:col-span-6 overflow-hidden rounded-2xl border border-[rgba(201,162,75,0.22)] bg-[#16130f]">
            <div className="relative h-64 w-full sm:h-72">
              <Image
                src="/images/visit-office.webp"
                alt={t('mapAlt')}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16130f] via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 start-4 rounded-full border border-[#d4af61]/40 bg-black/70 px-3 py-1 text-xs text-[#ecd290] backdrop-blur-sm">
                {SITE_CONFIG.city}, {SITE_CONFIG.country}
              </div>
            </div>

            {/* Click-to-load map (iframe only on tap, query built from verified address) */}
            <div className="p-4 border-t border-[rgba(201,162,75,0.15)]">
              {!loadMap ? (
                <button
                  type="button"
                  onClick={() => setLoadMap(true)}
                  className="btn-line w-full text-xs flex items-center justify-center gap-2 py-3"
                  aria-label="Load interactive office map"
                >
                  <Compass className="h-4 w-4 text-[#ecd290]" />
                  <span>{locale === 'ur' ? 'انٹرایکٹو نقشہ کھولیں' : 'Load interactive map'}</span>
                </button>
              ) : (
                <iframe
                  title="Aura Marriage Bureau Office Map"
                  src={SITE_CONFIG.mapEmbedUrl}
                  className="h-60 w-full rounded-xl border border-[rgba(201,162,75,0.2)]"
                  loading="lazy"
                />
              )}
            </div>
          </div>

          {/* Contact Details & Action Buttons */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="rounded-2xl border border-[rgba(201,162,75,0.2)] bg-[#16130f] p-6 space-y-4">
              {/* Consultant */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d4af61]/20 text-[#ecd290]">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#f4ecda]">
                    {SITE_CONFIG.consultant}
                  </h3>
                  <p className="text-xs text-[#ecd290]">{t('consultantRole')}</p>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex items-start gap-3.5 pt-3 border-t border-[rgba(201,162,75,0.12)]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d4af61]/20 text-[#ecd290]">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#a79c82]">
                    Location
                  </h4>
                  <p className="text-sm text-[#f4ecda]/90 mt-0.5 leading-relaxed">
                    {SITE_CONFIG.officeAddress}
                  </p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3.5 pt-3 border-t border-[rgba(201,162,75,0.12)]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d4af61]/20 text-[#ecd290]">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#a79c82]">
                    Consultation Hours
                  </h4>
                  <p className="text-sm text-[#f4ecda]/90 mt-0.5">
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
                className="btn-gold text-center text-sm font-semibold"
              >
                <MessageCircle className="me-2 h-4 w-4" />
                {t('btnWhatsApp')}
              </a>

              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                aria-label={`Call ${SITE_CONFIG.name}`}
                className="btn-line text-center text-sm font-semibold"
              >
                <Phone className="me-2 h-4 w-4" />
                {t('btnCall')}
              </a>

              <a
                href={`mailto:${SITE_CONFIG.email}`}
                aria-label={`Email ${SITE_CONFIG.name}`}
                className="btn-line text-center text-sm font-semibold"
              >
                <Mail className="me-2 h-4 w-4" />
                {t('btnEmail')}
              </a>

              <a
                href={SITE_CONFIG.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={locale === 'ur' ? 'اورا میرج بیورو کی لوکیشن اور راستہ' : 'Directions to Aura Marriage Bureau'}
                className="btn-line text-center text-sm font-semibold"
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
