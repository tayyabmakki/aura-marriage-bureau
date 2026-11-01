import React from 'react';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { HeroSection } from '@/components/home/HeroSection';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
import { MosaicSection } from '@/components/home/MosaicSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { PrivacyPromiseSection } from '@/components/home/PrivacyPromiseSection';
import { ProfileSampleSection } from '@/components/home/ProfileSampleSection';
import { FormPromoSection } from '@/components/home/FormPromoSection';
// import { ReviewsSection } from '@/components/home/ReviewsSection';
import { FollowUsSection } from '@/components/home/FollowUsSection';
import { WhoWeServeSection } from '@/components/home/WhoWeServeSection';
import { FaqSection } from '@/components/home/FaqSection';
import { ContactSection } from '@/components/home/ContactSection';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* 2. Hero */}
      <HeroSection />

      {/* 3. Photo Mosaic */}
      <MosaicSection />

      {/* 4. How It Works (7 Steps) */}
      <HowItWorksSection />

      {/* 5. Privacy Promise */}
      <PrivacyPromiseSection />

      {/* 6. What your profile looks like (Tabs: WhatsApp / Instagram) */}
      <ProfileSampleSection />

      {/* 7. Form Promo */}
      <FormPromoSection />

      {/* 8. Reviews - temporarily commented out until reviews are gathered */}
      {/* <ReviewsSection /> */}

      {/* 9. Follow Us */}
      <FollowUsSection />

      {/* 10. Who We Serve */}
      <WhoWeServeSection />

      {/* 11. FAQ Accordion */}
      <FaqSection />

      {/* 12. Visit / Contact */}
      <ContactSection />
    </>
  );
}
