import type { Invitation } from "@/types/invitation";
import { formatWeddingDate } from "@/lib/utils/dates";
import { siteConfig } from "@/config/site";

export function FloralFooter({ invitation }: { invitation: Invitation }) {
  return (
    <footer className="border-t border-gold/15 bg-charcoal px-5 py-14 text-center text-ivory sm:px-8">
      <p className="font-display text-2xl font-light">
        {invitation.couple.partnerOne}
        <span className="mx-2 text-gold">&</span>
        {invitation.couple.partnerTwo}
      </p>
      <p className="mt-3 text-xs uppercase tracking-[0.35em] text-ivory/50">
        {formatWeddingDate(invitation.weddingDate)}
      </p>
      <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-ivory/35">
        With love · {siteConfig.name}
      </p>
    </footer>
  );
}
