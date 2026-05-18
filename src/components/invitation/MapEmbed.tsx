"use client";

import { useState } from "react";
import type { Venue } from "@/types/invitation";
import { MotionSection } from "@/components/motion/MotionSection";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export function MapEmbed({ venue }: { venue: Venue }) {
  const [loaded, setLoaded] = useState(false);
  const mapUrl = venue.mapUrl;

  if (!mapUrl) return null;

  return (
    <Container>
      <MotionSection>
        <h2 className="mb-6 text-center font-display text-3xl font-light">
          Find Us
        </h2>
        <p className="mb-6 text-center text-sm text-ivory/70">
          {venue.name} · {venue.city}
          {venue.province && `, ${venue.province}`}
        </p>
        {!loaded && (
          <div className="mb-4 flex justify-center">
            <Button variant="secondary" onClick={() => setLoaded(true)}>
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
            />
          </div>
        )}
      </MotionSection>
    </Container>
  );
}
