"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { templateCatalog } from "@/config/templates";
import { SectionHeading } from "./SectionHeading";
import { CTALink } from "./CTALink";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";
import { defaultViewport } from "@/lib/animations/viewport";

export function TemplatesSection() {
  return (
    <section
      id="templates"
      className="relative scroll-mt-24 bg-gradient-to-b from-charcoal via-[#141210] to-charcoal py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_0%,rgba(201,169,98,0.08),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Templates"
          title="Featured invitation designs"
          description="Each template is crafted for mobile-first sharing — cinematic on every screen."
        />

        <m.ul
          className="mt-14 grid gap-6 sm:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {templateCatalog.map((template) => (
            <m.li key={template.id} variants={fadeUp}>
              <Link
                href={`/demo/${template.id}`}
                className="group block overflow-hidden rounded-2xl border border-ivory/10 bg-ivory/[0.02] transition duration-500 hover:border-gold/30 hover:shadow-2xl hover:shadow-black/40"
              >
                <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[3/4]">
                  <Image
                    src={template.previewImage}
                    alt={template.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex flex-wrap gap-2">
                      {template.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-ivory/15 bg-charcoal/60 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-ivory/70 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-light text-ivory">
                      {template.name}
                    </h3>
                    <p className="mt-1 text-sm text-ivory/60">{template.description}</p>
                    <span className="mt-4 inline-flex text-xs uppercase tracking-[0.25em] text-gold transition group-hover:tracking-[0.35em]">
                      Preview template →
                    </span>
                  </div>
                </div>
              </Link>
            </m.li>
          ))}
        </m.ul>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <CTALink href="/templates" variant="outline">
            View all templates
          </CTALink>
          <CTALink href="#get-started" variant="primary">
            Create Invitation
          </CTALink>
        </div>
      </div>
    </section>
  );
}

