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
