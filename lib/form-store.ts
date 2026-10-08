import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface EducationItem {
  degree: string;
  institute: string;
  year: string;
}

export interface JobItem {
  title: string;
  org: string;
  income: string;
}

export interface ProfileFormData {
  // Step 1: Basic
  name: string;
  fatherName: string;
  gender: string;
  age: string;
  dob: string;
  placeOfBirth: string;
  fatherCaste: string;
  motherCaste: string;
  migrated: string;
  height: string;
  marital: string;
  divorceReason: string;
  kids: string;
  disability: string;
  disabilityDetail: string;
  sect: string;
  sectSub: string;
  sectOther: string;
  nationality: string;
  nationalityOther: string;

  // Step 2: Education
  education: EducationItem[];

  // Step 3: Job / Profession
  jobStatus: string;
  jobs: JobItem[];

  // Step 4: Family
  father: string;
  mother: string;
  brothers: string;
  brothersMarried: string;
  brothersDetail: string;
  sisters: string;
  sistersMarried: string;
  sistersDetail: string;

  // Step 5: Residence
  houseType: string;
  houseSize: string;
  houseUnit: string;
  houseArea: string;
  city: string;
  permanentSame: boolean;
  permanentResidence: string;
  address: string;

  // Step 6: Contact
  contact: string;
  whatsappSame: boolean;
  whatsapp: string;
  guardianContact: string;
  landline: string;
  linkedin: string;

  // Step 7: Requirements
  reqAgeFrom: string;
  reqAgeTo: string;
  reqHeightAny: boolean;
  reqHeightFrom: string;
  reqHeightTo: string;
  reqCasteAny: boolean;
  reqCaste: string;
  reqMarital: string[];
  reqEducationAny: boolean;
  reqEducation: string;
  reqProfession: string;
  reqCityAny: boolean;
  reqCity: string;
  reqCountry: string;
  reqCountryWhich: string;
  residenceAfter: string;
  other: string;

  // Step 8: Terms
  terms: boolean;
  consentSubmit?: boolean;
}

export const initialFormData: ProfileFormData = {
  name: "",
  fatherName: "",
  gender: "",
  age: "",
  dob: "",
  placeOfBirth: "",
  fatherCaste: "",
  motherCaste: "",
  migrated: "",
  height: "",
  marital: "",
  divorceReason: "",
  kids: "",
  disability: "",
  disabilityDetail: "",
  sect: "",
  sectSub: "",
  sectOther: "",
  nationality: "Pakistani",
  nationalityOther: "",

  education: [{ degree: "", institute: "", year: "" }],

  jobStatus: "",
  jobs: [{ title: "", org: "", income: "" }],

  father: "",
  mother: "",
  brothers: "",
  brothersMarried: "",
  brothersDetail: "",
  sisters: "",
  sistersMarried: "",
  sistersDetail: "",

  houseType: "",
  houseSize: "",
  houseUnit: "Marla",
  houseArea: "",
  city: "",
  permanentSame: false,
  permanentResidence: "",
  address: "",

  contact: "",
  whatsappSame: false,
  whatsapp: "",
  guardianContact: "",
  landline: "",
  linkedin: "",

  reqAgeFrom: "",
  reqAgeTo: "",
  reqHeightAny: false,
  reqHeightFrom: "",
  reqHeightTo: "",
  reqCasteAny: false,
  reqCaste: "",
  reqMarital: [],
  reqEducationAny: false,
  reqEducation: "",
  reqProfession: "",
  reqCityAny: false,
  reqCity: "",
  reqCountry: "",
  reqCountryWhich: "",
  residenceAfter: "",
  other: "",

  terms: false,
  consentSubmit: false,
};

interface FormStore {
  data: ProfileFormData;
  currentStep: number;
  updateField: <K extends keyof ProfileFormData>(key: K, value: ProfileFormData[K]) => void;
  updateNestedEducation: (index: number, field: keyof EducationItem, value: string) => void;
  addEducation: () => void;
  removeEducation: (index: number) => void;
  updateNestedJob: (index: number, field: keyof JobItem, value: string) => void;
  addJob: () => void;
  removeJob: (index: number) => void;
  setStep: (step: number) => void;
  resetForm: () => void;
}

// Safe storage wrapper in case localStorage is blocked or restricted
const safeStorage = {
  getItem: (name: string): string | null => {
    try {
      return localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    try {
      localStorage.setItem(name, value);
    } catch {}
  },
  removeItem: (name: string): void => {
    try {
      localStorage.removeItem(name);
    } catch {}
  },
};

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      data: initialFormData,
      currentStep: 0,

      updateField: (key, value) =>
        set((state) => ({
          data: {
            ...state.data,
            [key]: value,
          },
        })),

      updateNestedEducation: (index, field, value) =>
        set((state) => {
          const newEdu = [...state.data.education];
          if (newEdu[index]) {
            newEdu[index] = { ...newEdu[index], [field]: value };
          }
          return { data: { ...state.data, education: newEdu } };
        }),

      addEducation: () =>
        set((state) => ({
          data: {
            ...state.data,
            education: [...state.data.education, { degree: "", institute: "", year: "" }],
          },
        })),

      removeEducation: (index) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.filter((_, i) => i !== index),
          },
        })),

      updateNestedJob: (index, field, value) =>
        set((state) => {
          const newJobs = [...state.data.jobs];
          if (newJobs[index]) {
            newJobs[index] = { ...newJobs[index], [field]: value };
          }
          return { data: { ...state.data, jobs: newJobs } };
        }),

      addJob: () =>
        set((state) => ({
          data: {
            ...state.data,
            jobs: [...state.data.jobs, { title: "", org: "", income: "" }],
          },
        })),

      removeJob: (index) =>
        set((state) => ({
          data: {
            ...state.data,
            jobs: state.data.jobs.filter((_, i) => i !== index),
          },
        })),

      setStep: (step) => set({ currentStep: Math.min(7, Math.max(0, step)) }),

      resetForm: () => set({ data: initialFormData, currentStep: 0 }),
    }),
    {
      name: 'aura-profile-form-draft-v1',
      storage: createJSONStorage(() => safeStorage),
    }
  )
);
