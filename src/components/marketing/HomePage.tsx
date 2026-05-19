"use client";

import { MarketingNav } from "./MarketingNav";
import { HeroSection } from "./HeroSection";
import { TemplatesSection } from "./TemplatesSection";
import { PricingSection } from "./PricingSection";
import { FeaturesSection } from "./FeaturesSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { GetStartedSection } from "./GetStartedSection";
import { FooterSection } from "./FooterSection";

export function HomePage() {
  return (
    <>
      <MarketingNav />
      <main>
        <HeroSection />
        <TemplatesSection />
        <PricingSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <GetStartedSection />
      </main>
      <FooterSection />
    </>
  );
}
