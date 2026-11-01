# Pending Placeholders & Client Inputs

This document tracks all external business details, URLs, and real content that currently use placeholders. Per project rules, we **never** fabricate or invent addresses, operating hours, client reviews, ratings, or third-party links.

---

## 1. Office Location & Consultation Hours
| Item | Current Status / Placeholder in Config | Required Input from Client |
| :--- | :--- | :--- |
| **Office Address** | Placeholder status (`isAddressConfirmed: false`). Displays `Lahore, Pakistan (Consultation by Prior Appointment)`. Real address held until confirmed. | Client confirmation of whether Barki Rd / Paragon City address is active or from reference site. |
| **Consultation Hours** | Placeholder status (`isHoursConfirmed: false`). Displays `Consultation by Prior Appointment`. | Client confirmation of standard in-person consultation hours. |
| **Map Coordinates & Embed** | `null` (eager iframe removed; directs to WhatsApp for appointment & live location pin). | Confirmed Google Maps Place ID / location pin link. |
| **Consultant Title** | Neutralized to `Matrimonial Consultant` / `میچ میکنگ کنسلٹنٹ` (removed unconfirmed "Senior" prefix). | Client preference if specific credential applies. |

---

## 2. Reviews & Social Links
| Item | Current Status / Placeholder in Config | Required Input from Client |
| :--- | :--- | :--- |
| **Google Review Link** | `null` (Review button stays hidden or links to direct contact) | Google Business Profile review submission URL |
| **Client Testimonials** | Renders *"Be the first to review"* empty state with zero fake reviews | Real client reviews with permission |
| **Facebook Page URL** | Supplied: `https://www.facebook.com/profile.php?id=61594977652723` | Wired into Follow Us, Footer, and JSON-LD `sameAs`. |

---

## 3. Imagery & Photography
| Item | Current Status | Note |
| :--- | :--- | :--- |
| **Photographs** | AI-generated illustrative imagery with explicit privacy disclaimers | Real client photos are never published publicly; candidate pictures are sent directly family-to-family via WhatsApp with mutual consent. |
| **Hero Background** | Official licensed wedding ceremony background (`hero-main.webp`) | Configured via `HERO_PHOTO_LICENSED: true` in `lib/config.ts`. |
