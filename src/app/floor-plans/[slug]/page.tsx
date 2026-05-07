/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AriaLuxFooter, ariaLuxBrand } from "@/components/arialux-brand";
import {
  ARIA_HEADER_MENU,
  ARIA_PLANS,
  getPlanBySlug,
  type AriaPlan,
} from "@/components/arialux-data";
import { PlanCard } from "@/components/PlanCard";
import {
  AmenitiesTabs,
  type AmenityCategory,
} from "@/components/plan-detail/AmenitiesTabs";
import {
  FloorPlanTabs,
  type FloorPlanTab,
} from "@/components/plan-detail/FloorPlanTabs";
import { GalleryCarousel } from "@/components/plan-detail/GalleryCarousel";
import { SobhaHeader } from "@/components/SobhaChrome";
import { DarkCtaBand } from "@/components/sobha-sections";

const FB_BASE = "/images/facebook";

// Curated AriaLux interior/exterior shots scraped from facebook export.
const FB_IMAGES = [
  "fb-0002.jpg",
  "fb-0033.jpg",
  "fb-0039.jpg",
  "fb-0049.jpg",
  "fb-0055.jpg",
  "fb-0056.jpg",
  "fb-0058.jpg",
  "fb-0059.jpg",
  "fb-0063.jpg",
  "fb-0067.jpg",
  "fb-0069.jpg",
  "fb-0070.jpg",
  "fb-0071.jpg",
  "fb-0072.jpg",
  "fb-0082.jpg",
  "fb-0085.jpg",
  "fb-0115.jpg",
  "fb-0149.jpg",
  "fb-0151.jpg",
  "fb-0170.jpg",
  "fb-0188.jpg",
  "fb-0251.jpg",
  "fb-0260.jpg",
].map((f) => `${FB_BASE}/${f}`);

const fb = (i: number): string => FB_IMAGES[i % FB_IMAGES.length] ?? FB_IMAGES[0]!;

// Per-slug hero override. AriaLux's source `phonto-*.jpeg` heroes were
// edited in Phonto and have the project name baked into the JPEG pixels,
// which renders as a giant ghost overlay behind the logo card. For those
// plans we substitute a clean local exterior shot instead.
const HERO_OVERRIDES: Record<string, string> = {
  "aria-heights": `${FB_BASE}/fb-0058.jpg`,
};

export async function generateStaticParams() {
  return ARIA_PLANS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/floor-plans/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const plan = getPlanBySlug(slug);
  if (!plan) {
    return { title: "Floor Plan Not Found | AriaLux Homes" };
  }
  return {
    title: `${plan.name} | AriaLux Homes Floor Plan`,
    description: plan.shortBlurb,
    openGraph: {
      title: `${plan.name} \u2014 AriaLux Homes`,
      description: plan.tagline,
      images: [plan.hero],
    },
  };
}

type StatBand = { label: string; value: string };

function buildStatBand(plan: AriaPlan): StatBand[] {
  const fmt = (n: number) => `${n.toLocaleString()} SQFT`;
  return [
    { label: "Living", value: fmt(plan.specs.living) },
    { label: "Garage", value: fmt(plan.specs.garage) },
    { label: "Porch", value: fmt(plan.specs.porch) },
    { label: "Total", value: fmt(plan.specs.total) },
    {
      label: "Bed / Bath",
      value: `${plan.specs.bedrooms} BR \u2022 ${plan.specs.bathrooms} BA`,
    },
  ];
}

function pickOtherPlans(currentSlug: string, count = 3): AriaPlan[] {
  const others = ARIA_PLANS.filter((p) => p.slug !== currentSlug);
  const hash = currentSlug
    .split("")
    .reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) | 0, 0);
  const start = Math.abs(hash) % others.length;
  const rotated = [...others.slice(start), ...others.slice(0, start)];
  return rotated.slice(0, count);
}

function buildFloorPlanTabs(plan: AriaPlan): FloorPlanTab[] {
  // AriaLux source has no floor-plan PNG; use curated interior shots as
  // visual stand-ins. Show one tab below and one at the planned bedroom
  // count (skipping the lower variant when the plan only has 3 BR).
  const base = plan.specs.bedrooms;
  const counts = base > 3 ? [base - 1, base] : [base];
  const images = [fb(2), fb(7)];
  return counts.map((count, i) => ({
    id: `bed-${count}`,
    label: `${count} BR`,
    bedroomLabel: `${count}`,
    bathroomLabel: `${plan.specs.bathrooms}`,
    livingLabel: `${plan.specs.living.toLocaleString()} SQFT`,
    totalLabel: `${plan.specs.total.toLocaleString()} SQFT`,
    image: images[i] ?? images[0]!,
  }));
}

const AMENITY_CATEGORIES: AmenityCategory[] = [
  {
    id: "living",
    label: "Living Spaces",
    items: [
      { label: "Open Great Room", image: fb(0) },
      { label: "Chef's Kitchen", image: fb(3) },
      { label: "Walk-In Pantry", image: fb(5) },
      { label: "Formal Dining", image: fb(8) },
      { label: "Dedicated Study", image: fb(13) },
    ],
  },
  {
    id: "primary",
    label: "Primary Suite",
    items: [
      { label: "Spa Bath", image: fb(1) },
      { label: "Dual Vanities", image: fb(6) },
      { label: "Boutique Closet", image: fb(9) },
      { label: "Sitting Lounge", image: fb(12) },
    ],
  },
  {
    id: "outdoor",
    label: "Outdoor & Garage",
    items: [
      { label: "Covered Porch", image: fb(4) },
      { label: "3-Car Garage", image: fb(10) },
      { label: "Stone Facade", image: fb(14) },
      { label: "Landscaped Yard", image: fb(16) },
    ],
  },
  {
    id: "extras",
    label: "Lifestyle Extras",
    items: [
      { label: "Theater Room", image: fb(15) },
      { label: "Wine Display", image: fb(17) },
      { label: "Mudroom", image: fb(18) },
      { label: "Smart Home", image: fb(19) },
    ],
  },
];

const DISTANCES: Array<{ minutes: string; place: string }> = [
  { minutes: "5 min", place: "Pine Valley Country Club" },
  { minutes: "8 min", place: "Purdue Fort Wayne" },
  { minutes: "12 min", place: "Downtown Fort Wayne" },
  { minutes: "15 min", place: "Parkview Regional Hospital" },
  { minutes: "18 min", place: "Fort Wayne Intl Airport" },
  { minutes: "22 min", place: "Jefferson Pointe Mall" },
];

const STARTING_PRICES = {
  fourBed: "USD 685K*",
  fiveBed: "USD 825K*",
  sixBed: "USD 985K*",
};

/**
 * /floor-plans/[slug] \u2014 Sobha-Orchard-style plan detail page rendered with
 * AriaLux content. Composition mirrors Sobha's nine-section layout:
 * hero, stats band, intro split, gallery carousel, floor-plan tabs,
 * amenities tabs, distance grid, dark CTA band, other-plans grid, footer.
 */
export default async function PlanDetailPage(
  props: PageProps<"/floor-plans/[slug]">,
) {
  const { slug } = await props.params;
  const plan = getPlanBySlug(slug);
  if (!plan) notFound();

  const stats = buildStatBand(plan);
  const otherPlans = pickOtherPlans(plan.slug);
  const floorPlanTabs = buildFloorPlanTabs(plan);
  const heroImage = HERO_OVERRIDES[plan.slug] ?? plan.hero;
  const galleryImages =
    plan.gallery.length > 0
      ? plan.gallery
      : [plan.hero, ...FB_IMAGES.slice(0, 5)];

  const introImage = plan.gallery[1] ?? fb(3);
  const ctaBackground = plan.gallery[2] ?? plan.hero;

  return (
    <main className="bg-white text-black">
      <SobhaHeader
        brand={ariaLuxBrand}
        menus={ARIA_HEADER_MENU}
        hideLanguageSwitcher
      />

      {/* (1) Hero \u2014 full-bleed image, minimal logo card stacked centered */}
      <section className="relative isolate overflow-hidden bg-black text-white">
        <img
          src={heroImage}
          alt={plan.displayName}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/25 to-black/55"
        />
        <div className="relative mx-auto flex min-h-[78vh] w-full max-w-[81rem] flex-col items-center justify-end px-6 pb-16 lg:pb-20">
          <div className="flex flex-col items-center gap-5 rounded-md bg-white/95 px-10 py-7 text-center text-black shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:px-14">
            <span className="text-[0.62rem] font-medium uppercase tracking-[0.42em] text-black/55">
              AriaLux Homes
            </span>
            <h1 className="font-heading text-[2rem] font-light leading-[1.05] tracking-[0.06em] text-black sm:text-[2.5rem]">
              {plan.displayName}
            </h1>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-b border-black/10 bg-[#f5f3ef] px-6 py-12 lg:px-10 lg:py-16">
        <div className="mx-auto w-full max-w-[81rem]">
          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((stat) => (
              <li
                key={stat.label}
                className="flex flex-col items-start gap-2 border-l-2 border-black/80 pl-5"
              >
                <span className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-black/55">
                  {stat.label}
                </span>
                <span className="text-xl font-light tracking-wide text-black sm:text-2xl">
                  {stat.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* (2) Intro split \u2014 left text + Download Brochure CTA, right image */}
      <section className="px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid w-full max-w-[81rem] gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="flex flex-col gap-8">
            <h2 className="font-heading text-[2rem] font-light leading-[1.15] tracking-[0.02em] text-black sm:text-[2.5rem] lg:text-[3rem]">
              Where Craft Shapes Everyday Living
            </h2>
            <div className="flex flex-col gap-5 text-base font-light leading-[1.85] text-black/75 lg:text-[1.0625rem]">
              <p>{plan.shortBlurb}</p>
              <p>
                Designed and built by AriaLux Homes in Fort Wayne, the
                {" "}
                {plan.name} blends a hand-laid stone and stucco facade with
                generous, light-filled interiors. Layouts are oriented to
                preserve privacy between bedrooms while keeping the great
                room, kitchen, and dining open and connected for daily life
                and entertaining.
              </p>
            </div>
            <div className="pt-2">
              <a
                href="/contact"
                className="inline-flex items-center gap-3 rounded-full border border-black bg-black px-8 py-3 text-[0.72rem] font-medium uppercase tracking-[0.24em] text-white transition hover:bg-transparent hover:text-black"
              >
                Request the Brochure
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl bg-[#f5f3ef] ring-1 ring-black/5">
            <img
              src={introImage}
              alt={`${plan.displayName} interior detail`}
              loading="lazy"
              decoding="async"
              className="block aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* (3) Tagline + gallery carousel */}
      <section className="bg-[#f5f3ef] px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto flex w-full max-w-[81rem] flex-col gap-14">
          <h2 className="mx-auto max-w-[58rem] text-center font-heading text-[1.75rem] font-light leading-[1.25] tracking-[0.02em] text-black sm:text-[2.25rem] lg:text-[2.75rem]">
            A Home Defined by Craft, Shaped by Light, and Designed for Family
            Life
          </h2>
          <GalleryCarousel images={galleryImages} alt={plan.displayName} />
        </div>
      </section>

      {/* (4) Floor Plan tabs */}
      <section className="px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto flex w-full max-w-[81rem] flex-col gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.32em] text-black/55">
              Layouts
            </span>
            <h2 className="font-heading text-[2rem] font-light leading-[1.15] tracking-[0.02em] text-black sm:text-[2.5rem] lg:text-[3rem]">
              Floor Plan
            </h2>
          </div>
          <FloorPlanTabs tabs={floorPlanTabs} />
        </div>
      </section>

      {/* (5) Amenities tabs */}
      <section className="bg-[#f5f3ef] px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto flex w-full max-w-[81rem] flex-col gap-12">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.32em] text-black/55">
              Inside the Home
            </span>
            <h2 className="font-heading text-[2rem] font-light leading-[1.15] tracking-[0.02em] text-black sm:text-[2.5rem] lg:text-[3rem]">
              Essentials, Thoughtfully Curated
            </h2>
          </div>
          <AmenitiesTabs categories={AMENITY_CATEGORIES} />
        </div>
      </section>

      {/* (6 + 7) Map + distance grid */}
      <section className="px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto flex w-full max-w-[81rem] flex-col gap-12">
          <div className="flex flex-col gap-3 text-center">
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.32em] text-black/55">
              Location
            </span>
            <h2 className="font-heading text-[2rem] font-light leading-[1.15] tracking-[0.02em] text-black sm:text-[2.5rem] lg:text-[3rem]">
              Vibrant Living, Closer to Convenience
            </h2>
            {plan.addressGroups && plan.addressGroups[0] ? (
              <p className="text-base font-light text-black/65">
                Built at{" "}
                <span className="font-medium text-black">
                  {plan.addressGroups[0].address}
                </span>
                , Fort Wayne, Indiana
              </p>
            ) : null}
          </div>

          <div className="overflow-hidden rounded-2xl ring-1 ring-black/10">
            <iframe
              title={`${plan.displayName} location map`}
              src="https://www.openstreetmap.org/export/embed.html?bbox=-85.2900%2C40.9800%2C-84.9900%2C41.1700&amp;layer=mapnik&amp;marker=41.0793%2C-85.1394"
              loading="lazy"
              className="block h-[420px] w-full border-0 lg:h-[520px]"
            />
          </div>

          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-black/10 ring-1 ring-black/10 sm:grid-cols-3 lg:grid-cols-6">
            {DISTANCES.map((d) => (
              <li
                key={d.place}
                className="flex flex-col items-center gap-2 bg-white px-4 py-8 text-center"
              >
                <span className="font-heading text-2xl font-light tracking-wide text-black">
                  {d.minutes}
                </span>
                <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-black/60">
                  {d.place}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* (8) Contact form with starting prices */}
      <section className="bg-[#f5f3ef] px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid w-full max-w-[81rem] gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <div className="flex flex-col gap-8">
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.32em] text-black/55">
              We&apos;d Love To
            </span>
            <h2 className="font-heading text-[2rem] font-light leading-[1.1] tracking-[0.02em] text-black sm:text-[2.5rem] lg:text-[3rem]">
              Hear From You
            </h2>
            <div className="flex flex-col gap-4 border-t border-black/15 pt-8">
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-black/55">
                Starting Prices
              </span>
              <ul className="flex flex-col gap-3 text-base font-light text-black/80">
                <li className="flex items-baseline justify-between gap-6 border-b border-black/10 pb-3">
                  <span>4 Bedroom</span>
                  <span className="font-medium tracking-wide text-black">
                    {STARTING_PRICES.fourBed}
                  </span>
                </li>
                <li className="flex items-baseline justify-between gap-6 border-b border-black/10 pb-3">
                  <span>5 Bedroom</span>
                  <span className="font-medium tracking-wide text-black">
                    {STARTING_PRICES.fiveBed}
                  </span>
                </li>
                <li className="flex items-baseline justify-between gap-6">
                  <span>6 Bedroom</span>
                  <span className="font-medium tracking-wide text-black">
                    {STARTING_PRICES.sixBed}
                  </span>
                </li>
              </ul>
              <p className="pt-2 text-xs font-light text-black/55">
                * Pricing is indicative; final figures depend on lot, finish
                package, and customizations.
              </p>
            </div>
          </div>

          <form
            className="flex flex-col gap-5 rounded-2xl bg-white p-8 ring-1 ring-black/5 lg:p-10"
            action="/contact"
            method="get"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-[0.62rem] font-medium uppercase tracking-[0.24em] text-black/55">
                  First Name
                </span>
                <input
                  name="first_name"
                  type="text"
                  required
                  className="h-12 rounded-md border border-black/15 bg-white px-4 text-sm text-black outline-none transition focus:border-black"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[0.62rem] font-medium uppercase tracking-[0.24em] text-black/55">
                  Last Name
                </span>
                <input
                  name="last_name"
                  type="text"
                  required
                  className="h-12 rounded-md border border-black/15 bg-white px-4 text-sm text-black outline-none transition focus:border-black"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[0.62rem] font-medium uppercase tracking-[0.24em] text-black/55">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  className="h-12 rounded-md border border-black/15 bg-white px-4 text-sm text-black outline-none transition focus:border-black"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[0.62rem] font-medium uppercase tracking-[0.24em] text-black/55">
                  Phone
                </span>
                <input
                  name="phone"
                  type="tel"
                  className="h-12 rounded-md border border-black/15 bg-white px-4 text-sm text-black outline-none transition focus:border-black"
                />
              </label>
            </div>
            <label className="flex flex-col gap-2">
              <span className="text-[0.62rem] font-medium uppercase tracking-[0.24em] text-black/55">
                Message
              </span>
              <textarea
                name="message"
                rows={5}
                placeholder={`Tell us about your interest in the ${plan.name}\u2026`}
                className="rounded-md border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black"
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-black bg-black px-8 py-3 text-[0.72rem] font-medium uppercase tracking-[0.24em] text-white transition hover:bg-transparent hover:text-black"
            >
              Submit
              <span aria-hidden="true">&rarr;</span>
            </button>
          </form>
        </div>
      </section>

      <DarkCtaBand
        eyebrow="Make it yours"
        headline={`Build the ${plan.name}`}
        subline="Book a free consultation. We'll walk through the plan, talk lots, and price it for your family."
        ctaLabel="Schedule a Free Consultation"
        ctaHref="/contact"
        backgroundImage={ctaBackground}
      />

      {/* Other plans */}
      <section className="bg-[#f5f3ef] px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto w-full max-w-[81rem]">
          <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.32em] text-black/55">
                Keep Exploring
              </span>
              <h2 className="mt-4 font-heading text-[2rem] font-light leading-tight text-black sm:text-[2.5rem]">
                Other Floor Plans
              </h2>
            </div>
            <a
              href="/all-floor-plans"
              className="inline-flex items-center gap-2 self-start text-[0.72rem] font-medium uppercase tracking-[0.24em] text-black transition hover:translate-x-1"
            >
              View All
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {otherPlans.map((other) => (
              <PlanCard key={other.slug} plan={other} />
            ))}
          </div>
        </div>
      </section>

      <AriaLuxFooter />
    </main>
  );
}
