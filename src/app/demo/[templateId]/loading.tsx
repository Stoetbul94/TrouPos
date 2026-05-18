export default function DemoLoading() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-charcoal">
      <div className="text-center">
        <div
          className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-gold/30 border-t-gold"
          aria-hidden
        />
        <p className="mt-6 text-xs uppercase tracking-[0.35em] text-ivory/50">
          Loading preview
        </p>
      </div>
    </div>
  );
}
