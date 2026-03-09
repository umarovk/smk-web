import Image from "next/image";
import Link from "next/link";

import Footbar from "@/components/footbar";
import Navbar from "@/components/navbar";
import { getFooterSettings, getSiteSettings } from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function Home() {
  const [schoolProfile, footerSettings] = await Promise.all([getSiteSettings(), getFooterSettings()]);
  const metrics = [
    { label: "Program Keahlian", value: "TKJ & TSM" },
    { label: "Kemitraan Industri", value: "35+ Mitra Aktif" },
    { label: "Status PPDB", value: "Pendaftaran Dibuka" },
  ];

  const pillars = [
    {
      title: "Kurikulum Relevan Industri",
      description:
        "Materi pembelajaran disusun agar sesuai kebutuhan dunia kerja dan perkembangan teknologi.",
    },
    {
      title: "Praktik Terarah",
      description:
        "Siswa belajar melalui proyek, praktik bengkel, dan simulasi kerja untuk memperkuat keterampilan.",
    },
    {
      title: "Karakter & Disiplin",
      description:
        "Pembinaan karakter, komunikasi, dan etika kerja untuk menyiapkan lulusan yang profesional.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar siteName={schoolProfile.siteName} logoUrl={schoolProfile.logoUrl} />

      <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-10 sm:px-6">
        <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-transparent to-teal-50/70" />
          <div className="relative grid min-h-[460px] items-center gap-8 p-8 md:grid-cols-2 md:p-12">
            <div>
              <p className="mb-3 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Portal Resmi Sekolah
              </p>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                Pendidikan Modern untuk Masa Depan Cerah di{" "}
                <span className="text-emerald-600">{schoolProfile.siteName}</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Kami menghadirkan pembelajaran vokasi yang terarah, kolaboratif, dan dekat dengan
                dunia industri untuk menyiapkan siswa yang siap kerja maupun melanjutkan studi.
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
                src="/hero-sekolah.svg"
                alt="Ilustrasi lingkungan sekolah"
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
            {metrics.map((item) => (
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
              Lingkungan Belajar yang Profesional
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {pillars.map((item) => (
              <article key={item.title} className="rounded-2xl border border-emerald-100 bg-white p-6">
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-5 md:grid-cols-2">
          <div className="relative h-60 overflow-hidden rounded-2xl border border-emerald-100 bg-white sm:h-72">
            <Image
              src="/foto-sekolah-1.svg"
              alt="Kegiatan pembelajaran siswa"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative h-60 overflow-hidden rounded-2xl border border-emerald-100 bg-white sm:h-72">
            <Image
              src="/foto-sekolah-2.svg"
              alt="Kegiatan praktik kejuruan siswa"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </section>

        <section
          id="ppdb"
          className="mt-14 rounded-2xl border border-emerald-200 bg-white px-6 py-10 text-center sm:px-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Pendaftaran
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Bergabung Bersama {schoolProfile.siteName}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Mulai perjalanan belajar dengan sistem yang adaptif, dukungan guru berpengalaman, dan
            program praktik yang selaras dengan kebutuhan industri.
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
