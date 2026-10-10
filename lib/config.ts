export const SITE_CONFIG = {
  name: "Aura Marriage Bureau",
  consultant: "Muhammad Tayyab",
  phone: "+92 339 4519797",
  phoneRaw: "+923394519797",
  whatsappNumber: "923394519797",
  whatsappUrl: "https://wa.me/923394519797",
  email: "auramarriagebureau.pk@gmail.com",
  instagramHandle: "@auramarriagebureau",
  instagramUrl: "https://www.instagram.com/auramarriagebureau/",
  threadsHandle: "@auramarriagebureau",
  threadsUrl: "https://www.threads.net/@auramarriagebureau",
  facebookName: "Aura Marriage Bureau",
  facebookUrl: "https://www.facebook.com/profile.php?id=61594977652723",
  tagline: "Where Destinies Align & Aura's Connect",
  hook: "Let's Find Your Perfect Match",
  footerLine: "Matrimonial Services | Pakistan & Overseas",
  refIdFormat: "AMB-001",
  sampleRefId: "AMB-SAMPLE",
  city: "Lahore",
  country: "Pakistan",

  // Real Owner-Supplied Address & Consultation Hours
  officeAddress: "Mezzanine Floor, 95 - S Block, Opposite LACAS School System, Imperial Garden Homes, Paragon City, Barki Rd, Cantt, Lahore, Pakistan 5400",
  streetAddress: "Mezzanine Floor, 95 - S Block, Opposite LACAS School System, Imperial Garden Homes, Paragon City, Barki Rd, Cantt, Lahore, Pakistan",
  hours: {
    display: "Daily, 10:00 AM – 7:00 PM (PKT)",
    displayUr: "روزانہ، صبح 10:00 تا شام 7:00 (پاکستان وقت)",
    opens: "10:00",
    closes: "19:00",
    timezone: "Asia/Karachi",
    days: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ] as const,
  },
  openingHoursDisplay: "Daily, 10:00 AM – 7:00 PM (PKT)",
  openingHoursDisplayUr: "روزانہ، صبح 10:00 تا شام 7:00 (پاکستان وقت)",
  directionsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Mezzanine Floor, 95 - S Block, Opposite LACAS School System, Imperial Garden Homes, Paragon City, Barki Rd, Cantt, Lahore, Pakistan 5400")}`,
  mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent("Mezzanine Floor, 95 - S Block, Opposite LACAS School System, Imperial Garden Homes, Paragon City, Barki Rd, Cantt, Lahore, Pakistan 5400")}&output=embed`,

  // Verified Placeholders (stay null per strict hard rules)
  googleReviewUrl: null as string | null,
  mapCoordinates: null as { lat: number; lng: number } | null,

  // Feature Flags
  SHOW_FEES: false,
  ENABLE_SUBMIT: false,
  LEGAL_REVIEWED: false,
  HERO_PHOTO_LICENSED: true,

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
