# First-draft content setup (Prismic)

After pushing the custom types and slices to your Prismic repository, create the following to get the first draft of the site live.

## 1. Layout document (single type)

1. In Prismic Dashboard, go to **Layout** (single type).
2. **Site config** tab: fill logos (upload or add later), Aberdeen and Houston contact (address, phone, email, hours), phone menu text if desired, primary email, and social links. Use the data in [from-old-website/micron-eagle-extraction/WEBSITE-EXTRACTION.md](from-old-website/micron-eagle-extraction/WEBSITE-EXTRACTION.md) §1.
3. **Header & navigation** tab: add nav links (label + link to Page or URL). Suggested: Home, Services, Spare Parts, Industries, About, Insights, Contact — linking to the corresponding pages by UID.
4. **Footer** tab: add footer links (label + link).

Save and publish. The site header and footer will use this document.

## 2. Home page

1. Create or edit the **Page** document with UID **home**.
2. Set **Section** to **home**.
3. Add slices in this order (content from the game plan and WEBSITE-EXTRACTION.md):
   - **Hero**: headline, subheadline, primary CTA (e.g. Request Parts), secondary CTA (e.g. Speak to an Engineer), optional background image.
   - **MainPathways**: Request Parts, Request Service, Request Rental / Equipment — each with title, short description, and link.
   - **CoreServices**: grid of service cards linking to each service page.
   - **IndustryApplications**: Offshore, Marine, Industrial, Mobile — short copy and links.
   - **WhyMicronEagle**: headline, body, bullets (e.g. Founded 1990, 450HP test, Aberdeen & Houston, ISO certifications).
   - **CertificationsPartners**: logos and labels (e.g. ISO, Danfoss).
   - **Testimonials**: quotes from WEBSITE-EXTRACTION.md §13.
   - **CtaBand**: headline and CTAs (Need parts? Need service? Need rental?).

Save and publish.

## 3. Other pages (game plan sitemap)

Create Page documents for:

- **Services**: uid `services`, section `services`; then child pages (e.g. `on-site-hydraulic-services`, `pump-motor-repair`, …).
- **Spare Parts**: uid `spare-parts`, section `spare-parts`; then `component-supply`, `danfoss-power-solutions`, `service-exchange-units`, `legacy-obsolete-units`, `parts-enquiry`.
- **Industries**: uid `industries`, section `industries`; then `offshore`, `marine`, `industrial`, `mobile-hydraulics`.
- **About**: uid `about`, section `about`; then `certifications-hseq`, `facilities`, `partners`.
- **Insights**: uid `insights`, section `insights`.
- **Contact**: uid `contact`, section `contact`.

Use WEBSITE-EXTRACTION.md and the game plan for copy. Link nav and footer in the Layout document to these UIDs so header/footer match the sitemap.

## 4. Push custom types and slices

If you use Slice Machine locally:

```bash
npm run dev
```

Open Slice Machine (e.g. the URL shown in the terminal), then push the **Layout** custom type and the updated **Page** type (with section, intro, and new slice choices). Push all new slices (Hero, MainPathways, CoreServices, IndustryApplications, WhyMicronEagle, CertificationsPartners, Testimonials, CtaBand). After that, create the Layout document and pages in the Prismic dashboard as above.
