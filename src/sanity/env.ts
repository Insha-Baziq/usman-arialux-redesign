export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  "2026-05-09";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
}

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
