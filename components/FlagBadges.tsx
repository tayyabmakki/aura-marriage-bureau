import React from 'react';

export const FlagPakistan = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 36 36" className={className} aria-hidden="true" focusable="false">
    <circle cx="18" cy="18" r="18" fill="#01411C" />
    <path d="M0 18a18 18 0 0 0 6 13.4V4.6A18 18 0 0 0 0 18z" fill="#FFFFFF" />
    <path d="M24.2 12.8a6.5 6.5 0 1 1-6.1 8.8 7.5 7.5 0 1 0 6.1-8.8z" fill="#FFFFFF" />
    <polygon points="23.5,15.2 24.6,18.5 21.8,16.5 25.2,16.5 22.4,18.5" fill="#FFFFFF" />
  </svg>
);

export const FlagUK = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 36 36" className={className} aria-hidden="true" focusable="false">
    <clipPath id="circle-uk"><circle cx="18" cy="18" r="18" /></clipPath>
    <g clipPath="url(#circle-uk)">
      <rect width="36" height="36" fill="#012169" />
      <path d="M0 0 L36 36 M36 0 L0 36" stroke="#FFFFFF" strokeWidth="6" />
      <path d="M0 0 L36 36 M36 0 L0 36" stroke="#C8102E" strokeWidth="3" />
      <path d="M18 0 V36 M0 18 H36" stroke="#FFFFFF" strokeWidth="10" />
      <path d="M18 0 V36 M0 18 H36" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

export const FlagUS = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 36 36" className={className} aria-hidden="true" focusable="false">
    <clipPath id="circle-us"><circle cx="18" cy="18" r="18" /></clipPath>
    <g clipPath="url(#circle-us)">
      <rect width="36" height="36" fill="#B22234" />
      <path d="M0 5.5h36M0 11h36M0 16.5h36M0 22h36M0 27.5h36M0 33h36" stroke="#FFFFFF" strokeWidth="2.8" />
      <rect width="16" height="19" fill="#3C3B6E" />
      <circle cx="5" cy="5" r="1" fill="#FFFFFF" />
      <circle cx="11" cy="5" r="1" fill="#FFFFFF" />
      <circle cx="8" cy="9.5" r="1" fill="#FFFFFF" />
      <circle cx="5" cy="14" r="1" fill="#FFFFFF" />
      <circle cx="11" cy="14" r="1" fill="#FFFFFF" />
    </g>
  </svg>
);

export const FlagCanada = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 36 36" className={className} aria-hidden="true" focusable="false">
    <clipPath id="circle-ca"><circle cx="18" cy="18" r="18" /></clipPath>
    <g clipPath="url(#circle-ca)">
      <rect width="36" height="36" fill="#FF0000" />
      <rect x="9" width="18" height="36" fill="#FFFFFF" />
      <path d="M18 9l1.5 4.5 3.5-1.5-1.5 4 4 1-3.5 2.5 1 3.5-4-1.5-1 3.5-1-3.5-4 1.5 1-3.5-3.5-2.5 4-1-1.5-4 3.5 1.5z" fill="#FF0000" />
    </g>
  </svg>
);

export const FlagAustralia = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 36 36" className={className} aria-hidden="true" focusable="false">
    <clipPath id="circle-au"><circle cx="18" cy="18" r="18" /></clipPath>
    <g clipPath="url(#circle-au)">
      <rect width="36" height="36" fill="#00008B" />
      <g transform="scale(0.5)">
        <rect width="36" height="36" fill="#012169" />
        <path d="M0 0 L36 36 M36 0 L0 36" stroke="#FFFFFF" strokeWidth="6" />
        <path d="M0 0 L36 36 M36 0 L0 36" stroke="#C8102E" strokeWidth="3" />
        <path d="M18 0 V36 M0 18 H36" stroke="#FFFFFF" strokeWidth="10" />
        <path d="M18 0 V36 M0 18 H36" stroke="#C8102E" strokeWidth="6" />
      </g>
      <circle cx="28" cy="10" r="1.5" fill="#FFFFFF" />
      <circle cx="24" cy="16" r="1.5" fill="#FFFFFF" />
      <circle cx="31" cy="18" r="1.5" fill="#FFFFFF" />
      <circle cx="27" cy="26" r="1.5" fill="#FFFFFF" />
      <circle cx="10" cy="27" r="2.5" fill="#FFFFFF" />
    </g>
  </svg>
);

export const FlagUAE = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 36 36" className={className} aria-hidden="true" focusable="false">
    <clipPath id="circle-ae"><circle cx="18" cy="18" r="18" /></clipPath>
    <g clipPath="url(#circle-ae)">
      <rect width="36" height="12" fill="#00732F" />
      <rect y="12" width="36" height="12" fill="#FFFFFF" />
      <rect y="24" width="36" height="12" fill="#000000" />
      <rect width="10" height="36" fill="#FF0000" />
    </g>
  </svg>
);

export const FlagSaudiArabia = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 36 36" className={className} aria-hidden="true" focusable="false">
    <circle cx="18" cy="18" r="18" fill="#006C35" />
    <path d="M12 18h12M14 21l8-1" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="18" cy="14" r="2" fill="#FFFFFF" />
  </svg>
);

export const FLAG_MAP: Record<string, React.FC<{ className?: string }>> = {
  PK: FlagPakistan,
  GB: FlagUK,
  US: FlagUS,
  CA: FlagCanada,
  AU: FlagAustralia,
  AE: FlagUAE,
  SA: FlagSaudiArabia,
};
