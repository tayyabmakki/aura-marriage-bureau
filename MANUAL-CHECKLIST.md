# Aura Marriage Bureau — Manual QA Checklist

This manual verification checklist contains 12 focused verification items for runtime browser testing across mobile (360px), tablet (768px), and desktop (1440px) viewports in both English and Urdu (`/ur`).

---

### 1. Form Stepper Navigation & ARIA Tabs (Mobile 360px)
- **URL:** `/form` and `/ur/form`
- **Action:** Tap through steps 1 to 8 on a 360px mobile screen.
- **Expected:** The horizontal step bar scrolls smoothly without breaking the layout. Active tab displays gold underline; step count updates ("Step 1 of 8 · Basic" / "مرحلہ 1 از 8 · بنیادی معلومات").

### 2. Validation Errors & Auto-Scroll
- **URL:** `/form` and `/ur/form`
- **Action:** Leave required fields empty (e.g., Gender, Marital Status) and click "Next".
- **Expected:** Form flags missing inputs with red borders, announces `"This field is required."` (EN) or `"یہ خانہ پُر کرنا لازمی ہے"` (UR), and smoothly scrolls to the first invalid field.

### 3. Timezone-Safe Age Calculation from Date of Birth
- **URL:** `/form` (Step 1)
- **Action:** Select a date of birth (e.g., `2000-01-01` or leap year `2004-02-29`).
- **Expected:** The "Age" input calculates automatically without day-shift or time zone offset errors.

### 4. Step 8 Review & Copy Form
- **URL:** `/form` (Step 8)
- **Action:** Fill required fields, advance to Step 8, and tap "Copy form".
- **Expected:** Toast notification displays `"Copied! Paste it in WhatsApp"` (EN) or `"فارم کاپی کریں"` feedback. Pasting into a text editor verifies exact format matching `profile-form.html`.

### 5. Open WhatsApp Flow & Privacy Prompt
- **URL:** `/form` (Step 8)
- **Action:** Tap "Open WhatsApp".
- **Expected:** WhatsApp opens in a new tab with encoded text to `+92 339 4519797`. A confirmation prompt appears offering to clear saved form data from the device.

### 6. Local Storage Persistence & Manual Clear
- **URL:** `/form`
- **Action:** Enter basic details, refresh the browser, then tap "Clear my data" / "ڈیٹا صاف کریں".
- **Expected:** Data persists across reloads with `"Saved on this device"` / `"اس ڈیوائس پر محفوظ"` indicator. Confirming "Clear" purges `profile-form-v1` from localStorage and resets the wizard.

### 7. Click-to-Load Interactive Office Map
- **URL:** `/#contact` and `/ur/#contact`
- **Action:** Scroll to the Contact section. Observe the office photo card, then tap "Load interactive map" / "انٹرایکٹو نقشہ کھولیں".
- **Expected:** Zero iframes load prior to tap. On tap, an embedded Google Maps iframe renders without needing external API keys.

### 8. Get Directions Button
- **URL:** `/#contact`
- **Action:** Tap "Get Directions" / "لوکیشن اور راستہ".
- **Expected:** Opens Google Maps in a new tab searching for the exact owner address: `Mezzanine Floor, 95 - S Block, Opposite LACAS School System, Imperial Garden Homes, Paragon City, Barki Rd, Cantt, Lahore, Pakistan 5400`.

### 9. Social Links & Profiles
- **URL:** `/#contact`, footer, and follow section
- **Action:** Click Facebook, Instagram, and Threads links.
- **Expected:**
  - Facebook: `https://www.facebook.com/profile.php?id=61594977652723`
  - Instagram: `https://www.instagram.com/auramarriagebureau/`
  - Threads: `https://www.threads.net/@auramarriagebureau`
  - All open in `_blank` with `rel="noopener noreferrer"`.

### 10. RTL Bidirectional Text Isolation (`<bdi dir="ltr">`)
- **URL:** `/ur`
- **Action:** Inspect phone numbers (`+92 339 4519797`), consultation hours (`10:00 AM – 7:00 PM`), and Ref IDs (`AMB-SAMPLE`).
- **Expected:** Numbers and hours read left-to-right without flipped punctuation or reversed digits.

### 11. Language Toggle Route Preservation
- **URL:** `/form` and `/ur/form`
- **Action:** Click the language switch in the header ("UR" from English, "EN" from Urdu).
- **Expected:** Switching preserves the subpath (`/form` switches to `/ur/form`; `/ur/form` switches to `/form`).

### 12. Reduced Motion Accessibility
- **URL:** `/` and `/form`
- **Action:** Enable "Reduce motion" in Windows Settings / DevTools emulation.
- **Expected:** Smooth transitions, floating ribbon animations, and button sheens immediately collapse to instant/static states per `@media (prefers-reduced-motion: reduce)`.
