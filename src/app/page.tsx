import Image from "next/image";
import Link from "next/link";

import Footbar from "@/components/footbar";
import Navbar from "@/components/navbar";
import {
  getFooterSettings,
  getHomepageSettings,
  getPartnerSettings,
  getSiteSettings,
} from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function Home() {
  const [schoolProfile, footerSettings, homepageSettings, partnerSettings] = await Promise.all([
    getSiteSettings(),
    getFooterSettings(),
    getHomepageSettings(),
    getPartnerSettings(),
  ]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar siteName={schoolProfile.siteName} logoUrl={schoolProfile.logoUrl} />

      <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-10 sm:px-6">
        <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-transparent to-teal-50/70" />
          <div className="relative grid min-h-[460px] items-center gap-8 p-8 md:grid-cols-2 md:p-12">
            <div>
              <p className="mb-3 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                {homepageSettings.heroBadge}
              </p>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                {homepageSettings.heroTitlePrefix}{" "}
                <span className="text-emerald-600">{schoolProfile.siteName}</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                {homepageSettings.heroDescription}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/profil"
                  className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
                >
                  Lihat Profil Sekolah
                </Link>
                <Link
                  href="/studio"
                  className="inline-flex items-center rounded-xl border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
                >
                  Kelola Konten
                </Link>
              </div>
            </div>

            <div className="relative h-64 overflow-hidden rounded-2xl border border-emerald-100 bg-white md:h-full md:min-h-[360px]">
              <Image
                src={homepageSettings.heroFrameImageUrl}
                alt={homepageSettings.heroFrameAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="grid gap-4 rounded-2xl border border-emerald-100 bg-white p-4 sm:grid-cols-2 md:grid-cols-4 md:p-5">
            {homepageSettings.metrics.map((item) => (
              <div key={item.label} className="rounded-xl border border-slate-200 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{item.value}</p>
              </div>
            ))}
            <a
              href="#ppdb"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              Daftar Sekarang
            </a>
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Fokus Pendidikan
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              {homepageSettings.pillarsHeading}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {homepageSettings.pillars.map((item) => (
              <article key={item.title} className="rounded-2xl border border-emerald-100 bg-white p-6">
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-5 md:grid-cols-2">
          {homepageSettings.galleryFrames.slice(0, 2).map((frame) => (
            <div
              key={`${frame.imageUrl}-${frame.alt}`}
              className="relative h-60 overflow-hidden rounded-2xl border border-emerald-100 bg-white sm:h-72"
            >
              <Image
                src={frame.imageUrl}
                alt={frame.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </section>

        <section
          id="ppdb"
          className="mt-14 rounded-2xl border border-emerald-200 bg-white px-6 py-10 text-center sm:px-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Pendaftaran
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            {homepageSettings.ctaTitlePrefix} {schoolProfile.siteName}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            {homepageSettings.ctaDescription}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/profil"
              className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              Info PPDB
            </Link>
            <Link
              href="/studio"
              className="inline-flex items-center rounded-xl border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
            >
              Kelola Konten Sekolah
            </Link>
          </div>
        </section>

        <section className="mt-14 rounded-2xl border border-emerald-100 bg-white px-6 py-8 sm:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Kolaborasi Industri
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              {partnerSettings.heading}
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              {partnerSettings.description}
            </p>
          </div>

          <div className="partner-marquee-container mt-8">
            <div className="partner-marquee-track">
              {[...partnerSettings.partners, ...partnerSettings.partners].map((partner, index) => {
                const badgeLabel = partner.category === "media" ? "Media" : "MoU";

                const card = (
                  <article
                    key={`${partner.name}-${index}`}
                    className="flex w-52 shrink-0 items-center gap-3 rounded-xl border border-emerald-100 bg-white px-4 py-3 shadow-sm"
                  >
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-slate-100">
                      <Image
                        src={partner.logoUrl}
                        alt={`Logo ${partner.name}`}
                        fill
                        sizes="40px"
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">{partner.name}</p>
                      <p className="text-xs text-slate-500">{badgeLabel}</p>
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
