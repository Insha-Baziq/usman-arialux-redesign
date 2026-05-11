import { createReadStream, existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

import { createClient } from "next-sanity";
import ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function loadEnvFile(fileName) {
  const envPath = path.join(root, fileName);
  if (!existsSync(envPath)) return;

  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^['"]|['"]$/g, "");
    process.env[key] ??= value;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-09";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
}

if (!token) {
  throw new Error("Missing SANITY_API_WRITE_TOKEN");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  perspective: "raw",
  useCdn: false,
});

function loadAriaData() {
  const sourcePath = path.join(root, "src", "components", "arialux-data.ts");
  const source = readFileSync(sourcePath, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const commonjsModule = { exports: {} };
  const sandbox = {
    module: commonjsModule,
    exports: commonjsModule.exports,
  };

  vm.runInNewContext(output, sandbox, { filename: sourcePath });
  return commonjsModule.exports;
}

const aria = loadAriaData();

const heroSlides = [
  {
    key: "home-hero-slide-0",
    id: "arialux-floor-plans",
    title: "CURATED FLOOR PLANS",
    subtitle: "Designed for the Way You Live",
    ctaLabel: "EXPLORE",
    ctaHref: "/all-floor-plans",
    image: "public/images/facebook/hero-preview.jpg",
    imageAlt: "AriaLux Homes - modern residential architecture",
    videoFile: "public/videos/hero-video.mp4",
    order: 20,
  },
  {
    key: "home-hero-slide-1",
    id: "arialux-aria-heights",
    title: "BUILDING HOMES THAT ARE FOR NOW & EVER",
    subtitle: "Spaces Where Life Unfolds",
    ctaLabel: "EXPLORE",
    ctaHref: "/interior-finishes",
    image: "public/images/facebook/fallback-02.jpg",
    imageAlt: "AriaLux Homes - Aria Heights estate exterior",
    videoFile: "public/videos/hero-02.mp4",
    order: 10,
  },
  {
    key: "home-hero-slide-2",
    id: "arialux-craftsmanship",
    title: "ARIALUX HOMES",
    subtitle: "Custom Builds. Quiet Confidence.",
    ctaLabel: "DISCOVER",
    ctaHref: "/portfolio",
    image: "public/images/facebook/hero-09.JPG",
    imageAlt: "AriaLux Homes - grand white-stone estate with reflecting pool",
    order: 30,
  },
];

const pillars = [
  {
    key: "home-pillar-architectural-services",
    title: "Architectural Services",
    description:
      "AriaLux Homes is both a custom builder and an in-house architectural firm. We design every plan from the ground up - siting, elevations, interior flow, structural detail - so the home you imagine and the home we build are the same drawing.",
    image: "public/images/facebook/fb-0033.jpg",
    imageAlt: "Architectural services by AriaLux Homes",
    videoFile: "public/videos/video-2.mp4",
    order: 10,
  },
  {
    key: "home-pillar-custom-craftsmanship",
    title: "Custom Craftsmanship",
    description:
      "From hand-selected stone and bespoke cabinetry to door hardware and trim profiles, every surface is specified, sampled, and signed off by you. We build twenty-three distinct floor plans across Fort Wayne - none of them feel templated.",
    image: "public/images/facebook/fb-0049.jpg",
    imageAlt: "Custom craftsmanship by AriaLux Homes",
    videoFile: "public/videos/video-1.mp4",
    order: 20,
  },
  {
    key: "home-pillar-quiet-confidence",
    title: "Quiet Confidence",
    description:
      "Clean lines, warm materials, generous proportions. AriaLux homes carry a consistent design language across every build - modern without being cold, expensive without being loud. The kind of home that ages gracefully.",
    image: "public/images/facebook/fb-0055.jpg",
    imageAlt: "Quiet luxury custom home by AriaLux Homes",
    videoFile: "public/videos/video-3.mp4",
    order: 30,
  },
];

const artOfDetail = {
  eyebrow: "THE ART / of DETAIL",
  heading: "THE ART / of DETAIL",
  body:
    "Every home is shaped through proportion, material, and restraint. From first sketch to final finish, each decision is made to feel composed, durable, and distinctly personal.",
  image: "public/images/art-of-detail/ENHANCED.jpg",
  imageAlt: "Luxury interior with marble kitchen island and gold chandelier",
};

const architectureVideo = {
  posterImage: "public/images/architectural-services/schematic-design.webp",
  imageAlt: "Architectural design preview",
  videoFile: "public/videos/architect.mp4",
};

const architectureServices = [
  {
    title: "Discovery & Concept",
    description:
      "We start with a consultation to understand your lot, lifestyle, goals, and architectural vision. This phase establishes the design direction and overall concept for your future home.",
    image: "public/images/architectural-services/discovery-concept.webp",
    imageAlt: "Architectural discovery and concept planning",
  },
  {
    title: "Schematic Design",
    description:
      "Approved concepts move into measured floor plans, exterior elevations, and layout refinement. We shape spaces that are both beautiful and functional.",
    image: "public/images/architectural-services/schematic-design.webp",
    imageAlt: "Schematic architectural design preview",
  },
  {
    title: "Construction Documents",
    description:
      "Final permit-ready drawings, detailed specifications, and technical coordination are prepared for execution, helping bring the design to life with clarity and precision.",
    image: "public/images/architectural-services/construction-documents.webp",
    imageAlt: "Construction documents and permit-ready drawings",
  },
];

const videos = [
  { vimeoId: "1001832837", vimeoHash: "bd3f41d7c8", title: "AriaLux Homes - Brand Reel", order: 10 },
  { vimeoId: "1069221614", vimeoHash: "6c1300b731", title: "AriaLux Homes - Walkthrough", order: 20 },
  { vimeoId: "1068324122", vimeoHash: "632a66c564", title: "AriaLux Homes - Build Tour", order: 30 },
  { vimeoId: "1068324603", vimeoHash: "b3f450595c", title: "AriaLux Homes - Interior Detail", order: 40 },
  { vimeoId: "1068324850", vimeoHash: "782c5a80d0", title: "AriaLux Homes - Exterior Tour", order: 50 },
  { vimeoId: "1068339694", vimeoHash: "c5f17b2925", title: "AriaLux Homes - Owner Story", order: 60 },
  { vimeoId: "1068340218", vimeoHash: "a174262c6d", title: "AriaLux Homes - Process", order: 70 },
  { vimeoId: "1068341436", vimeoHash: "e6adda1b3a", title: "AriaLux Homes - Behind the Build", order: 80 },
];

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function richTextBlock(text, key = "block") {
  return [
    {
      _key: key,
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: `${key}-span`,
          _type: "span",
          text,
          marks: [],
        },
      ],
    },
  ];
}

async function uploadAsset(type, relativePath) {
  if (!relativePath) return undefined;

  const absolutePath = path.join(root, relativePath);
  if (!existsSync(absolutePath)) {
    throw new Error(`Missing asset: ${relativePath}`);
  }

  let asset;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      asset = await client.assets.upload(type, createReadStream(absolutePath), {
        filename: path.basename(relativePath),
      });
      break;
    } catch (error) {
      if (attempt === 3) throw error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
    }
  }

  return {
    _type: "reference",
    _ref: asset._id,
  };
}

async function imageWithAlt(relativePath, alt) {
  const asset = await uploadAsset("image", relativePath);
  return {
    _type: "imageWithAlt",
    image: {
      _type: "image",
      asset,
    },
    alt,
  };
}

async function fileAsset(relativePath) {
  const asset = await uploadAsset("file", relativePath);
  return {
    _type: "file",
    asset,
  };
}

async function videoAsset(relativePath, caption) {
  if (!relativePath) return undefined;

  return {
    _type: "videoAsset",
    source: "sanityFile",
    file: await fileAsset(relativePath),
    caption,
  };
}

function cta(label, href) {
  return {
    _type: "cta",
    label,
    link: {
      _type: "link",
      label,
      kind: "internalPath",
      path: href,
    },
    style: "primary",
  };
}

function internalLink(label, href) {
  return {
    _type: "link",
    label,
    kind: "internalPath",
    path: href,
  };
}

function externalLink(label, href) {
  return {
    _type: "link",
    label,
    kind: "external",
    url: href,
    openInNewTab: true,
  };
}

function linkFromHref(label, href) {
  if (href.startsWith("mailto:")) {
    return {
      _type: "link",
      label,
      kind: "email",
      email: href.replace("mailto:", ""),
    };
  }

  if (href.startsWith("tel:")) {
    return {
      _type: "link",
      label,
      kind: "phone",
      phone: href.replace("tel:", ""),
    };
  }

  if (href.startsWith("http")) return externalLink(label, href);
  return internalLink(label, href);
}

function navigationItem(item, index) {
  return {
    _key: `nav-${index}-${slugify(item.label)}`,
    _type: "navigationItem",
    link: internalLink(item.label, item.href),
    children: (item.items ?? []).map((child, childIndex) => ({
      _key: `nav-${index}-child-${childIndex}-${slugify(child.label)}`,
      _type: "navigationChildItem",
      link: internalLink(child.label, child.href),
    })),
  };
}

function imageUrlObject(src, alt, key) {
  return {
    _key: key,
    _type: "object",
    src,
    alt,
  };
}

function featureItem(title, description, key) {
  return {
    _key: key,
    _type: "object",
    title,
    description,
  };
}

function normalizedCategory(category) {
  const allowed = new Set(["Buying", "Design", "Construction", "Floor Plans"]);
  return allowed.has(category) ? category : "Design";
}

async function resetSeededDocuments() {
  const documents = await client.fetch(
    `*[
      _type == "page" ||
      _type in [
        "video",
        "floorPlan",
        "portfolioItem",
        "article",
        "galleryItem"
      ] ||
      _id in [
        "page-home",
        "drafts.page-home",
        "mediaSettings",
        "drafts.mediaSettings",
        "siteSettings",
        "drafts.siteSettings",
        "navigation-primary",
        "drafts.navigation-primary",
        "navigation-footer",
        "drafts.navigation-footer"
      ]
    ]{_id, _type}`,
  );

  if (documents.length === 0) return 0;

  const priority = new Map([
    ["siteSettings", 0],
    ["page", 1],
    ["mediaSettings", 2],
    ["navigationMenu", 3],
    ["article", 4],
    ["floorPlan", 4],
    ["portfolioItem", 4],
    ["galleryItem", 4],
    ["video", 4],
  ]);

  const sortedDocuments = documents.sort((a, b) => {
    const aPriority = priority.get(a._type) ?? 10;
    const bPriority = priority.get(b._type) ?? 10;
    return aPriority - bPriority || a._id.localeCompare(b._id);
  });

  const priorityGroups = Map.groupBy(sortedDocuments, (document) => priority.get(document._type) ?? 10);
  for (const [, group] of Array.from(priorityGroups.entries()).sort(([a], [b]) => a - b)) {
    let transaction = client.transaction();
    for (const document of group) {
      transaction = transaction.delete(document._id);
    }
    await transaction.commit();
  }

  return documents.length;
}

const deletedCount = await resetSeededDocuments();

const pageHeroSlides = await Promise.all(
  heroSlides.map(async (slide) => ({
    _key: slide.key,
    _type: "object",
    id: slide.id,
    title: slide.title,
    subtitle: slide.subtitle,
    cta: cta(slide.ctaLabel, slide.ctaHref),
    image: await imageWithAlt(slide.image, slide.imageAlt),
    mobileImage: await imageWithAlt(slide.image, slide.imageAlt),
    video: await videoAsset(slide.videoFile, slide.title),
    order: slide.order,
  })),
);

const pagePillars = await Promise.all(
  pillars.map(async (pillar) => ({
    _key: pillar.key,
    _type: "object",
    title: pillar.title,
    description: pillar.description,
    image: await imageWithAlt(pillar.image, pillar.imageAlt),
    video: await videoAsset(pillar.videoFile, pillar.title),
    link: {
      _type: "link",
      label: "Learn more",
      kind: "internalPath",
      path: "/architectural-services",
    },
  })),
);

const homepageHeroSlides = await Promise.all(
  heroSlides.map(async (slide) => ({
    _key: `media-${slide.key}`,
    _type: "object",
    id: slide.id,
    title: slide.title,
    subtitle: slide.subtitle,
    ctaLabel: slide.ctaLabel,
    ctaHref: slide.ctaHref,
    desktopImage: await imageWithAlt(slide.image, slide.imageAlt),
    mobileImage: await imageWithAlt(slide.image, slide.imageAlt),
    videoFile: slide.videoFile ? await fileAsset(slide.videoFile) : undefined,
    order: slide.order,
  })),
);

const homepagePillars = await Promise.all(
  pillars.map(async (pillar) => ({
    _key: `media-${pillar.key}`,
    _type: "object",
    title: pillar.title,
    description: pillar.description,
    image: await imageWithAlt(pillar.image, pillar.imageAlt),
    videoFile: await fileAsset(pillar.videoFile),
    order: pillar.order,
  })),
);

await client.createOrReplace({
  _id: "page-home",
  _type: "page",
  title: "Home",
  slug: {
    _type: "slug",
    current: "home",
  },
  status: "published",
  template: "home",
  showInSitemap: true,
  sections: [
    {
      _key: "home-hero-carousel",
      _type: "heroCarouselSection",
      slides: pageHeroSlides,
    },
    {
      _key: "home-art-detail",
      _type: "textImageSection",
      eyebrow: artOfDetail.eyebrow,
      heading: artOfDetail.heading,
      body: richTextBlock(artOfDetail.body, "home-art-detail-body"),
      image: await imageWithAlt(artOfDetail.image, artOfDetail.imageAlt),
      imagePosition: "right",
    },
    {
      _key: "home-pillars",
      _type: "cardGridSection",
      eyebrow: "FROM CONCEPT TO COMPLETION",
      heading: "FROM CONCEPT TO COMPLETION: HOW WE BUILD",
      theme: "light",
      cards: pagePillars,
    },
  ],
});

await client.createOrReplace({
  _id: "page-contact",
  _type: "page",
  title: "Contact",
  slug: {
    _type: "slug",
    current: "contact",
  },
  status: "published",
  template: "contact",
  showInSitemap: true,
  sections: [
    {
      _key: "contact-main",
      _type: "contactSection",
      eyebrow: "Let's Connect",
      heading: aria.ARIA_CONTACT.heading,
      description: `${aria.ARIA_CONTACT.formLead}. We're here to answer your questions.`,
      image: await imageWithAlt(
        "public/images/who-we-are-hero-v1.webp",
        "AriaLux Homes - featured custom build",
      ),
      detailHeading: "Better yet, come see us in person to get a tour of our builds!",
      detailBody: "We love our customers, so feel free to reach out for a free consultation.",
      notice: aria.ARIA_CONTACT.recaptchaNotice,
      showForm: true,
      showContactDetails: true,
    },
  ],
});

await client.createOrReplace({
  _id: "page-who-we-are",
  _type: "page",
  title: "Who We Are",
  slug: {
    _type: "slug",
    current: "who-we-are",
  },
  status: "published",
  template: "builder",
  showInSitemap: true,
  sections: [
    {
      _key: "who-we-are-mission",
      _type: "textImageSection",
      eyebrow: "AriaLux Homes",
      heading: aria.ARIA_WHO_WE_ARE.heading,
      body: richTextBlock(aria.ARIA_WHO_WE_ARE.mission, "who-we-are-mission-body"),
      image: await imageWithAlt("public/images/who-we-are-hero-v1.webp", "AriaLux Homes"),
      imagePosition: "left",
    },
    {
      _key: "who-we-are-cta",
      _type: "ctaBandSection",
      heading: "Build with AriaLux",
      description:
        "Schedule a free consultation and let's start designing the home that will outlast trends, generations, and time itself.",
      backgroundImage: await imageWithAlt(
        "public/images/floor-plans/alena-heights/gallery/IMG_5433.jpeg",
        "AriaLux Homes custom home",
      ),
      ctas: [cta("Start the Conversation", "/contact")],
    },
  ],
});

await client.createOrReplace({
  _id: "page-architectural-services",
  _type: "page",
  title: "Architectural Services",
  slug: {
    _type: "slug",
    current: "architectural-services",
  },
  status: "published",
  template: "builder",
  showInSitemap: true,
  sections: [
    {
      _key: "architectural-hero",
      _type: "heroSection",
      eyebrow: "Design & build",
      heading: aria.ARIA_ARCHITECTURAL.heading,
      subheading:
        "Thoughtful design. Timeless architecture. We bring your custom home vision to life with a seamless process from concept to construction, crafted around your lifestyle and the way you live.",
      backgroundImage: await imageWithAlt(
        "public/images/arialux-gallery/phonto-d836382.jpeg",
        "AriaLux architectural services",
      ),
      alignment: "left",
      ctas: [cta(aria.ARIA_ARCHITECTURAL.ctaLabel, aria.ARIA_ARCHITECTURAL.ctaHref)],
    },
    {
      _key: "architectural-services-cards",
      _type: "cardGridSection",
      heading: "From First Sketch to Final Permit",
      theme: "light",
      cards: await Promise.all(
        architectureServices.map(async (service, index) => ({
          _key: `architectural-service-${index}`,
          _type: "object",
          title: service.title,
          description: service.description,
          image: await imageWithAlt(service.image, service.imageAlt),
        })),
      ),
    },
    {
      _key: "architectural-video",
      _type: "videoGridSection",
      heading: "See Our Craft in Motion",
    },
    {
      _key: "architectural-included",
      _type: "featureListSection",
      heading: "What's Included",
      items: [
        featureItem("Detailed Floor Plans", "", "included-0"),
        featureItem("Exterior Elevations", "", "included-1"),
        featureItem("Design Consultation", "", "included-2"),
        featureItem("Construction Documentation", "", "included-3"),
        featureItem("Permit-Ready Drawings", "", "included-4"),
        featureItem("Builder Collaboration", "", "included-5"),
      ],
    },
    {
      _key: "architectural-why",
      _type: "featureListSection",
      heading: "Why Build With Us",
      items: [
        featureItem("Bespoke Design", "Custom homes tailored to your vision, lot, and lifestyle.", "why-0"),
        featureItem(
          "Builder-Ready Documents",
          "Clear, accurate plans that streamline permitting and construction.",
          "why-1",
        ),
        featureItem(
          "Collaborative Service",
          "We partner with you and your builder for a seamless building experience.",
          "why-2",
        ),
      ],
    },
    {
      _key: "architectural-bottom-cta",
      _type: "ctaBandSection",
      heading: "Let's design a home that's distinctly yours.",
      description: "Every detail, every line - crafted around you.",
      ctas: [cta("Request a Consultation", "/contact")],
    },
  ],
});

await Promise.all(
  aria.ARIA_PLANS.map((plan, index) =>
    client.createOrReplace({
      _id: `floorPlan-${plan.slug}`,
      _type: "floorPlan",
      title: plan.displayName,
      slug: {
        _type: "slug",
        current: plan.slug,
      },
      livePath: plan.livePath,
      status: "published",
      featuredOnHome: Boolean(plan.featuredOnHome),
      featuredOnListing: plan.featuredOnListing !== false,
      listingOrder: (index + 1) * 10,
      tagline: plan.tagline,
      summary: plan.shortBlurb,
      description: richTextBlock(plan.shortBlurb, `${plan.slug}-description`),
      specs: {
        _type: "floorPlanSpecs",
        beds: plan.specs.bedrooms,
        baths: plan.specs.bathrooms,
        squareFeet: plan.specs.living,
        garageSquareFeet: plan.specs.garage,
        porchSquareFeet: plan.specs.porch,
        totalSquareFeet: plan.specs.total,
      },
      heroImageUrl: plan.hero,
      cardImageUrl: plan.hero,
      galleryUrls: plan.gallery.map((src, imageIndex) =>
        imageUrlObject(
          src,
          `${plan.displayName} gallery image ${imageIndex + 1}`,
          `${plan.slug}-gallery-${imageIndex}`,
        ),
      ),
      video: plan.vimeoId
        ? {
            _type: "object",
            vimeoId: plan.vimeoId,
            vimeoHash: plan.vimeoHash,
            caption: plan.displayName,
          }
        : undefined,
      availableAt: (plan.addressGroups ?? []).map((group, groupIndex) => ({
        _key: `${plan.slug}-address-${groupIndex}`,
        _type: "addressGroup",
        title: group.address,
        addresses: [group.address],
      })),
    }),
  ),
);

await Promise.all(
  aria.ARIA_PORTFOLIO.images.map((image, index) =>
    client.createOrReplace({
      _id: `portfolio-${index + 1}`,
      _type: "portfolioItem",
      title: `Portfolio image ${index + 1}`,
      slug: {
        _type: "slug",
        current: `portfolio-image-${index + 1}`,
      },
      category: "exterior",
      imageUrl: image.src,
      caption: image.alt,
      featured: true,
      order: (index + 1) * 10,
    }),
  ),
);

await Promise.all(
  aria.ARIA_PORTFOLIO.images.map((image, index) =>
    client.createOrReplace({
      _id: `galleryItem-portfolio-${index + 1}`,
      _type: "galleryItem",
      title: `Portfolio gallery image ${index + 1}`,
      gallery: "portfolio",
      imageUrl: image.src,
      alt: image.alt,
      order: (index + 1) * 10,
    }),
  ),
);

await Promise.all(
  aria.ARIA_INTERIOR_FINISHES.images.map((image, index) =>
    client.createOrReplace({
      _id: `galleryItem-interior-finishes-${index + 1}`,
      _type: "galleryItem",
      title: `Interior finish image ${index + 1}`,
      gallery: "interior-finishes",
      imageUrl: image.src,
      alt: image.alt,
      order: (index + 1) * 10,
    }),
  ),
);

await Promise.all(
  aria.ARIA_ARTICLES.map((article) =>
    client.createOrReplace({
      _id: `article-${article.slug}`,
      _type: "article",
      title: article.title,
      slug: {
        _type: "slug",
        current: article.slug,
      },
      category: normalizedCategory(article.category),
      summary: article.summary,
      heroImageUrl: article.image,
      imageUrls: article.images.map((src, index) =>
        imageUrlObject(src, `${article.title} image ${index + 1}`, `${article.slug}-image-${index}`),
      ),
      publishedAt: `${article.publishedAt}T00:00:00.000Z`,
      author: article.publisher,
      body: richTextBlock(article.summary, `${article.slug}-body`),
      featured: true,
    }),
  ),
);

await client.createOrReplace({
  _id: "mediaSettings",
  _type: "mediaSettings",
  homepageHeroSlides,
  homepagePillars,
  architectureVideo: {
    _type: "object",
    posterImage: await imageWithAlt(architectureVideo.posterImage, architectureVideo.imageAlt),
    videoFile: await fileAsset(architectureVideo.videoFile),
  },
});

await Promise.all(
  videos.map((video) =>
    client.createOrReplace({
      _id: `video-${video.vimeoId}`,
      _type: "video",
      title: video.title,
      slug: {
        _type: "slug",
        current: slugify(video.title),
      },
      vimeoId: video.vimeoId,
      vimeoHash: video.vimeoHash,
      featured: true,
      order: video.order,
    }),
  ),
);

await client.createOrReplace({
  _id: "navigation-primary",
  _type: "navigationMenu",
  title: "Primary navigation",
  items: aria.ARIA_HEADER_MENU.map(navigationItem),
});

await client.createOrReplace({
  _id: "navigation-footer",
  _type: "navigationMenu",
  title: "Footer navigation",
  items: aria.ARIA_FOOTER_GROUPS.flatMap((group, groupIndex) =>
    group.links.map((link, linkIndex) => ({
      _key: `footer-${groupIndex}-${linkIndex}-${slugify(link.label)}`,
      _type: "navigationItem",
      link: linkFromHref(link.label, link.href),
    })),
  ),
});

await client.createOrReplace({
  _id: "siteSettings",
  _type: "siteSettings",
  brandName: aria.ARIA_BRAND.name,
  tagline: aria.ARIA_BRAND.tagline,
  phone: aria.ARIA_BRAND.phone,
  email: aria.ARIA_BRAND.email,
  address: aria.ARIA_BRAND.address,
  hours: aria.ARIA_BRAND.hoursLabel,
  socialLinks: aria.ARIA_SOCIAL.map((link, index) => ({
    _key: `social-${index}-${slugify(link.label)}`,
    ...linkFromHref(link.label, link.href),
  })),
  primaryNavigation: {
    _type: "reference",
    _ref: "navigation-primary",
  },
  footerNavigation: {
    _type: "reference",
    _ref: "navigation-footer",
  },
  footerColumns: aria.ARIA_FOOTER_GROUPS.map((group, groupIndex) => ({
    _key: `footer-column-${groupIndex}-${slugify(group.title)}`,
    _type: "object",
    title: group.title,
    links: group.links.map((link, linkIndex) => ({
      _key: `footer-column-${groupIndex}-link-${linkIndex}-${slugify(link.label)}`,
      ...linkFromHref(link.label, link.href),
    })),
  })),
});

console.log(
  `Reset ${deletedCount} seeded documents and seeded Sanity site content in ${projectId}/${dataset}.`,
);
