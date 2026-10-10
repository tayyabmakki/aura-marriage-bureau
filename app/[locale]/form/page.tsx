import React from 'react';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ProfileWizard } from '@/components/form/ProfileWizard';
import { SITE_CONFIG } from '@/lib/config';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isUrdu = locale === 'ur';

  const title = isUrdu
    ? `پروفائل فارم · ${SITE_CONFIG.name}`
    : `Profile Form · ${SITE_CONFIG.name}`;

  const description = isUrdu
    ? `مرحلہ وار اپنا رشتہ پروفائل فارم پُر کریں، کاپی کریں اور واٹس ایپ پر اورا میرج بیورو کو بھیجیں۔`
    : `Fill your rishta profile form step by step, copy it, and send it directly to Aura Marriage Bureau on WhatsApp.`;

  return {
    title,
    description,
    alternates: {
      canonical: isUrdu ? 'https://auramarriagebureau.pk/ur/form' : 'https://auramarriagebureau.pk/form',
    },
  };
}

export default async function FormPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProfileWizard />;
}
