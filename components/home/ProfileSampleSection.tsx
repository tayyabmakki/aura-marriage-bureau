'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { SITE_CONFIG } from '@/lib/config';
import {
  Check,
  Shield,
  MessageCircle,
  Instagram,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  Share2,
  Bookmark,
  ExternalLink,
  Copy,
} from 'lucide-react';

export const ProfileSampleSection = () => {
  const t = useTranslations('sample');
  const locale = useLocale();
  const isUrdu = locale === 'ur';

  const [activeTab, setActiveTab] = useState<'whatsapp' | 'post' | 'reel'>('post');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const sampleWhatsAppText = isUrdu
    ? `*${SITE_CONFIG.name} · رشتہ پروفائل*\nریفرنس نمبر: ${SITE_CONFIG.sampleRefId}\n\n*بنیادی معلومات*\nجنس: لڑکی (Female)\nعمر: 25 سال\nقد: 5 فٹ 4 انچ\nوالد کی ذات: آرائیں\nمسلک: سنی\nازدواجی حیثیت: غیر شادی شدہ (Unmarried)\nمعذوری / بیماری: نہیں\n\n*تعلیم*\nڈگری: M.Phil Pharmacy\nادارہ: یونیورسٹی آف لاہور\n\n*پیشہ و ملازمت*\nمصروفیت: یونیورسٹی لیکچرر (University Lecturer)\nشہر: لاہور\n\n*خاندان*\nوالد: ریٹائرڈ آفیسر\nوالدہ: گھریلو خاتون\nبھائی: 2 بھائی\nبہنیں: 1 بہن\nرہائش: لاہور (ذاتی گھر)\n\n*مطلوبہ رشتہ*\nعمر کی حد: 26 تا 30 سال\nکم از کم قد: 5 فٹ 6 انچ یا زائد\nذات کی ترجیح: صرف آرائیں\nتعلیم: کم از کم ماسٹرز / پیشہ ورانہ ڈگری`
    : `*${SITE_CONFIG.name} · Rishta Profile*\nRef ID: ${SITE_CONFIG.sampleRefId}\n\n*BASIC*\nGender: Female\nAge: 25 Years\nHeight: 5'4"\nFather's Caste: Arain\nSect: Sunni\nMarital Status: Unmarried\nDisability / Disease: No\n\n*EDUCATION*\nHighest Qualification: M.Phil Pharmacy\nInstitute: University of Lahore\n\n*PROFESSION*\nOccupation Status: Job (University Lecturer)\nWork City: Lahore\n\n*FAMILY*\nFather's Status: Retired Officer\nMother's Status: Housewife\nBrothers: 2 brothers\nSisters: 1 sister\nResidence: Lahore (Own House)\n\n*REQUIREMENTS*\nPreferred Age: 26 to 30 Years\nPreferred Height: 5'6" or above\nPreferred Caste: Arain strictly\nPreferred Education: Master's / Professional Degree`;

  const handleCopySample = () => {
    navigator.clipboard.writeText(sampleWhatsAppText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  return (
    <section className="relative bg-[#0a0908] py-18 sm:py-24 lg:py-28 overflow-hidden">
      {/* Background Ambient Glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(212,175,97,0.07)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-kicker text-[#ecd290] font-semibold">
            {t('eyebrow')}
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-[#f4ecda] sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-2 text-sm text-[#a79c82] sm:text-base max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Triple Tab Switcher: WhatsApp | Instagram Post | Instagram Reel */}
        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2"
          role="tablist"
          aria-label="Profile sample formats"
        >
          {/* Instagram Post Tab */}
          <button
            id="tab-post"
            role="tab"
            aria-selected={activeTab === 'post'}
            aria-controls="panel-post"
            type="button"
            onClick={() => setActiveTab('post')}
            className={`min-h-[38px] sm:min-h-[46px] inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-semibold tracking-normal sm:tracking-wider transition-all duration-300 ${
              activeTab === 'post'
                ? 'bg-gradient-to-r from-[#b88a35] via-[#ecd290] to-[#c9a24b] text-[#1a1306] font-bold shadow-lg shadow-[#d4af61]/20 scale-105'
                : 'border border-[rgba(201,162,75,0.25)] bg-[#14110d] text-[#e6dcc3] hover:border-[#d4af61] hover:text-[#ecd290]'
            }`}
          >
            <Instagram className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>{t('tabInstagram')} (4:5)</span>
          </button>

          {/* Instagram Reel Tab */}
          <button
            id="tab-reel"
            role="tab"
            aria-selected={activeTab === 'reel'}
            aria-controls="panel-reel"
            type="button"
            onClick={() => setActiveTab('reel')}
            className={`min-h-[38px] sm:min-h-[46px] inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-semibold tracking-normal sm:tracking-wider transition-all duration-300 ${
              activeTab === 'reel'
                ? 'bg-gradient-to-r from-[#b88a35] via-[#ecd290] to-[#c9a24b] text-[#1a1306] font-bold shadow-lg shadow-[#d4af61]/20 scale-105'
                : 'border border-[rgba(201,162,75,0.25)] bg-[#14110d] text-[#e6dcc3] hover:border-[#d4af61] hover:text-[#ecd290]'
            }`}
          >
            <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current" />
            <span>{t('tabReel')} (9:16)</span>
          </button>

          {/* WhatsApp Tab */}
          <button
            id="tab-whatsapp"
            role="tab"
            aria-selected={activeTab === 'whatsapp'}
            aria-controls="panel-whatsapp"
            type="button"
            onClick={() => setActiveTab('whatsapp')}
            className={`min-h-[38px] sm:min-h-[46px] inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-semibold tracking-normal sm:tracking-wider transition-all duration-300 ${
              activeTab === 'whatsapp'
                ? 'bg-gradient-to-r from-[#b88a35] via-[#ecd290] to-[#c9a24b] text-[#1a1306] font-bold shadow-lg shadow-[#d4af61]/20 scale-105'
                : 'border border-[rgba(201,162,75,0.25)] bg-[#14110d] text-[#e6dcc3] hover:border-[#d4af61] hover:text-[#ecd290]'
            }`}
          >
            <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>{t('tabWhatsApp')}</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Main Visual Display Area (7 Cols) */}
          <div className="lg:col-span-7 flex justify-center">
            {/* 1. Instagram Post Format (4:5 Ratio) */}
            {activeTab === 'post' && (
              <div
                id="panel-post"
                role="tabpanel"
                aria-labelledby="tab-post"
                className="w-full max-w-md rounded-2xl border border-[rgba(201,162,75,0.3)] bg-gradient-to-b from-[#18140f] to-[#0d0b08] p-3.5 sm:p-5 shadow-2xl backdrop-blur-md"
              >
                {/* Simulated Instagram Post Header */}
                <div className="flex items-center justify-between border-b border-[rgba(201,162,75,0.18)] pb-3 px-1">
                  <div className="flex items-center gap-2.5">
                    <div className="relative h-9 w-9 shrink-0 rounded-full border border-[#d4af61]/50 p-0.5 bg-[#120f0b]">
                      <Image
                        src="/logo.png"
                        alt={SITE_CONFIG.name}
                        fill
                        sizes="36px"
                        className="rounded-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-sans text-xs font-semibold text-[#f4ecda] tracking-wide">
                          auramarriagebureau
                        </span>
                        <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#d4af61] text-[#0a0908] text-[9px] font-bold">
                          ✓
                        </span>
                      </div>
                      <span className="block text-[10px] text-[#a79c82]">
                        Lahore, Pakistan &bull; Matrimonial
                      </span>
                    </div>
                  </div>

                  <span className="rounded-full bg-[#d4af61]/15 px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#ecd290] border border-[#d4af61]/35">
                    {t('sampleBadge')}
                  </span>
                </div>

                {/* The Authentic 1080x1350 Instagram Feed Post Image */}
                <div className="relative mt-3.5 aspect-[4/5] w-full overflow-hidden rounded-xl border border-[rgba(201,162,75,0.2)] bg-[#1c0d12] shadow-inner">
                  <Image
                    src="/images/sample-post-au-049.webp"
                    alt="Aura Marriage Bureau authentic Instagram post for candidate AU-049 in Urdu"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 440px"
                    className="object-cover"
                  />
                </div>

                {/* Simulated Instagram Action Bar */}
                <div className="mt-3.5 flex items-center justify-between px-1 text-[#e6dcc3]">
                  <div className="flex items-center gap-3.5">
                    <Heart className="h-4.5 w-4.5 text-[#d4af61] fill-current" />
                    <MessageCircle className="h-4.5 w-4.5 text-[#a79c82] hover:text-[#ecd290] transition-colors" />
                    <Share2 className="h-4.5 w-4.5 text-[#a79c82] hover:text-[#ecd290] transition-colors" />
                  </div>
                  <Bookmark className="h-4.5 w-4.5 text-[#a79c82]" />
                </div>

                {/* Caption Snippet + Instagram Direct Link */}
                <div className="mt-3 border-t border-[rgba(201,162,75,0.15)] pt-3 px-1 text-xs text-[#a79c82] flex items-center justify-between gap-2">
                  <span className="font-urdu-ui text-xs text-[#e6dcc3] truncate" dir="rtl">
                    رشتہ درکار ہے • AU-049 • ایم فل فارمیسی
                  </span>
                  <a
                    href={SITE_CONFIG.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-1 text-[11px] font-semibold text-[#ecd290] hover:underline"
                  >
                    <span>{isUrdu ? 'انسٹاگرام پر دیکھیں' : 'View on Instagram'}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            )}

            {/* 2. Instagram Reel Format (9:16 Vertical Video) */}
            {activeTab === 'reel' && (
              <div
                id="panel-reel"
                role="tabpanel"
                aria-labelledby="tab-reel"
                className="w-full max-w-xs flex flex-col items-center"
              >
                {/* Smartphone Mockup Frame */}
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[32px] border-4 border-[#2a241a] bg-black shadow-[0_20px_50px_rgba(0,0,0,0.8)] ring-1 ring-[#d4af61]/30">
                  {/* Top Phone Speaker / Dynamic Island */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 h-3.5 w-20 rounded-full bg-black/80 backdrop-blur-md border border-white/10" />

                  {/* HTML5 Vertical Video Reel */}
                  <video
                    ref={videoRef}
                    src="/videos/aura-reel-au-049.mp4"
                    poster="/images/sample-reel-cover-au-049.webp"
                    playsInline
                    loop
                    autoPlay
                    muted={isMuted}
                    className="h-full w-full object-cover cursor-pointer"
                    onClick={togglePlay}
                  />

                  {/* Top Reel Header Overlay */}
                  <div className="absolute top-7 inset-x-3 z-20 flex items-center justify-between text-white/90 drop-shadow-md">
                    <span className="font-sans text-xs font-bold tracking-wider uppercase">
                      Reels
                    </span>
                    <button
                      type="button"
                      onClick={toggleMute}
                      className="rounded-full bg-black/60 p-1.5 backdrop-blur-md text-[#ecd290] border border-[#d4af61]/40 hover:bg-black/80 transition-colors"
                      aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                    >
                      {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                    </button>
                  </div>

                  {/* Center Play/Pause Indicator on Click */}
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity"
                    aria-label={isPlaying ? 'Pause reel video' : 'Play reel video'}
                  >
                    <div className="rounded-full bg-black/70 p-4 backdrop-blur-md text-[#ecd290] border border-[#d4af61]/50 shadow-xl">
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 fill-current" />}
                    </div>
                  </button>

                  {/* Bottom Instagram Reel HUD Overlay */}
                  <div className="absolute bottom-3 inset-x-3 z-20 pointer-events-none drop-shadow-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="relative h-6 w-6 shrink-0 rounded-full border border-[#d4af61] overflow-hidden bg-black">
                        <Image
                          src="/logo.png"
                          alt={SITE_CONFIG.name}
                          fill
                          sizes="24px"
                          className="object-contain"
                        />
                      </div>
                      <span className="font-sans text-xs font-bold text-white tracking-wide">
                        auramarriagebureau
                      </span>
                      <span className="text-[10px] text-[#ecd290] bg-[#d4af61]/20 px-1.5 py-0.5 rounded-full border border-[#d4af61]/40">
                        Follow
                      </span>
                    </div>

                    <p className="font-urdu-ui text-[11px] text-white/95 line-clamp-1" dir="rtl">
                      رشتہ درکار ہے • پروفائل نمبر AU-049 • لاہور
                    </p>

                    <div className="flex items-center gap-1.5 text-[9px] text-white/80 mt-1">
                      <span>♫</span>
                      <span className="truncate">Aura Marriage Bureau &bull; Original Audio</span>
                    </div>
                  </div>
                </div>

                {/* Subtitle Control Note */}
                <div className="mt-3 flex items-center gap-2 text-xs text-[#a79c82]">
                  <span className="text-[11px]">
                    {isUrdu ? 'ویڈیو چلانے یا روکنے کے لیے ٹیپ کریں' : 'Tap screen to play/pause'}
                  </span>
                  <span>&bull;</span>
                  <a
                    href={SITE_CONFIG.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ecd290] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Instagram</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            )}

            {/* 3. WhatsApp Message Format */}
            {activeTab === 'whatsapp' && (
              <div
                id="panel-whatsapp"
                role="tabpanel"
                aria-labelledby="tab-whatsapp"
                className="w-full max-w-md rounded-2xl border border-[rgba(201,162,75,0.25)] bg-[#100e0b] p-4 sm:p-5 shadow-2xl backdrop-blur-md"
              >
                {/* Header Strip */}
                <div className="flex items-center justify-between border-b border-[rgba(201,162,75,0.2)] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono font-medium text-[#ecd290]">
                      WhatsApp Direct Message
                    </span>
                  </div>
                  <span className="rounded bg-[#d4af61]/20 px-2.5 py-0.5 font-mono text-xs font-bold text-[#ecd290] border border-[#d4af61]/40">
                    {t('sampleBadge')}
                  </span>
                </div>

                {/* Internal Scrollable Message Preview */}
                <div className="mt-4 max-h-[360px] overflow-y-auto overflow-x-hidden rounded-xl bg-black/70 p-4 font-mono text-xs leading-relaxed text-[#f4ecda]/90 border border-[rgba(201,162,75,0.15)] scrollbar-thin">
                  <pre className="whitespace-pre-wrap font-sans text-xs text-[#e6dcc3] leading-relaxed">
                    {sampleWhatsAppText}
                  </pre>
                </div>

                {/* Action Row */}
                <div className="mt-3.5 flex items-center justify-between pt-2 border-t border-[rgba(201,162,75,0.15)]">
                  <button
                    type="button"
                    onClick={handleCopySample}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#1c1813] border border-[rgba(201,162,75,0.25)] px-3.5 py-1.5 text-xs font-medium text-[#ecd290] hover:border-[#d4af61] transition-colors"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? (isUrdu ? 'کاپی ہو گیا ✓' : 'Copied ✓') : (isUrdu ? 'نمونہ کاپی کریں' : 'Copy Sample')}</span>
                  </button>

                  <a
                    href={SITE_CONFIG.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#25d366] hover:underline"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Dignity & Confidentiality Principles (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-5">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#d4af61] font-semibold">
                {isUrdu ? 'خاندانی وقار کا تحفظ' : 'Protected Matrimonial Standards'}
              </span>
              <h3 className="mt-1 font-display text-xl sm:text-2xl font-semibold text-[#ecd290]">
                {isUrdu ? 'ہر تفصیل میں پردہ اور عزت' : 'Dignity in Every Shared Detail'}
              </h3>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-[#f4ecda]">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#d4af61]/20 text-[#ecd290] border border-[#d4af61]/40">
                  <Check className="h-3 w-3" />
                </div>
                <span>{t('bullet1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#d4af61]/20 text-[#ecd290] border border-[#d4af61]/40">
                  <Check className="h-3 w-3" />
                </div>
                <span>{t('bullet2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#d4af61]/20 text-[#ecd290] border border-[#d4af61]/40">
                  <Check className="h-3 w-3" />
                </div>
                <span>{t('bullet3')}</span>
              </li>
            </ul>

            {/* Fictional Disclaimer Notice */}
            <div className="rounded-xl border border-[rgba(201,162,75,0.22)] bg-[#14110d]/80 p-4 text-xs text-[#a79c82] flex items-start gap-3">
              <Shield className="h-4 w-4 shrink-0 text-[#d4af61] mt-0.5" />
              <p className="leading-relaxed">
                {t('noteFictional')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
