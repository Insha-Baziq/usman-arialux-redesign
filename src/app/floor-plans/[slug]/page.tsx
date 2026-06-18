/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

import { AriaLuxFooter, ariaLuxBrand } from "@/components/arialux-brand";
import {
  ARIA_PLANS,
  getPlanBySlug,
  type AriaPlan,
} from "@/components/arialux-data";
import {
  PlanGalleryDialog,
  type PlanGalleryGroup,
  type PlanGalleryImage,
} from "@/components/plan-detail/PlanGalleryDialog";
import { getSanityGalleryGroup } from "@/components/plan-detail/galleryGroups";
import { SobhaHeader } from "@/components/SobhaChrome";
import { getCmsFloorPlans, getHeaderMenu, getPublishedCmsFloorPlans } from "@/sanity/lib/content";

export const revalidate = 60;

const LIVE_PLAN_DESCRIPTIONS: Record<string, string> = {
  "aria-heights":
    "This breathtaking two-story house is a unique blend of modern elegance and timeless charm, designed to turn heads with its stunning combination of stone and stucco. The exterior features a carefully balanced interplay of textures: natural stone cladding wraps around the base of the structure, giving it a grounded, earthy feel, while smooth stucco walls in a neutral palette add sophistication and warmth.",
  "alena-heights":
    "This modern two-story home is a masterpiece of contemporary design and luxury. Its exterior boasts clean, minimalist lines with a mix of stone, stucco, and floor-to-ceiling glass panels that reflect the sunlight and create a seamless indoor-outdoor connection.",
  amberstone:
    "This two-story semi-modern brick-front home combines timeless craftsmanship with sleek, contemporary design elements. The all-brick facade features a blend of warm-toned bricks with subtle texture variations, creating a visually striking exterior. Clean lines and sharp angles define the structure, while minimalist trim and large windows add a modern touch to be your forever home.",
  bellastone:
    "A sleek semi-contemporary design that is both beautiful and functional, to be your forever home.",
  "casa-luna":
    "A true semi-contemporary statement piece that you can call your forever home.",
  "casa-inaya":
    "A true semi-contemporary statement piece that you can call your forever home.",
  "rana-haven":
    "A sleek semi-contemporary design that is both beautiful and functional, to be your forever home.",
  "villa-terra":
    "A sleek contemporary design that is both beautiful and functional, to be your forever home.",
  "villa-lana":
    "A single-story, three-bedroom semi-modern house blends clean lines, functional design, and sleek aesthetics, creating a stylish yet comfortable living space.",
  "villa-ivory":
    "A sleek semi-contemporary design that is both beautiful and functional, to be your forever home.",
  "villa-nia":
    "A sleek semi-contemporary design that is both beautiful and functional, to be your forever home.",
  "villa-spectra": "A stunning contemporary work of art.",
  "villa-zenith": "A true modern statement piece.",
  "villa-zoe": "A true modern statement piece.",
};

type IconKind = "area" | "garage" | "porch" | "bedrooms" | "bathrooms";

type SpecTile = {
  label: string;
  value: string;
  icon: IconKind;
};

async function getPlans() {
  return (await getCmsFloorPlans()) ?? ARIA_PLANS;
}

async function getPlan(slug: string) {
  const plans = await getPlans();
  return plans.find((plan) => plan.slug === slug) ?? getPlanBySlug(slug);
}

export async function generateStaticParams() {
  const plans = (await getPublishedCmsFloorPlans()) ?? ARIA_PLANS;
  return plans.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/floor-plans/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const plan = await getPlan(slug);
  if (!plan) {
    return { title: "Floor Plan Not Found | AriaLux Homes" };
  }

  const description = getPlanDescription(plan);

  return {
    title: `${plan.name} | AriaLux Homes Floor Plan`,
    description,
    openGraph: {
      title: `${plan.name} | AriaLux Homes`,
      description,
      images: [plan.hero],
    },
  };
}

function getPlanDescription(plan: AriaPlan): string {
  return plan.description ?? LIVE_PLAN_DESCRIPTIONS[plan.slug] ?? plan.shortBlurb;
}

function formatSqft(value: number): string {
  return value > 0 ? `${value.toLocaleString()} SQFT` : "Not listed";
}

function formatBaths(value: number): string {
  if (value % 1 === 0) return `${value} Bathrooms`;
  const whole = Math.floor(value);
  return `${whole} 1/2 Bathrooms`;
}

function buildSpecTiles(plan: AriaPlan): SpecTile[] {
  return [
    { label: "Living Area", value: formatSqft(plan.specs.living), icon: "area" },
    { label: "Garage", value: formatSqft(plan.specs.garage), icon: "garage" },
    { label: "Porch", value: formatSqft(plan.specs.porch), icon: "porch" },
    { label: "Total", value: formatSqft(plan.specs.total), icon: "area" },
    { label: "Bedrooms", value: `${plan.specs.bedrooms} Bedrooms`, icon: "bedrooms" },
    { label: "Bathrooms", value: formatBaths(plan.specs.bathrooms), icon: "bathrooms" },
  ];
}

function getGalleryImages(plan: AriaPlan): string[] {
  const images = plan.gallery.length > 0 ? plan.gallery : [plan.hero];
  return Array.from(new Set(images.filter(Boolean)));
}

const IMAGE_EXTENSIONS = new Set([
  ".avif",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".webp",
]);

const RESERVED_PLAN_ASSET_FOLDERS = new Set(["floor-map", "gallery", "mockup"]);

function getPublicFolderImages(
  slug: string,
  folder: string | string[],
  category: PlanGalleryImage["category"],
): PlanGalleryImage[] {
  const folderSegments = Array.isArray(folder) ? folder : folder.split("/");
  const absoluteFolder = path.join(
    process.cwd(),
    "public",
    "images",
    "floor-plans",
    slug,
    ...folderSegments,
  );

  if (!existsSync(absoluteFolder)) return [];

  return readdirSync(absoluteFolder, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((filename) => IMAGE_EXTENSIONS.has(path.extname(filename).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((filename) => ({
      category,
      src: `/images/floor-plans/${[slug, ...folderSegments, filename]
        .map((segment) => encodeURIComponent(segment))
        .join("/")}`,
    }));
}

function getBuiltExampleFolders(slug: string): string[] {
  const absoluteFolder = path.join(
    process.cwd(),
    "public",
    "images",
    "floor-plans",
    slug,
  );

  if (!existsSync(absoluteFolder)) return [];

  return readdirSync(absoluteFolder, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((folder) => !RESERVED_PLAN_ASSET_FOLDERS.has(folder.toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function getGalleryGroups(plan: AriaPlan): PlanGalleryGroup[] {
  const sanityGalleryGroup = getSanityGalleryGroup(plan);
  if (sanityGalleryGroup) return [sanityGalleryGroup];

  const folderGroups = getBuiltExampleFolders(plan.slug)
    .map((address) => {
      const images = [
        ...getPublicFolderImages(plan.slug, [address, "gallery"], "gallery"),
        ...getPublicFolderImages(
          plan.slug,
          [address, "floor-map", "2d"],
          "floor-plans",
        ),
        ...getPublicFolderImages(
          plan.slug,
          [address, "floor-map", "3d"],
          "3d-renders",
        ),
      ];

      return { address, images };
    })
    .filter((group) => group.images.length > 0);

  if (folderGroups.length > 0) return folderGroups;

  const rootImages = [
    ...getPublicFolderImages(plan.slug, "gallery", "gallery"),
    ...getPublicFolderImages(plan.slug, "floor-map/2d", "floor-plans"),
    ...getPublicFolderImages(plan.slug, "floor-map", "floor-plans"),
    ...getPublicFolderImages(plan.slug, "floor-map/3d", "3d-renders"),
  ];

  if (rootImages.length > 0) {
    return [{ address: "Gallery", images: rootImages }];
  }

  return [
    {
      address: "Gallery",
      images: getGalleryImages(plan).map((src) => ({ src, category: "gallery" })),
    },
  ];
}

function isPhontoImage(image: string): boolean {
  return decodeURIComponent(image).toLowerCase().includes("phonto-");
}

function getHeroAndGalleryFromFs(
  plan: AriaPlan,
  groups: PlanGalleryGroup[],
): { hero: string; gallery: string[] } {
  const allImages = groups.flatMap((g) => g.images);
  const gallerySrcs = allImages
    .filter((i) => i.category === "gallery")
    .map((i) => i.src);
  const allSrcs = allImages.map((i) => i.src);

  if (allSrcs.length === 0) {
    return { hero: plan.hero, gallery: [plan.hero] };
  }

  const hero =
    gallerySrcs.find((src) => !isPhontoImage(src)) ??
    allSrcs.find((src) => !isPhontoImage(src)) ??
    allSrcs[0] ??
    plan.hero;

  const nonPhonto = allSrcs.filter((src) => !isPhontoImage(src));
  const phonto = allSrcs.filter((src) => isPhontoImage(src));
  const preferred =
    nonPhonto.length > 0
      ? Array.from(new Set([hero, ...nonPhonto]))
      : Array.from(new Set([hero, ...phonto]));

  const gallery = [...preferred];
  let idx = 0;
  while (gallery.length < 7 && preferred.length > 0) {
    gallery.push(preferred[idx % preferred.length]);
    idx += 1;
  }

  return { hero, gallery: gallery.slice(0, 7) };
}

function SpecIcon({ kind, className = "h-8 w-8" }: { kind: IconKind; className?: string }) {
  const common = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.45,
    viewBox: "0 0 48 48",
    "aria-hidden": true,
  };

  switch (kind) {
    case "garage":
      return (
        <svg {...common}>
          <path d="M11 29h26l-3-8c-.6-1.6-1.8-2.4-3.6-2.4H17.6c-1.8 0-3 .8-3.6 2.4l-3 8Z" />
          <path d="M13 29v8h5v-4h12v4h5v-8" />
          <path d="M17 29h.2M31 29h.2" />
          <path d="M17 18.6 20 13h8l3 5.6" />
        </svg>
      );
    case "porch":
      return (
        <svg {...common}>
          <path d="M14 18h20M13 24h22M15 30h18" />
          <path d="M17 18v18M31 18v18M10 36h28" />
          <path d="M12 14h24" />
        </svg>
      );
    case "bedrooms":
      return (
        <svg {...common}>
          <path d="M10 32V18M38 32v-7c0-3-2-5-5-5H22v12" />
          <path d="M10 25h28M10 32h28M15 20h7v5h-7z" />
          <path d="M13 32v4M35 32v4" />
        </svg>
      );
    case "bathrooms":
      return (
        <svg {...common}>
          <path d="M13 25h26v2c0 5-4 9-9 9H22c-5 0-9-4-9-9v-2Z" />
          <path d="M17 36v4M34 36v4M18 25V13c0-3 2-5 5-5 2 0 3.7 1 4.5 2.6" />
          <path d="M26 14h6M25 17h8" />
        </svg>
      );
    case "area":
    default:
      return (
        <svg {...common}>
          <rect x="13" y="13" width="22" height="22" strokeDasharray="4 3" />
        </svg>
      );
  }
}

function SpecItem({ spec, index }: { spec: SpecTile; index: number }) {
  return (
    <div
      className={`flex min-h-[4.75rem] items-center gap-3 px-4 py-3 text-[#15120f] ${
        index === 0 ? "" : "lg:border-l lg:border-[#dfd3bd]"
      }`}
    >
      <span className="shrink-0 text-[#b58942]">
        <SpecIcon kind={spec.icon} />
      </span>
      <span>
        <span className="block text-[0.62rem] font-semibold uppercase leading-none tracking-[0.22em] text-[#171410]">
          {spec.label}
        </span>
        <span className="mt-2 block font-heading text-[1.22rem] font-normal leading-none text-[#15120f]">
          {spec.value}
        </span>
      </span>
    </div>
  );
}

export default async function PlanDetailPage(
  props: PageProps<"/floor-plans/[slug]">,
) {
  const { slug } = await props.params;
  const plan = await getPlan(slug);
  if (!plan) notFound();

  const description = getPlanDescription(plan);
  const specTiles = buildSpecTiles(plan);
  const galleryGroups = getGalleryGroups(plan);
  const { hero: heroImage, gallery: galleryImages } = getHeroAndGalleryFromFs(plan, galleryGroups);
  const featuredGallery = galleryImages[0] ?? heroImage;
  const thumbnailImages = galleryImages.slice(1, 7);

  return (
    <main className="min-h-screen bg-[#f8f4ec] text-[#15120f]">
      <SobhaHeader
        brand={ariaLuxBrand}
        menus={await getHeaderMenu()}
        hideLanguageSwitcher
      />

      <section className="relative overflow-hidden px-5 pb-0 pt-[6.15rem] sm:px-8 lg:px-11">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_14%,rgba(177,137,78,0.11),transparent_31%),radial-gradient(circle_at_3%_18%,rgba(255,255,255,0.92),transparent_42%)]"
        />
        <div className="relative mx-auto grid max-w-[90rem] gap-8 lg:grid-cols-[minmax(24rem,0.74fr)_minmax(0,1.26fr)] lg:items-start">
          <div className="pb-2 lg:pb-5">
            <div className="mb-5">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#a97530]">
                Floor Plan
              </p>
              <span
                aria-hidden="true"
                className="mt-4 block h-px w-32 bg-[#b58942]"
              />
            </div>
            <h1 className="font-heading text-[4.25rem] font-normal leading-[0.95] tracking-[-0.035em] text-[#090806] sm:text-[5.1rem] lg:text-[5.45rem]">
              {plan.displayName}
            </h1>
            <p className="mt-6 max-w-[32rem] text-base font-light leading-[1.65] text-[#15120f]/86">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/contact"
                className="inline-flex min-h-[2.85rem] min-w-[14.5rem] items-center justify-center gap-4 rounded-[0.2rem] bg-[#b58942] px-7 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white shadow-[0_10px_24px_-20px_rgba(181,137,66,0.85)] transition hover:bg-[#9f793b]"
              >
                Request Consultation
                <span aria-hidden="true">&rsaquo;</span>
              </a>
              <PlanGalleryDialog
                planName={plan.displayName}
                groups={galleryGroups}
                triggerClassName="inline-flex min-h-[2.85rem] min-w-[10.5rem] items-center justify-center gap-4 rounded-[0.2rem] border border-[#b58942]/72 bg-transparent px-7 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#a97530] transition hover:bg-[#b58942] hover:text-white"
              />
            </div>
          </div>

          <figure className="overflow-hidden rounded-[0.28rem] border border-[#b58942]/80 bg-[#f8f4ec] p-1 shadow-[0_20px_55px_-42px_rgba(80,60,36,0.72)]">
            <img
              src={heroImage}
              alt={plan.displayName}
              className="aspect-[2.36/1] h-full w-full rounded-[0.18rem] object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </figure>
        </div>
      </section>

      <section className="px-5 py-2 sm:px-8 lg:px-11">
        <div className="mx-auto grid max-w-[90rem] overflow-hidden rounded-[0.22rem] border border-[#ded1ba] bg-[#fbf7ef]/64 lg:grid-cols-[19.5rem_minmax(0,1fr)]">
          <div className="px-8 py-3 lg:border-r lg:border-[#ded1ba]">
            <h2 className="font-heading text-[1.35rem] font-normal uppercase leading-none tracking-[0.09em] text-[#15120f]">
              Plan Details
            </h2>
            <span
              aria-hidden="true"
              className="mt-2 block h-px w-8 bg-[#b58942]"
            />
            <p className="mt-2 text-[0.72rem] font-light leading-[1.32] text-[#15120f]/78">
              Thoughtfully designed for modern living with an open layout,
              private retreats, and timeless curb appeal. This plan can be
              customized to fit your lifestyle and lot.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-6">
            {specTiles.map((spec, index) => (
              <SpecItem key={spec.label} spec={spec} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="px-5 pb-2 pt-7 sm:px-8 lg:px-11">
        <div className="mx-auto max-w-[90rem]">
          <h2 className="font-heading text-[1.35rem] font-normal uppercase leading-none tracking-[0.08em] text-[#15120f]">
            Gallery
          </h2>
          <div className="mt-3 grid gap-7 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            <div className="overflow-hidden rounded-[0.28rem] bg-[#e9ddca]">
              <img
                src={featuredGallery}
                alt={`${plan.displayName} featured view`}
                loading="lazy"
                decoding="async"
                className="aspect-[2.25/1] h-full w-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {thumbnailImages.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className={`overflow-hidden rounded-[0.28rem] bg-[#e9ddca] ${
                    index === 0 ? "sm:col-span-2" : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`${plan.displayName} gallery view ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full object-cover ${
                      index === 0 ? "aspect-[2.35/1]" : "aspect-[1.2/1]"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-8 pt-1 sm:px-8 lg:px-11">
        <div className="mx-auto flex max-w-[90rem] flex-col gap-6 rounded-[0.18rem] bg-[#181715] px-8 py-3 text-white shadow-[0_20px_48px_-34px_rgba(0,0,0,0.86)] sm:flex-row sm:items-center sm:justify-between lg:px-11">
          <div className="flex items-center gap-7">
            <span
              aria-hidden="true"
              className="hidden h-9 w-px bg-[#b58942] sm:block"
            />
            <div>
              <h2 className="font-heading text-[1.45rem] font-normal leading-tight">
                Ready to build your forever home?
              </h2>
              <p className="mt-1 text-sm font-light text-white/72">
                Let&apos;s bring the {plan.name} to life on your lot.
              </p>
            </div>
          </div>
          <a
            href="/contact"
            className="inline-flex min-h-[2.8rem] min-w-[18rem] items-center justify-center gap-5 rounded-[0.16rem] bg-[#b58942] px-7 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-[#9f793b]"
          >
            Request Consultation
            <span aria-hidden="true">&rsaquo;</span>
          </a>
        </div>
      </section>

      <AriaLuxFooter />
    </main>
  );
}
