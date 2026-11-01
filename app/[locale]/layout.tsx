import type { Metadata, Viewport } from 'next';
import {
  Cormorant_Garamond,
  Lora,
  Montserrat,
  Noto_Nastaliq_Urdu,
  Noto_Naskh_Arabic,
} from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, Locale } from '@/i18n/routing';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StickyBottomBar } from '@/components/StickyBottomBar';
import { Preloader } from '@/components/Preloader';
import { SITE_CONFIG } from '@/lib/config';
import '../globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'serif'],
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-lora',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'serif'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
});

const notoUrdu = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400'],
  variable: '--font-noto-urdu',
  display: 'swap',
  preload: false,
  fallback: ['Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', 'serif'],
});

const notoNaskh = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '600'],
  variable: '--font-noto-naskh',
  display: 'swap',
  preload: false,
  fallback: ['Noto Naskh Arabic', 'system-ui', 'sans-serif'],
});

export const viewport: Viewport = {
  themeColor: '#0a0908',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isUrdu = locale === 'ur';

  const title = isUrdu
    ? `${SITE_CONFIG.name} — باوقار رشتے پاکستان اور اوورسیز | لاہور`
    : `${SITE_CONFIG.name} — Rishtas in Pakistan & Overseas | Lahore`;

  const description = isUrdu
    ? `خاندانی وقار اور مکمل رازداری کے ساتھ رشتوں کا بااعتماد ادارہ۔ لاہور، پاکستان اور بیرونِ ملک مقیم خاندانوں کے لیے باوقار تجاویز۔`
    : `Discreet, family-led matchmaking consultancy in Lahore, Pakistan. Facilitating respectful matrimonial proposals across Pakistan, UK, USA, Canada, Australia and UAE.`;

  const baseUrl = 'https://auramarriagebureau.pk';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: `%s · ${SITE_CONFIG.name}`,
    },
    description,
    alternates: {
      canonical: isUrdu ? `${baseUrl}/ur` : baseUrl,
      languages: {
        en: baseUrl,
        ur: `${baseUrl}/ur`,
        'x-default': baseUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: isUrdu ? `${baseUrl}/ur` : baseUrl,
      siteName: SITE_CONFIG.name,
      locale: isUrdu ? 'ur_PK' : 'en_PK',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.png', type: 'image/png', sizes: '32x32' },
        { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
        { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      shortcut: '/favicon.ico',
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const isUrdu = locale === 'ur';

  // JSON-LD schema per verified business data (omitting null coordinates, reviews, and unverified postal code)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_CONFIG.name,
    image: 'https://auramarriagebureau.pk/images/hero-main.webp',
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.streetAddress,
      addressLocality: SITE_CONFIG.city,
      postalCode: SITE_CONFIG.postalCode,
      addressCountry: 'PK',
    },
    ...(SITE_CONFIG.mapCoordinates
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: SITE_CONFIG.mapCoordinates.lat,
            longitude: SITE_CONFIG.mapCoordinates.lng,
          },
        }
      : {}),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: SITE_CONFIG.hours.opens,
        closes: SITE_CONFIG.hours.closes,
      },
    ],
    areaServed: SITE_CONFIG.countriesServed.map((c) => c.nameEn),
    sameAs: [
      SITE_CONFIG.instagramUrl,
      SITE_CONFIG.threadsUrl,
      SITE_CONFIG.facebookUrl,
    ],
  };

  return (
    <html
      lang={locale}
      dir={isUrdu ? 'rtl' : 'ltr'}
      className={`bg-[#0a0908] ${cormorant.variable} ${lora.variable} ${montserrat.variable} ${notoUrdu.variable} ${notoNaskh.variable}`}
      style={{ backgroundColor: '#0a0908', colorScheme: 'dark' }}
    >
      <head>
        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#0a0908" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="bg-[#0a0908] text-[#f4ecda] antialiased selection:bg-[#d4af61]/30 selection:text-[#ecd290]"
        style={{ backgroundColor: '#0a0908', colorScheme: 'dark' }}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Preloader />
          <Header />
          <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#0a0908]">
            {children}
          </main>
          <Footer />
          <StickyBottomBar />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
