import {
  defineDocuments,
  defineLocations,
  type PresentationPluginOptions,
} from "sanity/presentation";

type PresentationResolve = NonNullable<PresentationPluginOptions["resolve"]>;

const pagePath = (slug?: string) => {
  if (!slug || slug === "home" || slug === "homepage") return "/";
  return `/${slug}`;
};

export const mainDocuments = defineDocuments([
  {
    route: "/",
    filter: `_type == "page" && (slug.current == "home" || slug.current == "homepage")`,
  },
  {
    route: "/floor-plans/:slug",
    filter: `_type == "floorPlan" && slug.current == $slug`,
  },
  {
    route: "/:slug",
    filter: `_type == "page" && slug.current == $slug`,
  },
]);

export const locations: PresentationResolve["locations"] = {
  page: defineLocations({
    select: {
      title: "title",
      slug: "slug.current",
    },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || "Untitled page",
          href: pagePath(doc?.slug),
        },
      ],
    }),
  }),
  floorPlan: defineLocations({
    select: {
      title: "title",
      slug: "slug.current",
    },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || "Untitled floor plan",
          href: doc?.slug ? `/floor-plans/${doc.slug}` : "/all-floor-plans",
        },
        { title: "All Floor Plans", href: "/all-floor-plans" },
      ],
    }),
  }),
  article: defineLocations({
    message: "Articles currently appear on the article listing page.",
    tone: "caution",
  }),
  portfolioItem: defineLocations({
    message: "Portfolio items currently appear on the portfolio listing page.",
    tone: "caution",
  }),
  video: defineLocations({
    message: "Videos currently appear on the video listing page.",
    tone: "caution",
  }),
  siteSettings: defineLocations({
    message: "Site settings are used globally across the website.",
    tone: "caution",
  }),
};

export const resolve: PresentationResolve = {
  mainDocuments,
  locations,
};
