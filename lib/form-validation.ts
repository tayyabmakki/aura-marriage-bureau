import { ProfileFormData } from './form-store';
import { calculateAgeFromDob, cleanText, isValidPhone } from './form-format';

export interface FormError {
  id: string;
  step: number;
  label: { en: string; ur: string };
  msg: { en: string; ur: string };
}

export function validateForm(data: ProfileFormData, targetStep?: number): FormError[] {
  const errors: FormError[] = [];

  const add = (
    id: string,
    step: number,
    label: [string, string],
    msg: [string, string]
  ) => {
    if (targetStep === undefined || targetStep === step) {
      errors.push({
        id,
        step,
        label: { en: label[0], ur: label[1] },
        msg: { en: msg[0], ur: msg[1] },
      });
    }
  };

  // STEP 0: Basic
  // Note: Name is optional per prompt rules
  if (!data.gender) {
    add("gender", 0, ["Gender", "جنس"], ["Please choose male or female.", "براہِ کرم لڑکا یا لڑکی منتخب کریں۔"]);
  }

  const computedAge = calculateAgeFromDob(data.dob);
  const enteredAge = parseInt(cleanText(data.age), 10);
  const effectiveAge = !Number.isNaN(enteredAge) ? enteredAge : computedAge;

  if (effectiveAge === null || Number.isNaN(effectiveAge)) {
    add("age", 0, ["Age", "عمر"], ["Please enter age or date of birth.", "براہِ کرم عمر یا تاریخِ پیدائش درج کریں۔"]);
  } else if (effectiveAge < 18 || effectiveAge > 70) {
    add("age", 0, ["Age", "عمر"], ["Age must be between 18 and 70.", "عمر 18 سے 70 سال کے درمیان ہونی چاہیے۔"]);
  }

  if (!data.height) {
    add("height", 0, ["Height", "قد"], ["Please choose height.", "براہِ کرم قد منتخب کریں۔"]);
  }

  if (!cleanText(data.fatherCaste)) {
    add("fatherCaste", 0, ["Father's caste", "والد کی ذات"], ["Please enter the caste.", "براہِ کرم ذات درج کریں۔"]);
  }

  if (!data.marital) {
    add("marital", 0, ["Marital status", "ازدواجی حیثیت"], ["Please choose marital status.", "براہِ کرم ازدواجی حیثیت منتخب کریں۔"]);
  }

  if (!data.sect) {
    add("sect", 0, ["Religion / sect", "مذہب / فرقہ"], ["Please choose sect.", "براہِ کرم فرقہ منتخب کریں۔"]);
  } else if (data.sect === "Other" && !cleanText(data.sectOther)) {
    add("sectOther", 0, ["Religion / sect", "مذہب / فرقہ"], ["Please specify religion or sect.", "براہِ کرم مذہب یا فرقہ لکھیں۔"]);
  }

  if (!data.disability) {
    add("disability", 0, ["Any disability / disease", "کوئی معذوری / بیماری"], ["Please choose Yes or No.", "براہِ کرم جی ہاں یا نہیں منتخب کریں۔"]);
  } else if (data.disability === "Yes" && !cleanText(data.disabilityDetail)) {
    add("disabilityDetail", 0, ["Disability / disease details", "معذوری / بیماری کی تفصیل"], ["Please describe disability or medical details.", "براہِ کرم تفصیل لکھیں۔"]);
  }

  // STEP 1: Education
  if (!cleanText(data.education[0]?.degree)) {
    add("edu-0-degree", 1, ["Education", "تعلیم"], ["Please enter highest degree.", "براہِ کرم اعلیٰ ترین ڈگری درج کریں۔"]);
  }

  // STEP 2: Job
  if (!data.jobStatus) {
    add("jobStatus", 2, ["Profession", "پیشہ"], ["Please choose profession status.", "براہِ کرم ملازمت، کاروبار، ملازمت نہیں یا طالب علم منتخب کریں۔"]);
  } else if (
    (data.jobStatus === "Job" || data.jobStatus === "Business") &&
    !cleanText(data.jobs[0]?.title)
  ) {
    add(
      "job-0-title",
      2,
      ["Profession", "پیشہ"],
      data.jobStatus === "Job"
        ? ["Please enter job title / designation.", "براہِ کرم عہدہ درج کریں۔"]
        : ["Please describe your business.", "براہِ کرم کاروبار کی تفصیل لکھیں۔"]
    );
  }

  // STEP 3: Family
  if (!cleanText(data.father)) {
    add("father", 3, ["Father", "والد"], ['Please write father\'s status or occupation (e.g. "Late").', 'براہِ کرم والد کا پیشہ لکھیں (یا "مرحوم")۔']);
  }

  const numBrothers = parseInt(cleanText(data.brothers), 10);
  const numBrothersMarried = parseInt(cleanText(data.brothersMarried), 10);
  if (!Number.isNaN(numBrothers) && !Number.isNaN(numBrothersMarried) && numBrothersMarried > numBrothers) {
    add("brothersMarried", 3, ["Married brothers", "شادی شدہ بھائی"], ["Married brothers cannot exceed total brothers.", "شادی شدہ بھائی کل بھائیوں سے زیادہ نہیں ہو سکتے۔"]);
  }

  const numSisters = parseInt(cleanText(data.sisters), 10);
  const numSistersMarried = parseInt(cleanText(data.sistersMarried), 10);
  if (!Number.isNaN(numSisters) && !Number.isNaN(numSistersMarried) && numSistersMarried > numSisters) {
    add("sistersMarried", 3, ["Married sisters", "شادی شدہ بہنیں"], ["Married sisters cannot exceed total sisters.", "شادی شدہ بہنیں کل بہنوں سے زیادہ نہیں ہو سکتیں۔"]);
  }

  // STEP 4: Residence
  if (!data.houseType) {
    add("houseType", 4, ["House details", "گھر"], ["Please select own or rented house.", "براہِ کرم اپنا یا کرائے کا منتخب کریں۔"]);
  }
  if (!cleanText(data.houseSize)) {
    add("houseSize", 4, ["House size", "گھر کا سائز"], ["Please enter house size.", "براہِ کرم گھر کا سائز درج کریں۔"]);
  }
  if (!cleanText(data.houseArea)) {
    add("houseArea", 4, ["Area", "علاقہ"], ["Please enter residential area.", "براہِ کرم علاقہ درج کریں۔"]);
  }
  if (!cleanText(data.city)) {
    add("city", 4, ["City", "شہر"], ["Please enter city.", "براہِ کرم شہر درج کریں۔"]);
  }

  // STEP 5: Contact
  if (!cleanText(data.guardianContact)) {
    add("guardianContact", 5, ["Parent's contact", "والدین کا نمبر"], ["Please enter parents or guardian contact number.", "براہِ کرم والدین یا سرپرست کا نمبر درج کریں۔"]);
  } else if (!isValidPhone(data.guardianContact)) {
    add("guardianContact", 5, ["Parent's contact", "والدین کا نمبر"], ["Please enter a valid phone number (e.g. 0300 1234567).", "براہِ کرم درست فون نمبر درج کریں۔"]);
  }

  if (cleanText(data.contact) && !isValidPhone(data.contact)) {
    add("contact", 5, ["Contact number", "رابطہ نمبر"], ["Please check contact number format.", "براہِ کرم فون نمبر چیک کریں۔"]);
  }

  if (!data.whatsappSame && cleanText(data.whatsapp) && !isValidPhone(data.whatsapp)) {
    add("whatsapp", 5, ["WhatsApp number", "واٹس ایپ نمبر"], ["Please check WhatsApp number format.", "براہِ کرم واٹس ایپ نمبر چیک کریں۔"]);
  }

  // STEP 6: Requirements
  const reqAgeFrom = parseInt(cleanText(data.reqAgeFrom), 10);
  const reqAgeTo = parseInt(cleanText(data.reqAgeTo), 10);
  if (Number.isNaN(reqAgeFrom) && Number.isNaN(reqAgeTo)) {
    add("reqAgeFrom", 6, ["Required age", "مطلوبہ عمر"], ["Please enter the desired age range.", "براہِ کرم عمر کی حد درج کریں۔"]);
  } else {
    if (!Number.isNaN(reqAgeFrom) && (reqAgeFrom < 18 || reqAgeFrom > 80)) {
      add("reqAgeFrom", 6, ["Required age", "مطلوبہ عمر"], ["Age must be between 18 and 80.", "عمر 18 سے 80 سال کے درمیان ہو۔"]);
    }
    if (!Number.isNaN(reqAgeTo) && (reqAgeTo < 18 || reqAgeTo > 80)) {
      add("reqAgeTo", 6, ["Required age", "مطلوبہ عمر"], ["Age must be between 18 and 80.", "عمر 18 سے 80 سال کے درمیان ہو۔"]);
    }
    if (!Number.isNaN(reqAgeFrom) && !Number.isNaN(reqAgeTo) && reqAgeFrom > reqAgeTo) {
      add("reqAgeFrom", 6, ["Required age", "مطلوبہ عمر"], ['"From" age cannot be higher than "To" age.', 'کم از کم عمر زیادہ سے زیادہ عمر سے کم ہونی چاہیے۔']);
    }
  }

  if (!data.reqHeightAny && !data.reqHeightFrom && !data.reqHeightTo) {
    add("reqHeightFrom", 6, ["Required height", "مطلوبہ قد"], ['Please choose height range or tap "Any".', 'براہِ کرم قد منتخب کریں یا "کوئی بھی" پر ٹیپ کریں۔']);
  }

  if (!data.reqCasteAny && !cleanText(data.reqCaste)) {
    add("reqCaste", 6, ["Required caste", "مطلوبہ ذات"], ['Please enter caste or tap "Any".', 'براہِ کرم ذات لکھیں یا "کوئی بھی" پر ٹیپ کریں۔']);
  }

  if (!data.reqCityAny && !cleanText(data.reqCity)) {
    add("reqCity", 6, ["Required city", "مطلوبہ شہر"], ['Please enter city or tap "Any".', 'براہِ کرم شہر لکھیں یا "کوئی بھی" پر ٹیپ کریں۔']);
  }

  if (!data.reqCountry) {
    add("reqCountry", 6, ["Required country", "مطلوبہ ملک"], ["Please choose Pakistan, overseas, or both.", "براہِ کرم پاکستان، بیرونِ ملک یا دونوں منتخب کریں۔"]);
  }

  // STEP 7: Review & Terms
  if (!data.terms) {
    add("terms", 7, ["Terms & Conditions", "شرائط و ضوابط"], ["Please accept the Terms & Conditions.", "براہِ کرم شرائط و ضوابط قبول کریں۔"]);
  }

  return errors;
}
