import Image from "next/image";
import Link from "next/link";
import { Container } from "./container";
import { navLinks, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-green-950 text-green-100">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Tawakul Foundation logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span className="text-lg font-bold text-white">
              {site.name}
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-green-200">
            {site.tagline}. A Muslim charitable organization based in{" "}
            {site.location}, supporting orphans, widows, the elderly, and
            families facing hardship.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-wide text-white uppercase">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-green-200 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-wide text-white uppercase">
            Get in Touch
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-green-200">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-white"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.phone.replace(/\s+/g, "")}`}
                className="transition-colors hover:text-white"
              >
                {site.phone}
              </a>
            </li>
            <li>{site.location}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-green-900">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-green-300 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights
            reserved.
          </p>
          <p>Compassion in action.</p>
        </Container>
      </div>
    </footer>
  );
}
