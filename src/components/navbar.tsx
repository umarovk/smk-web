"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import type { NavbarSettings, NavItem, NavbarLink } from "@/sanity/lib/queries";

type Concentration = {
  name: string;
  slug: string;
};

type NavbarProps = {
  siteName?: string;
  logoUrl?: string | null;
  concentrations?: Concentration[];
  navbarSettings?: NavbarSettings;
};

const fallbackItems: NavItem[] = [
  { _type: "navLink", label: "Beranda", href: "/" },
  { _type: "navLink", label: "Profil", href: "/profil" },
  { _type: "navLink", label: "Program Tahfidz", href: "/tahfidz" },
  { _type: "navDropdown", label: "Jurusan", source: "concentrations" },
  { _type: "navLink", label: "Berita", href: "/berita" },
  { _type: "navLink", label: "Kontak", href: "/kontak" },
];

function resolveDropdownItems(
  item: Extract<NavItem, { _type: "navDropdown" }>,
  concentrations: Concentration[],
): NavbarLink[] {
  if (item.source === "concentrations") {
    return concentrations.map((c) => ({
      label: c.name,
      href: `/jurusan/${c.slug}`,
    }));
  }
  return item.items ?? [];
}

export default function Navbar({
  siteName = "SMK Web",
  logoUrl = "/logo-smk.svg",
  concentrations = [],
  navbarSettings,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [mobileOpenIdx, setMobileOpenIdx] = useState<number | null>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const resolvedLogoUrl = logoUrl || "/logo-smk.svg";

  const items = useMemo<NavItem[]>(
    () =>
      navbarSettings?.items && navbarSettings.items.length > 0
        ? navbarSettings.items
        : fallbackItems,
    [navbarSettings],
  );
  const ctaLabel = navbarSettings?.ctaLabel || "SPMB";
  const ctaHref = navbarSettings?.ctaHref || "/spmb";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenIdx(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        <ul
          ref={navRef}
          className="hidden items-center gap-1 text-sm font-medium text-slate-600 md:flex"
        >
          {items.map((item, idx) => {
            if (item._type === "navLink") {
              return (
                <li key={`${item.label}-${idx}`}>
                  <Link
                    href={item.href}
                    className="rounded-lg px-3 py-2 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }

            const dropdownItems = resolveDropdownItems(item, concentrations);
            if (dropdownItems.length === 0) return null;
            const isOpenDropdown = openIdx === idx;

            return (
              <li key={`${item.label}-${idx}`} className="relative">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-lg px-3 py-2 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                  onClick={() => setOpenIdx((prev) => (prev === idx ? null : idx))}
                  aria-expanded={isOpenDropdown}
                >
                  {item.label}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 15 15"
                    fill="none"
                    className={`transition-transform duration-200 ${isOpenDropdown ? "rotate-180" : ""}`}
                  >
                    <path d="M3.13 5.56a.75.75 0 0 1 1.06 0L7.5 8.87l3.31-3.31a.75.75 0 1 1 1.06 1.06l-3.84 3.84a.75.75 0 0 1-1.06 0L3.13 6.62a.75.75 0 0 1 0-1.06Z" fill="currentColor"/>
                  </svg>
                </button>

                <div
                  className={`absolute left-0 top-full z-50 mt-1 min-w-[220px] overflow-hidden rounded-xl border border-slate-100 bg-white shadow-lg shadow-black/[0.08] transition-all duration-200 ${
                    isOpenDropdown
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1 opacity-0"
                  }`}
                >
                  <div className="p-1.5">
                    {dropdownItems.map((sub) => (
                      <Link
                        key={`${sub.label}-${sub.href}`}
                        href={sub.href}
                        className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                        onClick={() => setOpenIdx(null)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}

          <li className="ml-2">
            <Link
              href={ctaHref}
              className="hover-shine inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-emerald-600/15 transition-all hover:bg-emerald-700"
            >
              {ctaLabel}
            </Link>
          </li>
        </ul>
      </nav>

      {/* ═══ Mobile Nav ═══ */}
      <div
        className={`overflow-hidden border-t border-slate-100 bg-white/95 backdrop-blur-lg transition-all duration-300 ease-out md:hidden ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 border-t-0 opacity-0"
        }`}
      >
        <ul className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-3 text-sm font-medium text-slate-600 sm:px-6">
          {items.map((item, idx) => {
            if (item._type === "navLink") {
              return (
                <li key={`${item.label}-${idx}`}>
                  <Link
                    href={item.href}
                    className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }

            const dropdownItems = resolveDropdownItems(item, concentrations);
            if (dropdownItems.length === 0) return null;
            const isOpenDropdown = mobileOpenIdx === idx;

            return (
              <li key={`${item.label}-${idx}`}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                  onClick={() =>
                    setMobileOpenIdx((prev) => (prev === idx ? null : idx))
                  }
                  aria-expanded={isOpenDropdown}
                >
                  {item.label}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 15 15"
                    fill="none"
                    className={`transition-transform duration-200 ${isOpenDropdown ? "rotate-180" : ""}`}
                  >
                    <path d="M3.13 5.56a.75.75 0 0 1 1.06 0L7.5 8.87l3.31-3.31a.75.75 0 1 1 1.06 1.06l-3.84 3.84a.75.75 0 0 1-1.06 0L3.13 6.62a.75.75 0 0 1 0-1.06Z" fill="currentColor"/>
                  </svg>
                </button>
                <ul
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpenDropdown ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {dropdownItems.map((sub) => (
                    <li key={`${sub.label}-${sub.href}`}>
                      <Link
                        href={sub.href}
                        className="block rounded-lg py-2 pl-7 pr-3 text-slate-500 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                        onClick={() => setIsOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}

          <li className="mt-1">
            <Link
              href={ctaHref}
              className="block rounded-lg bg-emerald-600 px-4 py-2.5 text-center font-semibold text-white transition-colors hover:bg-emerald-700"
              onClick={() => setIsOpen(false)}
            >
              {ctaLabel}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
