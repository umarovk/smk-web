import Image from "next/image";
import Link from "next/link";

import Footbar from "@/components/footbar";
import Navbar from "@/components/navbar";
import {
  getFooterSettings,
  getHomepageSettings,
  getNavConcentrations,
  getPartnerSettings,
  getSiteSettings,
} from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function Home() {
  const [schoolProfile, footerSettings, homepageSettings, partnerSettings, concentrations] = await Promise.all([
    getSiteSettings(),
    getFooterSettings(),
    getHomepageSettings(),
    getPartnerSettings(),
    getNavConcentrations(),
  ]);

  return (
    <div className="min-h-screen bg-[var(--background)] font-[family-name:var(--font-body)] text-[var(--foreground)]">
      <Navbar
        siteName={schoolProfile.siteName}
        logoUrl={schoolProfile.logoUrl}
        concentrations={concentrations}
      />

      <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-10 sm:px-6">
        {/* ════ HERO ════ */}
        <section className="animate-fade-up relative overflow-hidden rounded-[1.75rem] bg-[var(--surface)]">
          <div className="absolute inset-0 dot-grid opacity-[0.035]" />
          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-teal-200/25 blur-3xl" />

          <div className="relative grid min-h-[480px] items-center gap-10 p-8 md:grid-cols-2 md:p-14">
            <div>
              <p className="animate-fade-up stagger-1 mb-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-[0.7rem] font-semibold uppercase tracking-widest text-emerald-700">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {homepageSettings.heroBadge}
              </p>
              <h1 className="animate-fade-up stagger-2 font-display text-[2.25rem] font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl">
                {homepageSettings.heroTitlePrefix}{" "}
                <span className="text-gradient">{schoolProfile.siteName}</span>
              </h1>
              <p className="animate-fade-up stagger-3 mt-5 max-w-xl text-[0.95rem] leading-7 text-slate-500">
                {homepageSettings.heroDescription}
              </p>

              <div className="animate-fade-up stagger-4 mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={homepageSettings.heroPrimaryButtonHref}
                  className="hover-shine inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-emerald-700/25"
                >
                  {homepageSettings.heroPrimaryButtonLabel}
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="opacity-70"><path d="M6.18 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L9.94 8 6.18 4.28a.75.75 0 0 1 0-1.06Z" fill="currentColor"/></svg>
                </Link>
                <Link
                  href={homepageSettings.heroSecondaryButtonHref}
                  className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  {homepageSettings.heroSecondaryButtonLabel}
                </Link>
              </div>
            </div>

            <div className="animate-fade-up stagger-5 animate-float relative h-72 overflow-hidden rounded-2xl border border-slate-100 shadow-xl shadow-black/[0.04] md:h-full md:min-h-[380px]">
              <Image
                src={homepageSettings.heroFrameImageUrl}
                alt={homepageSettings.heroFrameAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/[0.05]" />
            </div>
          </div>
        </section>

        {/* ════ METRICS BAR ════ */}
        <section className="animate-fade-up stagger-6 -mt-5 relative z-10 mx-4 sm:mx-8">
          <div className="grid gap-3 rounded-2xl border border-slate-100 bg-[var(--surface)] p-3 shadow-lg shadow-black/[0.03] sm:grid-cols-2 md:grid-cols-4 md:p-4">
            {homepageSettings.metrics.map((item, i) => (
              <div
                key={item.label}
                className="card-lift group rounded-xl border border-slate-100 bg-gradient-to-br from-slate-50/80 to-white px-4 py-3.5"
                style={{ animationDelay: `${0.35 + i * 0.05}s` }}
              >
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-slate-400 transition-colors group-hover:text-emerald-600">
                  {item.label}
                </p>
                <p className="mt-1 font-display text-sm font-bold text-slate-800">{item.value}</p>
              </div>
            ))}
            <Link
              href={homepageSettings.metricsButtonHref}
              className="hover-shine inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/15 transition-all hover:bg-emerald-700 hover:shadow-emerald-700/20"
            >
              {homepageSettings.metricsButtonLabel}
              <svg width="14" height="14" viewBox="0 0 15 15" fill="none"><path d="M8.14 2.56a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 7.5 8.14 3.62a.75.75 0 0 1 0-1.06Z" fill="currentColor"/></svg>
            </Link>
          </div>
        </section>

        {/* ════ PILLARS ════ */}
        <section className="mt-20">
          <div className="mb-8 max-w-xl">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-emerald-600">
              Fokus Pendidikan
            </p>
            <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {homepageSettings.pillarsHeading}
            </h2>
            <div className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {homepageSettings.pillars.map((item, i) => (
              <article
                key={item.title}
                className="card-lift group relative overflow-hidden rounded-2xl border border-slate-100 bg-[var(--surface)] p-7"
              >
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-emerald-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {i === 0 && <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>}
                      {i === 1 && <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></>}
                      {i >= 2 && <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>}
                    </svg>
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-500">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ════ GALLERY ════ */}
        <section className="mt-20">
          <div className="mb-8 max-w-xl">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-emerald-600">
              Galeri Kegiatan
            </p>
            <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Momen Belajar Terbaik
            </h2>
            <div className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {homepageSettings.galleryFrames.map((frame, index) => (
              <div
                key={`${frame.imageUrl}-${frame.alt}-${index}`}
                className="gallery-zoom group relative h-56 overflow-hidden rounded-2xl border border-slate-100 shadow-sm sm:h-64"
              >
                <Image
                  src={frame.imageUrl}
                  alt={frame.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <p className="absolute bottom-0 left-0 right-0 translate-y-2 px-4 pb-4 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {frame.alt}
                </p>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/[0.05]" />
              </div>
            ))}
          </div>
        </section>

        {/* ════ CTA / PPDB ════ */}
        <section
          id="ppdb"
          className="relative mt-20 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 px-6 py-14 text-center sm:px-12"
        >
          <div className="absolute inset-0 dot-grid opacity-[0.06]" />
          <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />

          <div className="relative">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-emerald-200">
              Pendaftaran
            </p>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {homepageSettings.ctaTitlePrefix}{" "}
              <span className="text-emerald-200">{schoolProfile.siteName}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-emerald-100/80 sm:text-base">
              {homepageSettings.ctaDescription}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={homepageSettings.ctaPrimaryButtonHref}
                className="hover-shine inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-emerald-700 shadow-lg shadow-black/10 transition-all hover:bg-emerald-50 hover:shadow-black/15"
              >
                {homepageSettings.ctaPrimaryButtonLabel}
                <svg width="14" height="14" viewBox="0 0 15 15" fill="none"><path d="M8.14 2.56a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 7.5 8.14 3.62a.75.75 0 0 1 0-1.06Z" fill="currentColor"/></svg>
              </Link>
              <Link
                href={homepageSettings.ctaSecondaryButtonHref}
                className="inline-flex items-center rounded-xl border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10"
              >
                {homepageSettings.ctaSecondaryButtonLabel}
              </Link>
            </div>
          </div>
        </section>

        {/* ════ PARTNERS / MOU ════ */}
        <section className="mt-20 rounded-[1.75rem] border border-slate-100 bg-[var(--surface)] px-6 py-10 sm:px-10">
          <div className="text-center">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-emerald-600">
              Kolaborasi Industri
            </p>
            <h2 className="font-display mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              {partnerSettings.heading}
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
              {partnerSettings.description}
            </p>
          </div>

          <div className="partner-marquee-container mt-10">
            <div className="partner-marquee-track">
              {[...partnerSettings.partners, ...partnerSettings.partners].map((partner, index) => {
                const badgeColor =
                  partner.category === "media"
                    ? "bg-sky-50 text-sky-600"
                    : "bg-emerald-50 text-emerald-600";
                const badgeLabel = partner.category === "media" ? "Media" : "MoU";

                const card = (
                  <article
                    key={`${partner.name}-${index}`}
                    className="card-lift flex w-56 shrink-0 items-center gap-3.5 rounded-xl border border-slate-100 bg-white px-4 py-3.5"
                  >
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
                      <Image
                        src={partner.logoUrl}
                        alt={`Logo ${partner.name}`}
                        fill
                        sizes="44px"
                        className="object-contain p-1.5"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">{partner.name}</p>
                      <span className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider ${badgeColor}`}>
                        {badgeLabel}
                      </span>
                    </div>
                  </article>
                );

                if (partner.website) {
                  return (
                    <a
                      key={`${partner.name}-${index}`}
                      href={partner.website}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Kunjungi website ${partner.name}`}
                    >
                      {card}
                    </a>
                  );
                }

                return card;
              })}
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
