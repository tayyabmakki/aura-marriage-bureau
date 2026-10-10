'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { SITE_CONFIG } from '@/lib/config';
import { SvgWaveDivider } from '@/components/BrandIcons';
import {
  FlagPakistan,
  FlagUAE,
  FlagUK,
  FlagUS,
  FlagCanada,
  FlagSaudiArabia,
} from '@/components/FlagBadges';
import {
  Heart,
  Shield,
  Users,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Check,
  Copy,
  MessageCircle,
} from 'lucide-react';

const HEIGHT_OPTIONS: string[] = [];
for (let ft = 4; ft <= 7; ft++) {
  for (let i = 0; i < 12; i++) {
    if (ft === 4 && i < 6) continue;
    if (ft === 7 && i > 0) break;
    HEIGHT_OPTIONS.push(`${ft}'${i}"`);
  }
}

const YN = ['No', 'Yes'];

interface FieldDef {
  key: string;
  en: string;
  ur: string;
  type: 'text' | 'tel' | 'email' | 'date' | 'number' | 'radio' | 'select' | 'textarea';
  options?: string[];
  required?: boolean;
  hint?: string;
  min?: number;
  max?: number;
}

interface StepDef {
  t: string;
  en: string;
  ur: string;
  f: FieldDef[];
}

const STEPS: StepDef[] = [
  {
    t: 'Basic',
    en: 'Basic information',
    ur: 'بنیادی معلومات',
    f: [
      { key: 'name', en: 'Name', ur: 'نام', type: 'text', required: false, hint: 'Shared only with the bureau, never posted publicly.' },
      { key: 'gender', en: 'Gender', ur: 'جنس', type: 'radio', options: ['Male', 'Female'], required: true },
      { key: 'dob', en: 'Date of birth (as per CNIC)', ur: 'تاریخِ پیدائش', type: 'date', required: false, hint: 'Age below fills in automatically.' },
      { key: 'age', en: 'Age', ur: 'عمر', type: 'number', min: 16, max: 90, required: true },
      { key: 'height', en: 'Height', ur: 'قد', type: 'select', options: HEIGHT_OPTIONS, required: true, hint: 'Feet and inches, e.g. 5\'4".' },
      { key: 'caste', en: "Father's caste", ur: 'والد کی ذات', type: 'text', required: true },
      { key: 'marital', en: 'Marital status', ur: 'ازدواجی حیثیت', type: 'radio', options: ['Unmarried', 'Divorced', 'Khula', 'Widow', 'Widower'], required: true },
      { key: 'disability', en: 'Any disability / disease', ur: 'کوئی معذوری / بیماری', type: 'radio', options: YN, required: true, hint: 'Honest details help find the right match.' },
      { key: 'sect', en: 'Religion / sect / maslik', ur: 'مذہب / فرقہ / مسلک', type: 'radio', options: ['Sunni', 'Shia (Ahl-e-Tashee)', 'Other'], required: true },
      { key: 'fatherName', en: "Father's / guardian's name", ur: 'والد / سرپرست کا نام', type: 'text' },
      { key: 'pob', en: 'Place of birth', ur: 'جائے پیدائش', type: 'text' },
      { key: 'motherCaste', en: "Mother's caste", ur: 'والدہ کی ذات', type: 'text' },
      { key: 'origin', en: 'Migrated or local', ur: 'مہاجر یا مقامی', type: 'radio', options: ['Local', 'Migrated', 'Overseas Pakistani'] },
      { key: 'nationality', en: 'Nationality', ur: 'قومیت', type: 'radio', options: ['Pakistani', 'Dual nationality', 'Other'] },
    ],
  },
  {
    t: 'Education',
    en: 'Education',
    ur: 'تعلیم',
    f: [
      { key: 'edu', en: 'Highest qualification', ur: 'اعلیٰ ترین تعلیم', type: 'text', required: true, hint: 'e.g. BS Computer Science, MBBS, Intermediate' },
      { key: 'eduDetail', en: 'Degree / institute details', ur: 'ڈگری / ادارے کی تفصیل', type: 'text' },
      { key: 'eduOther', en: 'Other courses / skills', ur: 'دیگر کورسز / ہنر', type: 'textarea' },
    ],
  },
  {
    t: 'Job',
    en: 'Job / Work',
    ur: 'ملازمت / کاروبار',
    f: [
      { key: 'occ', en: 'Occupation status', ur: 'پیشہ / مصروفیت', type: 'radio', options: ['Job', 'Business', 'Student', 'Not working', 'Housewife'], required: true },
      { key: 'designation', en: 'Designation / profession', ur: 'عہدہ / پیشہ', type: 'text' },
      { key: 'employer', en: 'Company / business name', ur: 'ادارہ / کاروبار کا نام', type: 'text' },
      { key: 'workCity', en: 'Work city', ur: 'کام کا شہر', type: 'text' },
      { key: 'income', en: 'Monthly income', ur: 'ماہانہ آمدن', type: 'text', hint: 'Optional. Approximate is fine.' },
    ],
  },
  {
    t: 'Family',
    en: 'Family details',
    ur: 'خاندانی معلومات',
    f: [
      { key: 'fatherOcc', en: "Father's occupation (or late)", ur: 'والد کا پیشہ', type: 'text', required: true },
      { key: 'motherOcc', en: "Mother's occupation / housewife", ur: 'والدہ کا پیشہ', type: 'text' },
      { key: 'brothers', en: 'Brothers (total / married)', ur: 'بھائی (کل / شادی شدہ)', type: 'text', required: true, hint: 'e.g. 2 total, 1 married' },
      { key: 'sisters', en: 'Sisters (total / married)', ur: 'بہنیں (کل / شادی شدہ)', type: 'text', required: true, hint: 'e.g. 3 total, 2 married' },
      { key: 'sibDetail', en: "Siblings' details", ur: 'بہن بھائیوں کی تفصیل', type: 'textarea', hint: 'Name, age, education, job, marital status' },
      { key: 'famType', en: 'Family system', ur: 'خاندانی نظام', type: 'radio', options: ['Joint', 'Nuclear'] },
    ],
  },
  {
    t: 'Residence',
    en: 'Residence',
    ur: 'رہائش',
    f: [
      { key: 'city', en: 'City', ur: 'شہر', type: 'text', required: true },
      { key: 'area', en: 'Area / town', ur: 'علاقہ', type: 'text' },
      { key: 'address', en: 'Complete address', ur: 'مکمل پتہ', type: 'textarea', required: true },
      { key: 'house', en: 'House status', ur: 'رہائش', type: 'radio', options: ['Own', 'Rented', 'Family house'] },
    ],
  },
  {
    t: 'Contact',
    en: 'Contact',
    ur: 'رابطہ',
    f: [
      { key: 'contactName', en: 'Contact person & relation', ur: 'رابطہ کرنے والا', type: 'text', required: true, hint: 'e.g. Ahmed (brother)' },
      { key: 'wa', en: 'WhatsApp number', ur: 'واٹس ایپ نمبر', type: 'tel', required: true, hint: 'With country code, e.g. +92 300 1234567' },
      { key: 'altPhone', en: 'Alternate number', ur: 'متبادل نمبر', type: 'tel' },
      { key: 'email', en: 'Email', ur: 'ای میل', type: 'email' },
      { key: 'callTime', en: 'Best time to call', ur: 'رابطے کا بہترین وقت', type: 'text' },
    ],
  },
  {
    t: 'Requirements',
    en: 'Requirements',
    ur: 'شرائط',
    f: [
      { key: 'rAge', en: 'Preferred age range', ur: 'عمر کی حد', type: 'text', required: true, hint: 'e.g. 25 to 30' },
      { key: 'rHeight', en: 'Preferred height', ur: 'قد', type: 'text' },
      { key: 'rCaste', en: 'Preferred caste / sect', ur: 'ذات / فرقہ', type: 'text' },
      { key: 'rEdu', en: 'Preferred education', ur: 'تعلیم', type: 'text' },
      { key: 'rJob', en: 'Preferred job / income', ur: 'پیشہ / آمدن', type: 'text' },
      { key: 'rCity', en: 'Preferred city / country', ur: 'شہر / ملک', type: 'text' },
      { key: 'rOther', en: 'Other requirements', ur: 'دیگر شرائط', type: 'textarea' },
    ],
  },
  {
    t: 'Review',
    en: 'Review & copy',
    ur: 'جائزہ اور کاپی',
    f: [],
  },
];

const STORAGE_KEY = 'profile-form-v1';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export const ProfileWizard = () => {
  const locale = useLocale();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [cur, setCur] = useState(0);
  const [badFields, setBadFields] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load from local storage with 7-day TTL
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.timestamp && Date.now() - parsed.timestamp > SEVEN_DAYS_MS) {
          localStorage.removeItem(STORAGE_KEY);
        } else {
          if (parsed.S) setFormData(parsed.S);
          if (typeof parsed.cur === 'number' && parsed.cur >= 0 && parsed.cur < STEPS.length) {
            setCur(parsed.cur);
          }
        }
      }
    } catch {
      // Ignore private browsing / quota access exceptions
    }
  }, []);

  // Save to local storage with timestamp
  const saveToStorage = (data: Record<string, string>, step: number) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ S: data, cur: step, timestamp: Date.now() })
      );
    } catch {
      // Ignore quota exceptions
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  const handleInputChange = (key: string, value: string) => {
    const updated = { ...formData, [key]: value };

    // Timezone-safe auto-calculation of age from DOB (YYYY-MM-DD)
    if (key === 'dob' && value) {
      const parts = value.split('-').map(Number);
      if (parts.length === 3) {
        const [birthYear, birthMonth, birthDay] = parts;
        if (!isNaN(birthYear) && !isNaN(birthMonth) && !isNaN(birthDay)) {
          const today = new Date();
          const currentYear = today.getFullYear();
          const currentMonth = today.getMonth() + 1; // 1-12
          const currentDay = today.getDate();

          let age = currentYear - birthYear;
          if (
            currentMonth < birthMonth ||
            (currentMonth === birthMonth && currentDay < birthDay)
          ) {
            age--;
          }

          if (age >= 16 && age <= 100) {
            updated.age = String(age);
            setBadFields((prev) => {
              const next = new Set(prev);
              next.delete('age');
              return next;
            });
          }
        }
      }
    }

    setBadFields((prev) => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });

    setFormData(updated);
    saveToStorage(updated, cur);
  };

  const goToStep = (stepIdx: number, focusKey?: string) => {
    setCur(stepIdx);
    setBadFields(new Set());
    saveToStorage(formData, stepIdx);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (focusKey) {
      setTimeout(() => {
        const el = document.getElementById(`field-${focusKey}`) || (document.querySelector(`[name="${focusKey}"]`) as HTMLElement);
        el?.focus();
        setBadFields(new Set([focusKey]));
      }, 100);
    }
  };

  const handleNext = () => {
    const step = STEPS[cur];
    const missing = step.f.filter((f) => f.required && !String(formData[f.key] || '').trim());

    if (missing.length > 0) {
      const missingKeys = new Set(missing.map((f) => f.key));
      setBadFields(missingKeys);
      const firstEl = document.querySelector('.field-error input, .field-error select, .field-error textarea') as HTMLElement;
      firstEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstEl?.focus();
      return;
    }

    goToStep(cur + 1);
  };

  const handleClear = () => {
    const confirmMessage =
      locale === 'ur'
        ? 'کیا آپ تمام درج کردہ معلومات ختم کرنا چاہتے ہیں؟'
        : 'Clear all the details you have entered?';

    if (window.confirm(confirmMessage)) {
      setFormData({});
      setBadFields(new Set());
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
      goToStep(0);
      showToast(locale === 'ur' ? 'ڈیٹا صاف کر دیا گیا ہے' : 'Form data cleared');
    }
  };

  const buildOutputText = (): string => {
    const out = [`*${SITE_CONFIG.name} · Profile Form*`];
    STEPS.slice(0, 7).forEach((s) => {
      const lines = s.f
        .filter((f) => String(formData[f.key] || '').trim().length > 0)
        .map((f) => `${f.en}: ${formData[f.key]}`);
      if (lines.length) {
        out.push('', `*${s.t.toUpperCase()}*`, ...lines);
      }
    });
    return out.join('\n');
  };

  const handleCopy = () => {
    const txt = buildOutputText();
    const fallback = () => {
      const a = document.createElement('textarea');
      a.value = txt;
      document.body.appendChild(a);
      a.select();
      try {
        document.execCommand('copy');
        showToast('Copied! Paste it in WhatsApp');
      } catch {
        showToast('Select the text and copy manually');
      }
      a.remove();
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(txt).then(() => {
        showToast('Copied! Paste it in WhatsApp');
      }, fallback);
    } else {
      fallback();
    }
  };

  const handleOpenWhatsApp = () => {
    setTimeout(() => {
      const clearConfirm =
        locale === 'ur'
          ? 'کیا آپ اس ڈیوائس سے اپنا محفوظ کردہ فارم ڈیٹا صاف کرنا چاہتے ہیں؟'
          : 'WhatsApp opened. Would you like to clear your saved form data from this device?';
      if (window.confirm(clearConfirm)) {
        setFormData({});
        setBadFields(new Set());
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {}
        goToStep(0);
        showToast(locale === 'ur' ? 'ڈیٹا صاف کر دیا گیا ہے' : 'Data cleared from device');
      }
    }, 1200);
  };

  const getMissingFields = () => {
    return STEPS.flatMap((s, i) =>
      s.f
        .filter((f) => f.required && !String(formData[f.key] || '').trim())
        .map((f) => ({ stepIdx: i, key: f.key, name: locale === 'ur' ? f.ur : f.en }))
    );
  };

  const currentStepDef = STEPS[cur];
  const progressPercent = ((cur + 1) / STEPS.length) * 100;
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(buildOutputText())}`;

  return (
    <div className="relative min-h-screen bg-[#0a0908] text-[#f4ecda]">
      {/* Toast Notification */}
      <div
        className={`fixed left-1/2 bottom-6 -translate-x-1/2 z-50 rounded-full bg-gradient-to-r from-[#b88a35] via-[#ecd290] to-[#c9a24b] px-6 py-3 font-semibold text-[#1c1406] shadow-xl text-sm transition-opacity duration-300 pointer-events-none ${
          toastMessage ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {toastMessage}
      </div>

      {/* Hero Header matching profile-form.html */}
      <header className="relative flex min-h-[340px] flex-col items-center justify-center text-center px-4 pt-10 pb-20 bg-gradient-to-b from-[#0a0908]/70 via-[#0a0908]/85 to-[#0a0908]">
        {/* Logo */}
        <div className="relative h-16 w-48 sm:h-20 sm:w-60 mb-2">
          <Image
            src="/images/logo.png"
            alt={SITE_CONFIG.name}
            fill
            priority
            sizes="(max-width: 640px) 240px, 280px"
            className="object-contain drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]"
          />
        </div>

        {/* Tagline */}
        <p className="font-serif italic text-sm text-[#e9dcc0] sm:text-base tracking-wide mt-3 max-w-lg">
          &ldquo;{SITE_CONFIG.tagline}&rdquo;
        </p>

        {/* Circular Flag Row */}
        <div className="mt-4 flex items-center justify-center gap-3" aria-hidden="true">
          <FlagPakistan className="h-8 w-8 drop-shadow-md" />
          <FlagUAE className="h-8 w-8 drop-shadow-md" />
          <FlagUK className="h-8 w-8 drop-shadow-md" />
          <FlagUS className="h-8 w-8 drop-shadow-md" />
          <FlagCanada className="h-8 w-8 drop-shadow-md" />
          <FlagSaudiArabia className="h-8 w-8 drop-shadow-md" />
        </div>

        {/* Big Serif Heading */}
        <h2 className="mt-5 font-serif text-2xl font-normal text-[#f4ecda] sm:text-3xl lg:text-4xl max-w-xl leading-tight">
          Find a match that truly fits your{' '}
          <em className="block font-serif italic text-gold-gradient font-medium not-italic">
            values, lifestyle, and aspirations.
          </em>
        </h2>

        {/* Star Ornament Divider */}
        <div className="mt-5 flex items-center justify-center gap-3 text-[#d4af61]">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4af61]" />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c.6 6.5 5.5 11.4 12 12-6.5.6-11.4 5.5-12 12-.6-6.5-5.5-11.4-12-12C6.5 11.4 11.4 6.5 12 0z" />
          </svg>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4af61]" />
        </div>

        {/* Wave Vector Divider at Bottom */}
        <div className="absolute left-0 right-0 bottom-0 w-full overflow-hidden">
          <SvgWaveDivider />
        </div>
      </header>

      {/* Main Form Content Container */}
      <main className="relative z-10 mx-auto max-w-[720px] px-4 -mt-8 pb-16">
        {/* Horizontal Scrollable Step Tabs */}
        <div
          role="tablist"
          aria-label={locale === 'ur' ? 'فارم کے مراحل' : 'Form Steps'}
          className="flex gap-1 overflow-x-auto pb-3 scrollbar-none"
        >
          {STEPS.map((step, idx) => {
            const isActive = idx === cur;
            const isDone = idx < cur;
            return (
              <button
                key={idx}
                id={`step-tab-${idx}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`step-panel-${idx}`}
                type="button"
                onClick={() => goToStep(idx)}
                className={`shrink-0 border-b-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'border-[#d4af61] text-[#ecd290]'
                    : isDone
                    ? 'border-transparent text-[#d4af61] hover:text-[#ecd290]'
                    : 'border-transparent text-[#a79c82] hover:text-[#f4ecda]'
                }`}
              >
                {idx + 1}. {step.t}
              </button>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="h-0.5 w-full rounded-full bg-white/10 mb-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#b88a35] via-[#ecd290] to-[#c9a24b] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Meta Bar */}
        <div className="flex items-center justify-between text-xs tracking-wide text-[#a79c82] mb-3">
          <span>
            {locale === 'ur' ? `مرحلہ ${cur + 1} از ${STEPS.length}` : `Step ${cur + 1} of ${STEPS.length}`} ·{' '}
            <b className="text-[#ecd290] font-medium">{locale === 'ur' ? currentStepDef.ur : currentStepDef.t}</b>
          </span>
          <span className="text-[11px] text-[#a79c82]">
            {locale === 'ur' ? 'اس ڈیوائس پر محفوظ' : 'Saved on this device'}
          </span>
        </div>

        {/* Keep Ready Note on Step 1 */}
        {cur === 0 && (
          <div className="rounded-r-xl rounded-l border-l-2 border-[#d4af61] bg-[#d4af61]/10 p-3.5 text-xs text-[#cfc4a8] mb-4">
            <b className="text-[#ecd290] font-semibold">Keep ready:</b> date of birth (as on CNIC), education details,
            siblings&apos; details, and complete address. Pictures are sent on WhatsApp later, not uploaded here. Takes about
            10 minutes.
          </div>
        )}

        {/* Glassmorphism Card */}
        <div
          id={`step-panel-${cur}`}
          role="tabpanel"
          aria-labelledby={`step-tab-${cur}`}
          className="rounded-2xl border border-[rgba(201,162,75,0.22)] bg-[#18140f]/80 p-5 sm:p-7 backdrop-blur-md shadow-2xl"
        >
          {/* Step Header */}
          <div className="border-b border-[rgba(201,162,75,0.2)] pb-4 mb-6">
            <h2 className="font-serif text-xl sm:text-2xl font-normal uppercase tracking-widest text-[#ecd290]">
              {currentStepDef.en}
            </h2>
            <span className="block urdu-text text-sm text-[#a79c82] mt-1" dir="rtl">
              {currentStepDef.ur}
            </span>
          </div>

          {/* Form Fields (Steps 1-7) */}
          {cur < 7 ? (
            <div className="space-y-5">
              {currentStepDef.f.map((field) => {
                const isBad = badFields.has(field.key);
                const value = formData[field.key] || '';
                const fieldId = `field-${field.key}`;
                const labelId = `label-${field.key}`;
                const errorId = `error-${field.key}`;
                const hintId = `hint-${field.key}`;

                return (
                  <div key={field.key} className={`space-y-2 ${isBad ? 'field-error' : ''}`}>
                    {/* Label (English on left, Urdu on right) */}
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <label
                        id={labelId}
                        htmlFor={field.type !== 'radio' ? fieldId : undefined}
                        className="text-xs font-medium uppercase tracking-wider text-[#e6dcc3]"
                      >
                        {field.en}
                        {field.required && (
                          <span className="text-[#d4af61] ms-1" aria-hidden="true">
                            *
                          </span>
                        )}
                      </label>
                      <span className="urdu-text text-xs text-[#a79c82]" dir="rtl">
                        {field.ur}
                      </span>
                    </div>

                    {/* Field Input Elements */}
                    {field.type === 'radio' && field.options ? (
                      <div
                        role="radiogroup"
                        aria-labelledby={labelId}
                        aria-describedby={isBad ? errorId : field.hint ? hintId : undefined}
                        className="flex flex-wrap gap-2 pt-1"
                      >
                        {field.options.map((opt) => {
                          const isChecked = value === opt;
                          const optId = `${fieldId}-${opt.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
                          return (
                            <label
                              key={opt}
                              htmlFor={optId}
                              className={`cursor-pointer rounded-full border px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
                                isChecked
                                  ? 'border-transparent bg-gradient-to-r from-[#b88a35] via-[#ecd290] to-[#c9a24b] text-[#1c1406] font-bold shadow-md'
                                  : isBad
                                  ? 'border-[#ff7b7b] bg-[#080706]/60 text-[#f4ecda] hover:border-[#d4af61]'
                                  : 'border-[rgba(201,162,75,0.22)] bg-[#080706]/60 text-[#f4ecda] hover:border-[#d4af61]'
                              }`}
                            >
                              <input
                                id={optId}
                                type="radio"
                                name={field.key}
                                value={opt}
                                checked={isChecked}
                                onChange={(e) => handleInputChange(field.key, e.target.value)}
                                className="sr-only"
                              />
                              <span>{opt}</span>
                            </label>
                          );
                        })}
                      </div>
                    ) : field.type === 'select' && field.options ? (
                      <select
                        id={fieldId}
                        name={field.key}
                        value={value}
                        aria-invalid={isBad}
                        aria-describedby={isBad ? errorId : field.hint ? hintId : undefined}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        className={`w-full rounded-xl border bg-[#080706]/70 px-3.5 py-3 text-sm text-[#f4ecda] transition-all focus:outline-none focus:border-[#d4af61] focus:ring-2 focus:ring-[#d4af61]/20 ${
                          isBad ? 'border-[#ff7b7b]' : 'border-[rgba(201,162,75,0.22)]'
                        }`}
                      >
                        <option value="">{locale === 'ur' ? 'منتخب کریں…' : 'Choose…'}</option>
                        {field.options.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#16130f] text-[#f4ecda]">
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'textarea' ? (
                      <textarea
                        id={fieldId}
                        name={field.key}
                        value={value}
                        aria-invalid={isBad}
                        aria-describedby={isBad ? errorId : field.hint ? hintId : undefined}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        rows={3}
                        className={`w-full rounded-xl border bg-[#080706]/70 px-3.5 py-3 text-sm text-[#f4ecda] transition-all focus:outline-none focus:border-[#d4af61] focus:ring-2 focus:ring-[#d4af61]/20 resize-y ${
                          isBad ? 'border-[#ff7b7b]' : 'border-[rgba(201,162,75,0.22)]'
                        }`}
                      />
                    ) : (
                      <input
                        id={fieldId}
                        type={field.type}
                        name={field.key}
                        value={value}
                        min={field.min}
                        max={field.max}
                        inputMode={
                          field.key === 'age'
                            ? 'numeric'
                            : field.type === 'tel'
                            ? 'tel'
                            : field.type === 'email'
                            ? 'email'
                            : undefined
                        }
                        autoComplete={
                          field.type === 'tel'
                            ? 'tel'
                            : field.type === 'email'
                            ? 'email'
                            : 'off'
                        }
                        aria-invalid={isBad}
                        aria-describedby={isBad ? errorId : field.hint ? hintId : undefined}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        className={`w-full rounded-xl border bg-[#080706]/70 px-3.5 py-3 text-sm text-[#f4ecda] transition-all focus:outline-none focus:border-[#d4af61] focus:ring-2 focus:ring-[#d4af61]/20 ${
                          isBad ? 'border-[#ff7b7b]' : 'border-[rgba(201,162,75,0.22)]'
                        }`}
                      />
                    )}

                    {/* Hint text */}
                    {field.hint && (
                      <p id={hintId} className="text-[11.5px] text-[#a79c82]">
                        {field.hint}
                      </p>
                    )}

                    {/* Validation error message */}
                    {isBad && (
                      <p id={errorId} role="alert" className="text-xs text-[#ff7b7b]">
                        {locale === 'ur' ? 'یہ خانہ پُر کرنا لازمی ہے' : 'This field is required.'}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Step 8: Review & Copy Output */
            <div className="space-y-5">
              {(() => {
                const missing = getMissingFields();
                if (missing.length > 0) {
                  return (
                    <div className="rounded-xl border border-[#ff7b7b]/40 bg-[#ff7b7b]/10 p-4 text-xs text-[#ff7b7b]">
                      <b className="font-semibold">
                        {locale === 'ur' ? 'لازمی معلومات درکار ہیں:' : 'Still required:'}
                      </b>{' '}
                      {missing.map((item, i) => (
                        <span key={item.key}>
                          <button
                            type="button"
                            onClick={() => goToStep(item.stepIdx, item.key)}
                            className="underline hover:text-[#ecd290] transition-colors"
                          >
                            {item.name}
                          </button>
                          {i < missing.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>
                  );
                }
                return (
                  <div className="rounded-xl border border-[#d4af61]/40 bg-[#d4af61]/10 p-3 text-xs text-[#ecd290] flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#d4af61]" />
                    <span>
                      {locale === 'ur'
                        ? 'تمام ضروری خانے مکمل ہو چکے ہیں۔ آپ فارم کاپی کر سکتے ہیں یا واٹس ایپ کھول سکتے ہیں۔'
                        : 'All required fields are completed! You can copy the form or open WhatsApp.'}
                    </span>
                  </div>
                );
              })()}

              <pre className="max-h-[380px] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-[rgba(201,162,75,0.22)] bg-[#080706]/80 p-4 font-mono text-xs leading-relaxed text-[#eadfc4]">
                {buildOutputText()}
              </pre>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="btn-gold w-full text-center text-xs font-semibold py-3 flex items-center justify-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  <span>{locale === 'ur' ? 'فارم کاپی کریں' : 'Copy form'}</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleOpenWhatsApp}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#25d366] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#052e14] shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{locale === 'ur' ? 'واٹس ایپ پر بھیجیں' : 'Open WhatsApp'}</span>
                </a>

                <button
                  type="button"
                  onClick={handleClear}
                  className="rounded-full border border-[rgba(201,162,75,0.25)] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#a79c82] hover:text-[#ff7b7b] hover:border-[#ff7b7b] transition-colors"
                >
                  {locale === 'ur' ? 'ڈیٹا صاف کریں' : 'Clear my data'}
                </button>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-between gap-3 border-t border-[rgba(201,162,75,0.15)] pt-5">
            <button
              type="button"
              onClick={() => goToStep(cur - 1)}
              disabled={cur === 0}
              className={`rounded-full border border-[rgba(201,162,75,0.25)] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#a79c82] transition-colors hover:text-[#ecd290] hover:border-[#d4af61] ${
                cur === 0 ? 'opacity-30 cursor-not-allowed' : ''
              }`}
            >
              {locale === 'ur' ? 'پیچھے' : 'Back'}
            </button>

            {cur < 7 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn-gold text-xs font-semibold px-6 py-2.5 shadow-md"
              >
                {locale === 'ur' ? `اگلا: ${STEPS[cur + 1].ur}` : `Next: ${STEPS[cur + 1].t}`}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleClear}
                className="rounded-full border border-[rgba(201,162,75,0.25)] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#a79c82] hover:text-[#ff7b7b] hover:border-[#ff7b7b] transition-colors"
              >
                {locale === 'ur' ? 'فارم صاف کریں' : 'Clear form'}
              </button>
            )}
          </div>

          {cur < 7 && (
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-[#a79c82]/70 hover:text-[#ff7b7b] transition-colors underline"
              >
                {locale === 'ur' ? 'محفوظ ڈیٹا صاف کریں' : 'Clear saved data'}
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer Section matching profile-form.html */}
      <footer className="mx-auto max-w-[720px] px-4 pb-16 text-center text-xs text-[#a79c82]">
        {/* Star Ornament Divider */}
        <div className="flex items-center justify-center gap-3 text-[#d4af61] mb-6">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#d4af61]" />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c.6 6.5 5.5 11.4 12 12-6.5.6-11.4 5.5-12 12-.6-6.5-5.5-11.4-12-12C6.5 11.4 11.4 6.5 12 0z" />
          </svg>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#d4af61]" />
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 uppercase tracking-widest text-[#e6dcc3] mb-8">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-[#d4af61]" />
            <span>Trusted</span>
          </div>
          <div className="h-4 w-px bg-[rgba(201,162,75,0.25)]" />
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#d4af61]" />
            <span>Verified</span>
          </div>
          <div className="h-4 w-px bg-[rgba(201,162,75,0.25)]" />
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-[#d4af61]" />
            <span>Professional</span>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="mx-auto max-w-sm space-y-3 text-start mb-8">
          <a
            href={SITE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 text-[#f4ecda] hover:text-[#ecd290] transition-colors"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(201,162,75,0.25)] bg-[#d4af61]/10 text-[#d4af61]">
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <span className="font-serif text-lg font-medium tracking-wide">
                <bdi dir="ltr">{SITE_CONFIG.phone}</bdi>
              </span>
              <small className="block text-[10px] uppercase tracking-widest text-[#a79c82]">WhatsApp | Calls</small>
            </div>
          </a>

          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="flex items-center gap-3.5 text-sm text-[#f4ecda] hover:text-[#ecd290] transition-colors"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(201,162,75,0.25)] bg-[#d4af61]/10 text-[#d4af61]">
              <Mail className="h-4 w-4" />
            </div>
            <span>{SITE_CONFIG.email}</span>
          </a>

          <a
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 text-sm text-[#f4ecda] hover:text-[#ecd290] transition-colors"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(201,162,75,0.25)] bg-[#d4af61]/10 text-[#d4af61]">
              <Instagram className="h-4 w-4" />
            </div>
            <span>{SITE_CONFIG.instagramHandle}</span>
          </a>

          {SITE_CONFIG.facebookUrl ? (
            <a
              href={SITE_CONFIG.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Aura Marriage Bureau on Facebook"
              className="flex items-center gap-3.5 text-sm text-[#f4ecda] hover:text-[#ecd290] transition-colors"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(201,162,75,0.25)] bg-[#d4af61]/10 text-[#d4af61]">
                <Facebook className="h-4 w-4" />
              </div>
              <span>{SITE_CONFIG.facebookName}</span>
            </a>
          ) : null}
        </div>

        {/* Services Line */}
        <div className="flex items-center gap-3 text-[10.5px] uppercase tracking-[0.2em] text-[#ecd290]">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[rgba(201,162,75,0.22)]" />
          <span>{SITE_CONFIG.footerLine}</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[rgba(201,162,75,0.22)]" />
        </div>
      </footer>
    </div>
  );
};
