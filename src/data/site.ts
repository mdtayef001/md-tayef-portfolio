/**
 * Every fact on the site lives here. Edit this file to update content;
 * components only decide how it looks.
 */
import {
  siCss,
  siDjango,
  siExpress,
  siGit,
  siGithub,
  siGooglegemini,
  siHtml5,
  siInstagram,
  siJsonwebtokens,
  siLinux,
  siMongodb,
  siMongoose,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siTailwindcss,
  siTypescript,
  siWhatsapp,
} from "simple-icons";

/** Minimal shape of a simple-icons entry, so authored icons fit too. */
export type BrandGlyph = { title: string; path: string };

/** LinkedIn was removed from simple-icons, so its mark is authored here. */
const linkedinGlyph: BrandGlyph = {
  title: "LinkedIn",
  path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z",
};

export const site = {
  name: "Md Tayef",
  role: "Web Developer",
  location: "Dhaka, Bangladesh",
  email: "tayefhossain200@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  intro:
    "I'm a Web Developer with a passion for creating websites that not only look good but also solve real problems. When I'm not coding, you can find me exploring new technologies. I'm always eager to take on new opportunities and work hard to build meaningful digital experiences.",
  agency: {
    name: "Devix Technologies",
    url: "https://devixtechnologies.com",
    host: "devixtechnologies.com",
  },
} as const;

export type Social = {
  label: string;
  glyph: BrandGlyph;
  /** Display text, e.g. a handle. */
  handle: string;
  /** Omit when there is no working link (shown as text only). */
  href?: string;
};

export const socials: Social[] = [
  {
    label: "LinkedIn",
    glyph: linkedinGlyph,
    handle: "in/mdtayef",
    href: "https://www.linkedin.com/in/mdtayef/",
  },
  {
    label: "GitHub",
    glyph: siGithub,
    handle: "mdtayef001",
    href: "https://github.com/mdtayef001",
  },
  {
    label: "Instagram",
    glyph: siInstagram,
    handle: "@md___tayef",
    href: "https://www.instagram.com/md___tayef/",
  },
  {
    label: "WhatsApp",
    glyph: siWhatsapp,
    handle: "@tayef01",
    href: "https://wa.me/tayef01",
  },
];

export const navItems = [
  { id: "work", label: "Work" },
  { id: "toolkit", label: "Toolkit" },
  { id: "experience", label: "Experience" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navItems)[number]["id"];

/* ------------------------------------------------------------------ */
/* Toolkit                                                             */
/* ------------------------------------------------------------------ */

export type Skill = { name: string; glyph?: BrandGlyph };

export type SkillGroup = {
  code: string;
  title: string;
  note: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    code: "FE",
    title: "Frontend",
    note: "Interfaces that load fast and read well on any screen.",
    skills: [
      { name: "HTML", glyph: siHtml5 },
      { name: "CSS", glyph: siCss },
      { name: "Next.js", glyph: siNextdotjs },
      { name: "Tailwind CSS", glyph: siTailwindcss },
    ],
  },
  {
    code: "BE",
    title: "Backend",
    note: "APIs, authentication and the logic behind the screen.",
    skills: [
      { name: "Node.js", glyph: siNodedotjs },
      { name: "Express.js", glyph: siExpress },
      { name: "Django", glyph: siDjango },
      { name: "JWT", glyph: siJsonwebtokens },
    ],
  },
  {
    code: "DB",
    title: "Data",
    note: "Relational and document databases.",
    skills: [{ name: "SQL" }, { name: "MongoDB", glyph: siMongodb }, { name: "Mongoose", glyph: siMongoose }],
  },
  {
    code: "LG",
    title: "Languages",
    note: "What the work is written in.",
    skills: [
      { name: "TypeScript", glyph: siTypescript },
      { name: "Python", glyph: siPython },
    ],
  },
  {
    code: "CS",
    title: "Foundations",
    note: "The ideas underneath the frameworks.",
    skills: [
      { name: "Object-Oriented Programming" },
      { name: "Data Structures & Algorithms" },
      { name: "Functional Programming" },
    ],
  },
  {
    code: "TL",
    title: "Tools",
    note: "Where the code gets written, run and versioned.",
    skills: [
      { name: "Git", glyph: siGit },
      { name: "Linux", glyph: siLinux },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export type Role = {
  rev: string;
  title: string;
  org: string;
  orgUrl?: string;
  period: string;
  facts: string[];
  summary: string;
  current?: boolean;
};

/** Newest first, like a drawing's revision table. */
export const roles: Role[] = [
  {
    rev: "C",
    title: "Running my own agency",
    org: "Devix Technologies",
    orgUrl: site.agency.url,
    period: "Now",
    facts: ["Agency", "Web development", "Digital solutions"],
    summary:
      "Devix Technologies is my own digital agency. Through it I take on web development projects and digital solutions for businesses, from the first conversation to a site that is live and working.",
    current: true,
  },
  {
    rev: "B",
    title: "Freelance Web Developer",
    org: "Independent",
    period: "After Sep 2025",
    facts: ["Freelance", "Clients in Bangladesh"],
    summary:
      "After SM Technology I started working directly with clients in Bangladesh: understanding what each business needs, then designing, building and shipping the website or web app to solve it.",
  },
  {
    rev: "A",
    title: "Junior Web Developer",
    org: "SM Technology",
    period: "May 2025 – Sep 2025",
    facts: ["Full-time", "On-site", "Dhaka, Bangladesh"],
    summary: "My first full-time developer role, working on-site with a team in Dhaka.",
  },
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type FlowNode = { label: string; detail?: string };

export type Project = {
  sheet: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  glyphs: BrandGlyph[];
  repo: string;
  live?: string;
  /** Short stack summary for the sheet's title block. */
  primary: string;
  /** A phrase inside one highlight that gets the sheet's redline circle. */
  mark: string;
  /** The project's real architecture, drawn as a flow. */
  flow: FlowNode[];
  flowCaption: string;
};

export const projects: Project[] = [
  {
    sheet: "S-01",
    name: "Friday Inventory",
    tagline: "Inventory and sales SaaS for shops in Bangladesh",
    description:
      "A multi-business inventory platform. A super admin runs the platform, owners run their business, and managers and staff work only at the outlets they are assigned to, with exactly the rights the owner allows.",
    highlights: [
      "Monthly subscription with a 7-day trial, paid through SSLCommerz (bKash, Nagad, Rocket, cards); unpaid businesses lock to the Subscribe page",
      "Every sale freezes its price and cost, so later price changes never rewrite past profit",
      "Sales reports by period, shop, product and seller, with revenue and profit charts and CSV export",
      "Client order-tracking links, rentals and stock transfers that owners switch on per business",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "TanStack Query",
      "Django REST Framework",
      "JWT",
      "PostgreSQL",
    ],
    glyphs: [siNextdotjs, siTypescript, siDjango, siPostgresql],
    repo: "https://github.com/mdtayef001/Friday-Inventory",
    primary: "Next.js + Django",
    mark: "freezes its price and cost",
    flow: [
      { label: "Next.js app", detail: "roles · dashboards" },
      { label: "Django REST API", detail: "JWT auth" },
      { label: "PostgreSQL", detail: "Supabase" },
      { label: "SSLCommerz", detail: "subscriptions" },
    ],
    flowCaption: "Frontend and backend deploy as two Vercel projects",
  },
  {
    sheet: "S-02",
    name: "AI Agent",
    tagline: "A tool-using coding agent on Google Gemini",
    description:
      "An agent built in Python on the Gemini API (gemini-2.5-flash). It is given four functions and decides for itself which one a prompt needs, runs it inside a target directory, reads the result and keeps going until the task is done.",
    highlights: [
      "Four tools exposed to the model: read file, write file, run a Python file, get directory info",
      "Reason, act, observe loop that feeds every result back to the model",
      "Hard limit of 20 steps so the agent can never loop forever",
      "File access restricted to one target directory",
    ],
    stack: ["Python", "Google Gemini API", "Function calling", "uv"],
    glyphs: [siPython, siGooglegemini],
    repo: "https://github.com/mdtayef001/ai_agent",
    primary: "Python + Gemini",
    mark: "20 steps",
    flow: [
      { label: "Prompt" },
      { label: "Gemini picks a tool", detail: "read · write · run · list" },
      { label: "Tool runs", detail: "target directory" },
      { label: "Result fed back", detail: "≤ 20 steps" },
    ],
    flowCaption: "Loops until the task is finished or the step limit is reached",
  },
  {
    sheet: "S-03",
    name: "Static Site Generator",
    tagline: "Markdown to a full website, written from scratch",
    description:
      "A static site generator in Python with no frameworks and no Markdown libraries. It parses Markdown into a tree of HTML nodes, renders every page into a template and writes a complete site, published on GitHub Pages. Built through the Boot.dev course.",
    highlights: [
      "Inline parser: a chain of splitters for bold, italic, code, images and links",
      "Block parser for headings, lists, quotes and fenced code",
      "HTMLNode, LeafNode and ParentNode classes that render themselves recursively",
      "Covered by a suite of 90 tests",
    ],
    stack: ["Python", "OOP", "Recursion", "GitHub Pages"],
    glyphs: [siPython, siGithub],
    repo: "https://github.com/mdtayef001/Static-Site-Generator",
    primary: "Python, from scratch",
    mark: "90 tests",
    live: "https://mdtayef001.github.io/Static-Site-Generator/",
    flow: [
      { label: "content/*.md" },
      { label: "Parse Markdown", detail: "inline + blocks" },
      { label: "HTML node tree", detail: "recursive render" },
      { label: "docs/*.html", detail: "GitHub Pages" },
    ],
    flowCaption: "Static assets are copied across recursively",
  },
];

/* ------------------------------------------------------------------ */
/* Certificates                                                        */
/* ------------------------------------------------------------------ */

export type Certificate = {
  title: string;
  href: string;
  /** ISO date the certificate was awarded. */
  awarded: string;
};

export const learning = {
  platform: "Boot.dev",
  /** Add your public Boot.dev profile URL to show the profile link. */
  profileUrl: "",
  /** Newest first. Titles and dates are taken from each certificate page. */
  certificates: [
    {
      title: "Learn HTTP Clients in Python",
      href: "https://www.boot.dev/certificates/c0c07737-e04f-485b-8560-9ac47c32524c",
      awarded: "2026-08-11",
    },
    {
      title: "Learn SQL",
      href: "https://www.boot.dev/certificates/d02e6f15-b7b5-4d8d-b5e6-1633601580ac",
      awarded: "2026-08-05",
    },
    {
      title: "Learn Data Structures and Algorithms in Python",
      href: "https://www.boot.dev/certificates/50db22ea-e138-437a-bf62-e55dbeb31555",
      awarded: "2026-07-04",
    },
    {
      title: "Learn Functional Programming in Python",
      href: "https://www.boot.dev/certificates/a8fb662f-20ec-432d-ae0e-37bdf82ed2ad",
      awarded: "2026-01-22",
    },
    {
      title: "Learn Object Oriented Programming in Python",
      href: "https://www.boot.dev/certificates/04f41104-98d4-41c2-9442-38b83ab1d0ae",
      awarded: "2025-11-25",
    },
    {
      title: "Learn Git",
      href: "https://www.boot.dev/certificates/f72a3f2c-c1db-4f4b-9c26-c37df3eb544f",
      awarded: "2025-09-29",
    },
    {
      title: "Learn Linux",
      href: "https://www.boot.dev/certificates/97613368-3778-44ca-8d47-252f1ca0a850",
      awarded: "2025-09-23",
    },
    {
      title: "Introduction to Python",
      href: "https://www.boot.dev/certificates/3c99d1f2-4504-4c8e-9467-34c342081e59",
      awarded: "2025-09-09",
    },
  ] satisfies Certificate[],
};

/** "2026-08-11" -> "Aug 2026" (or "Aug 11, 2026" with day). */
export function formatDate(iso: string, withDay = false) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    ...(withDay ? { day: "numeric" } : {}),
    timeZone: "UTC",
  });
}

/** Path of the generated resume PDF inside /public. */
export const resumePdf = "/md-tayef-resume.pdf";
