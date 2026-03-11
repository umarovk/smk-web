import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type SanityWebhookBody = {
  _type?: string;
  slug?: { current?: string } | string;
};

function getSlug(payload: SanityWebhookBody): string | undefined {
  if (!payload.slug) return undefined;
  if (typeof payload.slug === "string") return payload.slug;
  return payload.slug.current;
}

function revalidateByType(payload: SanityWebhookBody) {
  const docType = payload._type;
  const slug = getSlug(payload);

  revalidatePath("/");
  revalidatePath("/sitemap.xml");

  switch (docType) {
    case "article":
      revalidatePath("/berita");
      if (slug) revalidatePath(`/berita/${slug}`);
      break;
    case "concentration":
      revalidatePath("/profil");
      if (slug) revalidatePath(`/jurusan/${slug}`);
      break;
    case "profileSettings":
      revalidatePath("/profil");
      break;
    case "homepageSettings":
      revalidatePath("/");
      break;
    case "tahfidzSettings":
      revalidatePath("/tahfidz");
      break;
    case "spmbSettings":
      revalidatePath("/spmb");
      break;
    case "footerSettings":
      revalidatePath("/kontak");
      revalidatePath("/profil");
      revalidatePath("/berita");
      revalidatePath("/spmb");
      revalidatePath("/tahfidz");
      break;
    case "navbarSettings":
      revalidatePath("/");
      revalidatePath("/profil");
      revalidatePath("/berita");
      revalidatePath("/kontak");
      revalidatePath("/spmb");
      revalidatePath("/tahfidz");
      break;
    case "seoSettings":
      revalidatePath("/");
      revalidatePath("/profil");
      revalidatePath("/berita");
      revalidatePath("/kontak");
      revalidatePath("/spmb");
      revalidatePath("/tahfidz");
      break;
    default:
      revalidatePath("/profil");
      revalidatePath("/berita");
      revalidatePath("/kontak");
      revalidatePath("/spmb");
      revalidatePath("/tahfidz");
      break;
  }
}

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const expectedSecret = process.env.SANITY_REVALIDATE_SECRET;

  if (!expectedSecret || secret !== expectedSecret) {
    return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as SanityWebhookBody;
  revalidateByType(body);

  return NextResponse.json({ ok: true, revalidated: true, type: body._type || "unknown" });
}
