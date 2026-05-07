import { AriaLuxFooter, ariaLuxBrand } from "@/components/arialux-brand";
import { ARIA_ARCHITECTURAL, ARIA_HEADER_MENU } from "@/components/arialux-data";
import { SobhaHeader } from "@/components/SobhaChrome";
import { PageHero } from "@/components/sobha-sections";

export default function ArticlePage() {
  return (
    <main className="bg-[#f7f3ec] text-black">
      <SobhaHeader
        brand={ariaLuxBrand}
        menus={ARIA_HEADER_MENU}
        hideLanguageSwitcher
      />

      <PageHero
        eyebrow="Insights"
        heading="Article"
        description="Design notes, build guidance, and architectural perspective from the AriaLux Homes team."
        backgroundImage={ARIA_ARCHITECTURAL.detail}
        imageAlt="AriaLux Homes article"
      />

      <section className="px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[81rem]">
          <div className="border-t border-black/10 pt-10">
            <p className="max-w-2xl text-base font-light leading-[1.8] text-black/60">
              Articles are being prepared. Check back soon for custom home
              planning ideas, material notes, and design process guidance.
            </p>
          </div>
        </div>
      </section>

      <AriaLuxFooter />
    </main>
  );
}
