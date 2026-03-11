import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footbar from "@/components/footbar";
import Navbar from "@/components/navbar";
import { absoluteUrl } from "@/lib/seo";
import {
  getArticleBySlug,
  getArticles,
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
  const [article, seoSettings] = await Promise.all([getArticleBySlug(slug), getSeoSettings()]);

  if (!article) {
    return {
      title: seoSettings.newsTitle || "Berita",
      description: seoSettings.newsDescription || seoSettings.defaultDescription,
    };
  }

  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt;

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(`/berita/${slug}`) },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/berita/${slug}`),
      images: article.coverImageUrl ? [{ url: article.coverImageUrl }] : undefined,
      type: "article",
      publishedTime: article.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: article.coverImageUrl ? [article.coverImageUrl] : undefined,
    },
  };
}

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

const portableTextComponents = {
  types: {
    image: ({ value }: { value: { url?: string; alt?: string; caption?: string } }) => {
      if (!value?.url) return null;
      return (
        <figure className="my-8">
          <div className="relative h-64 overflow-hidden rounded-2xl border border-slate-100 sm:h-80">
            <Image
              src={value.url}
              alt={value.alt || ""}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-xs text-slate-400">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-display mb-4 mt-10 text-2xl font-extrabold tracking-tight text-slate-900">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-display mb-3 mt-8 text-xl font-bold tracking-tight text-slate-900">
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-5 text-[0.95rem] leading-8 text-slate-600">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-6 border-l-4 border-emerald-400 pl-5 italic text-slate-500">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold text-slate-800">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => <em>{children}</em>,
    link: ({ value, children }: { value?: { href: string }; children?: React.ReactNode }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noreferrer"
        className="font-medium text-emerald-600 underline decoration-emerald-300 underline-offset-2 transition-colors hover:text-emerald-700"
      >
        {children}
      </a>
    ),
  },
};

export default async function BeritaDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [schoolProfile, footerSettings, article, allArticles, concentrations, navbarSettings] = await Promise.all([
    getSiteSettings(),
    getFooterSettings(),
    getArticleBySlug(slug),
    getArticles(),
    getNavConcentrations(),
    getNavbarSettings(),
  ]);

  if (!article) notFound();

  const relatedArticles = allArticles.filter((a) => a.slug !== slug).slice(0, 3);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author,
    },
    image: article.coverImageUrl ? [article.coverImageUrl] : [],
    mainEntityOfPage: absoluteUrl(`/berita/${slug}`),
  };

  return (
    <div className="min-h-screen font-[family-name:var(--font-body)] text-[var(--foreground)]">
      <Navbar
        siteName={schoolProfile.siteName}
        logoUrl={schoolProfile.logoUrl}
        concentrations={concentrations}
        navbarSettings={navbarSettings}
      />

      <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-10 sm:px-6">
        {/* ════ HERO IMAGE ════ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <section className="animate-fade-up relative h-56 overflow-hidden rounded-[1.75rem] sm:h-72 md:h-96">
          <Image
            src={article.coverImageUrl}
            alt={article.coverImageAlt}
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
              <Link href="/berita" className="transition-colors hover:text-white">Berita</Link>
              <svg width="12" height="12" viewBox="0 0 15 15" fill="none"><path d="M6.18 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L9.94 8 6.18 4.28a.75.75 0 0 1 0-1.06Z" fill="currentColor"/></svg>
              <span className="truncate text-white/90">{article.title}</span>
            </nav>
            <span
              className={`inline-block rounded-full px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider ${
                categoryColors[article.category] || "bg-slate-50 text-slate-600"
              }`}
            >
              {categoryLabels[article.category] || article.category}
            </span>
          </div>
        </section>

        {/* ════ ARTICLE CONTENT ════ */}
        <article className="mx-auto mt-10 max-w-3xl">
          <header className="mb-10">
            <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              {article.title}
            </h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-slate-400">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              </div>
              <div>
                <p className="font-medium text-slate-600">{article.author}</p>
                <time dateTime={article.publishedAt} className="text-xs">
                  {formatDate(article.publishedAt)}
                </time>
              </div>
            </div>
          </header>

          <div className="prose-custom">
            {/* @ts-expect-error -- Portable Text component typing is loose with custom components */}
            <PortableText value={article.body} components={portableTextComponents} />
          </div>
        </article>

        {/* ════ RELATED ARTICLES ════ */}
        {relatedArticles.length > 0 && (
          <section className="mt-20">
            <div className="mb-8 max-w-xl">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-emerald-600">
                Baca Juga
              </p>
              <h2 className="font-display mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Berita Lainnya
              </h2>
              <div className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/berita/${a.slug}`}
                  className="card-lift group overflow-hidden rounded-2xl border border-slate-100 bg-[var(--surface)]"
                >
                  <div className="gallery-zoom relative h-40 overflow-hidden">
                    <Image
                      src={a.coverImageUrl}
                      alt={a.coverImageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <time dateTime={a.publishedAt} className="text-[0.7rem] text-slate-400">
                      {formatDate(a.publishedAt)}
                    </time>
                    <h3 className="mt-1.5 font-display text-sm font-bold leading-snug text-slate-900 transition-colors group-hover:text-emerald-700">
                      {a.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ════ BACK TO LIST ════ */}
        <div className="mt-12 text-center">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <svg width="14" height="14" viewBox="0 0 15 15" fill="none"><path d="M6.86 12.44a.75.75 0 0 1-1.06 0l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 1.06L3.06 7.5l3.8 3.88a.75.75 0 0 1 0 1.06Z" fill="currentColor"/></svg>
            Semua Berita
          </Link>
        </div>
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
