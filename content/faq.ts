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
    answerEn: "No, we do not independently verify families. We pass on information precisely as each family provides it to us. Aura is a facilitation service, not a private investigative agency, so every family must conduct its own independent background checks and inquiries before making any commitment.",
    questionUr: "کیا آپ خاندانوں کی خود تصدیق اور چھان بین کرتے ہیں؟",
    answerUr: "نہیں۔ ہم معلومات اسی طرح آگے پہنچاتے ہیں جس طرح ہر خاندان ہمیں فراہم کرتا ہے۔ اورا ایک باوقار سہولت کار ادارہ ہے نہ کہ کوئی تفتیشی ایجنسی، اس لیے ہر خاندان پر لازم ہے کہ وہ حتمی فیصلہ یا وعدہ کرنے سے قبل اپنے طور پر مکمل تصدیق اور چھان بین خود کرے۔",
    ownerVerificationNote: "Explicit disclaimer: Aura does not verify families; independent family checks required",
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
