"use client";

import { m } from "framer-motion";
import type { WeddingInvitationContent } from "@/types/invitation-content";
import { AddToCalendar } from "@/components/invitation/calendar";
import { Container } from "@/components/layout/Container";
import { MotionSection } from "@/components/motion/MotionSection";
import { formatEventTime, formatWeddingDate } from "@/lib/utils/dates";
import { combineDateAndTime, contentToEvents } from "@/lib/invitations/contentAdapter";
import { fadeUp } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";

export type WeddingDetailsLayout = "events-list" | "card";

export function WeddingDetailsSection({
  content,
  variant = "dark",
  layout = "events-list",
  showCalendar = true,
  className,
  invitationSlug,
  inviteUrl,
}: {
  content: WeddingInvitationContent;
  variant?: "dark" | "light";
  layout?: WeddingDetailsLayout;
  showCalendar?: boolean;
  className?: string;
  invitationSlug?: string;
  inviteUrl?: string;
}) {
  if (layout === "card") {
    return (
      <WeddingDetailsCard
        content={content}
        variant={variant}
        showCalendar={showCalendar}
        className={className}
        invitationSlug={invitationSlug}
        inviteUrl={inviteUrl}
      />
    );
  }

  const events = contentToEvents(content);
  const isLight = variant === "light";

  return (
    <Container className={className}>
      <MotionSection>
        <h2
          className={cn(
            "mb-10 scroll-mt-24 text-center font-display text-3xl font-light tracking-wide sm:text-4xl",
            isLight ? "text-charcoal" : "text-ivory",
          )}
        >
          The Celebration
        </h2>
        <ul className="space-y-10">
          {events.map((event) => (
            <li
              key={event.id}
              className={cn(
                "border-t pt-8 first:border-0 first:pt-0",
                isLight ? "border-charcoal/10" : "border-ivory/10",
              )}
            >
              <p className="text-xs uppercase tracking-[0.25em] text-gold">
                {formatWeddingDate(event.startsAt, "d MMMM yyyy")}
              </p>
              <h3
                className={cn(
                  "mt-2 font-display text-2xl",
                  isLight ? "text-charcoal" : "text-ivory",
                )}
              >
                {event.title}
              </h3>
              <p
                className={cn(
                  "mt-1 text-sm",
                  isLight ? "text-charcoal/70" : "text-ivory/70",
                )}
              >
                {formatEventTime(event.startsAt)}
                {event.endsAt && ` – ${formatEventTime(event.endsAt)}`}
              </p>
              <p
                className={cn(
                  "mt-3 font-medium",
                  isLight ? "text-charcoal" : "text-ivory",
                )}
              >
                {event.venue.name}
              </p>
              <p
                className={cn(
                  "text-sm",
                  isLight ? "text-charcoal/60" : "text-ivory/60",
                )}
              >
                {event.venue.address}
                {event.venue.city && `, ${event.venue.city}`}
                {event.venue.province && `, ${event.venue.province}`}
              </p>
            </li>
          ))}
        </ul>
        {showCalendar && (
          <div className="mt-10 flex justify-center px-4">
            <AddToCalendar
              content={content}
              variant={variant}
              eventUid={invitationSlug}
              inviteUrl={inviteUrl}
            />
          </div>
        )}
      </MotionSection>
    </Container>
  );
}

function WeddingDetailsCard({
  content,
  variant,
  showCalendar,
  className,
  invitationSlug,
  inviteUrl,
}: {
  content: WeddingInvitationContent;
  variant: "dark" | "light";
  showCalendar: boolean;
  className?: string;
  invitationSlug?: string;
  inviteUrl?: string;
}) {
  const displayDate = combineDateAndTime(content.weddingDate, content.weddingTime);

  return (
    <section
      id="details"
      className={cn("scroll-mt-24 py-[var(--section-py)]", className)}
    >
      <Container>
        <MotionSection className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gold-muted">
            Wedding details
          </p>
          <h2 className="mt-3 font-display text-3xl font-light text-charcoal sm:text-4xl">
            The celebration
          </h2>
        </MotionSection>

        <m.div
          className="mt-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <article className="relative rounded-2xl border border-gold/15 bg-white/50 p-8 shadow-sm shadow-gold/5 backdrop-blur-sm">
            <div
              className="absolute -left-px top-8 h-16 w-1 rounded-full bg-gradient-to-b from-[var(--theme-accent,#c9a962)] to-gold-muted/30"
              aria-hidden
            />
            <p className="text-xs uppercase tracking-[0.25em] text-gold-muted">
              {formatWeddingDate(displayDate, "EEEE, d MMMM yyyy")}
            </p>
            <h3 className="mt-2 font-display text-2xl text-charcoal">
              {content.brideName} & {content.groomName}
            </h3>
            <p className="mt-1 text-sm text-charcoal/60">{content.weddingTime}</p>
            <p className="mt-4 font-medium text-charcoal">{content.venueName}</p>
            <p className="text-sm text-charcoal/55">{content.venueAddress}</p>
          </article>
        </m.div>

        {showCalendar && (
          <MotionSection className="mt-12 flex justify-center px-4">
            <AddToCalendar
              content={content}
              variant={variant}
              eventUid={invitationSlug}
              inviteUrl={inviteUrl}
            />
          </MotionSection>
        )}
      </Container>
    </section>
  );
}
