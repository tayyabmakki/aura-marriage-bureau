export const SITE_CONFIG = {
  name: "Aura Marriage Bureau",
  consultant: "Muhammad Tayyab Makki",
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
  sampleRefId: "AU-049",
  city: "Lahore",
  country: "Pakistan",

  // Office Location & Consultation Hours
  isAddressConfirmed: true,
  isHoursConfirmed: true,
  officeAddress: "Mezzanine Floor, 95 - S Block, Opposite LACAS School System, Imperial Garden Homes, Paragon City, Barki Rd, Block D Cantt, Lahore, 54000",
  officeAddressUr: "میزانین فلور، 95 - ایس بلاک، بالمقابل لاکاس (LACAS) اسکول سسٹم، امپیریل گارڈن ہومز، پیراگون سٹی، برکی روڈ، بلاک ڈی کینٹ، لاہور، 54000",
  streetAddress: "Mezzanine Floor, 95 - S Block, Opposite LACAS School System, Imperial Garden Homes, Paragon City, Barki Rd, Block D Cantt",
  postalCode: "54000",
  hours: {
    display: "Daily, 10:00 AM – 7:00 PM (By Appointment)",
    displayUr: "روزانہ، صبح 10:00 تا شام 7:00 (پیشگی وقت کے ساتھ)",
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
  openingHoursDisplay: "Daily, 10:00 AM – 7:00 PM (By Appointment)",
  openingHoursDisplayUr: "روزانہ، صبح 10:00 تا شام 7:00 (پیشگی وقت کے ساتھ)",
  directionsUrl: "https://maps.app.goo.gl/q84pz8FuzNcEdWiU8",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.7607736696425!2d74.45056557635293!3d31.524584447385973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190f23665fecc7%3A0xb327e16a24193245!2sAura%20Marriage%20Bureau!5e0!3m2!1sen!2spk!4v1730990000000!5m2!1sen!2spk",

  // Verified Location Coordinates (Exact GPS Pin: 31°31'28.5"N 74°27'11.3"E)
  mapCoordinates: { lat: 31.524580, lng: 74.453141 } as { lat: number; lng: number } | null,
  dmsCoordinates: `31°31'28.5"N 74°27'11.3"E`,
  googleReviewUrl: "https://share.google/sZJY8BZlVrTdRIhrI",

  // Feature Flags
  SHOW_FEES: false,
  ENABLE_SUBMIT: false,
  LEGAL_REVIEWED: true,
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
