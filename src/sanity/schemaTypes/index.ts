import { article } from "./documents/article";
import { floorPlan } from "./documents/floorPlan";
import { mediaSettings } from "./documents/mediaSettings";
import { navigationMenu } from "./documents/navigationMenu";
import { page } from "./documents/page";
import { portfolioItem } from "./documents/portfolioItem";
import { redirect } from "./documents/redirect";
import { siteSettings } from "./documents/siteSettings";
import { video } from "./documents/video";
import { cta } from "./objects/cta";
import {
  addressGroup,
  floorMap,
  floorPlanSpecs,
  planAmenityGroup,
} from "./objects/floorPlanObjects";
import { imageWithAlt } from "./objects/imageWithAlt";
import { link, navigationChildItem, navigationItem } from "./objects/link";
import {
  cardGridSection,
  contactSection,
  ctaBandSection,
  featureListSection,
  floorPlanCarouselSection,
  heroCarouselSection,
  heroSection,
  imageGallerySection,
  spacerSection,
  textImageSection,
  videoAsset,
  videoGridSection,
} from "./objects/pageSections";
import { richText } from "./objects/richText";
import { seo } from "./objects/seo";

export const schemaTypes = [
  siteSettings,
  mediaSettings,
  page,
  floorPlan,
  portfolioItem,
  video,
  article,
  navigationMenu,
  redirect,
  seo,
  imageWithAlt,
  link,
  navigationItem,
  navigationChildItem,
  cta,
  richText,
  floorPlanSpecs,
  floorMap,
  addressGroup,
  planAmenityGroup,
  heroCarouselSection,
  heroSection,
  videoAsset,
  textImageSection,
  imageGallerySection,
  floorPlanCarouselSection,
  cardGridSection,
  featureListSection,
  ctaBandSection,
  videoGridSection,
  contactSection,
  spacerSection,
];
