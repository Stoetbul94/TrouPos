import Link from "next/link";
import { siteConfig } from "@/config/site";
import { navLinks } from "@/config/marketing";

export function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ivory/10 bg-[#0a0908] py-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Link
              href="/"
              className="font-display text-2xl font-light tracking-widest text-ivory"
            >
              {siteConfig.name}
            </Link>
            <p className="mt-3 max-w-xs text-sm text-ivory/50">
              {siteConfig.description}
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs uppercase tracking-[0.2em] text-ivory/50 transition hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/demo/modern-cinematic"
                  className="text-xs uppercase tracking-[0.2em] text-ivory/50 transition hover:text-gold"
                >
                  Demo
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/40 sm:flex-row">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <p className="uppercase tracking-widest">Crafted in South Africa</p>
        </div>
      </div>
    </footer>
  );
}
