import React from 'react';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { DraftBanner } from '@/components/legal/DraftBanner';
import { SITE_CONFIG } from '@/lib/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'ur' ? `رازداری کی پالیسی · ${SITE_CONFIG.name}` : `Privacy Policy · ${SITE_CONFIG.name}`,
    description: `Privacy Policy for ${SITE_CONFIG.name}.`,
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

  return (
    <div className="min-h-screen bg-[#0a0908] py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <DraftBanner />

        <div className="rounded-2xl border border-[rgba(201,162,75,0.22)] bg-[#16130f] p-6 sm:p-10 shadow-xl">
          <span className="text-xs uppercase tracking-widest text-[#ecd290]">
            {isUrdu ? 'رازداری اور امانت' : 'Privacy & Trust'}
          </span>
          <h1 className="mt-2 font-serif text-3xl font-bold text-[#f4ecda] sm:text-4xl">
            {isUrdu ? 'رازداری کی پالیسی' : 'Privacy Policy'}
          </h1>
          <p className="mt-1 text-xs text-[#a79c82]">
            {isUrdu ? 'آخری تجدید: اکتوبر 2026' : 'Last Updated: October 2026'}
          </p>

          <div className="mt-8 space-y-6 text-sm text-[#f4ecda]/90 leading-relaxed sm:text-base border-t border-[rgba(201,162,75,0.15)] pt-6">
            {isUrdu ? (
              <>
                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">1. ہم کیا معلومات حاصل کرتے ہیں؟</h2>
                  <p className="mt-1 text-[#a79c82]">
                    ہم صرف وہی معلومات حاصل کرتے ہیں جو آپ خود ہمیں واٹس ایپ پر ارسال کرتے ہیں، یا رجسٹریشن کے وقت فراہم کرتے ہیں۔
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">2. معلومات کا مقصد</h2>
                  <p className="mt-1 text-[#a79c82]">
                    یہ معلومات صرف آپ کی پروفائل کی تیاری اور مناسب خاندانی تجاویز کی تلاش کے لیے استعمال کی جاتی ہیں۔
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">3. یہ معلومات کون دیکھ سکتا ہے؟</h2>
                  <p className="mt-1 text-[#a79c82]">
                    صرف اورا کی کنسلٹنٹ ٹیم۔ بنیادی معلومات صرف دیگر سنجیدہ رجسٹرڈ خاندانوں کے ساتھ اور آپ کی اجازت سے شیئر کی جاتی ہیں۔ کسی بھی سوشل میڈیا پر نام، فون نمبر، پتہ یا تصاویر کبھی ظاہر نہیں کی جاتیں۔
                  </p>
                </section>

                {/* Storage Paragraph Switching on ENABLE_SUBMIT */}
                <section className="rounded-xl border border-[rgba(201,162,75,0.3)] bg-black/40 p-4">
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">4. معلومات کا ذخیرہ (Data Storage)</h2>
                  {!SITE_CONFIG.ENABLE_SUBMIT ? (
                    <p className="mt-1 text-[#ecd290]">
                      ویب سائٹ موڈ: اس ویب سائٹ سے کوئی بھی ڈیٹا سرور پر جمع یا محفوظ نہیں ہوتا۔ فارم مکمل طور پر آپ کے اپنے موبائل/کمپیوٹر میں رہتا ہے اور آپ خود واٹس ایپ پر کاپی کر کے بھیجتے ہیں۔
                    </p>
                  ) : (
                    <p className="mt-1 text-[#ecd290]">
                      اگر آپ ویب سائٹ کے ذریعے پروفائل سبمٹ کرتے ہیں، تو ڈیٹا نجی اور خفیہ ایکسس کنٹرولڈ ڈیٹا بیس میں محفوظ کیا جاتا ہے جس کے لیے آپ کی پیشگی رضامندی لازمی ہوتی ہے۔
                    </p>
                  )}
                </section>

                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">5. پروفائل ختم کروانا</h2>
                  <p className="mt-1 text-[#a79c82]">
                    آپ کسی بھی وقت واٹس ایپ یا ای میل کے ذریعے رابطہ کر کے اپنا ریکارڈ اور پروفائل حذف کروا سکتے ہیں۔
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">6. ہم سے رابطہ</h2>
                  <p className="mt-1 text-[#a79c82]">
                    ای میل: {SITE_CONFIG.email} · واٹس ایپ / فون: {SITE_CONFIG.phone}
                  </p>
                </section>
              </>
            ) : (
              <>
                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">1. What We Collect</h2>
                  <p className="mt-1 text-[#a79c82]">
                    We collect only the information you voluntarily provide in direct communication via WhatsApp or in-person consultation for matchmaking.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">2. Purpose of Collection</h2>
                  <p className="mt-1 text-[#a79c82]">
                    To prepare your anonymous candidate profile and facilitate introductions with compatible registered families.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">3. Who Accesses Your Information</h2>
                  <p className="mt-1 text-[#a79c82]">
                    Only Aura&apos;s internal consultation team. General criteria are shared with prospective families strictly under anonymous Reference IDs and only with your prior agreement. Real names, contact details, home addresses, and photos are never broadcast publicly.
                  </p>
                </section>

                {/* Storage Paragraph Switching on ENABLE_SUBMIT */}
                <section className="rounded-xl border border-[rgba(201,162,75,0.3)] bg-black/40 p-4">
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">4. Data Storage & Website Behavior</h2>
                  {!SITE_CONFIG.ENABLE_SUBMIT ? (
                    <p className="mt-1 text-[#ecd290]">
                      Current Client-Side Mode: When the website profile form is in copy-only mode, zero data is transmitted to or stored on any server. The form runs entirely locally within your browser, and you dispatch it to WhatsApp yourself.
                    </p>
                  ) : (
                    <p className="mt-1 text-[#ecd290]">
                      Database Mode: If online submission is enabled, submitted data is stored in an access-controlled, encrypted private database with mandatory prior consent.
                    </p>
                  )}
                </section>

                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">5. Retention & Deletion Rights</h2>
                  <p className="mt-1 text-[#a79c82]">
                    You may request complete removal and erasure of your matchmaking records at any time by contacting our consultant via WhatsApp or email.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">6. Official Inquiries</h2>
                  <p className="mt-1 text-[#a79c82]">
                    Email: {SITE_CONFIG.email} · Phone / WhatsApp: {SITE_CONFIG.phone}
                  </p>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
