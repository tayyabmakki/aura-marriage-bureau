import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { SITE_CONFIG } from '@/lib/config';
import { BrandLogo } from '@/components/BrandLogo';
import { MessageCircle, Mail, ShieldCheck, FileCheck, ArrowRight, ArrowLeft } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:
      locale === 'ur'
        ? `شرائط و ضوابط · ${SITE_CONFIG.name} · ${SITE_CONFIG.consultant}`
        : `Terms & Conditions · ${SITE_CONFIG.name} · ${SITE_CONFIG.consultant}`,
    description: `Official Terms & Conditions of service for ${SITE_CONFIG.name}.`,
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
                <ShieldCheck className="h-3.5 w-3.5 text-[#d4af61]" />
                <span>{isUrdu ? 'باہمی معاہدہ و قانونی ضوابط' : 'Official Bureau Terms'}</span>
              </div>
              <h1 className="font-display text-2xl sm:text-4xl font-bold text-[#f4ecda] tracking-wide">
                {isUrdu ? 'خدمات کی شرائط و ضوابط' : 'Terms & Conditions'}
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
              {isUrdu ? 'خاندانی وقار · مکمل رازداری · اصولی رہنمائی' : 'Family-Led Dignity & Complete Discretion'}
            </span>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="rounded-2xl border border-[rgba(201,162,75,0.22)] bg-[#14110d] p-5 sm:p-10 shadow-xl space-y-8 overflow-hidden break-words">
          {isUrdu ? (
            <div className="space-y-8 font-urdu-ui text-sm leading-relaxed sm:text-base text-[#f4ecda]/90 text-right" dir="rtl">
              {/* 1. Form Submission */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <h2 className="font-display font-urdu-heading text-lg sm:text-xl font-bold text-[#ecd290]">
                  1. رجسٹریشن فارم کی فراہمی اور درستی (Form Submission)
                </h2>
                <p className="text-[#c4b99f]">
                  رجسٹریشن فارم مقررہ طریقہ کار کے مطابق مکمل، واضح اور درست کوائف و ضروریات کے ساتھ پر کرنا لازمی ہے۔ نامکمل، مبہم یا غلط معلومات پر مشتمل فارمز پر کارروائی نہیں کی جائے گی۔ کسی بھی تاخیر سے بچنے کے لیے براہِ کرم فارم جمع کروانے سے قبل اس کا بغور جائزہ لیں۔
                </p>
              </section>

              {/* 2. Proposal Process */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <h2 className="font-display font-urdu-heading text-lg sm:text-xl font-bold text-[#ecd290]">
                  2. رشتے کی تجاویز کا طریقہ کار (Marriage Proposal Process)
                </h2>
                <p className="text-[#c4b99f]">
                  ہم آپ کے بیان کردہ معیارات اور ضروریات کے مطابق مناسب تجاویز فراہم کرنے کی ہر ممکن اور سنجیدہ کوشش کریں گے۔ اگر آپ کسی تجویز میں دلچسپی ظاہر کرتے ہیں تو آپ کا پروفائل دوسرے خاندان کے ساتھ شیئر کیا جاتا ہے۔ دونوں فریقین کی باہمی رضامندی اور دلچسپی کی صورت میں رابطہ نمبرز کا تبادلہ کیا جاتا ہے، جس کے بعد دونوں خاندان باہمی سہولت کے مطابق ملاقات کا وقت طے کر سکتے ہیں۔ اگر کوئی بھی خاندان ملاقات میں کنسلٹنٹ کی شرکت یا موجودگی کی درخواست کرے تو اس کے اضافی چارجز دونوں خاندانوں پر لاگو ہوں گے۔
                </p>
              </section>

              {/* 3. Collaboration with other consultants */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <h2 className="font-display font-urdu-heading text-lg sm:text-xl font-bold text-[#ecd290]">
                  3. دیگر پروفیشنل کنسلٹنٹس سے اشتراکِ عمل (Collaboration with Other Consultants)
                </h2>
                <p className="text-[#c4b99f]">
                  ہم رشتوں کے انتخاب کو وسیع اور مؤثر بنانے کے لیے دیگر معتبر و پیشہ ور میرج کنسلٹنٹس کے ساتھ بھی اشتراکِ عمل کرتے ہیں۔ اگر کوئی مناسب رشتہ کسی پارٹنر کنسلٹنٹ کے ذریعے سامنے آتا ہے اور دونوں خاندان آگے بڑھنے پر متفق ہوتے ہیں تو رشتہ اس کنسلٹنٹ کے ذریعے حتمی شکل پا سکتا ہے۔ ایسی صورت میں ہمارا کلائنٹ ہماری سروس فیس ادا کرتا ہے، جبکہ دوسرا خاندان اپنے کنسلٹنٹ کو فیس ادا کرتا ہے۔
                </p>
              </section>

              {/* 4. Mandatory registration fee */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <h2 className="font-display font-urdu-heading text-lg sm:text-xl font-bold text-[#ecd290]">
                  4. لازمی رجسٹریشن فیس (Mandatory Registration Fee)
                </h2>
                <p className="text-[#c4b99f]">
                  بیورو میں رجسٹریشن فیس لازمی ہے۔ جب تک یہ فیس مکمل طور پر وصول نہیں ہو جاتی، آپ کے کیس پر کوئی بھی کام — بشمول پروفائل پروسیسنگ یا رشتے کی تلاش — شروع نہیں کیا جائے گا۔
                </p>
              </section>

              {/* 5. Non-refundable & non-transferable */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <h2 className="font-display font-urdu-heading text-lg sm:text-xl font-bold text-[#ecd290]">
                  5. ناقابلِ واپسی اور ناقابلِ منتقلی فیس (Non-refundable & Non-transferable Fees)
                </h2>
                <p className="text-[#c4b99f]">
                  تمام فیسیں — بشمول رجسٹریشن (ایڈوانس) فیس، ملاقات/وزٹ چارجز، اور حتمی سروس فیس — کسی بھی صورت میں اور نتائج سے قطع نظر قطعی طور پر ناقابلِ واپسی اور ناقابلِ منتقلی ہیں۔
                </p>
              </section>

              {/* 6. Final payment requirement */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <h2 className="font-display font-urdu-heading text-lg sm:text-xl font-bold text-[#ecd290]">
                  6. حتمی سروس فیس کی ادائیگی (Final Payment Requirement)
                </h2>
                <p className="text-[#c4b99f]">
                  جیسے ہی دونوں خاندانوں کے مابین بات چیت حتمی طے پا جاتی ہے اور شادی کے لیے باہمی رضامندی ہو جاتی ہے، مکمل سروس فیس واجب الادا ہو جاتی ہے۔ کسی بھی رسمی منگنی، تقریب یا شادی کے انتظامات سے قبل یہ ادائیگی مکمل کرنا لازمی ہے۔
                </p>
              </section>

              {/* 7. Verification & disclaimer of liability */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <h2 className="font-display font-urdu-heading text-lg sm:text-xl font-bold text-[#ecd290]">
                  7. تصدیق، چھان بین اور برأتِ ذمہ داری (Verification & Disclaimer of Liability)
                </h2>
                <p className="text-[#c4b99f]">
                  ابتدائی ملاقاتیں مختصر ہوتی ہیں اور اتنے قلیل وقت میں کسی خاندان کے کردار، چال چلن، مالی حیثیت یا پس منظر کا مکمل اندازہ نہیں لگایا جا سکتا۔ ہم معلومات اسی شکل میں فراہم کرتے ہیں جیسے متعلقہ خاندان نے جمع کروائی ہوتی ہے اور ہم اس کی آزادانہ تصدیق نہیں کرتے۔ ہر خاندان شادی جیسے اہم فیصلے سے قبل خود اپنی تسلی، مکمل چھان بین اور تصدیق کا خود ذمہ دار ہے۔ اورا میرج بیورو صرف ایک باوقار سہولت کار کے طور پر کام کرتا ہے اور شادی سے پہلے، دوران یا بعد میں کسی بھی قسم کی غلط بیانی، معلومات چھپانے، حادثے، مالی نقصان، فراڈ یا باہمی تنازعے کا کسی بھی طرح ذمہ دار نہیں ہوگا۔
                </p>
              </section>

              {/* 8. No obligation to accept proposals */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <h2 className="font-display font-urdu-heading text-lg sm:text-xl font-bold text-[#ecd290]">
                  8. تجاویز قبول کرنے پر کوئی جبر یا پابندی نہیں (No Obligation to Accept Proposals)
                </h2>
                <p className="text-[#c4b99f]">
                  کسی بھی فرد یا خاندان پر کسی تجویز کو قبول کرنے کا کوئی جبر یا پابندی نہیں ہے۔ کسی بھی رشتے کو قبول کرنے، مسترد کرنے یا بات چیت ختم کرنے کا مکمل اختیار صرف متعلقہ خاندان کا ہے، اور اس فیصلے کی کوئی ذمہ داری بیورو پر عائد نہیں ہوتی۔
                </p>
              </section>

              {/* 9. Privacy & confidentiality */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <h2 className="font-display font-urdu-heading text-lg sm:text-xl font-bold text-[#ecd290]">
                  9. رازداری اور معلومات کا تحفظ (Privacy & Confidentiality)
                </h2>
                <p className="text-[#c4b99f]">
                  کلائنٹ کا ڈیٹا پیشگی اور واضح اجازت کے بغیر سوشل میڈیا یا پبلک پلیٹ فارمز پر ہرگز شائع نہیں کیا جائے گا۔ بنیادی کوائف اور عمومی ضروریات صرف میچ میکنگ کے مقصد کے لیے اور صرف خاندان کی اجازت سے دیگر رجسٹرڈ کلائنٹس کے ساتھ شیئر کی جا سکتی ہیں۔ مکمل نام، والد کا نام، ملازمت/کاروبار کی نجی تفصیلات، پتے، رابطہ نمبرز اور تصاویر مکمل طور پر صیغہ راز میں رکھی جاتی ہیں۔
                </p>
              </section>

              {/* 10. Parental or guardian involvement */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <h2 className="font-display font-urdu-heading text-lg sm:text-xl font-bold text-[#ecd290]">
                  10. والدین یا سرپرست کی براہِ راست شمولیت (Parental or Guardian Involvement)
                </h2>
                <p className="text-[#c4b99f]">
                  تمام رشتوں کی بات چیت والدین، قانونی سرپرست یا بڑے بہن بھائیوں کے ذریعے براہِ راست کی جاتی ہے۔ ہم نابالغ افراد یا غیر سنجیدہ افراد سے کوئی بات چیت نہیں کرتے، اور کسی بھی قسم کی بدتمیزی، عدم برداشت، نامناسب زبان یا غیر اخلاقی رویے کی صورت میں کسی بھی کیس کو فوری ختم کرنے کا حق محفوظ رکھتے ہیں۔
                </p>
              </section>

              {/* 11. Right of refusal, suspension & termination */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <h2 className="font-display font-urdu-heading text-lg sm:text-xl font-bold text-[#ecd290]">
                  11. سروس سے انکار، معطلی اور منسوخی کا حق (Right of Refusal, Suspension & Termination)
                </h2>
                <p className="text-[#c4b99f]">
                  ہم تمام کلائنٹس، خاندانوں اور پارٹنر کنسلٹنٹس کے لیے ایک باوقار، پیشہ ورانہ اور اخلاقی ماحول فراہم کرنے کے پابند ہیں اور بدلے میں ایسے ہی اخلاق کی توقع رکھتے ہیں۔ ہم کسی بھی توہین آمیز رویے، تعصب، عدم برداشت، ہراساں کرنے، دھمکیوں، نامناسب زبان، غلط بیانی، فراڈ، بدعنوانی، یا کسی بھی ایسے عمل کی صورت میں جس سے ہمارے ادارے، کلائنٹس یا پارٹنرز کے وقار یا پیشہ ورانہ ساکھ کو نقصان پہنچے، بغیر کسی پیشگی نوٹس کے کسی بھی رجسٹریشن، تجویز یا سروس کو معطل، مسترد یا منسوخ کرنے کا مکمل حق محفوظ رکھتے ہیں۔ اس میں کیس کی فوری بندش اور ہماری طرف سے کسی بھی قانونی ذمہ داری کے بغیر تمام خدمات کا خاتمہ شامل ہے۔
                </p>
              </section>

              {/* 12. Final Acceptance */}
              <div className="rounded-xl border border-[rgba(201,162,75,0.35)] bg-gradient-to-r from-[#211a12] to-[#16120c] p-5 text-center mt-6">
                <FileCheck className="h-6 w-6 text-[#ecd290] mx-auto mb-2" />
                <p className="font-bold text-[#f4ecda] text-base">
                  اورا میرج بیورو ({SITE_CONFIG.name}) کے ساتھ رجسٹریشن کروا کر، آپ ان تمام شرائط و ضوابط کو مکمل طور پر تسلیم اور قبول کرنے کا اقرار کرتے ہیں۔
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8 text-sm leading-relaxed sm:text-base text-[#f4ecda]/90">
              {/* 1. Form submission */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <h2 className="font-display text-lg sm:text-xl font-semibold text-[#ecd290]">
                  1. Form Submission
                </h2>
                <p className="text-[#c4b99f]">
                  The registration form must be completed in the prescribed format with full and accurate profile details and requirements. Incomplete, illegible, or inaccurate forms will not be processed, so please review your form before submitting to avoid delays.
                </p>
              </section>

              {/* 2. Marriage proposal process */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <h2 className="font-display text-lg sm:text-xl font-semibold text-[#ecd290]">
                  2. Marriage Proposal Process
                </h2>
                <p className="text-[#c4b99f]">
                  We will make every reasonable effort to share proposals matching your stated criteria. If you show interest, your profile is shared with the other family. On mutual interest, contact numbers are exchanged with the consent of both parties, after which the families may arrange a meeting at a mutually convenient time. If either family requests a consultant&apos;s presence at the meeting, additional charges apply to both families.
                </p>
              </section>

              {/* 3. Collaboration with other consultants */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <h2 className="font-display text-lg sm:text-xl font-semibold text-[#ecd290]">
                  3. Collaboration with Other Consultants
                </h2>
                <p className="text-[#c4b99f]">
                  We work with professional marriage consultants to widen the range of matches available. If a match comes through a partner consultant and both families agree to proceed, the proposal may be finalised through that consultant. In such cases our client pays our service fee, and the other family pays their own consultant.
                </p>
              </section>

              {/* 4. Mandatory registration fee */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <h2 className="font-display text-lg sm:text-xl font-semibold text-[#ecd290]">
                  4. Mandatory Registration Fee
                </h2>
                <p className="text-[#c4b99f]">
                  A registration fee is mandatory. No work on your proposal — profile processing or match searching — begins until this fee is received in full.
                </p>
              </section>

              {/* 5. Non-refundable & non-transferable fees */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <h2 className="font-display text-lg sm:text-xl font-semibold text-[#ecd290]">
                  5. Non-refundable & Non-transferable Fees
                </h2>
                <p className="text-[#c4b99f]">
                  All fees — registration (advance), visit/meeting, and final service fee — are strictly non-refundable and non-transferable under any circumstances, regardless of the outcome.
                </p>
              </section>

              {/* 6. Final payment requirement */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <h2 className="font-display text-lg sm:text-xl font-semibold text-[#ecd290]">
                  6. Final Payment Requirement
                </h2>
                <p className="text-[#c4b99f]">
                  The full service fee is due once both families have finalised discussions and agreed to proceed with the marriage. Payment must be made before any formal engagement or marriage arrangements.
                </p>
              </section>

              {/* 7. Verification & disclaimer of liability */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <h2 className="font-display text-lg sm:text-xl font-semibold text-[#ecd290]">
                  7. Verification & Disclaimer of Liability
                </h2>
                <p className="text-[#c4b99f]">
                  Initial meetings are brief, and a family&apos;s character, conduct, financial standing, or background cannot be fully assessed in that time. We pass on information as submitted by each family and do not independently verify it. Each family is solely responsible for conducting its own due diligence and verification before any matrimonial commitment. {SITE_CONFIG.name} acts only as a facilitator and is not responsible for any inaccuracy, omission, misrepresentation, accident, financial loss, fraud, or dispute arising before, during, or after the marriage.
                </p>
              </section>

              {/* 8. No obligation to accept proposals */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <h2 className="font-display text-lg sm:text-xl font-semibold text-[#ecd290]">
                  8. No Obligation to Accept Proposals
                </h2>
                <p className="text-[#c4b99f]">
                  No individual or family is coerced or obligated to accept any proposal. The decision to accept, reject, or discontinue a match rests entirely with the family concerned, and we bear no responsibility for that decision.
                </p>
              </section>

              {/* 9. Privacy & confidentiality */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <h2 className="font-display text-lg sm:text-xl font-semibold text-[#ecd290]">
                  9. Privacy & Confidentiality
                </h2>
                <p className="text-[#c4b99f]">
                  Client data will not be published on social media or public platforms without explicit consent. Basic details and general requirements may be shared with other registered clients for matchmaking purposes only, and only with the family&apos;s permission. Full names, father&apos;s names, employment details, addresses, contact numbers, and photographs remain strictly confidential.
                </p>
              </section>

              {/* 10. Parental or guardian involvement */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <h2 className="font-display text-lg sm:text-xl font-semibold text-[#ecd290]">
                  10. Parental or Guardian Involvement
                </h2>
                <p className="text-[#c4b99f]">
                  All proposals must be handled directly by parents, legal guardians, or elder siblings. We do not engage with minors or individuals deemed immature for matrimonial negotiations, and reserve the right to terminate any proposal immediately in cases of disrespect, intolerance, abusive language, or misconduct.
                </p>
              </section>

              {/* 11. Right of refusal, suspension & termination */}
              <section className="space-y-2 border-b border-[rgba(201,162,75,0.12)] pb-6">
                <h2 className="font-display text-lg sm:text-xl font-semibold text-[#ecd290]">
                  11. Right of Refusal, Suspension & Termination
                </h2>
                <p className="text-[#c4b99f]">
                  We are committed to a respectful, professional, and ethical environment for all clients, families, and partner consultants, and expect the same courtesy in return. We reserve the absolute right to suspend, reject, or terminate any registration, proposal, or service without notice in cases of insulting or offensive conduct, discrimination, intolerance, harassment, threats, abusive language, misrepresentation, fraud, misconduct, or any act that harms the dignity or professional standing of our organisation, clients, or partners. This may include immediate closure of the case and cessation of all services without liability on our part.
                </p>
              </section>

              {/* 12. Final Acceptance */}
              <div className="rounded-xl border border-[rgba(201,162,75,0.35)] bg-gradient-to-r from-[#211a12] to-[#16120c] p-5 text-center mt-6">
                <FileCheck className="h-6 w-6 text-[#ecd290] mx-auto mb-2" />
                <p className="font-bold text-[#f4ecda] text-base">
                  By registering with {SITE_CONFIG.name}, you confirm your acceptance of these Terms and Conditions in their entirety.
                </p>
              </div>
            </div>
          )}

          {/* Quick Actions Footer */}
          <div className="pt-8 border-t border-[rgba(201,162,75,0.18)] flex flex-wrap items-center justify-between gap-3.5">
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
            </div>

            <div>
              <Link
                href={`${prefix}/privacy`}
                className="text-xs text-[#a79c82] hover:text-[#ecd290] underline underline-offset-4 transition-colors"
              >
                {isUrdu ? 'رازداری کی پالیسی دیکھیں →' : 'View Privacy Policy →'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}