import Link from "next/link";

import type { FooterLink } from "@/sanity/lib/queries";

type FootbarProps = {
  siteName?: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  quickLinks?: FooterLink[];
};

export default function Footbar({
  siteName = "SMK Web",
  description = "Sekolah menengah kejuruan berbasis keterampilan dengan pembelajaran modern, praktik industri, dan pembinaan karakter untuk menyiapkan lulusan siap kerja.",
  address = "Jl. Pendidikan No. 123, Kota Sekolah",
  phone = "(000) 0000-0000",
  email = "info@smkweb.sch.id",
  quickLinks = [
    { label: "Beranda", href: "/" },
    { label: "Profil Sekolah", href: "/profil" },
    { label: "Informasi PPDB", href: "#ppdb" },
  ],
}: FootbarProps) {
  const year = new Date().getFullYear();
  const phoneHref = `tel:${phone.replace(/[^+\d]/g, "")}`;

  return (
    <footer id="kontak" className="relative overflow-hidden border-t border-slate-800 bg-slate-900">
      <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-emerald-600/[0.06] blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-teal-600/[0.05] blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 md:gap-8">
        <section className="md:col-span-2">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white">
            {siteName}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">{description}</p>
          <div className="mt-4 h-0.5 w-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
        </section>

        <section>
          <h4 className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-slate-500">
            Tautan Cepat
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
            {quickLinks.map((item) => (
              <li key={`${item.label}-${item.href}`}>
                {item.href.startsWith("/") ? (
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-emerald-400"
                  >
                    <span className="inline-block h-1 w-1 rounded-full bg-emerald-500 opacity-0 transition-opacity" />
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-emerald-400"
                  >
                    <span className="inline-block h-1 w-1 rounded-full bg-emerald-500 opacity-0 transition-opacity" />
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h4 className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-slate-500">
            Kontak
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
            <li className="flex items-start gap-2">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              {address}
            </li>
            <li className="flex items-center gap-2">
              <svg className="h-4 w-4 shrink-0 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
              <a href={phoneHref} className="transition-colors hover:text-emerald-400">{phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <svg className="h-4 w-4 shrink-0 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <a href={`mailto:${email}`} className="transition-colors hover:text-emerald-400">{email}</a>
            </li>
          </ul>
        </section>
      </div>

      <div className="relative border-t border-slate-800">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 text-xs text-slate-500 sm:px-6">
          <p>&copy; {year} {siteName}. Seluruh hak cipta dilindungi.</p>
          <p className="hidden sm:block">Website sekolah resmi.</p>
        </div>
      </div>
    </footer>
  );
}
