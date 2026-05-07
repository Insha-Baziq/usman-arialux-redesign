// AriaLux Homes shared data layer
// Sources verified at https://arialuxhomes.com (captured 2026-05-06).
// All assets reference AriaLux's WSimg CDN (img1.wsimg.com).

export type AriaLink = {
  label: string;
  href: string;
};

export type AriaSocialLink = AriaLink & {
  icon: "instagram" | "facebook" | "youtube" | "tiktok";
};

export type AriaPlanSpecs = {
  living: number;
  garage: number;
  porch: number;
  total: number;
  bedrooms: number;
  /** Total bathrooms incl. half (e.g. 3.5 = 3 full + 1 half). */
  bathrooms: number;
};

export type AriaPlanAddressGroup = {
  address: string;
  images: string[];
};

export type AriaPlan = {
  slug: string;
  /** Path used by AriaLux's live site (e.g. `/sierra-heights-1`). */
  livePath: string;
  name: string;
  /** Display heading; preserves accents. */
  displayName: string;
  tagline: string;
  shortBlurb: string;
  specs: AriaPlanSpecs;
  vimeoId?: string;
  vimeoHash?: string;
  hero: string;
  gallery: string[];
  addressGroups?: AriaPlanAddressGroup[];
  /** Featured on `/all-floor-plans` first viewport (true = visible before "Show More"). */
  featuredOnListing?: boolean;
  /** Featured on homepage card grid. */
  featuredOnHome?: boolean;
};

export type AriaGalleryItem = {
  src: string;
  alt: string;
};

export type AriaVideoItem = {
  vimeoId: string;
  vimeoHash: string;
  title: string;
};

export type AriaFooterGroup = {
  title: string;
  links: AriaLink[];
};

const CDN_BASE = "https://img1.wsimg.com/isteam/ip/3260288d-1180-4f25-980c-7e6bbf1754ec";
const CDN_TX = "/:/rs=w:1280,h:960,m";

const img = (filename: string): string => {
  // WSimg uses URL-encoded filenames with spaces preserved as %20.
  const encoded = encodeURIComponent(filename).replace(/%2F/g, "/");
  return `${CDN_BASE}/${encoded}${CDN_TX}`;
};

const heroImg = (filename: string): string => {
  const encoded = encodeURIComponent(filename).replace(/%2F/g, "/");
  return `${CDN_BASE}/${encoded}/:/rs=w:1920,h:1080,m`;
};

export const ARIA_BRAND = {
  name: "AriaLux Homes",
  tagline: "Custom Home Builder | Architectural Firm",
  city: "Fort Wayne, IN",
  phone: "260-600-9221",
  phoneHref: "tel:+12606009221",
  email: "BUILD@ARIALUXHOMES.COM",
  emailHref: "mailto:build@arialuxhomes.com",
  address: "6985 Starks Blvd, Fort Wayne, Indiana 46816",
  hoursLabel: "Mon - Sun  09:00 am - 05:00 pm",
  hoursToday: "Open today  09:00 am - 05:00 pm",
  logoLight: "/images/arialux-logo-white.png",
  logoDark: "/images/arialux-logo-black.png",
  copyright: "Copyright © 2025 AriaLux Homes - All Rights Reserved.",
} as const;

export const ARIA_NAV: AriaLink[] = [
  { label: "Home", href: "/" },
  { label: "Interior Finishes", href: "/interior-finishes" },
  { label: "Floor Plans", href: "/all-floor-plans" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Video", href: "/video" },
  { label: "Architectural Services", href: "/architectural-services" },
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Contact", href: "/contact" },
];

export const ARIA_SOCIAL: AriaSocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/arialuxhomes/", icon: "instagram" },
  { label: "Facebook", href: "https://www.facebook.com/AriaLuxHomes", icon: "facebook" },
];

// ---------------------------------------------------------------------------
// Floor plans (16 total)
// Specs and bed/bath counts verified per `research/arialux-plans-detail.md`.
// Slugs use kebab-case ASCII; livePath mirrors AriaLux's actual URL pattern.
// ---------------------------------------------------------------------------

export const ARIA_PLANS: AriaPlan[] = [
  {
    slug: "aria-heights",
    livePath: "/aria-heights",
    name: "Aria Heights",
    displayName: "Aria Heights",
    tagline:
      "A statement-piece estate home where contemporary geometry meets warm, livable scale.",
    shortBlurb:
      "Six bedrooms across 3,733 SQFT of living space — designed for multi-generational families who value both grandeur and intimacy.",
    specs: { living: 3733, garage: 455, porch: 79, total: 4267, bedrooms: 6, bathrooms: 3.5 },
    hero: heroImg("phonto-2026e06.jpeg"),
    gallery: [
      "phonto-2026e06.jpeg",
      "IMG_5368.jpeg",
      "IMG_5363.jpeg",
      "IMG_5366.jpeg",
      "IMG_5365.jpeg",
      "IMG_5364.jpeg",
    ].map(img),
    addressGroups: [{ address: "3331 Vantage View Dr", images: [] }],
    featuredOnHome: true,
    featuredOnListing: true,
  },
  {
    slug: "alena-heights",
    livePath: "/aléna-heights",
    name: "Aléna Heights",
    displayName: "Aléna Heights",
    tagline: "Our most expansive estate plan — where every gathering has its own room.",
    shortBlurb:
      // NOTE: AriaLux's live page lists 10 BR / 4.5 BA in 4,070 SQFT living. Verify against the floor-plan PDF before publishing.
      "An estate-scale residence with ten bedrooms and four-and-a-half baths across 4,070 SQFT of living area.",
    specs: { living: 4070, garage: 527, porch: 51, total: 4648, bedrooms: 10, bathrooms: 4.5 },
    hero: heroImg("phonto-14e9252.jpeg"),
    gallery: [
      "phonto-14e9252.jpeg",
      "phonto-9ce1309.jpeg",
      "phonto-efb1ecd.jpeg",
      "IMG_5447.jpeg",
      "IMG_5445.jpeg",
      "IMG_5433.jpeg",
    ].map(img),
    featuredOnListing: true,
  },
  {
    slug: "amberstone",
    livePath: "/amberstone",
    name: "Amberstone",
    displayName: "Amberstone",
    tagline:
      "A flagship semi-contemporary plan with two completed builds you can tour today.",
    shortBlurb:
      "Six bedrooms, three-and-a-half baths, and 2,473 SQFT of living space across two built homes on Starks Blvd and Churchill Dr.",
    specs: { living: 2473, garage: 431, porch: 54, total: 2958, bedrooms: 6, bathrooms: 3.5 },
    vimeoId: "1039358014",
    hero: heroImg("phonto-6c8cc83.jpeg"),
    gallery: [
      "phonto-6c8cc83.jpeg",
      "IMG_5373.jpeg",
      "IMG_5374.jpeg",
      "IMG_5372.jpeg",
      "IMG_3727.jpeg",
      "IMG_9151-7a2eb99.jpeg",
      "phonto-2ecd45c.jpeg",
      "IMG_9172.jpeg",
      "IMG_2386.jpeg",
      "IMG_1261.jpeg",
      "IMG_8030.jpeg",
      "IMG_8028.jpeg",
      "IMG_8031.jpeg",
      "IMG_8029.jpeg",
      "IMG_8040.jpeg",
      "IMG_8039.jpeg",
      "IMG_5010.jpeg",
      "IMG_5013.jpeg",
      "IMG_5009.jpeg",
      "IMG_5011.jpeg",
      "IMG_5012.jpeg",
      "IMG_3833.jpeg",
      "IMG_0435.jpeg",
      "IMG_3800.jpeg",
      "IMG_9146.jpeg",
      "IMG_9148.jpeg",
      "IMG_9147.jpeg",
      "IMG_9149.jpeg",
      "IMG_9609.jpeg",
      "IMG_9152.jpeg",
      "IMG_9151.jpeg",
      "phonto-8dd9736.jpeg",
      "phonto-39704c9.jpeg",
      "IMG_5022.jpeg",
      "IMG_5021.jpeg",
      "IMG_5027.jpeg",
      "IMG_4525.jpeg",
      "IMG_4404.jpeg",
      "IMG_4524.jpeg",
      "IMG_4403.jpeg",
      "IMG_4982.jpeg",
      "IMG_3782.jpeg",
    ].map(img),
    addressGroups: [
      { address: "6985 Starks Blvd", images: [] },
      { address: "5717 Churchill Dr", images: [] },
    ],
    featuredOnHome: true,
    featuredOnListing: true,
  },
  {
    slug: "bellastone",
    livePath: "/bellastone",
    name: "Bellastone",
    displayName: "Bellastone",
    tagline: "Family-scale living with a generous primary suite and oversized garage.",
    shortBlurb:
      "Four bedrooms and a 724 SQFT garage make Bellastone our most accommodating mid-size plan.",
    specs: { living: 2627, garage: 724, porch: 100, total: 3451, bedrooms: 4, bathrooms: 2.5 },
    hero: heroImg("phonto-1ed1ca9.jpeg"),
    gallery: [
      "phonto-1ed1ca9.jpeg",
      "9baeb6c9-a139-460a-9b48-997356a3a463.jpeg",
      "aea9b0cf-8c82-4888-8f80-c0d56ce29ec0.jpeg",
      "IMG_9623.jpeg",
      "IMG_9638.jpeg",
      "IMG_3728.jpeg",
      "IMG_3731.jpeg",
      "IMG_3730.jpeg",
      "a85e3301-11d5-466c-8126-40a8ef7ea5fd-52d2355.jpeg",
      "IMG_8866-b4e6c2c.jpeg",
      "IMG_3098.jpeg",
      "IMG_8299.jpeg",
      "IMG_2573.jpeg",
      "IMG_3163.jpeg",
    ].map(img),
    addressGroups: [{ address: "5924 Wayne Trace", images: [] }],
    featuredOnHome: true,
    featuredOnListing: true,
  },
  {
    slug: "casa-luna",
    livePath: "/casa-luna",
    name: "Casa Luna",
    displayName: "Casa Luna",
    tagline:
      "A luminous six-bedroom plan that opens onto an expansive great room.",
    shortBlurb:
      "Six bedrooms, three-and-a-half baths, and 3,222 SQFT of living space anchored by a vaulted central living core.",
    specs: { living: 3222, garage: 431, porch: 54, total: 3707, bedrooms: 6, bathrooms: 3.5 },
    hero: heroImg("phonto-0187e95.jpeg"),
    gallery: ["phonto-0187e95.jpeg", "IMG_3750.jpeg", "IMG_3751.jpeg"].map(img),
    featuredOnHome: true,
    featuredOnListing: true,
  },
  {
    slug: "casa-ria",
    livePath: "/casa-ria",
    name: "Casa Ria",
    displayName: "Casa Ria",
    tagline: "A versatile five-bedroom layout with covered front porch.",
    shortBlurb:
      "Five bedrooms, two-and-a-half baths, and 3,550 SQFT of living space — proportioned for hosting and everyday flow alike.",
    specs: { living: 3550, garage: 455, porch: 105, total: 4110, bedrooms: 5, bathrooms: 2.5 },
    hero: heroImg("phonto-1125770.jpeg"),
    gallery: [
      "phonto-1125770.jpeg",
      "phonto-3d0d79c.jpeg",
      "phonto-c804687.jpeg",
      "phonto-414e11b.jpeg",
      "IMG_5347.jpeg",
    ].map(img),
    featuredOnListing: true,
  },
  {
    slug: "casa-inaya",
    livePath: "/casa-inaya",
    name: "Casa Inaya",
    displayName: "Casa Inaya",
    tagline:
      "A true semi-contemporary statement piece that you can call your forever home.",
    shortBlurb:
      "Four bedrooms, two-and-a-half baths, and 2,088 SQFT of efficient, family-scaled living.",
    specs: { living: 2088, garage: 415, porch: 88, total: 2591, bedrooms: 4, bathrooms: 2.5 },
    hero: heroImg("phonto-32ce93e.jpeg"),
    gallery: [
      "phonto-32ce93e.jpeg",
      "phonto-5e38221.jpeg",
      "IMG_5249.jpeg",
      "IMG_5251.jpeg",
      "IMG_5252.jpeg",
    ].map(img),
  },
  {
    slug: "rana-haven",
    livePath: "/rana-haven",
    name: "Rana Haven",
    displayName: "Rana Haven",
    tagline: "A modern starter home with the proportions of a custom build.",
    shortBlurb:
      "Four bedrooms in 2,088 SQFT — Rana Haven is our entry into custom living.",
    specs: { living: 2088, garage: 415, porch: 88, total: 2591, bedrooms: 4, bathrooms: 2.5 },
    hero: heroImg("phonto-e24d2ca.jpeg"),
    gallery: [
      "phonto-e24d2ca.jpeg",
      "phonto-e2ed1d0.jpeg",
      "IMG_5089.jpeg",
      "phonto-1d7f998.jpeg",
      "IMG_5088.jpeg",
      "phonto-746d1b3.jpeg",
      "IMG_5093.jpeg",
      "IMG_5091.jpeg",
    ].map(img),
    featuredOnHome: true,
    featuredOnListing: true,
  },
  {
    slug: "sierra-heights",
    livePath: "/sierra-heights-1",
    name: "Sierra Heights",
    displayName: "Sierra Heights",
    tagline: "A balanced five-bedroom plan with elevated curb presence.",
    shortBlurb:
      "Five bedrooms, three-and-a-half baths, and 2,615 SQFT of living space framed by a 546 SQFT garage.",
    specs: { living: 2615, garage: 546, porch: 88, total: 3161, bedrooms: 5, bathrooms: 3.5 },
    hero: heroImg("phonto-5d39bb6.jpeg"),
    gallery: [
      "phonto-5d39bb6.jpeg",
      "phonto-c7cce57.jpeg",
      "IMG_5385.jpeg",
      "IMG_5171.jpeg",
      "IMG_5387.jpeg",
      "IMG_5386.jpeg",
    ].map(img),
    featuredOnListing: true,
  },
  {
    slug: "villa-terra",
    livePath: "/villa-terra",
    name: "Villa Terra",
    displayName: "Villa Terra",
    tagline:
      "Our most-built plan — Villa Terra has shaped four blocks of Fort Wayne and counting.",
    shortBlurb:
      "Five bedrooms and 2,222 SQFT of living, refined across four completed builds at Seddlemeyer, Trentman, and Starks.",
    specs: { living: 2222, garage: 415, porch: 106, total: 2743, bedrooms: 5, bathrooms: 2.5 },
    hero: heroImg("phonto-1ad0c7f.jpeg"),
    gallery: [
      "phonto-1ad0c7f.jpeg",
      "IMG_3765.jpeg",
      "IMG_3759.jpeg",
      "IMG_3764.jpeg",
      "IMG_3762.jpeg",
      "phonto-e7202ec.jpeg",
      "phonto-2af5a2f.jpeg",
      "2047 V4.jpg",
      "5a60ec6b-f757-4730-ad48-3258bab2c01e.jpeg",
      "IMG_2307-2dbb050.jpeg",
      "IMG_2310-13a5ecb.jpeg",
      "IMG_2308.jpeg",
      "IMG_2309-1307cf2.jpeg",
      "IMG_2189.jpeg",
      "IMG_2194.jpeg",
      "IMG_2184.jpeg",
      "IMG_2180.jpeg",
      "IMG_2198.jpeg",
      "IMG_2200.jpeg",
      "acb756af-5cea-4379-b9ed-8739cfa76428.jpeg",
      "64f7fa0a-51cc-4c69-9b61-a7604022a7cc.jpeg",
      "IMG_2559.jpeg",
      "IMG_1945.jpeg",
      "IMG_2865.jpeg",
      "IMG_2447.jpeg",
      "RenderedImage.jpeg",
      "IMG_3001.jpeg",
      "IMG_1051.jpeg",
      "IMG_1037.jpeg",
      "2047 V4.jpeg",
      "IMG_1940.jpeg",
      "IMG_8918.jpeg",
      "IMG_8917.jpeg",
      "IMG_8738.jpeg",
      "IMG_8736.jpeg",
      "IMG_8744.jpeg",
      "IMG_8748.jpeg",
      "IMG_8757.jpeg",
      "IMG_8739.jpeg",
      "IMG_8758.jpeg",
      "IMG_8740.jpeg",
      "IMG_8761.jpeg",
      "IMG_8777.jpeg",
      "IMG_8745.jpeg",
      "IMG_8782.jpeg",
      "IMG_8771.jpeg",
      "IMG_8772.jpeg",
      "IMG_0389.jpeg",
      "IMG_0090.jpeg",
      "IMG_0092.jpeg",
    ].map(img),
    addressGroups: [
      { address: "2017 Seddlemeyer Ave", images: [] },
      { address: "2047 Seddlemeyer Ave", images: [] },
      { address: "7425 Trentman Rd", images: [] },
      { address: "7132 Starks Blvd", images: [] },
    ],
    featuredOnHome: true,
    featuredOnListing: true,
  },
  {
    slug: "villa-lana",
    livePath: "/villa-lana",
    name: "Villa Lana",
    displayName: "Villa Lana",
    tagline: "Compact luxury — every inch considered, nothing wasted.",
    shortBlurb:
      "Three bedrooms in 1,450 SQFT, paired with an oversized 415 SQFT garage.",
    specs: { living: 1450, garage: 415, porch: 51, total: 1916, bedrooms: 3, bathrooms: 2 },
    hero: heroImg("phonto-6edd633.jpeg"),
    gallery: [
      "phonto-6edd633.jpeg",
      "IMG_5108.jpeg",
      "IMG_5103.jpeg",
      "phonto-665a7a5.jpeg",
      "IMG_5106.jpeg",
      "phonto-238dfa0.jpeg",
    ].map(img),
    featuredOnListing: true,
  },
  {
    slug: "villa-ivory",
    livePath: "/villa-ivory",
    name: "Villa Ivory",
    displayName: "Villa Ivory",
    tagline:
      "A sleek semi-contemporary design that is both beautiful and functional, to be your forever home.",
    shortBlurb:
      "Five bedrooms, two-and-a-half baths, and 2,000 SQFT of living — Villa Ivory is the most-loved single-story in our collection, with six completed builds.",
    specs: { living: 2000, garage: 387, porch: 83, total: 2470, bedrooms: 5, bathrooms: 2.5 },
    hero: heroImg("phonto-54b9166.jpeg"),
    gallery: [
      "phonto-54b9166.jpeg",
      "phonto-b5e5be3.jpeg",
      "phonto-c6d9848.jpeg",
      "phonto-f49e5c4.jpeg",
      "45' single story house.rvt.jpeg",
      "45' single story house.rvt-357f0c6.jpeg",
      "45' single story house.rvt (2).jpeg",
      "45' single story house.rvt (5).jpeg",
      "IMG_0420-fe7c625.jpeg",
      "IMG_0420-ff16e9c.jpeg",
      "IMG_0421.jpeg",
      "IMG_0424.jpeg",
      "IMG_0425.jpeg",
      "IMG_1727.jpeg",
      "IMG_1728.jpeg",
      "IMG_1729.jpeg",
      "IMG_1730.jpeg",
      "IMG_1731.jpeg",
      "IMG_2877.png",
      "IMG_3820-411bad7.jpeg",
      "IMG_4248.jpeg",
      "IMG_4253.jpeg",
      "IMG_4640-c0cd6c9.webp",
      "IMG_4640-c6c5308.webp",
      "IMG_5322.jpeg",
      "IMG_5323.jpeg",
      "IMG_5324.jpeg",
      "IMG_5325.jpeg",
      "IMG_5326.jpeg",
      "IMG_5338.jpeg",
      "IMG_9913.jpeg",
      "IMG_9915.jpeg",
      "IMG_9916.jpeg",
      "IMG_9917.jpeg",
      "AB1A2C1D-10C9-4030-9C99-EB234D157AE8.jpeg",
    ].map(img),
    addressGroups: [
      { address: "7041 Starks Blvd", images: [] },
      { address: "7007 Starks Blvd", images: [] },
      { address: "7186 Starks Blvd", images: [] },
      { address: "4118 Plaza Dr", images: [] },
      { address: "2023 Seddlemeyer Ave", images: [] },
      { address: "2041 Seddlemeyer Ave", images: [] },
    ],
    featuredOnHome: true,
    featuredOnListing: true,
  },
  {
    slug: "villa-nia",
    livePath: "/villa-nia",
    name: "Villa Nia",
    displayName: "Villa Nia",
    tagline: "A right-sized contemporary plan for the way you actually live.",
    shortBlurb:
      "Three bedrooms in 1,120 SQFT — Villa Nia proves that smaller can still feel custom.",
    specs: { living: 1120, garage: 0, porch: 33, total: 1151, bedrooms: 3, bathrooms: 2 },
    hero: heroImg("phonto-70f1343.jpeg"),
    gallery: [
      "phonto-70f1343.jpeg",
      "IMG_5420.jpeg",
      "IMG_5418.jpeg",
      "IMG_5422.jpeg",
      "IMG_5421.jpeg",
      "IMG_5419.jpeg",
      "IMG_0880.jpeg",
      "IMG_0212.jpeg",
    ].map(img),
    addressGroups: [{ address: "3726 South Park Dr", images: [] }],
    featuredOnListing: true,
  },
  {
    slug: "villa-spectra",
    livePath: "/villa-spectra",
    name: "Villa Spectra",
    displayName: "Villa Spectra",
    tagline: "A statement five-bedroom plan with elevated entry massing.",
    shortBlurb:
      "Five bedrooms, two-and-a-half baths, and 3,550 SQFT of living space.",
    specs: { living: 3550, garage: 455, porch: 105, total: 4110, bedrooms: 5, bathrooms: 2.5 },
    hero: heroImg("phonto-917ee1c.jpeg"),
    gallery: [
      "phonto-917ee1c.jpeg",
      "IMG_5294.jpeg",
      "IMG_5295.jpeg",
      "IMG_5297.jpeg",
      "IMG_5296.jpeg",
      "IMG_5298.jpeg",
    ].map(img),
    featuredOnHome: true,
    featuredOnListing: true,
  },
  {
    slug: "villa-zenith",
    livePath: "/villa-zenith",
    name: "Villa Zenith",
    displayName: "Villa Zenith",
    tagline: "A four-bedroom plan engineered for tight, walkable lots.",
    shortBlurb:
      "Four bedrooms and 2,406 SQFT — Villa Zenith fits where larger plans cannot, without giving up scale.",
    specs: { living: 2406, garage: 422, porch: 29, total: 2857, bedrooms: 4, bathrooms: 2.5 },
    hero: heroImg("IMG_0491.jpeg"),
    gallery: [
      "IMG_0491.jpeg",
      "IMG_0490.jpeg",
      "IMG_0492.jpeg",
      "IMG_0121.jpeg",
      "IMG_0489.jpeg",
      "IMG_0493.jpeg",
      "IMG_2709.png",
    ].map(img),
    addressGroups: [{ address: "5705 Churchill Dr", images: [] }],
    featuredOnListing: true,
  },
  {
    slug: "villa-zoe",
    livePath: "/villa-zoé",
    name: "Villa Zoé",
    displayName: "Villa Zoé",
    tagline: "A seven-bedroom plan for the largest families on our roster.",
    shortBlurb:
      "Seven bedrooms, three full baths, and 3,550 SQFT of living — Villa Zoé closes our collection at the top end of capacity.",
    specs: { living: 3550, garage: 455, porch: 105, total: 4110, bedrooms: 7, bathrooms: 3 },
    hero: heroImg("phonto-caea834.jpeg"),
    gallery: [
      "phonto-caea834.jpeg",
      "IMG_5406.jpeg",
      "IMG_5404.jpeg",
      "IMG_5405.jpeg",
      "IMG_5408.jpeg",
    ].map(img),
  },
];

export const getPlanBySlug = (slug: string): AriaPlan | undefined =>
  ARIA_PLANS.find((plan) => plan.slug === slug);

// ---------------------------------------------------------------------------
// Floor Plans listing page (`/all-floor-plans`)
// ---------------------------------------------------------------------------

export const ARIA_LISTING = {
  heading:
    "We offer a variety of beautifully designed floor plans. We can also accommodate you by designing a custom floor plan that will suit your needs. Anything that you can imagine, we can bring to life.",
  ctaLabel: "REQUEST A CUSTOM FLOOR PLAN",
  ctaHref: "/contact",
} as const;

// ---------------------------------------------------------------------------
// Interior Finishes (`/interior-finishes`)
// ---------------------------------------------------------------------------

export const ARIA_INTERIOR_FINISHES = {
  heading: "A Gallery of Our Custom Interior Finishes",
  // AUTHORED: AriaLux's live page has zero descriptive copy — added on-brand intro.
  intro:
    "From hand-selected stone to bespoke cabinetry, every surface in an AriaLux home is specified, sampled, and signed off by you. This is a working gallery of finishes pulled from completed builds across Fort Wayne.",
  images: [
    "F37186E9-057E-4D51-A824-DA7317336D1E.jpeg",
    "IMG_1610.jpeg",
    "IMG_3159.jpeg",
    "IMG_3782.jpeg",
    "IMG_4396.jpeg",
    "IMG_4524.jpeg",
    "IMG_5021.jpeg",
    "phonto-009314f.jpeg",
    "phonto-29714a8.jpeg",
    "phonto-4c0eed1.jpeg",
    "phonto-688343f.jpeg",
    "phonto-68fcf05.jpeg",
    "phonto-792441d.jpeg",
    "phonto-b705c41.jpeg",
    "phonto-d4aaee3.jpeg",
    "phonto-d531cdc.jpeg",
    "phonto-de2a347.jpeg",
    "phonto-e6c2dcf.jpeg",
    "phonto-edaae4a.jpeg",
    "phonto-f897d80.jpeg",
  ].map<AriaGalleryItem>((src) => ({ src: img(src), alt: "AriaLux Homes interior finish detail" })),
} as const;

// ---------------------------------------------------------------------------
// Portfolio (`/portfolio`)
// ---------------------------------------------------------------------------

export const ARIA_PORTFOLIO = {
  heading: "A TOUCH OF MODERNISM",
  // AUTHORED: source page has H1 only — added intro to mirror Sobha's portfolio density.
  intro:
    "Every AriaLux home tells the same story in a different voice — clean lines, warm materials, and a quiet confidence in the proportions. Browse the work below to see how the same design language adapts across lots, families, and budgets.",
  images: [
    "IMG_0426.JPEG",
    "IMG_0427.JPEG",
    "IMG_0428.JPEG",
    "IMG_0433.JPG",
    "IMG_0434.JPEG",
    "IMG_0435.JPEG",
    "IMG_1259.JPEG",
    "IMG_1357 (1).jpeg",
    "IMG_3762.jpeg",
    "IMG_4640.webp",
    "IMG_5088.jpeg",
    "IMG_5089.jpeg",
    "IMG_5093.jpeg",
    "IMG_5103.jpeg",
    "IMG_5106.jpeg",
    "IMG_5108.jpeg",
    "IMG_5292.jpeg",
    "IMG_5294.jpeg",
    "IMG_5295.jpeg",
    "IMG_5296.jpeg",
    "IMG_5297.jpeg",
    "IMG_5298.jpeg",
    "IMG_6315.jpeg",
    "IMG_6380.jpeg",
    "IMG_8654.JPEG",
    "IMG_8866-b4e6c2c.jpeg",
    "IMG_9172.JPEG",
    "IMG_9710.jpeg",
    "IMG_9711.jpeg",
    "IMG_9713.jpeg",
    "IMG_9714.jpeg",
    "IMG_9715.jpeg",
    "IMG_9718.jpeg",
    "IMG_9719.jpeg",
    "phonto-1ad0c7f.jpeg",
    "phonto-1d7f998.jpeg",
    "phonto-238dfa0.jpeg",
    "phonto-665a7a5.jpeg",
    "phonto-6edd633.jpeg",
    "phonto-917ee1c.jpeg",
    "phonto-d836382.jpeg",
  ].map<AriaGalleryItem>((src) => ({ src: img(src), alt: "AriaLux Homes built-home photo" })),
} as const;

// ---------------------------------------------------------------------------
// Video gallery (`/video`)
// ---------------------------------------------------------------------------

export const ARIA_VIDEOS: AriaVideoItem[] = [
  { vimeoId: "1001832837", vimeoHash: "bd3f41d7c8", title: "AriaLux Homes — Brand Reel" },
  { vimeoId: "1069221614", vimeoHash: "6c1300b731", title: "AriaLux Homes — Walkthrough" },
  { vimeoId: "1068324122", vimeoHash: "632a66c564", title: "AriaLux Homes — Build Tour" },
  { vimeoId: "1068324603", vimeoHash: "b3f450595c", title: "AriaLux Homes — Interior Detail" },
  { vimeoId: "1068324850", vimeoHash: "782c5a80d0", title: "AriaLux Homes — Exterior Tour" },
  { vimeoId: "1068339694", vimeoHash: "c5f17b2925", title: "AriaLux Homes — Owner Story" },
  { vimeoId: "1068340218", vimeoHash: "a174262c6d", title: "AriaLux Homes — Process" },
  { vimeoId: "1068341436", vimeoHash: "e6adda1b3a", title: "AriaLux Homes — Behind the Build" },
];

export const ARIA_VIDEOS_PAGE = {
  heading: "Video",
  intro:
    "Brand films, walkthroughs, and process footage from across the AriaLux portfolio. Press play to see how a custom home becomes a forever home.",
} as const;

// ---------------------------------------------------------------------------
// Architectural Services (`/architectural-services`)
// ---------------------------------------------------------------------------

export const ARIA_ARCHITECTURAL = {
  heading: "Architectural Services",
  lead:
    "Bring your ideas and visions to life. Let's sit down, and design your forever home with our architects. We offer architectural floor plan designs for both home owners and builders.",
  ctaLabel: "SCHEDULE A FREE CONSULTATION",
  ctaHref: "/contact",
  // AUTHORED: source page has only H1 + lead + CTA. Added a service breakdown to match Sobha's information density.
  services: [
    {
      title: "Discovery & Concept",
      description:
        "We start with a free consultation to understand your lot, your lifestyle, and the way you actually want to live. From there we sketch initial massing studies and three concept directions for you to react to.",
    },
    {
      title: "Schematic Design",
      description:
        "Approved concepts move into measured floor plans, exterior elevations, and rough material palettes. You'll see your home from every angle before a single wall is framed.",
    },
    {
      title: "Construction Documents",
      description:
        "Final permit-ready drawings, structural coordination, and a detailed specification book that any qualified builder can build from — yours or ours.",
    },
    {
      title: "Builder Hand-off",
      description:
        "If you're building with AriaLux, this is seamless. If not, we package the documents, host a Q&A with your builder of choice, and remain on call through framing.",
    },
  ],
  reviewsHeading: "Reviews",
  reviewsNote:
    // AUTHORED: live AriaLux page embeds a third-party reviews widget that wasn't statically extractable.
    "Client reviews from across our completed builds in Fort Wayne and the surrounding region.",
  socialHeading: "Connect With Us",
  hero: heroImg("phonto-d836382.jpeg"),
  detail: heroImg("phonto-bf2dd12.jpeg"),
} as const;

// ---------------------------------------------------------------------------
// Who We Are (`/who-we-are`)
// ---------------------------------------------------------------------------

export const ARIA_WHO_WE_ARE = {
  heading: "Our Mission",
  mission:
    "At AriaLux Homes, we are more than just a builder; we are here to build innovative, functional, and practical homes that are for now and ever. Our dedication to building modern, high-quality homes shines through every project we undertake. From the initial consultation to the final touches, we focus on every detail with the utmost care and precision. Each home we build is not just a structure; it's a dream realized, designed to stand the test of time. We pride ourselves on our commitment to excellence, ensuring that every client receives a home that blends timeless elegance with touches of modernism. At AriaLux Homes, you are guaranteed a forever home that will reflect your vision and exceeds your expectations.",
  // AUTHORED: source page is a single mission paragraph — added pillars in AriaLux's voice to match Sobha "About" density.
  pillars: [
    {
      title: "Forever Construction",
      description:
        "We build the way our grandparents did — with the materials and methods we'd want in our own homes, decades from now.",
    },
    {
      title: "One Conversation",
      description:
        "From the first sketch to the final walk-through, you talk to the same team. No layers, no hand-offs, no telephone game.",
    },
    {
      title: "Local Roots",
      description:
        "AriaLux is Fort Wayne, born and built. Every plan in our collection is engineered for Indiana lots, codes, and weather.",
    },
  ],
  hero: "/images/who-we-are-hero.png",
} as const;

// ---------------------------------------------------------------------------
// Contact (`/contact`)
// ---------------------------------------------------------------------------

export const ARIA_CONTACT = {
  heading: "Contact Us",
  formLead: "Take the next step towards building your forever home with our team",
  bodyLead:
    "Better yet, come see us in person to get a tour of our builds! We love our customers, so feel free to reach out for a free consultation",
  napHeading: "AriaLux Homes",
  hoursWeekly: [
    { day: "Mon", hours: "09:00 am - 05:00 pm" },
    { day: "Tue", hours: "09:00 am - 05:00 pm" },
    { day: "Wed", hours: "09:00 am - 05:00 pm" },
    { day: "Thu", hours: "09:00 am - 05:00 pm" },
    { day: "Fri", hours: "09:00 am - 05:00 pm" },
    { day: "Sat", hours: "09:00 am - 05:00 pm" },
    { day: "Sun", hours: "09:00 am - 05:00 pm" },
  ],
  socialHeading: "Connect With Us",
  recaptchaNotice:
    "This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.",
} as const;

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export const ARIA_FOOTER_GROUPS: AriaFooterGroup[] = [
  {
    title: "Company",
    links: [
      { label: "Who We Are", href: "/who-we-are" },
      { label: "Architectural Services", href: "/architectural-services" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "All Floor Plans", href: "/all-floor-plans" },
      { label: "Interior Finishes", href: "/interior-finishes" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Video", href: "/video" },
    ],
  },
  {
    title: "Featured Plans",
    links: ARIA_PLANS.filter((p) => p.featuredOnHome).map((p) => ({
      label: p.name,
      href: `/floor-plans/${p.slug}`,
    })),
  },
];

export const FEATURED_HOME_PLANS = ARIA_PLANS.filter((p) => p.featuredOnHome);
export const LISTING_PLANS = ARIA_PLANS.filter((p) => p.featuredOnListing);

// ==========================================================================
// Mega-menu data — matches the SobhaHeaderMenu schema (re-exported from
// SobhaChrome) so AriaLux pages can reuse the exact Sobha header/footer
// chrome with AriaLux content.
//
// Tab grouping for FLOOR PLANS:
//   - "Estates" (4+ BR, ≥ 3,500 SQFT total)
//   - "Residences" (≤ 3 BR or < 3,500 SQFT total)
// All 16 plans are listed; each carries its own hover image (the plan hero).
// ==========================================================================

export type AriaHeaderItem = {
  label: string;
  href: string;
  hoverImage?: string;
};

export type AriaHeaderTab = {
  id: string;
  label: string;
  items: AriaHeaderItem[];
};

export type AriaHeaderCategory = {
  label: string;
  href: string;
  cards: { title: string; imageUrl: string; href: string }[];
};

export type AriaHeaderMenu = {
  label: string;
  href: string;
  kind: "simple" | "list" | "tabs" | "categories";
  defaultImage?: string;
  items?: AriaHeaderItem[];
  tabs?: AriaHeaderTab[];
  categories?: AriaHeaderCategory[];
};

const planItem = (p: AriaPlan): AriaHeaderItem => ({
  label: p.displayName,
  href: `/floor-plans/${p.slug}`,
  hoverImage: p.hero,
});

// Real arialuxhomes.com nav (8 items, mostly direct anchors). Only FLOOR PLANS
// keeps a panel because it actually has children on the live site.
export const ARIA_HEADER_MENU: AriaHeaderMenu[] = [
  { label: "HOME", href: "/", kind: "simple" },
  { label: "INTERIOR FINISHES", href: "/interior-finishes", kind: "simple" },
  {
    label: "FLOOR PLANS",
    href: "/all-floor-plans",
    kind: "list",
    defaultImage: ARIA_PLANS[0]?.hero,
    items: [
      { label: "ALL FLOOR PLANS", href: "/all-floor-plans" },
      ...ARIA_PLANS.map(planItem),
    ],
  },
  { label: "CONTACT", href: "/contact", kind: "simple" },
  { label: "PORTFOLIO", href: "/portfolio", kind: "simple" },
  { label: "VIDEO", href: "/video", kind: "simple" },
  {
    label: "ARCHITECTURAL SERVICES",
    href: "/architectural-services",
    kind: "simple",
  },
  { label: "WHO WE ARE", href: "/who-we-are", kind: "simple" },
];
