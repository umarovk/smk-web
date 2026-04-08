import { groq } from "next-sanity";
import { cache } from "react";

import { sanityClient } from "@/sanity/lib/client";
import { optimizeSanityImageUrl } from "@/sanity/lib/image";

export type SiteSettings = {
  siteName: string;
  logoUrl: string | null;
  siteIconUrl: string | null;
};

export type FooterLink = {
  label: string;
  href: string;
};

export type NavbarLink = {
  label: string;
  href: string;
};

export type NavbarSettings = {
  mainLinks: NavbarLink[];
  jurusanLabel: string;
  secondaryLinks: NavbarLink[];
  ctaLabel: string;
  ctaHref: string;
};

export type FooterSettings = {
  description: string;
  address: string;
  phone: string;
  email: string;
  quickLinks: FooterLink[];
};

export type HomepageMetric = {
  label: string;
  value: string;
};

export type HomepagePillar = {
  title: string;
  description: string;
};

export type HomepageGalleryFrame = {
  imageUrl: string;
  alt: string;
};

export type PartnerItem = {
  name: string;
  category: "media" | "company";
  logoUrl: string;
  website?: string;
};

export type PartnerSettings = {
  heading: string;
  description: string;
  partners: PartnerItem[];
};

export type ProfileConcentration = {
  name: string;
  slug: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  duration?: string;
  competencyFocus?: string[];
  careerProspects?: string[];
  facilities?: string[];
  imageUrl: string | null;
  imageAlt: string;
};

export type ProfileGalleryPhoto = {
  imageUrl: string;
  alt: string;
};

export type ProfileSettings = {
  heroImageUrl: string;
  heroAlt: string;
  profileDescription: string;
  profileImageUrl: string | null;
  profileImageAlt: string;
  history: string;
  historyImageUrl: string | null;
  historyImageAlt: string;
  vision: string;
  missions: string[];
  goals: string[];
  galleryPhotos: ProfileGalleryPhoto[];
  ctaBadge: string;
  ctaTitle: string;
  ctaDescription: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type ArticleCard = {
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl: string;
  coverImageAlt: string;
  category: string;
  author: string;
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type Article = ArticleCard & {
  body: unknown[];
  seoTitle?: string;
  seoDescription?: string;
};

export type HomepageSettings = {
  heroBadge: string;
  heroTitlePrefix: string;
  heroDescription: string;
  heroPrimaryButtonLabel: string;
  heroPrimaryButtonHref: string;
  heroSecondaryButtonLabel: string;
  heroSecondaryButtonHref: string;
  heroFrameImageUrl: string;
  heroFrameAlt: string;
  metrics: HomepageMetric[];
  metricsButtonLabel: string;
  metricsButtonHref: string;
  pillarsHeading: string;
  pillars: HomepagePillar[];
  galleryFrames: HomepageGalleryFrame[];
  ctaTitlePrefix: string;
  ctaDescription: string;
  ctaPrimaryButtonLabel: string;
  ctaPrimaryButtonHref: string;
  ctaSecondaryButtonLabel: string;
  ctaSecondaryButtonHref: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type TahfidzSettings = {
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  heroImageUrl: string | null;
  heroImageAlt: string;
  targetHafalan: string;
  programPoints: string[];
  scheduleItems: string[];
  benefits: string[];
  ctaTitle: string;
  ctaDescription: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type SpmbSettings = {
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  galleryPhotos: HomepageGalleryFrame[];
  galleryHeading: string;
  registrationInfoHeading: string;
  concentrationsHeading: string;
  requirementsHeading: string;
  registrationFlowHeading: string;
  scheduleHeading: string;
  scheduleSecondaryHeading: string;
  registrationInfo: string[];
  requirements: string[];
  registrationFlow: string[];
  scheduleItems: string[];
  scheduleSecondaryItems: string[];
  ctaTitle: string;
  ctaDescription: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type SeoSettings = {
  siteTitle: string;
  defaultDescription: string;
  defaultOgImageUrl: string | null;
  homeTitle?: string;
  homeDescription?: string;
  profileTitle?: string;
  profileDescription?: string;
  newsTitle?: string;
  newsDescription?: string;
  contactTitle?: string;
  contactDescription?: string;
  tahfidzTitle?: string;
  tahfidzDescription?: string;
  spmbTitle?: string;
  spmbDescription?: string;
};

const siteSettingsQuery = groq`
  *[_type == "siteSettings"] | order(_updatedAt desc)[0]{
    siteName,
    "logoUrl": logo.asset->url,
    "siteIconUrl": siteIcon.asset->url
  }
`;

const footerSettingsQuery = groq`
  *[_type == "footerSettings"] | order(_updatedAt desc)[0]{
    description,
    address,
    phone,
    email,
    quickLinks[]{
      label,
      href
    }
  }
`;

const navbarSettingsQuery = groq`
  *[_type == "navbarSettings"] | order(_updatedAt desc)[0]{
    mainLinks[]{
      label,
      href
    },
    jurusanLabel,
    secondaryLinks[]{
      label,
      href
    },
    ctaLabel,
    ctaHref
  }
`;

const seoSettingsQuery = groq`
  *[_type == "seoSettings"] | order(_updatedAt desc)[0]{
    siteTitle,
    defaultDescription,
    "defaultOgImageUrl": defaultOgImage.asset->url,
    homeTitle,
    homeDescription,
    profileTitle,
    profileDescription,
    newsTitle,
    newsDescription,
    contactTitle,
    contactDescription,
    tahfidzTitle,
    tahfidzDescription,
    spmbTitle,
    spmbDescription
  }
`;

const homepageSettingsQuery = groq`
  *[_type == "homepageSettings"] | order(_updatedAt desc)[0]{
    heroBadge,
    heroTitlePrefix,
    heroDescription,
    heroPrimaryButtonLabel,
    heroPrimaryButtonHref,
    heroSecondaryButtonLabel,
    heroSecondaryButtonHref,
    "heroFrameImageUrl": heroFrameImage.asset->url,
    heroFrameAlt,
    metrics[]{
      label,
      value
    },
    metricsButtonLabel,
    metricsButtonHref,
    pillarsHeading,
    pillars[]{
      title,
      description
    },
    galleryFrames[]{
      "imageUrl": image.asset->url,
      alt
    },
    ctaTitlePrefix,
    ctaDescription,
    ctaPrimaryButtonLabel,
    ctaPrimaryButtonHref,
    ctaSecondaryButtonLabel,
    ctaSecondaryButtonHref,
    seoTitle,
    seoDescription
  }
`;

const partnerSettingsQuery = groq`
  *[_type == "partnerSettings"] | order(_updatedAt desc)[0]{
    heading,
    description,
    partners[]{
      name,
      category,
      "logoUrl": logo.asset->url,
      website
    }
  }
`;

const tahfidzSettingsQuery = groq`
  *[_type == "tahfidzSettings"] | order(_updatedAt desc)[0]{
    heroBadge,
    heroTitle,
    heroDescription,
    "heroImageUrl": heroImage.asset->url,
    heroImageAlt,
    targetHafalan,
    programPoints,
    scheduleItems,
    benefits,
    ctaTitle,
    ctaDescription,
    seoTitle,
    seoDescription
  }
`;

const spmbSettingsQuery = groq`
  *[_type == "spmbSettings"] | order(_updatedAt desc)[0]{
    heroBadge,
    heroTitle,
    heroDescription,
    galleryPhotos[]{
      "imageUrl": image.asset->url,
      alt
    },
    galleryHeading,
    registrationInfoHeading,
    concentrationsHeading,
    requirementsHeading,
    registrationFlowHeading,
    scheduleHeading,
    scheduleSecondaryHeading,
    registrationInfo,
    requirements,
    registrationFlow,
    scheduleItems,
    scheduleSecondaryItems,
    ctaTitle,
    ctaDescription,
    seoTitle,
    seoDescription
  }
`;

const profileSettingsQuery = groq`
  *[_type == "profileSettings"] | order(_updatedAt desc)[0]{
    "heroImageUrl": heroImage.asset->url,
    heroAlt,
    profileDescription,
    "profileImageUrl": profileImage.asset->url,
    profileImageAlt,
    history,
    "historyImageUrl": historyImage.asset->url,
    historyImageAlt,
    vision,
    "missions": missions[].text,
    "goals": goals[].text,
    galleryPhotos[]{
      "imageUrl": image.asset->url,
      alt
    },
    ctaBadge,
    ctaTitle,
    ctaDescription,
    seoTitle,
    seoDescription
  }
`;

const fallbackSiteSettings: SiteSettings = {
  siteName: "SMK Web",
  logoUrl: "/logo-smk.svg",
  siteIconUrl: "/logo-smk.svg",
};

const fallbackFooterSettings: FooterSettings = {
  description:
    "Sekolah menengah kejuruan berbasis keterampilan dengan pembelajaran modern, praktik industri, dan pembinaan karakter untuk menyiapkan lulusan siap kerja.",
  address: "Jl. Pendidikan No. 123, Kota Sekolah",
  phone: "(000) 0000-0000",
  email: "info@smkweb.sch.id",
  quickLinks: [
    { label: "Beranda", href: "/" },
    { label: "Profil Sekolah", href: "/profil" },
    { label: "Informasi PPDB", href: "#ppdb" },
  ],
};

const fallbackNavbarSettings: NavbarSettings = {
  mainLinks: [
    { label: "Beranda", href: "/" },
    { label: "Profil", href: "/profil" },
    { label: "Program Tahfidz", href: "/tahfidz" },
  ],
  jurusanLabel: "Jurusan",
  secondaryLinks: [
    { label: "Berita", href: "/berita" },
    { label: "Kontak", href: "/kontak" },
  ],
  ctaLabel: "SPMB",
  ctaHref: "/spmb",
};

const fallbackSeoSettings: SeoSettings = {
  siteTitle: "SMK Web",
  defaultDescription: "Website resmi SMK berbasis Next.js dan Sanity.",
  defaultOgImageUrl: "/hero-sekolah.svg",
  homeTitle: "Beranda",
  homeDescription:
    "Portal resmi SMK berisi profil sekolah, jurusan, berita kegiatan, program tahfidz, dan informasi SPMB.",
  profileTitle: "Profil Sekolah",
  profileDescription:
    "Informasi lengkap profil sekolah, sejarah, visi misi, tujuan, jurusan, dan galeri kegiatan.",
  newsTitle: "Berita & Kegiatan",
  newsDescription:
    "Kumpulan berita terbaru, prestasi siswa, pengumuman, dan artikel kegiatan sekolah.",
  contactTitle: "Kontak Sekolah",
  contactDescription:
    "Hubungi sekolah untuk informasi pendaftaran, program keahlian, dan layanan akademik.",
  tahfidzTitle: "Program Tahfidzul Qur'an",
  tahfidzDescription:
    "Informasi program tahfidzul qur'an: target hafalan, jadwal pembinaan, dan manfaat program.",
  spmbTitle: "SPMB",
  spmbDescription:
    "Informasi SPMB meliputi persyaratan, alur pendaftaran, jadwal, program keahlian, dan kontak panitia.",
};

const fallbackHomepageSettings: HomepageSettings = {
  heroBadge: "Portal Resmi Sekolah",
  heroTitlePrefix: "Pendidikan Modern untuk Masa Depan Cerah di",
  heroDescription:
    "Kami menghadirkan pembelajaran vokasi yang terarah, kolaboratif, dan dekat dengan dunia industri untuk menyiapkan siswa yang siap kerja maupun melanjutkan studi.",
  heroPrimaryButtonLabel: "Lihat Profil Sekolah",
  heroPrimaryButtonHref: "/profil",
  heroSecondaryButtonLabel: "Kelola Konten",
  heroSecondaryButtonHref: "/studio",
  heroFrameImageUrl: "/hero-sekolah.svg",
  heroFrameAlt: "Ilustrasi lingkungan sekolah",
  metrics: [
    { label: "Program Keahlian", value: "TKJ & TSM" },
    { label: "Kemitraan Industri", value: "35+ Mitra Aktif" },
    { label: "Status PPDB", value: "Pendaftaran Dibuka" },
  ],
  metricsButtonLabel: "Daftar Sekarang",
  metricsButtonHref: "/spmb",
  pillarsHeading: "Lingkungan Belajar yang Profesional",
  pillars: [
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
  ],
  galleryFrames: [
    { imageUrl: "/foto-sekolah-1.svg", alt: "Kegiatan pembelajaran siswa" },
    { imageUrl: "/foto-sekolah-2.svg", alt: "Kegiatan praktik kejuruan siswa" },
  ],
  ctaTitlePrefix: "Bergabung Bersama",
  ctaDescription:
    "Mulai perjalanan belajar dengan sistem yang adaptif, dukungan guru berpengalaman, dan program praktik yang selaras dengan kebutuhan industri.",
  ctaPrimaryButtonLabel: "Info SPMB",
  ctaPrimaryButtonHref: "/spmb",
  ctaSecondaryButtonLabel: "Kelola Konten Sekolah",
  ctaSecondaryButtonHref: "/studio",
  seoTitle: "Beranda",
  seoDescription:
    "Portal resmi SMK berisi profil sekolah, jurusan, berita kegiatan, program tahfidz, dan informasi SPMB.",
};

const fallbackPartnerSettings: PartnerSettings = {
  heading: "Media Partner & Industri MoU",
  description:
    "Sekolah kami berkolaborasi dengan media partner dan perusahaan industri untuk memperkuat pembelajaran berbasis dunia kerja.",
  partners: [
    { name: "Media Edukasi Nusantara", category: "media", logoUrl: "/logo-smk.svg" },
    { name: "Tekno Industri Digital", category: "company", logoUrl: "/logo-smk.svg" },
    { name: "Portal Sekolah Kreatif", category: "media", logoUrl: "/logo-smk.svg" },
    { name: "Mitra Mekatronik Nasional", category: "company", logoUrl: "/logo-smk.svg" },
  ],
};

const fallbackTahfidzSettings: TahfidzSettings = {
  heroBadge: "Program Unggulan Keislaman",
  heroTitle: "Program Tahfidzul Qur'an",
  heroDescription:
    "Program pembinaan hafalan Al-Qur'an untuk membentuk siswa berakhlak mulia, disiplin, dan mencintai Al-Qur'an melalui bimbingan musyrif yang terarah.",
  heroImageUrl: "/hero-sekolah.svg",
  heroImageAlt: "Kegiatan tahfidz siswa",
  targetHafalan: "3-5 Juz selama masa studi",
  programPoints: [
    "Tahsin dan tahfidz harian dengan metode talaqqi",
    "Setoran hafalan terjadwal per pekan",
    "Murojaah berkelanjutan untuk menjaga kualitas hafalan",
    "Pembinaan adab penuntut ilmu dan akhlak Qur'ani",
  ],
  scheduleItems: [
    "Senin-Kamis: Setoran hafalan setelah kegiatan belajar",
    "Jumat: Murojaah bersama dan evaluasi pekanan",
    "Sabtu: Kelas penguatan tajwid dan makhraj",
  ],
  benefits: [
    "Meningkatkan kedisiplinan dan fokus belajar",
    "Membentuk karakter religius dan tanggung jawab",
    "Menambah bekal spiritual dan kepercayaan diri siswa",
    "Mendapat pendampingan hafalan secara berkala",
  ],
  ctaTitle: "Ingin Bergabung Program Tahfidz?",
  ctaDescription:
    "Silakan hubungi sekolah untuk informasi pendaftaran dan mekanisme pembinaan Program Tahfidzul Qur'an.",
  seoTitle: "Program Tahfidzul Qur'an",
  seoDescription:
    "Informasi program tahfidzul qur'an: target hafalan, jadwal pembinaan, dan manfaat program.",
};

const fallbackSpmbSettings: SpmbSettings = {
  heroBadge: "Penerimaan Murid Baru",
  heroTitle: "Informasi SPMB",
  heroDescription:
    "Selamat datang di halaman resmi SPMB. Temukan informasi lengkap seputar pendaftaran, persyaratan, alur, jadwal, dan kontak panitia.",
  galleryPhotos: [
    { imageUrl: "/foto-sekolah-1.svg", alt: "Layanan informasi pendaftaran" },
    { imageUrl: "/foto-sekolah-2.svg", alt: "Sosialisasi program keahlian" },
    { imageUrl: "/hero-sekolah.svg", alt: "Kunjungan calon murid ke sekolah" },
  ],
  galleryHeading: "Suasana SPMB",
  registrationInfoHeading: "Informasi Pendaftaran",
  concentrationsHeading: "Program Keahlian Tersedia",
  requirementsHeading: "Persyaratan",
  registrationFlowHeading: "Alur Pendaftaran",
  scheduleHeading: "Jadwal SPMB",
  scheduleSecondaryHeading: "Jadwal Tahap Lanjutan",
  registrationInfo: [
    "SPMB dibuka untuk lulusan SMP/MTs atau sederajat.",
    "Pendaftaran dapat dilakukan secara online maupun datang langsung ke sekolah.",
    "Calon murid dapat memilih program keahlian sesuai minat dan bakat.",
  ],
  requirements: [
    "Fotokopi ijazah/SKL SMP/MTs (jika sudah tersedia).",
    "Fotokopi Kartu Keluarga.",
    "Fotokopi Akta Kelahiran.",
    "Pas foto terbaru ukuran 3x4 (2 lembar).",
    "Mengisi formulir pendaftaran SPMB.",
  ],
  registrationFlow: [
    "Mengisi formulir pendaftaran.",
    "Melengkapi dan mengumpulkan berkas persyaratan.",
    "Verifikasi berkas oleh panitia SPMB.",
    "Mengikuti tes/wawancara sesuai ketentuan sekolah.",
    "Pengumuman hasil seleksi.",
    "Daftar ulang bagi calon murid yang dinyatakan diterima.",
  ],
  scheduleItems: [
    "Gelombang 1: Januari - Maret",
    "Gelombang 2: April - Juni",
    "Seleksi dan wawancara: mengikuti jadwal dari panitia",
    "Pengumuman hasil: maksimal 7 hari setelah seleksi",
    "Daftar ulang: sesuai batas waktu yang ditetapkan",
  ],
  scheduleSecondaryItems: [
    "MPLS: 1 minggu sebelum KBM dimulai",
    "Pembagian kelas: setelah registrasi ulang",
    "Tes pemetaan awal: pekan pertama tahun ajaran",
  ],
  ctaTitle: "Butuh Bantuan Pendaftaran?",
  ctaDescription:
    "Tim panitia SPMB siap membantu Anda terkait alur pendaftaran, berkas, dan jadwal seleksi.",
  seoTitle: "SPMB",
  seoDescription:
    "Informasi SPMB meliputi persyaratan, alur pendaftaran, jadwal, program keahlian, dan kontak panitia.",
};

const fallbackProfileSettings: ProfileSettings = {
  heroImageUrl: "/hero-sekolah.svg",
  heroAlt: "Gedung sekolah tampak depan",
  profileDescription:
    "SMK Web adalah sekolah menengah kejuruan yang berdedikasi pada pengembangan sumber daya manusia berkualitas melalui pendidikan vokasi berbasis industri. Dengan fasilitas modern dan tenaga pendidik profesional, kami menyiapkan lulusan yang siap menghadapi tantangan dunia kerja global. Sekolah kami mengedepankan keseimbangan antara penguasaan keterampilan teknis, karakter, dan kemampuan beradaptasi di era digital.",
  profileImageUrl: "/foto-sekolah-1.svg",
  profileImageAlt: "Suasana belajar di sekolah",
  history:
    "Didirikan pada tahun 2010, SMK Web bermula dari sebuah lembaga pelatihan keterampilan kecil yang berlokasi di pinggiran kota. Dengan semangat untuk meningkatkan kualitas pendidikan vokasi, para pendiri mendirikan sekolah ini dengan hanya dua program keahlian dan kurang dari 100 siswa. Seiring berjalannya waktu, dedikasi terhadap mutu pembelajaran dan kemitraan aktif dengan dunia industri membawa sekolah ini berkembang pesat. Kini, SMK Web telah menjadi salah satu SMK unggulan dengan ratusan siswa, fasilitas lengkap, serta jaringan alumni yang tersebar di berbagai perusahaan terkemuka.",
  historyImageUrl: "/foto-sekolah-2.svg",
  historyImageAlt: "Dokumentasi sejarah sekolah",
  vision:
    "Menjadi lembaga pendidikan vokasi unggulan yang menghasilkan lulusan berkarakter, terampil, dan berdaya saing global di era industri modern.",
  missions: [
    "Menyelenggarakan pembelajaran berbasis kompetensi yang relevan dengan kebutuhan dunia industri.",
    "Membangun karakter siswa yang disiplin, jujur, dan bertanggung jawab melalui pembiasaan positif.",
    "Menjalin kerja sama strategis dengan dunia usaha dan dunia industri untuk program magang dan sertifikasi.",
    "Mengembangkan fasilitas dan teknologi pembelajaran yang adaptif terhadap perkembangan zaman.",
    "Menciptakan lingkungan sekolah yang inklusif, aman, dan kondusif untuk belajar.",
  ],
  goals: [
    "Meningkatkan kompetensi lulusan agar terserap minimal 85% di dunia kerja atau melanjutkan pendidikan tinggi.",
    "Memperoleh akreditasi unggul dan pengakuan dari lembaga sertifikasi nasional maupun internasional.",
    "Memperluas jaringan kemitraan industri hingga 50+ perusahaan mitra aktif.",
    "Menghasilkan lulusan yang mampu berwirausaha dan menciptakan lapangan kerja baru.",
  ],
  galleryPhotos: [
    { imageUrl: "/foto-sekolah-1.svg", alt: "Kegiatan belajar mengajar di kelas" },
    { imageUrl: "/foto-sekolah-2.svg", alt: "Praktik di laboratorium komputer" },
    { imageUrl: "/hero-sekolah.svg", alt: "Upacara bendera pagi hari" },
    { imageUrl: "/foto-sekolah-1.svg", alt: "Kegiatan ekstrakurikuler" },
  ],
  ctaBadge: "Tertarik Bergabung?",
  ctaTitle: "Daftarkan Diri Anda Sekarang",
  ctaDescription:
    "Bergabunglah bersama kami dan raih masa depan terbaik melalui pendidikan vokasi berkualitas.",
  seoTitle: "Profil Sekolah",
  seoDescription:
    "Informasi lengkap profil sekolah, sejarah, visi misi, tujuan, jurusan, dan galeri kegiatan.",
};

export const getSiteSettings = cache(async function getSiteSettings(): Promise<SiteSettings> {
  if (!sanityClient) {
    return fallbackSiteSettings;
  }

  try {
    const siteSettingsPromise = sanityClient.fetch<Partial<SiteSettings> | null>(
      siteSettingsQuery,
      {},
      { next: { revalidate: 300 } },
    );
    const timeoutPromise = new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), 1200);
    });
    const data = await Promise.race([siteSettingsPromise, timeoutPromise]);

    return {
      siteName: data?.siteName || fallbackSiteSettings.siteName,
      logoUrl:
        optimizeSanityImageUrl(data?.logoUrl, { width: 256, quality: 80 }) ||
        fallbackSiteSettings.logoUrl,
      siteIconUrl:
        optimizeSanityImageUrl(data?.siteIconUrl, { width: 512, quality: 90 }) ||
        fallbackSiteSettings.siteIconUrl,
    };
  } catch {
    return fallbackSiteSettings;
  }
});

export const getFooterSettings = cache(async function getFooterSettings(): Promise<FooterSettings> {
  if (!sanityClient) {
    return fallbackFooterSettings;
  }

  try {
    const data = await sanityClient.fetch<Partial<FooterSettings> | null>(
      footerSettingsQuery,
      {},
      { next: { revalidate: 60 } },
    );

    return {
      description: data?.description || fallbackFooterSettings.description,
      address: data?.address || fallbackFooterSettings.address,
      phone: data?.phone || fallbackFooterSettings.phone,
      email: data?.email || fallbackFooterSettings.email,
      quickLinks:
        data?.quickLinks?.filter((item) => item?.label && item?.href) ||
        fallbackFooterSettings.quickLinks,
    };
  } catch {
    return fallbackFooterSettings;
  }
});

export const getNavbarSettings = cache(async function getNavbarSettings(): Promise<NavbarSettings> {
  if (!sanityClient) {
    return fallbackNavbarSettings;
  }

  try {
    const data = await sanityClient.fetch<Partial<NavbarSettings> | null>(
      navbarSettingsQuery,
      {},
      { next: { revalidate: 60 } },
    );

    return {
      mainLinks:
        data?.mainLinks?.filter((item) => item?.label && item?.href) ||
        fallbackNavbarSettings.mainLinks,
      jurusanLabel: data?.jurusanLabel || fallbackNavbarSettings.jurusanLabel,
      secondaryLinks:
        data?.secondaryLinks?.filter((item) => item?.label && item?.href) ||
        fallbackNavbarSettings.secondaryLinks,
      ctaLabel: data?.ctaLabel || fallbackNavbarSettings.ctaLabel,
      ctaHref: data?.ctaHref || fallbackNavbarSettings.ctaHref,
    };
  } catch {
    return fallbackNavbarSettings;
  }
});

export const getSeoSettings = cache(async function getSeoSettings(): Promise<SeoSettings> {
  if (!sanityClient) {
    return fallbackSeoSettings;
  }

  try {
    const data = await sanityClient.fetch<Partial<SeoSettings> | null>(
      seoSettingsQuery,
      {},
      { next: { revalidate: 60 } },
    );

    return {
      siteTitle: data?.siteTitle || fallbackSeoSettings.siteTitle,
      defaultDescription: data?.defaultDescription || fallbackSeoSettings.defaultDescription,
      defaultOgImageUrl:
        optimizeSanityImageUrl(data?.defaultOgImageUrl, { width: 1200, quality: 80 }) ||
        fallbackSeoSettings.defaultOgImageUrl,
      homeTitle: data?.homeTitle || fallbackSeoSettings.homeTitle,
      homeDescription: data?.homeDescription || fallbackSeoSettings.homeDescription,
      profileTitle: data?.profileTitle || fallbackSeoSettings.profileTitle,
      profileDescription: data?.profileDescription || fallbackSeoSettings.profileDescription,
      newsTitle: data?.newsTitle || fallbackSeoSettings.newsTitle,
      newsDescription: data?.newsDescription || fallbackSeoSettings.newsDescription,
      contactTitle: data?.contactTitle || fallbackSeoSettings.contactTitle,
      contactDescription: data?.contactDescription || fallbackSeoSettings.contactDescription,
      tahfidzTitle: data?.tahfidzTitle || fallbackSeoSettings.tahfidzTitle,
      tahfidzDescription: data?.tahfidzDescription || fallbackSeoSettings.tahfidzDescription,
      spmbTitle: data?.spmbTitle || fallbackSeoSettings.spmbTitle,
      spmbDescription: data?.spmbDescription || fallbackSeoSettings.spmbDescription,
    };
  } catch {
    return fallbackSeoSettings;
  }
});

export const getHomepageSettings = cache(
  async function getHomepageSettings(): Promise<HomepageSettings> {
    if (!sanityClient) {
      return fallbackHomepageSettings;
    }

    try {
      const data = await sanityClient.fetch<Partial<HomepageSettings> | null>(
        homepageSettingsQuery,
        {},
        { next: { revalidate: 60 } },
      );

      return {
        heroBadge: data?.heroBadge || fallbackHomepageSettings.heroBadge,
        heroTitlePrefix: data?.heroTitlePrefix || fallbackHomepageSettings.heroTitlePrefix,
        heroDescription: data?.heroDescription || fallbackHomepageSettings.heroDescription,
        heroPrimaryButtonLabel:
          data?.heroPrimaryButtonLabel || fallbackHomepageSettings.heroPrimaryButtonLabel,
        heroPrimaryButtonHref:
          data?.heroPrimaryButtonHref || fallbackHomepageSettings.heroPrimaryButtonHref,
        heroSecondaryButtonLabel:
          data?.heroSecondaryButtonLabel || fallbackHomepageSettings.heroSecondaryButtonLabel,
        heroSecondaryButtonHref:
          data?.heroSecondaryButtonHref || fallbackHomepageSettings.heroSecondaryButtonHref,
        heroFrameImageUrl:
          optimizeSanityImageUrl(data?.heroFrameImageUrl, { width: 1600, quality: 75 }) ||
          fallbackHomepageSettings.heroFrameImageUrl,
        heroFrameAlt: data?.heroFrameAlt || fallbackHomepageSettings.heroFrameAlt,
        metrics:
          data?.metrics?.filter((item) => item?.label && item?.value) ||
          fallbackHomepageSettings.metrics,
        metricsButtonLabel:
          data?.metricsButtonLabel || fallbackHomepageSettings.metricsButtonLabel,
        metricsButtonHref: data?.metricsButtonHref || fallbackHomepageSettings.metricsButtonHref,
        pillarsHeading: data?.pillarsHeading || fallbackHomepageSettings.pillarsHeading,
        pillars:
          data?.pillars?.filter((item) => item?.title && item?.description) ||
          fallbackHomepageSettings.pillars,
        galleryFrames:
          data?.galleryFrames
            ?.filter((item) => item?.imageUrl && item?.alt)
            ?.map((item) => ({
              ...item,
              imageUrl:
                optimizeSanityImageUrl(item.imageUrl, { width: 1200, quality: 75 }) ||
                item.imageUrl,
            })) || fallbackHomepageSettings.galleryFrames,
        ctaTitlePrefix: data?.ctaTitlePrefix || fallbackHomepageSettings.ctaTitlePrefix,
        ctaDescription: data?.ctaDescription || fallbackHomepageSettings.ctaDescription,
        ctaPrimaryButtonLabel:
          data?.ctaPrimaryButtonLabel || fallbackHomepageSettings.ctaPrimaryButtonLabel,
        ctaPrimaryButtonHref:
          data?.ctaPrimaryButtonHref || fallbackHomepageSettings.ctaPrimaryButtonHref,
        ctaSecondaryButtonLabel:
          data?.ctaSecondaryButtonLabel || fallbackHomepageSettings.ctaSecondaryButtonLabel,
        ctaSecondaryButtonHref:
          data?.ctaSecondaryButtonHref || fallbackHomepageSettings.ctaSecondaryButtonHref,
        seoTitle: data?.seoTitle || fallbackHomepageSettings.seoTitle,
        seoDescription: data?.seoDescription || fallbackHomepageSettings.seoDescription,
      };
    } catch {
      return fallbackHomepageSettings;
    }
  },
);

export const getPartnerSettings = cache(
  async function getPartnerSettings(): Promise<PartnerSettings> {
    if (!sanityClient) {
      return fallbackPartnerSettings;
    }

    try {
      const data = await sanityClient.fetch<Partial<PartnerSettings> | null>(
        partnerSettingsQuery,
        {},
        { next: { revalidate: 60 } },
      );

      return {
        heading: data?.heading || fallbackPartnerSettings.heading,
        description: data?.description || fallbackPartnerSettings.description,
        partners:
          data?.partners
            ?.filter((item) => item?.name && item?.logoUrl && item?.category)
            ?.map((item) => ({
              ...item,
              logoUrl:
                optimizeSanityImageUrl(item.logoUrl, { width: 256, quality: 80 }) ||
                item.logoUrl,
            })) || fallbackPartnerSettings.partners,
      };
    } catch {
      return fallbackPartnerSettings;
    }
  },
);

export const getTahfidzSettings = cache(
  async function getTahfidzSettings(): Promise<TahfidzSettings> {
    if (!sanityClient) {
      return fallbackTahfidzSettings;
    }

    try {
      const data = await sanityClient.fetch<Partial<TahfidzSettings> | null>(
        tahfidzSettingsQuery,
        {},
        { next: { revalidate: 60 } },
      );

      return {
        heroBadge: data?.heroBadge || fallbackTahfidzSettings.heroBadge,
        heroTitle: data?.heroTitle || fallbackTahfidzSettings.heroTitle,
        heroDescription: data?.heroDescription || fallbackTahfidzSettings.heroDescription,
        heroImageUrl:
          optimizeSanityImageUrl(data?.heroImageUrl, { width: 1400, quality: 75 }) ??
          fallbackTahfidzSettings.heroImageUrl,
        heroImageAlt: data?.heroImageAlt || fallbackTahfidzSettings.heroImageAlt,
        targetHafalan: data?.targetHafalan || fallbackTahfidzSettings.targetHafalan,
        programPoints:
          data?.programPoints?.filter((item) => typeof item === "string" && item.length > 0) ||
          fallbackTahfidzSettings.programPoints,
        scheduleItems:
          data?.scheduleItems?.filter((item) => typeof item === "string" && item.length > 0) ||
          fallbackTahfidzSettings.scheduleItems,
        benefits:
          data?.benefits?.filter((item) => typeof item === "string" && item.length > 0) ||
          fallbackTahfidzSettings.benefits,
        ctaTitle: data?.ctaTitle || fallbackTahfidzSettings.ctaTitle,
        ctaDescription: data?.ctaDescription || fallbackTahfidzSettings.ctaDescription,
        seoTitle: data?.seoTitle || fallbackTahfidzSettings.seoTitle,
        seoDescription: data?.seoDescription || fallbackTahfidzSettings.seoDescription,
      };
    } catch {
      return fallbackTahfidzSettings;
    }
  },
);

export const getSpmbSettings = cache(
  async function getSpmbSettings(): Promise<SpmbSettings> {
    if (!sanityClient) {
      return fallbackSpmbSettings;
    }

    try {
      const data = await sanityClient.fetch<Partial<SpmbSettings> | null>(
        spmbSettingsQuery,
        {},
        { next: { revalidate: 60 } },
      );

      return {
        heroBadge: data?.heroBadge || fallbackSpmbSettings.heroBadge,
        heroTitle: data?.heroTitle || fallbackSpmbSettings.heroTitle,
        heroDescription: data?.heroDescription || fallbackSpmbSettings.heroDescription,
        galleryPhotos:
          data?.galleryPhotos
            ?.filter((item) => item?.imageUrl && item?.alt)
            ?.map((item) => ({
              ...item,
              imageUrl:
                optimizeSanityImageUrl(item.imageUrl, { width: 1200, quality: 75 }) ||
                item.imageUrl,
            })) || fallbackSpmbSettings.galleryPhotos,
        galleryHeading: data?.galleryHeading || fallbackSpmbSettings.galleryHeading,
        registrationInfoHeading:
          data?.registrationInfoHeading || fallbackSpmbSettings.registrationInfoHeading,
        concentrationsHeading:
          data?.concentrationsHeading || fallbackSpmbSettings.concentrationsHeading,
        requirementsHeading: data?.requirementsHeading || fallbackSpmbSettings.requirementsHeading,
        registrationFlowHeading:
          data?.registrationFlowHeading || fallbackSpmbSettings.registrationFlowHeading,
        scheduleHeading: data?.scheduleHeading || fallbackSpmbSettings.scheduleHeading,
        scheduleSecondaryHeading:
          data?.scheduleSecondaryHeading || fallbackSpmbSettings.scheduleSecondaryHeading,
        registrationInfo:
          data?.registrationInfo?.filter((item) => typeof item === "string" && item.length > 0) ||
          fallbackSpmbSettings.registrationInfo,
        requirements:
          data?.requirements?.filter((item) => typeof item === "string" && item.length > 0) ||
          fallbackSpmbSettings.requirements,
        registrationFlow:
          data?.registrationFlow?.filter((item) => typeof item === "string" && item.length > 0) ||
          fallbackSpmbSettings.registrationFlow,
        scheduleItems:
          data?.scheduleItems?.filter((item) => typeof item === "string" && item.length > 0) ||
          fallbackSpmbSettings.scheduleItems,
        scheduleSecondaryItems:
          data?.scheduleSecondaryItems?.filter(
            (item) => typeof item === "string" && item.length > 0,
          ) || fallbackSpmbSettings.scheduleSecondaryItems,
        ctaTitle: data?.ctaTitle || fallbackSpmbSettings.ctaTitle,
        ctaDescription: data?.ctaDescription || fallbackSpmbSettings.ctaDescription,
        seoTitle: data?.seoTitle || fallbackSpmbSettings.seoTitle,
        seoDescription: data?.seoDescription || fallbackSpmbSettings.seoDescription,
      };
    } catch {
      return fallbackSpmbSettings;
    }
  },
);

export const getProfileSettings = cache(
  async function getProfileSettings(): Promise<ProfileSettings> {
    if (!sanityClient) {
      return fallbackProfileSettings;
    }

    try {
      const data = await sanityClient.fetch<Partial<ProfileSettings> | null>(
        profileSettingsQuery,
        {},
        { next: { revalidate: 60 } },
      );

      return {
        heroImageUrl:
          optimizeSanityImageUrl(data?.heroImageUrl, { width: 1600, quality: 75 }) ||
          fallbackProfileSettings.heroImageUrl,
        heroAlt: data?.heroAlt || fallbackProfileSettings.heroAlt,
        profileDescription: data?.profileDescription || fallbackProfileSettings.profileDescription,
        profileImageUrl:
          optimizeSanityImageUrl(data?.profileImageUrl, { width: 1200, quality: 75 }) ??
          fallbackProfileSettings.profileImageUrl,
        profileImageAlt: data?.profileImageAlt || fallbackProfileSettings.profileImageAlt,
        history: data?.history || fallbackProfileSettings.history,
        historyImageUrl:
          optimizeSanityImageUrl(data?.historyImageUrl, { width: 1200, quality: 75 }) ??
          fallbackProfileSettings.historyImageUrl,
        historyImageAlt: data?.historyImageAlt || fallbackProfileSettings.historyImageAlt,
        vision: data?.vision || fallbackProfileSettings.vision,
        missions:
          data?.missions?.filter((m) => typeof m === "string" && m.length > 0) ||
          fallbackProfileSettings.missions,
        goals:
          data?.goals?.filter((g) => typeof g === "string" && g.length > 0) ||
          fallbackProfileSettings.goals,
        galleryPhotos:
          data?.galleryPhotos
            ?.filter((p) => p?.imageUrl && p?.alt)
            ?.map((p) => ({
              ...p,
              imageUrl:
                optimizeSanityImageUrl(p.imageUrl, { width: 1200, quality: 75 }) || p.imageUrl,
            })) || fallbackProfileSettings.galleryPhotos,
        ctaBadge: data?.ctaBadge || fallbackProfileSettings.ctaBadge,
        ctaTitle: data?.ctaTitle || fallbackProfileSettings.ctaTitle,
        ctaDescription: data?.ctaDescription || fallbackProfileSettings.ctaDescription,
        seoTitle: data?.seoTitle || fallbackProfileSettings.seoTitle,
        seoDescription: data?.seoDescription || fallbackProfileSettings.seoDescription,
      };
    } catch {
      return fallbackProfileSettings;
    }
  },
);

export type NavConcentration = {
  name: string;
  slug: string;
};

const concentrationsListQuery = groq`
  *[_type == "concentration"] | order(name asc){
    name,
    "slug": slug.current,
    description,
    seoTitle,
    seoDescription,
    duration,
    competencyFocus,
    careerProspects,
    facilities,
    "imageUrl": image.asset->url,
    imageAlt
  }
`;

const navConcentrationsQuery = groq`
  *[_type == "concentration"] | order(name asc){
    name,
    "slug": slug.current
  }
`;

const fallbackConcentrations: ProfileConcentration[] = [
  {
    name: "Teknik Komputer & Jaringan (TKJ)",
    slug: "tkj",
    description:
      "Program keahlian yang mempelajari perakitan komputer, instalasi jaringan, administrasi server, dan keamanan siber. Siswa dibekali sertifikasi industri dan pengalaman magang di perusahaan IT.",
    seoTitle: "Jurusan TKJ",
    seoDescription:
      "Detail jurusan TKJ: fokus kompetensi, prospek karier, fasilitas, dan profil program.",
    duration: "3 Tahun",
    competencyFocus: [
      "Instalasi dan konfigurasi jaringan",
      "Administrasi server Linux dan Windows",
      "Keamanan jaringan dasar",
      "Troubleshooting perangkat komputer",
    ],
    careerProspects: [
      "Network Administrator",
      "IT Support Technician",
      "Junior System Administrator",
      "Technopreneur bidang jasa IT",
    ],
    facilities: [
      "Laboratorium komputer",
      "Perangkat jaringan praktik",
      "Ruang simulasi server",
    ],
    imageUrl: "/foto-sekolah-1.svg",
    imageAlt: "Praktik laboratorium TKJ",
  },
  {
    name: "Teknik Sepeda Motor (TSM)",
    slug: "tsm",
    description:
      "Program keahlian yang fokus pada perawatan, perbaikan, dan overhaul mesin sepeda motor. Dilengkapi bengkel standar industri dan kerja sama dengan pabrikan otomotif terkemuka.",
    seoTitle: "Jurusan TSM",
    seoDescription:
      "Detail jurusan TSM: fokus kompetensi, prospek karier, fasilitas, dan profil program.",
    duration: "3 Tahun",
    competencyFocus: [
      "Perawatan berkala sepeda motor",
      "Analisis kerusakan sistem mesin",
      "Perbaikan sistem kelistrikan",
      "Overhaul engine",
    ],
    careerProspects: [
      "Teknisi bengkel resmi",
      "Service advisor junior",
      "Teknisi tim balap/pit",
      "Wirausaha bengkel mandiri",
    ],
    facilities: [
      "Bengkel praktik standar industri",
      "Peralatan tuning dan service",
      "Unit sepeda motor praktik",
    ],
    imageUrl: "/foto-sekolah-2.svg",
    imageAlt: "Praktik bengkel TSM",
  },
];

const fallbackNavConcentrations: NavConcentration[] = fallbackConcentrations.map((c) => ({
  name: c.name,
  slug: c.slug,
}));

export const getConcentrations = cache(
  async function getConcentrations(): Promise<ProfileConcentration[]> {
    if (!sanityClient) {
      return fallbackConcentrations;
    }

    try {
      const data = await sanityClient.fetch<ProfileConcentration[] | null>(
        concentrationsListQuery,
        {},
        { next: { revalidate: 60 } },
      );

      const filtered = data
        ?.filter((c) => c?.name && c?.slug && c?.description)
        ?.map((c) => ({
          ...c,
          imageUrl:
            optimizeSanityImageUrl(c.imageUrl, { width: 1200, quality: 75 }) || c.imageUrl,
        }));
      return filtered && filtered.length > 0 ? filtered : fallbackConcentrations;
    } catch {
      return fallbackConcentrations;
    }
  },
);

export const getNavConcentrations = cache(
  async function getNavConcentrations(): Promise<NavConcentration[]> {
    if (!sanityClient) {
      return fallbackNavConcentrations;
    }

    try {
      const data = await sanityClient.fetch<NavConcentration[] | null>(
        navConcentrationsQuery,
        {},
        { next: { revalidate: 300 } },
      );

      const filtered = data?.filter((c) => c?.name && c?.slug);
      return filtered && filtered.length > 0 ? filtered : fallbackNavConcentrations;
    } catch {
      return fallbackNavConcentrations;
    }
  },
);

const concentrationBySlugQuery = groq`
  *[_type == "concentration" && slug.current == $slug][0]{
    name,
    "slug": slug.current,
    description,
    seoTitle,
    seoDescription,
    duration,
    competencyFocus,
    careerProspects,
    facilities,
    "imageUrl": image.asset->url,
    imageAlt
  }
`;

export const getConcentrationBySlug = cache(
  async function getConcentrationBySlug(slug: string): Promise<ProfileConcentration | null> {
    if (!sanityClient) {
      return fallbackConcentrations.find((c) => c.slug === slug) ?? null;
    }

    try {
      const data = await sanityClient.fetch<ProfileConcentration | null>(
        concentrationBySlugQuery,
        { slug },
        { next: { revalidate: 60 } },
      );

      if (data?.name && data?.slug) {
        return {
          ...data,
          imageUrl:
            optimizeSanityImageUrl(data.imageUrl, { width: 1400, quality: 75 }) || data.imageUrl,
        };
      }
      return fallbackConcentrations.find((c) => c.slug === slug) ?? null;
    } catch {
      return fallbackConcentrations.find((c) => c.slug === slug) ?? null;
    }
  },
);

// ═══ ARTICLES ═══

const articlesListQuery = groq`
  *[_type == "article"] | order(publishedAt desc){
    "slug": slug.current,
    title,
    excerpt,
    seoTitle,
    seoDescription,
    "coverImageUrl": coverImage.asset->url,
    coverImageAlt,
    category,
    author,
    publishedAt
  }
`;

const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0]{
    "slug": slug.current,
    title,
    excerpt,
    seoTitle,
    seoDescription,
    "coverImageUrl": coverImage.asset->url,
    coverImageAlt,
    category,
    author,
    publishedAt,
    body[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url
      }
    }
  }
`;

const fallbackArticles: ArticleCard[] = [
  {
    slug: "kunjungan-industri-2026",
    title: "Kunjungan Industri ke PT Teknologi Nusantara",
    excerpt:
      "Siswa kelas XI mengikuti kunjungan industri ke PT Teknologi Nusantara untuk mengenal langsung lingkungan kerja dan proses produksi di dunia industri teknologi.",
    coverImageUrl: "/foto-sekolah-1.svg",
    coverImageAlt: "Kunjungan industri siswa",
    category: "kegiatan",
    author: "Admin",
    publishedAt: "2026-02-15T08:00:00Z",
    seoTitle: "Kunjungan Industri 2026",
    seoDescription:
      "Berita kegiatan kunjungan industri siswa ke PT Teknologi Nusantara.",
  },
  {
    slug: "juara-lomba-kompetensi-siswa",
    title: "Siswa TKJ Raih Juara 1 Lomba Kompetensi Tingkat Provinsi",
    excerpt:
      "Muhammad Fauzan, siswa kelas XII TKJ, berhasil meraih juara pertama dalam Lomba Kompetensi Siswa bidang IT Network Systems Administration tingkat provinsi.",
    coverImageUrl: "/foto-sekolah-2.svg",
    coverImageAlt: "Penyerahan piala juara",
    category: "prestasi",
    author: "Admin",
    publishedAt: "2026-01-20T10:00:00Z",
    seoTitle: "Prestasi LKS TKJ Tingkat Provinsi",
    seoDescription:
      "Berita prestasi siswa TKJ meraih juara 1 lomba kompetensi tingkat provinsi.",
  },
  {
    slug: "pendaftaran-ppdb-2026",
    title: "Pendaftaran Peserta Didik Baru Tahun Ajaran 2026/2027 Dibuka",
    excerpt:
      "Pendaftaran PPDB untuk tahun ajaran 2026/2027 resmi dibuka. Calon peserta didik dapat mendaftar secara online maupun offline mulai tanggal 1 Maret 2026.",
    coverImageUrl: "/hero-sekolah.svg",
    coverImageAlt: "Informasi PPDB",
    category: "pengumuman",
    author: "Admin",
    publishedAt: "2026-01-05T07:00:00Z",
    seoTitle: "Pengumuman Pendaftaran SPMB 2026/2027",
    seoDescription:
      "Informasi resmi pembukaan pendaftaran SPMB tahun ajaran 2026/2027.",
  },
];

const fallbackArticleDetail: Article = {
  ...fallbackArticles[0],
  body: [
    {
      _type: "block",
      _key: "fallback-1",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "fallback-span-1",
          text: "Pada hari Sabtu, 15 Februari 2026, sebanyak 60 siswa kelas XI dari program TKJ dan TSM melaksanakan kunjungan industri ke PT Teknologi Nusantara yang berlokasi di kawasan industri Cikarang. Kegiatan ini merupakan bagian dari program pembelajaran berbasis industri yang rutin dilaksanakan setiap tahun ajaran.",
          marks: [],
        },
      ],
      markDefs: [],
    },
    {
      _type: "block",
      _key: "fallback-2",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "fallback-span-2",
          text: "Selama kunjungan, para siswa mendapatkan kesempatan untuk melihat langsung proses produksi, berdiskusi dengan para engineer, serta memahami standar kerja yang diterapkan di dunia industri. Kegiatan ini diharapkan dapat memberikan motivasi dan gambaran nyata tentang dunia kerja yang akan mereka hadapi setelah lulus.",
          marks: [],
        },
      ],
      markDefs: [],
    },
  ],
};

function optimizeArticleBodyImages(body: unknown[] = []) {
  return body.map((block) => {
    if (block && typeof block === "object" && (block as { _type?: string })._type === "image") {
      const imageBlock = block as { url?: string };
      return {
        ...block,
        url: optimizeSanityImageUrl(imageBlock.url, { width: 1400, quality: 75 }),
      };
    }
    return block;
  });
}

export const getArticles = cache(
  async function getArticles(): Promise<ArticleCard[]> {
    if (!sanityClient) {
      return fallbackArticles;
    }

    try {
      const data = await sanityClient.fetch<ArticleCard[] | null>(
        articlesListQuery,
        {},
        { next: { revalidate: 60 } },
      );

      const filtered = data
        ?.filter((a) => a?.slug && a?.title && a?.coverImageUrl)
        ?.map((a) => ({
          ...a,
          coverImageUrl:
            optimizeSanityImageUrl(a.coverImageUrl, { width: 1200, quality: 75 }) ||
            a.coverImageUrl,
        }));
      return filtered && filtered.length > 0 ? filtered : fallbackArticles;
    } catch {
      return fallbackArticles;
    }
  },
);

export const getArticleBySlug = cache(
  async function getArticleBySlug(slug: string): Promise<Article | null> {
    if (!sanityClient) {
      return fallbackArticles.find((a) => a.slug === slug)
        ? { ...fallbackArticleDetail, ...fallbackArticles.find((a) => a.slug === slug)!, body: fallbackArticleDetail.body }
        : null;
    }

    try {
      const data = await sanityClient.fetch<Article | null>(
        articleBySlugQuery,
        { slug },
        { next: { revalidate: 60 } },
      );

      if (data?.slug && data?.title) {
        return {
          ...data,
          coverImageUrl:
            optimizeSanityImageUrl(data.coverImageUrl, { width: 1600, quality: 75 }) ||
            data.coverImageUrl,
          body: optimizeArticleBodyImages(data.body),
        };
      }

      const fallback = fallbackArticles.find((a) => a.slug === slug);
      return fallback
        ? { ...fallbackArticleDetail, ...fallback, body: fallbackArticleDetail.body }
        : null;
    } catch {
      const fallback = fallbackArticles.find((a) => a.slug === slug);
      return fallback
        ? { ...fallbackArticleDetail, ...fallback, body: fallbackArticleDetail.body }
        : null;
    }
  },
);
