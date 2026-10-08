export const SITE_CONFIG = {
  name: "Aura Marriage Bureau",
  consultant: "Muhammad Tayyab",
  phone: "+92 339 4519797",
  phoneRaw: "+923394519797",
  whatsappNumber: "923394519797",
  whatsappUrl: "https://wa.me/923394519797",
  email: "auramarriagebureau.pk@gmail.com",
  instagramHandle: "@auramarriagebureau",
  instagramUrl: "https://www.instagram.com/auramarriagebureau",
  threadsHandle: "@auramarriagebureau",
  threadsUrl: "https://www.threads.net/@auramarriagebureau",
  facebookName: "Aura Marriage Bureau",
  facebookUrl: null as string | null, // Placeholder: URL to be provided
  tagline: "Where Destinies Align & Aura's Connect",
  hook: "Let's Find Your Perfect Match",
  footerLine: "Matrimonial Services | Pakistan & Overseas",
  refIdFormat: "AMB-001",
  sampleRefId: "AMB-SAMPLE",
  city: "Lahore",
  country: "Pakistan",

  // Placeholders (typed null, UI renders graceful coming-soon/hidden states)
  officeAddress: null as string | null,
  openingHours: null as string | null,
  googleReviewUrl: null as string | null,
  mapCoordinates: null as { lat: number; lng: number } | null,

  // Feature Flags
  SHOW_FEES: false,
  ENABLE_SUBMIT: false,
  LEGAL_REVIEWED: false,
  HERO_PHOTO_LICENSED: false,

  // Internal Fee structure (NEVER render publicly when SHOW_FEES is false)
  fees: {
    registrationFeePkr: 10000,
    registrationDuration: "1 year",
    finalFeePakistanPkr: 50000,
    finalFeeOverseasPkr: 80000,
  },

  countriesServed: [
    { code: "PK", nameEn: "Pakistan", nameUr: "پاکستان" },
    { code: "GB", nameEn: "United Kingdom", nameUr: "برطانیہ" },
    { code: "US", nameEn: "USA", nameUr: "امریکہ" },
    { code: "CA", nameEn: "Canada", nameUr: "کینیڈا" },
    { code: "AU", nameEn: "Australia", nameUr: "آسٹریلیا" },
    { code: "AE", nameEn: "UAE", nameUr: "متحدہ عرب امارات" },
  ],
} as const;
