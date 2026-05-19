"use client";

import { m } from "framer-motion";
import { howItWorksSteps } from "@/config/marketing";
import { SectionHeading } from "./SectionHeading";
import { CTALink } from "./CTALink";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";
import { defaultViewport } from "@/lib/animations/viewport";

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 border-t border-ivory/5 bg-gradient-to-b from-charcoal to-[#0d0c0a] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Process"
          title="How it works"
          description="From template to shared link in three simple steps — no technical skills required."
        />

        <m.ol
          className="mt-14 grid gap-8 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {howItWorksSteps.map((item, index) => (
            <m.li
              key={item.step}
              variants={fadeUp}
              className="relative"
            >
              {index < howItWorksSteps.length - 1 && (
                <span
                  className="absolute top-8 left-[calc(50%+2rem)] hidden h-px w-[calc(100%-4rem)] bg-gradient-to-r from-gold/40 to-transparent md:block"
                  aria-hidden
                />
              )}
              <span className="font-display text-5xl font-light text-gold/25">
                {item.step}
              </span>
              <h3 className="mt-4 font-display text-2xl font-light">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory/55">
                {item.description}
              </p>
            </m.li>
          ))}
        </m.ol>

        <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <CTALink href="/templates" variant="secondary">
            View Templates
          </CTALink>
          <CTALink href="#get-started">Get Started</CTALink>
        </div>
      </div>
    </section>
  );
}
