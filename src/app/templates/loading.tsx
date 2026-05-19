export default function TemplatesLoading() {
  return (
    <div className="min-h-dvh bg-charcoal">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="h-4 w-32 animate-pulse rounded bg-ivory/10" />
        <div className="mt-4 h-12 max-w-lg animate-pulse rounded bg-ivory/10" />
        <div className="mt-4 h-20 max-w-md animate-pulse rounded bg-ivory/10" />
        <div className="mt-12 flex gap-2 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-28 shrink-0 animate-pulse rounded-full bg-ivory/10"
            />
          ))}
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] animate-pulse rounded-2xl bg-ivory/5"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
