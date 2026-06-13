import type { ClientPerspective, QueryParams } from "@sanity/client";

import { draftMode } from "next/headers";

import { sanityClient } from "./client";

type SanityFetchOptions = {
  params?: QueryParams;
  perspective?: Exclude<ClientPerspective, "raw">;
  stega?: boolean;
};

export async function sanityFetch<T>(
  query: string,
  { params = {}, perspective, stega }: SanityFetchOptions = {},
): Promise<T> {
  const shouldReadDraftMode = perspective === undefined || stega === undefined;
  const isDraftMode = shouldReadDraftMode ? (await draftMode()).isEnabled : false;
  const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN;

  return sanityClient.fetch<T>(query, params, {
    perspective: perspective ?? (isDraftMode ? "drafts" : "published"),
    stega: stega ?? isDraftMode,
    token: isDraftMode ? token : undefined,
  });
}
