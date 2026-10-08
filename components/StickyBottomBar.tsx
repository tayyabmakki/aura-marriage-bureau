'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { SITE_CONFIG } from '@/lib/config';
import { MessageCircle, Phone } from 'lucide-react';

export const StickyBottomBar = () => {
  const pathname = usePathname();
  const t = useTranslations('hero');

  // Hidden on /form and /ur/form step screens where the wizard sticky bar replaces it
  if (pathname.includes('/form')) {
    return null;
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-[rgba(201,162,75,0.25)] bg-[#0a0908]/95 px-4 py-3 backdrop-blur-lg md:hidden safe-bottom">
      <div className="mx-auto flex max-w-md items-center gap-3">
        {/* Call Button */}
        <a
          href={`tel:${SITE_CONFIG.phoneRaw}`}
          className="btn-line flex-1 text-center text-xs font-semibold tracking-wider text-[#ecd290]"
          aria-label={`Call ${SITE_CONFIG.name}`}
        >
          <Phone className="me-1.5 h-4 w-4" />
          {t('ctaCall')}
        </a>

        {/* WhatsApp Button (Primary Gold Gradient) */}
        <a
          href={SITE_CONFIG.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold flex-[1.4] text-center text-xs font-bold tracking-wider shadow-lg"
          aria-label={`Message on WhatsApp`}
        >
          <MessageCircle className="me-1.5 h-4 w-4" />
          {t('ctaWhatsApp')}
        </a>
      </div>
    </div>
  );
};
