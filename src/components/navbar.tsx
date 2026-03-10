"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

type Concentration = {
  name: string;
  slug: string;
};

type NavbarProps = {
  siteName?: string;
  logoUrl?: string | null;
  concentrations?: Concentration[];
};

export default function Navbar({
  siteName = "SMK Web",
  logoUrl = "/logo-smk.svg",
  concentrations = [],
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [jurusanOpen, setJurusanOpen] = useState(false);
  const [mobileJurusanOpen, setMobileJurusanOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const resolvedLogoUrl = logoUrl || "/logo-smk.svg";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setJurusanOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const staticItems = [
    { href: "/", label: "Beranda" },
    { href: "/profil", label: "Profil" },
  ];

  const trailingItems = [
    { href: "/berita", label: "Berita" },
    { href: "/kontak", label: "Kontak" },
  ];

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

        {/* ═══ Desktop Nav ═══ */}
        <ul className="hidden items-center gap-1 text-sm font-medium text-slate-600 md:flex">
          {staticItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-lg px-3 py-2 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
              >
                {item.label}
              </Link>
            </li>
          ))}

          {/* Jurusan dropdown */}
          {concentrations.length > 0 && (
            <li ref={dropdownRef} className="relative">
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-lg px-3 py-2 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                onClick={() => setJurusanOpen((prev) => !prev)}
                aria-expanded={jurusanOpen}
              >
                Jurusan
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 15 15"
                  fill="none"
                  className={`transition-transform duration-200 ${jurusanOpen ? "rotate-180" : ""}`}
                >
                  <path d="M3.13 5.56a.75.75 0 0 1 1.06 0L7.5 8.87l3.31-3.31a.75.75 0 1 1 1.06 1.06l-3.84 3.84a.75.75 0 0 1-1.06 0L3.13 6.62a.75.75 0 0 1 0-1.06Z" fill="currentColor"/>
                </svg>
              </button>

              <div
                className={`absolute left-0 top-full z-50 mt-1 min-w-[220px] overflow-hidden rounded-xl border border-slate-100 bg-white shadow-lg shadow-black/[0.08] transition-all duration-200 ${
                  jurusanOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-1 opacity-0"
                }`}
              >
                <div className="p-1.5">
                  {concentrations.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/jurusan/${c.slug}`}
                      className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                      onClick={() => setJurusanOpen(false)}
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          )}

          {trailingItems.map((item) =>
            item.href.startsWith("/") ? (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-lg px-3 py-2 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                >
                  {item.label}
                </Link>
              </li>
            ) : (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-lg px-3 py-2 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                >
                  {item.label}
                </a>
              </li>
            ),
          )}

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

      {/* ═══ Mobile Nav ═══ */}
      <div
        className={`overflow-hidden border-t border-slate-100 bg-white/95 backdrop-blur-lg transition-all duration-300 ease-out md:hidden ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 border-t-0 opacity-0"
        }`}
      >
        <ul className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-3 text-sm font-medium text-slate-600 sm:px-6">
          {staticItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}

          {/* Mobile Jurusan accordion */}
          {concentrations.length > 0 && (
            <li>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                onClick={() => setMobileJurusanOpen((prev) => !prev)}
              >
                Jurusan
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 15 15"
                  fill="none"
                  className={`transition-transform duration-200 ${mobileJurusanOpen ? "rotate-180" : ""}`}
                >
                  <path d="M3.13 5.56a.75.75 0 0 1 1.06 0L7.5 8.87l3.31-3.31a.75.75 0 1 1 1.06 1.06l-3.84 3.84a.75.75 0 0 1-1.06 0L3.13 6.62a.75.75 0 0 1 0-1.06Z" fill="currentColor"/>
                </svg>
              </button>
              <ul
                className={`overflow-hidden transition-all duration-200 ${
                  mobileJurusanOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {concentrations.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/jurusan/${c.slug}`}
                      className="block rounded-lg py-2 pl-7 pr-3 text-slate-500 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                      onClick={() => setIsOpen(false)}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          )}

          {trailingItems.map((item) =>
            item.href.startsWith("/") ? (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ) : (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ),
          )}

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
