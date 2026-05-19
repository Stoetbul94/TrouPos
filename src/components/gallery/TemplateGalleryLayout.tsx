import Link from "next/link";
import { siteConfig } from "@/config/site";
import { TemplateGallery } from "./TemplateGallery";

export function TemplateGalleryLayout() {
  return (
    <div className="min-h-dvh bg-charcoal text-ivory">
      <header className="border-b border-ivory/5 bg-charcoal/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <Link
            href="/"
            className="font-display text-xl font-light tracking-widest text-ivory"
          >
            {siteConfig.name}
          </Link>
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.2em] text-ivory/50 transition hover:text-gold"
          >
            ← Back home
          </Link>
        </div>
      </header>

      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(201,169,98,0.12),transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Template gallery
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-3xl font-light tracking-wide sm:text-4xl md:text-5xl">
            Find the invitation that feels like you
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ivory/60 sm:text-base">
            Browse curated designs by mood and celebration style. Preview live
            demos, select your favourite, and begin personalising — no account
            required yet.
          </p>

          <div className="mt-12">
            <TemplateGallery />
          </div>
        </div>
      </div>
    </div>
  );
}
