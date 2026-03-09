import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, writeToken } from "@/sanity/env";

export const sanityClient =
  projectId
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: true,
      })
    : null;

export const sanityWriteClient =
  projectId && writeToken
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        token: writeToken,
        useCdn: false,
      })
    : null;

export const isSanityConfigured = Boolean(projectId);
