import Link from "next/link";

import Footbar from "@/components/footbar";
import Navbar from "@/components/navbar";
import {
  getFooterSettings,
  getNavbarSettings,
  getNavConcentrations,
  getSiteSettings,
} from "@/sanity/lib/queries";

export const revalidate = 60;

function normalizePhone(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  return digits;
}

export default async function KontakPage() {
  const [schoolProfile, footerSettings, concentrations, navbarSettings] = await Promise.all([
    getSiteSettings(),
    getFooterSettings(),
    getNavConcentrations(),
    getNavbarSettings(),
  ]);

  const waPhone = normalizePhone(footerSettings.phone);
  const waHref = `https://wa.me/${waPhone}`;
  const mailHref = `mailto:${footerSettings.email}`;

  return (
    <div className="min-h-screen font-[family-name:var(--font-body)] text-[var(--foreground)]">
      <Navbar
        siteName={schoolProfile.siteName}
        logoUrl={schoolProfile.logoUrl}
        concentrations={concentrations}
        navbarSettings={navbarSettings}
      />

      <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-10 sm:px-6">
        <section className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 px-6 py-14 text-white sm:px-12">
          <div className="absolute inset-0 dot-grid opacity-[0.06]" />
          <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="relative">
            <nav className="mb-3 flex items-center gap-2 text-xs text-emerald-100/80">
              <Link href="/" className="transition-colors hover:text-white">
                Beranda
              </Link>
              <span>/</span>
              <span className="text-white">Kontak</span>
            </nav>
            <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Hubungi {schoolProfile.siteName}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-emerald-100/90 sm:text-base">
              Kami siap membantu informasi seputar sekolah, program keahlian, dan pendaftaran.
              Silakan pilih kanal kontak yang paling nyaman untuk Anda.
            </p>
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-100 bg-[var(--surface)] p-6">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-emerald-600">
              Alamat
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{footerSettings.address}</p>
          </article>

          <article className="rounded-2xl border border-slate-100 bg-[var(--surface)] p-6">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-emerald-600">
              Telepon
            </p>
            <a
              href={`tel:${footerSettings.phone}`}
              className="mt-3 inline-block text-sm font-semibold text-slate-700 transition-colors hover:text-emerald-700"
            >
              {footerSettings.phone}
            </a>
          </article>

          <article className="rounded-2xl border border-slate-100 bg-[var(--surface)] p-6">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-emerald-600">
              Email
            </p>
            <a
              href={mailHref}
              className="mt-3 inline-block break-all text-sm font-semibold text-slate-700 transition-colors hover:text-emerald-700"
            >
              {footerSettings.email}
            </a>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-100 bg-[var(--surface)] p-6 sm:p-8">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-900">
            Kontak Cepat
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-500">
            Untuk respon tercepat, Anda bisa menghubungi kami via WhatsApp atau email.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="hover-shine inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-700"
            >
              Chat WhatsApp
            </a>
            <a
              href={mailHref}
              className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            >
              Kirim Email
            </a>
          </div>
        </section>
      </main>

      <Footbar
        siteName={schoolProfile.siteName}
        description={footerSettings.description}
        address={footerSettings.address}
        phone={footerSettings.phone}
        email={footerSettings.email}
        quickLinks={footerSettings.quickLinks}
      />
    </div>
  );
}
