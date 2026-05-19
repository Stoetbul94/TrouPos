"use client";

import { m } from "framer-motion";
import { pricingPackages } from "@/config/marketing";
import { SectionHeading } from "./SectionHeading";
import { CTALink } from "./CTALink";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";
import { defaultViewport } from "@/lib/animations/viewport";
import { cn } from "@/lib/utils/cn";

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="scroll-mt-24 border-y border-ivory/5 bg-gradient-to-b from-[#12100e] to-charcoal py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Packages for every celebration"
          description="Transparent once-off pricing in ZAR. No subscriptions — your invitation stays live for your wedding season."
        />

        <m.div
          className="mt-14 grid gap-6 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {pricingPackages.map((pkg) => (
            <m.article
              key={pkg.id}
              variants={fadeUp}
              className={cn(
                "relative flex flex-col rounded-2xl border p-8 transition duration-300",
                pkg.highlighted
                  ? "border-gold/50 bg-gradient-to-b from-gold/10 to-transparent shadow-xl shadow-gold/5"
                  : "border-ivory/10 bg-ivory/[0.02] hover:border-ivory/20",
              )}
            >
              {pkg.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-[10px] font-medium uppercase tracking-widest text-charcoal">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-2xl font-light">{pkg.name}</h3>
              <p className="mt-2 text-sm text-ivory/55">{pkg.description}</p>
              <p className="mt-6 font-display text-4xl text-ivory">
                {pkg.price}
                <span className="ml-2 text-sm font-sans text-ivory/45">
                  {pkg.period}
                </span>
              </p>
              <ul className="mt-8 flex-1 space-y-3 border-t border-ivory/10 pt-8">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 text-sm text-ivory/75"
                  >
                    <span className="text-gold" aria-hidden>
                      ✦
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <CTALink
                href="#get-started"
                variant={pkg.highlighted ? "primary" : "secondary"}
                fullWidth
                className="mt-8"
              >
                Get Started
              </CTALink>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
