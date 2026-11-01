'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';

export type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type LogoLayout = 'horizontal' | 'vertical' | 'icon-only';

export interface BrandLogoProps {
  size?: LogoSize;
  layout?: LogoLayout;
  asLink?: boolean;
  href?: string;
  showSubtitle?: boolean;
  locationSuffix?: string;
  priority?: boolean;
  className?: string;
  ariaLabel?: string;
}

const CFG: Record<LogoSize, { w: number; h: number }> = {
  xs: { w: 72, h: 32 },
  sm: { w: 90, h: 40 },
  md: { w: 118, h: 52 },
  lg: { w: 145, h: 64 },
  xl: { w: 200, h: 88 },
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  layout = 'horizontal',
  asLink = true,
  href,
  locationSuffix,
  priority = false,
  className = '',
  ariaLabel = 'Aura Marriage Bureau Home',
}) => {
  const locale = useLocale();
  const prefix = locale === 'ur' ? '/ur' : '';
  const targetHref = href !== undefined ? href : (prefix || '/');
  const c = CFG[size];
  const isVert = layout === 'vertical' || Boolean(locationSuffix);

  const content = (
    <div
      className={`inline-flex flex-col ${isVert ? 'items-center text-center' : 'items-start text-left'} ${className}`}
    >
      <Image
        src="/images/aura-logo-transparent.png"
        alt="Aura Marriage Bureau"
        width={c.w * 2}
        height={c.h * 2}
        priority={priority}
        className={`h-auto object-contain select-none ${isVert ? 'mx-auto' : ''}`}
        style={{
          width: `${c.w}px`,
          height: 'auto',
          maxHeight: `${c.h}px`,
          filter: 'drop-shadow(0 2px 8px rgba(212,175,97,0.22))',
        }}
      />
      {locationSuffix && (
        <span
          className={`text-[9px] sm:text-[10px] font-medium tracking-[0.24em] uppercase text-[#a79c82]/85 mt-1.5 block select-none ${isVert ? 'text-center w-full' : ''}`}
          style={{ letterSpacing: '0.22em' }}
        >
          {locationSuffix}
        </span>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link
        href={targetHref}
        aria-label={ariaLabel}
        className={`group inline-flex ${isVert ? 'flex-col items-center justify-center text-center' : 'items-center'} text-decoration-none hover:opacity-90 active:scale-[0.98] transition-all duration-200`}
      >
        {content}
      </Link>
    );
  }

  return content;
};

export default BrandLogo;
