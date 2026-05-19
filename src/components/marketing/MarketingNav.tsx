"use client";

import { useState } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { navLinks } from "@/config/marketing";
import { CTALink } from "./CTALink";
import { cn } from "@/lib/utils/cn";

export function MarketingNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ivory/5 bg-charcoal/80 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8"
        aria-label="Main"
      >
        <Link
          href="/"
          className="font-display text-xl font-light tracking-widest text-ivory"
        >
          {siteConfig.name}
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] text-ivory/60 transition hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <CTALink
            href="/templates"
            variant="ghost"
            className="!min-h-10 !px-4 !text-xs uppercase tracking-widest"
          >
            View Templates
          </CTALink>
          <CTALink href="#get-started" variant="primary" className="!min-h-10 !px-5 !text-xs">
            Get Started
          </CTALink>
        </div>

        <button
          type="button"
          className="touch-target flex h-12 w-12 items-center justify-center rounded-full border border-ivory/15 md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          <span className="sr-only">Menu</span>
          <div className="flex w-5 flex-col gap-1.5">
            <span
              className={cn(
                "h-px w-full bg-ivory transition",
                open && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={cn("h-px w-full bg-ivory transition", open && "opacity-0")}
            />
            <span
              className={cn(
                "h-px w-full bg-ivory transition",
                open && "-translate-y-2 -rotate-45",
              )}
            />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-ivory/10 bg-charcoal md:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block py-3 text-sm uppercase tracking-widest text-ivory/70"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-4 flex flex-col gap-3 border-t border-ivory/10 pt-4">
                <CTALink href="/templates" variant="secondary" fullWidth onClick={() => setOpen(false)}>
                  View Templates
                </CTALink>
                <CTALink href="#get-started" variant="primary" fullWidth onClick={() => setOpen(false)}>
                  Get Started
                </CTALink>
              </li>
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
