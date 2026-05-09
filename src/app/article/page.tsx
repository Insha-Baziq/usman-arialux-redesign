import type { Metadata } from "next";

import { ArticleBrowser } from "@/components/ArticleBrowser";
import { AriaLuxFooter, ariaLuxBrand } from "@/components/arialux-brand";
import {
  ARIA_ARTICLES,
  ARIA_HEADER_MENU,
} from "@/components/arialux-data";
import { SobhaHeader } from "@/components/SobhaChrome";
import { PageHero } from "@/components/sobha-sections";

export const metadata: Metadata = {
  title: "Article | AriaLux Homes — Custom Home Insights",
  description:
    "Browse AriaLux Homes articles, including new-construction guidance, design details, floor plan notes, and active build updates.",
};

const HERO_IMAGE = "/images/article/arialux-article-hero.webp";

export default function ArticlePage() {
  return (
    <main className="bg-[#f7f3ec] text-[#171410]">
      <SobhaHeader
        brand={ariaLuxBrand}
        menus={ARIA_HEADER_MENU}
        hideLanguageSwitcher
      />

      <PageHero
        eyebrow="Insights & Inspiration"
        heading="Articles"
        description="Expert advice, design inspiration, and behind-the-scenes stories from the AriaLux Homes team."
        backgroundImage={HERO_IMAGE}
        imageAlt="AriaLux Homes article entrance"
      />

      <ArticleBrowser articles={ARIA_ARTICLES} />

      <AriaLuxFooter />
    </main>
  );
}
