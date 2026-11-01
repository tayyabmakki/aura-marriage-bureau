'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { SITE_CONFIG } from '@/lib/config';
import { BrandLogo } from '@/components/BrandLogo';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import {
  FlagPakistan,
  FlagUAE,
  FlagUK,
  FlagUS,
  FlagCanada,
  FlagSaudiArabia,
} from '@/components/FlagBadges';
import {
  Check,
  Copy,
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  User,
  GraduationCap,
  Briefcase,
  Users,
  Home,
  Phone,
  HeartHandshake,
  FileText,
  Edit3,
  Trash2,
  ShieldCheck,
  Sparkles,
  AlertCircle,
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

export interface FieldDef {
  key: string;
  en: string;
  ur: string;
  type: 'text' | 'tel' | 'email' | 'date' | 'number' | 'radio' | 'select' | 'textarea';
  options?: string[];
  required?: boolean;
  hint?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  condition?: (data: Record<string, string>) => boolean;
}

export interface StepDef {
  id: string;
  t: string;
  en: string;
  ur: string;
  icon: React.ElementType;
  f: FieldDef[];
}

const STEPS: StepDef[] = [
  {
    id: 'basic',
    t: 'Basic',
    en: 'Basic Information',
    ur: 'بنیادی معلومات',
    icon: User,
    f: [
      {
        key: 'name',
        en: 'Candidate Name',
        ur: 'امیدوار کا نام',
        type: 'text',
        required: false,
        hint: 'Kept private with the bureau consultant, never published publicly.',
      },
      {
        key: 'fatherName',
        en: "Father's / Guardian's Name",
        ur: 'والد / سرپرست کا نام',
        type: 'text',
        hint: 'Used strictly by bureau staff for communication.',
      },
      {
        key: 'gender',
        en: 'Gender',
        ur: 'جنس',
        type: 'radio',
        options: ['Male', 'Female'],
        required: true,
      },
      {
        key: 'age',
        en: 'Age',
        ur: 'عمر',
        type: 'number',
        min: 16,
        max: 90,
        required: true,
      },
      {
        key: 'dob',
        en: 'Date of birth (as on CNIC)',
        ur: 'تاریخِ پیدائش (شناختی کارڈ کے مطابق)',
        type: 'date',
        required: false,
        hint: 'Age above fills in automatically.',
      },
      {
        key: 'pob',
        en: 'Place of Birth',
        ur: 'جائے پیدائش',
        type: 'text',
      },
      {
        key: 'caste',
        en: "Father's Caste / Biradari",
        ur: 'والد کی ذات / برادری',
        type: 'text',
        required: true,
        hint: 'e.g. Rajput, Arain, Jatt, Butt, Mughal, Sheikh, Malik, Syed, etc.',
      },
      {
        key: 'motherCaste',
        en: "Mother's Caste",
        ur: 'والدہ کی ذات',
        type: 'text',
      },
      {
        key: 'origin',
        en: 'Origin / Background',
        ur: 'مہاجر یا مقامی یا اوورسیز',
        type: 'radio',
        options: ['Local', 'Migrated', 'Overseas Pakistani'],
      },
      {
        key: 'overseasCountry',
        en: 'Current Country of Residence',
        ur: 'رہائش کا ملک',
        type: 'text',
        required: true,
        hint: 'e.g. UK, UAE, USA, Canada, Saudi Arabia, Australia',
        condition: (d) => d.origin === 'Overseas Pakistani',
      },
      {
        key: 'residencyStatus',
        en: 'Residency / Visa Status',
        ur: 'امیگریشن / ویزا کی حیثیت',
        type: 'radio',
        options: ['Citizen / Passport', 'Permanent Resident (PR)', 'Work Permit / Visa', 'Student Visa'],
        required: true,
        condition: (d) => d.origin === 'Overseas Pakistani',
      },
      {
        key: 'height',
        en: 'Height',
        ur: 'قد',
        type: 'select',
        options: HEIGHT_OPTIONS,
        required: true,
        hint: 'Feet and inches, e.g. 5\'4" or 5\'10".',
      },
      {
        key: 'marital',
        en: 'Marital Status',
        ur: 'ازدواجی حیثیت',
        type: 'radio',
        options: [
          'Unmarried',
          'Married (Seeking Second Marriage)',
          'Divorced',
          'Khula',
          'Separated — divorce / khula in process',
          'Widow',
          'Widower',
        ],
        required: true,
      },
      // --- Marriage History Fields (shown when not Unmarried) ---
      {
        key: 'yearOfMarriage',
        en: 'Year of marriage',
        ur: 'شادی کا سال',
        type: 'text',
        placeholder: 'e.g. 2015',
        condition: (d) => !!d.marital && d.marital !== 'Unmarried',
      },

      // Divorced / Khula
      {
        key: 'yearOfDivorce',
        en: 'Year of divorce / khula',
        ur: 'طلاق / خلع کا سال',
        type: 'text',
        placeholder: 'e.g. 2023',
        condition: (d) => d.marital === 'Divorced' || d.marital === 'Khula',
      },
      {
        key: 'divorceReason',
        en: 'Reason of divorce / khula',
        ur: 'طلاق / خلع کی وجہ',
        type: 'text',
        placeholder: 'A short reason',
        hint: 'A line is enough. Details can be discussed privately.',
        condition: (d) => d.marital === 'Divorced' || d.marital === 'Khula',
      },

      // Separated — divorce / khula in process
      {
        key: 'separationStatus',
        en: 'Status of divorce / khula',
        ur: 'طلاق / خلع کی صورتِ حال',
        type: 'text',
        placeholder: 'e.g. Case in family court, decision expected soon',
        condition: (d) => d.marital === 'Separated — divorce / khula in process',
      },

      // Widow / Widower
      {
        key: 'yearWidowed',
        en: 'Year widowed',
        ur: 'وفات کا سال',
        type: 'text',
        placeholder: 'e.g. 2022',
        condition: (d) => d.marital === 'Widow' || d.marital === 'Widower',
      },

      // Married (Seeking Second Marriage) conditions
      {
        key: 'secondMarriageReason',
        en: 'Reason for seeking second marriage',
        ur: 'دوسری شادی کی وجہ',
        type: 'textarea',
        required: true,
        placeholder: 'e.g. First wife medical issues / No children / Mutual family decision',
        hint: 'A brief explanation helps families evaluate the proposal with clarity.',
        condition: (d) => d.marital === 'Married (Seeking Second Marriage)',
      },
      {
        key: 'firstWifeConsent',
        en: "First wife's consent & permission status",
        ur: 'پہلی اہلیہ کی اجازت اور رضامندی کی صورتِ حال',
        type: 'radio',
        options: [
          'Yes, with full knowledge and consent of first wife',
          'Family discussion in progress',
          'Independent decision',
        ],
        required: true,
        hint: 'Transparency on consent is vital for second marriage proposals.',
        condition: (d) => d.marital === 'Married (Seeking Second Marriage)',
      },
      {
        key: 'secondWifeResidence',
        en: 'Residence arrangement for second wife',
        ur: 'دوسری اہلیہ کے لیے رہائش کا انتظام',
        type: 'radio',
        options: [
          'Separate independent house / flat guaranteed',
          'Separate floor / portion in existing house',
          'Open to mutual discussion',
        ],
        required: true,
        hint: 'Islam and families require a dignified, separate living arrangement.',
        condition: (d) => d.marital === 'Married (Seeking Second Marriage)',
      },

      // Kids (all non-unmarried cases)
      {
        key: 'kids',
        en: 'Kids',
        ur: 'بچے',
        type: 'text',
        required: true,
        placeholder: 'e.g. 2 sons (8, 5), 1 daughter (3) — or "No kids"',
        hint: 'Sons and daughters with their ages.',
        condition: (d) => !!d.marital && d.marital !== 'Unmarried',
      },
      {
        key: 'disability',
        en: 'Any disability or chronic disease?',
        ur: 'کوئی معذوری یا دائمی بیماری؟',
        type: 'radio',
        options: YN,
        required: true,
        hint: 'Honest details help find an understanding and compatible match.',
      },
      {
        key: 'disabilityDetail',
        en: 'Please specify details of disability / medical condition',
        ur: 'معذوری یا بیماری کی نوعیت اور تفصیل',
        type: 'textarea',
        required: true,
        hint: 'Please describe nature, severity, or any ongoing medication.',
        condition: (d) => d.disability === 'Yes',
      },
      {
        key: 'sect',
        en: 'Religion / Sect / Maslik',
        ur: 'مذہب / فرقہ / مسلک',
        type: 'radio',
        options: ['Sunni', 'Shia (Ahl-e-Tashee)', 'Other'],
        required: true,
      },
      {
        key: 'sectOther',
        en: 'Please specify sect / maslik',
        ur: 'اپنا مسلک / فرقہ واضح کریں',
        type: 'text',
        required: true,
        condition: (d) => d.sect === 'Other',
      },
      {
        key: 'nationality',
        en: 'Nationality',
        ur: 'قومیت',
        type: 'radio',
        options: ['Pakistani', 'Dual Nationality', 'Other'],
      },
      {
        key: 'nationalityDetail',
        en: 'Specify Nationality / Second Passport',
        ur: 'قومیت یا دوسرے پاسپورٹ کی تفصیل',
        type: 'text',
        required: true,
        condition: (d) => !!d.nationality && d.nationality !== 'Pakistani',
      },
    ],
  },
  {
    id: 'education',
    t: 'Education',
    en: 'Education',
    ur: 'تعلیم',
    icon: GraduationCap,
    f: [
      {
        key: 'edu',
        en: 'Highest Qualification',
        ur: 'اعلیٰ ترین تعلیم',
        type: 'text',
        required: true,
        hint: 'e.g. BS Computer Science, MBBS, MBA, CA, M.Phil, Intermediate',
      },
      {
        key: 'eduDetail',
        en: 'Degree & Institute Details',
        ur: 'ڈگری اور تعلیمی ادارے کی تفصیل',
        type: 'text',
        hint: 'e.g. FAST Lahore (2021), King Edward Medical University, LUMS',
      },
      {
        key: 'eduOther',
        en: 'Other Courses / Certifications',
        ur: 'دیگر کورسز / ہنر / اسناد',
        type: 'textarea',
      },
    ],
  },
  {
    id: 'job',
    t: 'Work',
    en: 'Profession / Employment',
    ur: 'ملازمت / کاروبار',
    icon: Briefcase,
    f: [
      {
        key: 'occ',
        en: 'Occupation Status',
        ur: 'پیشہ / مصروفیات',
        type: 'radio',
        options: ['Job', 'Business', 'Student', 'Housewife', 'Not working'],
        required: true,
      },
      // Job branch
      {
        key: 'designation',
        en: 'Designation / Profession',
        ur: 'عہدہ / پیشہ',
        type: 'text',
        required: true,
        hint: 'e.g. Senior Software Engineer, Medical Officer, Bank Manager',
        condition: (d) => d.occ === 'Job',
      },
      {
        key: 'employer',
        en: 'Company / Organization Name',
        ur: 'ادارہ / کمپنی کا نام',
        type: 'text',
        required: true,
        condition: (d) => d.occ === 'Job',
      },
      {
        key: 'workCity',
        en: 'Work City / Location',
        ur: 'کام کا شہر',
        type: 'text',
        required: true,
        condition: (d) => d.occ === 'Job',
      },
      {
        key: 'income',
        en: 'Monthly Income (Optional)',
        ur: 'ماہانہ آمدن (اختیاری)',
        type: 'text',
        hint: 'Approximate range is fine, e.g. 1.5 - 2 Lakh PKR',
        condition: (d) => d.occ === 'Job',
      },
      // Business branch
      {
        key: 'businessNature',
        en: 'Nature of Business / Industry',
        ur: 'کاروبار کی نوعیت',
        type: 'text',
        required: true,
        hint: 'e.g. Textile Manufacturing, Pharmacy, IT Consultancy, Auto Parts, Real Estate',
        condition: (d) => d.occ === 'Business',
      },
      {
        key: 'businessName',
        en: 'Business / Firm Name',
        ur: 'کاروبار / فرم کا نام',
        type: 'text',
        required: true,
        condition: (d) => d.occ === 'Business',
      },
      {
        key: 'businessCity',
        en: 'Business City',
        ur: 'کاروبار کا شہر',
        type: 'text',
        required: true,
        condition: (d) => d.occ === 'Business',
      },
      {
        key: 'businessIncome',
        en: 'Monthly / Annual Income (Optional)',
        ur: 'آمدن (اختیاری)',
        type: 'text',
        condition: (d) => d.occ === 'Business',
      },
      // Student branch
      {
        key: 'studentDegree',
        en: 'Current Program / Degree',
        ur: 'زیرِ تعلیم ڈگری',
        type: 'text',
        required: true,
        condition: (d) => d.occ === 'Student',
      },
      {
        key: 'studentInstitution',
        en: 'College / University',
        ur: 'تعلیمی ادارہ / یونیورسٹی',
        type: 'text',
        required: true,
        condition: (d) => d.occ === 'Student',
      },
      {
        key: 'studentYear',
        en: 'Expected Completion Year',
        ur: 'تکمیل کا متوقع سال',
        type: 'text',
        condition: (d) => d.occ === 'Student',
      },
      // Housewife or Not working branch
      {
        key: 'occNotes',
        en: 'Notes on daily activities or future plans',
        ur: 'مصروفیات یا مستقبل کے ارادے کی تفصیل',
        type: 'textarea',
        condition: (d) => d.occ === 'Housewife' || d.occ === 'Not working',
      },
    ],
  },
  {
    id: 'family',
    t: 'Family',
    en: 'Family Details',
    ur: 'خاندانی معلومات',
    icon: Users,
    f: [
      {
        key: 'fatherStatus',
        en: "Father's Status",
        ur: 'والد محترم کی حیثیت',
        type: 'radio',
        options: ['Alive', 'Late'],
        required: true,
      },
      {
        key: 'fatherOcc',
        en: "Father's Occupation",
        ur: 'والد کا پیشہ / مصروفیات',
        type: 'text',
        required: true,
        hint: 'e.g. Retired Government Officer, Businessman, Landlord',
        condition: (d) => d.fatherStatus === 'Alive',
      },
      {
        key: 'fatherOccLate',
        en: "Father's Former Profession (Late)",
        ur: 'والد مرحوم کا سابقہ پیشہ / تعارف',
        type: 'text',
        condition: (d) => d.fatherStatus === 'Late',
      },
      {
        key: 'motherStatus',
        en: "Mother's Status",
        ur: 'والدہ محترمہ کی حیثیت',
        type: 'radio',
        options: ['Alive', 'Late'],
        required: true,
      },
      {
        key: 'motherOcc',
        en: "Mother's Occupation",
        ur: 'والدہ کا پیشہ / مصروفیات',
        type: 'text',
        hint: 'e.g. Housewife, Teacher, Doctor',
        condition: (d) => d.motherStatus === 'Alive',
      },
      {
        key: 'brothers',
        en: 'Brothers (Total Count)',
        ur: 'بھائی (کل تعداد)',
        type: 'text',
        required: true,
        hint: 'e.g. 2, or None',
      },
      {
        key: 'brothersProf',
        en: 'Brothers: Qualification & Profession (if any)',
        ur: 'بھائیوں کی تعلیم اور پیشہ',
        type: 'text',
        hint: 'e.g. Elder brother Software Engineer, Younger studying',
      },
      {
        key: 'brothersMarried',
        en: 'Married Brothers',
        ur: 'شادی شدہ بھائیوں کی تعداد',
        type: 'text',
        hint: 'e.g. 1, or None',
      },
      {
        key: 'sisters',
        en: 'Sisters (Total Count)',
        ur: 'بہنیں (کل تعداد)',
        type: 'text',
        required: true,
        hint: 'e.g. 2, or None',
      },
      {
        key: 'sistersProf',
        en: 'Sisters: Qualification & Profession (if any)',
        ur: 'بہنوں کی تعلیم اور پیشہ',
        type: 'text',
        hint: 'e.g. Elder sister Doctor, Younger studying',
      },
      {
        key: 'sistersMarried',
        en: 'Married Sisters',
        ur: 'شادی شدہ بہنوں کی تعداد',
        type: 'text',
        hint: 'e.g. 1, or None',
      },
      {
        key: 'sibDetail',
        en: "Siblings' Details",
        ur: 'بہن بھائیوں کی تفصیل',
        type: 'textarea',
        hint: 'Mention education, jobs, or marital status of elder/younger siblings.',
      },
      {
        key: 'famType',
        en: 'Family Living System',
        ur: 'خاندانی نظام',
        type: 'radio',
        options: ['Joint Family', 'Nuclear / Separate Family'],
      },
    ],
  },
  {
    id: 'residence',
    t: 'Home',
    en: 'Residence & Address',
    ur: 'رہائش اور پتہ',
    icon: Home,
    f: [
      {
        key: 'city',
        en: 'Current Residential City',
        ur: 'رہائش کا شہر',
        type: 'text',
        required: true,
        hint: 'e.g. Lahore, Islamabad, Rawalpindi, Faisalabad, Karachi',
      },
      {
        key: 'area',
        en: 'Area / Society / Town',
        ur: 'علاقہ / سوسائٹی',
        type: 'text',
        required: true,
        hint: 'e.g. DHA Phase 6, Bahria Town, Gulberg, Model Town',
      },
      {
        key: 'permResidence',
        en: 'Permanent Residence',
        ur: 'مستقل رہائش / آبائی علاقہ',
        type: 'text',
        hint: 'e.g. Same as present, or Native City / Town',
      },
      {
        key: 'address',
        en: 'Complete Address',
        ur: 'مکمل پتہ',
        type: 'textarea',
        required: true,
        hint: 'Required for internal verification by the bureau. Kept completely confidential.',
      },
      {
        key: 'house',
        en: 'House Ownership',
        ur: 'گھر کی حیثیت',
        type: 'radio',
        options: ['Own House', 'Rented', 'Family Owned'],
      },
      {
        key: 'houseSize',
        en: 'House Size / Area',
        ur: 'گھر کا رقبہ',
        type: 'text',
        hint: 'e.g. 5 Marla, 10 Marla, 1 Kanal, Apartment',
        condition: (d) => !!d.house,
      },
    ],
  },
  {
    id: 'contact',
    t: 'Contact',
    en: 'Contact Details',
    ur: 'رابطہ',
    icon: Phone,
    f: [
      {
        key: 'altPhone',
        en: 'Contact No.',
        ur: 'رابطہ نمبر (کال)',
        type: 'tel',
        required: true,
        hint: 'Calling phone number',
      },
      {
        key: 'wa',
        en: 'WhatsApp No.',
        ur: 'واٹس ایپ نمبر',
        type: 'tel',
        required: true,
        hint: 'Primary WhatsApp number for proposals',
      },
      {
        key: 'parentPhone',
        en: 'Parents / Guardian Contact No.',
        ur: 'والدین / سرپرست کا فون نمبر',
        type: 'tel',
        hint: 'Father, mother, or guardian contact number',
      },
      {
        key: 'landline',
        en: 'Landline No.',
        ur: 'لینڈ لائن نمبر',
        type: 'tel',
        hint: 'Optional / if available',
      },
      {
        key: 'pictures',
        en: 'Fresh Complete 2-3 Pictures of Candidate (Compulsory)',
        ur: 'امیدوار کی 2 تا 3 حالیہ تصاویر (لازمی)',
        type: 'radio',
        options: [
          'Will share directly on WhatsApp',
          'Already shared with consultant',
          'Available on private request',
        ],
        required: true,
      },
      {
        key: 'linkedin',
        en: "LinkedIn I'd",
        ur: 'لنکڈ ان آئی ڈی / پروفائل',
        type: 'text',
        hint: 'Optional profile link or username',
      },
      {
        key: 'contactName',
        en: 'Contact Person & Relation',
        ur: 'رابطہ کرنے والے کا نام اور رشتہ',
        type: 'text',
        hint: 'e.g. Muhammad Aslam (Father), Tariq (Brother)',
      },
      {
        key: 'email',
        en: 'Email Address',
        ur: 'ای میل پتہ',
        type: 'email',
      },
      {
        key: 'callTime',
        en: 'Preferred Time for Consultation Call',
        ur: 'رابطے کا مناسب ترین وقت',
        type: 'text',
        hint: 'e.g. 5:00 PM to 9:00 PM',
      },
    ],
  },
  {
    id: 'requirements',
    t: 'Needs',
    en: 'Partner Preferences',
    ur: 'شرائط و ترجیحات',
    icon: HeartHandshake,
    f: [
      {
        key: 'rAge',
        en: 'Preferred Age Range',
        ur: 'مطلوبہ عمر کی حد',
        type: 'text',
        required: true,
        hint: 'e.g. 24 to 28 years',
      },
      {
        key: 'rCaste',
        en: 'Preferred Caste / Maslik',
        ur: 'مطلوبہ ذات / مسلک',
        type: 'text',
        hint: 'e.g. Same caste preferred, or any respectable educated family',
      },
      {
        key: 'rHeight',
        en: 'Preferred Height Range',
        ur: 'مطلوبہ قد',
        type: 'text',
        hint: 'e.g. 5\'3" to 5\'7" or 5\'10"+',
      },
      {
        key: 'rMarital',
        en: 'Preferred Marital Status',
        ur: 'مطلوبہ ازدواجی حیثیت',
        type: 'radio',
        options: ['Unmarried Only', 'Divorced / Khula Acceptable', 'Second Marriage Acceptable', 'Widow / Widower Acceptable', 'Any'],
      },
      {
        key: 'rEdu',
        en: 'Preferred Education',
        ur: 'مطلوبہ تعلیم',
        type: 'text',
        hint: 'e.g. MBBS, Engineer, Master\'s, Graduate',
      },
      {
        key: 'rJob',
        en: 'Preferred Profession',
        ur: 'مطلوبہ پیشہ / آمدن',
        type: 'text',
        hint: 'e.g. Established professional, businessman, overseas settled',
      },
      {
        key: 'rCity',
        en: 'Preferred City',
        ur: 'پسندیدہ شہر',
        type: 'text',
        hint: 'e.g. Lahore, Islamabad, Rawalpindi, Karachi',
      },
      {
        key: 'rCountry',
        en: 'Preferred Country',
        ur: 'پسندیدہ ملک',
        type: 'text',
        hint: 'e.g. Pakistan, UK, UAE, USA, Canada, Any',
      },
      {
        key: 'rGirlResidence',
        en: "Girl's Residence After Marriage",
        ur: 'شادی کے بعد لڑکی کی رہائش',
        type: 'text',
        hint: 'e.g. Separate house preferred, Joint family acceptable, Open to mutual discussion',
      },
      {
        key: 'rOther',
        en: 'Any other Details / Demand',
        ur: 'کوئی دیگر تفصیل یا مطالبہ',
        type: 'textarea',
        hint: 'e.g. Namazi, Hijab/Parda preferences, simple Nikah preference',
      },
    ],
  },
  {
    id: 'review',
    t: 'Review',
    en: 'Review & Send',
    ur: 'جائزہ اور ترسیل',
    icon: FileText,
    f: [],
  },
];

const STORAGE_KEY = 'profile-form-v1';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

const MARRIAGE_HISTORY_KEYS = new Set([
  'yearOfMarriage',
  'yearOfDivorce',
  'divorceReason',
  'yearOfKhula',
  'khulaReason',
  'separationStatus',
  'yearWidowed',
  'secondMarriageReason',
  'firstWifeConsent',
  'secondWifeResidence',
  'kids',
]);

function isFieldVisible(field: FieldDef, data: Record<string, string>): boolean {
  if (field.condition) {
    return field.condition(data);
  }
  return true;
}

export const ProfileWizard = () => {
  const locale = useLocale();
  const isUrdu = locale === 'ur';

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [cur, setCur] = useState(0);
  const [badFields, setBadFields] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'gold';
    icon?: 'trash' | 'alert' | 'shield';
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tabListRef = useRef<HTMLDivElement>(null);

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

  // Scroll active tab into view when step changes
  useEffect(() => {
    const activeTabEl = document.getElementById(`step-tab-${cur}`);
    if (activeTabEl && tabListRef.current) {
      activeTabEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [cur]);

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
    }, 2800);
  };

  const handleInputChange = (key: string, value: string) => {
    const updated = { ...formData, [key]: value };

    // Auto-calculate age from DOB (YYYY-MM-DD)
    if (key === 'dob' && value) {
      const parts = value.split('-').map(Number);
      if (parts.length === 3) {
        const [birthYear, birthMonth, birthDay] = parts;
        if (!isNaN(birthYear) && !isNaN(birthMonth) && !isNaN(birthDay)) {
          const today = new Date();
          const currentYear = today.getFullYear();
          const currentMonth = today.getMonth() + 1;
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
        const el =
          document.getElementById(`field-${focusKey}`) ||
          (document.querySelector(`[name="${focusKey}"]`) as HTMLElement);
        el?.focus();
        setBadFields(new Set([focusKey]));
      }, 150);
    }
  };

  const handleNext = () => {
    const step = STEPS[cur];
    // Check required fields that are currently visible
    const missing = step.f.filter(
      (f) => f.required && isFieldVisible(f, formData) && !String(formData[f.key] || '').trim()
    );

    if (missing.length > 0) {
      const missingKeys = new Set(missing.map((f) => f.key));
      setBadFields(missingKeys);
      const firstEl = document.querySelector(
        '.field-error input, .field-error select, .field-error textarea'
      ) as HTMLElement;
      firstEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstEl?.focus();
      return;
    }

    goToStep(cur + 1);
  };

  const handleClear = () => {
    setConfirmModal({
      isOpen: true,
      title: isUrdu ? 'فارم ڈیٹا صاف کریں؟' : 'Clear Form Details?',
      message: isUrdu
        ? 'کیا آپ تمام درج کردہ معلومات ختم کرنا چاہتے ہیں؟ یہ عمل واپس نہیں کیا جا سکتا۔'
        : 'Are you sure you want to clear all entered details? This action cannot be undone.',
      confirmText: isUrdu ? 'ہاں، صاف کریں' : 'Clear All Data',
      cancelText: isUrdu ? 'منسوخ کریں' : 'Keep Editing',
      variant: 'danger',
      icon: 'trash',
      onConfirm: () => {
        setFormData({});
        setBadFields(new Set());
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {}
        goToStep(0);
        showToast(isUrdu ? 'ڈیٹا صاف کر دیا گیا ہے' : 'Form data cleared');
      },
    });
  };

  const buildOutputText = (): string => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const dateStr = `${dd}/${mm}/${yyyy}`;

    // Education
    const eduParts: string[] = [];
    if (formData.edu) eduParts.push(formData.edu);
    if (formData.eduDetail) eduParts.push(formData.eduDetail);
    if (formData.eduOther) eduParts.push(`(${formData.eduOther})`);
    const eduLine = eduParts.length > 0 ? `▪️ ${eduParts.join(' - ')}` : '▪️';

    // Job / Business
    let jobStr = '';
    if (formData.occ === 'Job') {
      jobStr = [
        formData.designation,
        formData.employer,
        formData.workCity,
        formData.income ? `(Income: ${formData.income})` : '',
      ]
        .filter(Boolean)
        .join(', ');
    } else if (formData.occ === 'Business') {
      jobStr = [
        formData.businessNature,
        formData.businessName,
        formData.businessCity,
        formData.businessIncome ? `(Income: ${formData.businessIncome})` : '',
      ]
        .filter(Boolean)
        .join(', ');
    } else if (formData.occ === 'Student') {
      jobStr = `Student: ${[formData.studentDegree, formData.studentInstitution, formData.studentYear].filter(Boolean).join(', ')}`;
    } else if (formData.occ === 'Housewife') {
      jobStr = `Housewife${formData.occNotes ? ` - ${formData.occNotes}` : ''}`;
    } else if (formData.occ === 'Not working') {
      jobStr = `Not working${formData.occNotes ? ` - ${formData.occNotes}` : ''}`;
    } else if (formData.occ) {
      jobStr = formData.occ;
    }
    const jobLine = jobStr ? `▪️ ${jobStr}` : '▪️';

    // Marital / Divorce / Kids
    let divorceReason = 'N/A';
    if (formData.marital === 'Unmarried') {
      divorceReason = 'N/A';
    } else if (formData.marital === 'Married (Seeking Second Marriage)') {
      const parts: string[] = [];
      if (formData.yearOfMarriage) parts.push(`1st Marriage: ${formData.yearOfMarriage}`);
      if (formData.secondMarriageReason) parts.push(`Reason: ${formData.secondMarriageReason}`);
      if (formData.firstWifeConsent) parts.push(`1st Wife Consent: ${formData.firstWifeConsent}`);
      if (formData.secondWifeResidence) parts.push(`2nd Wife Residence: ${formData.secondWifeResidence}`);
      divorceReason = parts.join(' | ') || 'Details provided to consultant';
    } else if (formData.marital === 'Separated — divorce / khula in process') {
      const parts: string[] = [];
      if (formData.yearOfMarriage) parts.push(`Married: ${formData.yearOfMarriage}`);
      if (formData.separationStatus) parts.push(`Status: ${formData.separationStatus}`);
      divorceReason = parts.join(' | ') || 'Separated (divorce / khula in process)';
    } else if (formData.marital === 'Divorced') {
      const parts: string[] = [];
      if (formData.yearOfMarriage) parts.push(`Married: ${formData.yearOfMarriage}`);
      if (formData.yearOfDivorce) parts.push(`Divorced: ${formData.yearOfDivorce}`);
      if (formData.divorceReason) parts.push(`Reason: ${formData.divorceReason}`);
      divorceReason = parts.join(' | ') || formData.divorceReason || 'Divorced';
    } else if (formData.marital === 'Khula') {
      const parts: string[] = [];
      if (formData.yearOfMarriage) parts.push(`Married: ${formData.yearOfMarriage}`);
      const khulaYr = formData.yearOfDivorce || formData.yearOfKhula;
      if (khulaYr) parts.push(`Khula: ${khulaYr}`);
      const khulaRsn = formData.divorceReason || formData.khulaReason;
      if (khulaRsn) parts.push(`Reason: ${khulaRsn}`);
      divorceReason = parts.join(' | ') || khulaRsn || 'Khula';
    } else if (formData.marital === 'Widow' || formData.marital === 'Widower') {
      const parts: string[] = [];
      if (formData.yearOfMarriage) parts.push(`Married: ${formData.yearOfMarriage}`);
      if (formData.yearWidowed) parts.push(`Widowed: ${formData.yearWidowed}`);
      divorceReason = parts.join(' | ') || (formData.yearWidowed ? `Widowed in ${formData.yearWidowed}` : formData.marital || 'Widow');
    } else if (formData.divorceReason) {
      divorceReason = formData.divorceReason;
    }

    let kidsDetail = 'N/A';
    if (formData.marital && formData.marital !== 'Unmarried') {
      kidsDetail =
        formData.kids ||
        formData.kidsDetail ||
        formData.childrenDetail ||
        (formData.hasChildren === 'No' ? 'No kids' : 'Details with consultant');
    }

    // Disability
    let disabilityStr = '';
    if (formData.disability === 'Yes') {
      disabilityStr = `Yes${formData.disabilityDetail ? ` (${formData.disabilityDetail})` : ''}`;
    } else if (formData.disability === 'No') {
      disabilityStr = 'No';
    } else {
      disabilityStr = formData.disability || '';
    }

    // Religion / Sect
    const sectStr =
      formData.sect === 'Other'
        ? formData.sectOther || 'Other'
        : formData.sect || '';

    // Nationality
    let nationalityStr = formData.nationality || '';
    if (formData.nationalityDetail) {
      nationalityStr = `${formData.nationality || ''} (${formData.nationalityDetail})`.trim();
    }

    // Father & Mother
    let fatherStr = '';
    if (formData.fatherStatus === 'Alive') {
      fatherStr = `Alive${formData.fatherOcc ? ` - ${formData.fatherOcc}` : ''}`;
    } else if (formData.fatherStatus === 'Late') {
      fatherStr = `Late${formData.fatherOccLate ? ` (${formData.fatherOccLate})` : ''}`;
    } else {
      fatherStr = formData.fatherStatus || '';
    }

    let motherStr = '';
    if (formData.motherStatus === 'Alive') {
      motherStr = `Alive${formData.motherOcc ? ` - ${formData.motherOcc}` : ''}`;
    } else if (formData.motherStatus === 'Late') {
      motherStr = 'Late';
    } else {
      motherStr = formData.motherStatus || '';
    }

    // Residence
    const houseDetails =
      [formData.house, formData.houseSize].filter(Boolean).join(', ') ||
      formData.houseDetails ||
      '';
    const presentResidence =
      [formData.area, formData.city].filter(Boolean).join(', ') ||
      formData.city ||
      formData.presentResidence ||
      '';
    const permanentResidence =
      formData.permResidence || formData.permCity || formData.city || '';
    const completeAddress = formData.address || '';

    return [
      `*AURA Marriage Bureau*`,
      ``,
      `*Marriage Consultant* `,
      `*Muhammad Tayyab Makki* `,
      `➖➖➖➖➖➖➖`,
      `*Date:* ${dateStr}`,
      `➖➖➖➖➖➖➖➖➖`,
      `💠 *\`BASIC INFORMATION\`*`,
      `*Name:* ${formData.name || ''}`,
      `*Father's Name:* ${formData.fatherName || ''}`,
      `*Gender:* ${formData.gender || ''}`,
      `*Age:* ${formData.age || ''}`,
      `*Date of Birth (as per CNIC):* ${formData.dob || ''}`,
      `*Place of Birth:* ${formData.pob || ''}`,
      `*Father's Caste:* ${formData.caste || ''}`,
      `*Mother's Caste:* ${formData.motherCaste || ''}`,
      `*Migrated or Local:* ${formData.origin || ''}`,
      `*Height:* ${formData.height || ''}`,
      `*Marital Status:* ${formData.marital || ''}`,
      `*If Divorce/Khula then reason of Divorce/Khula:* ${divorceReason}`,
      `*Kids Detail:* ${kidsDetail}`,
      `*Any Disability/Disease:* ${disabilityStr}`,
      `*Religion/Sect/Maslik:* ${sectStr}`,
      `*Nationality:* ${nationalityStr}`,
      `➖➖➖➖➖➖➖➖➖`,
      `💠 *\`EDUCATION\`*`,
      `${eduLine}`,
      `➖➖➖➖➖➖➖➖➖`,
      `💠 *\`JOB / BUSINESS\`*`,
      `${jobLine}`,
      `➖➖➖➖➖➖➖➖➖`,
      `💠 *\`FAMILY DETAILS\`*`,
      `*Father:* ${fatherStr}`,
      `*Mother:* ${motherStr}`,
      `*Brothers:* ${formData.brothers || formData.brothersCount || ''}`,
      `*Qualification & Profession (if any):* ${formData.brothersProf || ''}`,
      `*Married Brothers:* ${formData.brothersMarried || ''}`,
      `*Sisters:* ${formData.sisters || formData.sistersCount || ''}`,
      `*Qualification & Profession (if any):* ${formData.sistersProf || ''}`,
      `*Married Sisters:* ${formData.sistersMarried || ''}`,
      `➖➖➖➖➖➖➖➖➖`,
      `💠 *\`RESIDENTIAL STATUS\`*`,
      `*House Details:* ${houseDetails}`,
      `*Present Residence:* ${presentResidence}`,
      `*Permanent Residence:* ${permanentResidence}`,
      `*Complete Address:* ${completeAddress}`,
      `➖➖➖➖➖➖➖➖➖`,
      `💠 *\`CONTACT DETAILS\`*`,
      `*Contact No.* ${formData.altPhone || formData.wa || ''}`,
      `*WhatsApp No.* ${formData.wa || ''}`,
      `*Parents / Guardian Contact No.* ${formData.parentPhone || ''}`,
      `*Landline No.* ${formData.landline || ''}`,
      `*Fresh Complete 2-3 Pictures of Candidate (Compulsory):* ${formData.pictures || ''}`,
      `*LinkedIn I'd:* ${formData.linkedin || ''}`,
      `➖➖➖➖➖➖➖➖➖`,
      `➖➖➖➖➖➖➖➖➖`,
      `💠 *\`REQUIREMENTS\`*`,
      `*Age:* ${formData.rAge || ''}`,
      `*Caste:* ${formData.rCaste || ''}`,
      `*Height:* ${formData.rHeight || ''}`,
      `*Marital Status:* ${formData.rMarital || ''}`,
      `*Education:* ${formData.rEdu || ''}`,
      `*Profession:* ${formData.rJob || ''}`,
      `*City:* ${formData.rCity || ''}`,
      `*Country:* ${formData.rCountry || ''}`,
      `➖➖➖➖➖➖➖➖➖`,
      `*▪️Girl's Residence After Marriage*`,
      formData.rGirlResidence ? formData.rGirlResidence : ``,
      `➖➖➖➖➖➖➖➖➖`,
      `*▪️Any other Details / Demand*  `,
      formData.rOther ? formData.rOther : ``,
      `➖➖➖➖➖➖➖➖➖`,
      `*AURA Marriage Bureau*`,
      `*+92-339-4519797*`,
      `*(WhatsApp)*`,
      `➖➖➖➖➖➖➖➖➖`,
    ].join('\n');
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
        setCopied(true);
        showToast(
          isUrdu
            ? 'کاپی ہو گیا ✓ اب واٹس ایپ میں پیسٹ کریں'
            : 'Copied ✓ Now paste in WhatsApp'
        );
        setTimeout(() => setCopied(false), 3000);
      } catch {
        showToast(isUrdu ? 'متن کو خود منتخب کر کے کاپی کریں' : 'Please select and copy manually');
      }
      a.remove();
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(txt).then(() => {
        setCopied(true);
        showToast(
          isUrdu
            ? 'کاپی ہو گیا ✓ اب واٹس ایپ میں پیسٹ کریں'
            : 'Copied ✓ Now paste in WhatsApp'
        );
        setTimeout(() => setCopied(false), 3000);
      }, fallback);
    } else {
      fallback();
    }
  };

  const handleOpenWhatsApp = () => {
    setTimeout(() => {
      setConfirmModal({
        isOpen: true,
        title: isUrdu ? 'محفوظ شدہ ڈیٹا صاف کریں؟' : 'Clear Saved Data?',
        message: isUrdu
          ? 'واٹس ایپ کھول دیا گیا ہے۔ کیا آپ اس ڈیوائس سے اپنا محفوظ کردہ فارم ڈیٹا صاف کرنا چاہتے ہیں؟'
          : 'WhatsApp has been opened. Would you like to clear your saved form data from this device for privacy?',
        confirmText: isUrdu ? 'ڈیٹا صاف کریں' : 'Clear Data',
        cancelText: isUrdu ? 'محفوظ رکھیں' : 'Keep Data',
        variant: 'gold',
        icon: 'shield',
        onConfirm: () => {
          setFormData({});
          setBadFields(new Set());
          try {
            localStorage.removeItem(STORAGE_KEY);
          } catch {}
          goToStep(0);
          showToast(isUrdu ? 'ڈیٹا صاف کر دیا گیا ہے' : 'Data cleared from device');
        },
      });
    }, 1500);
  };

  const getMissingFields = () => {
    return STEPS.slice(0, 7).flatMap((s, i) =>
      s.f
        .filter(
          (f) => f.required && isFieldVisible(f, formData) && !String(formData[f.key] || '').trim()
        )
        .map((f) => ({
          stepIdx: i,
          key: f.key,
          name: isUrdu ? f.ur : f.en,
          stepName: isUrdu ? s.ur : s.t,
        }))
    );
  };

  const currentStepDef = STEPS[cur];
  const progressPercent = ((cur + 1) / STEPS.length) * 100;
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    buildOutputText()
  )}`;

  return (
    <div className="relative min-h-screen bg-[#0a0908] text-[#f4ecda]">
      {/* Toast Notification */}
      <div
        className={`fixed left-1/2 bottom-20 sm:bottom-8 -translate-x-1/2 z-50 rounded-full bg-gradient-to-r from-[#b88a35] via-[#ecd290] to-[#c9a24b] px-6 py-3 font-semibold text-[#1c1406] shadow-2xl text-xs sm:text-sm tracking-wide transition-all duration-300 pointer-events-none ${
          toastMessage ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
        }`}
        role="status"
        aria-live="polite"
      >
        {toastMessage}
      </div>

      {/* Sleek, Mobile-First Header */}
      <header className="relative border-b border-[rgba(201,162,75,0.18)] bg-gradient-to-b from-[#14100b] to-[#0a0908] pt-6 pb-6 px-4">
        <div className="mx-auto max-w-3xl">
          {/* Top Bar: Brand Logo + Return Link + Confidential Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs mb-5">
            <BrandLogo size="md" layout="vertical" asLink href={isUrdu ? '/ur' : '/'} locationSuffix="Lahore • Pakistan • Overseas" ariaLabel="Aura Marriage Bureau Home" />

            <div className="flex items-center gap-2.5">
              <Link
                href={isUrdu ? '/ur' : '/'}
                className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(201,162,75,0.25)] bg-[#14100b] px-3 py-1.5 text-xs text-[#a79c82] hover:text-[#ecd290] hover:border-[#d4af61] transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>{isUrdu ? 'واپس ہوم پیج' : 'Back to Home'}</span>
              </Link>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af61]/30 bg-[#d4af61]/10 px-3 py-1.5 font-medium text-[#ecd290] text-[11px] uppercase tracking-wider">
                <ShieldCheck className="h-3 w-3 text-[#d4af61]" />
                {isUrdu ? '100% آپ کی ڈیوائس پر محفوظ' : '100% Private'}
              </span>
            </div>
          </div>

          {/* Main Title & Subtitle */}
          <div className="text-center sm:text-left">
            <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-wide text-[#f4ecda]">
              {isUrdu ? 'رشتہ پروفائل اسسٹنٹ' : 'Rishta Profile Assistant'}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#a79c82] max-w-xl leading-relaxed">
              {isUrdu
                ? 'مرحلہ وار تفصیلات درج کریں۔ مکمل ہونے کے بعد واٹس ایپ پر براہِ راست اورا میرج بیورو کو ارسال کریں۔ کوئی ڈیٹا ہمارے سرور پر محفوظ نہیں ہوتا۔'
                : 'Fill details step-by-step. Once complete, copy and send directly on WhatsApp to our matrimonial consultant. No data is stored on our servers.'}
            </p>
          </div>

          {/* Discreet Service Badges */}
          <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2 border-t border-[rgba(201,162,75,0.1)]" aria-hidden="true">
            <span className="text-[11px] font-medium text-[#a79c82] uppercase tracking-wider me-1">
              {isUrdu ? 'سروسز:' : 'Serving:'}
            </span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#18140f] border border-[rgba(201,162,75,0.15)] text-[11px] text-[#e6dcc3]">
              <FlagPakistan className="h-3.5 w-3.5" />
              <span>Pakistan</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#18140f] border border-[rgba(201,162,75,0.15)] text-[11px] text-[#e6dcc3]">
              <FlagUK className="h-3.5 w-3.5" />
              <span>UK</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#18140f] border border-[rgba(201,162,75,0.15)] text-[11px] text-[#e6dcc3]">
              <FlagUAE className="h-3.5 w-3.5" />
              <span>UAE</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#18140f] border border-[rgba(201,162,75,0.15)] text-[11px] text-[#e6dcc3]">
              <FlagUS className="h-3.5 w-3.5" />
              <span>USA</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#18140f] border border-[rgba(201,162,75,0.15)] text-[11px] text-[#e6dcc3]">
              <FlagCanada className="h-3.5 w-3.5" />
              <span>Canada</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#18140f] border border-[rgba(201,162,75,0.15)] text-[11px] text-[#e6dcc3]">
              <FlagSaudiArabia className="h-3.5 w-3.5" />
              <span>KSA</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Form Content Container */}
      <main className="relative z-10 mx-auto max-w-3xl px-3 sm:px-6 pt-5 pb-24 sm:pb-16">
        {/* Stepper with Edge Mask Fades */}
        <div className="relative mb-3">
          <div
            ref={tabListRef}
            role="tablist"
            data-lenis-prevent="true"
            aria-label={isUrdu ? 'فارم کے مراحل' : 'Form Steps'}
            className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none snap-x"
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, black 16px, black calc(100% - 16px), transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 16px, black calc(100% - 16px), transparent 100%)',
            }}
          >
            {STEPS.map((step, idx) => {
              const isActive = idx === cur;
              const isDone = idx < cur;
              const StepIcon = step.icon;

              return (
                <button
                  key={step.id}
                  id={`step-tab-${idx}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`step-panel-${idx}`}
                  type="button"
                  onClick={() => goToStep(idx)}
                  className={`shrink-0 snap-center flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#b88a35] via-[#ecd290] to-[#c9a24b] text-[#1a1306] shadow-md scale-105'
                      : isDone
                      ? 'bg-[#1b1712] border border-[#d4af61]/40 text-[#ecd290] hover:border-[#d4af61]'
                      : 'bg-[#14110d] border border-[rgba(201,162,75,0.15)] text-[#a79c82] hover:text-[#f4ecda]'
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                      isActive
                        ? 'bg-[#1a1306] text-[#ecd290]'
                        : isDone
                        ? 'bg-[#d4af61] text-[#1a1306]'
                        : 'bg-white/10 text-[#a79c82]'
                    }`}
                  >
                    {isDone ? '✓' : idx + 1}
                  </span>
                  <span>{isUrdu ? step.ur : step.t}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Thin Gold Progress Bar */}
        <div className="h-1 w-full rounded-full bg-white/10 mb-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#b88a35] via-[#ecd290] to-[#c9a24b] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step Metadata Bar */}
        <div className="flex items-center justify-between text-xs tracking-wide text-[#a79c82] mb-4 px-1">
          <span>
            {isUrdu ? `مرحلہ ${cur + 1} از ${STEPS.length}` : `Step ${cur + 1} of ${STEPS.length}`} ·{' '}
            <strong className="text-[#ecd290] font-medium">
              {isUrdu ? currentStepDef.ur : currentStepDef.en}
            </strong>
          </span>
          <span className="flex items-center gap-1 text-[11px] text-[#a79c82]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {isUrdu ? 'آٹو سیو فعال' : 'Auto-saved locally'}
          </span>
        </div>

        {/* Keep Ready Notice on Step 1 */}
        {cur === 0 && (
          <div className="rounded-xl border border-[#d4af61]/35 bg-[#d4af61]/10 p-3.5 text-xs text-[#cfc4a8] mb-4 flex items-start gap-2.5">
            <Sparkles className="h-4 w-4 text-[#d4af61] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#ecd290] font-semibold">
                {isUrdu ? 'تیار رکھیں:' : 'Keep ready:'}
              </strong>{' '}
              {isUrdu
                ? 'شناختی کارڈ کے مطابق تاریخ پیدائش، تعلیم، بہن بھائیوں کی تفصیل اور پتہ۔ تصاویر یہاں اپلوڈ نہیں ہوتیں، بعد میں واٹس ایپ پر بھیجی جاتی ہیں۔'
                : 'CNIC date of birth, education, sibling details and residence. Photos are never uploaded here; you share them later in WhatsApp.'}
            </div>
          </div>
        )}

        {/* Glassmorphic Wizard Card */}
        <div
          id={`step-panel-${cur}`}
          role="tabpanel"
          aria-labelledby={`step-tab-${cur}`}
          className="rounded-2xl border border-[rgba(201,162,75,0.22)] bg-[#120f0b]/90 p-5 sm:p-8 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
        >
          {/* Step Header */}
          <div className="border-b border-[rgba(201,162,75,0.18)] pb-4 mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-normal tracking-wide text-[#ecd290]">
                {currentStepDef.en}
              </h2>
              <span className="block font-urdu-ui text-sm sm:text-base text-[#a79c82] mt-0.5" dir="rtl">
                {currentStepDef.ur}
              </span>
            </div>

            <div className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d4af61]/30 bg-[#d4af61]/10 text-[#d4af61]">
              {React.createElement(currentStepDef.icon, { className: 'h-5 w-5' })}
            </div>
          </div>

          {/* Form Fields (Steps 1-7) */}
          {cur < 7 ? (
            <div className="space-y-6">
              {(() => {
                const renderField = (field: FieldDef, isInContainer = false) => {
                  const isBad = badFields.has(field.key);
                  const value = formData[field.key] || '';
                  const fieldId = `field-${field.key}`;
                  const labelId = `label-${field.key}`;
                  const errorId = `error-${field.key}`;
                  const hintId = `hint-${field.key}`;

                  return (
                    <div
                      key={field.key}
                      className={`space-y-2 p-3 sm:p-3.5 rounded-xl transition-all ${
                        isBad
                          ? 'bg-rose-950/20 border border-rose-500/40 field-error'
                          : isInContainer
                          ? 'bg-black/35 border border-[rgba(201,162,75,0.14)] hover:border-[rgba(201,162,75,0.28)]'
                          : 'bg-black/20 border border-[rgba(201,162,75,0.08)] hover:border-[rgba(201,162,75,0.18)]'
                      }`}
                    >
                      {/* Bilingual Label Header */}
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <label
                          id={labelId}
                          htmlFor={field.type !== 'radio' ? fieldId : undefined}
                          className="text-xs sm:text-sm font-medium tracking-wide text-[#f4ecda]"
                        >
                          {field.en}
                          {field.required ? (
                            <span className="text-[#d4af61] ms-1 font-bold" aria-hidden="true">
                              *
                            </span>
                          ) : (
                            <span className="text-[#a79c82]/75 text-xs font-normal ms-1.5 lowercase">
                              {isUrdu ? '(اختیاری)' : 'optional'}
                            </span>
                          )}
                        </label>
                        <span className="font-urdu-ui text-xs sm:text-sm text-[#a79c82]" dir="rtl">
                          {field.ur}
                        </span>
                      </div>

                      {/* Radio Group Pill Selectors */}
                      {field.type === 'radio' && field.options ? (
                        <div
                          role="radiogroup"
                          aria-labelledby={labelId}
                          aria-describedby={isBad ? errorId : field.hint ? hintId : undefined}
                          className="flex flex-wrap gap-2 pt-1"
                        >
                          {field.options.map((opt) => {
                            const isChecked = value === opt;
                            const optId = `${fieldId}-${opt
                              .toLowerCase()
                              .replace(/[^a-z0-9]/g, '-')}`;
                            return (
                              <label
                                key={opt}
                                htmlFor={optId}
                                className={`cursor-pointer inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
                                  isChecked
                                    ? 'border-transparent bg-gradient-to-r from-[#b88a35] via-[#ecd290] to-[#c9a24b] text-[#1c1406] font-bold shadow-md'
                                    : isBad
                                    ? 'border-rose-500/60 bg-[#080706]/70 text-[#f4ecda] hover:border-[#d4af61]'
                                    : 'border-[rgba(201,162,75,0.22)] bg-[#080706]/70 text-[#f4ecda] hover:border-[#d4af61]'
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
                                {isChecked && <Check className="h-3.5 w-3.5" />}
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
                          className={`w-full rounded-xl border bg-[#080706]/80 px-3.5 py-3 text-base sm:text-sm text-[#f4ecda] transition-all focus:outline-none focus:border-[#d4af61] focus:ring-2 focus:ring-[#d4af61]/25 ${
                            isBad ? 'border-rose-500' : 'border-[rgba(201,162,75,0.25)]'
                          }`}
                        >
                          <option value="">{isUrdu ? 'منتخب کریں…' : 'Choose an option…'}</option>
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
                          placeholder={field.placeholder}
                          aria-invalid={isBad}
                          aria-describedby={isBad ? errorId : field.hint ? hintId : undefined}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          rows={3}
                          className={`w-full rounded-xl border bg-[#080706]/80 px-3.5 py-3 text-base sm:text-sm text-[#f4ecda] transition-all focus:outline-none focus:border-[#d4af61] focus:ring-2 focus:ring-[#d4af61]/25 resize-y ${
                            isBad ? 'border-rose-500' : 'border-[rgba(201,162,75,0.25)]'
                          }`}
                        />
                      ) : (
                        <input
                          id={fieldId}
                          type={field.type}
                          name={field.key}
                          value={value}
                          placeholder={field.placeholder}
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
                          className={`w-full rounded-xl border bg-[#080706]/80 px-3.5 py-3 text-base sm:text-sm text-[#f4ecda] transition-all focus:outline-none focus:border-[#d4af61] focus:ring-2 focus:ring-[#d4af61]/25 ${
                            isBad ? 'border-rose-500' : 'border-[rgba(201,162,75,0.25)]'
                          }`}
                        />
                      )}

                      {/* Field Hint */}
                      {field.hint && (
                        <p id={hintId} className="text-xs text-[#a79c82] leading-relaxed">
                          {field.hint}
                        </p>
                      )}

                      {/* Field Error */}
                      {isBad && (
                        <p
                          id={errorId}
                          role="alert"
                          className="text-xs text-rose-400 font-medium flex items-center gap-1.5"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{isUrdu ? 'یہ خانہ پُر کرنا لازمی ہے' : 'This field is required.'}</span>
                        </p>
                      )}
                    </div>
                  );
                };

                const historyFields = currentStepDef.f.filter(
                  (f) => MARRIAGE_HISTORY_KEYS.has(f.key) && isFieldVisible(f, formData)
                );

                return currentStepDef.f.map((field) => {
                  if (!isFieldVisible(field, formData)) return null;

                  // Handle Marriage History grouping container
                  if (MARRIAGE_HISTORY_KEYS.has(field.key)) {
                    // Only render the container once at the first visible history field
                    if (historyFields.length > 0 && field.key === historyFields[0].key) {
                      return (
                        <div
                          key="marriage-history-card"
                          className="rounded-2xl border border-[rgba(201,162,75,0.35)] bg-gradient-to-b from-[rgba(212,175,97,0.08)] via-[rgba(18,15,11,0.65)] to-[rgba(12,10,7,0.85)] p-4 sm:p-5 shadow-[0_12px_32px_rgba(0,0,0,0.45)] space-y-4 my-2"
                        >
                          <div className="pb-3 border-b border-[rgba(201,162,75,0.18)]">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <h4 className="font-display text-base font-bold text-[#ecd290] tracking-wide">
                                {isUrdu ? 'ازدواجی تاریخ اور ضروری کوائف' : 'Marriage history'}
                              </h4>
                              <span className="text-[11px] font-sans font-medium text-[#ecd290] bg-[#d4af61]/15 px-2.5 py-0.5 rounded-full border border-[#d4af61]/30">
                                {formData.marital}
                              </span>
                            </div>
                            <p className="text-xs text-[#c4b99f] mt-1 leading-relaxed">
                              {isUrdu
                                ? 'سابقہ یا موجودہ شادی کے بارے میں چند سطور۔ باوقار خاندان سب سے پہلے اس کی وضاحت چاہتے ہیں۔'
                                : 'A few lines about the earlier or present marriage. Families ask about this first.'}
                            </p>
                          </div>

                          <div className="space-y-3.5">
                            {historyFields.map((hField) => renderField(hField, true))}
                          </div>
                        </div>
                      );
                    }

                    // Skip subsequent history fields since they are rendered inside the container above
                    return null;
                  }

                  return renderField(field, false);
                });
              })()}
            </div>
          ) : (
            /* Step 8: Executive Summary & Copy / WhatsApp */
            <div className="space-y-6">
              {(() => {
                const missing = getMissingFields();
                if (missing.length > 0) {
                  return (
                    <div className="rounded-xl border border-rose-500/40 bg-rose-950/20 p-4 text-xs sm:text-sm text-rose-300">
                      <div className="flex items-center gap-2 font-semibold mb-2 text-rose-200">
                        <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                        <span>
                          {isUrdu ? 'مندرجہ ذیل لازمی خانے خالی ہیں:' : 'Required fields still missing:'}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {missing.map((item) => (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() => goToStep(item.stepIdx, item.key)}
                            className="inline-flex items-center gap-1 rounded-full bg-rose-900/40 border border-rose-500/30 px-2.5 py-1 text-xs text-rose-200 hover:bg-rose-800/60 transition-colors"
                          >
                            <span>{item.name}</span>
                            <span className="text-[10px] text-rose-400">({item.stepName})</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-4 text-xs sm:text-sm text-emerald-200 flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <strong className="block font-semibold text-emerald-100">
                        {isUrdu ? 'پروفائل مکمل ہے!' : 'All required details completed!'}
                      </strong>
                      <span className="text-xs text-emerald-300/90">
                        {isUrdu
                          ? 'آپ فارم کاپی کر سکتے ہیں یا واٹس ایپ پر براہِ راست بھیج سکتے ہیں۔'
                          : 'You can copy the formatted profile or dispatch it directly on WhatsApp.'}
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Summary Cards with quick Edit triggers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STEPS.slice(0, 7).map((step, idx) => {
                  const filledCount = step.f.filter(
                    (f) =>
                      isFieldVisible(f, formData) && String(formData[f.key] || '').trim().length > 0
                  ).length;

                  return (
                    <div
                      key={step.id}
                      className="rounded-xl border border-[rgba(201,162,75,0.18)] bg-[#0c0a08]/80 p-3.5 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#d4af61]/10 text-[#d4af61]">
                          {React.createElement(step.icon, { className: 'h-4 w-4' })}
                        </div>
                        <div className="truncate">
                          <div className="text-xs font-semibold text-[#f4ecda] truncate">
                            {isUrdu ? step.ur : step.t}
                          </div>
                          <div className="text-[11px] text-[#a79c82]">
                            {filledCount} {isUrdu ? 'خانے درج' : 'items entered'}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => goToStep(idx)}
                        className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-[rgba(201,162,75,0.2)] px-2 py-1 text-[11px] text-[#ecd290] hover:bg-[#d4af61]/10 transition-colors"
                      >
                        <Edit3 className="h-3 w-3" />
                        <span>{isUrdu ? 'ترمیم' : 'Edit'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Formatted Text Box */}
              <div>
                <div className="flex items-center justify-between text-xs text-[#a79c82] mb-2 px-1">
                  <span>{isUrdu ? 'واٹس ایپ ٹیکسٹ کا نمونہ:' : 'Formatted WhatsApp Message Preview:'}</span>
                  <span className="font-mono text-[11px]">UTF-8 Text</span>
                </div>
                <pre className="max-h-[300px] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-[rgba(201,162,75,0.22)] bg-[#080706]/90 p-4 font-mono text-xs leading-relaxed text-[#eadfc4] selection:bg-[#d4af61]/30">
                  {buildOutputText()}
                </pre>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {/* Copy Button with Strict Text Rules */}
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`w-full text-center text-xs font-bold py-3.5 px-4 rounded-full flex items-center justify-center gap-2 shadow-lg transition-all ${
                    copied
                      ? 'bg-emerald-600 text-white'
                      : 'btn-gold'
                  }`}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span>
                    {copied
                      ? isUrdu
                        ? 'کاپی ہو گیا ✓ اب واٹس ایپ میں پیسٹ کریں'
                        : 'Copied ✓ Now paste in WhatsApp'
                      : isUrdu
                      ? 'پروفائل کاپی کریں'
                      : 'Copy Profile Text'}
                  </span>
                </button>

                {/* WhatsApp Button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleOpenWhatsApp}
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[#25d366] px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-[#052e14] shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  <span>{isUrdu ? 'واٹس ایپ پر بھیجیں' : 'Open WhatsApp'}</span>
                </a>

                {/* Clear Data Button */}
                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-[rgba(201,162,75,0.25)] px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#a79c82] hover:text-rose-400 hover:border-rose-500/50 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>{isUrdu ? 'ڈیٹا صاف کریں' : 'Clear Form'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Desktop/Card In-Flow Navigation */}
          <div className="mt-8 flex items-center justify-between gap-3 border-t border-[rgba(201,162,75,0.15)] pt-5">
            <button
              type="button"
              onClick={() => goToStep(cur - 1)}
              disabled={cur === 0}
              className={`inline-flex items-center gap-2 rounded-full border border-[rgba(201,162,75,0.25)] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#a79c82] transition-colors hover:text-[#ecd290] hover:border-[#d4af61] ${
                cur === 0 ? 'opacity-30 cursor-not-allowed' : ''
              }`}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{isUrdu ? 'پیچھے' : 'Back'}</span>
            </button>

            {cur < 7 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn-gold inline-flex items-center gap-2 text-xs font-semibold px-6 py-2.5 shadow-md"
              >
                <span>{isUrdu ? `اگلا: ${STEPS[cur + 1].ur}` : `Next: ${STEPS[cur + 1].t}`}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleClear}
                className="rounded-full border border-[rgba(201,162,75,0.25)] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#a79c82] hover:text-rose-400 hover:border-rose-500/50 transition-colors"
              >
                {isUrdu ? 'فارم صاف کریں' : 'Clear Form'}
              </button>
            )}
          </div>

          {/* Secondary Reset trigger */}
          {cur < 7 && (
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-[#a79c82] hover:text-rose-400 transition-colors underline"
              >
                {isUrdu ? 'محفوظ ڈیٹا صاف کریں' : 'Reset / Clear saved data'}
              </button>
            </div>
          )}
        </div>

        {/* Quiet Reassurance Banner Below Form */}
        <div className="mt-8 rounded-2xl border border-[rgba(201,162,75,0.22)] bg-gradient-to-b from-[#14100b]/80 via-[#0d0b08]/90 to-[#070605] p-5 sm:p-6 text-center text-xs text-[#a79c82] flex flex-col items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
          <BrandLogo
            size="md"
            layout="vertical"
            asLink
            href={isUrdu ? '/ur' : '/'}
            locationSuffix="Lahore • Pakistan • Overseas"
            className="mb-3.5"
          />
          <p className="font-display font-medium text-xs sm:text-sm text-[#ecd290] tracking-wide flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span>{isUrdu ? 'خاندانی وقار' : 'Family-Led Dignity'}</span>
            <span className="text-[#d4af61]/60" aria-hidden="true">•</span>
            <span>{isUrdu ? 'مکمل رازداری' : 'Complete Discretion'}</span>
            <span className="text-[#d4af61]/60" aria-hidden="true">•</span>
            <span>{isUrdu ? 'براہِ راست فیملی رابطہ' : 'Direct Matchmaking'}</span>
          </p>

          <div
            className="mt-2.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] text-[#a79c82] leading-relaxed max-w-xl mx-auto"
            dir={isUrdu ? 'rtl' : 'ltr'}
          >
            {isUrdu ? (
              <>
                <span>اورا میرج بیورو، لاہور</span>
                <span className="text-[#d4af61]/50" aria-hidden="true">•</span>
                <span className="whitespace-nowrap">کنسلٹنٹ: {SITE_CONFIG.consultant}</span>
                <span className="text-[#d4af61]/50" aria-hidden="true">•</span>
                <span className="whitespace-nowrap">
                  رہنمائی و معلومات:{' '}
                  <bdi dir="ltr" className="text-[#ecd290]/90 font-medium">
                    {SITE_CONFIG.phone}
                  </bdi>
                </span>
              </>
            ) : (
              <>
                <span>Aura Marriage Bureau, Lahore</span>
                <span className="text-[#d4af61]/50" aria-hidden="true">•</span>
                <span className="whitespace-nowrap">Consultant: {SITE_CONFIG.consultant}</span>
                <span className="text-[#d4af61]/50" aria-hidden="true">•</span>
                <span className="whitespace-nowrap">
                  Inquiries:{' '}
                  <span className="text-[#ecd290]/90 font-medium">{SITE_CONFIG.phone}</span>
                </span>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Floating Bottom Bar on Mobile */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 border-t border-[rgba(201,162,75,0.22)] bg-[#0a0908]/95 px-4 py-3 backdrop-blur-lg safe-bottom">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => goToStep(cur - 1)}
            disabled={cur === 0}
            className={`rounded-full border border-[rgba(201,162,75,0.25)] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#a79c82] ${
              cur === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:text-[#ecd290]'
            }`}
          >
            {isUrdu ? 'پیچھے' : 'Back'}
          </button>

          <span className="text-[11px] font-medium text-[#ecd290]">
            {cur + 1} / {STEPS.length}
          </span>

          {cur < 7 ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn-gold px-5 py-2 text-xs font-bold shadow-md"
            >
              {isUrdu ? 'اگلا' : 'Next'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCopy}
              className={`px-4 py-2 text-xs font-bold rounded-full shadow-md transition-all ${
                copied ? 'bg-emerald-600 text-white' : 'btn-gold'
              }`}
            >
              {copied ? '✓' : isUrdu ? 'کاپی' : 'Copy'}
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        cancelText={confirmModal.cancelText}
        variant={confirmModal.variant}
        icon={confirmModal.icon}
        isUrdu={isUrdu}
      />
    </div>
  );
};
