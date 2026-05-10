import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("AriaLux Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site settings"),
        ),
      S.listItem()
        .title("Media settings")
        .id("mediaSettings")
        .child(
          S.document()
            .schemaType("mediaSettings")
            .documentId("mediaSettings")
            .title("Media settings"),
        ),
      S.divider(),
      S.listItem()
        .title("Pages")
        .child(S.documentTypeList("page").title("Pages")),
      S.listItem()
        .title("Floor plans")
        .child(S.documentTypeList("floorPlan").title("Floor plans")),
      S.listItem()
        .title("Portfolio")
        .child(S.documentTypeList("portfolioItem").title("Portfolio")),
      S.listItem()
        .title("Videos")
        .child(S.documentTypeList("video").title("Videos")),
      S.listItem()
        .title("Articles")
        .child(S.documentTypeList("article").title("Articles")),
      S.divider(),
      S.listItem()
        .title("Navigation menus")
        .child(S.documentTypeList("navigationMenu").title("Navigation menus")),
      S.listItem()
        .title("Redirects")
        .child(S.documentTypeList("redirect").title("Redirects")),
    ]);
