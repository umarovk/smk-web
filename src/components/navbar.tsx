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
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-800"
        >
          <Image
            src={resolvedLogoUrl}
            alt={`Logo ${siteName}`}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
            priority
          />
          <span>{siteName}</span>
        </Link>

        <button
          type="button"
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          Menu
        </button>

        <ul className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="transition-colors hover:text-blue-600">
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#ppdb"
              className="rounded-full bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              PPDB
            </a>
          </li>
        </ul>
      </nav>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <ul className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 text-sm font-medium text-slate-700 sm:px-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-md px-2 py-1.5 transition-colors hover:bg-slate-100"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#ppdb"
                className="block rounded-md bg-blue-600 px-3 py-2 text-center text-white transition-colors hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                PPDB
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
