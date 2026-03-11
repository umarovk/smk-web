import Image from "next/image";
import Link from "next/link";

import Footbar from "@/components/footbar";
import Navbar from "@/components/navbar";
import {
  getConcentrations,
  getFooterSettings,
  getNavbarSettings,
  getProfileSettings,
  getSiteSettings,
} from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function ProfilPage() {
  const [schoolProfile, footerSettings, profile, concentrations, navbarSettings] = await Promise.all([
    getSiteSettings(),
    getFooterSettings(),
    getProfileSettings(),
    getConcentrations(),
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
        {/* ════ HERO BANNER ════ */}
        <section className="animate-fade-up relative h-56 overflow-hidden rounded-[1.75rem] sm:h-72 md:h-80">
          <Image
            src={profile.heroImageUrl}
            alt={profile.heroAlt}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent" />
          <div className="absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-black/[0.08]" />

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <nav className="animate-fade-up stagger-1 mb-3 flex items-center gap-2 text-xs text-white/70">
              <Link href="/" className="transition-colors hover:text-white">Beranda</Link>
              <svg width="12" height="12" viewBox="0 0 15 15" fill="none"><path d="M6.18 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L9.94 8 6.18 4.28a.75.75 0 0 1 0-1.06Z" fill="currentColor"/></svg>
              <span className="text-white/90">Profil Sekolah</span>
            </nav>
            <h1 className="animate-fade-up stagger-2 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
              Profil <span className="text-emerald-300">{schoolProfile.siteName}</span>
            </h1>
          </div>
        </section>

        {/* ════ PROFIL SEKOLAH ════ */}
        <section className="mt-14 grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-emerald-600">
              Tentang Kami
            </p>
            <h2 className="font-display mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Profil Sekolah
            </h2>
            <div className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
            <p className="mt-6 text-[0.95rem] leading-8 text-slate-500">
              {profile.profileDescription}
            </p>
          </div>

          {profile.profileImageUrl && (
            <div className="gallery-zoom relative h-64 overflow-hidden rounded-2xl border border-slate-100 shadow-lg shadow-black/[0.04] sm:h-80">
              <Image
                src={profile.profileImageUrl}
                alt={profile.profileImageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/[0.05]" />
            </div>
          )}
        </section>

        {/* ════ SEJARAH ════ */}
        <section className="mt-20 grid items-center gap-10 md:grid-cols-2">
          {profile.historyImageUrl && (
            <div className="gallery-zoom relative h-64 overflow-hidden rounded-2xl border border-slate-100 shadow-lg shadow-black/[0.04] sm:h-80 md:order-1">
              <Image
                src={profile.historyImageUrl}
                alt={profile.historyImageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/[0.05]" />
            </div>
          )}

          <div className={profile.historyImageUrl ? "md:order-0" : ""}>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-emerald-600">
              Latar Belakang
            </p>
            <h2 className="font-display mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Sejarah Sekolah
            </h2>
            <div className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
            <p className="mt-6 text-[0.95rem] leading-8 text-slate-500">
              {profile.history}
            </p>
          </div>
        </section>

        {/* ════ VISI & MISI ════ */}
        <section className="mt-20 grid gap-6 md:grid-cols-2">
          {/* Visi */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-[var(--surface)] p-8">
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-50/70" />
            <div className="relative">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              </div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-emerald-600">Visi</p>
              <h2 className="font-display mt-1 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                Tujuan Besar Kami
              </h2>
              <p className="mt-4 text-[0.95rem] leading-8 text-slate-500">
                {profile.vision}
              </p>
            </div>
          </div>

          {/* Misi */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-[var(--surface)] p-8">
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-teal-50/70" />
            <div className="relative">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-600 text-white shadow-md shadow-teal-600/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-teal-600">Misi</p>
              <h2 className="font-display mt-1 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                Langkah Strategis
              </h2>
              <ol className="mt-4 space-y-3">
                {profile.missions.map((m, i) => (
                  <li key={i} className="flex items-start gap-3 text-[0.9rem] leading-7 text-slate-500">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-xs font-bold text-teal-600">
                      {i + 1}
                    </span>
                    {m}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ════ TUJUAN ════ */}
        <section className="mt-14">
          <div className="mb-8 max-w-xl">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-emerald-600">
              Target & Sasaran
            </p>
            <h2 className="font-display mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Tujuan Sekolah
            </h2>
            <div className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {profile.goals.map((goal, i) => (
              <div
                key={i}
                className="card-lift group flex items-start gap-4 rounded-2xl border border-slate-100 bg-[var(--surface)] p-6"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 font-display text-sm font-bold text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                  {i + 1}
                </span>
                <p className="text-[0.9rem] leading-7 text-slate-500">{goal}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ════ KONSENTRASI KEAHLIAN ════ */}
        <section id="jurusan" className="mt-20">
          <div className="mb-8 max-w-xl">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-emerald-600">
              Program Unggulan
            </p>
            <h2 className="font-display mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Konsentrasi Keahlian
            </h2>
            <div className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {concentrations.map((item) => (
              <Link
                key={item.slug}
                href={`/jurusan/${item.slug}`}
                className="card-lift group overflow-hidden rounded-2xl border border-slate-100 bg-[var(--surface)]"
              >
                {item.imageUrl && (
                  <div className="gallery-zoom relative h-48 overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.imageAlt || item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-slate-900">{item.name}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-500">{item.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                    Lihat detail
                    <svg width="12" height="12" viewBox="0 0 15 15" fill="none"><path d="M8.14 2.56a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 7.5 8.14 3.62a.75.75 0 0 1 0-1.06Z" fill="currentColor"/></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ════ GALERI FOTO ════ */}
        <section className="mt-20">
          <div className="mb-8 max-w-xl">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-emerald-600">
              Dokumentasi
            </p>
            <h2 className="font-display mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Galeri Sekolah
            </h2>
            <div className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profile.galleryPhotos.map((photo, index) => (
              <div
                key={`${photo.imageUrl}-${index}`}
                className="gallery-zoom group relative h-52 overflow-hidden rounded-2xl border border-slate-100 shadow-sm sm:h-60"
              >
                <Image
                  src={photo.imageUrl}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <p className="absolute bottom-0 left-0 right-0 translate-y-2 px-4 pb-4 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {photo.alt}
                </p>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/[0.05]" />
              </div>
            ))}
          </div>
        </section>

        {/* ════ CTA ════ */}
        <section className="relative mt-20 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 px-6 py-14 text-center sm:px-12">
          <div className="absolute inset-0 dot-grid opacity-[0.06]" />
          <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />

          <div className="relative">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-emerald-200">
              {profile.ctaBadge}
            </p>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {profile.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-emerald-100/80 sm:text-base">
              {profile.ctaDescription}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="hover-shine inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-emerald-700 shadow-lg shadow-black/10 transition-all hover:bg-emerald-50 hover:shadow-black/15"
              >
                Kembali ke Beranda
                <svg width="14" height="14" viewBox="0 0 15 15" fill="none"><path d="M8.14 2.56a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 7.5 8.14 3.62a.75.75 0 0 1 0-1.06Z" fill="currentColor"/></svg>
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
