'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SITE_CONFIG } from '@/lib/config';
import { Check, Shield, Share2 } from 'lucide-react';

export const ProfileSampleSection = () => {
  const t = useTranslations('sample');
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'instagram'>('whatsapp');

  return (
    <section className="relative bg-[#0a0908] py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-[#ecd290]">
            {t('eyebrow')}
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-[#f4ecda] sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-2 text-sm text-[#a79c82] sm:text-base">
            {t('subtitle')}
          </p>
        </div>

        {/* Tab switchers */}
        <div className="mt-8 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('whatsapp')}
            className={`min-h-[48px] rounded-full px-5 py-2.5 text-xs font-semibold tracking-wider transition ${
              activeTab === 'whatsapp'
                ? 'bg-[#d4af61] text-black shadow-md'
                : 'border border-[rgba(201,162,75,0.3)] bg-[#16130f] text-[#f4ecda] hover:border-[#d4af61]'
            }`}
          >
            {t('tabWhatsApp')}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('instagram')}
            className={`min-h-[48px] rounded-full px-5 py-2.5 text-xs font-semibold tracking-wider transition ${
              activeTab === 'instagram'
                ? 'bg-[#d4af61] text-black shadow-md'
                : 'border border-[rgba(201,162,75,0.3)] bg-[#16130f] text-[#f4ecda] hover:border-[#d4af61]'
            }`}
          >
            {t('tabInstagram')}
          </button>
        </div>

        {/* Tab content area */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            {activeTab === 'whatsapp' ? (
              /* WhatsApp Text Container with Internal Scroll */
              <div className="relative rounded-2xl border border-[rgba(201,162,75,0.25)] bg-[#100e0b] p-5 shadow-2xl">
                <div className="flex items-center justify-between border-b border-[rgba(201,162,75,0.2)] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono font-medium text-[#ecd290]">WhatsApp Format</span>
                  </div>
                  <span className="rounded bg-[#d4af61]/20 px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#ecd290] border border-[#d4af61]/40">
                    {t('sampleBadge')}
                  </span>
                </div>

                <div className="mt-4 max-h-[380px] overflow-y-auto overflow-x-hidden rounded-lg bg-black/60 p-4 font-mono text-xs leading-relaxed text-[#f4ecda]/90 scrollbar-thin">
                  <p className="text-[#a79c82]">➖➖➖➖➖➖➖➖➖</p>
                  <p><b className="text-[#ecd290]">Date:</b> 1 October 2026</p>
                  <p><b className="text-[#ecd290]">Ref ID:</b> {SITE_CONFIG.sampleRefId}</p>
                  <p className="text-[#a79c82]">➖➖➖➖➖➖➖➖➖</p>
                  <p className="mt-2 text-[#ecd290]">🔸 <b>امیدوار کی تفصیل</b></p>
                  <p className="text-xs font-serif leading-loose" lang="ur" dir="rtl">
                    27 سال، 5 فٹ 5 انچ، غیر شادی شدہ، ایم بی اے، لاہور میں مارکیٹنگ مینیجر، والد ریٹائرڈ استاد، والدہ ہاؤس وائف، ایک بھائی اور ایک بہن
                  </p>
                  <p className="mt-2 text-[#ecd290]">🔸 <b>مطلوبہ رشتہ</b></p>
                  <p className="text-xs font-serif leading-loose" lang="ur" dir="rtl">
                    28 تا 32 سال، تعلیم یافتہ، لاہور یا اسلام آباد، شریف اور سلجھا ہوا گھرانہ
                  </p>
                  <p className="text-[#a79c82]">➖➖➖➖➖➖➖➖➖</p>
                  <p className="mt-2 text-[#ecd290]">🔸 <b>BASIC INFORMATION</b></p>
                  <p><b>Gender:</b> Female</p>
                  <p><b>Age:</b> 27</p>
                  <p><b>Height:</b> 5&apos;5&quot;</p>
                  <p><b>Marital Status:</b> Unmarried</p>
                  <p><b>Religion/Sect:</b> Islam / Sunni</p>
                  <p className="mt-2 text-[#ecd290]">🔸 <b>EDUCATION & WORK</b></p>
                  <p><b>Education:</b> MBA</p>
                  <p><b>Occupation:</b> Marketing Manager, Lahore</p>
                  <p className="mt-2 text-[#ecd290]">🔸 <b>FAMILY</b></p>
                  <p><b>Father:</b> Retired teacher</p>
                  <p><b>Mother:</b> Housewife</p>
                  <p><b>Siblings:</b> 1 brother, 1 sister</p>
                  <p className="mt-2 text-[#ecd290]">🔸 <b>REQUIREMENTS</b></p>
                  <p><b>Age:</b> 28 to 32</p>
                  <p><b>City:</b> Lahore / Islamabad</p>
                  <p className="text-[#a79c82]">➖➖➖➖➖➖➖➖➖</p>
                </div>
              </div>
            ) : (
              /* Designed Instagram Card (Pure Code / SVG, Gold-on-Black) */
              <div className="relative mx-auto max-w-sm rounded-2xl border border-[rgba(212,175,97,0.4)] bg-gradient-to-b from-[#16130f] to-[#0a0908] p-6 shadow-2xl text-center">
                <div className="flex items-center justify-between border-b border-[rgba(201,162,75,0.2)] pb-3">
                  <span className="font-serif text-xs uppercase tracking-widest text-[#ecd290]">
                    {SITE_CONFIG.name}
                  </span>
                  <span className="rounded bg-[#d4af61]/20 px-2 py-0.5 font-mono text-[10px] font-bold text-[#ecd290] border border-[#d4af61]/40">
                    {t('sampleBadge')}
                  </span>
                </div>

                <div className="my-5 flex flex-col items-center">
                  <div className="rounded-full border border-[#d4af61]/50 px-4 py-1 text-xs font-mono font-bold tracking-wider text-[#ecd290]">
                    {SITE_CONFIG.sampleRefId}
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-bold text-[#f4ecda]">
                    Female Profile · 27 Years
                  </h3>
                  <p className="mt-1 text-xs text-[#a79c82]">
                    Height 5&apos;5&quot; · Unmarried · MBA (Lahore)
                  </p>
                </div>

                <div className="rounded-xl border border-[rgba(201,162,75,0.2)] bg-black/40 p-3.5 text-start text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#a79c82]">Profession:</span>
                    <span className="text-[#f4ecda] font-medium">Marketing Manager</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a79c82]">Father:</span>
                    <span className="text-[#f4ecda] font-medium">Retired Teacher</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a79c82]">Looking for:</span>
                    <span className="text-[#ecd290] font-medium">28–32 Yrs · Educated</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a79c82]">City Preferred:</span>
                    <span className="text-[#f4ecda] font-medium">Lahore / Islamabad</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[rgba(201,162,75,0.15)] flex items-center justify-between text-[11px] text-[#a79c82]">
                  <span>Family-to-Family Inquiries</span>
                  <span className="text-[#ecd290] font-mono">wa.me/{SITE_CONFIG.whatsappNumber}</span>
                </div>
              </div>
            )}
          </div>

          {/* Under-sample Bullets & Explanations */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-4">
            <h3 className="font-serif text-xl font-bold text-[#ecd290] sm:text-2xl">
              Dignity in Every Shared Detail
            </h3>
            <ul className="space-y-3 text-sm text-[#f4ecda]">
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#d4af61]/20 text-[#ecd290]">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span>{t('bullet1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#d4af61]/20 text-[#ecd290]">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span>{t('bullet2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#d4af61]/20 text-[#ecd290]">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span>{t('bullet3')}</span>
              </li>
            </ul>

            <div className="mt-2 rounded-xl border border-[rgba(201,162,75,0.2)] bg-[#16130f]/60 p-4 text-xs text-[#a79c82] flex items-start gap-2.5">
              <Shield className="h-4 w-4 shrink-0 text-[#d4af61] mt-0.5" />
              <span>{t('noteFictional')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
