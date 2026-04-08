import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

import Footbar from "@/components/footbar";
import Navbar from "@/components/navbar";
import {
  getConcentrations,
  getFooterSettings,
  getNavbarSettings,
  getNavConcentrations,
  getSeoSettings,
  getSiteSettings,
  getSpmbSettings,
  getTahfidzSettings,
} from "@/sanity/lib/queries";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const [spmb, seoSettings] = await Promise.all([getSpmbSettings(), getSeoSettings()]);
  return buildPageMetadata({
    title: spmb.seoTitle || seoSettings.spmbTitle || "SPMB",
    description: spmb.seoDescription || seoSettings.spmbDescription || seoSettings.defaultDescription,
    path: "/spmb",
  });
}

function normalizePhone(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  return digits;
}

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID").format(amount);
}

export default async function SpmbPage() {
  const [schoolProfile, footerSettings, navConcentrations, concentrations, tahfidz, spmb, navbarSettings] =
    await Promise.all([
      getSiteSettings(),
      getFooterSettings(),
      getNavConcentrations(),
      getConcentrations(),
      getTahfidzSettings(),
      getSpmbSettings(),
      getNavbarSettings(),
    ]);

  const waHref = `https://wa.me/${normalizePhone(footerSettings.phone)}`;

  return (
    <div className="min-h-screen font-[family-name:var(--font-body)] text-[var(--foreground)]">
      <Navbar
        siteName={schoolProfile.siteName}
        logoUrl={schoolProfile.logoUrl}
        concentrations={navConcentrations}
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
              <span className="text-white">SPMB</span>
            </nav>
            <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-emerald-100">
              {spmb.heroBadge}
            </p>
            <h1 className="font-display mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {spmb.heroTitle}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-emerald-100/90 sm:text-base">
              {spmb.heroDescription}
            </p>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4 max-w-xl">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-emerald-600">
              {spmb.galleryHeading}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {spmb.galleryPhotos.map((photo) => (
              <div
                key={photo.alt}
                className="group relative h-28 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 sm:h-32"
              >
                <Image
                  src={photo.imageUrl}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                <p className="absolute bottom-0 left-0 right-0 px-3 pb-2 text-[0.7rem] font-medium text-white">
                  {photo.alt}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-slate-100 bg-[var(--surface)] p-6 sm:p-8">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-emerald-600">
            {spmb.registrationInfoHeading}
          </p>
          <ul className="mt-4 space-y-3">
            {spmb.registrationInfo.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm leading-7 text-slate-600">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <div className="mb-5 max-w-xl">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-emerald-600">
              {spmb.concentrationsHeading}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {concentrations.map((item) => (
              <Link
                key={item.slug}
                href={`/jurusan/${item.slug}`}
                className="card-lift overflow-hidden rounded-2xl border border-slate-100 bg-[var(--surface)]"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={item.imageUrl || "/hero-sekolah.svg"}
                    alt={item.imageAlt || item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base font-bold text-slate-900">{item.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-100 bg-[var(--surface)] p-6 sm:p-8">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-emerald-600">
                Program Tahfidzul Qur&apos;an
              </p>
              <h2 className="font-display mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
                {tahfidz.heroTitle}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{tahfidz.heroDescription}</p>
              <p className="mt-4 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Target: {tahfidz.targetHafalan}
              </p>
              <div className="mt-5">
                <Link
                  href="/tahfidz"
                  className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  Lihat Detail Program Tahfidz
                </Link>
              </div>
            </div>

            <div className="relative h-56 overflow-hidden rounded-2xl border border-slate-100 sm:h-64">
              <Image
                src={tahfidz.heroImageUrl || "/hero-sekolah.svg"}
                alt={tahfidz.heroImageAlt || "Program Tahfidz"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-100 bg-[var(--surface)] p-6">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-emerald-600">
              {spmb.requirementsHeading}
            </p>
            <ul className="mt-4 space-y-2.5">
              {spmb.requirements.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-100 bg-[var(--surface)] p-6">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-emerald-600">
              {spmb.registrationFlowHeading}
            </p>
            <ol className="mt-4 space-y-2.5">
              {spmb.registrationFlow.map((item, idx) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-[0.7rem] font-bold text-emerald-700">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </article>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-100 bg-[var(--surface)] p-6">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-emerald-600">
              {spmb.scheduleHeading}
            </p>
            <ul className="mt-4 space-y-2.5">
              {spmb.scheduleItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-100 bg-[var(--surface)] p-6">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-emerald-600">
              {spmb.scheduleSecondaryHeading}
            </p>
            <ul className="mt-4 space-y-2.5">
              {spmb.scheduleSecondaryItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        {spmb.showReRegistrationSection && (
          <section className="mt-8">
            <div className="mb-5 max-w-xl">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-emerald-600">
                {spmb.reRegistrationHeading}
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                  <h3 className="font-display text-sm font-bold text-slate-900">{spmb.femaleFeeTitle}</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[520px] text-sm">
                    <tbody>
                      {spmb.femaleFeeItems.map((item, idx) => (
                        <tr key={`${item.label}-${idx}`} className="border-b border-slate-100">
                          <td className="w-10 px-3 py-2 text-center font-semibold text-slate-600">
                            {idx + 1}
                          </td>
                          <td className="px-3 py-2 text-slate-700">{item.label}</td>
                          <td className="w-9 px-2 py-2 text-slate-500">Rp</td>
                          <td className="w-32 px-3 py-2 text-right font-semibold text-slate-900">
                            {formatRupiah(item.amount)}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-slate-50 font-bold text-slate-900">
                        <td className="px-3 py-2" colSpan={2}>
                          {spmb.femaleTotalLabel}
                        </td>
                        <td className="px-2 py-2">Rp</td>
                        <td className="px-3 py-2 text-right">{formatRupiah(spmb.femaleTotalAmount)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="px-4 py-3 text-sm text-slate-600">{spmb.femaleAchievementNote}</p>
              </article>

              <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                  <h3 className="font-display text-sm font-bold text-slate-900">{spmb.maleFeeTitle}</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[520px] text-sm">
                    <tbody>
                      {spmb.maleFeeItems.map((item, idx) => (
                        <tr key={`${item.label}-${idx}`} className="border-b border-slate-100">
                          <td className="w-10 px-3 py-2 text-center font-semibold text-slate-600">
                            {idx + 1}
                          </td>
                          <td className="px-3 py-2 text-slate-700">{item.label}</td>
                          <td className="w-9 px-2 py-2 text-slate-500">Rp</td>
                          <td className="w-32 px-3 py-2 text-right font-semibold text-slate-900">
                            {formatRupiah(item.amount)}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-slate-50 font-bold text-slate-900">
                        <td className="px-3 py-2" colSpan={2}>
                          {spmb.maleTotalLabel}
                        </td>
                        <td className="px-2 py-2">Rp</td>
                        <td className="px-3 py-2 text-right">{formatRupiah(spmb.maleTotalAmount)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="px-4 py-3 text-sm text-slate-600">{spmb.maleAchievementNote}</p>
              </article>
            </div>
          </section>
        )}

        <section className="relative mt-10 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 px-6 py-12 text-center sm:px-12">
          <div className="absolute inset-0 dot-grid opacity-[0.06]" />
          <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />

          <div className="relative">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {spmb.ctaTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-emerald-100/85 sm:text-base">
              {spmb.ctaDescription}
            </p>

            <div className="mt-6 grid gap-3 text-left sm:grid-cols-3">
              <a
                href={`tel:${footerSettings.phone}`}
                className="rounded-xl border border-white/20 bg-white/10 p-4 text-sm font-medium text-white transition-all hover:bg-white/15"
              >
                Telepon: {footerSettings.phone}
              </a>
              <a
                href={`mailto:${footerSettings.email}`}
                className="rounded-xl border border-white/20 bg-white/10 p-4 text-sm font-medium text-white transition-all hover:bg-white/15"
              >
                Email: {footerSettings.email}
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/20 bg-white/10 p-4 text-sm font-medium text-white transition-all hover:bg-white/15"
              >
                WhatsApp Panitia
              </a>
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
