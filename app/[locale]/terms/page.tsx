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
    title: locale === 'ur' ? `شرائط و ضوابط · ${SITE_CONFIG.name}` : `Terms & Conditions · ${SITE_CONFIG.name}`,
    description: `Terms & Conditions of service for ${SITE_CONFIG.name}.`,
  };
}

export default async function TermsPage({
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
            {isUrdu ? 'قانونی ضوابط' : 'Legal Documentation'}
          </span>
          <h1 className="mt-2 font-serif text-3xl font-bold text-[#f4ecda] sm:text-4xl">
            {isUrdu ? 'خدمات کی شرائط و ضوابط' : 'Terms & Conditions'}
          </h1>
          <p className="mt-1 text-xs text-[#a79c82]">
            {isUrdu ? 'آخری تجدید: اکتوبر 2026' : 'Last Updated: October 2026'}
          </p>

          <div className="mt-8 space-y-6 text-sm text-[#f4ecda]/90 leading-relaxed sm:text-base border-t border-[rgba(201,162,75,0.15)] pt-6">
            {isUrdu ? (
              <>
                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">1. ادارہ کا کردار اور دائرہ کار</h2>
                  <p className="mt-1 text-[#a79c82]">
                    اورا میرج بیورو باوقار خاندانوں کے مابین باہمی تعارف اور رہنمائی کا ذریعہ ہے۔ ہم ایک سہولت کار (Facilitator) ہیں، کسی مخصوص نتیجے، رشتہ طے پانے کی ضمانت یا مخصوص مدت کا دعویٰ نہیں کرتے۔
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">2. رجسٹریشن کا طریقہ کار</h2>
                  <p className="mt-1 text-[#a79c82]">
                    بیورو میں باقاعدہ کام رجسٹریشن کے بعد شروع ہوتا ہے۔ رجسٹریشن فیس اور طریقہ کار شروع میں ہی مکمل وضاحت سے بیان کر دیے جاتے ہیں۔ رجسٹریشن فیس ناقابلِ واپسی (Non-refundable) ہوتی ہے۔
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">3. معلومات کی درستی اور سچائی</h2>
                  <p className="mt-1 text-[#a79c82]">
                    امیدوار اور ان کے خاندان پر لازم ہے کہ وہ مکمل، سچی اور درست معلومات فراہم کریں۔ غلط بیانی یا معلومات چھپانے کی صورت میں سروس معطل کی جا سکتی ہے۔
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">4. تصدیق اور چھان بین کی ذمہ داری</h2>
                  <p className="mt-1 text-[#a79c82]">
                    ہم معلومات اسی شکل میں شیئر کرتے ہیں جیسے وہ ہمیں فراہم کی جاتی ہیں۔ ہر خاندان پر لازم ہے کہ حتمی فیصلہ کرنے سے قبل اپنی تسلی کے لیے ضروری معلومات کی خود تصدیق کرے۔
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">5. رازداری کی پاسداری</h2>
                  <p className="mt-1 text-[#a79c82]">
                    ہم کلائنٹس کی معلومات مکمل رازداری میں رکھتے ہیں اور باہمی رضامندی کے بغیر کسی غیر متعلقہ فریق سے شیئر نہیں کرتے۔
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">6. تصاویر کا تبادلہ</h2>
                  <p className="mt-1 text-[#a79c82]">
                    تصاویر صرف خاندان سے خاندان تک اور متعلقہ فریق کی پیشگی اجازت کے بعد ہی بھیجی جاتی ہیں۔
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">7. اہلیت اور سرپرستی</h2>
                  <p className="mt-1 text-[#a79c82]">
                    رشتے کی بات چیت والدین، قانونی سرپرست یا بڑے بہن بھائیوں کی نگرانی میں ہوتی ہے۔ نابالغ افراد کے رشتے قبول نہیں کیے جاتے۔
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">8. خاندانوں کی باہمی ملاقات</h2>
                  <p className="mt-1 text-[#a79c82]">
                    ملاقات کا وقت دونوں خاندان آپس میں طے کرتے ہیں۔ اگر کنسلٹنٹ کی شرکت کی درخواست کی جائے تو اضافی چارجز لاگو ہوتے ہیں۔
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">9. حتمی سروس چارجز</h2>
                  <p className="mt-1 text-[#a79c82]">
                    رشتہ حتمی طے پانے پر طے شدہ شکرانہ / سروس چارجز لاگو ہوتے ہیں جن کی وضاحت رجسٹریشن کے وقت کر دی جاتی ہے۔
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">10. ذمہ داری کی حدود</h2>
                  <p className="mt-1 text-[#a79c82]">
                    تعارف کے بعد خاندانوں کے باہمی رویے یا فیصلوں کی قانونی ذمہ داری بیورو پر عائد نہیں ہوتی۔
                  </p>
                </section>
              </>
            ) : (
              <>
                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">1. Our Role as a Facilitator</h2>
                  <p className="mt-1 text-[#a79c82]">
                    Aura Marriage Bureau acts strictly as a matrimonial introductions facilitator for honorable families. We do not guarantee a definitive match, specific timeline, or final outcome.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">2. Registration & Terms</h2>
                  <p className="mt-1 text-[#a79c82]">
                    Active matchmaking commences once a family registers. Registration terms and procedures are clearly communicated prior to onboarding. Registration fees are non-refundable.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">3. Accuracy of Information</h2>
                  <p className="mt-1 text-[#a79c82]">
                    Families warrant that all data supplied regarding education, marital background, age, and employment is truthful and accurate. Misrepresentation may result in termination of service.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">4. Independent Family Inquiries</h2>
                  <p className="mt-1 text-[#a79c82]">
                    Aura relays candidate profile details as directly provided. We are not an investigative bureau; each family is advised to conduct customary background checks prior to formalizing commitments.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">5. Confidentiality</h2>
                  <p className="mt-1 text-[#a79c82]">
                    Client details are guarded with strict confidentiality and never broadcasted publicly with personal contact details or candidate names.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">6. Photographic Exchange</h2>
                  <p className="mt-1 text-[#a79c82]">
                    Photographs are exchanged strictly family-to-family, solely upon explicit consent of the candidate and guardian.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">7. Guardian Eligibility</h2>
                  <p className="mt-1 text-[#a79c82]">
                    Inquiries are handled exclusively through parents, legal guardians, or elder siblings. Minors are strictly prohibited from utilizing the bureau.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">8. Family Meetings</h2>
                  <p className="mt-1 text-[#a79c82]">
                    Meetings take place between prospective families. Should an in-person consultant facilitation be requested, consultation fees apply to both parties.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">9. Final Consultation Fee</h2>
                  <p className="mt-1 text-[#a79c82]">
                    Upon successful finalization of a rishta facilitated by Aura, final service charges apply as agreed during registration.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-lg font-bold text-[#ecd290]">10. Limitation of Liability</h2>
                  <p className="mt-1 text-[#a79c82]">
                    The bureau bears no legal liability for independent actions, conduct, or marital decisions undertaken by families post-introduction.
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
