import { createReadStream, existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { createClient } from "next-sanity";

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
  useCdn: false,
});

const heroSlides = [
  {
    id: "arialux-floor-plans",
    title: "CURATED FLOOR PLANS",
    subtitle: "Designed for the Way You Live",
    ctaLabel: "VIEW PLANS",
    ctaHref: "/all-floor-plans",
    desktopImage: "public/images/facebook/hero-preview.jpg",
    imageAlt: "AriaLux Homes — modern residential architecture",
    videoFile: "public/videos/hero-video.mp4",
    order: 10,
  },
  {
    id: "arialux-aria-heights",
    title: "BUILDING HOMES THAT ARE FOR NOW & EVER",
    subtitle: "Spaces Where Life Unfolds",
    ctaLabel: "EXPLORE",
    ctaHref: "/floor-plans/aria-heights",
    desktopImage: "public/images/facebook/fallback-02.jpg",
    imageAlt: "AriaLux Homes — Aria Heights estate exterior",
    videoFile: "public/videos/hero-02.mp4",
    order: 20,
  },
  {
    id: "arialux-craftsmanship",
    title: "ARIALUX HOMES",
    subtitle: "Custom Builds. Quiet Confidence.",
    ctaLabel: "DISCOVER",
    ctaHref: "/portfolio",
    desktopImage: "public/images/facebook/hero-09.JPG",
    imageAlt: "AriaLux Homes — grand white-stone estate with reflecting pool",
    order: 30,
  },
];

const pillars = [
  {
    title: "Architectural Services",
    description:
      "AriaLux Homes is both a custom builder and an in-house architectural firm. We design every plan from the ground up — siting, elevations, interior flow, structural detail — so the home you imagine and the home we build are the same drawing.",
    image: "public/images/facebook/fb-0033.jpg",
    imageAlt: "Architectural services by AriaLux Homes",
    videoFile: "public/videos/video-2.mp4",
    order: 10,
  },
  {
    title: "Custom Craftsmanship",
    description:
      "From hand-selected stone and bespoke cabinetry to door hardware and trim profiles, every surface is specified, sampled, and signed off by you. We build sixteen distinct floor plans across Fort Wayne — none of them feel templated.",
    image: "public/images/facebook/fb-0049.jpg",
    imageAlt: "Custom craftsmanship by AriaLux Homes",
    videoFile: "public/videos/video-1.mp4",
    order: 20,
  },
  {
    title: "Quiet Confidence",
    description:
      "Clean lines, warm materials, generous proportions. AriaLux homes carry a consistent design language across every build — modern without being cold, expensive without being loud. The kind of home that ages gracefully.",
    image: "public/images/facebook/fb-0055.jpg",
    imageAlt: "Quiet luxury custom home by AriaLux Homes",
    videoFile: "public/videos/video-3.mp4",
    order: 30,
  },
];

const architectureVideo = {
  posterImage: "public/images/architectural-services/schematic-design.webp",
  imageAlt: "Architectural design preview",
  videoFile: "public/videos/architect.mp4",
};

const videos = [
  { vimeoId: "1001832837", vimeoHash: "bd3f41d7c8", title: "AriaLux Homes — Brand Reel", order: 10 },
  { vimeoId: "1069221614", vimeoHash: "6c1300b731", title: "AriaLux Homes — Walkthrough", order: 20 },
  { vimeoId: "1068324122", vimeoHash: "632a66c564", title: "AriaLux Homes — Build Tour", order: 30 },
  { vimeoId: "1068324603", vimeoHash: "b3f450595c", title: "AriaLux Homes — Interior Detail", order: 40 },
  { vimeoId: "1068324850", vimeoHash: "782c5a80d0", title: "AriaLux Homes — Exterior Tour", order: 50 },
  { vimeoId: "1068339694", vimeoHash: "c5f17b2925", title: "AriaLux Homes — Owner Story", order: 60 },
  { vimeoId: "1068340218", vimeoHash: "a174262c6d", title: "AriaLux Homes — Process", order: 70 },
  { vimeoId: "1068341436", vimeoHash: "e6adda1b3a", title: "AriaLux Homes — Behind the Build", order: 80 },
];

async function uploadAsset(type, relativePath) {
  if (!relativePath) return undefined;
  const absolutePath = path.join(root, relativePath);
  const asset = await client.assets.upload(type, createReadStream(absolutePath), {
    filename: path.basename(relativePath),
  });
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

const homepageHeroSlides = await Promise.all(
  heroSlides.map(async (slide) => ({
    _type: "object",
    id: slide.id,
    title: slide.title,
    subtitle: slide.subtitle,
    ctaLabel: slide.ctaLabel,
    ctaHref: slide.ctaHref,
    desktopImage: await imageWithAlt(slide.desktopImage, slide.imageAlt),
    mobileImage: await imageWithAlt(slide.desktopImage, slide.imageAlt),
    videoFile: slide.videoFile ? await fileAsset(slide.videoFile) : undefined,
    order: slide.order,
  })),
);

const homepagePillars = await Promise.all(
  pillars.map(async (pillar) => ({
    _type: "object",
    title: pillar.title,
    description: pillar.description,
    image: await imageWithAlt(pillar.image, pillar.imageAlt),
    videoFile: await fileAsset(pillar.videoFile),
    order: pillar.order,
  })),
);

const mediaSettings = {
  _id: "mediaSettings",
  _type: "mediaSettings",
  homepageHeroSlides,
  homepagePillars,
  architectureVideo: {
    _type: "object",
    posterImage: await imageWithAlt(architectureVideo.posterImage, architectureVideo.imageAlt),
    videoFile: await fileAsset(architectureVideo.videoFile),
  },
};

await client.createOrReplace(mediaSettings);

await Promise.all(
  videos.map((video) =>
    client.createOrReplace({
      _id: `video-${video.vimeoId}`,
      _type: "video",
      title: video.title,
      slug: {
        _type: "slug",
        current: video.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      },
      vimeoId: video.vimeoId,
      vimeoHash: video.vimeoHash,
      featured: true,
      order: video.order,
    }),
  ),
);

console.log(`Seeded Sanity media settings in ${projectId}/${dataset}.`);
