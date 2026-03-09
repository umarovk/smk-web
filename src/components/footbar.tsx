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
    <footer id="kontak" className="mt-16 border-t border-emerald-100 bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-4">
        <section className="md:col-span-2">
          <h3 className="text-xl font-bold text-slate-900">{siteName}</h3>
          <p className="mt-3 max-w-lg text-sm leading-7 text-slate-600">{description}</p>
        </section>

        <section>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
            Tautan Cepat
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {quickLinks.map((item) => (
              <li key={`${item.label}-${item.href}`}>
                {item.href.startsWith("/") ? (
                  <Link href={item.href} className="transition-colors hover:text-emerald-700">
                    {item.label}
                  </Link>
                ) : (
                  <a href={item.href} className="transition-colors hover:text-emerald-700">
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-900">Kontak</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>{address}</li>
            <li>
              <a href={phoneHref} className="transition-colors hover:text-emerald-700">
                {phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`} className="transition-colors hover:text-emerald-700">
                {email}
              </a>
            </li>
          </ul>
        </section>
      </div>

      <div className="border-t border-emerald-100 bg-emerald-50/50">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 text-xs text-slate-600 sm:px-6">
          <p>&copy; {year} {siteName}. Seluruh hak cipta dilindungi.</p>
          <p>Website sekolah resmi.</p>
        </div>
      </div>
    </footer>
  );
}
