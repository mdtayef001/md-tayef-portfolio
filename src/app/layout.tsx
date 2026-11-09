import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree, JetBrains_Mono } from "next/font/google";
import { CursorRing } from "@/components/ui/cursor-ring";
import { Magnetic } from "@/components/ui/magnetic";
import { SmoothAnchors } from "@/components/ui/smooth-anchors";
import { site, socials } from "@/data/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Md Tayef is a web developer in Dhaka, Bangladesh building full-stack websites and web apps with Next.js, TypeScript, Node.js and Django. Currently running Devix Technologies, a digital agency.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | ${site.role}`,
  description,
  keywords: [
    "Md Tayef",
    "Web Developer",
    "Dhaka",
    "Bangladesh",
    "Next.js",
    "TypeScript",
    "Django",
    "Devix Technologies",
    "Freelance web developer",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    title: `${site.name} | ${site.role}`,
    description,
    url: "/",
    siteName: site.name,
    images: [{ url: "/tayef.png", width: 1080, height: 1080, alt: site.name }],
  },
  twitter: {
    card: "summary",
    title: `${site.name} | ${site.role}`,
    description,
    images: ["/tayef.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1324",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  worksFor: { "@type": "Organization", name: site.agency.name, url: site.agency.url },
  sameAs: socials.flatMap((s) => (s.href ? [s.href] : [])),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${figtree.variable} ${jetbrains.variable} antialiased`}
    >
      <head>
        {/* Marks animate only when JS runs; without it everything shows drawn. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document.documentElement;d.classList.add('js');try{if(location.pathname==='/'){if(sessionStorage.getItem('mt-intro'))d.classList.add('intro-seen');else sessionStorage.setItem('mt-intro','1')}else d.classList.add('intro-seen')}catch(e){d.classList.add('intro-seen')}})()",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-dvh">
        {children}
        <CursorRing />
        <Magnetic />
        <SmoothAnchors />
      </body>
    </html>
  );
}
