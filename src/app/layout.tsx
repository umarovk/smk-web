import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";
import { absoluteUrl, getSiteUrl } from "@/lib/seo";
import { getSeoSettings } from "@/sanity/lib/queries";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings();
  const ogImage = seo.defaultOgImageUrl || absoluteUrl("/hero-sekolah.svg");

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: seo.siteTitle,
      template: `%s | ${seo.siteTitle}`,
    },
    description: seo.defaultDescription,
    applicationName: seo.siteTitle,
    alternates: {
      canonical: absoluteUrl("/"),
    },
    openGraph: {
      title: seo.siteTitle,
      description: seo.defaultDescription,
      url: absoluteUrl("/"),
      siteName: seo.siteTitle,
      locale: "id_ID",
      type: "website",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.siteTitle,
      description: seo.defaultDescription,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jakarta.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
