"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/profil", label: "Profil" },
  { href: "/profil#jurusan", label: "Jurusan" },
  { href: "#berita", label: "Berita" },
  { href: "#kontak", label: "Kontak" },
];

type NavbarProps = {
  siteName?: string;
  logoUrl?: string | null;
};

export default function Navbar({
  siteName = "SMK Web",
  logoUrl = "/logo-smk.svg",
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const resolvedLogoUrl = logoUrl || "/logo-smk.svg";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl backdrop-saturate-150">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-slate-800"
        >
          <div className="relative h-8 w-8 overflow-hidden rounded-lg border border-slate-100 shadow-sm">
            <Image
              src={resolvedLogoUrl}
              alt={`Logo ${siteName}`}
              width={32}
              height={32}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <span>{siteName}</span>
        </Link>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {isOpen ? (
              <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
            ) : (
              <><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></>
            )}
          </svg>
        </button>

        <ul className="hidden items-center gap-1 text-sm font-medium text-slate-600 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-lg px-3 py-2 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="ml-2">
            <a
              href="#ppdb"
              className="hover-shine inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-emerald-600/15 transition-all hover:bg-emerald-700"
            >
              PPDB
            </a>
          </li>
        </ul>
      </nav>

      <div
        className={`overflow-hidden border-t border-slate-100 bg-white/95 backdrop-blur-lg transition-all duration-300 ease-out md:hidden ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 border-t-0 opacity-0"
        }`}
      >
        <ul className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-3 text-sm font-medium text-slate-600 sm:px-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="mt-1">
            <a
              href="#ppdb"
              className="block rounded-lg bg-emerald-600 px-4 py-2.5 text-center font-semibold text-white transition-colors hover:bg-emerald-700"
              onClick={() => setIsOpen(false)}
            >
              PPDB
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
