'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { SITE_CONFIG } from '@/lib/config';
import { MessageCircle, Phone } from 'lucide-react';

export const StickyBottomBar = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const isUrdu = locale === 'ur';

  // Hidden on /form and /ur/form step screens where the wizard sticky bar replaces it
  if (pathname.includes('/form')) {
    return null;
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 transform-gpu border-t border-[rgba(201,162,75,0.25)] bg-[#0a0908]/95 px-3 py-2 sm:py-2.5 backdrop-blur-lg md:hidden safe-bottom">
      <div className="mx-auto flex max-w-md items-center gap-2">
        {/* Call Button */}
        <a
          href={`tel:${SITE_CONFIG.phoneRaw}`}
          className="btn-line min-w-0 flex-1 inline-flex items-center justify-center gap-1.5 py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-full text-xs font-semibold text-[#ecd290] shadow-sm whitespace-nowrap active:scale-[0.98] transition-all"
          aria-label={`Call ${SITE_CONFIG.name}`}
        >
          <Phone className="h-3.5 w-3.5 shrink-0 text-[#d4af61]" />
          <span>{isUrdu ? 'کال کریں' : 'Call'}</span>
          <span className="hidden xs:inline">{isUrdu ? '' : ' Consultant'}</span>
        </a>

        {/* WhatsApp Button (Primary Gold Gradient) */}
        <a
          href={SITE_CONFIG.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold min-w-0 flex-1 inline-flex items-center justify-center gap-1.5 py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-full text-xs font-bold text-black shadow-lg whitespace-nowrap active:scale-[0.98] transition-all"
          aria-label="Message on WhatsApp"
        >
          <MessageCircle className="h-3.5 w-3.5 shrink-0 text-[#144f2b] fill-current" />
          <span>{isUrdu ? 'واٹس ایپ' : 'WhatsApp'}</span>
        </a>
      </div>
    </div>
  );
};
