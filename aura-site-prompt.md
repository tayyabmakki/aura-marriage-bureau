# Aura Marriage Bureau: Website Build Spec

## ROLE
You are a senior creative developer + art director. Build a world-class, award-level (Awwwards / FWA caliber) website for "Aura Marriage Bureau", a family-led matchmaking bureau in Lahore, Pakistan serving Pakistan & overseas. Reproduce the page structure, user flow and 7-step process of the reference site (https://affinitymarriagebureau.vercel.app) as LOGIC ONLY. All design, copy, photography, numbers and claims must be original to Aura. Write every sentence fresh (same meaning, different words, in both English and Urdu). Do not copy their text, images, layout or facts.

## BUSINESS DETAILS (store in /lib/config.ts, one source of truth)
- Name: Aura Marriage Bureau
- Consultant: Muhammad Tayyab
- Phone (Call | WhatsApp): +92 339 4519797 (wa.me/923394519797)
- Email: auramarriagebureau.pk@gmail.com
- Facebook: Aura Marriage Bureau (page URL: placeholder)
- Instagram: @auramarriagebureau | Threads: @auramarriagebureau
- Office address, opening hours, Google review link: PLACEHOLDERS (I will supply; never reuse another business's)
- Tagline: "Where Destinies Align & Aura's Connect". Hook: "Let's Find Your Perfect Match". Footer line: "Matrimonial Services | Pakistan & Overseas"
- Fees live in config behind a flag set to hidden (never shown publicly)
- Ref ID format: AMB-001

## ATTACHED REFERENCES
profile-form.html (port the 8-step fields + WhatsApp output format exactly), aura-logo-transparent.png, aura-business-card.png (brand look: gold on black, circular flags row, trust badges, curved gold edge over the wedding-hands photo), slider1.webp (hero photo), aura-brand-and-content.md (process, FAQ, privacy, terms and sample profile wording to start from).

## BRAND & TYPE
- Tokens: bg #0a0908, gold #d4af61, gold-light #ecd290, gradient 135deg #b88a35 > #ecd290 > #c9a24b, text #f4ecda, muted #a79c82, hairline rgba(201,162,75,.22)
- next/font: Cormorant Garamond (display), Lora italic (taglines), Montserrat 300-600 (UI, wide-tracked caps like the logo), Noto Nastaliq Urdu

## STACK
Next.js (latest, App Router), TypeScript strict, Tailwind CSS v4, GSAP + ScrollTrigger, Lenis, Motion, React Hook Form + Zod, Zustand, next-intl (English at /, Urdu at /ur with full RTL, hreflang). Optional single lazy WebGL gold-dust hero effect, disabled on low-end/mobile and under prefers-reduced-motion. Supabase for the optional submit path (below).

## HOME PAGE, in this order
1. **Header:** logo, nav (How it works, Fill form, Reviews, Contact), EN/اردو toggle, WhatsApp button. Mobile sticky bottom bar: WhatsApp + Call.
2. **Hero:** Urdu hook line above H1 (meaning: "Looking for a rishta? Contact us"), H1 "Rishtas in Pakistan & Overseas" idea in own words, tagline, three CTAs: WhatsApp, Call, Fill your profile form. Proof strip with true facts only: countries served (Pakistan, UK, USA, Canada, Australia, UAE) as circular flag badges, office city, hours, "proposals handled by parents & guardians".
3. **Photo mosaic** (original or licensed imagery) with note "Photos are illustrative, not clients."
4. **How it works** (pinned scroll timeline, Urdu subtitle "ہم کیسے کام کرتے ہیں"): 7 steps from /content (message on WhatsApp; register; send profile form; profile prepared & proofread; matching proposals by Ref ID; mutual interest; families meet). CTA after step 3 linking to /form.
5. **Privacy promise** (Urdu subtitle meaning "Your information, our trust"): no names, father's names, addresses, contact numbers or photos posted publicly; Ref ID only; pictures shared family to family with permission; every proposal handled by parents, guardians or elder siblings.
6. **"What your profile looks like":** tabs for (a) WhatsApp profile text (SAMPLE label, date, Ref ID, divider lines, bilingual Candidate Details / Requirements blocks, then BASIC INFORMATION lines) and (b) a designed Instagram-style post. Fictional candidate only; real profiles never shown.
7. **Form promo:** "Fill your profile form in about 10 minutes", 3 steps (fill > Copy form > paste in WhatsApp with 2-3 pictures), CTA. State clearly that nothing is sent from the site (when ENABLE_SUBMIT is off).
8. **Reviews:** build the component with Google review cards, but render ONLY real reviews I provide; until then show an elegant "Be the first to review" state. Never fabricate reviews, ratings or counts.
9. **Follow us:** Instagram, Facebook, Threads.
10. **Who we serve:** Lahore & all of Pakistan; Overseas Pakistanis; Second marriages (divorced, khula, widowed, handled with dignity); Professionals.
11. **FAQ accordion** (original answers from /content; confirm factual claims with me).
12. **Visit/contact:** address + hours placeholders, consultant name, click-to-load map (no iframe until tapped), buttons WhatsApp / Call / Email / Directions.
13. **Footer:** logo, tagline, contact, social links, Terms and Privacy pages, © Aura Marriage Bureau, Lahore.

## FORM (/form and /ur/form)
- 8 steps: Basic, Education, Job, Family, Residence, Contact, Requirements, Review.
- Stepper with gold progress line, "Saved on this device" autosave, "Keep ready" tips box, bilingual labels with examples, required-field validation (name optional), age auto-fills from DOB, Clear form.
- Review step: "Copy form" (exact WhatsApp format) + "Open WhatsApp" with prefilled text. Must work with zero backend.
- **Optional (feature flag ENABLE_SUBMIT, default OFF):** "Submit to Aura" saving to Supabase with explicit consent checkbox linking to Privacy.
  - Table `profiles`: id, ref_no (AMB-### sequence), status (new/contacted/matched/archived), consent, indexed name/gender/age/city/caste/sect/marital, data jsonb, notes.
  - RLS on, no public read, inserts only through a server route with the service-role key, Zod validation, honeypot + Cloudflare Turnstile, rate limiting.
  - Admin `/admin`: Supabase Auth with email allowlist, search, filters, status, notes, Copy profile, CSV export.
  - When the flag is OFF the site copy says nothing is sent from the site; when ON the copy must say data is stored and why.

## DESIGN & MOTION (extra premium, never laggy)
Cinematic logo-reveal preloader; hero with parallax photo and the curved gold edge from the card; split-text reveals; clip-path image reveals; pinned How-it-works timeline; magnetic buttons; gold cursor (desktop only); flag marquee; smooth form step transitions; subtle light-particle success state after Copy. Animate only transform/opacity, batch and clean up ScrollTriggers, respect prefers-reduced-motion, 60fps on mid-range Android. It must feel like a luxury brand, not a template: gold-on-black, generous whitespace, elegant hairlines, tasteful depth.

## QUALITY BAR
Lighthouse 95+ mobile (Performance, A11y, SEO). Server components by default, dynamic-import heavy animation code, AVIF/WebP via next/image, minimal client JS. Semantic, keyboard accessible, AA contrast. Metadata, OG image (1200x630), sitemap, robots, JSON-LD LocalBusiness, mobile-first.

## PHASES
- **Phase 1:** foundation, design system, i18n, config/content files, home page, full form (copy flow).
- **Phase 2:** polish, remaining pages, submit flag + admin.
- Deliver README, .env.example, Supabase SQL, Vercel deploy steps.

## HARD RULES
No invented testimonials, ratings, counts, awards, or fee claims. No competitor text, images, address or hours. Never expose service keys client-side. Ask before assuming anything unclear. Commit in small steps.
