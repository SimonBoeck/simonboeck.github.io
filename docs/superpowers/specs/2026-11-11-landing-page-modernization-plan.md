# Landing Page Modernization Plan

**Date:** 2026-11-11
**Scope:** Bounded visual refresh of the existing homepage. No new sections, no new components, no restructuring of the site.

## Goal

Keep the current single-column "About me" bio layout exactly as it is structurally, but make it look more modern: clean, minimal, polished. Visual polish only — no new content blocks (confirmed with user).

## Current state

- [`app/page.tsx`](../../../app/page.tsx): profile photo (floated right, grayscale-to-color hover), `h1` "About me", a `prose` block with 4 paragraphs and a plain bullet list. Has a typo ("more then a decade").
- [`app/layout.tsx`](../../../app/layout.tsx): centered column, `max-w-[624px]`.
- [`app/components/nav.tsx`](../../../app/components/nav.tsx): site name + CV/Testimonials links + theme switch.
- [`app/components/footer.tsx`](../../../app/components/footer.tsx): copyright line + email/phone icon links.
- [`app/global.css`](../../../app/global.css): `.prose` text is pure `#000`/`#FFF`; links use neutral underline decoration; no accent color; default `<ul>` bullets.
- [`tailwind.config.js`](../../../tailwind.config.js): no custom color tokens defined.

## Design

1. **Typography & hierarchy** — Soften pure black/white `.prose` text to `neutral-800`/`neutral-200` for less harsh contrast, add `leading-relaxed`, bump the `h1` to `text-3xl font-semibold tracking-tight` (from `text-2xl font-medium`).
2. **Color accent** — Add a single `accent` color token to `tailwind.config.js` (blue, matching the existing `::selection` blue) and use it sparingly: link hover color/underline, bullet markers, nav link hover, social icon hover, theme-toggle.
3. **Layout breathing room** — Widen the content column from `624px` to `680px` in `layout.tsx`.
4. **Profile image** — Remove the `grayscale hover:grayscale-0` effect; replace with a static `ring-1 ring-black/5 dark:ring-white/10 shadow-sm`.
5. **List styling** — Replace default browser bullets in the `.prose ul` with custom small accent-colored dot markers via CSS (`list-none` + `::before`), still plain text, no icons/cards.
6. **Nav polish** — Reduce name size slightly (`text-3xl` → `text-2xl`) for better balance with nav links, tighten link color/hover transition to the accent color.
7. **Footer polish** — Neutral-500 color for copyright/icons in both themes, accent-colored hover on social icons, remove the stacked `transition-all`/`opacity` hover in favor of `transition-colors`.
8. **Copy rephrase** — Light edit of the bio text for a more confident, concise tone and to fix the "more then" typo. Facts (role, decade of experience, focus areas) are preserved, no invented details. Draft:
   - "Hi, I'm Simon Böck — a Product Manager, Product Owner, and Business Analyst."
   - "For more than a decade, I've worked across product management, agile methodologies, API development, and digital transformation in a wide range of industries."
   - "I help you build better products: analyzing problems, identifying the right strategic and digital solutions, and coordinating development teams to get there."
   - "Together, we shape your vision and turn it into real value. My toolkit is built to help you achieve:" followed by the same 4 bullet themes, lightly tightened.

## Files touched

- `app/page.tsx`
- `app/global.css`
- `app/components/nav.tsx`
- `app/components/footer.tsx`
- `app/layout.tsx` (container width only)
- `tailwind.config.js` (accent color token only)

No new dependencies, no new components, no changes to `app/testimonials/*` or `app/config.ts`.

## Testing

Visual-only change, no new logic — verify by running the dev server and checking:
- Light mode and dark mode rendering
- Desktop and mobile widths
- Nav/footer hover states and theme toggle

## Out of scope

- Restructuring into a multi-section marketing landing page (hero/services/CTA) — explicitly ruled out; bio-blog style is being kept.
- Changes to the Testimonials page, CV link, or site metadata/config.
- Fixing the pre-existing `next-themes` hydration warning on `<html>` (unrelated, noted separately).
