import type { WeddingInvitationContent } from "@/types/invitation-content";
import { formatWeddingDate } from "@/lib/utils/dates";
import { combineDateAndTime } from "@/lib/invitations/contentAdapter";
import { siteConfig } from "@/config/site";

export function FloralFooter({ content }: { content: WeddingInvitationContent }) {
  const displayDate = combineDateAndTime(content.weddingDate, content.weddingTime);

  return (
    <footer className="border-t border-gold/15 bg-charcoal px-5 py-14 text-center text-ivory sm:px-8">
      <p className="font-display text-2xl font-light">
        {content.brideName}
        <span className="mx-2 text-[var(--theme-accent,#c9a962)]">&</span>
        {content.groomName}
      </p>
      <p className="mt-3 text-xs uppercase tracking-[0.35em] text-ivory/50">
        {formatWeddingDate(displayDate)}
      </p>
      <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-ivory/35">
        With love · {siteConfig.name}
      </p>
    </footer>
  );
}
