import Link from "next/link";
import { templateCatalog } from "@/config/templates";
import { siteConfig } from "@/config/site";
import { getAllInvitationSlugs } from "@/lib/invitations/getInvitation";

export default function HomePage() {
  const slugs = getAllInvitationSlugs();

  return (
    <main className="min-h-dvh bg-charcoal px-5 py-16 text-ivory sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-gold">South Africa</p>
        <h1 className="mt-4 font-display text-4xl font-light sm:text-5xl">
          {siteConfig.name}
        </h1>
        <p className="mt-4 text-sm text-ivory/60">{siteConfig.description}</p>
      </div>

      <section className="mx-auto mt-16 max-w-xl">
        <h2 className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-ivory/50">
          Template previews
        </h2>
        <ul className="space-y-3">
          {templateCatalog.map((t) => (
            <li key={t.id}>
              <Link
                href={`/demo/${t.id}`}
                className="block rounded-lg border border-ivory/10 px-5 py-4 transition hover:border-gold/40"
              >
                <span className="font-display text-lg">{t.name}</span>
                <p className="mt-1 text-sm text-ivory/55">{t.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-12 max-w-xl">
        <h2 className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-ivory/50">
          Sample invitations
        </h2>
        <ul className="space-y-3">
          {slugs.map((slug) => (
            <li key={slug}>
              <Link
                href={`/invite/${slug}`}
                className="block rounded-lg border border-gold/20 px-5 py-3 text-center text-sm tracking-wide text-gold transition hover:bg-gold/5"
              >
                /invite/{slug}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
