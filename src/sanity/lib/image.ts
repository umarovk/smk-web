type OptimizeOptions = {
  width?: number;
  quality?: number;
};

function isSanityCdnUrl(url: string) {
  return /^https:\/\/cdn\.sanity\.io\//.test(url);
}

export function optimizeSanityImageUrl(
  url: string | null | undefined,
  options: OptimizeOptions = {},
) {
  if (!url) return url ?? null;
  if (!isSanityCdnUrl(url)) return url;

  const nextUrl = new URL(url);
  const width = options.width ?? 1600;
  const quality = options.quality ?? 75;

  if (!nextUrl.searchParams.has("auto")) nextUrl.searchParams.set("auto", "format");
  if (!nextUrl.searchParams.has("fit")) nextUrl.searchParams.set("fit", "max");
  if (!nextUrl.searchParams.has("w")) nextUrl.searchParams.set("w", String(width));
  if (!nextUrl.searchParams.has("q")) nextUrl.searchParams.set("q", String(quality));

  return nextUrl.toString();
}
