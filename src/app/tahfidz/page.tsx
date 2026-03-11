import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

import Footbar from "@/components/footbar";
import Navbar from "@/components/navbar";
import {
  getFooterSettings,
  getNavbarSettings,
  getNavConcentrations,
  getSeoSettings,
  getSiteSettings,
  getTahfidzSettings,
} from "@/sanity/lib/queries";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const [tahfidz, seoSettings] = await Promise.all([
    getTahfidzSettings(),
    getSeoSettings(),
  ]);

  return buildPageMetadata({
    title: tahfidz.seoTitle || seoSettings.tahfidzTitle || "Program Tahfidzul Qur'an",
    description:
      tahfidz.seoDescription ||
      seoSettings.tahfidzDescription ||
      seoSettings.defaultDescription,
    path: "/tahfidz",
  });
}

export default async function TahfidzPage() {
  const [schoolProfile, footerSettings, concentrations, tahfidz, navbarSettings] = await Promise.all([
    getSiteSettings(),
    getFooterSettings(),
    getNavConcentrations(),
    getTahfidzSettings(),
    getNavbarSettings(),
  ]);

  return (
    <div className="min-h-screen font-[family-name:var(--font-body)] text-[var(--foreground)]">
      <Navbar
        siteName={schoolProfile.siteName}
        logoUrl={schoolProfile.logoUrl}
        concentrations={concentrations}
        navbarSettings={navbarSettings}
      />

      <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-10 sm:px-6">
        <section className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-emerald-700 via-teal-700 to-emerald-800 px-6 py-12 text-white sm:px-10 sm:py-14">
          <div className="absolute inset-0 dot-grid opacity-[0.08]" />
          <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-emerald-300/20 blur-3xl" />

          <div className="relative grid items-center gap-8 md:grid-cols-2">
            <div>
              <nav className="mb-3 flex items-center gap-2 text-xs text-emerald-100/80">
                <Link href="/" className="transition-colors hover:text-white">
                  Beranda
                </Link>
                <span>/</span>
                <span className="text-white">Program Tahfidz</span>
              </nav>
              <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-emerald-100">
                {tahfidz.heroBadge}
              </p>
              <h1 className="font-display mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {tahfidz.heroTitle}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-emerald-100/90 sm:text-base">
                {tahfidz.heroDescription}
              </p>
            </div>

            {tahfidz.heroImageUrl ? (
              <div className="relative h-56 overflow-hidden rounded-2xl border border-white/10 shadow-xl shadow-black/20 sm:h-72">
                <Image
                  src={tahfidz.heroImageUrl}
                  alt={tahfidz.heroImageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/15" />
              </div>
            ) : (
              <div className="hidden md:block" />
            )}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-slate-100 bg-[var(--surface)] p-6 sm:p-8">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-emerald-600">
            Target Program
          </p>
          <p className="mt-3 inline-flex rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
            {tahfidz.targetHafalan}
          </p>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-100 bg-[var(--surface)] p-6">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-emerald-600">
              Poin Program
            </p>
            <ul className="mt-4 space-y-2.5">
              {tahfidz.programPoints.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-100 bg-[var(--surface)] p-6">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-emerald-600">
              Jadwal Pembinaan
            </p>
            <ul className="mt-4 space-y-2.5">
              {tahfidz.scheduleItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-100 bg-[var(--surface)] p-6">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-emerald-600">
              Manfaat Program
            </p>
            <ul className="mt-4 space-y-2.5">
              {tahfidz.benefits.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="relative mt-16 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 px-6 py-12 text-center sm:px-12">
          <div className="absolute inset-0 dot-grid opacity-[0.06]" />
          <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {tahfidz.ctaTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-emerald-100/85 sm:text-base">
              {tahfidz.ctaDescription}
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/kontak"
                className="hover-shine inline-flex items-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-emerald-700 transition-all hover:bg-emerald-50"
              >
                Hubungi Sekolah
              </Link>
              <Link
                href="/profil"
                className="inline-flex items-center rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                Lihat Profil
              </Link>
            </div>
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
