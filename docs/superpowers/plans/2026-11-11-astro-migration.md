# innoviq Astro Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing Next.js site with a static Astro site (new design system, a new `/cv` page, blog/feed/OG machinery removed) that builds and deploys the same way on Vercel.

**Architecture:** Astro with `output: 'static'`, Tailwind CSS via `@astrojs/tailwind`, three content pages (`/`, `/testimonials`, `/cv`) sharing one `BaseLayout.astro` (nav, footer, theme toggle, analytics). This is a content-only site with no business logic, so "tests" in this plan are build-time content assertions (`npm run build` then `grep`/`test -f` against `dist/`) rather than a unit-test framework — proportionate to what the project needs (YAGNI).

**Tech Stack:** Astro (static output), Tailwind CSS 3.x (`@astrojs/tailwind`), `@astrojs/sitemap`, `@vercel/analytics`, `@vercel/speed-insights`, TypeScript, npm (pnpm is not available in this dev environment).

**Spec:** [docs/superpowers/specs/2026-11-11-astro-migration-design.md](../specs/2026-11-11-astro-migration-design.md)

## Global Constraints

- Output mode: `output: 'static'` in `astro.config.mjs`.
- Package manager: npm (not pnpm — confirmed unavailable in this environment).
- Design tokens (exact hex, light / dark): primary `#0F172A` / `#F8FAFC`; secondary `#334155` / `#CBD5E1`; accent `#0369A1` / `#38BDF8`; background `#F8FAFC` / `#0B1120`; foreground `#020617` / `#F8FAFC`; border `#E2E8F0` / `#1E293B`; muted-foreground `#475569` / `#94A3B8`.
- Fonts: **EB Garamond** (weights 500/600/700) for headings, **Lato** (weights 300/400/700) for body, both via Google Fonts with `font-display: swap`.
- Pages: `/` (home bio), `/testimonials`, `/cv`, `/404`. No blog, no MDX, no `/rss.xml`/`/atom.xml`/`/feed.json`, no dynamic OG image route.
- Dependencies to add: `astro`, `@astrojs/sitemap`, `@astrojs/tailwind`, `tailwindcss@^3`, `@vercel/analytics`, `@vercel/speed-insights`, `@astrojs/check`, `typescript`.
- Dependencies to remove: `next`, `react`, `react-dom`, `@types/react`, `@types/react-dom`, `next-themes`, `react-icons`, `next-mdx-remote`, `feed`, `katex`, `rehype-katex`, `remark-math`, `sugar-high`, `react-tweet`, `react-youtube`, `react-wrap-balancer`, `@tailwindcss/typography`.
- Bio copy, testimonial entries, and CV content must match the spec's text exactly (see spec body and Appendix) — no further paraphrasing.

## Review Focus

- Theme must not flash the wrong mode and must stay consistent across navigation — the init script has to run in `<head>` on every page (`/`, `/testimonials`, `/cv`, `/404`), not just one.
- The CV page's "Download PDF" link must resolve to a real file in the built output, not a broken href.
- Internal links and asset references must be root-relative and resolve correctly for a root-domain deploy (`innoviq.de`), not assume a sub-path base.
- The CV page's `@media print` rule must actually hide nav/footer/theme-toggle/download-link when printed, not just be present as unused CSS.
- All three content pages must render without horizontal overflow at 375px width, including the CV page's two-column skills lists.

---

## Task 1: Remove Next.js, scaffold Astro project with design tokens

**Files:**
- Delete: `app/` (entire directory), `next.config.ts`, `postcss.config.js`, `tsconfig.json`, `pnpm-lock.yaml`
- Create: `package.json` (replace), `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`, `src/styles/global.css`, `src/pages/index.astro` (placeholder)
- Modify: `.gitignore`

**Interfaces:**
- Produces: CSS custom properties in `src/styles/global.css` — `--color-primary`, `--color-secondary`, `--color-accent`, `--color-background`, `--color-foreground`, `--color-border`, `--color-muted-foreground` (each redefined under `:root.dark`); Tailwind theme colors `primary`, `secondary`, `accent`, `background`, `foreground`, `border`, `muted-foreground` mapped to those CSS vars in `tailwind.config.mjs`; Tailwind `fontFamily.serif` = `["EB Garamond", "serif"]` and `fontFamily.sans` = `["Lato", "sans-serif"]`.

- [ ] **Step 1: Delete the Next.js app and its config**

Run:
```bash
rm -rf app next.config.ts postcss.config.js tsconfig.json pnpm-lock.yaml node_modules
```

- [ ] **Step 2: Write `package.json`**

```json
{
  "private": true,
  "license": "MIT",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

- [ ] **Step 3: Install dependencies**

Run:
```bash
npm install astro @astrojs/sitemap @astrojs/tailwind tailwindcss@^3 @vercel/analytics @vercel/speed-insights
npm install -D @astrojs/check typescript
```
Expected: installs succeed, `package.json` now lists these under `dependencies`/`devDependencies`.

- [ ] **Step 4: Write `astro.config.mjs`**

```js
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.innoviq.de",
  output: "static",
  integrations: [tailwind({ applyBaseStyles: false }), sitemap()],
});
```

- [ ] **Step 5: Write `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 6: Write `tailwind.config.mjs`**

Map each Tailwind color name to its CSS variable (e.g. `primary: "var(--color-primary)"`) for `primary`, `secondary`, `accent`, `background`, `foreground`, `border`, `muted-foreground`; set `darkMode: "class"`; set `content: ["./src/**/*.{astro,html,ts,tsx}"]`; set `fontFamily.serif` and `fontFamily.sans` as given above. No plugins (no `@tailwindcss/typography`).

- [ ] **Step 7: Write `src/styles/global.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: #0F172A;
  --color-secondary: #334155;
  --color-accent: #0369A1;
  --color-background: #F8FAFC;
  --color-foreground: #020617;
  --color-border: #E2E8F0;
  --color-muted-foreground: #475569;
}

:root.dark {
  --color-primary: #F8FAFC;
  --color-secondary: #CBD5E1;
  --color-accent: #38BDF8;
  --color-background: #0B1120;
  --color-foreground: #F8FAFC;
  --color-border: #1E293B;
  --color-muted-foreground: #94A3B8;
}

html {
  min-width: 360px;
}

body {
  @apply bg-background text-foreground;
}

::selection {
  background-color: #0369A1;
  color: #fefefe;
}

.dot-list {
  list-style: none;
  padding-left: 0;
}

.dot-list li {
  position: relative;
  padding-left: 1.5rem;
}

.dot-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.65em;
  height: 0.375rem;
  width: 0.375rem;
  border-radius: 9999px;
  background-color: var(--color-accent);
}
```

- [ ] **Step 8: Write a placeholder `src/pages/index.astro`**

```astro
---
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>innoviq</title>
  </head>
  <body>
    <h1>Placeholder</h1>
  </body>
</html>
```

- [ ] **Step 9: Update `.gitignore`**

Replace the `# next.js` block (`/.next/`, `/out/`) with:
```
# astro
dist/
.astro/
```
Keep everything else as-is.

- [ ] **Step 10: Verify the project builds**

Run: `npm run build`
Expected: completes with no errors, `dist/index.html` exists and contains `Placeholder`.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "chore: remove Next.js, scaffold Astro project with design tokens"
```

---

## Task 2: Shared layout — BaseLayout, Nav, Footer, ThemeToggle, config, analytics

**Files:**
- Create: `src/config.ts`, `src/layouts/BaseLayout.astro`, `src/components/Nav.astro`, `src/components/Footer.astro`, `src/components/ThemeToggle.astro`

**Interfaces:**
- Consumes: Tailwind color/font tokens from Task 1 (`bg-background`, `text-foreground`, `text-primary`, `text-accent`, `font-serif`, `font-sans`, etc.).
- Produces: `BaseLayout.astro` accepts props `{ title: string; description?: string }` and renders `<slot />` for page content between `<Nav />` and `<Footer />`; `metaData` (`{ baseUrl, title, name, description, ogImage }`) and `socialLinks` (`{ email, phone }`) exported from `src/config.ts`, consumed by `Nav.astro`/`Footer.astro` and by later page tasks.

- [ ] **Step 1: Write `src/config.ts`**

```ts
export const metaData = {
  baseUrl: "https://www.innoviq.de",
  title: "innoviq GmbH - Simon Böck - Angerstraße 46a - 86842 Türkheim",
  name: "Simon Böck",
  description: "",
  ogImage: "/opengraph-image.png",
};

export const socialLinks = {
  email: "mailto:info@innoviq.de",
  phone: "tel:+49 176 21156612",
};
```

- [ ] **Step 2: Write `src/components/ThemeToggle.astro`**

Renders a `<button id="theme-toggle" aria-label="Toggle theme">` containing an inline sun/moon SVG icon (two `<path>`s, one shown per theme via CSS, no icon library dependency — a single accessible toggle, not two swapped elements). Include this script, verbatim:

```html
<script is:inline>
  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
</script>
```

- [ ] **Step 3: Write `src/components/Nav.astro`**

Imports `metaData` from `../config`. Structure:

```html
<nav class="lg:mb-16 mb-12 py-5">
  <div class="flex flex-col md:flex-row md:items-center justify-between">
    <a href="/" class="text-2xl font-serif font-semibold tracking-tight text-primary">{metaData.name}</a>
    <div class="flex flex-row gap-6 mt-6 md:mt-0 md:ml-auto items-center font-sans text-secondary">
      <a href="/cv" class="transition-colors hover:text-accent">CV</a>
      <a href="/testimonials" class="transition-colors hover:text-accent">Testimonials</a>
      <ThemeToggle />
    </div>
  </div>
</nav>
```

- [ ] **Step 4: Write `src/components/Footer.astro`**

Imports `metaData` and `socialLinks` from `../config`. Renders `© <current year> {metaData.title}` and two icon links (`socialLinks.email`, `socialLinks.phone`) using inline SVG icons (mail, phone) — no icon package dependency. Compute the year with `new Date().getFullYear()` in the frontmatter.

- [ ] **Step 5: Write `src/layouts/BaseLayout.astro`**

Props: `{ title: string; description?: string }`. In `<head>`: charset, viewport meta, `<title>{title}</title>`, meta description (falls back to `metaData.description`), Open Graph tags (`og:title`, `og:description`, `og:image` = `metaData.ogImage`, `og:url` = `metaData.baseUrl`), favicon link, Google Fonts link for EB Garamond + Lato with `display=swap`, and this inline theme-init script verbatim as the first thing in `<head>` (before any stylesheet) so it runs before paint:

```html
<script is:inline>
  (function () {
    const stored = localStorage.getItem("theme");
    const theme = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
  })();
</script>
```

Import `../styles/global.css`. Body renders `<Nav />`, `<slot />`, `<Footer />`, then the Vercel Analytics and Speed Insights script tags (per each package's framework-agnostic injection snippet — a `<script>` tag per package, not the React component API).

- [ ] **Step 6: Update `src/pages/index.astro` to use the layout**

Replace the Task 1 placeholder with:
```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
---
<BaseLayout title="innoviq">
  <h1>Placeholder</h1>
</BaseLayout>
```

- [ ] **Step 7: Verify nav, footer, and theme-init script are present in the build**

Run: `npm run build && grep -o "theme-toggle" dist/index.html && grep -o "localStorage.getItem(\"theme\")" dist/index.html`
Expected: both greps match (nav/toggle markup and the init script are present in the built page).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add BaseLayout, Nav, Footer, ThemeToggle, and site config"
```

---

## Task 3: Home page (bio narrative)

**Files:**
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `BaseLayout` from Task 2.

- [ ] **Step 1: Write the home page content**

Replace the placeholder body with the bio content, wrapped in `<BaseLayout title={metaData.title} description={metaData.description}>` (import `metaData` from `../config`):

- Profile photo: `<img src="/profile.jpg" alt="Profile photo" width="250" height="250" class="rounded-full ring-1 ring-border shadow-sm block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-6 sm:mb-5" />`.
- `<h1>` "About me" in `font-serif font-semibold text-3xl tracking-tight text-primary mb-8`.
- Four paragraphs, exact text:
  1. "Hi, I'm Simon Böck — a Product Manager, Product Owner, and Business Analyst."
  2. "For more than a decade, I've worked across product management, agile methodologies, API development, and digital transformation in a wide range of industries."
  3. "I help you build better products: analyzing problems, identifying the right strategic and digital solutions, and coordinating development teams to get there."
  4. "Together, we shape your vision and turn it into real value. My toolkit is built to help you achieve:"
- A `<ul class="dot-list space-y-2">` (using the `.dot-list` class from `global.css`) with exactly these 4 `<li>` items: "ambitious strategies and inspiring product visions", "value-adding products powered by digital technology", "modern ways of working", "the courage to challenge the status quo".

- [ ] **Step 2: Verify the bio content builds correctly**

Run: `npm run build && grep -c "Hi, I.m Simon Böck" dist/index.html && grep -c "the courage to challenge the status quo" dist/index.html`
Expected: both greps report `1`.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: implement home page bio content"
```

---

## Task 4: Testimonials page

**Files:**
- Create: `src/data/testimonials.ts`, `src/pages/testimonials.astro`

**Interfaces:**
- Consumes: `BaseLayout` from Task 2.
- Produces: `Testimonial` interface (`{ name: string; title: string; company: string; description: string }`) and `testimonials: Testimonial[]` exported from `src/data/testimonials.ts`.

- [ ] **Step 1: Write `src/data/testimonials.ts`**

Port the 3 entries verbatim from the current `app/testimonials/project-data.tsx` (Carsten Fritz / Sopra Financial Technologies GmbH, Viktor Frank / Ausy Technologies Germany AG, Sven Thiermann / TIMOCOM GmbH — same `name`, `title`, `company`, `description` text).

- [ ] **Step 2: Write `src/pages/testimonials.astro`**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import { testimonials } from "../data/testimonials";
---
<BaseLayout title="Testimonials">
  <h1>Testimonials</h1>
  {testimonials.map((t) => (
    <article>
      <h2>{t.name}</h2>
      <h3>{t.title} - {t.company}</h3>
      <p>{t.description}</p>
    </article>
  ))}
</BaseLayout>
```
Style each `<article>` as a bordered card (`border-border`, rounded corners, padding, spaced with `space-y-*`), name in `font-serif`, quote body in `font-sans text-secondary`.

- [ ] **Step 3: Verify all three testimonials build correctly**

Run: `npm run build && grep -c "Carsten Fritz" dist/testimonials/index.html && grep -c "Viktor Frank" dist/testimonials/index.html && grep -c "Sven Thiermann" dist/testimonials/index.html`
Expected: all three greps report `1`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: implement testimonials page"
```

---

## Task 5: CV page

**Files:**
- Create: `src/data/cv.ts`, `src/pages/cv.astro`
- Verify unchanged: `public/files/Simon_Boeck_Product_Owner_IAM_API_en.pdf` (already in `public/`, untouched by Task 1's deletions — this task only confirms it's still there)

**Interfaces:**
- Consumes: `BaseLayout` from Task 2.
- Produces: `src/data/cv.ts` exports `personalInfo: { citizenship: string; travelReadiness: string; capacity: string }`, `languages: string[]`, `summary: string[]`, `skills: { practices: string[]; expertise: string[]; tools: string[]; techniques: string[] }`, `education: { degree: string; year: string; institution: string }[]`, `certifications: string[]`, `projects: { role: string; client: string; dates: string; description: string; responsibilities: string[] }[]`, `projectsNote: string`.

- [ ] **Step 1: Confirm the PDF asset is present**

Run: `test -f public/files/Simon_Boeck_Product_Owner_IAM_API_en.pdf && echo OK`
Expected: prints `OK` (the file already exists in `public/files/` from the current project and needs no action — this step only confirms it survived Task 1's cleanup).

- [ ] **Step 2: Write `src/data/cv.ts`**

Populate with the exact content from the spec's Appendix ("CV content (extracted verbatim...)"): `personalInfo` (citizenship "German", travelReadiness "Europe", capacity "50% - 100%"), `languages` (2 entries), `summary` (same 2 paragraphs as the home page's intro, split as spec shows), `skills` (4 groups, exact items listed in the spec), `education` (3 entries), `certifications` (4 entries), `projects` (10 entries, each with the exact role/client/dates/description/responsibilities from the spec Appendix, most recent first), `projectsNote` = "Further projects from the years 2011 - 2016 on request".

- [ ] **Step 3: Write `src/pages/cv.astro`**

Import `BaseLayout`, `metaData`, and everything from `../data/cv`. Structure:
- Header: `metaData.name`, title line "Product Manager / Product Owner / Business Analyst", a contact line, and a `<a href="/files/Simon_Boeck_Product_Owner_IAM_API_en.pdf" download>Download PDF</a>` link — give this link and the surrounding header a class (e.g. `cv-no-print`) used by the print stylesheet in Step 4.
- Personal Information section from `personalInfo` and `languages`.
- Summary section rendering each paragraph in `summary`.
- Skills section: four labeled groups rendered from `skills`, two-column on `sm:` and up (`grid grid-cols-1 sm:grid-cols-2`).
- Education list from `education` (`"{degree} — {year}, {institution}"`).
- Certifications list from `certifications`.
- Experience section: `projects.map(...)` rendering role, `{client} — {dates}`, description, and a `<ul>` of `responsibilities`; render `projectsNote` as a closing italic line.
- Give `<Nav />`/`<Footer />`'s wrapping elements (rendered by `BaseLayout`, already in the DOM) no special handling here — print hiding happens via the CSS selectors in Step 4, not by conditionally rendering them.

- [ ] **Step 4: Add the print stylesheet**

In `src/pages/cv.astro`, add a `<style>` block:
```css
@media print {
  nav, footer, .cv-no-print {
    display: none !important;
  }
}
```

- [ ] **Step 5: Verify CV content and print stylesheet build correctly**

Run:
```bash
npm run build
grep -c "Simon Böck" dist/cv/index.html
grep -c "Senior Business Analyst" dist/cv/index.html
grep -c "Identity & Access Management Subproject Manager" dist/cv/index.html
grep -c "Certified SAFe 4 Agilist" dist/cv/index.html
grep -c "/files/Simon_Boeck_Product_Owner_IAM_API_en.pdf" dist/cv/index.html
test -f dist/files/Simon_Boeck_Product_Owner_IAM_API_en.pdf && echo PDF_OK
grep -rl "@media print" dist/_astro/*.css
```
Expected: all `grep -c` commands report `1` or more, `PDF_OK` is printed, and the last grep finds at least one matching CSS file.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: implement CV page with print stylesheet"
```

---

## Task 6: 404 page, robots.txt, and final cross-page verification

**Files:**
- Create: `src/pages/404.astro`, `public/robots.txt`

**Interfaces:**
- Consumes: `BaseLayout` from Task 2.

- [ ] **Step 1: Write `src/pages/404.astro`**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
---
<BaseLayout title="404">
  <h1>404 - Page not found</h1>
  <p>Oops! The page you're looking for doesn't seem to exist.</p>
</BaseLayout>
```

- [ ] **Step 2: Write `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://www.innoviq.de/sitemap-index.xml
```

- [ ] **Step 3: Build and verify the sitemap, robots, and 404 output**

Run:
```bash
npm run build
test -f dist/sitemap-index.xml && echo SITEMAP_OK
test -f dist/robots.txt && echo ROBOTS_OK
test -f dist/404.html && echo NOTFOUND_OK
grep -o "theme-toggle" dist/testimonials/index.html
grep -o "theme-toggle" dist/cv/index.html
grep -o "theme-toggle" dist/404.html
grep -o 'href="/cv"' dist/index.html
grep -o 'href="/testimonials"' dist/index.html
```
Expected: `SITEMAP_OK`, `ROBOTS_OK`, `NOTFOUND_OK` all print; the theme-toggle markup is found on every page (confirms the Review Focus item about theme consistency across all pages, not just `/`); nav links are root-relative (`href="/cv"`, not a relative or malformed path — confirms the Review Focus item about root-relative paths for a root-domain deploy).

- [ ] **Step 4: Manual browser verification**

Run `npm run dev`, open the site in the browser, and check:
- Light mode and dark mode on `/`, `/testimonials`, `/cv` (toggle persists across navigation between pages).
- 375px mobile width on all three pages — no horizontal scroll, skills grid on `/cv` collapses to one column.
- The CV page's "Download PDF" link actually downloads the PDF.
- Print preview (browser print dialog) on `/cv` — nav/footer/toggle/download-link are hidden, résumé content is not.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add 404 page and robots.txt, complete Astro migration"
```
