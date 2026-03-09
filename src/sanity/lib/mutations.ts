import type { HomepageSettings } from "@/sanity/lib/queries";
import { sanityWriteClient } from "@/sanity/lib/client";

export async function upsertHomepageSettings(input: Partial<HomepageSettings>) {
  if (!sanityWriteClient) {
    throw new Error("Sanity write client is not configured. Set SANITY_API_WRITE_TOKEN.");
  }

  const docId = "homepageSettings";

  return sanityWriteClient
    .patch(docId)
    .set({
      _type: "homepageSettings",
      ...input,
    })
    .setIfMissing({
      _id: docId,
      _type: "homepageSettings",
    })
    .commit();
}
