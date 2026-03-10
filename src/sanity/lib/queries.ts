import { groq } from "next-sanity";
import { cache } from "react";

import { sanityClient } from "@/sanity/lib/client";

export type SiteSettings = {
  siteName: string;
  logoUrl: string | null;
};

export type FooterLink = {
  label: string;
  href: string;
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
  description: string;
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
  concentrations: ProfileConcentration[];
  galleryPhotos: ProfileGalleryPhoto[];
  ctaBadge: string;
  ctaTitle: string;
  ctaDescription: string;
};

export type HomepageSettings = {
  heroBadge: string;
  heroTitlePrefix: string;
  heroDescription: string;
  heroFrameImageUrl: string;
  heroFrameAlt: string;
  metrics: HomepageMetric[];
  pillarsHeading: string;
  pillars: HomepagePillar[];
  galleryFrames: HomepageGalleryFrame[];
  ctaTitlePrefix: string;
  ctaDescription: string;
};

const siteSettingsQuery = groq`
  *[_type == "siteSettings"] | order(_updatedAt desc)[0]{
    siteName,
    "logoUrl": logo.asset->url
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

const homepageSettingsQuery = groq`
  *[_type == "homepageSettings"] | order(_updatedAt desc)[0]{
    heroBadge,
    heroTitlePrefix,
    heroDescription,
    "heroFrameImageUrl": heroFrameImage.asset->url,
    heroFrameAlt,
    metrics[]{
      label,
      value
    },
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
    ctaDescription
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
    concentrations[]{
      name,
      description,
      "imageUrl": image.asset->url,
      imageAlt
    },
    galleryPhotos[]{
      "imageUrl": image.asset->url,
      alt
    },
    ctaBadge,
    ctaTitle,
    ctaDescription
  }
`;

const fallbackSiteSettings: SiteSettings = {
  siteName: "SMK Web",
  logoUrl: "/logo-smk.svg",
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

const fallbackHomepageSettings: HomepageSettings = {
  heroBadge: "Portal Resmi Sekolah",
  heroTitlePrefix: "Pendidikan Modern untuk Masa Depan Cerah di",
  heroDescription:
    "Kami menghadirkan pembelajaran vokasi yang terarah, kolaboratif, dan dekat dengan dunia industri untuk menyiapkan siswa yang siap kerja maupun melanjutkan studi.",
  heroFrameImageUrl: "/hero-sekolah.svg",
  heroFrameAlt: "Ilustrasi lingkungan sekolah",
  metrics: [
    { label: "Program Keahlian", value: "TKJ & TSM" },
    { label: "Kemitraan Industri", value: "35+ Mitra Aktif" },
    { label: "Status PPDB", value: "Pendaftaran Dibuka" },
  ],
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
  concentrations: [
    {
      name: "Teknik Komputer & Jaringan (TKJ)",
      description:
        "Program keahlian yang mempelajari perakitan komputer, instalasi jaringan, administrasi server, dan keamanan siber. Siswa dibekali sertifikasi industri dan pengalaman magang di perusahaan IT.",
      imageUrl: "/foto-sekolah-1.svg",
      imageAlt: "Praktik laboratorium TKJ",
    },
    {
      name: "Teknik Sepeda Motor (TSM)",
      description:
        "Program keahlian yang fokus pada perawatan, perbaikan, dan overhaul mesin sepeda motor. Dilengkapi bengkel standar industri dan kerja sama dengan pabrikan otomotif terkemuka.",
      imageUrl: "/foto-sekolah-2.svg",
      imageAlt: "Praktik bengkel TSM",
    },
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
      logoUrl: data?.logoUrl || fallbackSiteSettings.logoUrl,
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
        heroFrameImageUrl:
          data?.heroFrameImageUrl || fallbackHomepageSettings.heroFrameImageUrl,
        heroFrameAlt: data?.heroFrameAlt || fallbackHomepageSettings.heroFrameAlt,
        metrics:
          data?.metrics?.filter((item) => item?.label && item?.value) ||
          fallbackHomepageSettings.metrics,
        pillarsHeading: data?.pillarsHeading || fallbackHomepageSettings.pillarsHeading,
        pillars:
          data?.pillars?.filter((item) => item?.title && item?.description) ||
          fallbackHomepageSettings.pillars,
        galleryFrames:
          data?.galleryFrames?.filter((item) => item?.imageUrl && item?.alt) ||
          fallbackHomepageSettings.galleryFrames,
        ctaTitlePrefix: data?.ctaTitlePrefix || fallbackHomepageSettings.ctaTitlePrefix,
        ctaDescription: data?.ctaDescription || fallbackHomepageSettings.ctaDescription,
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
          data?.partners?.filter((item) => item?.name && item?.logoUrl && item?.category) ||
          fallbackPartnerSettings.partners,
      };
    } catch {
      return fallbackPartnerSettings;
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
        heroImageUrl: data?.heroImageUrl || fallbackProfileSettings.heroImageUrl,
        heroAlt: data?.heroAlt || fallbackProfileSettings.heroAlt,
        profileDescription: data?.profileDescription || fallbackProfileSettings.profileDescription,
        profileImageUrl: data?.profileImageUrl ?? fallbackProfileSettings.profileImageUrl,
        profileImageAlt: data?.profileImageAlt || fallbackProfileSettings.profileImageAlt,
        history: data?.history || fallbackProfileSettings.history,
        historyImageUrl: data?.historyImageUrl ?? fallbackProfileSettings.historyImageUrl,
        historyImageAlt: data?.historyImageAlt || fallbackProfileSettings.historyImageAlt,
        vision: data?.vision || fallbackProfileSettings.vision,
        missions:
          data?.missions?.filter((m) => typeof m === "string" && m.length > 0) ||
          fallbackProfileSettings.missions,
        goals:
          data?.goals?.filter((g) => typeof g === "string" && g.length > 0) ||
          fallbackProfileSettings.goals,
        concentrations:
          data?.concentrations?.filter((c) => c?.name && c?.description) ||
          fallbackProfileSettings.concentrations,
        galleryPhotos:
          data?.galleryPhotos?.filter((p) => p?.imageUrl && p?.alt) ||
          fallbackProfileSettings.galleryPhotos,
        ctaBadge: data?.ctaBadge || fallbackProfileSettings.ctaBadge,
        ctaTitle: data?.ctaTitle || fallbackProfileSettings.ctaTitle,
        ctaDescription: data?.ctaDescription || fallbackProfileSettings.ctaDescription,
      };
    } catch {
      return fallbackProfileSettings;
    }
  },
);
