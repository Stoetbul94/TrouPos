"use client";

import { m } from "framer-motion";
import type { WeddingInvitationContent } from "@/types/invitation-content";
import { AmbientSection } from "@/components/cinematic/AmbientSection";
import { AddToCalendar } from "@/components/invitation/calendar";
import { OptimizedMedia } from "@/components/media/OptimizedMedia";
import { useLiteEffects } from "@/components/providers/MotionProvider";
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

  const lite = useLiteEffects();
  const events = contentToEvents(content);
  const isLight = variant === "light";
  const accentImage = content.atmosphere?.detailsAccent;

  const eventsList = (
    <ul className="space-y-0">
      {events.map((event) => (
        <li
          key={event.id}
          className={cn(
            "border-t py-10 first:border-t-0 first:pt-0 lg:py-12",
            isLight ? "border-charcoal/15" : "border-ivory/15",
          )}
        >
          <p className="type-eyebrow">{formatWeddingDate(event.startsAt, "d MMMM yyyy")}</p>
          <h3
            className={cn(
              "type-deck mt-2",
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
  );

  return (
    <AmbientSection
      variant={isLight ? "light" : "dark"}
      containerWidth="editorial"
      className={cn("!py-0", className)}
      contentClassName="py-[var(--section-py)] lg:py-[var(--section-py-lg)]"
    >
      <MotionSection variant="revealSoft">
        <h2
          className={cn(
            "type-section-title mb-10 text-center lg:mb-14",
            isLight ? "text-charcoal" : "text-ivory",
          )}
        >
          The Celebration
        </h2>
        {accentImage && !lite && (
          <div className="mb-12 hidden lg:block">
            <div className="relative min-h-[14rem] overflow-hidden">
              <OptimizedMedia
                src={accentImage}
                alt=""
                fill
                sizes="80vw"
                quality={65}
                className="object-cover object-center"
              />
              <div
                className={cn(
                  "absolute inset-0",
                  isLight ? "bg-ivory/50" : "bg-charcoal/55",
                )}
              />
            </div>
          </div>
        )}
        <div className="max-w-3xl lg:mx-0">{eventsList}</div>
        {showCalendar && (
          <div className="mt-10 flex justify-center px-4 lg:mt-14">
            <AddToCalendar
              content={content}
              variant={variant}
              eventUid={invitationSlug}
              inviteUrl={inviteUrl}
            />
          </div>
        )}
      </MotionSection>
    </AmbientSection>
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
  const lite = useLiteEffects();
  const displayDate = combineDateAndTime(content.weddingDate, content.weddingTime);
  const accentImage = content.atmosphere?.detailsAccent;

  return (
    <section
      id="details"
      className={cn(
        "scroll-mt-24 py-[var(--section-py)] lg:py-[var(--section-py-lg)]",
        className,
      )}
    >
      <Container width="editorial">
        <MotionSection variant="revealSoft" className="text-center">
          <p className="type-eyebrow text-gold-muted">Wedding details</p>
          <h2 className="type-section-title mt-3 text-charcoal">The celebration</h2>
        </MotionSection>

        <m.div
          className="relative mt-12 lg:grid lg:grid-cols-[1fr,minmax(0,28rem)] lg:items-stretch lg:gap-0"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {accentImage && !lite && (
            <div
              className="relative hidden min-h-[20rem] overflow-hidden rounded-l-2xl lg:block"
              aria-hidden
            >
              <OptimizedMedia
                src={accentImage}
                alt=""
                fill
                sizes="(max-width: 1024px) 0vw, 28vw"
                quality={65}
                className="scale-110 object-cover blur-sm"
              />
              <div className="absolute inset-0 bg-white/30" />
            </div>
          )}
          <article
            className={cn(
              "relative border-l-2 border-gold/30 p-8 lg:rounded-r-2xl lg:rounded-l-none lg:border-l-0 lg:border-t-2 lg:pt-10",
              lite ? "bg-white/85" : "bg-white/60 backdrop-blur-[2px]",
            )}
          >
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
