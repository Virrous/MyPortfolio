# Ashes Pokhrel: Personal Portfolio

Personal brand site for **Ashes Pokhrel**, Co-Founder & CEO of **Nepsof Enterprise Pvt. Ltd.**

Built with Next.js 16 (App Router), React 19 and TypeScript. Styling is plain
CSS: one shared foundation file plus a CSS Module per component. There is no
CSS framework or utility-class layer.

The site is structured so the personal identity leads and the company provides
the evidence: Ashes Pokhrel → Co-Founder & CEO → Nepsof Enterprise Pvt. Ltd. →
Products & Systems → SchoolHub.

---

## Styling

No CSS framework. Three layers:

| Layer | File | Scope |
| --- | --- | --- |
| Foundation | `src/styles/base.css` | Design tokens, reset, focus/reduced-motion, and the shared primitives (`shell`, `eyebrow`, `display-1`/`2`/`3`, `card`, `tag`, `link-underline`, `sr-only`, `skip-link`, `sectionAlt`) |
| Component | `<component>.module.css` beside each component | Everything specific to that component |

Colour is a single palette declared once in `:root` in `base.css`. There is no
theme attribute and no second block to keep in sync, so changing a value there
repaints the whole site.

To restyle a section, open the `.module.css` file next to its component. Class
names are hashed at build time, so a rename cannot collide with another
section.

## Typography

| Role | Family | Source |
| --- | --- | --- |
| Display | **Poppins** 600/700 | `next/font/google` in `src/app/layout.tsx` |
| Body and UI | **Plus Jakarta Sans** 400 to 700 | `next/font/google` in `src/app/layout.tsx` |
| Small labels | System mono stack | `--font-mono` in `src/styles/base.css` |

Both families are exposed as CSS variables (`--font-poppins`, `--font-jakarta`)
and consumed through the `--font-display` and `--font-sans` tokens, so the whole
site re-pairs by editing two variables in `base.css`.

## Colour theme

The site is dark only. There is no light mode, no toggle, and no
`localStorage` key, so a visitor never sees a flash of the wrong palette and
there is no theme state to restore on load.

- `src/styles/base.css` holds the one palette in `:root`, plus
  `color-scheme: dark` on `html` so form controls, scrollbars and the canvas
  background match without a script.
- `src/app/layout.tsx` exports a single `themeColor` of `#101112` in the
  `viewport` object, which is what browser chrome is painted with. There is no
  `prefers-color-scheme` media query anywhere, because the answer does not depend
  on the visitor's OS setting.

The `-inverse` token family (`--surface-inverse`, `--fg-on-inverse`) is not a
light theme. It is the light-on-dark family used for the inverted elements that
punctuate the palette: the primary button, the Nepsof statement card, and the
header monogram.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3000
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (Next.js 16 removed `next lint`; this runs the ESLint CLI) |
| `npx tsc --noEmit` | Type check |

---

## Environment variables

Defined in `.env.example`. `.env.local` is gitignored; **never commit real
credentials**.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **Yes, before deploy** | Production origin, no trailing slash. Drives canonical URLs, Open Graph, `robots.txt`, `sitemap.xml` and every JSON-LD `@id`. Default is `https://ashespokhrel.com`. **Change it to the real domain.** |
| `RESEND_API_KEY` | For the contact form | Resend API key from <https://resend.com/api-keys>. |
| `CONTACT_TO_EMAIL` | No | Where submissions are delivered. Defaults to `ceo@nepsof.com`. |
| `CONTACT_FROM_EMAIL` | No | Verified sender. Defaults to `Portfolio <onboarding@resend.dev>`, which only works for sending to the Resend account's own address. For real delivery, verify your domain in Resend and use e.g. `Portfolio <portfolio@yourdomain.com>`. |

### Contact form behaviour

`POST /api/contact` (server-side Route Handler, `src/app/api/contact/route.ts`):

- Validates name, email, subject and message; returns per-field errors the form renders inline.
- Sends via Resend with `replyTo` set to the sender's address.
- **Graceful fallback:** with no `RESEND_API_KEY` it returns `503` and the form shows `ceo@nepsof.com` as a `mailto:` link instead of pretending to have sent.
- A hidden `company_website` honeypot field silently absorbs bot submissions.
- Accepts both JSON and `application/x-www-form-urlencoded`.

---

## Editing content

**Almost all copy lives in one file: `src/data/content.ts`.**

- `profile`: name, roles, statement, About paragraphs, links.
- `capabilities`: the five "What I Do" cards.
- `process`: the six "How I Build" steps.
- `projects`: the case studies. **Add future projects (Bodh, client work) by
  appending to this array**; the homepage card, the `/work/[slug]` route,
  `sitemap.xml` and the JSON-LD all read from it automatically.
- `navigation`: header links.

Identity, URLs and structured data: `src/lib/site.ts`.

### In-page links

Every link to a section on this page uses an absolute target and goes through
`InPageLink` (`src/components/ui/in-page-link.tsx`), for example `/#about` rather
than `#about`.

Both halves of that matter. A bare `#about` resolves against the current route,
so it silently does nothing on `/work/schoolhub`. And a target that resolves to
the page already open gives the router nothing to do, so a plain `Link` would
not scroll at all, which is why clicking the name in the navbar used to leave you
parked at the bottom of the homepage.

`InPageLink` delegates to `next/link` when the path changes and handles the
in-page case directly, so the scroll happens even when the URL is already
correct. It also moves focus to the target, so keyboard and screen reader
position matches the viewport. The rules live in `src/lib/in-page-nav.ts` as
plain functions with no React or DOM dependency.

### Adding a project

Append an object to `projects` in `src/data/content.ts`:

```ts
{
  slug: "bodh",                       // -> /work/bodh
  name: "Bodh",
  category: "...",
  company: "Nepsof Enterprise Pvt. Ltd.",
  status: "Completed · Running",
  summary: "...",
  url: "https://...",
  year: "2026",
  featured: true,                      // false keeps it off the homepage
  caseStudy: {
    problem, approach[], solution,
    role[],                          // full breakdown, case study route only
    roleSummary,                     // one sentence, homepage card
    outcome,
  },
  scope: [{ title, description }],
  technologies: ["..."],
}
```

`category`, `company`, `status` and `year` are not shown on the homepage card.
They still feed the case study page's `<title>`, meta description and JSON-LD
`applicationCategory`, so keep them accurate.

`generateStaticParams` picks the entry up, so the route and sitemap entry are
created with no other changes.

### Adding a new project (case study route)

`/work/[slug]` is a catch-all segment. New slugs need no file changes.

---

## Routes

| Route | Rendering | Purpose |
| --- | --- | --- |
| `/` | Static | Full single-page site |
| `/work/[slug]` | SSG | Dedicated case study (`/work/schoolhub`) |
| `/robots.txt` | Static | Allow all, disallow `/api/`, points to the sitemap |
| `/sitemap.xml` | Static | Generated from `projects` |
| `/opengraph-image`, `/twitter-image` | Static | 1200×630 social cards (`ImageResponse`) |
| `/work/[slug]/opengraph-image` | Dynamic | Per-project social card |
| `/icon.svg` | Static | Favicon |
| `/api/contact` | Dynamic | `POST` only |

---

## SEO

- Title/description/canonical/Open Graph/Twitter via the Next.js `Metadata` API
  in `src/app/layout.tsx` and `src/app/work/[slug]/page.tsx`.
- Social images generated with `ImageResponse` (`src/app/opengraph-image.tsx`).
- JSON-LD `@graph` in `src/lib/site.ts`, rendered by `src/lib/jsonld.tsx`:
  `Person` (worksFor → `Organization`), `Organization`, `WebSite`, plus
  `SoftwareApplication` and `BreadcrumbList` on case studies. All nodes are
  linked by `@id` so the Ashes → Nepsof → SchoolHub relationship is explicit.
- No fabricated founding dates, employee counts, addresses, awards, ratings or
  metrics are emitted.

---

## Notes

- `public/photo.jpg` is the only personal photograph on the site. Replace that
  file to change it. The current file is 1600x1141 (landscape), so the hero card
  uses a 7:5 frame with `object-fit: cover` and `object-position: center`, which
  crops almost nothing. If you swap in a portrait photo, change
  `aspect-ratio` and `object-position` in
  `src/components/sections/hero.module.css` to suit the new file.
- Requires Node.js 20.9+ (uses Node 24 locally).
- `AGENTS.md` is maintained by `next dev`; leave the managed block in place.
