'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useFormStore, initialFormData } from '@/lib/form-store';
import { generateWhatsAppProfileText } from '@/lib/form-format';
import { validateForm, FormError } from '@/lib/form-validation';
import { SITE_CONFIG } from '@/lib/config';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  AlertCircle,
  HelpCircle,
  Trash2,
  ExternalLink,
  Plus,
  X,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

const STEP_NAMES = [
  { en: "Basic", ur: "بنیادی" },
  { en: "Education", ur: "تعلیم" },
  { en: "Job", ur: "پیشہ" },
  { en: "Family", ur: "خاندان" },
  { en: "Residence", ur: "رہائش" },
  { en: "Contact", ur: "رابطہ" },
  { en: "Requirements", ur: "مطلوبہ رشتہ" },
  { en: "Review", ur: "جائزہ" },
];

export const ProfileWizard = () => {
  const locale = useLocale();
  const isUrdu = locale === 'ur';
  const prefix = isUrdu ? '/ur' : '';

  const {
    data,
    currentStep,
    updateField,
    updateNestedEducation,
    addEducation,
    removeEducation,
    updateNestedJob,
    addJob,
    removeJob,
    setStep,
    resetForm,
  } = useFormStore();

  const [stepErrors, setStepErrors] = useState<FormError[]>([]);
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const [copyFallbackText, setCopyFallbackText] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showTips, setShowTips] = useState(false);

  // Auto calculate age from date of birth
  useEffect(() => {
    if (data.dob) {
      const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(data.dob);
      if (match) {
        const year = +match[1];
        const month = +match[2];
        const day = +match[3];
        const now = new Date();
        let calcAge = now.getFullYear() - year;
        if (
          now.getMonth() + 1 < month ||
          (now.getMonth() + 1 === month && now.getDate() < day)
        ) {
          calcAge--;
        }
        if (calcAge > 0 && calcAge < 100) {
          updateField('age', String(calcAge));
        }
      }
    }
  }, [data.dob, updateField]);

  // Handle Step Navigation with Validation
  const handleNext = () => {
    const errors = validateForm(data, currentStep);
    setStepErrors(errors);

    if (errors.length > 0) {
      // Focus first error field
      const firstErr = errors[0];
      const el = document.getElementById(`field-${firstErr.id}`);
      el?.focus();
      return;
    }

    if (currentStep < 7) {
      setStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setStep(currentStep - 1);
      setStepErrors([]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Copy to Clipboard logic with safe textarea fallback
  const handleCopyForm = async () => {
    const errors = validateForm(data);
    if (errors.length > 0) {
      setStepErrors(errors);
      const firstErr = errors[0];
      setStep(firstErr.step);
      setTimeout(() => {
        document.getElementById(`field-${firstErr.id}`)?.focus();
      }, 100);
      return;
    }

    const text = generateWhatsAppProfileText(data);
    let successful = false;

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        successful = true;
      }
    } catch {
      successful = false;
    }

    if (!successful) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        successful = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch {
        successful = false;
      }
    }

    if (successful) {
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 5000);
    } else {
      setCopyFallbackText(text);
    }
  };

  // Open WhatsApp with length check
  const handleOpenWhatsApp = () => {
    const text = generateWhatsAppProfileText(data);
    const encoded = encodeURIComponent(text);
    // WhatsApp URL length limit check ~2000 chars
    if (encoded.length < 2000) {
      window.open(`${SITE_CONFIG.whatsappUrl}?text=${encoded}`, '_blank');
    } else {
      // Fallback: copy and open wa.me without prefill
      handleCopyForm();
      alert(
        isUrdu
          ? "فارم کاپی ہو گیا ہے۔ براہِ کرم واٹس ایپ کھول کر میسج باکس میں پیسٹ کریں۔"
          : "Form text copied! WhatsApp will open without prefilled text due to message length. Please paste directly into the chat."
      );
      window.open(SITE_CONFIG.whatsappUrl, '_blank');
    }
  };

  const currentErrorMap = stepErrors.reduce<Record<string, string>>((acc, err) => {
    acc[err.id] = isUrdu ? err.msg.ur : err.msg.en;
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 pb-28">
      {/* Top Stepper with Progress Bar */}
      <div className="sticky top-16 z-30 -mx-4 border-b border-[rgba(201,162,75,0.2)] bg-[#0a0908]/95 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-2xl sm:border sm:px-6">
        <div className="flex items-center justify-between text-xs text-[#ecd290]">
          <span className="font-semibold">
            {isUrdu
              ? `مرحلہ ${currentStep + 1} از 8 · ${STEP_NAMES[currentStep].ur}`
              : `Step ${currentStep + 1} of 8 · ${STEP_NAMES[currentStep].en}`}
          </span>
          <span className="flex items-center gap-1.5 text-[#a79c82] text-[11px]">
            <Check className="h-3.5 w-3.5 text-emerald-500" />
            {isUrdu ? "ڈیوائس پر محفوظ" : "Saved on this device"}
          </span>
        </div>

        {/* Progress Line */}
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/60 border border-[rgba(201,162,75,0.2)]">
          <div
            className="h-full bg-gradient-to-r from-[#b88a35] via-[#ecd290] to-[#c9a24b] transition-all duration-300"
            style={{ width: `${((currentStep + 1) / 8) * 100}%` }}
          />
        </div>

        {/* Stepper Pills Navigation (Scrollable horizontally) */}
        <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {STEP_NAMES.map((st, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setStep(i);
                setStepErrors([]);
              }}
              className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
                currentStep === i
                  ? "bg-[#d4af61] text-black font-bold"
                  : "bg-[#16130f] text-[#a79c82] hover:text-[#f4ecda]"
              }`}
            >
              {i + 1}. {isUrdu ? st.ur : st.en}
            </button>
          ))}
        </div>
      </div>

      {/* Collapsible "Keep Ready" Tips Box */}
      <div className="mt-4 rounded-xl border border-[rgba(201,162,75,0.2)] bg-[#16130f]/70 p-3.5 text-xs text-[#a79c82]">
        <button
          type="button"
          onClick={() => setShowTips(!showTips)}
          className="flex w-full items-center justify-between font-semibold text-[#ecd290]"
        >
          <span className="flex items-center gap-1.5">
            <HelpCircle className="h-4 w-4 text-[#d4af61]" />
            {isUrdu ? "فارم بھرنے کے لیے اہم رہنمائی" : "Helpful Tips & Readiness"}
          </span>
          <span>{showTips ? "−" : "+"}</span>
        </button>
        {showTips && (
          <p className="mt-2 text-[#f4ecda]/80 leading-relaxed border-t border-[rgba(201,162,75,0.1)] pt-2">
            {isUrdu
              ? "شناختی کارڈ کے مطابق تاریخ پیدائش، تعلیم کی اسناد، بہن بھائیوں کی تفصیلات اور رہائشی پتہ پیشگی دیکھ لیں۔ تصاویر بعد میں واٹس ایپ پر بھیجی جاتی ہیں۔ یہ فارم تقریباً 10 منٹ لیتا ہے۔"
              : "Keep ready: Date of birth as per CNIC, educational qualifications, siblings' occupation, and residential address. Photos are sent later via WhatsApp. Takes approximately 10 minutes."}
          </p>
        )}
      </div>

      {/* Step Form Screens */}
      <div className="mt-6 rounded-2xl border border-[rgba(201,162,75,0.22)] bg-[#16130f] p-5 sm:p-7 shadow-xl">
        {/* STEP 0: BASIC INFORMATION */}
        {currentStep === 0 && (
          <div className="space-y-5">
            <h2 className="font-serif text-xl font-bold text-[#f4ecda] sm:text-2xl border-b border-[rgba(201,162,75,0.15)] pb-3">
              {isUrdu ? "بنیادی معلومات" : "Basic Information"}
            </h2>

            {/* Candidate Name (Optional per rules) */}
            <div>
              <label htmlFor="field-name" className="block text-xs font-semibold text-[#ecd290] mb-1">
                {isUrdu ? "امیدوار کا نام (اختیاری)" : "Candidate Name (Optional)"}
              </label>
              <input
                id="field-name"
                type="text"
                value={data.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder={isUrdu ? "مثلاً عائشہ خان" : "e.g. Ayesha Khan"}
                className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-3 text-base text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
              />
              <p className="mt-1 text-[11px] text-[#a79c82]">
                {isUrdu ? "صرف بیورو کے پاس رہتا ہے، عوامی طور پر کبھی ظاہر نہیں ہوتا۔" : "Confidential: Kept with the bureau only, never posted publicly."}
              </p>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-semibold text-[#ecd290] mb-2">
                {isUrdu ? "جنس *" : "Gender *"}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["Male", "Female"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => updateField('gender', g)}
                    className={`min-h-[48px] rounded-xl border py-2.5 text-sm font-medium transition ${
                      data.gender === g
                        ? "border-[#d4af61] bg-[#d4af61]/20 text-[#ecd290] font-bold"
                        : "border-[rgba(201,162,75,0.2)] bg-black/40 text-[#f4ecda]"
                    }`}
                  >
                    {g === "Male" ? (isUrdu ? "لڑکا (Male)" : "Male") : (isUrdu ? "لڑکی (Female)" : "Female")}
                  </button>
                ))}
              </div>
              {currentErrorMap.gender && (
                <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {currentErrorMap.gender}
                </p>
              )}
            </div>

            {/* Date of Birth & Age */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="field-dob" className="block text-xs font-semibold text-[#ecd290] mb-1">
                  {isUrdu ? "تاریخِ پیدائش (شناختی کارڈ کے مطابق)" : "Date of Birth (CNIC)"}
                </label>
                <input
                  id="field-dob"
                  type="date"
                  value={data.dob}
                  onChange={(e) => updateField('dob', e.target.value)}
                  className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-3 text-base text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="field-age" className="block text-xs font-semibold text-[#ecd290] mb-1">
                  {isUrdu ? "عمر *" : "Age *"}
                </label>
                <input
                  id="field-age"
                  type="text"
                  inputMode="numeric"
                  value={data.age}
                  onChange={(e) => updateField('age', e.target.value)}
                  placeholder="e.g. 26"
                  className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-3 text-base text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                />
                {currentErrorMap.age && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {currentErrorMap.age}
                  </p>
                )}
              </div>
            </div>

            {/* Height */}
            <div>
              <label htmlFor="field-height" className="block text-xs font-semibold text-[#ecd290] mb-1">
                {isUrdu ? "قد *" : "Height *"}
              </label>
              <select
                id="field-height"
                value={data.height}
                onChange={(e) => updateField('height', e.target.value)}
                className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-3 text-base text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
              >
                <option value="">{isUrdu ? "قد منتخب کریں…" : "Select height…"}</option>
                {Array.from({ length: 31 }, (_, i) => 54 + i).map((inch) => {
                  const ft = Math.floor(inch / 12);
                  const inRemainder = inch % 12;
                  const label = `${ft}'${inRemainder}"`;
                  return (
                    <option key={inch} value={String(inch)}>
                      {label}
                    </option>
                  );
                })}
              </select>
              {currentErrorMap.height && (
                <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {currentErrorMap.height}
                </p>
              )}
            </div>

            {/* Father's Caste & Mother's Caste */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="field-fatherCaste" className="block text-xs font-semibold text-[#ecd290] mb-1">
                  {isUrdu ? "والد کی ذات *" : "Father's Caste *"}
                </label>
                <input
                  id="field-fatherCaste"
                  type="text"
                  value={data.fatherCaste}
                  onChange={(e) => updateField('fatherCaste', e.target.value)}
                  placeholder={isUrdu ? "مثلاً آرائیں، راجپوت، شیخ" : "e.g. Arain, Rajput, Sheikh"}
                  className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-3 text-base text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                />
                {currentErrorMap.fatherCaste && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {currentErrorMap.fatherCaste}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="field-motherCaste" className="block text-xs font-semibold text-[#ecd290] mb-1">
                  {isUrdu ? "والدہ کی ذات (اختیاری)" : "Mother's Caste (Optional)"}
                </label>
                <input
                  id="field-motherCaste"
                  type="text"
                  value={data.motherCaste}
                  onChange={(e) => updateField('motherCaste', e.target.value)}
                  placeholder={isUrdu ? "مثلاً جٹ، مغل" : "e.g. Jatt, Mughal"}
                  className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-3 text-base text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                />
              </div>
            </div>

            {/* Marital Status */}
            <div>
              <label className="block text-xs font-semibold text-[#ecd290] mb-2">
                {isUrdu ? "ازدواجی حیثیت *" : "Marital Status *"}
              </label>
              <div className="flex flex-wrap gap-2">
                {["Unmarried", "Divorced", "Khula", "Widow", "Widower"].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => updateField('marital', m)}
                    className={`min-h-[44px] rounded-xl border px-4 py-2 text-xs font-medium transition ${
                      data.marital === m
                        ? "border-[#d4af61] bg-[#d4af61]/20 text-[#ecd290] font-bold"
                        : "border-[rgba(201,162,75,0.2)] bg-black/40 text-[#f4ecda]"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              {currentErrorMap.marital && (
                <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {currentErrorMap.marital}
                </p>
              )}
            </div>

            {/* Divorce reason / Kids if applicable */}
            {["Divorced", "Khula", "Widow", "Widower"].includes(data.marital) && (
              <div className="space-y-4 rounded-xl border border-[rgba(201,162,75,0.2)] bg-black/30 p-4">
                {["Divorced", "Khula"].includes(data.marital) && (
                  <div>
                    <label htmlFor="field-divorceReason" className="block text-xs font-semibold text-[#ecd290] mb-1">
                      {isUrdu ? "طلاق یا خلع کی وجہ (مختصر)" : "Reason of Divorce / Khula"}
                    </label>
                    <input
                      id="field-divorceReason"
                      type="text"
                      value={data.divorceReason}
                      onChange={(e) => updateField('divorceReason', e.target.value)}
                      placeholder={isUrdu ? "ایک سطر کافی ہے" : "A short line is enough"}
                      className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-3 text-base text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                    />
                  </div>
                )}
                <div>
                  <label htmlFor="field-kids" className="block text-xs font-semibold text-[#ecd290] mb-1">
                    {isUrdu ? "بچوں کی تفصیل" : "Kids Details"}
                  </label>
                  <input
                    id="field-kids"
                    type="text"
                    value={data.kids}
                    onChange={(e) => updateField('kids', e.target.value)}
                    placeholder={isUrdu ? "مثلاً کوئی بچہ نہیں، یا 1 بیٹی والدہ کے ساتھ" : "e.g. None, or 1 daughter with mother"}
                    className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-3 text-base text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Religion / Sect */}
            <div>
              <label className="block text-xs font-semibold text-[#ecd290] mb-2">
                {isUrdu ? "مذہب / فرقہ / مسلک *" : "Religion / Sect *"}
              </label>
              <div className="flex flex-wrap gap-2">
                {["Sunni", "Shia (Ahl-e-Tashee)", "Other"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => updateField('sect', s)}
                    className={`min-h-[44px] rounded-xl border px-4 py-2 text-xs font-medium transition ${
                      data.sect === s
                        ? "border-[#d4af61] bg-[#d4af61]/20 text-[#ecd290] font-bold"
                        : "border-[rgba(201,162,75,0.2)] bg-black/40 text-[#f4ecda]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {data.sect === "Other" && (
                <input
                  type="text"
                  value={data.sectOther}
                  onChange={(e) => updateField('sectOther', e.target.value)}
                  placeholder={isUrdu ? "براہِ کرم فرقہ لکھیں" : "Please specify sect"}
                  className="mt-2 w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-2 text-sm text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                />
              )}
              {currentErrorMap.sect && (
                <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {currentErrorMap.sect}
                </p>
              )}
            </div>

            {/* Disability / Medical Condition */}
            <div>
              <label className="block text-xs font-semibold text-[#ecd290] mb-2">
                {isUrdu ? "کوئی معذوری یا مستقل بیماری *" : "Any Disability / Disease *"}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["No", "Yes"].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => updateField('disability', val)}
                    className={`min-h-[44px] rounded-xl border py-2 text-xs font-medium transition ${
                      data.disability === val
                        ? "border-[#d4af61] bg-[#d4af61]/20 text-[#ecd290] font-bold"
                        : "border-[rgba(201,162,75,0.2)] bg-black/40 text-[#f4ecda]"
                    }`}
                  >
                    {val === "No" ? (isUrdu ? "نہیں (No)" : "No") : (isUrdu ? "جی ہاں (Yes)" : "Yes")}
                  </button>
                ))}
              </div>
              {data.disability === "Yes" && (
                <input
                  type="text"
                  value={data.disabilityDetail}
                  onChange={(e) => updateField('disabilityDetail', e.target.value)}
                  placeholder={isUrdu ? "براہِ کرم مختصر تفصیل بتائیں" : "Please describe details"}
                  className="mt-2 w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-2 text-sm text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                />
              )}
            </div>
          </div>
        )}

        {/* STEP 1: EDUCATION */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-[rgba(201,162,75,0.15)] pb-3">
              <h2 className="font-serif text-xl font-bold text-[#f4ecda] sm:text-2xl">
                {isUrdu ? "تعلیمی تفصیلات" : "Education Details"}
              </h2>
              <button
                type="button"
                onClick={addEducation}
                className="btn-line inline-flex items-center gap-1.5 text-xs py-1.5 px-3"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>{isUrdu ? "مزید ڈگری شامل کریں" : "Add degree"}</span>
              </button>
            </div>

            {data.education.map((edu, idx) => (
              <div key={idx} className="relative rounded-xl border border-[rgba(201,162,75,0.2)] bg-black/30 p-4 space-y-3">
                {idx > 0 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(idx)}
                    className="absolute top-3 end-3 text-[#a79c82] hover:text-rose-400"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <div>
                  <label htmlFor={`field-edu-${idx}-degree`} className="block text-xs font-semibold text-[#ecd290] mb-1">
                    {idx === 0
                      ? (isUrdu ? "اعلیٰ ترین ڈگری *" : "Highest Degree *")
                      : (isUrdu ? "ڈگری" : "Degree")}
                  </label>
                  <input
                    id={`field-edu-${idx}-degree`}
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateNestedEducation(idx, 'degree', e.target.value)}
                    placeholder={isUrdu ? "مثلاً ایم بی بی ایس، بی ایس کمپیوٹر سائنس" : "e.g. MBBS, BS Software Engineering"}
                    className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-3 text-base text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                  />
                  {idx === 0 && currentErrorMap['edu-0-degree'] && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {currentErrorMap['edu-0-degree']}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#ecd290] mb-1">
                      {isUrdu ? "تعلیمی ادارہ" : "Institute / University"}
                    </label>
                    <input
                      type="text"
                      value={edu.institute}
                      onChange={(e) => updateNestedEducation(idx, 'institute', e.target.value)}
                      placeholder={isUrdu ? "مثلاً پنجاب یونیورسٹی" : "e.g. Punjab University"}
                      className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-2.5 text-sm text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#ecd290] mb-1">
                      {isUrdu ? "سال / موجودہ حیثیت" : "Passing Year / Status"}
                    </label>
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) => updateNestedEducation(idx, 'year', e.target.value)}
                      placeholder="e.g. 2022"
                      className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-2.5 text-sm text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STEP 2: JOB / PROFESSION */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <h2 className="font-serif text-xl font-bold text-[#f4ecda] sm:text-2xl border-b border-[rgba(201,162,75,0.15)] pb-3">
              {isUrdu ? "ملازمت اور پیشہ" : "Job & Profession"}
            </h2>

            <div>
              <label className="block text-xs font-semibold text-[#ecd290] mb-2">
                {isUrdu ? "پیشہ کی قسم *" : "Employment Status *"}
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {["Job", "Business", "Not working", "Student"].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => updateField('jobStatus', st)}
                    className={`min-h-[44px] rounded-xl border px-3 py-2 text-xs font-medium transition ${
                      data.jobStatus === st
                        ? "border-[#d4af61] bg-[#d4af61]/20 text-[#ecd290] font-bold"
                        : "border-[rgba(201,162,75,0.2)] bg-black/40 text-[#f4ecda]"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
              {currentErrorMap.jobStatus && (
                <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {currentErrorMap.jobStatus}
                </p>
              )}
            </div>

            {(data.jobStatus === "Job" || data.jobStatus === "Business") && (
              <div className="space-y-4">
                {data.jobs.map((job, idx) => (
                  <div key={idx} className="rounded-xl border border-[rgba(201,162,75,0.2)] bg-black/30 p-4 space-y-3">
                    <div>
                      <label htmlFor={`field-job-${idx}-title`} className="block text-xs font-semibold text-[#ecd290] mb-1">
                        {data.jobStatus === "Job"
                          ? (isUrdu ? "عہدہ / ڈیزگنیشن *" : "Job Title / Designation *")
                          : (isUrdu ? "کاروبار کی نوعیت *" : "Business Nature *")}
                      </label>
                      <input
                        id={`field-job-${idx}-title`}
                        type="text"
                        value={job.title}
                        onChange={(e) => updateNestedJob(idx, 'title', e.target.value)}
                        placeholder={
                          data.jobStatus === "Job"
                            ? (isUrdu ? "مثلاً سینئر سافٹ ویئر انجینئر" : "e.g. Senior Software Engineer")
                            : (isUrdu ? "مثلاً ٹیکسٹائل ہول سیل کاروبار" : "e.g. Textile Wholesale Business")
                        }
                        className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-3 text-base text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                      />
                      {idx === 0 && currentErrorMap['job-0-title'] && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {currentErrorMap['job-0-title']}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-[#ecd290] mb-1">
                          {isUrdu ? "ادارہ اور شہر" : "Company & City"}
                        </label>
                        <input
                          type="text"
                          value={job.org}
                          onChange={(e) => updateNestedJob(idx, 'org', e.target.value)}
                          placeholder="e.g. Private MNC, Lahore"
                          className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-2.5 text-sm text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#ecd290] mb-1">
                          {isUrdu ? "ماہانہ آمدن (اختیاری)" : "Monthly Income (Optional)"}
                        </label>
                        <input
                          type="text"
                          value={job.income}
                          onChange={(e) => updateNestedJob(idx, 'income', e.target.value)}
                          placeholder="e.g. 2 Lac"
                          className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-2.5 text-sm text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 3: FAMILY DETAILS */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <h2 className="font-serif text-xl font-bold text-[#f4ecda] sm:text-2xl border-b border-[rgba(201,162,75,0.15)] pb-3">
              {isUrdu ? "خاندان کی تفصیلات" : "Family Details"}
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="field-father" className="block text-xs font-semibold text-[#ecd290] mb-1">
                  {isUrdu ? "والد صاحب کا پیشہ / حیثیت *" : "Father's Occupation / Status *"}
                </label>
                <input
                  id="field-father"
                  type="text"
                  value={data.father}
                  onChange={(e) => updateField('father', e.target.value)}
                  placeholder={isUrdu ? "مثلاً ریٹائرڈ سرکاری افسر، یا مرحوم" : "e.g. Businessman, or Late"}
                  className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-3 text-base text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                />
                {currentErrorMap.father && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {currentErrorMap.father}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="field-mother" className="block text-xs font-semibold text-[#ecd290] mb-1">
                  {isUrdu ? "والدہ محترمہ کا پیشہ / حیثیت" : "Mother's Status / Occupation"}
                </label>
                <input
                  id="field-mother"
                  type="text"
                  value={data.mother}
                  onChange={(e) => updateField('mother', e.target.value)}
                  placeholder={isUrdu ? "مثلاً ہاؤس وائف، یا ٹیچر" : "e.g. Housewife, or School Principal"}
                  className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-3 text-base text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                />
              </div>
            </div>

            {/* Brothers */}
            <div className="rounded-xl border border-[rgba(201,162,75,0.2)] bg-black/30 p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="field-brothers" className="block text-xs font-semibold text-[#ecd290] mb-1">
                    {isUrdu ? "بھائیوں کی کل تعداد" : "Total Brothers"}
                  </label>
                  <input
                    id="field-brothers"
                    type="text"
                    inputMode="numeric"
                    value={data.brothers}
                    onChange={(e) => updateField('brothers', e.target.value)}
                    placeholder="0"
                    className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-2.5 text-base text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="field-brothersMarried" className="block text-xs font-semibold text-[#ecd290] mb-1">
                    {isUrdu ? "شادی شدہ بھائی" : "Married Brothers"}
                  </label>
                  <input
                    id="field-brothersMarried"
                    type="text"
                    inputMode="numeric"
                    value={data.brothersMarried}
                    onChange={(e) => updateField('brothersMarried', e.target.value)}
                    placeholder="0"
                    className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-2.5 text-base text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                  />
                </div>
              </div>
              <input
                type="text"
                value={data.brothersDetail}
                onChange={(e) => updateField('brothersDetail', e.target.value)}
                placeholder={isUrdu ? "بھائیوں کی تعلیم اور پیشہ، مثلاً 1 انجینئر دبئی میں" : "Brothers' profession & education"}
                className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-2.5 text-sm text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
              />
            </div>

            {/* Sisters */}
            <div className="rounded-xl border border-[rgba(201,162,75,0.2)] bg-black/30 p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="field-sisters" className="block text-xs font-semibold text-[#ecd290] mb-1">
                    {isUrdu ? "بہنوں کی کل تعداد" : "Total Sisters"}
                  </label>
                  <input
                    id="field-sisters"
                    type="text"
                    inputMode="numeric"
                    value={data.sisters}
                    onChange={(e) => updateField('sisters', e.target.value)}
                    placeholder="0"
                    className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-2.5 text-base text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="field-sistersMarried" className="block text-xs font-semibold text-[#ecd290] mb-1">
                    {isUrdu ? "شادی شدہ بہنیں" : "Married Sisters"}
                  </label>
                  <input
                    id="field-sistersMarried"
                    type="text"
                    inputMode="numeric"
                    value={data.sistersMarried}
                    onChange={(e) => updateField('sistersMarried', e.target.value)}
                    placeholder="0"
                    className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-2.5 text-base text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                  />
                </div>
              </div>
              <input
                type="text"
                value={data.sistersDetail}
                onChange={(e) => updateField('sistersDetail', e.target.value)}
                placeholder={isUrdu ? "بہنوں کی تعلیم اور پیشہ، مثلاً 1 ڈاکٹر (شادی شدہ)" : "Sisters' profession & education"}
                className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-2.5 text-sm text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* STEP 4: RESIDENTIAL STATUS */}
        {currentStep === 4 && (
          <div className="space-y-5">
            <h2 className="font-serif text-xl font-bold text-[#f4ecda] sm:text-2xl border-b border-[rgba(201,162,75,0.15)] pb-3">
              {isUrdu ? "رہائش کی تفصیل" : "Residential Status"}
            </h2>

            {/* House Type */}
            <div>
              <label className="block text-xs font-semibold text-[#ecd290] mb-2">
                {isUrdu ? "گھر کی ملکیت *" : "House Type *"}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["Own", "Rented"].map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => updateField('houseType', h)}
                    className={`min-h-[44px] rounded-xl border py-2.5 text-xs font-medium transition ${
                      data.houseType === h
                        ? "border-[#d4af61] bg-[#d4af61]/20 text-[#ecd290] font-bold"
                        : "border-[rgba(201,162,75,0.2)] bg-black/40 text-[#f4ecda]"
                    }`}
                  >
                    {h === "Own" ? (isUrdu ? "ذاتی مکان (Own)" : "Own House") : (isUrdu ? "کرایہ کا مکان (Rented)" : "Rented House")}
                  </button>
                ))}
              </div>
            </div>

            {/* House Size & Unit */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="field-houseSize" className="block text-xs font-semibold text-[#ecd290] mb-1">
                  {isUrdu ? "مکان کا سائز *" : "House Size *"}
                </label>
                <input
                  id="field-houseSize"
                  type="text"
                  value={data.houseSize}
                  onChange={(e) => updateField('houseSize', e.target.value)}
                  placeholder="e.g. 10"
                  className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-3 text-base text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="field-houseUnit" className="block text-xs font-semibold text-[#ecd290] mb-1">
                  {isUrdu ? "اکائی (مرلہ / کنال)" : "Unit"}
                </label>
                <select
                  id="field-houseUnit"
                  value={data.houseUnit}
                  onChange={(e) => updateField('houseUnit', e.target.value)}
                  className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-3 text-base text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                >
                  <option value="Marla">Marla</option>
                  <option value="Kanal">Kanal</option>
                  <option value="Sq Yards">Sq Yards</option>
                  <option value="Flat / Apartment">Flat / Apartment</option>
                </select>
              </div>
            </div>

            {/* Area & City */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="field-houseArea" className="block text-xs font-semibold text-[#ecd290] mb-1">
                  {isUrdu ? "علاقہ / ٹاؤن *" : "Area / Sector *"}
                </label>
                <input
                  id="field-houseArea"
                  type="text"
                  value={data.houseArea}
                  onChange={(e) => updateField('houseArea', e.target.value)}
                  placeholder={isUrdu ? "مثلاً جوہر ٹاؤن، ڈی ایچ اے" : "e.g. Johar Town, DHA"}
                  className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-3 text-base text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="field-city" className="block text-xs font-semibold text-[#ecd290] mb-1">
                  {isUrdu ? "موجودہ رہائشی شہر *" : "City *"}
                </label>
                <input
                  id="field-city"
                  type="text"
                  value={data.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  placeholder={isUrdu ? "مثلاً لاہور" : "e.g. Lahore"}
                  className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-3 text-base text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                />
              </div>
            </div>

            {/* Complete Address (Confidential) */}
            <div>
              <label htmlFor="field-address" className="block text-xs font-semibold text-[#ecd290] mb-1">
                {isUrdu ? "مکمل پتہ (صرف بیورو کے ریکارڈ کے لیے)" : "Complete Address (Private)"}
              </label>
              <textarea
                id="field-address"
                rows={2}
                value={data.address}
                onChange={(e) => updateField('address', e.target.value)}
                placeholder={isUrdu ? "مکان نمبر، گلی، بلاک، علاقہ" : "House no, Street, Block, Area"}
                className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-2.5 text-base text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* STEP 5: CONTACT DETAILS */}
        {currentStep === 5 && (
          <div className="space-y-5">
            <h2 className="font-serif text-xl font-bold text-[#f4ecda] sm:text-2xl border-b border-[rgba(201,162,75,0.15)] pb-3">
              {isUrdu ? "رابطہ کی تفصیلات" : "Contact Details"}
            </h2>

            {/* Parents / Guardian Contact Number (Required) */}
            <div>
              <label htmlFor="field-guardianContact" className="block text-xs font-semibold text-[#ecd290] mb-1">
                {isUrdu ? "والدین یا سرپرست کا فون نمبر *" : "Parents / Guardian Contact Number *"}
              </label>
              <input
                id="field-guardianContact"
                type="tel"
                inputMode="tel"
                value={data.guardianContact}
                onChange={(e) => updateField('guardianContact', e.target.value)}
                placeholder="0300 1234567"
                className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-3 text-base text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
              />
              <p className="mt-1 text-[11px] text-[#a79c82]">
                {isUrdu ? "رشتے کے تمام معاملات والدین یا سرپرست کی وساطت سے طے ہوتے ہیں۔" : "Proposals are facilitated directly with parents or elder guardians."}
              </p>
              {currentErrorMap.guardianContact && (
                <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {currentErrorMap.guardianContact}
                </p>
              )}
            </div>

            {/* Candidate Contact */}
            <div>
              <label htmlFor="field-contact" className="block text-xs font-semibold text-[#ecd290] mb-1">
                {isUrdu ? "امیدوار کا ذاتی موبائل نمبر (اختیاری)" : "Candidate Contact Number (Optional)"}
              </label>
              <input
                id="field-contact"
                type="tel"
                inputMode="tel"
                value={data.contact}
                onChange={(e) => updateField('contact', e.target.value)}
                placeholder="0321 9876543"
                className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-3 text-base text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
              />
            </div>

            {/* WhatsApp Number */}
            <div className="rounded-xl border border-[rgba(201,162,75,0.2)] bg-black/30 p-4 space-y-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#f4ecda]">
                <input
                  type="checkbox"
                  checked={data.whatsappSame}
                  onChange={(e) => updateField('whatsappSame', e.target.checked)}
                  className="rounded border-[#d4af61] text-[#d4af61] focus:ring-0"
                />
                <span>{isUrdu ? "واٹس ایپ نمبر ذاتی رابطہ نمبر جیسا ہی ہے" : "WhatsApp number is same as contact number"}</span>
              </label>

              {!data.whatsappSame && (
                <div>
                  <label htmlFor="field-whatsapp" className="block text-xs font-semibold text-[#ecd290] mb-1">
                    {isUrdu ? "متبادل واٹس ایپ نمبر" : "Dedicated WhatsApp Number"}
                  </label>
                  <input
                    id="field-whatsapp"
                    type="tel"
                    inputMode="tel"
                    value={data.whatsapp}
                    onChange={(e) => updateField('whatsapp', e.target.value)}
                    placeholder="0300 1234567"
                    className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-2.5 text-sm text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 6: REQUIREMENTS */}
        {currentStep === 6 && (
          <div className="space-y-5">
            <h2 className="font-serif text-xl font-bold text-[#f4ecda] sm:text-2xl border-b border-[rgba(201,162,75,0.15)] pb-3">
              {isUrdu ? "مطلوبہ رشتہ کی شرائط" : "Partner Requirements"}
            </h2>

            {/* Age Range */}
            <div>
              <label className="block text-xs font-semibold text-[#ecd290] mb-1">
                {isUrdu ? "مطلوبہ عمر کی حد *" : "Desired Age Range *"}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  inputMode="numeric"
                  value={data.reqAgeFrom}
                  onChange={(e) => updateField('reqAgeFrom', e.target.value)}
                  placeholder={isUrdu ? "کم از کم (مثلاً 24)" : "From (e.g. 24)"}
                  className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-3 text-base text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                />
                <input
                  type="text"
                  inputMode="numeric"
                  value={data.reqAgeTo}
                  onChange={(e) => updateField('reqAgeTo', e.target.value)}
                  placeholder={isUrdu ? "زیادہ سے زیادہ (مثلاً 30)" : "To (e.g. 30)"}
                  className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-3 text-base text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                />
              </div>
              {currentErrorMap.reqAgeFrom && (
                <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {currentErrorMap.reqAgeFrom}
                </p>
              )}
            </div>

            {/* Height Range */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-[#ecd290]">
                  {isUrdu ? "مطلوبہ قد *" : "Desired Height Range *"}
                </label>
                <label className="flex items-center gap-1.5 text-xs text-[#a79c82] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.reqHeightAny}
                    onChange={(e) => updateField('reqHeightAny', e.target.checked)}
                    className="rounded border-[#d4af61]"
                  />
                  <span>{isUrdu ? "کوئی بھی قد" : "Any Height"}</span>
                </label>
              </div>
              {!data.reqHeightAny && (
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={data.reqHeightFrom}
                    onChange={(e) => updateField('reqHeightFrom', e.target.value)}
                    className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-3 py-2.5 text-sm text-[#f4ecda]"
                  >
                    <option value="">{isUrdu ? "کم از کم قد…" : "Min height…"}</option>
                    {Array.from({ length: 31 }, (_, i) => 54 + i).map((inch) => (
                      <option key={inch} value={String(inch)}>
                        {Math.floor(inch / 12)}&apos;{inch % 12}&quot;
                      </option>
                    ))}
                  </select>
                  <select
                    value={data.reqHeightTo}
                    onChange={(e) => updateField('reqHeightTo', e.target.value)}
                    className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-3 py-2.5 text-sm text-[#f4ecda]"
                  >
                    <option value="">{isUrdu ? "زیادہ سے زیادہ قد…" : "Max height…"}</option>
                    {Array.from({ length: 31 }, (_, i) => 54 + i).map((inch) => (
                      <option key={inch} value={String(inch)}>
                        {Math.floor(inch / 12)}&apos;{inch % 12}&quot;
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Caste Requirement */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="field-reqCaste" className="text-xs font-semibold text-[#ecd290]">
                  {isUrdu ? "مطلوبہ ذات *" : "Desired Caste *"}
                </label>
                <label className="flex items-center gap-1.5 text-xs text-[#a79c82] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.reqCasteAny}
                    onChange={(e) => updateField('reqCasteAny', e.target.checked)}
                    className="rounded border-[#d4af61]"
                  />
                  <span>{isUrdu ? "کوئی بھی ذات" : "Any Caste"}</span>
                </label>
              </div>
              {!data.reqCasteAny && (
                <input
                  id="field-reqCaste"
                  type="text"
                  value={data.reqCaste}
                  onChange={(e) => updateField('reqCaste', e.target.value)}
                  placeholder={isUrdu ? "مثلاً آرائیں، راجپوت، یا ہم پلہ ذات" : "e.g. Arain, Rajput"}
                  className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-3 text-base text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                />
              )}
            </div>

            {/* City Requirement */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="field-reqCity" className="text-xs font-semibold text-[#ecd290]">
                  {isUrdu ? "مطلوبہ شہر *" : "Desired City *"}
                </label>
                <label className="flex items-center gap-1.5 text-xs text-[#a79c82] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.reqCityAny}
                    onChange={(e) => updateField('reqCityAny', e.target.checked)}
                    className="rounded border-[#d4af61]"
                  />
                  <span>{isUrdu ? "کوئی بھی شہر" : "Any City"}</span>
                </label>
              </div>
              {!data.reqCityAny && (
                <input
                  id="field-reqCity"
                  type="text"
                  value={data.reqCity}
                  onChange={(e) => updateField('reqCity', e.target.value)}
                  placeholder={isUrdu ? "مثلاً لاہور یا اسلام آباد" : "e.g. Lahore or Islamabad"}
                  className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-3 text-base text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
                />
              )}
            </div>

            {/* Country Requirement */}
            <div>
              <label className="block text-xs font-semibold text-[#ecd290] mb-2">
                {isUrdu ? "مطلوبہ ملک *" : "Preferred Country *"}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Pakistan", "Overseas", "Both"].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => updateField('reqCountry', c)}
                    className={`min-h-[44px] rounded-xl border py-2 text-xs font-medium transition ${
                      data.reqCountry === c
                        ? "border-[#d4af61] bg-[#d4af61]/20 text-[#ecd290] font-bold"
                        : "border-[rgba(201,162,75,0.2)] bg-black/40 text-[#f4ecda]"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Demands */}
            <div>
              <label htmlFor="field-other" className="block text-xs font-semibold text-[#ecd290] mb-1">
                {isUrdu ? "کوئی اور خاص مطالبہ یا ترجیح" : "Any Specific Requirements"}
              </label>
              <textarea
                id="field-other"
                rows={2}
                value={data.other}
                onChange={(e) => updateField('other', e.target.value)}
                placeholder={isUrdu ? "مثلاً پرہیزگار اور تعلیم یافتہ خاندان" : "e.g. Respectable practising family"}
                className="w-full rounded-xl border border-[rgba(201,162,75,0.25)] bg-black/50 px-4 py-2.5 text-sm text-[#f4ecda] focus:border-[#d4af61] focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* STEP 7: REVIEW & COPY */}
        {currentStep === 7 && (
          <div className="space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#f4ecda] sm:text-2xl border-b border-[rgba(201,162,75,0.15)] pb-3">
              {isUrdu ? "جائزہ اور واٹس ایپ کاپی" : "Review & WhatsApp Copy"}
            </h2>

            {/* Terms & Conditions Checkbox */}
            <div className="rounded-xl border border-[rgba(201,162,75,0.2)] bg-black/40 p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.terms}
                  onChange={(e) => updateField('terms', e.target.checked)}
                  className="mt-1 rounded border-[#d4af61] text-[#d4af61] focus:ring-0"
                />
                <span className="text-xs text-[#f4ecda]/90 leading-relaxed">
                  {isUrdu ? (
                    <>
                      میں اورا میرج بیورو کی{" "}
                      <Link href={`${prefix}/terms`} target="_blank" className="text-[#ecd290] underline">
                        شرائط و ضوابط
                      </Link>{" "}
                      اور{" "}
                      <Link href={`${prefix}/privacy`} target="_blank" className="text-[#ecd290] underline">
                        رازداری کی پالیسی
                      </Link>{" "}
                      سے اتفاق کرتا / کرتی ہوں اور تصدیق کرتا ہوں کہ فراہم کردہ تمام معلومات درست ہیں۔
                    </>
                  ) : (
                    <>
                      I have reviewed and agree to the{" "}
                      <Link href={`${prefix}/terms`} target="_blank" className="text-[#ecd290] underline">
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href={`${prefix}/privacy`} target="_blank" className="text-[#ecd290] underline">
                        Privacy Policy
                      </Link>{" "}
                      of Aura Marriage Bureau.
                    </>
                  )}
                </span>
              </label>
              {currentErrorMap.terms && (
                <p className="mt-2 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {currentErrorMap.terms}
                </p>
              )}
            </div>

            {/* Form Copy Actions */}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleCopyForm}
                className={`btn-gold w-full text-base font-bold py-3.5 shadow-lg transition-all ${
                  copiedSuccess ? "bg-emerald-500 text-black border-emerald-400" : ""
                }`}
              >
                {copiedSuccess ? (
                  <>
                    <Check className="me-2 h-5 w-5" />
                    <span>{isUrdu ? "فارم کامیابی سے کاپی ہو گیا!" : "Form Copied to Clipboard!"}</span>
                  </>
                ) : (
                  <>
                    <Copy className="me-2 h-5 w-5" />
                    <span>{isUrdu ? "فارم کاپی کریں (Copy Form)" : "Copy Form for WhatsApp"}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="btn-line w-full text-sm font-semibold py-3 border-[#d4af61]/50 text-[#ecd290]"
              >
                <ExternalLink className="me-2 h-4 w-4" />
                <span>{isUrdu ? "واٹس ایپ کھولیں" : "Open WhatsApp Directly"}</span>
              </button>
            </div>

            {/* Subtle Gold-light Success Banner */}
            {copiedSuccess && (
              <div className="rounded-xl border border-[#ecd290]/50 bg-[#ecd290]/10 p-4 text-center text-xs text-[#ecd290] animate-fadeIn">
                <Sparkles className="mx-auto h-5 w-5 mb-1 text-[#ecd290]" />
                <p className="font-semibold">
                  {isUrdu
                    ? "اب واٹس ایپ کھولیں، میسج میں دیر تک دبا کر 'پیسٹ' کریں اور 2 سے 3 حالیہ تصاویر کے ساتھ بھیجیں۔"
                    : "Now open WhatsApp, long-press in the chat box and tap Paste. Then attach 2–3 recent candidate pictures."}
                </p>
              </div>
            )}

            {/* Manual Fallback Text Box if Clipboard Blocked */}
            {copyFallbackText && (
              <div className="rounded-xl border border-amber-500/40 bg-black/60 p-4 space-y-2">
                <p className="text-xs text-amber-300 font-semibold">
                  {isUrdu ? "خودکار کاپی روک دی گئی، براہِ کرم یہ متن خود کاپی کریں:" : "Clipboard access blocked. Please manually select & copy the text below:"}
                </p>
                <textarea
                  readOnly
                  rows={8}
                  value={copyFallbackText}
                  className="w-full rounded-lg bg-black/90 p-3 font-mono text-xs text-[#f4ecda] border border-[rgba(201,162,75,0.3)]"
                />
              </div>
            )}

            {/* Live WhatsApp Preview Box */}
            <div>
              <h3 className="font-serif text-sm font-semibold text-[#ecd290] mb-2">
                {isUrdu ? "واٹس ایپ میں بھیجے جانے والے متن کا نمونہ:" : "Generated WhatsApp Text Preview:"}
              </h3>
              <div className="max-h-60 overflow-y-auto rounded-xl border border-[rgba(201,162,75,0.2)] bg-black/60 p-4 font-mono text-xs leading-relaxed text-[#f4ecda]/80 scrollbar-thin">
                <pre className="whitespace-pre-wrap font-mono">
                  {generateWhatsAppProfileText(data)}
                </pre>
              </div>
            </div>

            {/* Phase 2 Submit to Aura Button (Scaffolded behind flag) */}
            {SITE_CONFIG.ENABLE_SUBMIT ? (
              <div className="pt-4 border-t border-[rgba(201,162,75,0.2)]">
                <button
                  type="button"
                  className="btn-gold w-full text-sm font-semibold py-3"
                  onClick={() => alert("Submit route active")}
                >
                  Submit Directly to Aura Database
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#a79c82] pt-2">
                <ShieldCheck className="h-3.5 w-3.5 text-[#d4af61]" />
                <span>
                  {isUrdu
                    ? "ویب سائٹ سے ڈیٹا کہیں نہیں بھیجا جاتا۔ آپ خود واٹس ایپ میں بھیجتے ہیں۔"
                    : "Zero server storage: Form operates completely offline on your device."}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sticky Bottom Wizard Bar (Replaces Home Sticky Bottom Bar on /form) */}
      <div className="fixed bottom-0 inset-x-0 z-40 border-t border-[rgba(201,162,75,0.25)] bg-[#0a0908]/95 px-4 py-3 backdrop-blur-lg safe-bottom">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3">
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={handleBack}
              className="btn-line min-h-[48px] px-5 text-xs font-semibold text-[#f4ecda]"
            >
              <ChevronLeft className="me-1 h-4 w-4 rtl:rotate-180" />
              <span>{isUrdu ? "پیچھے" : "Back"}</span>
            </button>
          ) : (
            <Link
              href={prefix || '/'}
              className="btn-line min-h-[48px] px-4 text-xs font-semibold text-[#a79c82]"
            >
              <span>{isUrdu ? "ہوم" : "Home"}</span>
            </Link>
          )}

          {currentStep < 7 ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn-gold min-h-[48px] flex-1 text-xs font-bold sm:flex-initial sm:px-8"
            >
              <span>{isUrdu ? `اگلا: ${STEP_NAMES[currentStep + 1].ur}` : `Next: ${STEP_NAMES[currentStep + 1].en}`}</span>
              <ChevronRight className="ms-1 h-4 w-4 rtl:rotate-180" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCopyForm}
              className="btn-gold min-h-[48px] flex-1 text-xs font-bold sm:flex-initial sm:px-8"
            >
              <Copy className="me-1.5 h-4 w-4" />
              <span>{isUrdu ? "فارم کاپی کریں" : "Copy Form"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Clear Form Option with Confirm Dialog */}
      <div className="mt-6 text-center">
        {!showClearConfirm ? (
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            className="inline-flex min-h-[48px] items-center gap-1.5 text-xs text-[#a79c82] hover:text-rose-400"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>{isUrdu ? "فارم صاف کریں" : "Clear form"}</span>
          </button>
        ) : (
          <div className="rounded-xl border border-rose-500/30 bg-black/60 p-3 text-xs space-y-2">
            <p className="text-rose-300">
              {isUrdu ? "کیا آپ تمام درج معلومات مٹانا چاہتے ہیں؟" : "Clear all entered data on this device?"}
            </p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowClearConfirm(false);
                }}
                className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-bold text-white min-h-[40px]"
              >
                {isUrdu ? "جی ہاں، مٹا دیں" : "Yes, clear"}
              </button>
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="btn-line px-3 py-1.5 text-xs min-h-[40px]"
              >
                {isUrdu ? "منسوخ" : "Cancel"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
