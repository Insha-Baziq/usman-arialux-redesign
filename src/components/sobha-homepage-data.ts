export type SobhaLocation = "Dubai" | "Abu Dhabi" | "UAQ" | "Fort Wayne, IN";

import { ARIA_PLANS } from "./arialux-data";

export type SobhaLink = {
  label: string;
  href: string;
};

export type SobhaMegaMenu = {
  label: string;
  href: string;
  image?: string;
  hasPanel?: boolean;
  columns: SobhaLink[][];
};

export type SobhaHeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  desktopImage: string;
  mobileImage: string;
  imageAlt: string;
  videoSrc?: string;
};

export type SobhaPillar = {
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
};

export type SobhaAmenity = {
  icon: string;
  label: string;
};

export type SobhaProperty = {
  location: SobhaLocation;
  title: string;
  href: string;
  imageUrl: string;
  mobileImageUrl: string;
  logoUrl?: string;
  amenities: SobhaAmenity[];
};

export type SobhaStickyWidget = {
  id: string;
  label: string;
  href: string;
  iconUrl: string;
};

export type SobhaPressRelease = {
  title: string;
  date: string;
  href: string;
  imageUrl: string;
  mobileImageUrl?: string;
};

export type SobhaFooterGroup = {
  title: string;
  links: SobhaLink[];
};

const SOBHA = "";

const asset = (path: string): string => path;

export const sobhaTopNavLeft: SobhaLink[] = [
  { label: "ABOUT", href: `${SOBHA}/about` },
  { label: "COMMUNITIES", href: `${SOBHA}/sobha-communities` },
  { label: "PROPERTIES", href: `${SOBHA}/properties-in-dubai` },
];

export const sobhaTopNavRight: SobhaLink[] = [
  { label: "MEDIA CENTER", href: `${SOBHA}/media-center/press-releases` },
  { label: "CAREERS", href: `${SOBHA}/career-opportunity` },
  { label: "CONTACT US", href: `${SOBHA}/contact-us` },
];

const menuLinks = (labels: string[]): SobhaLink[] => labels.map((label) => ({ label, href: "#" }));

export const sobhaMegaMenus: SobhaMegaMenu[] = [
  {
    label: "ABOUT",
    href: "#",
    image: `${SOBHA}/sites/default/files/styles/webp/public/2025-01/Menu.jpg.webp?itok=FCI9MK-E`,
    columns: [
      menuLinks(["Legacy", "Leadership", "Craftsmanship", "Thoughtful Design"]),
      menuLinks(["Signature Quality", "Sustainability", "Philanthropy"]),
    ],
  },
  {
    label: "COMMUNITIES",
    href: "#",
    image: `${SOBHA}/sites/default/files/styles/webp/public/2024-09/854x457%20%E2%80%93%203.jpg.webp?itok=icM6mWPp`,
    columns: [
      menuLinks([
        "Sobha Sanctuary",
        "Sobha Central",
        "Sobha Hartland II",
        "Sobha Elwood",
        "Sobha Hartland",
        "Sobha Reserve",
        "Sobha Solis",
        "Sobha Orbis",
        "Sobha SeaHaven",
        "The S",
        "Sobha One",
        "Verde By Sobha",
      ]),
    ],
  },
  {
    label: "PROPERTIES",
    href: "#",
    image: `${SOBHA}/sites/default/files/styles/webp/public/2024-09/854x457%20%E2%80%93%201.jpg.webp?itok=yOlgTlkn`,
    columns: [
      menuLinks(["Apartments", "Villas", "Villaments", "Penthouses"]),
    ],
  },
  {
    label: "MEDIA CENTER",
    href: "#",
    image: `${SOBHA}/sites/default/files/styles/webp/public/2025-03/MEDIA%20CENTER_1.jpg.webp?itok=UuLCgMsq`,
    columns: [
      menuLinks(["Press Releases", "Reports", "Investor Relations", "Investor Guide"]),
      menuLinks(["Blogs", "Testimonials", "Sobha Podcasts"]),
    ],
  },
  {
    label: "CAREERS",
    href: "#",
    hasPanel: false,
    image: `${SOBHA}/sites/default/files/styles/webp/public/2025-03/MEDIA%20CENTER_1.jpg.webp?itok=UuLCgMsq`,
    columns: [menuLinks(["Career Opportunities", "Life at Sobha", "Current Openings"])],
  },
  {
    label: "CONTACT US",
    href: "#",
    hasPanel: false,
    image: `${SOBHA}/sites/default/files/styles/webp/public/2025-01/Menu.jpg.webp?itok=FCI9MK-E`,
    columns: [menuLinks(["Contact Us", "Channel Partner", "Our Presence", "FAQ", "Digital Walkthrough"])],
  },
];

// =====================================================================
// Live header data (captured 2026-05-05 from the reference site).
// Richer schema supporting per-item hover images, tabbed mega-menus
// (COMMUNITIES → Dubai/Abu Dhabi/UAQ) and category panels with cards
// (PROPERTIES → Apartments/Villas/Villaments/Penthouses).
// `sobhaMegaMenus` above is preserved for backwards-compat but the
// header consumes `sobhaHeaderMenu` below.
// =====================================================================

export type SobhaHeaderItem = {
  label: string;
  href: string;
  hoverImage?: string;
};

export type SobhaHeaderTab = {
  id: string;
  label: string;
  items: SobhaHeaderItem[];
};

export type SobhaHeaderCategory = {
  label: string;
  href: string;
  cards: { title: string; imageUrl: string; href: string }[];
};

export type SobhaHeaderMenu = {
  label: string;
  href: string;
  kind: "simple" | "list" | "tabs" | "categories";
  defaultImage?: string;
  items?: SobhaHeaderItem[];
  tabs?: SobhaHeaderTab[];
  categories?: SobhaHeaderCategory[];
};

const slug = (s: string): string =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const sobhaHeaderMenu: SobhaHeaderMenu[] = [
  {
    label: "ABOUT",
    href: `${SOBHA}/about`,
    kind: "list",
    defaultImage: `${SOBHA}/sites/default/files/styles/webp/public/2025-01/Menu.jpg.webp?itok=FCI9MK-E`,
    items: [
      { label: "Legacy", href: `${SOBHA}/about/legacy` },
      { label: "Leadership", href: `${SOBHA}/about/leadership` },
      { label: "Craftsmanship", href: `${SOBHA}/about/craftsmanship` },
      { label: "Thoughtful Design", href: `${SOBHA}/about/thoughtful-design` },
      { label: "Signature Quality", href: `${SOBHA}/about/signature-quality` },
      { label: "Sustainability", href: `${SOBHA}/about/sustainability` },
      { label: "Philanthropy", href: `${SOBHA}/about/philanthropy` },
    ],
  },
  {
    label: "COMMUNITIES",
    href: `${SOBHA}/sobha-communities`,
    kind: "tabs",
    defaultImage: `${SOBHA}/sites/default/files/styles/webp/public/2024-09/854x457%20%E2%80%93%203.jpg.webp?itok=icM6mWPp`,
    tabs: [
      {
        id: "dubai",
        label: "Dubai",
        items: [
          { label: "Sobha Sanctuary", href: `${SOBHA}/our-communities/sobha-sanctuary`, hoverImage: asset("/sites/default/files/styles/webp/public/2026-02/Menu-image2X.jpg.webp?itok=fNK-wssm") },
          { label: "Sobha Central", href: `${SOBHA}/our-communities/sobha-central`, hoverImage: asset("/sites/default/files/styles/webp/public/2026-01/The%20Pinnacle.jpg.webp?itok=lSMKAzCZ") },
          { label: "Sobha Hartland II", href: `${SOBHA}/our-communities/sobha-hartland-ii`, hoverImage: asset("/sites/default/files/styles/webp/public/2026-01/Riverside%20Crescent.jpg.webp?itok=JJQRF3ux") },
          { label: "Sobha Elwood", href: `${SOBHA}/our-communities/sobha-elwood`, hoverImage: asset("/sites/default/files/styles/webp/public/2026-01/Sobha%20Elwood_0.jpg.webp?itok=rfgKgxHf") },
          { label: "Sobha Hartland", href: `${SOBHA}/our-communities/sobha-hartland`, hoverImage: asset("/sites/default/files/styles/webp/public/2026-01/Waves%20Opulence.jpg.webp?itok=uVDRSYEX") },
          { label: "Sobha Reserve", href: `${SOBHA}/our-communities/sobha-reserve`, hoverImage: asset("/sites/default/files/styles/webp/public/2026-01/Sobha%20Reserves-470x457%20%E2%80%93%201.jpg.webp?itok=GtNxfKLo") },
          { label: "Sobha Solis", href: `${SOBHA}/our-communities/sobha-solis`, hoverImage: asset("/sites/default/files/styles/webp/public/2026-01/SolisProperty.webp?itok=oBKLcGfg") },
          { label: "Sobha Orbis", href: `${SOBHA}/our-communities/sobha-orbis`, hoverImage: asset("/sites/default/files/styles/webp/public/2026-01/Sobha%20Orbis%20Prop.jpg.webp?itok=Sn3edfTb") },
          { label: "Sobha SeaHaven", href: `${SOBHA}/our-communities/sobha-seahaven`, hoverImage: asset("/sites/default/files/styles/webp/public/2026-01/SobhaSeahavenpropert.jpg.webp?itok=W0wCANPS") },
          { label: "The S", href: `${SOBHA}/our-communities/the-s`, hoverImage: asset("/sites/default/files/styles/webp/public/2026-01/Menu%20image%20The%20S.jpg.webp?itok=qrBZn5L5") },
          { label: "Sobha One", href: `${SOBHA}/our-communities/sobha-one`, hoverImage: asset("/sites/default/files/styles/webp/public/2026-01/The%20Element%20at%20Sobha%20One.jpg.webp?itok=lfFa5wgk") },
          { label: "Verde By Sobha", href: `${SOBHA}/our-communities/verde-by-sobha`, hoverImage: asset("/sites/default/files/styles/webp/public/2026-01/Verde%20By%20Sobha.jpg_0.webp?itok=_UPwALBn") },
        ],
      },
      {
        id: "abu-dhabi",
        label: "Abu Dhabi",
        items: [
          { label: "Sobha City", href: `${SOBHA}/our-communities/sobha-city`, hoverImage: asset("/sites/default/files/styles/webp/public/2026-04/River%20cove%20menu_0.jpg.webp?itok=5bNKk8GG") },
        ],
      },
      {
        id: "uaq",
        label: "UAQ",
        items: [
          { label: "Aquamont", href: `${SOBHA}/our-communities/aquamont`, hoverImage: asset("/sites/default/files/styles/webp/public/2026-01/Aquamonts.png.webp?itok=_FK6ghS_") },
          { label: "Sobha Siniya Island", href: `${SOBHA}/our-communities/sobha-siniya-island`, hoverImage: asset("/sites/default/files/styles/webp/public/2026-01/Beach%20Residences.jpg.webp?itok=PnKSqmtY") },
        ],
      },
    ],
  },
  {
    label: "PROPERTIES",
    href: `${SOBHA}/properties-in-dubai`,
    kind: "categories",
    defaultImage: `${SOBHA}/sites/default/files/styles/webp/public/2024-09/854x457%20%E2%80%93%201.jpg.webp?itok=yOlgTlkn`,
    categories: [
      {
        label: "Apartments",
        href: `${SOBHA}/apartments-for-sale-in-dubai`,
        cards: [
          { title: "River Cove Residences", imageUrl: asset("/sites/default/files/styles/webp/public/2026-04/River%20cove%20menu_0_0.jpg.webp?itok=UliPoATy"), href: `${SOBHA}/properties-in-abu-dhabi/sobha-city/river-cove-residences` },
        ],
      },
      {
        label: "Villas",
        href: `${SOBHA}/villas-for-sale-in-dubai`,
        cards: [
          { title: "The Orchard", imageUrl: asset("/sites/default/files/styles/webp/public/2026-04/the%20orchard%20menu%20%281%29_0.jpg.webp?itok=Jd1GiSpN"), href: `${SOBHA}/properties-in-abu-dhabi/sobha-city/the-orchard` },
        ],
      },
      {
        label: "Villaments",
        href: `${SOBHA}/villaments-for-sale-in-dubai`,
        cards: [
          { title: "Golf Ridges", imageUrl: asset("/sites/default/files/styles/webp/public/2024-09/Sobha%20One%20golf%20Ridges_3.jpg.webp?itok=eQsBTCCn"), href: `${SOBHA}/properties-in-dubai/sobha-one/golf-ridges` },
        ],
      },
      {
        label: "Penthouses",
        href: `${SOBHA}/penthouses-for-sale-in-dubai`,
        cards: [
          { title: "The S", imageUrl: asset("/sites/default/files/styles/webp/public/2025-02/Menu%20image%203x.jpg.webp?itok=GErrrua6"), href: `${SOBHA}/properties-in-dubai/the-s` },
        ],
      },
    ],
  },
  {
    label: "MEDIA CENTER",
    href: `${SOBHA}/media-center/press-releases`,
    kind: "list",
    defaultImage: `${SOBHA}/sites/default/files/styles/webp/public/2025-03/MEDIA%20CENTER_1.jpg.webp?itok=UuLCgMsq`,
    items: [
      { label: "Press Releases", href: `${SOBHA}/media-center/press-releases` },
      { label: "Reports", href: `${SOBHA}/media-center/reports` },
      { label: "Investor Relations", href: `${SOBHA}/media-center/investor-relations` },
      { label: "Investor Guide", href: `${SOBHA}/sobha-invest-in-dubai` },
      { label: "Blogs", href: `${SOBHA}/media-center/blogs` },
      { label: "Testimonials", href: `${SOBHA}/media-center/testimonials` },
      { label: "Sobha Podcasts", href: `${SOBHA}/media-center/sobha-podcasts` },
    ],
  },
  {
    label: "CAREERS",
    href: `${SOBHA}/career-opportunity`,
    kind: "simple",
  },
  {
    label: "CONTACT US",
    href: `${SOBHA}/contact-us`,
    kind: "simple",
  },
];

// Re-export the slug helper in case the header needs deterministic ids.
export const sobhaHeaderSlug = slug;

// AriaLux hero carousel — handpicked from the studio's Facebook gallery
// (public/images/facebook/hero-0X.jpg). Three featured exterior + interior shots.
export const sobhaHeroSlides: SobhaHeroSlide[] = [
  {
    id: "arialux-aria-heights",
    title: "ROOSEVELT RESERVES PHASE II",
    subtitle: "Spaces Where Life Unfolds",
    ctaLabel: "EXPLORE",
    ctaHref: "/floor-plans/aria-heights",
    desktopImage: "/images/facebook/hero-01.jpg",
    mobileImage: "/images/facebook/hero-01.jpg",
    imageAlt: "AriaLux Homes — Aria Heights estate exterior",
  },
  {
    id: "arialux-craftsmanship",
    title: "ARIALUX HOMES",
    subtitle: "Custom Builds. Quiet Confidence.",
    ctaLabel: "DISCOVER",
    ctaHref: "/portfolio",
    desktopImage: "/images/facebook/hero-02.jpg",
    mobileImage: "/images/facebook/hero-02.jpg",
    imageAlt: "AriaLux Homes — grand white-stone estate with reflecting pool",
  },
  {
    id: "arialux-floor-plans",
    title: "SIXTEEN FLOOR PLANS",
    subtitle: "Designed for the Way You Live",
    ctaLabel: "VIEW PLANS",
    ctaHref: "/all-floor-plans",
    desktopImage: "/images/facebook/hero-03.jpg",
    mobileImage: "/images/facebook/hero-03.jpg",
    imageAlt: "AriaLux Homes — modern residential architecture",
    videoSrc: "/videos/main-page.mp4",
  },
];

// Backwards-compat single hero export (first slide).
export const sobhaHero = {
  title: sobhaHeroSlides[0].title,
  subtitle: sobhaHeroSlides[0].subtitle,
  ctaLabel: sobhaHeroSlides[0].ctaLabel,
  ctaHref: sobhaHeroSlides[0].ctaHref,
  desktopImage: sobhaHeroSlides[0].desktopImage,
  mobileImage: sobhaHeroSlides[0].mobileImage,
};

/**
 * Live hero is a single static `home-banner` (img-only fallback when video is missing).
 * Captured from the reference site on 2026-05-04: Tranquil Beach Residences.
 * Overlay gradient: linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(66,98,118,0) 100%).
 */
export const sobhaHeroBanner: SobhaHeroSlide = {
  id: "tranquil-beach-residences-hero",
  title: "Tranquil Beach Residences",
  subtitle: "Where the Tide Sets the Tone",
  ctaLabel: "DISCOVER",
  ctaHref: `${SOBHA}/properties-in-dubai/sobha-siniya-island/beach-residences/tranquil-beach-residences`,
  desktopImage: `${SOBHA}/sites/default/files/styles/webp/public/2026-03/Desk%20Banner.jpg.webp?itok=Ky5YW6z7`,
  mobileImage: `${SOBHA}/sites/default/files/styles/webp/public/2026-03/mob%20Banner.jpg.webp?itok=QsUKMFtL`,
  imageAlt: "Tranquil Beach Residences",
};

export const sobhaArtDetail = {
  titleLines: ["THE ART", "of DETAIL"],
  copy:
    "At AriaLux Homes, we believe true excellence lives in the smallest decisions — the way a stair tread meets stone, how cabinetry returns into trim, the quiet weight of a custom door. Every plan is drawn in our own studio, every finish specified by hand, every home built to be lived in for a generation.",
  ctaLabel: "Discover More",
  ctaHref: "/who-we-are",
  backgroundImage: "/images/art-of-detail/art-of-detail-interior.jpeg",
  desktopLogo: "/images/arialux-wordmark.png",
  mobileLogo: "/images/arialux-wordmark.png",
  figureImage: "/images/art-of-detail/art-of-detail-interior.jpeg",
};

// Live h2 inside .new-launch-section .title-section
export const sobhaPillarsHeading = "FROM CONCEPT TO COMPLETION: HOW WE BUILD";
export const sobhaPropertiesHeading = "Explore Our Custom Floor Plans";
export const sobhaPressHeading = "Recent Builds";

export const sobhaPillars: SobhaPillar[] = [
  {
    title: "Architectural Services",
    description:
      "AriaLux Homes is both a custom builder and an in-house architectural firm. We design every plan from the ground up — siting, elevations, interior flow, structural detail — so the home you imagine and the home we build are the same drawing.",
    imageUrl: "/images/facebook/fb-0033.jpg",
    videoUrl: "/videos/video-2.mp4",
  },
  {
    title: "Custom Craftsmanship",
    description:
      "From hand-selected stone and bespoke cabinetry to door hardware and trim profiles, every surface is specified, sampled, and signed off by you. We build sixteen distinct floor plans across Fort Wayne — none of them feel templated.",
    imageUrl: "/images/facebook/fb-0049.jpg",
    videoUrl: "/videos/video-1.mp4",
  },
  {
    title: "Quiet Confidence",
    description:
      "Clean lines, warm materials, generous proportions. AriaLux homes carry a consistent design language across every build — modern without being cold, expensive without being loud. The kind of home that ages gracefully.",
    imageUrl: "/images/facebook/fb-0055.jpg",
    videoUrl: "/videos/video-3.mp4",
  },
];

export const sobhaPropertyLocations: SobhaLocation[] = ["Fort Wayne, IN"];

// AriaLux floor plans rendered through the Sobha "Properties" carousel.
// Amenities slot is reused to surface plan specs (bed/bath/sqft/garage).
const ariaSpecIcon = (label: string): string =>
  `/images/icons/${label}.svg`;

export const sobhaProperties: SobhaProperty[] = ARIA_PLANS.map((plan) => ({
  location: "Fort Wayne, IN",
  title: plan.displayName,
  href: `/floor-plans/${plan.slug}`,
  imageUrl: plan.hero,
  mobileImageUrl: plan.hero,
  amenities: [
    { icon: ariaSpecIcon("bed"), label: `${plan.specs.bedrooms} Bedrooms` },
    { icon: ariaSpecIcon("bath"), label: `${plan.specs.bathrooms} Bathrooms` },
    { icon: ariaSpecIcon("ruler"), label: `${plan.specs.living.toLocaleString()} SQFT Living` },
    { icon: ariaSpecIcon("car"), label: `${plan.specs.garage} SQFT Garage` },
  ],
}));

export const sobhaPropertyFloatingActions: SobhaLink[] = [
  { label: "WALKTHROUGH 360°", href: `${SOBHA}/digital-walkthrough` },
  { label: "CALL BACK", href: "/contact" },
  { label: "WHATSAPP", href: "https://wa.me/18327739544" },
];

export const sobhaStickyWidgets: SobhaStickyWidget[] = [
  {
    id: "call-back",
    label: "CALL BACK",
    href: "/contact",
    iconUrl: `${SOBHA}/themes/sobha_uplift/images/call-back-icon.svg`,
  },
  {
    id: "whatsapp",
    label: "WHATSAPP",
    href: "https://wa.me/18327739544",
    iconUrl: `${SOBHA}/themes/sobha_uplift/images/whatsapp-icon.svg`,
  },
];

// "Recent Builds" — replaces Sobha press releases. Sourced from ARIA_PLANS so the
// homepage strip surfaces real floor plans instead of fabricated PR copy.
export const sobhaPressReleases: SobhaPressRelease[] = ARIA_PLANS.slice(0, 6).map((plan) => ({
  title: plan.displayName,
  date: plan.tagline,
  href: `/floor-plans/${plan.slug}`,
  imageUrl: plan.hero,
}));

export const sobhaFooterGroups: SobhaFooterGroup[] = [
  {
    title: "APARTMENTS",
    links: [
      { label: "River Cove Residences", href: `${SOBHA}/properties-in-abu-dhabi/sobha-city/river-cove-residences` },
      { label: "Tranquil Beach Residences", href: `${SOBHA}/properties-in-dubai/sobha-siniya-island/beach-residences/tranquil-beach-residences` },
      { label: "Capeside Marina Residences", href: `${SOBHA}/properties-in-uaq/sobha-siniya-island/marina-residences/capeside` },
      { label: "The Pinnacle", href: `${SOBHA}/properties-in-dubai/sobha-central/the-pinnacle` },
      { label: "Skyvue Altier", href: `${SOBHA}/properties-in-dubai/sobha-hartland-2/skyvue/altier` },
      { label: "The Mirage", href: `${SOBHA}/properties-in-dubai/sobha-central/the-mirage` },
      { label: "Pearlside Marina Residences", href: `${SOBHA}/properties-in-uaq/sobha-siniya-island/marina-residences/pearlside` },
      { label: "The Tranquil", href: `${SOBHA}/properties-in-dubai/sobha-central/the-tranquil` },
      { label: "The Serene", href: `${SOBHA}/properties-in-dubai/sobha-central/the-serene` },
      { label: "Canalside Marina Residences", href: `${SOBHA}/properties-in-uaq/sobha-siniya-island/marina-residences/canalside` },
    ],
  },
  {
    title: "VILLAS",
    links: [
      { label: "The Orchard", href: `${SOBHA}/properties-in-abu-dhabi/sobha-city/the-orchard` },
      { label: "The Terraces", href: `${SOBHA}/properties-in-abu-dhabi/sobha-city/the-terraces` },
      { label: "The Willows", href: `${SOBHA}/properties-in-dubai/sobha-sanctuary/the-willows` },
      { label: "The Greens", href: `${SOBHA}/properties-in-dubai/sobha-sanctuary/the-greens` },
      { label: "The Brooks", href: `${SOBHA}/properties-in-dubai/sobha-sanctuary/the-brooks` },
      { label: "The Grove", href: `${SOBHA}/properties-in-dubai/sobha-sanctuary/the-grove` },
      { label: "Palm Grove Villas", href: `${SOBHA}/properties-in-uaq/sobha-siniya-island/beach-villas/palm-grove-villas` },
      { label: "Coral Beach Villas", href: `${SOBHA}/properties-in-uaq/sobha-siniya-island/beach-villas/coral-villas` },
      { label: "Sobha Elwood", href: `${SOBHA}/properties-in-dubai/sobha-elwood` },
      { label: "Sobha Reserve", href: `${SOBHA}/properties-in-dubai/sobha-reserve` },
    ],
  },
  {
    title: "COMMUNITIES",
    links: [
      { label: "Sobha City", href: `${SOBHA}/sobha-communities/sobha-city` },
      { label: "Sobha Sanctuary", href: `${SOBHA}/sobha-communities/sobha-sanctuary` },
      { label: "Sobha Central", href: `${SOBHA}/sobha-communities/sobha-central` },
      { label: "Downtown UAQ", href: `${SOBHA}/sobha-communities/uaq-downtown` },
      { label: "Sobha Siniya Island", href: `${SOBHA}/sobha-communities/sobha-siniya-island` },
      { label: "Sobha Hartland II", href: `${SOBHA}/sobha-communities/sobha-hartland-2` },
      { label: "Sobha Elwood", href: `${SOBHA}/sobha-communities/sobha-elwood` },
      { label: "Sobha Hartland", href: `${SOBHA}/sobha-communities/sobha-hartland` },
    ],
  },
  {
    title: "MEDIA CENTER",
    links: [
      { label: "Press Releases", href: `${SOBHA}/media-center/press-releases` },
      { label: "Blogs", href: `${SOBHA}/media-center/blogs` },
      { label: "Investor Relations", href: `${SOBHA}/media-center/investor-relations` },
      { label: "Reports", href: `${SOBHA}/media-center/reports` },
      { label: "Testimonials", href: `${SOBHA}/media-center/testimonials` },
      { label: "Sobha Podcasts", href: `${SOBHA}/sobha-podcasts` },
    ],
  },
  {
    title: "ABOUT US",
    links: [
      { label: "Legacy", href: `${SOBHA}/about/our-legacy` },
      { label: "Leadership Team", href: `${SOBHA}/about/our-leadership-team` },
      { label: "Craftsmanship", href: `${SOBHA}/about/craftsmanship` },
      { label: "Thoughtful Design", href: `${SOBHA}/about/thoughtful-design` },
      { label: "Signature Quality", href: `${SOBHA}/about/signature-quality` },
      { label: "Sustainability", href: `${SOBHA}/sustainability` },
      { label: "Philanthropy", href: `${SOBHA}/about/philanthropy` },
    ],
  },
  {
    title: "CONTACT US",
    links: [
      { label: "Contact Us", href: `${SOBHA}/contact-us` },
      { label: "Channel Partner", href: "/contact" },
      { label: "Careers", href: `${SOBHA}/career-opportunity` },
      { label: "OUR PRESENCE", href: "/contact" },
      { label: "FAQ", href: `${SOBHA}/faq` },
      { label: "Digital Walkthrough", href: `${SOBHA}/digital-walkthrough` },
    ],
  },
];

export const sobhaFooterAssets = {
  logo: `${SOBHA}/themes/sobha_uplift/images/footer-logo-v2.svg`,
  appIcon: `${SOBHA}/themes/sobha_uplift/images/s-one-app-logo.svg?v1`,
  appBadgeIos: `${SOBHA}/themes/sobha_uplift/images/app-store-bttn-mob-footer.svg?v1`,
  appBadgeAndroid: `${SOBHA}/themes/sobha_uplift/images/googleplay-bttn-footer.svg?v1`,
};

export const sobhaFooterSocials: SobhaLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/arialuxhomes/" },
  { label: "Facebook", href: "https://www.facebook.com/share/17oc9hFmYL/?mibextid=wwXIfr" },
  { label: "TikTok", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCKIR9isiNyYq1T0GSnIUyHQ" },
  { label: "Twitter", href: "#" },
  { label: "Threads", href: "#" },
];

export const sobhaFooterLegal: SobhaLink[] = [
  { label: "Privacy Policy", href: `${SOBHA}/privacy-policy` },
  { label: "Sitemap", href: `${SOBHA}/sitemap` },
];
