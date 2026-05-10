import type {
  AriaArticle,
  AriaGalleryItem,
  AriaPlan,
  AriaVideoItem,
} from "@/components/arialux-data";

import { sanityClient } from "./client";

type SanityPlan = {
  slug?: string;
  livePath?: string;
  name?: string;
  displayName?: string;
  tagline?: string;
  shortBlurb?: string;
  specs?: Partial<AriaPlan["specs"]>;
  vimeoId?: string;
  vimeoHash?: string;
  hero?: string;
  uploadedGallery?: string[];
  galleryUrls?: { src?: string }[];
  addressGroups?: AriaPlan["addressGroups"];
  featuredOnListing?: boolean;
  featuredOnHome?: boolean;
};

type SanityArticle = Omit<Partial<AriaArticle>, "category"> & {
  category?: AriaArticle["category"] | string;
  imageUrls?: { src?: string }[];
};

const floorPlansQuery = `*[_type == "floorPlan" && status == "published"]|order(listingOrder asc, title asc){
  "slug": slug.current,
  "livePath": coalesce(livePath, "/" + slug.current),
  "name": title,
  "displayName": title,
  tagline,
  "shortBlurb": coalesce(summary, tagline),
  "specs": {
    "living": coalesce(specs.squareFeet, 0),
    "garage": coalesce(specs.garageSquareFeet, 0),
    "porch": coalesce(specs.porchSquareFeet, 0),
    "total": coalesce(specs.totalSquareFeet, specs.squareFeet, 0),
    "bedrooms": coalesce(specs.beds, 0),
    "bathrooms": coalesce(specs.baths, 0)
  },
  "vimeoId": video.vimeoId,
  "vimeoHash": video.vimeoHash,
  "hero": coalesce(heroImage.image.asset->url, heroImageUrl),
  "uploadedGallery": gallery[].image.asset->url,
  "galleryUrls": galleryUrls[]{src},
  "addressGroups": availableAt[]{
    "address": coalesce(addresses[0], title),
    "images": []
  },
  featuredOnListing,
  featuredOnHome
}`;

const portfolioQuery = `*[_type == "portfolioItem"]|order(order asc, title asc){
  "src": coalesce(image.image.asset->url, imageUrl),
  "alt": coalesce(image.alt, title, "AriaLux Homes portfolio image")
}`;

const galleryItemsQuery = `*[_type == "galleryItem" && gallery == $gallery]|order(order asc, title asc){
  "src": coalesce(image.image.asset->url, imageUrl),
  "alt": coalesce(image.alt, alt, title)
}`;

const articlesQuery = `*[_type == "article"]|order(publishedAt desc, title asc){
  "slug": slug.current,
  title,
  category,
  summary,
  "image": coalesce(heroImage.image.asset->url, heroImageUrl),
  "imageUrls": imageUrls[]{src},
  "dateLabel": coalesce(category, "Article"),
  "publisher": coalesce(author, "AriaLux Homes"),
  "publishedAt": string::split(coalesce(publishedAt, _createdAt), "T")[0]
}`;

const videosQuery = `*[_type == "video"]|order(order asc, title asc){
  title,
  vimeoId,
  vimeoHash
}`;

function isPlan(plan: SanityPlan): plan is AriaPlan {
  return Boolean(
    plan.slug &&
      plan.name &&
      plan.displayName &&
      plan.tagline &&
      plan.shortBlurb &&
      plan.hero &&
      plan.specs?.living !== undefined &&
      plan.specs?.bedrooms !== undefined &&
      plan.specs?.bathrooms !== undefined,
  );
}

function isGalleryItem(item: Partial<AriaGalleryItem>): item is AriaGalleryItem {
  return Boolean(item.src && item.alt);
}

function isArticle(article: SanityArticle): article is AriaArticle {
  const categories = new Set(["Buying", "Design", "Construction", "Floor Plans"]);
  return Boolean(
    article.slug &&
      article.title &&
      article.category &&
      categories.has(article.category) &&
      article.summary &&
      article.image &&
      article.publishedAt,
  );
}

function isVideo(video: Partial<AriaVideoItem>): video is AriaVideoItem {
  return Boolean(video.title && video.vimeoId && video.vimeoHash);
}

function isString(value: string | undefined): value is string {
  return Boolean(value);
}

function getArticleCategory(category: SanityArticle["category"]): AriaArticle["category"] {
  switch (category) {
    case "Buying":
    case "Design":
    case "Construction":
    case "Floor Plans":
      return category;
    default:
      return "Design";
  }
}

export async function getCmsFloorPlans(): Promise<AriaPlan[] | null> {
  const plans = await sanityClient.fetch<SanityPlan[]>(floorPlansQuery);
  const validPlans = plans
    .map((plan): SanityPlan & { gallery: string[]; specs: AriaPlan["specs"] } => {
      const gallery = [
        ...(plan.uploadedGallery ?? []),
        ...(plan.galleryUrls ?? []).map((image) => image.src).filter(isString),
      ];

      return {
        ...plan,
        livePath: plan.livePath ?? `/${plan.slug}`,
        gallery: gallery.length > 0 ? gallery : plan.hero ? [plan.hero] : [],
        addressGroups: plan.addressGroups ?? [],
        featuredOnListing: plan.featuredOnListing ?? true,
        featuredOnHome: plan.featuredOnHome ?? false,
        specs: {
          living: plan.specs?.living ?? 0,
          garage: plan.specs?.garage ?? 0,
          porch: plan.specs?.porch ?? 0,
          total: plan.specs?.total ?? plan.specs?.living ?? 0,
          bedrooms: plan.specs?.bedrooms ?? 0,
          bathrooms: plan.specs?.bathrooms ?? 0,
        },
      };
    })
    .filter(isPlan);

  return validPlans.length > 0 ? validPlans : null;
}

export async function getCmsPortfolioImages(): Promise<AriaGalleryItem[] | null> {
  const images = await sanityClient.fetch<Partial<AriaGalleryItem>[]>(portfolioQuery);
  const validImages = images.filter(isGalleryItem);
  return validImages.length > 0 ? validImages : null;
}

export async function getCmsGalleryItems(
  gallery: "portfolio" | "interior-finishes",
): Promise<AriaGalleryItem[] | null> {
  const images = await sanityClient.fetch<Partial<AriaGalleryItem>[]>(galleryItemsQuery, {
    gallery,
  });
  const validImages = images.filter(isGalleryItem);
  return validImages.length > 0 ? validImages : null;
}

export async function getCmsArticles(): Promise<AriaArticle[] | null> {
  const articles = await sanityClient.fetch<SanityArticle[]>(articlesQuery);
  const validArticles = articles
    .map((article): SanityArticle => ({
      ...article,
      category: getArticleCategory(article.category),
      images:
        article.imageUrls && article.imageUrls.length > 0
          ? article.imageUrls.map((image) => image.src).filter(isString)
          : article.image
            ? [article.image]
            : [],
    }))
    .filter(isArticle);

  return validArticles.length > 0 ? validArticles : null;
}

export async function getCmsVideos(): Promise<AriaVideoItem[] | null> {
  const videos = await sanityClient.fetch<Partial<AriaVideoItem>[]>(videosQuery);
  const validVideos = videos.filter(isVideo);
  return validVideos.length > 0 ? validVideos : null;
}
