import Link from "next/link";

export default function InviteNotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-charcoal px-6 text-center text-ivory">
      <p className="text-xs uppercase tracking-[0.35em] text-gold">404</p>
      <h1 className="mt-4 font-display text-3xl font-light">Invitation not found</h1>
      <p className="mt-3 max-w-sm text-sm text-ivory/60">
        This link may have expired or the couple name was mistyped.
      </p>
      <Link
        href="/"
        className="mt-10 text-sm uppercase tracking-widest text-gold underline-offset-4 hover:underline"
      >
        Return home
      </Link>
    </main>
  );
}
