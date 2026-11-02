import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { SITE_CONFIG } from '@/lib/config';
import { BrandLogo } from '@/components/BrandLogo';
import {
  MessageCircle,
  Mail,
  ShieldCheck,
  Lock,
  ArrowRight,
  ArrowLeft,
  FileText,
  ServerOff,
  Send,
  EyeOff,
  BarChart2,
} from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:
      locale === 'ur'
        ? `رازداری کی پالیسی · ${SITE_CONFIG.name} · ${SITE_CONFIG.consultant}`
        : `Privacy Policy · ${SITE_CONFIG.name} · ${SITE_CONFIG.consultant}`,
    description: `Official Privacy & Data Protection Policy for ${SITE_CONFIG.name}. Zero server-side form storage.`,
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isUrdu = locale === 'ur';
  const prefix = isUrdu ? '/ur' : '';

  return (
    <div className="min-h-screen bg-[#0a0908] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href={prefix || '/'}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#a79c82] hover:text-[#ecd290] transition-colors"
          >
            {isUrdu ? (
              <>
                <ArrowRight className="h-3.5 w-3.5" />
                <span>مرکزی صفحہ پر واپس جائیں</span>
              </>
            ) : (
              <>
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Return to Home</span>
              </>
            )}
          </Link>
        </div>

        {/* Header Hero Card */}
        <div className="rounded-2xl border border-[rgba(201,162,75,0.25)] bg-gradient-to-b from-[#18140f] to-[#110e0b] p-5 sm:p-10 shadow-2xl relative overflow-hidden mb-8">
          <div
            className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(212,175,97,0.15)_0%,transparent_70%)]"
            aria-hidden="true"
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-[rgba(201,162,75,0.18)] pb-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af61]/30 bg-[#d4af61]/10 px-3 py-1 text-[11px] font-semibold text-[#ecd290] uppercase tracking-wider mb-3">
                <Lock className="h-3.5 w-3.5 text-[#d4af61]" />
                <span>{isUrdu ? 'رازداری اور امانت' : 'Privacy & Confidentiality'}</span>
              </div>
              <h1 className="font-display text-2xl sm:text-4xl font-bold text-[#f4ecda] tracking-wide">
                {isUrdu ? 'رازداری کی پالیسی' : 'Privacy Policy'}
              </h1>
              <p className="mt-2 text-xs sm:text-sm font-medium text-[#ecd290]/90">
                {SITE_CONFIG.name} · {isUrdu ? 'میرج کنسلٹنٹ:' : 'Marriage Consultant:'}{' '}
                <span className="text-[#f4ecda] font-semibold">{SITE_CONFIG.consultant}</span>
              </p>
            </div>

            <div className="shrink-0 hidden sm:block">
              <BrandLogo size="md" asLink={false} />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#a79c82]">
            <span>{isUrdu ? 'نافذ العمل: اکتوبر 2026' : 'Effective: October 2026'}</span>
            <span className="text-[#ecd290] font-medium">
              {isUrdu ? 'زیرو سرور اسٹوریج · کلائنٹ سائیڈ تحفظ' : 'Zero Server-Side Storage · 100% Client-Side'}
            </span>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="rounded-2xl border border-[rgba(201,162,75,0.22)] bg-[#14110d] p-5 sm:p-10 shadow-xl space-y-8 overflow-hidden break-words">
          {isUrdu ? (
            <div className="space-y-8 font-urdu-ui text-sm leading-relaxed sm:text-base text-[#f4ecda]/90 text-right" dir="rtl">
              {/* 1. What this website collects */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <div className="flex items-center gap-2.5 text-[#ecd290] mb-2 justify-end">
                  <h2 className="font-display font-urdu-heading text-lg sm:text-xl font-bold">
                    1. یہ ویب سائٹ کیا معلومات جمع کرتی ہے؟ (What this website collects)
                  </h2>
                  <ServerOff className="h-5 w-5 text-[#d4af61] shrink-0" />
                </div>
                <p className="text-[#c4b99f]">
                  ہمارے سرورز پر آپ کے بارے میں کچھ بھی محفوظ نہیں کیا جاتا۔ پروفائل فارم مکمل طور پر آپ کے اپنے موبائل فون یا کمپیوٹر پر چلتا ہے: آپ کے جوابات صرف آپ کے اپنے براؤزر میں عارضی طور پر محفوظ رہتے ہیں (تاکہ آپ بعد میں مکمل کر سکیں) جب تک کہ آپ &rdquo;فارم صاف کریں&ldquo; پر کلک نہ کریں۔
                </p>
              </section>

              {/* 2. How your details reach us */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <div className="flex items-center gap-2.5 text-[#ecd290] mb-2 justify-end">
                  <h2 className="font-display font-urdu-heading text-lg sm:text-xl font-bold">
                    2. آپ کی تفصیلات ہم تک کیسے پہنچتی ہیں؟ (How your details reach us)
                  </h2>
                  <Send className="h-5 w-5 text-[#d4af61] shrink-0" />
                </div>
                <p className="text-[#c4b99f]">
                  صرف اس وقت جب آپ فارم کا متن کاپی کرتے ہیں اور خود ہمیں واٹس ایپ پر ارسال کرتے ہیں۔ اس ویب سائٹ سے ازخود کچھ بھی نہیں بھیجا جاتا۔
                </p>
              </section>

              {/* 3. How we use your details */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <div className="flex items-center gap-2.5 text-[#ecd290] mb-2 justify-end">
                  <h2 className="font-display font-urdu-heading text-lg sm:text-xl font-bold">
                    3. ہم آپ کی تفصیلات کیسے استعمال کرتے ہیں؟ (How we use your details)
                  </h2>
                  <EyeOff className="h-5 w-5 text-[#d4af61] shrink-0" />
                </div>
                <p className="text-[#c4b99f]">
                  صرف آپ کی پروفائل تیار کرنے اور ہماری شرائط و ضوابط (Terms &amp; Conditions) کے مطابق مناسب رشتوں کی تلاش کے لیے۔ نام، والد کا نام، رہائشی پتے، رابطہ نمبرز اور تصاویر کبھی بھی عوامی سطح پر ظاہر نہیں کی جاتیں۔
                </p>
              </section>

              {/* 4. Visitor statistics */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <div className="flex items-center gap-2.5 text-[#ecd290] mb-2 justify-end">
                  <h2 className="font-display font-urdu-heading text-lg sm:text-xl font-bold">
                    4. وزیٹر شماریات اور اینالیٹکس (Visitor statistics)
                  </h2>
                  <BarChart2 className="h-5 w-5 text-[#d4af61] shrink-0" />
                </div>
                <p className="text-[#c4b99f]">
                  ہم رازداری کے اصولوں پر مبنی تجزیاتی نظام استعمال کرتے ہوئے صرف صفحات کے وزٹس اور بٹن کے کلکس کا شمار کرتے ہیں (مثلاً کتنے افراد نے واٹس ایپ بٹن استعمال کیا)۔ اس عمل میں کوئی کوکیز استعمال نہیں کی جاتیں اور نہ ہی آپ کی کوئی ذاتی شناخت ہوتی ہے۔
                </p>
              </section>

              {/* 5. Questions */}
              <section className="space-y-3 pt-2">
                <h2 className="font-display font-urdu-heading text-lg sm:text-xl font-bold text-[#ecd290]">
                  5. سوالات و رہنمائی (Questions)
                </h2>
                <p className="text-[#c4b99f]">
                  رازداری یا پالیسی سے متعلق کسی بھی سوال کی صورت میں ہم سے واٹس ایپ یا ای میل پر رابطہ کریں۔
                </p>
              </section>
            </div>
          ) : (
            <div className="space-y-8 text-sm leading-relaxed sm:text-base text-[#f4ecda]/90">
              {/* 1. What this website collects */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <div className="flex items-center gap-2.5 text-[#ecd290] mb-2">
                  <ServerOff className="h-5 w-5 text-[#d4af61] shrink-0" />
                  <h2 className="font-display text-lg sm:text-xl font-semibold">
                    1. What this website collects
                  </h2>
                </div>
                <p className="text-[#c4b99f]">
                  Nothing about you is stored on our servers. The profile form runs entirely on your own phone or computer: your answers are saved only in your browser (so you can continue later) until you tap &ldquo;Clear form&rdquo;.
                </p>
              </section>

              {/* 2. How your details reach us */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <div className="flex items-center gap-2.5 text-[#ecd290] mb-2">
                  <Send className="h-5 w-5 text-[#d4af61] shrink-0" />
                  <h2 className="font-display text-lg sm:text-xl font-semibold">
                    2. How your details reach us
                  </h2>
                </div>
                <p className="text-[#c4b99f]">
                  Only when you copy the form and send it to us yourself on WhatsApp. Nothing is sent from this website.
                </p>
              </section>

              {/* 3. How we use your details */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <div className="flex items-center gap-2.5 text-[#ecd290] mb-2">
                  <EyeOff className="h-5 w-5 text-[#d4af61] shrink-0" />
                  <h2 className="font-display text-lg sm:text-xl font-semibold">
                    3. How we use your details
                  </h2>
                </div>
                <p className="text-[#c4b99f]">
                  To prepare your profile and find suitable proposals, as described in our Terms &amp; Conditions. Names, father&apos;s names, addresses, contact numbers and photographs are never posted publicly.
                </p>
              </section>

              {/* 4. Visitor statistics */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <div className="flex items-center gap-2.5 text-[#ecd290] mb-2">
                  <BarChart2 className="h-5 w-5 text-[#d4af61] shrink-0" />
                  <h2 className="font-display text-lg sm:text-xl font-semibold">
                    4. Visitor statistics
                  </h2>
                </div>
                <p className="text-[#c4b99f]">
                  We count page visits and button taps (for example, how many people tap WhatsApp) using privacy-friendly analytics that use no cookies and do not identify you.
                </p>
              </section>

              {/* 5. Questions */}
              <section className="space-y-3 pt-2">
                <h2 className="font-display text-lg sm:text-xl font-semibold text-[#ecd290]">
                  5. Questions
                </h2>
                <p className="text-[#c4b99f]">
                  Contact us on WhatsApp or by email.
                </p>
              </section>
            </div>
          )}

          {/* Quick Action Navigation Buttons */}
          <div className="pt-6 border-t border-[rgba(201,162,75,0.18)] flex flex-wrap items-center justify-between gap-3.5">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#25d366]/15 border border-[#25d366]/40 px-3.5 sm:px-4 py-2 text-xs font-semibold text-[#4ade80] hover:bg-[#25d366]/25 transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>{isUrdu ? 'واٹس ایپ' : 'WhatsApp'}</span>
              </a>

              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(201,162,75,0.25)] bg-black/40 px-3.5 sm:px-4 py-2 text-xs font-semibold text-[#c4b99f] hover:text-[#ecd290] hover:border-[#d4af61]/40 transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-[#ecd290]" />
                <span>{isUrdu ? 'ای میل' : 'Email Us'}</span>
              </a>

              <Link
                href={`${prefix}/terms`}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af61]/40 bg-[#d4af61]/10 px-3.5 sm:px-4 py-2 text-xs font-semibold text-[#ecd290] hover:bg-[#d4af61]/20 transition-colors"
              >
                <FileText className="h-3.5 w-3.5 text-[#ecd290]" />
                <span>{isUrdu ? 'شرائط و ضوابط' : 'Terms & Conditions'}</span>
              </Link>
            </div>

            <div className="text-xs text-[#a79c82]">
              <span>{SITE_CONFIG.name} · Lahore, Pakistan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}