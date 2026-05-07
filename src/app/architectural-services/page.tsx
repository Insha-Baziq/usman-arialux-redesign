import { AriaLuxFooter, ariaLuxBrand } from "@/components/arialux-brand";
import { SobhaHeader } from "@/components/SobhaChrome";
import {
  ARIA_ARCHITECTURAL,
  ARIA_HEADER_MENU,
  ARIA_PLANS,
} from "@/components/arialux-data";
import {
  DarkCtaBand,
  HeroBanner,
  type HeroBannerSlide,
  PillarsSection,
  type PillarItem,
} from "@/components/sobha-sections";

const PROCESS_STEPS: { step: string; title: string; body: string }[] = [
  {
    step: "01",
    title: "Discovery",
    body: "A free consultation to understand your lot, lifestyle, and budget.",
  },
  {
    step: "02",
    title: "Concept",
    body: "Massing studies and three concept directions for you to react to.",
  },
  {
    step: "03",
    title: "Design Development",
    body: "Floor plans, elevations, and material palettes — refined together.",
  },
  {
    step: "04",
    title: "Construction Documentation",
    body: "Permit-ready drawings and a spec book any builder can build from.",
  },
];

/**
 * /architectural-services — AriaLux services page on Sobha primitives.
 * Composition: <SobhaHeader> + <HeroBanner> + <PillarsSection> (4 services) +
 * custom 4-step process timeline + <DarkCtaBand> + <SobhaFooter>.
 */
export default function ArchitecturalServicesPage() {
  const heroSlide: HeroBannerSlide = {
    id: "architectural-services-hero",
    title: ARIA_ARCHITECTURAL.heading,
    subtitle: ARIA_ARCHITECTURAL.lead,
    ctaLabel: ARIA_ARCHITECTURAL.ctaLabel,
    ctaHref: ARIA_ARCHITECTURAL.ctaHref,
    desktopImage: ARIA_ARCHITECTURAL.hero,
    mobileImage: ARIA_ARCHITECTURAL.hero,
    imageAlt: "AriaLux architectural services",
  };

  const serviceImages = [
    ARIA_PLANS[0]?.gallery[0],
    ARIA_PLANS[1]?.gallery[0],
    ARIA_PLANS[3]?.gallery[0],
    ARIA_PLANS[5]?.gallery[0],
  ];
  const services: PillarItem[] = ARIA_ARCHITECTURAL.services.map((svc, idx) => ({
    title: svc.title,
    description: svc.description,
    imageUrl: serviceImages[idx] ?? ARIA_ARCHITECTURAL.hero,
  }));

  return (
    <main className="bg-white text-black">
      <SobhaHeader
        brand={ariaLuxBrand}
        menus={ARIA_HEADER_MENU}
        hideLanguageSwitcher
      />

      <HeroBanner slides={[heroSlide]} fullHeight={false} autoplayDelayMs={0} />

      <PillarsSection
        heading="From First Sketch to Final Permit"
        pillars={services}
      />

      <section className="bg-[#f5f3ef] px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[81rem]">
          <div className="text-center">
            <span className="text-[0.72rem] uppercase tracking-[0.3em] text-black/55">
              How we work
            </span>
            <h2 className="mt-4 font-heading text-[2rem] font-light leading-tight text-black sm:text-[2.5rem] lg:text-[3rem]">
              Our Process
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base font-light leading-7 text-black/65">
              Four phases. One team. Total clarity from first sketch to broken
              ground.
            </p>
          </div>

          <ol className="mt-16 grid gap-10 lg:grid-cols-4 lg:gap-8">
            {PROCESS_STEPS.map((step) => (
              <li
                key={step.step}
                className="flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                <span className="text-[0.7rem] uppercase tracking-[0.3em] text-black/45">
                  Step {step.step}
                </span>
                <h3 className="mt-2 font-heading text-[1.35rem] font-light leading-tight text-black lg:text-[1.5rem]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs text-[0.92rem] font-light leading-7 text-black/65 lg:max-w-none">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <DarkCtaBand
        eyebrow="Free consultation"
        headline="Start Your Project"
        subline="Bring your sketches, your Pinterest board, or just an idea. We handle the rest."
        ctaLabel="Book Your Consultation"
        ctaHref="/contact"
        backgroundImage={ARIA_ARCHITECTURAL.detail}
      />

      <AriaLuxFooter />
    </main>
  );
}
