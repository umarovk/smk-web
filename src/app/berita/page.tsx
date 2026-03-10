import Image from "next/image";
import Link from "next/link";

import Footbar from "@/components/footbar";
import Navbar from "@/components/navbar";
import {
  getArticles,
  getFooterSettings,
  getNavConcentrations,
  getSiteSettings,
} from "@/sanity/lib/queries";

export const revalidate = 60;

const categoryLabels: Record<string, string> = {
  kegiatan: "Kegiatan",
  prestasi: "Prestasi",
  pengumuman: "Pengumuman",
  akademik: "Akademik",
};

const categoryColors: Record<string, string> = {
  kegiatan: "bg-emerald-50 text-emerald-600",
  prestasi: "bg-amber-50 text-amber-600",
  pengumuman: "bg-sky-50 text-sky-600",
  akademik: "bg-violet-50 text-violet-600",
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BeritaPage() {
  const [schoolProfile, footerSettings, articles, concentrations] = await Promise.all([
    getSiteSettings(),
    getFooterSettings(),
    getArticles(),
    getNavConcentrations(),
  ]);

  return (
    <div className="min-h-screen font-[family-name:var(--font-body)] text-[var(--foreground)]">
      <Navbar
        siteName={schoolProfile.siteName}
        logoUrl={schoolProfile.logoUrl}
        concentrations={concentrations}
      />

      <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-10 sm:px-6">
        {/* ════ HERO BANNER ════ */}
        <section className="animate-fade-up relative h-44 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 sm:h-52">
          <div className="absolute inset-0 dot-grid opacity-[0.06]" />
          <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-black/[0.08]" />

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <nav className="animate-fade-up stagger-1 mb-3 flex items-center gap-2 text-xs text-white/70">
              <Link href="/" className="transition-colors hover:text-white">Beranda</Link>
              <svg width="12" height="12" viewBox="0 0 15 15" fill="none"><path d="M6.18 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L9.94 8 6.18 4.28a.75.75 0 0 1 0-1.06Z" fill="currentColor"/></svg>
              <span className="text-white/90">Berita</span>
            </nav>
            <h1 className="animate-fade-up stagger-2 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
              Berita & <span className="text-emerald-200">Kegiatan</span>
            </h1>
          </div>
        </section>

        {/* ════ ARTICLE GRID ════ */}
        <section className="mt-12">
          {articles.length === 0 ? (
            <div className="rounded-2xl border border-slate-100 bg-[var(--surface)] py-20 text-center">
              <p className="text-sm text-slate-400">Belum ada berita yang dipublikasikan.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/berita/${article.slug}`}
                  className="card-lift group overflow-hidden rounded-2xl border border-slate-100 bg-[var(--surface)]"
                >
                  <div className="gallery-zoom relative h-48 overflow-hidden">
                    <Image
                      src={article.coverImageUrl}
                      alt={article.coverImageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                    <span
                      className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider ${
                        categoryColors[article.category] || "bg-slate-50 text-slate-600"
                      }`}
                    >
                      {categoryLabels[article.category] || article.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 text-[0.7rem] text-slate-400">
                      <time dateTime={article.publishedAt}>
                        {formatDate(article.publishedAt)}
                      </time>
                      <span className="h-0.5 w-0.5 rounded-full bg-slate-300" />
                      <span>{article.author}</span>
                    </div>
                    <h2 className="mt-2 font-display text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-emerald-700">
                      {article.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                      {article.excerpt}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                      Baca selengkapnya
                      <svg width="12" height="12" viewBox="0 0 15 15" fill="none"><path d="M8.14 2.56a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 7.5 8.14 3.62a.75.75 0 0 1 0-1.06Z" fill="currentColor"/></svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
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
