"use client";

import { m } from "framer-motion";
import { platformFeatures } from "@/config/marketing";
import { SectionHeading } from "./SectionHeading";
import { FeatureIcon } from "./FeatureIcon";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";
import { defaultViewport } from "@/lib/animations/viewport";

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Features"
          title="Everything guests expect, beautifully delivered"
          description="Built for the way South African couples actually share invitations — fast, mobile, and unforgettable."
        />

        <m.ul
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {platformFeatures.map((feature) => (
            <m.li
              key={feature.id}
              variants={fadeUp}
              className="rounded-2xl border border-ivory/8 bg-gradient-to-br from-ivory/[0.04] to-transparent p-6 transition hover:border-gold/20"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/20 bg-gold/5">
                <FeatureIcon name={feature.icon} />
              </div>
              <h3 className="mt-5 font-display text-xl font-light">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory/55">
                {feature.description}
              </p>
            </m.li>
          ))}
        </m.ul>
      </div>
    </section>
  );
}
