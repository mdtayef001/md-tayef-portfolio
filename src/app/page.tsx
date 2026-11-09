import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Certificates } from "@/components/sections/certificates";
import { Projects } from "@/components/sections/projects";
import { Toolkit } from "@/components/sections/toolkit";
import { HeroEntrance } from "@/components/ui/hero-entrance";
import { IntroLoader } from "@/components/ui/intro-loader";
import { RevealObserver } from "@/components/ui/reveal-observer";
import { ScrollMotion } from "@/components/ui/scroll-motion";

export default function Home() {
  return (
    <>
      <IntroLoader />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Projects />
        <Toolkit />
        <Experience />
        <Certificates />
        <Contact />
      </main>
      <SiteFooter />
      <RevealObserver />
      <ScrollMotion />
      <HeroEntrance />
    </>
  );
}
