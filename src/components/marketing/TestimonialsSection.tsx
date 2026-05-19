"use client";

import { m } from "framer-motion";
import { testimonials } from "@/config/marketing";
import { SectionHeading } from "./SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";
import { defaultViewport } from "@/lib/animations/viewport";

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="Loved by couples across SA"
          description="Real celebrations. Real guests on mobile. Real peace of mind."
        />

        <m.ul
          className="mt-14 grid gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {testimonials.map((item) => (
            <m.li
              key={item.id}
              variants={fadeUp}
              className="flex flex-col rounded-2xl border border-ivory/10 bg-ivory/[0.02] p-8"
            >
              <span className="font-display text-4xl leading-none text-gold/40">
                &ldquo;
              </span>
              <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-ivory/75">
                {item.quote}
              </blockquote>
              <footer className="mt-6 border-t border-ivory/10 pt-6">
                <cite className="not-italic">
                  <span className="block font-medium text-ivory">{item.name}</span>
                  <span className="mt-0.5 block text-xs text-ivory/45">
                    {item.location}
                  </span>
                </cite>
              </footer>
            </m.li>
          ))}
        </m.ul>
      </div>
    </section>
  );
}
