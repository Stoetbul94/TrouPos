"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { AnimatePresence, m } from "framer-motion";
import { galleryCategories, galleryTemplates } from "@/config/gallery";
import type { GalleryCategory } from "@/types/gallery";
import { CategoryFilter } from "./CategoryFilter";
import { TemplateGalleryCard } from "./TemplateGalleryCard";
import { loadSelectedTemplate, saveSelectedTemplate } from "@/lib/gallery/storage";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";
import { CTALink } from "@/components/marketing/CTALink";

export function TemplateGallery() {
  const [activeCategory, setActiveCategory] =
    useState<GalleryCategory["id"]>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    setSelectedId(loadSelectedTemplate());
  }, []);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: galleryTemplates.length };
    for (const t of galleryTemplates) {
      map[t.category] = (map[t.category] ?? 0) + 1;
    }
    return map;
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return galleryTemplates;
    return galleryTemplates.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    saveSelectedTemplate(id);
  }, []);

  return (
    <div>
      <CategoryFilter
        categories={galleryCategories}
        active={activeCategory}
        onChange={setActiveCategory}
        counts={counts}
      />

      {selectedId && (
        <m.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-lg border border-gold/20 bg-gold/5 px-4 py-3 text-center text-sm text-gold"
        >
          Template saved. Continue to{" "}
          <a href="/#get-started" className="underline underline-offset-4">
            get started
          </a>{" "}
          when you are ready.
        </m.p>
      )}

      <AnimatePresence mode="wait">
        <m.ul
          key={activeCategory}
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {filtered.map((template) => (
            <m.li key={template.id} variants={fadeUp}>
              <TemplateGalleryCard
                template={template}
                selected={selectedId === template.id}
                onSelect={handleSelect}
              />
            </m.li>
          ))}
        </m.ul>
      </AnimatePresence>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-sm text-ivory/50">
          No templates in this category yet.
        </p>
      )}

      <div className="mt-16 flex justify-center border-t border-ivory/10 pt-12">
        <CTALink href="/#get-started" variant="primary">
          Get Started
        </CTALink>
      </div>
    </div>
  );
}
