# Md Tayef: Portfolio

Personal portfolio built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4.
The visual idea is an engineer's drawing set: each project is a "sheet" with a title
block, experience is a revision table, and amber "redline" pen marks draw on as you scroll.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start
```

## Editing content

Every fact on the site lives in **`src/data/site.ts`**. Components only decide how it looks.

| To change | Edit |
| --- | --- |
| Intro, email, agency | `site` |
| Social links | `socials` (leave `href` out to show a handle as text only) |
| Skills | `skillGroups` |
| Experience | `roles` (newest first) |
| Projects | `projects` (`flow` is the "How it works" diagram) |
| Certificates | `learning.certificates` (newest first, `awarded` as `YYYY-MM-DD`) |
| Boot.dev profile button | `learning.profileUrl` (hidden while empty) |

## Resume and PDF

`/resume` is the resume page. Printed, the same page becomes an A4 PDF on white paper.
The **Download PDF** buttons serve `public/md-tayef-resume.pdf`, generated from that page.
After changing content, regenerate it:

```bash
npm run dev              # in one terminal
npm run resume:pdf       # in another; writes public/md-tayef-resume.pdf
```

The script drives your installed Chrome/Chromium (set `CHROME_PATH` if it is not on your PATH).

## Deploying

Set `NEXT_PUBLIC_SITE_URL` to the live domain (see `.env.example`) so canonical links,
Open Graph tags, the sitemap and robots.txt point to the right place.

## Structure

```
src/
├── app/                 layout (fonts, metadata, JSON-LD), page, resume/, 404, icon, robots, sitemap
├── assets/tayef.png     portrait (optimised by next/image)
├── components/
│   ├── sections/        hero, projects, toolkit, experience, certificates, contact
│   ├── ui/              brand icons, redline marks, reveal observer, headings, copy button
│   ├── site-header.tsx  sticky nav, active-section tracking, mobile menu
│   └── site-footer.tsx
└── data/site.ts         all content
```

Icons: Lucide for UI, `simple-icons` for technology and brand logos.
Motion respects `prefers-reduced-motion`; without JavaScript all content and marks still render.
