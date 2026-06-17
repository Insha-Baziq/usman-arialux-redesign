import type { StructureBuilder, StructureResolver } from "sanity/structure";

function singleton(
  S: StructureBuilder,
  typeName: string,
  documentId: string,
  title: string,
) {
  return S.listItem()
    .title(title)
    .id(documentId)
    .child(S.document().schemaType(typeName).documentId(documentId).title(title));
}

function documentList(S: StructureBuilder, typeName: string, title: string) {
  return S.listItem()
    .title(title)
    .id(typeName)
    .child(S.documentTypeList(typeName).title(title));
}

function recentBuildList(S: StructureBuilder) {
  const title = "Recent builds";

  return S.listItem()
    .title(title)
    .id("recent-builds")
    .child(
      S.documentTypeList("portfolioItem")
        .title(title)
        .filter('_type == "portfolioItem" && featured == true')
        .initialValueTemplates([
          S.initialValueTemplateItem("portfolioItem-recent-build"),
        ]),
    );
}

function galleryList(
  S: StructureBuilder,
  gallery: "interior-finishes" | "portfolio",
  title: string,
) {
  return S.listItem()
    .title(title)
    .id(`${gallery}-gallery`)
    .child(
      S.documentTypeList("galleryItem")
        .title(title)
        .filter('_type == "galleryItem" && gallery == $gallery')
        .params({ gallery })
        .initialValueTemplates([
          S.initialValueTemplateItem(`galleryItem-${gallery}`, { gallery }),
        ]),
    );
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title("AriaLux CMS")
    .items([
      singleton(S, "mediaSettings", "mediaSettings", "Homepage media"),
      singleton(S, "page", "page-contact", "Contact page"),
      singleton(S, "page", "page-who-we-are", "Who We Are page"),
      singleton(
        S,
        "page",
        "page-architectural-services",
        "Architectural services page",
      ),
      singleton(
        S,
        "architectureMedia",
        "architectureMedia",
        "Architectural services video",
      ),

      S.divider(),

      documentList(S, "floorPlan", "Floor plans"),
      galleryList(S, "interior-finishes", "Interior finishes images"),
      recentBuildList(S),
      documentList(S, "portfolioItem", "Portfolio images"),
      documentList(S, "video", "Videos"),
      documentList(S, "article", "Articles"),

      S.divider(),

      S.listItem()
        .title("Advanced")
        .id("advanced")
        .child(
          S.list()
            .title("Advanced")
            .items([
              singleton(S, "siteSettings", "siteSettings", "Site settings"),
              documentList(S, "navigationMenu", "Navigation menus"),
              documentList(S, "redirect", "Redirects"),
              documentList(S, "page", "Raw page documents"),
              galleryList(S, "portfolio", "Portfolio gallery fallback"),
            ]),
        ),
    ]);
