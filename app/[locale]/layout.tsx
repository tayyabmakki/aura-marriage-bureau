import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Lora, Montserrat, Noto_Nastaliq_Urdu } from 'next/font/google';
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
  weight: ['400', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['italic', 'normal'],
  variable: '--font-lora',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
});

const notoUrdu = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-noto-urdu',
  display: 'swap',
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

  // JSON-LD schema (omitting null coordinates, address, and hours per strict rule)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_CONFIG.name,
    image: 'https://auramarriagebureau.pk/images/hero-main.webp',
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    areaServed: SITE_CONFIG.countriesServed.map((c) => c.nameEn),
    sameAs: [
      SITE_CONFIG.instagramUrl,
      SITE_CONFIG.threadsUrl,
      ...(SITE_CONFIG.facebookUrl ? [SITE_CONFIG.facebookUrl] : []),
    ],
  };

  return (
    <html
      lang={locale}
      dir={isUrdu ? 'rtl' : 'ltr'}
      className={`${cormorant.variable} ${lora.variable} ${montserrat.variable} ${
        isUrdu ? notoUrdu.variable : ''
      }`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0a0908] text-[#f4ecda] antialiased selection:bg-[#d4af61]/30 selection:text-[#ecd290]">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Preloader />
          <Header />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <StickyBottomBar />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
