import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Footbar from "@/components/footbar";
import Navbar from "@/components/navbar";
import { absoluteUrl } from "@/lib/seo";
import {
  getConcentrationBySlug,
  getFooterSettings,
  getNavbarSettings,
  getNavConcentrations,
  getSeoSettings,
  getSiteSettings,
} from "@/sanity/lib/queries";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [concentration, seoSettings] = await Promise.all([
    getConcentrationBySlug(slug),
    getSeoSettings(),
  ]);

  if (!concentration) {
    return {
      title: "Jurusan",
      description: seoSettings.profileDescription || seoSettings.defaultDescription,
    };
  }

  const title = concentration.seoTitle || concentration.name;
  const description = concentration.seoDescription || concentration.description;

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(`/jurusan/${slug}`) },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/jurusan/${slug}`),
      images: concentration.imageUrl ? [{ url: concentration.imageUrl }] : undefined,
      type: "article",
    },
  };
}

export default async function JurusanPage({ params }: PageProps) {
  const { slug } = await params;

  const [schoolProfile, footerSettings, concentration, concentrations, navbarSettings] = await Promise.all([
    getSiteSettings(),
    getFooterSettings(),
    getConcentrationBySlug(slug),
    getNavConcentrations(),
    getNavbarSettings(),
  ]);

  if (!concentration) notFound();

  const otherConcentrations = concentrations.filter((c) => c.slug !== slug);

  return (
    <div className="min-h-screen font-[family-name:var(--font-body)] text-[var(--foreground)]">
      <Navbar
        siteName={schoolProfile.siteName}
        logoUrl={schoolProfile.logoUrl}
        concentrations={concentrations}
        navbarSettings={navbarSettings}
      />

      <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-10 sm:px-6">
        {/* ════ HERO BANNER ════ */}
        <section className="animate-fade-up relative h-56 overflow-hidden rounded-[1.75rem] sm:h-72 md:h-80">
          {concentration.imageUrl ? (
            <Image
              src={concentration.imageUrl}
              alt={concentration.imageAlt || concentration.name}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent" />
          <div className="absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-black/[0.08]" />

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <nav className="animate-fade-up stagger-1 mb-3 flex items-center gap-2 text-xs text-white/70">
              <Link href="/" className="transition-colors hover:text-white">Beranda</Link>
              <svg width="12" height="12" viewBox="0 0 15 15" fill="none"><path d="M6.18 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L9.94 8 6.18 4.28a.75.75 0 0 1 0-1.06Z" fill="currentColor"/></svg>
              <Link href="/profil" className="transition-colors hover:text-white">Profil</Link>
              <svg width="12" height="12" viewBox="0 0 15 15" fill="none"><path d="M6.18 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L9.94 8 6.18 4.28a.75.75 0 0 1 0-1.06Z" fill="currentColor"/></svg>
              <span className="text-white/90">Jurusan</span>
            </nav>
            <h1 className="animate-fade-up stagger-2 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
              {concentration.name}
            </h1>
          </div>
        </section>

        {/* ════ DESKRIPSI ════ */}
        <section className="mt-14 grid items-start gap-10 md:grid-cols-2">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-emerald-600">
              Konsentrasi Keahlian
            </p>
            <h2 className="font-display mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Tentang Program Ini
            </h2>
            <div className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
            <p className="mt-6 text-[0.95rem] leading-8 text-slate-500">
              {concentration.description}
            </p>
            {concentration.duration && (
              <p className="mt-5 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Durasi Program: {concentration.duration}
              </p>
            )}
          </div>

          {concentration.imageUrl && (
            <div className="gallery-zoom relative h-64 overflow-hidden rounded-2xl border border-slate-100 shadow-lg shadow-black/[0.04] sm:h-80">
              <Image
                src={concentration.imageUrl}
                alt={concentration.imageAlt || concentration.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/[0.05]" />
            </div>
          )}
        </section>

        {(concentration.competencyFocus?.length ||
          concentration.careerProspects?.length ||
          concentration.facilities?.length) && (
          <section className="mt-14 grid gap-6 md:grid-cols-3">
            {concentration.competencyFocus?.length ? (
              <article className="rounded-2xl border border-slate-100 bg-[var(--surface)] p-6">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-emerald-600">
                  Fokus Kompetensi
                </p>
                <ul className="mt-4 space-y-2.5">
                  {concentration.competencyFocus.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-500">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ) : null}

            {concentration.careerProspects?.length ? (
              <article className="rounded-2xl border border-slate-100 bg-[var(--surface)] p-6">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-emerald-600">
                  Prospek Karier
                </p>
                <ul className="mt-4 space-y-2.5">
                  {concentration.careerProspects.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-500">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ) : null}

            {concentration.facilities?.length ? (
              <article className="rounded-2xl border border-slate-100 bg-[var(--surface)] p-6">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-emerald-600">
                  Fasilitas
                </p>
                <ul className="mt-4 space-y-2.5">
                  {concentration.facilities.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-500">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ) : null}
          </section>
        )}

        {/* ════ JURUSAN LAIN ════ */}
        {otherConcentrations.length > 0 && (
          <section className="mt-20">
            <div className="mb-8 max-w-xl">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-emerald-600">
                Lihat Juga
              </p>
              <h2 className="font-display mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Jurusan Lainnya
              </h2>
              <div className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {otherConcentrations.map((c) => (
                <Link
                  key={c.slug}
                  href={`/jurusan/${c.slug}`}
                  className="card-lift group flex items-center gap-4 rounded-2xl border border-slate-100 bg-[var(--surface)] p-6 transition-colors"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-slate-900">{c.name}</h3>
                    <p className="mt-0.5 text-xs text-slate-400">Lihat detail program</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ════ CTA ════ */}
        <section className="relative mt-20 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 px-6 py-14 text-center sm:px-12">
          <div className="absolute inset-0 dot-grid opacity-[0.06]" />
          <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />

          <div className="relative">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-emerald-200">
              Tertarik dengan {concentration.name}?
            </p>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Mulai Perjalananmu di Sini
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-emerald-100/80 sm:text-base">
              Daftarkan diri dan jadilah bagian dari program {concentration.name} di {schoolProfile.siteName}.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/profil"
                className="hover-shine inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-emerald-700 shadow-lg shadow-black/10 transition-all hover:bg-emerald-50 hover:shadow-black/15"
              >
                Lihat Profil Sekolah
                <svg width="14" height="14" viewBox="0 0 15 15" fill="none"><path d="M8.14 2.56a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 7.5 8.14 3.62a.75.75 0 0 1 0-1.06Z" fill="currentColor"/></svg>
              </Link>
              <Link
                href="/"
                className="inline-flex items-center rounded-xl border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10"
              >
                Kembali ke Beranda
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
