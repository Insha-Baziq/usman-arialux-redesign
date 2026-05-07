/* eslint-disable @next/next/no-img-element */
import { AriaLuxFooter, ariaLuxBrand } from "@/components/arialux-brand";
import { SobhaHeader } from "@/components/SobhaChrome";
import {
  ARIA_ARCHITECTURAL,
  ARIA_HEADER_MENU,
} from "@/components/arialux-data";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PageHero } from "@/components/sobha-sections";

const SERVICES = [
  {
    step: "01",
    title: "Discovery & Concept",
    body: "We start with a consultation to understand your lot, lifestyle, goals, and architectural vision. This phase establishes the design direction and overall concept for your future home.",
    image: "/images/architectural-services/discovery-concept.png",
  },
  {
    step: "02",
    title: "Schematic Design",
    body: "Approved concepts move into measured floor plans, exterior elevations, and layout refinement. We shape spaces that are both beautiful and functional.",
    image: "/images/architectural-services/schematic-design.png",
  },
  {
    step: "03",
    title: "Construction Documents",
    body: "Final permit-ready drawings, detailed specifications, and technical coordination are prepared for execution, helping bring the design to life with clarity and precision.",
    image: "/images/architectural-services/construction-documents.png",
  },
];

const INCLUDED_ITEMS = [
  "Detailed Floor Plans",
  "Exterior Elevations",
  "Design Consultation",
  "Construction Documentation",
  "Permit-Ready Drawings",
  "Builder Collaboration",
];

const WHY_BUILD = [
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
];

function CompassIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10 text-[#b58942]" aria-hidden="true">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
      <path d="M24 8v4M24 36v4M8 24h4M36 24h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M21 21l-6-12 12 6-6 6z" fill="currentColor" opacity="0.3" />
      <path d="M27 27l6 12-12-6 6-6z" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

function RulerIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10 text-[#b58942]" aria-hidden="true">
      <rect x="6" y="18" width="36" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 18v5M18 18v8M24 18v5M30 18v8M36 18v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 34l28-20" stroke="currentColor" strokeWidth="1" opacity="0.25" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10 text-[#b58942]" aria-hidden="true">
      <rect x="10" y="6" width="28" height="36" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17 16h14M17 22h14M17 28h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M30 6v8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" opacity="0.1" />
    </svg>
  );
}

function ChecklistIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10 text-[#b58942]" aria-hidden="true">
      <rect x="8" y="4" width="32" height="40" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 16l2 2 4-4M16 26l2 2 4-4M16 36l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 16h8M28 26h8M28 36h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HandshakeIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10 text-[#b58942]" aria-hidden="true">
      <path d="M6 22l8-8 6 2 4-4 6 2 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 24l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 26l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 32h6l4-4M34 32h-6l-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PencilHouseIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8 text-[#b58942]" aria-hidden="true">
      <path d="M20 6l12 10v16H8V16z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="16" y="22" width="8" height="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M30 8l4 4-16 16-4-1 1-4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" opacity="0.6" />
    </svg>
  );
}

function DocBadgeIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8 text-[#b58942]" aria-hidden="true">
      <rect x="8" y="4" width="24" height="32" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 14h12M14 20h12M14 26h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="28" cy="30" r="6" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.2" />
      <path d="M26 30l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8 text-[#b58942]" aria-hidden="true">
      <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="26" cy="14" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 32c0-5 4-9 8-9s8 4 8 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 32c0-5 4-9 8-9s8 4 8 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BlueprintIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10 text-[#b58942]" aria-hidden="true">
      <rect x="6" y="8" width="36" height="32" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M18 14v20M30 14v20M12 24h24" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path d="M20 18l4 3 4-3v8l-4-3-4 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M14 32l6-4 6 4 6-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const SERVICE_ICONS = [CompassIcon, RulerIcon, DocumentIcon];
const WHY_ICONS = [PencilHouseIcon, DocBadgeIcon, TeamIcon];

export default function ArchitecturalServicesPage() {
  return (
    <main className="bg-[#f7f3ec] text-black">
      <SobhaHeader
        brand={ariaLuxBrand}
        menus={ARIA_HEADER_MENU}
        hideLanguageSwitcher
      />

      <PageHero
        eyebrow="Design & build"
        heading={ARIA_ARCHITECTURAL.heading}
        description="Thoughtful design. Timeless architecture. We bring your custom home vision to life with a seamless process from concept to construction, crafted around your lifestyle and the way you live."
        backgroundImage={ARIA_ARCHITECTURAL.hero}
        imageAlt="AriaLux architectural services"
        ctaLabel={ARIA_ARCHITECTURAL.ctaLabel}
        ctaHref={ARIA_ARCHITECTURAL.ctaHref}
      />

      {/* ── From First Sketch to Final Permit ── */}
      <section className="px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[81rem]">
          <ScrollReveal variant="fadeUp" duration={0.8}>
            <div className="flex flex-col items-center gap-3 text-center">
              <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#5f574e]">
                From First Sketch to Final Permit
              </h2>
              <span className="block h-2 w-2 rotate-45 bg-[#b58942]" aria-hidden="true" />
            </div>
          </ScrollReveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {SERVICES.map((svc, idx) => {
              const Icon = SERVICE_ICONS[idx]!;
              return (
                <ScrollReveal
                  key={svc.step}
                  variant="scaleUp"
                  index={idx}
                  stagger={0.24}
                  duration={1.35}
                >
                  <div className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_-18px_rgba(0,0,0,0.15)] ring-1 ring-black/[0.06]">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={svc.image}
                        alt={svc.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex items-start gap-4 p-6">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#b58942] text-sm font-bold text-[#b58942]">
                        {svc.step}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-heading text-lg font-medium leading-tight text-black">
                          {svc.title}
                        </h3>
                        <p className="mt-2 text-[0.85rem] font-light leading-[1.65] text-black/60">
                          {svc.body}
                        </p>
                      </div>
                      <span className="shrink-0 opacity-40">
                        <Icon />
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── What's Included + Why Build With Us ── */}
      <section className="px-6 pb-6 lg:px-10">
        <div className="mx-auto grid max-w-[81rem] gap-6 lg:grid-cols-2">
          <ScrollReveal variant="slideRight" duration={0.9}>
            <div className="rounded-2xl bg-white px-8 py-8 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06]">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#faf5eb]">
                  <ChecklistIcon />
                </span>
                <h3 className="font-heading text-xl font-medium italic text-black">
                  What&apos;s Included
                </h3>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3">
                {INCLUDED_ITEMS.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#b58942]/10">
                      <span className="block h-1.5 w-1.5 rotate-45 bg-[#b58942]" />
                    </span>
                    <span className="text-[0.85rem] font-light text-black/75">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slideLeft" duration={0.9} delay={0.1}>
            <div className="rounded-2xl bg-white px-8 py-8 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06]">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#faf5eb]">
                  <HandshakeIcon />
                </span>
                <h3 className="font-heading text-xl font-medium italic text-black">
                  Why Build With Us
                </h3>
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {WHY_BUILD.map((item, idx) => {
                  const Icon = WHY_ICONS[idx]!;
                  return (
                    <div key={item.title} className="flex flex-col gap-2">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#faf5eb]">
                        <Icon />
                      </span>
                      <h4 className="text-[0.82rem] font-semibold text-black">{item.title}</h4>
                      <p className="text-[0.78rem] font-light leading-[1.6] text-black/55">{item.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <ScrollReveal
        as="section"
        variant="fadeUp"
        duration={0.9}
        className="px-6 pb-16 pt-6 lg:px-10 lg:pb-20"
      >
        <div className="mx-auto max-w-[81rem]">
          <div className="flex flex-col items-center gap-6 rounded-2xl bg-white px-8 py-8 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06] sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <div className="flex items-center gap-5">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#faf5eb]">
                <BlueprintIcon />
              </span>
              <div>
                <h3 className="font-heading text-xl font-medium leading-tight text-black sm:text-[1.4rem]">
                  Let&apos;s design a home that&apos;s distinctly yours.
                </h3>
                <p className="mt-1 text-[0.85rem] font-light text-black/55">
                  Every detail, every line&mdash;crafted around you.
                </p>
              </div>
            </div>
            <a
              href="/contact"
              className="inline-flex shrink-0 items-center gap-3 rounded-[0.45rem] border border-[#171410] bg-[#171410] px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_16px_30px_-22px_rgba(23,20,16,0.7)] transition hover:bg-[#3a3129] active:translate-y-px"
            >
              Request a Consultation
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </ScrollReveal>

      <AriaLuxFooter />
    </main>
  );
}
