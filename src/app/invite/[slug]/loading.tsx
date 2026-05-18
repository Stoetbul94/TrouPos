export default function InviteLoading() {
  return (
    <div className="relative min-h-dvh bg-charcoal">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-charcoal via-charcoal/80 to-black" />
      <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-6">
        <p className="font-display text-2xl font-light text-ivory/80">
          Opening your invitation
        </p>
        <div className="mt-8 h-px w-24 bg-gold/40" aria-hidden />
      </div>
    </div>
  );
}
