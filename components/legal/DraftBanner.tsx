import React from 'react';
import { useTranslations } from 'next-intl';
import { SITE_CONFIG } from '@/lib/config';
import { AlertTriangle } from 'lucide-react';

export const DraftBanner = () => {
  const t = useTranslations('legal');

  if (SITE_CONFIG.LEGAL_REVIEWED) {
    return null;
  }

  return (
    <div className="mb-8 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-xs sm:text-sm text-amber-200 flex items-start gap-3">
      <AlertTriangle className="h-5 w-5 shrink-0 text-amber-400 mt-0.5" />
      <div>
        <p className="font-semibold">{t('draftNotice')}</p>
        <p className="text-amber-200/80 mt-1">
          This policy is provided as an initial structural draft for Aura Marriage Bureau and will be formally ratified by Pakistani matrimonial legal counsel before final publication.
        </p>
      </div>
    </div>
  );
};
