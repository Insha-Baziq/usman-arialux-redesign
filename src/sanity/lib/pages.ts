import type {
  ARIA_ARCHITECTURAL,
  ARIA_CONTACT,
  ARIA_WHO_WE_ARE,
} from "@/components/arialux-data";

import { cache } from "react";

import { sanityClient } from "./client";

type RichTextBlock = {
  children?: { text?: string }[];
};

type CtaResult = {
  label?: string;
  href?: string;
};

type TextImageSectionResult = {
  eyebrow?: string;
  heading?: string;
  body?: RichTextBlock[];
  image?: string;
  imageAlt?: string;
};

type HeroSectionResult = {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  backgroundImage?: string;
  imageAlt?: string;
  cta?: CtaResult;
};

type CardResult = {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
};

type CardGridSectionResult = {
  heading?: string;
  cards?: CardResult[];
};

type FeatureListSectionResult = {
  heading?: string;
  items?: { title?: string; description?: string }[];
};

type CtaBandSectionResult = {
  heading?: string;
  description?: string;
  backgroundImage?: string;
  cta?: CtaResult;
};

type ContactSectionResult = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  detailHeading?: string;
  detailBody?: string;
  notice?: string;
};

export type ContactPageContent = {
  eyebrow: string;
  heading: string;
  formLead: string;
  notice: string;
  image: string;
  imageAlt: string;
  detailHeading: string;
  detailBody: string;
};

export type WhoWeArePageContent = {
  eyebrow: string;
  heading: string;
  mission: string;
  hero: string;
  heroAlt: string;
  ctaEyebrow: string;
  ctaHeadline: string;
  ctaSubline: string;
  ctaLabel: string;
  ctaHref: string;
  ctaBackgroundImage?: string;
};

export type ArchitectureServiceCard = {
  title: string;
  body: string;
  image: string;
};

export type ArchitecturePageContent = {
  eyebrow: string;
  heading: string;
  description: string;
  hero: string;
  heroAlt: string;
  ctaLabel: string;
  ctaHref: string;
  servicesHeading: string;
  services: ArchitectureServiceCard[];
  videoHeading: string;
  includedHeading: string;
  includedItems: string[];
  whyHeading: string;
  whyItems: { title: string; body: string }[];
  bottomHeading: string;
  bottomSubline: string;
  bottomCtaLabel: string;
  bottomCtaHref: string;
};

const contactPageQuery = `*[_type == "page" && slug.current == "contact" && status == "published"][0]{
  "contact": sections[_type == "contactSection"][0]{
    eyebrow,
    heading,
    description,
    "image": image.image.asset->url,
    "imageAlt": coalesce(image.alt, heading),
    detailHeading,
    detailBody,
    notice
  }
}`;

const whoWeArePageQuery = `*[_type == "page" && slug.current == "who-we-are" && status == "published"][0]{
  "mission": sections[_type == "textImageSection"][0]{
    eyebrow,
    heading,
    body,
    "image": image.image.asset->url,
    "imageAlt": coalesce(image.alt, heading)
  },
  "cta": sections[_type == "ctaBandSection"][0]{
    heading,
    description,
    "backgroundImage": backgroundImage.image.asset->url,
    "cta": ctas[0]{
      "label": coalesce(label, link.label),
      "href": coalesce(href, link.path, link.url)
    }
  }
}`;

const architecturePageQuery = `*[_type == "page" && slug.current == "architectural-services" && status == "published"][0]{
  "hero": sections[_type == "heroSection"][0]{
    eyebrow,
    heading,
    subheading,
    "backgroundImage": backgroundImage.image.asset->url,
    "imageAlt": coalesce(backgroundImage.alt, heading),
    "cta": ctas[0]{
      "label": coalesce(label, link.label),
      "href": coalesce(href, link.path, link.url)
    }
  },
  "services": sections[_type == "cardGridSection" && _key == "architectural-services-cards"][0]{
    heading,
    "cards": cards[]{
      title,
      description,
      "image": image.image.asset->url,
      "imageAlt": coalesce(image.alt, title)
    }
  },
  "included": sections[_type == "featureListSection" && _key == "architectural-included"][0]{
    heading,
    items[]{title, description}
  },
  "why": sections[_type == "featureListSection" && _key == "architectural-why"][0]{
    heading,
    items[]{title, description}
  },
  "video": sections[_type == "videoGridSection" && _key == "architectural-video"][0]{
    heading
  },
  "bottomCta": sections[_type == "ctaBandSection" && _key == "architectural-bottom-cta"][0]{
    heading,
    description,
    "cta": ctas[0]{
      "label": coalesce(label, link.label),
      "href": coalesce(href, link.path, link.url)
    }
  }
}`;

function richTextToPlainText(blocks?: RichTextBlock[]): string | undefined {
  const text = blocks
    ?.map((block) => block.children?.map((child) => child.text).filter(Boolean).join("") ?? "")
    .filter(Boolean)
    .join("\n\n");

  return text || undefined;
}

function hasText(value: string | undefined): value is string {
  return Boolean(value);
}

function getCta(cta: CtaResult | undefined, fallbackLabel: string, fallbackHref: string) {
  return {
    label: cta?.label || fallbackLabel,
    href: cta?.href || fallbackHref,
  };
}

export const getContactPageContent = cache(async (
  fallback: typeof ARIA_CONTACT,
): Promise<ContactPageContent> => {
  const result = await sanityClient.fetch<{ contact?: ContactSectionResult } | null>(contactPageQuery);
  const contact = result?.contact;

  return {
    eyebrow: contact?.eyebrow || "Let's Connect",
    heading: contact?.heading || fallback.heading,
    formLead: contact?.description || fallback.formLead,
    notice: contact?.notice || fallback.recaptchaNotice,
    image: contact?.image || "/images/who-we-are-hero-v1.webp",
    imageAlt: contact?.imageAlt || "AriaLux Homes - featured custom build",
    detailHeading:
      contact?.detailHeading || "Better yet, come see us in person to get a tour of our builds!",
    detailBody:
      contact?.detailBody || "We love our customers, so feel free to reach out for a free consultation.",
  };
});

export const getWhoWeArePageContent = cache(async (
  fallback: typeof ARIA_WHO_WE_ARE,
  fallbackCtaBackground?: string,
): Promise<WhoWeArePageContent> => {
  const result = await sanityClient.fetch<{
    mission?: TextImageSectionResult;
    cta?: CtaBandSectionResult;
  } | null>(whoWeArePageQuery);

  const mission = result?.mission;
  const cta = getCta(result?.cta?.cta, "Start the Conversation", "/contact");

  return {
    eyebrow: mission?.eyebrow || "AriaLux Homes",
    heading: mission?.heading || fallback.heading,
    mission: richTextToPlainText(mission?.body) || fallback.mission,
    hero: mission?.image || fallback.hero,
    heroAlt: mission?.imageAlt || "AriaLux Homes",
    ctaEyebrow: "Ready to begin?",
    ctaHeadline: result?.cta?.heading || "Build with AriaLux",
    ctaSubline:
      result?.cta?.description ||
      "Schedule a free consultation and let's start designing the home that will outlast trends, generations, and time itself.",
    ctaLabel: cta.label,
    ctaHref: cta.href,
    ctaBackgroundImage: result?.cta?.backgroundImage || fallbackCtaBackground,
  };
});

export const getArchitecturePageContent = cache(async (
  fallback: typeof ARIA_ARCHITECTURAL,
): Promise<ArchitecturePageContent> => {
  const result = await sanityClient.fetch<{
    hero?: HeroSectionResult;
    services?: CardGridSectionResult;
    included?: FeatureListSectionResult;
    why?: FeatureListSectionResult;
    video?: { heading?: string };
    bottomCta?: CtaBandSectionResult;
  } | null>(architecturePageQuery);

  const heroCta = getCta(result?.hero?.cta, fallback.ctaLabel, fallback.ctaHref);
  const bottomCta = getCta(result?.bottomCta?.cta, "Request a Consultation", "/contact");
  const services = (result?.services?.cards ?? [])
    .map((card) => ({
      title: card.title,
      body: card.description,
      image: card.image,
    }))
    .filter(
      (card): card is ArchitectureServiceCard =>
        hasText(card.title) && hasText(card.body) && hasText(card.image),
    );

  return {
    eyebrow: result?.hero?.eyebrow || "Design & build",
    heading: result?.hero?.heading || fallback.heading,
    description:
      result?.hero?.subheading ||
      "Thoughtful design. Timeless architecture. We bring your custom home vision to life with a seamless process from concept to construction, crafted around your lifestyle and the way you live.",
    hero: result?.hero?.backgroundImage || fallback.hero,
    heroAlt: result?.hero?.imageAlt || "AriaLux architectural services",
    ctaLabel: heroCta.label,
    ctaHref: heroCta.href,
    servicesHeading: result?.services?.heading || "From First Sketch to Final Permit",
    services:
      services.length > 0
        ? services
        : [
            {
              title: "Discovery & Concept",
              body: "We start with a consultation to understand your lot, lifestyle, goals, and architectural vision. This phase establishes the design direction and overall concept for your future home.",
              image: "/images/architectural-services/discovery-concept.webp",
            },
            {
              title: "Schematic Design",
              body: "Approved concepts move into measured floor plans, exterior elevations, and layout refinement. We shape spaces that are both beautiful and functional.",
              image: "/images/architectural-services/schematic-design.webp",
            },
            {
              title: "Construction Documents",
              body: "Final permit-ready drawings, detailed specifications, and technical coordination are prepared for execution, helping bring the design to life with clarity and precision.",
              image: "/images/architectural-services/construction-documents.webp",
            },
          ],
    videoHeading: result?.video?.heading || "See Our Craft in Motion",
    includedHeading: result?.included?.heading || "What's Included",
    includedItems:
      result?.included?.items?.map((item) => item.title).filter(hasText) ?? [
        "Detailed Floor Plans",
        "Exterior Elevations",
        "Design Consultation",
        "Construction Documentation",
        "Permit-Ready Drawings",
        "Builder Collaboration",
      ],
    whyHeading: result?.why?.heading || "Why Build With Us",
    whyItems:
      result?.why?.items
        ?.map((item) => ({ title: item.title, body: item.description }))
        .filter(
          (item): item is { title: string; body: string } =>
            hasText(item.title) && hasText(item.body),
        ) ?? [
        {
          title: "Bespoke Design",
          body: "Custom homes tailored to your vision, lot, and lifestyle.",
        },
        {
          title: "Builder-Ready Documents",
          body: "Clear, accurate plans that streamline permitting and construction.",
        },
        {
          title: "Collaborative Service",
          body: "We partner with you and your builder for a seamless building experience.",
        },
      ],
    bottomHeading: result?.bottomCta?.heading || "Let's design a home that's distinctly yours.",
    bottomSubline: result?.bottomCta?.description || "Every detail, every line-crafted around you.",
    bottomCtaLabel: bottomCta.label,
    bottomCtaHref: bottomCta.href,
  };
});
