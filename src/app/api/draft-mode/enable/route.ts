import { sanityClient } from "@/sanity/lib/client";
import { defineEnableDraftMode } from "next-sanity/draft-mode";

export const { GET } = defineEnableDraftMode({
  client: sanityClient.withConfig({
    token: process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN || "",
  }),
});
