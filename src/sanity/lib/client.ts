import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/env";

export const sanityClient =
  projectId
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: true,
      })
    : null;

export const isSanityConfigured = Boolean(projectId);
