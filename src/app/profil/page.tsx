import Image from "next/image";

import Navbar from "@/components/navbar";
import { getSiteSettings } from "@/sanity/lib/queries";

export default async function ProfilPage() {
  const schoolProfile = await getSiteSettings();

  const jurusanList = [
    {
      nama: "Teknik Komputer dan Jaringan (TKJ)",
      deskripsi:
        "Fokus pada jaringan komputer, sistem server, keamanan dasar jaringan, dan troubleshooting perangkat.",
      peluang: "Network Engineer Junior, IT Support, Teknisi Jaringan",
    },
    {
      nama: "Teknik Sepeda Motor (TSM)",
      deskripsi:
        "Mempelajari perawatan, servis, dan diagnosa kerusakan sepeda motor berbasis teknologi modern.",
      peluang: "Mekanik Bengkel, Service Advisor, Wirausaha Otomotif",
    },
  ];

  const galeriSekolah = [
    {
      src: "/foto-sekolah-1.svg",
      alt: "Dummy foto lingkungan sekolah",
    },
    {
      src: "/foto-sekolah-2.svg",
      alt: "Dummy foto kegiatan praktik siswa",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar siteName={schoolProfile.siteName} logoUrl={schoolProfile.logoUrl} />

      <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-16 sm:px-6">
        <section
          id="profil"
          className="grid gap-6 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:grid-cols-2"
        >
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
              Profil Sekolah
            </p>
            <h1 className="text-3xl font-bold tracking-tight">SMK dengan jurusan TKJ dan TSM</h1>
            <p className="mt-3 text-slate-600">
              Sekolah ini berfokus menyiapkan siswa siap kerja melalui praktik terstruktur,
              kolaborasi industri, dan pembelajaran berbasis proyek.
            </p>
            <div className="mt-5 space-y-2 text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-800">Status:</span> Dummy data untuk
                pengembangan UI
              </p>
              <p>
                <span className="font-semibold text-slate-800">Integrasi:</span> Siap dipindah ke
                data Sanity
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {galeriSekolah.map((foto) => (
              <div key={foto.src} className="overflow-hidden rounded-xl ring-1 ring-slate-200">
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  width={640}
                  height={400}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </section>

        <section id="jurusan" className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Jurusan
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {jurusanList.map((jurusan) => (
              <article key={jurusan.nama} className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">{jurusan.nama}</h2>
                <p className="mt-2 text-sm text-slate-600">{jurusan.deskripsi}</p>
                <p className="mt-3 text-sm text-slate-700">
                  <span className="font-semibold">Peluang:</span> {jurusan.peluang}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
