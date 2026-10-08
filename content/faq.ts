export interface FaqItem {
  id: string;
  questionEn: string;
  answerEn: string;
  questionUr: string;
  answerUr: string;
  /** Internal verification note for site owner */
  ownerVerificationNote: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "privacy",
    questionEn: "Is my family's information kept private?",
    answerEn: "Yes. Names, father's names, addresses, phone numbers, employer details, and photographs remain strictly confidential. General details and criteria are shared only with registered families for matchmaking, and only with your explicit permission.",
    questionUr: "کیا میری معلومات اور تصاویر نجی اور محفوظ رہتی ہیں؟",
    answerUr: "جی ہاں۔ نام، والد کا نام، گھر کا پتہ، فون نمبر، ملازمت کی تفصیلات اور تصاویر مکمل طور پر راز میں رکھی جاتی ہیں۔ صرف عمومی معلومات اور شرائط باہمی رضامندی کے بعد ہی دیگر رجسٹرڈ خاندانوں کے ساتھ شیئر کی جاتی ہیں۔",
    // Confirm with owner: verify confidentiality parameters and explicit permission protocols
    ownerVerificationNote: "Confirm with owner: verify confidentiality parameters and explicit permission protocols",
  },
  {
    id: "verification",
    questionEn: "Do you independently verify families?",
    answerEn: "We share information precisely as provided to us by each family. Aura acts as a respectful facilitator rather than a private investigative service; we encourage all families to conduct their own diligent background inquiries before making a commitment.",
    questionUr: "کیا آپ خاندانوں کی تصدیق اور چھان بین کرتے ہیں؟",
    answerUr: "ہم معلومات اسی طرح پہنچاتے ہیں جس طرح ہر خاندان ہمیں فراہم کرتا ہے۔ ہم باہمی رابطے کا ذریعہ ہیں نہ کہ تفتیشی ادارہ، اس لیے ہر خاندان کو حتمی فیصلہ کرنے سے پہلے اپنی تسلی خود کر لینی چاہیے۔",
    // Confirm with owner: confirm wording on background verification obligations
    ownerVerificationNote: "Confirm with owner: confirm wording on background verification obligations",
  },
  {
    id: "overseas",
    questionEn: "Do you handle overseas Pakistani proposals?",
    answerEn: "Yes. We actively work with respectable families residing in Pakistan as well as Pakistani diaspora living in the UK, USA, Canada, Australia, the UAE, and worldwide.",
    questionUr: "کیا آپ بیرونِ ملک مقیم پاکستانیوں کے رشتے کرواتے ہیں؟",
    answerUr: "جی ہاں۔ ہم پاکستان بھر کے علاوہ برطانیہ، امریکہ، کینیڈا، آسٹریلیا، متحدہ عرب امارات اور دیگر ممالک میں مقیم اوورسیز پاکستانی خاندانوں کے لیے بھی خدمات پیش کرتے ہیں۔",
    // Confirm with owner: confirm specific foreign territories handled
    ownerVerificationNote: "Confirm with owner: confirm specific foreign territories handled",
  },
  {
    id: "second-marriages",
    questionEn: "Do you assist with second marriages?",
    answerEn: "Yes. Divorced, khula, and widowed individuals are welcomed with profound dignity, patience, and complete discretion.",
    questionUr: "کیا آپ دوسری شادی کے رشتے بھی دیکھتے ہیں؟",
    answerUr: "جی ہاں۔ طلاق یافتہ، خلع یا بیوہ حضرات و خواتین کے رشتوں کے لیے مکمل وقار اور احترام کے ساتھ کام کیا جاتا ہے۔",
    // Confirm with owner: confirm criteria and processes for second marriages
    ownerVerificationNote: "Confirm with owner: confirm criteria and processes for second marriages",
  },
  {
    id: "meetings",
    questionEn: "Can a consultant attend the initial family meeting?",
    answerEn: "Yes, if either family specifically requests attendance. In that event, consultation service charges apply to both families.",
    questionUr: "کیا بیورو کا نمائندہ خاندانوں کی ملاقات میں شرکت کر سکتا ہے؟",
    answerUr: "جی ہاں، اگر دونوں میں سے کوئی بھی خاندان درخواست کرے۔ اس صورت میں دونوں خاندانوں پر اضافی چارجز لاگو ہوتے ہیں۔",
    // Confirm with owner: confirm policy on meeting attendance and associated billing
    ownerVerificationNote: "Confirm with owner: confirm policy on meeting attendance and associated billing",
  },
  {
    id: "eligibility",
    questionEn: "Who is eligible to initiate registration?",
    answerEn: "Proposals must be registered and handled directly by parents, lawful guardians, or elder siblings. We strictly do not accept inquiries from minors.",
    questionUr: "رجسٹریشن کون کروا سکتا ہے؟",
    answerUr: "رشتے کی بات چیت صرف والدین، قانونی سرپرست یا بڑے بہن بھائی کر سکتے ہیں۔ ہم نابالغ افراد کے رشتے قبول نہیں کرتے۔",
    // Confirm with owner: confirm family guardian eligibility requirements
    ownerVerificationNote: "Confirm with owner: confirm family guardian eligibility requirements",
  },
  {
    id: "form-requirement",
    questionEn: "Is it required to fill out the website form?",
    answerEn: "No. The website form is merely a convenient tool to help you organize your details clearly. You can copy the generated text to WhatsApp, or message us your information directly.",
    questionUr: "کیا ویب سائٹ پر فارم پُر کرنا لازمی ہے؟",
    answerUr: "نہیں۔ یہ فارم صرف آپ کی آسانی کے لیے ہے تاکہ آپ تمام تفصیلات سلیقے سے یکجا کر سکیں۔ آپ اسے کاپی کر کے واٹس ایپ پر بھیج سکتے ہیں یا سیدھا واٹس ایپ پر پیغام دے سکتے ہیں۔",
    // Confirm with owner: confirm non-mandatory nature of online form
    ownerVerificationNote: "Confirm with owner: confirm non-mandatory nature of online form",
  },
];
