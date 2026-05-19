"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import type { GalleryTemplate } from "@/types/gallery";
import { PricingTierBadge } from "./PricingTierBadge";
import { CTALink } from "@/components/marketing/CTALink";
import { cn } from "@/lib/utils/cn";

interface TemplateGalleryCardProps {
  template: GalleryTemplate;
  selected: boolean;
  onSelect: (id: string) => void;
}

export function TemplateGalleryCard({
  template,
  selected,
  onSelect,
}: TemplateGalleryCardProps) {
  const previewHref = template.demoId
    ? `/demo/${template.demoId}`
    : undefined;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-ivory/[0.02] transition-shadow duration-500",
        selected
          ? "border-gold/50 shadow-xl shadow-gold/10 ring-1 ring-gold/30"
          : "border-ivory/10 hover:border-gold/25 hover:shadow-2xl hover:shadow-black/30",
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[3/4]">
        <Image
          src={template.previewImage}
          alt={template.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/25 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute left-4 top-4">
          <PricingTierBadge tier={template.pricingTier} />
        </div>
        {selected && (
          <m.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-charcoal"
          >
            Selected
          </m.span>
        )}
        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex gap-2">
            {previewHref ? (
              <CTALink
                href={previewHref}
                variant="secondary"
                className="!min-h-10 flex-1 !px-4 !text-xs"
              >
                Preview
              </CTALink>
            ) : (
              <span className="flex flex-1 items-center justify-center rounded-full border border-ivory/20 px-4 py-2 text-xs text-ivory/40">
                Preview soon
              </span>
            )}
            <button
              type="button"
              onClick={() => onSelect(template.id)}
              className="flex-1 rounded-full bg-gold px-4 py-2 text-xs font-medium text-charcoal transition hover:bg-gold/90"
            >
              Select
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-xl font-light tracking-wide text-ivory sm:text-2xl">
          {template.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ivory/55">
          {template.description}
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:gap-3">
          {previewHref ? (
            <Link
              href={previewHref}
              className="inline-flex min-h-10 flex-1 items-center justify-center rounded-full border border-ivory/20 text-xs uppercase tracking-widest text-ivory/80 transition hover:border-gold/40 hover:text-gold sm:hidden"
            >
              Preview
            </Link>
          ) : null}
          <button
            type="button"
            onClick={() => onSelect(template.id)}
            className={cn(
              "inline-flex min-h-10 flex-1 items-center justify-center rounded-full text-xs font-medium uppercase tracking-widest transition",
              selected
                ? "border border-gold/40 bg-gold/20 text-gold"
                : "bg-gold text-charcoal hover:bg-gold/90",
            )}
          >
            {selected ? "Selected" : "Select template"}
          </button>
          {previewHref && (
            <CTALink
              href={previewHref}
              variant="outline"
              className="!min-h-10 hidden flex-1 !text-xs sm:inline-flex"
            >
              Preview
            </CTALink>
          )}
        </div>
      </div>
    </article>
  );
}
