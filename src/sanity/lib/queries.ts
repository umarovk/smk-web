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
