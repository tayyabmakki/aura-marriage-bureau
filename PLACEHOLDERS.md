# Pending Placeholders & Client Inputs

This document tracks all external business details, URLs, and real content that currently use placeholders. Per project rules, we **never** fabricate or invent addresses, operating hours, client reviews, ratings, or third-party links.

---

## 1. Office Location & Consultation Hours
| Item | Current Status / Placeholder in Config | Required Input from Client |
| :--- | :--- | :--- |
| **Office Address** | Supplied: `Mezzanine Floor, 95 - S Block, Opposite LACAS School System, Imperial Garden Homes, Paragon City, Barki Rd, Cantt, Lahore, Pakistan 5400` | In config. Displayed in Contact & Footer. |
| **Postal Code** | Displayed as `5400` in address text; omitted from JSON-LD `postalCode`. | **postal code: verify against Google Business Profile** (4 digits provided; Pakistani standard codes are usually 5 digits). |
| **Consultation Hours** | Supplied: `Daily, 10:00 AM – 7:00 PM (PKT)` (10:00 to 19:00, all 7 days) | In config. Displayed in Contact, Footer, Hero proof strip, and JSON-LD openingHoursSpecification. |
| **Map Coordinates** | `null` (Click-to-load map iframe uses encoded address query embed) | Google Maps lat/lng coordinates or Google Maps Place ID |

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
