# Micron Eagle — Site Plan & Build Roadmap

**Stack:** Next.js (App Router) · Prismic CMS · TypeScript · CSS Modules · Vercel  
**Client:** Henri — Micron Eagle Hydraulics  
**Budget:** €2,000 initial ticket. Goal: turn stale site into a lead machine.

---

## 1. Site Structure

### Public Pages (all use the `page` custom type + slice zones)

| Page | UID | Notes |
|------|-----|-------|
| Home | `home` | ✅ Built |
| About | `about` | |
| Contact | `contact` | |
| Services | `services` | Parent page |
| → Off-site Service | `services-offsite` | Sub-page |
| → Spare Parts & Supplies | `services-spare-parts` | Sub-page |
| → Rentals | `services-rentals` | Sub-page — **Henri priority** |
| → On-site & Engineering | `services-onsite-engineering` | Sub-page |
| Who We Serve | `who-we-serve` | Parent page |
| → Offshore Wind | `industry-offshore-wind` | Sub-page (future) |
| → Fisheries | `industry-fisheries` | Sub-page (future) |
| → Fishermen | `industry-fishermen` | Sub-page (future) |
| → Oil & Gas | `industry-oil-gas` | Sub-page (future) |
| → O&G Subcontractors | `industry-oilgas-subcontractors` | Sub-page (future) |
| → Shipping Lines | `industry-shipping` | Sub-page (future) |
| → Construction | `industry-construction` | Sub-page (future) |
| → Industrial Plants | `industry-industrial` | Sub-page (future) |
| Blog | `blog` | Lists all articles |
| Cookie & Privacy Policy | `legal-privacy` | Footer only |
| Legal Disclaimer | `legal-disclaimer` | Footer only |
| Terms & Conditions | `legal-terms` | Footer only |

### New Content Type: `blog_article` (repeatable)

Each article lives at `/blog/[uid]`. Fields needed:
- `title` (Heading 1)
- `cover_image` (Image)
- `gallery` (Group — up to 5 image items)
- `tags` (Group — repeatable text items, e.g. "Hydraulics", "Case Study")
- `hashtags` (Group — repeatable text items for social, e.g. "#hydraulics")
- `body` (Rich Text)
- `excerpt` (Short plain text — used in social previews and BlogGrid cards)
- `linkedin_url` (Link field — URL to the corresponding LinkedIn post)
- `published_date` (Date)

The BlogGrid slice on `/blog` queries all `blog_article` documents dynamically.

> **Blog type vs. slice decision:** Use a dedicated `blog_article` custom type, NOT a page with a big repeatable slice. Each article gets its own URL, SEO metadata, and is easy to create/edit in Prismic. The BlogGrid slice calls `getAllByType('blog_article')` — clean, scalable, works.

---

## 2. Slice Inventory

### Existing slices (keep)

| Slice | Where used |
|-------|-----------|
| Hero | Every page |
| CoreServices / V2 | Home, Services parent |
| WhyMicronEagle / V2 | Home, About |
| Testimonials / V2 | Home, About, Who We Serve |
| CtaBand / V2 | Every page (conversion prompt) |
| Faq | Home, Services sub-pages |
| StatsBand | Home, About |
| IndustryApplications / V2 | Who We Serve pages |
| TeamSection | About |
| CertificationsPartners / V2 | About, footer of Services pages |
| BlogGrid | Blog listing page |
| RichText | Legal pages, Supporting content everywhere |

### Slices to delete

| Slice | Reason |
|-------|--------|
| MainPathways | Looks bad, no clear use case — delete it and V2 |

### New slices to build (priority order)

#### 1. `ContactForm` ⚡ High priority
The most important slice for lead generation. Fields:
- Heading + subtext (primary)
- Form fields: Name, Email, Company, Phone, Service Type (dropdown), Message
- Submit button label (primary)
- Confirmation message (primary)
- Form handler: use a Next.js API route (`/api/contact`) posting to an email service (Resend or Nodemailer). Keeps it in-stack, no third-party cost.

Used on: Contact page (main use), could also be dropped at the bottom of any Services sub-page.

#### 2. `RentalEquipmentCard` ⚡ High priority (Henri's growth area)
A card grid for rental equipment listings. Each item (repeatable group) should have:
- Equipment name
- Image
- Short description
- Key specs (e.g. Power: 75kW, Voltage: 440V)
- CTA button (link to contact / enquire)

Used on: `/services-rentals`

Known inventory: PowerPi data logger, HIDAC systems, Filtration units, 75kW/22kW/440kW Electric HPUs, HYDAC Particle Counter, Offline Filtration Unit, HYPRO Filtration Cart, HYDAC Data Logger, HY-PRO VAC-U-DRY, LPA3 portable particle counter.

#### 3. `LinkedInEmbed` (lightweight, for blog articles)
Simple slice for blog article pages to embed or link to the originating LinkedIn post. Fields:
- LinkedIn post URL
- Optional caption ("Read the full article on LinkedIn")
- Display style: "button only" or "preview card"

This closes the LinkedIn → Website loop: LinkedIn post drives traffic to the full article, the article page shows a "View on LinkedIn" link so readers can share/engage on the original post too.

---

## 3. Navigation

### Header
- Home
- Services (dropdown)
- Who We Serve (dropdown — activate when sub-pages are built)
- About
- Blog
- Contact (button CTA style)

### Footer columns
- **Services:** Off-site, Spare Parts, Rentals, On-site & Engineering
- **Company:** About, Who We Serve, Blog, Careers (optional)
- **Contact:** Address, phone, email
- **Legal (small print):** Cookie & Privacy Policy · Legal Disclaimer · Terms & Conditions

---

## 4. Technical Flags

### 🌍 Bilingual (FR/EN) — do this NOW
**This must be set up before content is entered into Prismic.** Retroactively adding i18n to a filled Prismic repo is painful. Steps:
1. Add French locale in Prismic repository settings
2. Configure Next.js i18n routing (`next.config.js`) — either path-based (`/fr/...`) or domain-based
3. Update `prismicio.ts` to pass locale to queries
4. Update `src/app/layout.tsx` and route handlers to accept `lang` param
5. All slice fields with text automatically become localizable once the locale exists

### 🤖 Chatbot
Add after content is live. Drop a single script tag in `src/app/layout.tsx`. Tidio or Crisp are the simplest options. No architectural changes needed.

### 📊 Analytics & SEO
- Vercel Analytics is already available (zero config)
- Each `page` document already has SEO fields — make sure every page gets a filled meta title and description before launch
- Add `blog_article` to sitemap generation

---

## 5. Build Plan — Broken Down for the Team

---

### TICKET A — Architecture (Backend / Middleware)
> *Do this first. Everything else depends on it.*

**A1 — Bilingual setup (i18n)**
- Add French locale in Prismic
- Update `next.config.js` with locale config
- Update `prismicio.ts`, `layout.tsx`, and route handlers
- Test with a placeholder French page

**A2 — `blog_article` custom type**
- Define the type in Slice Machine (fields listed in Section 1)
- Add routing: `src/app/blog/[uid]/page.tsx`
- Wire `BlogGrid` slice to query `blog_article` documents
- Add to sitemap

**A3 — Contact form API route**
- Create `src/app/api/contact/route.ts`
- Integrate with Resend (or Nodemailer) for email delivery
- Add basic rate-limiting and validation
- Test form submission end-to-end

---

### TICKET B — Slice Machine (Content Modeling)
> *Depends on A1 being done. All slice builds go through Slice Machine.*

**B1 — Delete MainPathways + MainPathwaysV2**
- Remove from `src/slices/`
- Remove from `src/slices/index.ts`
- Remove from any Prismic documents that use it

**B2 — Build `ContactForm` slice**
- Model in Slice Machine (fields listed in Section 2)
- Component + CSS module
- Hooks up to the `/api/contact` route from A3

**B3 — Build `RentalEquipmentCard` slice**
- Model in Slice Machine
- Card grid component with image, specs, CTA
- CSS module — make it look premium, not a commodity catalogue

**B4 — Build `LinkedInEmbed` slice**
- Simple slice for blog article pages
- Button and/or preview card variants

---

### TICKET C — Pages (Frontend)
> *Depends on B slices being available in Prismic.*

**C1 — About page**
Slices: Hero → WhyMicronEagle → TeamSection → StatsBand → CertificationsPartners → Testimonials → CtaBand

**C2 — Contact page**
Slices: Hero (minimal) → ContactForm → RichText (address/opening hours) → CtaBand

**C3 — Services parent page**
Slices: Hero → CoreServices (overview of 4 service lines) → CtaBand

**C4 — Services sub-pages (4 pages)**
- Off-site Service: Hero → RichText → Faq → CtaBand
- Spare Parts & Supplies: Hero → RichText → CertificationsPartners → CtaBand
- Rentals ⚡: Hero → RentalEquipmentCard → RichText → Faq → CtaBand
- On-site & Engineering: Hero → RichText → Faq → CtaBand

**C5 — Who We Serve parent page**
Slices: Hero → IndustryApplications → RichText → Testimonials → CtaBand

**C6 — Blog listing page**
Slices: Hero (minimal) → BlogGrid

**C7 — Legal pages (3 pages)**
Slices: RichText only. Copy needed (see Ticket E).

---

### TICKET D — Design (UX/UI)
> *Can run in parallel with B and C.*

**D1 — Design system / style guide**
- Colour tokens, typography scale, spacing system
- Document in Figma or as CSS custom properties

**D2 — New slice designs**
- ContactForm — make it feel like a warm first contact, not a corporate form
- RentalEquipmentCard — premium, industrial feel; specs must be scannable
- LinkedInEmbed — subtle, not distracting

**D3 — Blog article page template**
- Layout for title, cover image, body, gallery, tags, LinkedIn link
- Mobile first

**D4 — Mobile review pass**
- Review all existing built slices on mobile (375px)
- Fix any layout issues before new pages are added

---

### TICKET E — Content & Copy
> *Can start now. Doesn't need dev.*

**E1 — Page copy**
- About: company story, values, certifications
- Services: descriptions for all 4 service lines
- Who We Serve: short paragraphs for each industry (8 total)
- Contact: intro text, address, phone, email, opening hours

**E2 — Rentals copy & specs**
- Equipment descriptions + spec sheets for all rental inventory
- Henri to provide or confirm specs

**E3 — Legal pages**
- Cookie & Privacy Policy (may need a lawyer's eye)
- Legal Disclaimer
- Terms & Conditions
- Can use a template service as starting point, Henri to sign off

**E4 — First 3 blog articles**
- Write/publish 1 article before launch to populate the BlogGrid
- Format: 300–600 words, 1–2 images, tags, hashtags
- Plan the LinkedIn → Website flow: LinkedIn post first, links to article; article page shows "View on LinkedIn"

---

### TICKET F — LinkedIn / Social Content Flow (Marketing)
> *Post-launch, but plan now.*

**F1 — Content workflow**
The chain: Draft article in Prismic → Publish to website → Post to LinkedIn with link → Reshare to Instagram + Twitter/X

- LinkedIn post links directly to the article URL
- Article page shows "View on LinkedIn" card (LinkedInEmbed slice)
- Instagram: image + excerpt + "Link in bio → website"
- Twitter/X: short hook + article link

**F2 — Hashtag & tag taxonomy**
Define a consistent set of tags and hashtags before the first article goes live. Consistency matters for LinkedIn algorithm and SEO.

---

## 6. Launch Checklist (before going live)

- [ ] All page SEO fields filled (title, description, OG image)
- [ ] Contact form tested end-to-end (email delivery confirmed)
- [ ] Bilingual: at least homepage and contact page exist in French
- [ ] Cookie banner implemented (required for GDPR — France)
- [ ] Legal pages live and linked in footer
- [ ] At least 1 blog article published
- [ ] All Prismic page UIDs match the routing table in Section 1
- [ ] Vercel deploy previews working for Prismic drafts
- [ ] Mobile review passed on all pages
- [ ] 404 page styled

---

## 7. What We're NOT Building Yet (Future Phases)

- Who We Serve sub-pages (structure is defined, content comes later)
- Chatbot
- Job listings / Careers page
- Rental booking / availability system
- Full social media automation

---

*Last updated: 2026-05-13*
