"use client";

import { m } from "framer-motion";
import type { GalleryCategory } from "@/types/gallery";
import { cn } from "@/lib/utils/cn";

interface CategoryFilterProps {
  categories: GalleryCategory[];
  active: GalleryCategory["id"];
  onChange: (id: GalleryCategory["id"]) => void;
  counts: Record<string, number>;
}

export function CategoryFilter({
  categories,
  active,
  onChange,
  counts,
}: CategoryFilterProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="tablist"
      aria-label="Filter templates by category"
    >
      {categories.map((category) => {
        const isActive = active === category.id;
        const count = counts[category.id] ?? 0;

        return (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category.id)}
            className={cn(
              "relative shrink-0 rounded-full border px-4 py-2.5 text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-300",
              isActive
                ? "border-gold/50 bg-gold/10 text-gold"
                : "border-ivory/15 bg-ivory/[0.03] text-ivory/60 hover:border-ivory/30 hover:text-ivory",
            )}
          >
            {category.label}
            <span
              className={cn(
                "ml-2 tabular-nums",
                isActive ? "text-gold/80" : "text-ivory/35",
              )}
            >
              {count}
            </span>
            {isActive && (
              <m.span
                layoutId="gallery-category-pill"
                className="absolute inset-0 -z-10 rounded-full border border-gold/30"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
