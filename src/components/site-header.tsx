"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "./container";
import { navLinks } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-green-100 bg-white/90 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="Tawakul Foundation logo"
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
            priority
          />
          <span className="text-lg font-bold text-green-900">
            Tawakul Foundation
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${
                  active
                    ? "text-green-800"
                    : "text-stone-600 hover:text-green-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/get-involved"
            className="btn-primary rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-transform hover:scale-[1.03]"
          >
            Donate
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md text-green-900 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </Container>

      {open ? (
        <div className="border-t border-green-100 bg-white md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2.5 text-base font-semibold ${
                  pathname === link.href
                    ? "bg-green-50 text-green-800"
                    : "text-stone-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/get-involved"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 rounded-full px-5 py-2.5 text-center text-sm font-bold text-white"
            >
              Donate
            </Link>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
