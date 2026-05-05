# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (Next.js with Turbopack)
npm run build    # production build
npm run lint     # run ESLint
```

There are no tests in this project.

## Architecture

This is a personal portfolio site built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **GSAP**, **Framer Motion**, and **Lenis** smooth scroll.

### Page structure

- `/` — renders `src/components/Portfolio.tsx`, which orchestrates the full single-page layout
- `/projects` — lists all projects (`src/app/projects/page.tsx`)
- `/projects/[id]` — project detail page driven by `id` field in the data

### Data layer

All content lives in `src/data/`:

- `work.ts` — `Project` interface + `projects` array (source of truth for all project cards and detail pages). Each project has a required `id` used as the URL slug.
- `about.ts`, `certifications.ts`, `marquee.ts`, `scrollingText.ts` — static content for the respective sections.

To add or edit a project, modify `projects` in `src/data/work.ts`. Images are served from `public/image/<project-id>/`.

### Component hierarchy

```
Portfolio.tsx (client, orchestrates state)
├── Preloader          — initial load animation, gates isLoaded
├── Navbar             — floating glass pill nav
├── Hero               — full-viewport intro, accepts isLoaded
├── Marquee            — horizontal scrolling ticker
├── About              — about section, accepts isLoaded
├── ScrollingTextCarousel
├── ScrollytellingWork — sticky image + GSAP ScrollTrigger scroll-driven project list
├── CertificationGallery — bento grid of cert images, emits onImageClick
├── Contact
└── ImageModal         — fullscreen image viewer, controlled by selectedImage state
```

### Animation conventions

- **GSAP + ScrollTrigger** is used for scroll-driven effects (nav hide/show during work section, active project tracking in `ScrollytellingWork`).
- **Framer Motion** handles enter/exit transitions on individual elements (`AnimatePresence`, `useInView`).
- **`RevealOnScroll`** (`src/components/ui/RevealOnScroll.tsx`) is an `IntersectionObserver`-based wrapper that adds the `.active` class; relies on `.reveal-up` CSS class defined in `globals.css`.
- **Lenis** wraps the entire app in `SmoothScroll` for inertia scrolling.

### Styling

- Tailwind v4 with `@theme` custom tokens defined in `src/app/globals.css` — color, typography, and spacing tokens all live there.
- Path alias `@/*` maps to `src/*`.
- The site is **desktop-only by design** — `MobileAnnouncement` displays a blocker on small screens.

## Design system

All tokens are defined under `@theme` in `src/app/globals.css` and are available as Tailwind utilities (e.g. `bg-background`, `text-primary`, `text-accent`).

### Light / dark duality

The site has two distinct visual contexts:

| Section | Background | Text |
|---|---|---|
| Everything except `#work` | `#FAF9F6` (warm off-white) | `#1A1A1A` dark |
| `#work` (ScrollytellingWork) | `#0d0d0f` near-black | `white` / `white/70` |

When adding UI to the work section, use `text-white`, `border-white/10`, `bg-white/5` etc. — not the light-mode token names.

### Color tokens

| Token | Value | Use |
|---|---|---|
| `--color-background` | `#FAF9F6` | Page background (warm off-white) |
| `--color-foreground` | `#1A1A1A` | Default text |
| `--color-surface` | `#FFFFFF` | Cards / elevated surfaces |
| `--color-primary` | `#1A1A1A` | Primary text / buttons |
| `--color-secondary` | `#525252` | Muted text (nav links, labels) |
| `--color-accent` | `#2563EB` | Royal blue — calls to action, highlights |

Neutral scale: `--color-neutral-50` … `--color-neutral-950` (10-step grey ramp).  
Accent blue scale: `--color-accent-50` … `--color-accent-900`.  
Feedback: `--color-success` `#22C55E`, `--color-warning` `#F59E0B`, `--color-error` `#EF4444`.

### Typography

Four font families injected by Next.js `next/font/google` and exposed as CSS variables:

| Variable | Face | Usage |
|---|---|---|
| `font-heading` | Space Grotesk | Section titles, hero text — tight tracking (`tracking-tighter`) |
| `font-body` | Plus Jakarta Sans | Body copy |
| `font-thai` | IBM Plex Sans Thai | Thai-language paragraphs (`font-thai` Tailwind class) |
| `font-mono` | Fira Code | Labels, tags, badges, counters |

Heading sizes in the work section use `text-4xl` → `text-6xl` with `tracking-tighter` and `font-bold`. Navigation and tag text consistently use `font-mono text-xs uppercase tracking-widest`.

### Global UI patterns

**`.hover-trigger`** — add this class to any interactive element to enlarge the custom cursor ring when hovered. All `<a>`, `<button>`, and `<Link>` elements that the user should notice should have it.

**`.reveal-up`** / **`.reveal-up.active`** — use `<RevealOnScroll>` instead of writing this directly. The wrapper adds `.active` via `IntersectionObserver`.

**`.noise`** — a fixed SVG fractal-noise overlay at 5% opacity covering the entire page, providing film-grain texture. Already rendered in `Portfolio.tsx`; do not add a second one.

**`.gradient-blob`** — mouse-following radial gradient (`#2563EB` at 8% opacity). Already rendered via `<GradientBlob />`.

**`.nav-glass`** / **`.nav-glass--scrolled`** — frosted-glass pill nav. Transitions to an opaque white variant after 80 px of scroll. The GSAP ScrollTrigger in `ScrollytellingWork` hides it (translates Y off-screen) while the work section is in view.

### Custom cursor

Two overlapping `div`s (`.cursor-dot` 8 px filled, `.cursor-outline` 40 px ring). When hovering a `.hover-trigger` element, `.cursor-outline` expands to 80 px and becomes a blur overlay. Inside `#work`, both flip to a light variant (`cursor-dot--light`, `cursor-outline--light`) because the background is dark. Desktop only — hidden on mobile via `hidden md:block`.

### z-index layers

| Token | Value | Layer |
|---|---|---|
| `--z-cursor` | 9999 | Custom cursor |
| `--z-noise` | 9000 | Noise overlay |
| `--z-preloader` | 99999 | Preloader (above everything) |
| `z-50` | 50 | Navbar, modals |

### Animation tokens (easing)

| Token | Curve | Typical use |
|---|---|---|
| `--ease-smooth` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | General transitions |
| `--ease-bounce` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Preloader slide-out |
| `--ease-elastic` | `cubic-bezier(0.7, 0, 0.3, 1)` | Heavy entrance animations |

Framer Motion equivalents used in components: `[0.22, 1, 0.36, 1]` (snappy entrance), `[0.16, 1, 0.3, 1]` (image swap). Duration defaults: 300 ms for micro-interactions, 700–800 ms for content reveals.

### Project status badge colours

| Status value | Light-theme classes | Dark-theme classes |
|---|---|---|
| `Production` | `bg-green-100 text-green-700` | `bg-green-500/10 text-green-400 border-green-500/20` |
| `DEVELOPMENT` | `bg-yellow-100 text-yellow-700` | `bg-amber-500/10 text-amber-400 border-amber-500/20` |
| anything else | `bg-gray-100 text-gray-600` | `bg-white/5 text-white/30 border-white/10` |

Use light-theme classes on the project detail page (`/projects/[id]`) and dark-theme classes in the work section cards.
