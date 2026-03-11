import type { Metadata } from "next";

const DEFAULT_SITE_URL = "http://localhost:3000";

function trimSlash(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function getSiteUrl() {
  return trimSlash(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL);
}

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

type BuildMetadataInput = {
  title: string;
  description: string;
  path?: string;
  imagePath?: string;
};

export function buildPageMetadata({
  title,
  description,
  path = "/",
  imagePath = "/hero-sekolah.svg",
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const image = imagePath.startsWith("http") ? imagePath : absoluteUrl(imagePath);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "SMK Web",
      locale: "id_ID",
      type: "website",
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
