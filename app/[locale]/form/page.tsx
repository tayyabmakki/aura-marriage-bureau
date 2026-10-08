import React from 'react';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ProfileWizard } from '@/components/form/ProfileWizard';
import { SITE_CONFIG } from '@/lib/config';

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

  return (
    <div className="min-h-screen bg-[#0a0908] pt-6 sm:pt-10">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <span className="text-xs uppercase tracking-widest text-[#ecd290]">
          {locale === 'ur' ? 'آسان اور محفوظ طریقہ' : 'Guided Matrimonial Assistant'}
        </span>
        <h1 className="mt-2 font-serif text-3xl font-bold text-[#f4ecda] sm:text-4xl">
          {locale === 'ur' ? 'پروفائل فارم' : 'Profile Form'}
        </h1>
        <p className="mt-2 text-sm text-[#a79c82] max-w-lg mx-auto">
          {locale === 'ur'
            ? 'مرحلہ وار تفصیل پُر کریں۔ مکمل ہونے پر فارم کاپی کر کے واٹس ایپ میں بھیجیں۔ ویب سائٹ پر کچھ بھی محفوظ یا جمع نہیں ہوتا۔'
            : 'Fill in your details step by step. When finished, tap Copy Form and paste it directly into WhatsApp. Nothing is sent or stored from this website.'}
        </p>
      </div>

      <ProfileWizard />
    </div>
  );
}
