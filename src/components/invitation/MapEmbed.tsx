"use client";

import { useState } from "react";
import type { Venue } from "@/types/invitation";
import { MotionSection } from "@/components/motion/MotionSection";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

export function MapEmbed({
  venue,
  variant = "dark",
  showTitle = true,
}: {
  venue: Venue;
  variant?: "dark" | "light";
  showTitle?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const mapUrl = venue.mapUrl;

  if (!mapUrl) return null;

  return (
    <Container>
      <MotionSection>
        {showTitle && (
          <h2
            className={cn(
              "mb-6 text-center font-display text-3xl font-light",
              variant === "light" ? "text-charcoal" : "text-ivory",
            )}
          >
            Find Us
          </h2>
        )}
        <p
          className={cn(
            "mb-6 text-center text-sm",
            variant === "light" ? "text-charcoal/65" : "text-ivory/70",
          )}
        >
          {venue.name} · {venue.city}
          {venue.province && `, ${venue.province}`}
        </p>
        {!loaded && (
          <div className="mb-4 flex justify-center">
            <Button
              variant={variant === "light" ? "outline" : "secondary"}
              className="min-h-12 min-w-[10rem]"
              onClick={() => setLoaded(true)}
            >
              Load map
            </Button>
          </div>
        )}
        {loaded && (
          <div className="aspect-video w-full overflow-hidden rounded-lg border border-ivory/10">
            <iframe
              title={`Map to ${venue.name}`}
              src={mapUrl}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        )}
      </MotionSection>
    </Container>
  );
}
