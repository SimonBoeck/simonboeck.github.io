# innoviq Site Refactor: Migration to Astro

**Date:** 2026-11-11
**Supersedes:** `2026-11-11-landing-page-modernization-plan.md` (that plan's scope — polish the existing Next.js bio page in place — is replaced by this full refactor; the Next.js implementation from that plan was never committed).
**Scope:** Architectural. Full project refactor: framework migration (Next.js → Astro), new design system, new CV page, removal of unused blog/feed/OG machinery.

## Goal

Rebuild innoviq's site (Simon Böck's PM/PO/BA consulting business) as a small, fast, static site with a distinct, professional, clean design — different from the previous Inter/neutral-gray look. Keep the homepage as a single bio narrative (not a multi-section marketing landing page — confirmed with user). Add a full HTML CV page sourced from the existing PDF résumé. Drop everything related to the unused blog feature (no blog content exists in the repo today).

## Decisions (confirmed with user)

1. **Framework:** Astro, `output: 'static'`. No React/Next runtime needed — nothing on this site requires client-side interactivity beyond a dark/light toggle, which will be a small vanilla script.
2. **Pages:** Homepage stays a single bio narrative (not expanded into a multi-section landing page).
3. **CV:** Becomes a real HTML page (`/cv`), not just a PDF link. The PDF stays downloadable alongside it.
4. **Removed:** blog/MDX support, RSS/Atom/JSON feeds, dynamic OG-image-generation route.
5. **Design:** New design system (navy + blue accent, serif/sans pairing) — see below.

## Current state (for migration reference)

- Next.js 15 App Router, Tailwind, `next-themes`, `react-icons`, Vercel Analytics/Speed Insights.
- Pages: `/` (bio), `/testimonials` (3 client quotes), `/og` (dynamic OG image route, unused in practice), feed routes (`/rss.xml`, `/atom.xml`, `/feed.json`) via rewrites — all for a blog that has no content (`content/` directory doesn't exist; `app/lib/posts.ts`, `app/components/mdx.tsx`, `tweet.tsx`, `youtube.tsx`, `image-grid.tsx`, `caption.tsx` are all blog-only and unused).
- `app/config.ts` holds site metadata (title, baseUrl `https://www.innoviq.de`, name) and social links (email, phone — no social media accounts).
- CV is currently just a nav link straight to `public/files/Simon_Boeck_Product_Owner_IAM_API_en.pdf`.
- Deployed on Vercel (inferred from `@vercel/analytics`/`@vercel/speed-insights` and the dynamic OG route, which only work on a server/edge runtime, not plain static GitHub Pages — the repo name `simonboeck.github.io` is historical/not the actual hosting).

## Design system

Pulled from a B2B-consulting design-system lookup (`ui-ux-pro-max` skill), chosen to look deliberately different from the previous iteration:

| Token | Light | Dark |
|---|---|---|
| `--color-primary` (headings, nav) | `#0F172A` | `#F8FAFC` |
| `--color-secondary` (body text) | `#334155` | `#CBD5E1` |
| `--color-accent` (links, CTA, bullet markers) | `#0369A1` | `#38BDF8` |
| `--color-background` | `#F8FAFC` | `#0B1120` |
| `--color-foreground` | `#020617` | `#F8FAFC` |
| `--color-border` | `#E2E8F0` | `#1E293B` |
| `--color-muted-foreground` | `#475569` | `#94A3B8` |

Typography: **EB Garamond** (serif, weights 500/600/700) for the name/headings — reads authoritative and trustworthy for a consulting brand — paired with **Lato** (sans, weights 300/400/700) for body text and nav. Both via Google Fonts, loaded with `font-display: swap`.

Spacing/corners stay restrained: modest radius (not sharp, not pill-shaped), generous whitespace, no shadows/gradients beyond a subtle card border — matching the "Accessible & Ethical" / clean-professional style profile (high contrast, 16px+ base text, visible focus states).

## Site structure (Astro)

```
src/
  layouts/
    BaseLayout.astro        # <html>, head/meta, font links, theme init script, Nav, Footer, slot
  components/
    Nav.astro
    Footer.astro
    ThemeToggle.astro        # inline <script>, no framework
  pages/
    index.astro              # Home: bio narrative
    testimonials.astro
    cv.astro
    404.astro
  data/
    testimonials.ts          # same 3 entries as app/testimonials/project-data.tsx today
    cv.ts                     # structured CV content (see Appendix below)
  config.ts                  # site metadata + social links (email, phone), ported from app/config.ts
  styles/
    global.css               # design tokens (CSS variables), base styles, prose-equivalent styles for the bio/CV text
public/
  favicon.ico, logo.png, opengraph-image.png, profile.jpg  (carried over as-is)
  files/Simon_Boeck_Product_Owner_IAM_API_en.pdf           (carried over as-is, still linked from /cv)
astro.config.mjs             # output: 'static', @astrojs/sitemap integration
robots.txt                   # static file in public/, same content/intent as today's app/robots.ts
```

No MDX, no `content/` collection — nothing on the site needs it anymore.

## Pages in detail

### Home (`/`)
Same content as today's bio (profile photo, "About me" heading, the 4-paragraph intro + 4-item list), carrying forward the typo fix and light copy tightening from the earlier (reverted) pass, restyled with the new design system: serif heading, Lato body, navy/accent color scheme, custom bullet markers, refined photo treatment (ring/shadow, no grayscale-hover gimmick).

### Testimonials (`/testimonials`)
Same 3 entries (Carsten Fritz, Viktor Frank, Sven Thiermann) restyled as clean, bordered cards consistent with the new design system — name/title in serif, quote body in Lato.

### CV (`/cv`) — new
Full HTML résumé built from the PDF content, structured as:
- Header: name, title ("Product Manager / Product Owner / Business Analyst"), contact line, a "Download PDF" link to the existing file.
- Personal info: citizenship, travel readiness, capacity, languages.
- Summary (same text as the homepage intro — already consistent).
- Skills, grouped: Practices/Agile methods, Areas of expertise, Tools, Techniques (as in the PDF).
- Education (3 entries) and Certifications (4 entries).
- Experience: all 11 project entries in reverse-chronological order, each with role, client/location, dates, description, and responsibilities list (full content captured in the Appendix below, extracted verbatim from the PDF).
- A light `@media print` stylesheet so printing the page itself (not just the PDF) looks clean — hide nav/footer/theme toggle/download link when printing.

## Dependencies

**Add:** `astro`, `@astrojs/sitemap`, `tailwindcss` (Astro's Vite-based Tailwind integration).
**Remove:** `next`, `react`, `react-dom`, `@types/react`, `@types/react-dom`, `next-themes`, `react-icons`, `next-mdx-remote`, `feed`, `katex`, `rehype-katex`, `remark-math`, `sugar-high`, `react-tweet`, `react-youtube`, `react-wrap-balancer`.
**Keep:** `@vercel/analytics`, `@vercel/speed-insights` — both ship framework-agnostic script tags that work directly in an Astro layout.

## Deployment

Astro's static output builds to `dist/`; Vercel auto-detects Astro projects, so no adapter or new Vercel project config is needed beyond re-pointing the build if the existing Vercel project has Next.js-specific settings cached (verify after migration, before relying on preview deploys).

## Out of scope

- Expanding the homepage into a multi-section marketing landing page (explicitly declined — bio narrative stays).
- Changing testimonial content or soliciting new testimonials.
- A contact form (footer email/phone links are the only contact mechanism, same as today).
- CMS or content-authoring workflow for the CV (it's a static data file, edited directly in the repo).

## Testing

Static site, no business logic — verify by running `astro dev` / `astro build && astro preview` and checking in the browser: light/dark mode on all 3 pages, desktop and mobile width, the CV page's print stylesheet (print preview), and that the PDF download link still works.

---

## Appendix: CV content (extracted verbatim from `public/files/Simon_Boeck_Product_Owner_IAM_API_en.pdf`, 03.12.2024)

**Personal Information:** Citizenship: German · Travel readiness: Europe · Capacity: 50%–100%
**Languages:** German (Native), English (Business fluent)

**Summary:** (same as homepage intro text)

**Skills**
- *Practices / Agile methods:* Scrum, Kanban, API-First, SAFe, Lean Startup
- *Areas of expertise:* Product Management & Owner, Identity- & Accessmanagement, Self-Service-Applications, Business Analysis, API-Management & -Governance, B2B Platforms
- *Tools:* Atlassian/Miro, Elasticsearch, Kibana/Graylog/Power BI, Postman/Stoplight/SoapUI, OpenAPI/AsyncAPI/Avro, Flutter/Flutterflow, Kafka/RabbitMQ/ActiveMQ, Apache Beam/Flink/Spark, Typeform/Figma/Framer, HTTP/REST/SOAP/GraphQL/MQTT, OAuth2/OpenID/SAML2, Hadoop
- *Techniques:* Product Discovery, Business Process Modelling, Planning and backlog prioritization, User Stories, Customer Journeys, User Testing, Product Strategie & Roadmap, KPI-Monitoring & Management-Reporting, Product Requirement Documents, Requirements Engineering, A/B-Testing, Customer Interviews, OKRs

**Education**
- Business Moderation — 2017, Deutsche Gesellschaft für Moderation e.V.
- M.Sc. Business Informatics — 2016, Hochschule Ravensburg-Weingarten
- B.Sc. Business Informatics — 2014, Hochschule Kempten

**Certifications:** Certified SAFe 4 Agilist · Certified Product Owner · Certified Scrum Master · Certified Professional for Requirements Engineering

**Projects (reverse chronological)**

1. **Senior Business Analyst** — Insurance, Vienna, Austria — June 2023 – today
   Analyzing/documenting IT processes, interfaces, B2B web services; agile (Scrum/SAFe), remote collaboration; goal: public API for partner/agency/platform consumption.
   Responsibilities: Analysis/documentation of IT processes and business architectures; interface mapping and WSDL documentation; working/documenting B2B web services; collaboration via Jira/Confluence; reworking/restructuring API security; support and partner onboarding.

2. **API Product Manager** — Logistics, Düsseldorf, NRW — Jan 2022 – June 2023
   API program for a leading European transportation platform; sustain organic growth, improve developer experience, reduce dev effort.
   Responsibilities: API strategy and goal statement; internal/external stakeholder management, dev team coordination; sparring partner for API planning/conception; uniform constraints/quality standards for data, events, interfaces; API management + portal conception/development; documentation guidelines.

3. **API Product Owner** — IT Financial Services, Nuremberg, Bavaria — Jan 2021 – Dec 2021
   API management platform for business customers; network of 30+ APIs serving up to 1.2M end customers/month.
   Responsibilities: Product vision, business modeling, market analysis, customer interviews; backlog planning/prioritization; stakeholder management + dev team coordination; steering a community of practice for API guidelines; further development of central auth system.

4. **Product Consultant** — Real Estate, Munich, Bavaria — Jan 2021 – Sep 2021
   Methodological support for MVP development/testing; validation led to a company pivot.
   Responsibilities: Customer interviews & user testing; hypothesis derivation; value proposition & business model consulting; MVP development support.

5. **Product Consultant** — IT Services, Nuremberg, Bavaria — Oct 2020 – Mar 2021
   Methodological/content support for product owners; enabled independent product decisions and management presentations via MVP-tested hypotheses.
   Responsibilities: Review value proposition & business model; problem validation support; market analysis & customer interview support; value proposition & business model consulting.

6. **Product Owner, Identity & Accessmanagement** — IT Financial Services, Nuremberg, Bavaria — Jan 2020 – Dec 2020
   Passwordless auth/authz platform (IDaaS) for business customers; ~600,000 end users, 6,000 employees across multiple business customers.
   Responsibilities: Product vision, business modeling, market analysis, customer interviews; backlog planning/prioritization; central IAM solution development; stakeholder management + dev team coordination; dev team support on OAuth2/SAML2.

7. **Product Owner** — Banks & Insurances, Nuremberg, Bavaria — Mar 2019 – Dec 2019
   Authentication component enforcing PSD2 "strong customer authentication"; delivered on time and budget.
   Responsibilities: Workshop planning/facilitation; requirements analysis/documentation; backlog planning/prioritization (Scrum); stakeholder management across multiple dev teams; decision documents incl. management reporting.

8. **Business Analyst / Proxy Product Owner API** — Banks & Insurances, Nuremberg, Bavaria — Dec 2018 – Feb 2019
   PSD2 requirements prep; interim dev team management; largely responsible for XS2A API development.
   Responsibilities: Workshop planning/moderation; requirements analysis/documentation; business process modeling/conceptual design; backlog planning/prioritization (Scrum); stakeholder requirement harmonization/prioritization.

9. **Identity & Access Management Subproject Manager** — Banks & Insurances, Nuremberg, Bavaria — Jun 2017 – Nov 2018
   MaRisk-compliant IAM solution; reduced onboarding/department-change time from days to minutes.
   Responsibilities: Sub-project management, reporting, protocols/risk assessments/decision docs/management presentations; workshop planning/facilitation; requirements analysis/documentation; business process modeling/design; business department consulting/training.

10. **Business Analyst** — Banks & Insurances, Nuremberg, Bavaria — Oct 2016 – Jun 2017
    Redevelopment of a NoCode test automation platform for iOS/Android; reduced release test time by ~80%.
    Responsibilities: Requirements analysis/documentation; test framework evaluation/selection; resource planning, external service provider coordination; test concept creation; test software documentation and training.

*Further projects from 2011–2016 on request.*
