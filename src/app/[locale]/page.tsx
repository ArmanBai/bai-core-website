import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { Services } from "@/components/sections/services";
import { Products } from "@/components/sections/products";
import { Process } from "@/components/sections/process";
import { LatestArticles } from "@/components/sections/latest-articles";
import { FinalCTA } from "@/components/sections/final-cta";
import { SectionDivider } from "@/components/section-divider";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="bg-background text-foreground">
        <Hero />
        <SectionDivider variant="accent" />
        <Manifesto />
        <TechMarquee />
        <Services />
        <SectionDivider />
        <Products />
        <SectionDivider />
        <Process />
        <SectionDivider />
        <LatestArticles />
        <FinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}
