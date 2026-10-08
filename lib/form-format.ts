import { SITE_CONFIG } from './config';
import { ProfileFormData } from './form-store';

const DIVIDER = "➖➖➖➖➖➖➖➖➖";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Normalize Eastern Arabic / Persian numerals
export const normalizeNumerals = (str: string): string => {
  return (str || "")
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632));
};

export const cleanText = (str?: string | null): string => {
  return normalizeNumerals(str ?? "").replace(/\s+/g, " ").trim();
};

export const formatHeight = (val: string): string => {
  if (!val) return "";
  const num = parseInt(val, 10);
  if (!Number.isNaN(num) && num >= 48 && num <= 96) {
    const feet = Math.floor(num / 12);
    const inches = num % 12;
    return `${feet}'${inches}"`;
  }
  return val;
};

export const formatPhone = (input: string): string => {
  const raw = normalizeNumerals(input).trim();
  if (!raw) return "";
  let clean = raw.replace(/[^\d+]/g, "").replace(/(?!^)\+/g, "");
  if (clean.startsWith("00")) {
    clean = "+" + clean.slice(2);
  }
  if (/^03\d{9}$/.test(clean)) {
    clean = "+92" + clean.slice(1);
  }
  if (/^923\d{9}$/.test(clean)) {
    clean = "+" + clean;
  }
  const match = /^\+92(3\d{2})(\d{7})$/.exec(clean);
  if (match) {
    return `+92 ${match[1]} ${match[2]}`;
  }
  return clean.startsWith("+") ? clean : raw;
};

export const isValidPhone = (input: string): boolean => {
  const digits = normalizeNumerals(input).replace(/[^\d]/g, "");
  if (!digits) return false;
  if (/^03/.test(digits)) return digits.length === 11;
  if (/^923/.test(digits)) return digits.length === 12;
  return digits.length >= 8 && digits.length <= 15;
};

export const calculateAgeFromDob = (dobStr: string, refDate = new Date()): number | null => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dobStr);
  if (!match) return null;
  const year = +match[1];
  const month = +match[2];
  const day = +match[3];
  let age = refDate.getFullYear() - year;
  if (
    refDate.getMonth() + 1 < month ||
    (refDate.getMonth() + 1 === month && refDate.getDate() < day)
  ) {
    age--;
  }
  return age;
};

export const formatDobDisplay = (dobStr: string): string => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dobStr);
  if (!match) return "";
  const monthIdx = +match[2] - 1;
  return `${+match[3]} ${MONTHS[monthIdx]} ${match[1]}`;
};

const filterRows = (rows: [string, string][]): string[] => {
  return rows
    .filter(([, val]) => val !== "")
    .map(([label, val]) => `*${label}* ${val}`);
};

/**
 * Builds the exact WhatsApp output format required by Aura Marriage Bureau
 */
export function generateWhatsAppProfileText(formData: ProfileFormData, date = new Date()): string {
  const lines: string[] = [];

  const addSection = (title: string, sectionLines: string[]) => {
    if (sectionLines.length > 0) {
      lines.push(`🔸 *\`${title}\`*`, ...sectionLines, DIVIDER);
    }
  };

  // Header
  lines.push(
    `*${SITE_CONFIG.name.toUpperCase()}*`,
    "",
    "*Marriage Consultant*",
    `*${SITE_CONFIG.consultant}*`,
    DIVIDER,
    `*Date:* ${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`,
    DIVIDER
  );

  // Age calculation
  const computedAge = calculateAgeFromDob(formData.dob, date);
  const finalAge = cleanText(formData.age) || (computedAge !== null ? String(computedAge) : "");

  // Sect & Nationality
  const sectDisplay = formData.sect === "Other"
    ? cleanText(formData.sectOther)
    : formData.sect === "Sunni" && formData.sectSub
      ? `Sunni (${formData.sectSub})`
      : formData.sect;

  const nationalityDisplay = formData.nationality === "Other"
    ? cleanText(formData.nationalityOther)
    : formData.nationality === "Dual nationality" && cleanText(formData.nationalityOther)
      ? `Pakistani + ${cleanText(formData.nationalityOther)} (dual)`
      : formData.nationality;

  // BASIC INFORMATION
  addSection(
    "BASIC INFORMATION",
    filterRows([
      ["Name:", cleanText(formData.name)],
      ["Father's Name:", cleanText(formData.fatherName)],
      ["Gender:", formData.gender],
      ["Age:", finalAge],
      ["Date of Birth (as per CNIC):", formatDobDisplay(formData.dob)],
      ["Place of Birth:", cleanText(formData.placeOfBirth)],
      ["Father's Caste:", cleanText(formData.fatherCaste)],
      ["Mother's Caste:", cleanText(formData.motherCaste)],
      ["Migrated or Local:", formData.migrated],
      ["Height:", formatHeight(formData.height)],
      ["Marital Status:", formData.marital],
      ["If Divorce/Khula then reason of Divorce/Khula:", ["Divorced", "Khula"].includes(formData.marital) ? cleanText(formData.divorceReason) : ""],
      ["Kids Detail:", ["Divorced", "Khula", "Widow", "Widower"].includes(formData.marital) ? cleanText(formData.kids) : ""],
      ["Any Disability/Disease:", formData.disability === "Yes" ? cleanText(formData.disabilityDetail) || "Yes" : formData.disability],
      ["Religion/Sect/Maslik:", formData.sect === "Other" ? sectDisplay : sectDisplay ? `Islam / ${sectDisplay}` : ""],
      ["Nationality:", nationalityDisplay],
    ])
  );

  // EDUCATION
  const eduLines = formData.education
    .map((edu) => {
      const degree = cleanText(edu.degree);
      if (!degree) return "";
      const inst = cleanText(edu.institute);
      const yr = cleanText(edu.year);
      return `▪️ ${degree}${inst ? ` — ${inst}` : ""}${yr ? ` (${yr})` : ""}`;
    })
    .filter(Boolean);
  addSection("EDUCATION", eduLines);

  // JOB / BUSINESS
  let jobLines: string[] = [];
  if (formData.jobStatus === "Not working" || formData.jobStatus === "Student") {
    jobLines = [`▪️ ${formData.jobStatus}`];
  } else {
    jobLines = formData.jobs
      .map((job) => {
        const title = cleanText(job.title);
        if (!title) return "";
        const org = cleanText(job.org);
        const inc = cleanText(job.income);
        return `▪️ ${formData.jobStatus === "Business" ? "Business: " : ""}${title}${org ? ` — ${org}` : ""}${inc ? ` · Income: ${inc}` : ""}`;
      })
      .filter(Boolean);
  }
  addSection("JOB / BUSINESS", jobLines);

  // FAMILY DETAILS
  const formatCount = (val: string) => (val === "" ? "" : val === "0" ? "None" : val);
  const hasBrothers = formData.brothers !== "" && formData.brothers !== "0";
  const hasSisters = formData.sisters !== "" && formData.sisters !== "0";

  addSection(
    "FAMILY DETAILS",
    filterRows([
      ["Father:", cleanText(formData.father)],
      ["Mother:", cleanText(formData.mother)],
      ["Brothers:", formatCount(formData.brothers)],
      ["Qualification & Profession (if any):", hasBrothers ? cleanText(formData.brothersDetail) : ""],
      ["Married Brothers:", hasBrothers ? formatCount(formData.brothersMarried) : ""],
      ["Sisters:", formatCount(formData.sisters)],
      ["Qualification & Profession (if any):", hasSisters ? cleanText(formData.sistersDetail) : ""],
      ["Married Sisters:", hasSisters ? formatCount(formData.sistersMarried) : ""],
    ])
  );

  // RESIDENTIAL STATUS
  const houseParts = [
    formData.houseType ? `${formData.houseType === "Own" ? "Own" : "Rented"} house` : "",
    cleanText(formData.houseSize) ? `${cleanText(formData.houseSize)} ${formData.houseUnit}` : "",
    cleanText(formData.houseArea),
  ].filter(Boolean).join(", ");

  const areaStr = cleanText(formData.houseArea);
  const cityStr = cleanText(formData.city);
  const presentResidence = cityStr.toLowerCase().startsWith(areaStr.toLowerCase())
    ? cityStr
    : [areaStr, cityStr].filter(Boolean).join(", ");

  addSection(
    "RESIDENTIAL STATUS",
    filterRows([
      ["House Details:", houseParts],
      ["Present Residence:", presentResidence],
      ["Permanent Residence:", formData.permanentSame ? "Same as present" : cleanText(formData.permanentResidence)],
      ["Complete Address:", cleanText(formData.address)],
    ])
  );

  // CONTACT DETAILS
  const candidateContact = formatPhone(formData.contact);
  const waContact = formData.whatsappSame ? candidateContact : formatPhone(formData.whatsapp);

  addSection(
    "CONTACT DETAILS",
    filterRows([
      ["Contact No.", candidateContact],
      ["WhatsApp No.", waContact],
      ["Parents / Guardian Contact No.", formatPhone(formData.guardianContact)],
      ["Landline No.", cleanText(formData.landline)],
      ["Fresh Complete 2-3 Pictures of Candidate (Compulsory):", "Will be sent on WhatsApp"],
      ["LinkedIn Id:", cleanText(formData.linkedin)],
    ])
  );

  // REQUIREMENTS
  let reqHeightStr = "";
  if (formData.reqHeightAny) {
    reqHeightStr = "Any";
  } else if (formData.reqHeightFrom && formData.reqHeightTo) {
    reqHeightStr = formData.reqHeightFrom === formData.reqHeightTo
      ? formatHeight(formData.reqHeightFrom)
      : `${formatHeight(formData.reqHeightFrom)} – ${formatHeight(formData.reqHeightTo)}`;
  } else if (formData.reqHeightFrom) {
    reqHeightStr = `${formatHeight(formData.reqHeightFrom)} or more`;
  } else if (formData.reqHeightTo) {
    reqHeightStr = `Up to ${formatHeight(formData.reqHeightTo)}`;
  }

  const reqMaritalStr = formData.reqMarital.includes("Any")
    ? "Any"
    : formData.reqMarital
        .map((m) => (m === "Widow/Widower" ? "Widow / Widower" : m))
        .join(", ");

  let reqCountryStr = "";
  if (formData.reqCountry === "Pakistan") {
    reqCountryStr = "Pakistan";
  } else if (formData.reqCountry) {
    reqCountryStr = `${formData.reqCountry}${cleanText(formData.reqCountryWhich) ? ` (${cleanText(formData.reqCountryWhich)})` : ""}`;
  }

  const formatAgeRange = (from: string, to: string) => {
    const f = cleanText(from);
    const t = cleanText(to);
    if (f && t) return f === t ? `${f} years` : `${f} – ${t} years`;
    if (f) return `${f} years or more`;
    if (t) return `Up to ${t} years`;
    return "";
  };

  addSection(
    "REQUIREMENTS",
    filterRows([
      ["Age:", formatAgeRange(formData.reqAgeFrom, formData.reqAgeTo)],
      ["Caste:", formData.reqCasteAny ? "Any" : cleanText(formData.reqCaste)],
      ["Height:", reqHeightStr],
      ["Marital Status:", reqMaritalStr],
      ["Education:", formData.reqEducationAny ? "Any" : cleanText(formData.reqEducation)],
      ["Profession:", cleanText(formData.reqProfession)],
      ["City:", formData.reqCityAny ? "Any" : cleanText(formData.reqCity)],
      ["Country:", reqCountryStr],
    ])
  );

  // Optional Additional Demands
  const resAfter = cleanText(formData.residenceAfter);
  if (resAfter) {
    lines.push("*▪️Girl's Residence After Marriage*", resAfter, DIVIDER);
  }

  const otherDemands = cleanText(formData.other);
  if (otherDemands) {
    lines.push("*▪️Any other Details / Demand*", otherDemands, DIVIDER);
  }

  // Footer
  lines.push(
    `*${SITE_CONFIG.consultant}*`,
    `*${SITE_CONFIG.phone}* _(WhatsApp)_`,
    `*${SITE_CONFIG.email}*`,
    `📍 *${SITE_CONFIG.city}, ${SITE_CONFIG.country}*`,
    "",
    `*Facebook:* ${SITE_CONFIG.facebookName}`,
    `*Instagram:* ${SITE_CONFIG.instagramHandle}`,
    DIVIDER
  );

  return lines.join("\n");
}
