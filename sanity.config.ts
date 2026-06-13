import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { dataset, projectId } from "./src/sanity/env";
import { resolve } from "./src/sanity/presentation/resolve";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

const previewOrigin =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SANITY_STUDIO_PREVIEW_URL ||
  "http://localhost:3000";

export default defineConfig({
  name: "arialux-homes",
  title: "AriaLux Homes CMS",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure,
    }),
    presentationTool({
      resolve,
      previewUrl: {
        origin: previewOrigin,
        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable",
        },
      },
      allowOrigins: ["http://localhost:*", previewOrigin],
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      {
        id: "galleryItem-interior-finishes",
        title: "Interior finishes image",
        schemaType: "galleryItem",
        value: {
          gallery: "interior-finishes",
        },
      },
      {
        id: "galleryItem-portfolio",
        title: "Portfolio gallery image",
        schemaType: "galleryItem",
        value: {
          gallery: "portfolio",
        },
      },
      {
        id: "portfolioItem-recent-build",
        title: "Recent build image",
        schemaType: "portfolioItem",
        value: {
          featured: true,
        },
      },
    ],
  },
});
