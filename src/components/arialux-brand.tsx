/* eslint-disable @next/next/no-img-element */

import type { ReactNode } from "react";

import type { ChromeBrand } from "./SobhaChrome";
import {
  ARIA_BRAND,
  ARIA_FOOTER_GROUPS,
  ARIA_SOCIAL,
} from "./arialux-data";

/**
 * Shared AriaLux brand object passed into the Sobha-style header primitives
 * across the homepage and all subpages. Footer is rendered separately by
 * `<AriaLuxFooter />` below — it does NOT use SobhaFooter.
 */
export const ariaLuxBrand: ChromeBrand = {
  name: ARIA_BRAND.name,
  logo: (
    <img
      src={ARIA_BRAND.logoLight}
      alt={`${ARIA_BRAND.name} logo`}
      className="h-20 w-auto [filter:drop-shadow(0_1px_3px_rgb(0_0_0/0.35))]"
    />
  ),
  footerLogo: (
    <img
      src="/images/arialux-logo-black.png"
      alt={`${ARIA_BRAND.name} logo`}
      className="h-24 w-auto"
    />
  ),
  homeHref: "/",
  copyright: ARIA_BRAND.copyright,
};

// ---------------------------------------------------------------------------
// AriaLux footer primitives — gold accents, circled icons, chevron-prefixed
// links, diamond-ornament divider, single centered copyright.
// ---------------------------------------------------------------------------

const GOLD = "#bfa15c";

type IconKey =
  | "pin"
  | "people"
  | "search"
  | "house"
  | "briefcase"
  | "phone"
  | "mail"
  | "clock"
  | "instagram"
  | "facebook";

type FooterIconProps = {
  name: IconKey;
  className?: string;
};

function FooterIcon({ name, className }: FooterIconProps) {
  const cls = className ?? "h-4 w-4";
  switch (name) {
    case "pin":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <path d="M12 22s7-7.5 7-13a7 7 0 0 0-14 0c0 5.5 7 13 7 13Z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      );
    case "people":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <circle cx="9" cy="9" r="3" />
          <circle cx="17" cy="10" r="2.2" />
          <path d="M3 19c0-3 3-5 6-5s6 2 6 5" />
          <path d="M15 19c0-2 2-3.5 4-3.5s2 1 2 1" />
        </svg>
      );
    case "search":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <circle cx="11" cy="11" r="6" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case "house":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <path d="M3 11 12 4l9 7" />
          <path d="M5 10v10h14V10" />
          <path d="M10 20v-5h4v5" />
        </svg>
      );
    case "briefcase":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
          <path d="M3 12h18" />
        </svg>
      );
    case "phone":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <path d="M5 4h3l2 5-2 1a12 12 0 0 0 6 6l1-2 5 2v3a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2Z" />
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden="true">
          <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V5c-.6-.1-1.4-.2-2.4-.2-2.3 0-3.9 1.4-3.9 4v2.2H7.6v3h2.5V21h3.4z" />
        </svg>
      );
    default:
      return null;
  }
}

type ColumnIconProps = {
  name: IconKey;
};

function ColumnIcon({ name }: ColumnIconProps) {
  return (
    <span
      className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#f1ead9]"
      style={{ color: GOLD }}
    >
      <FooterIcon name={name} className="h-5 w-5" />
    </span>
  );
}

type ColumnHeadingProps = {
  children: ReactNode;
};

function ColumnHeading({ children }: ColumnHeadingProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-[0.95rem] font-semibold uppercase tracking-[0.22em] text-neutral-900">
        {children}
      </h2>
      <span
        className="block h-px w-16"
        style={{ backgroundColor: GOLD, opacity: 0.55 }}
        aria-hidden="true"
      />
    </div>
  );
}

type ChevronLinkProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
};

function ChevronLink({ href, children, external }: ChevronLinkProps) {
  const target = external ? { target: "_blank", rel: "noopener noreferrer" as const } : {};
  return (
    <a
      href={href}
      {...target}
      className="group inline-flex items-center gap-3 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-neutral-700 transition hover:text-neutral-900"
    >
      <span
        className="text-base leading-none transition-transform duration-200 group-hover:translate-x-0.5"
        style={{ color: GOLD }}
        aria-hidden="true"
      >
        &#x203A;
      </span>
      <span>{children}</span>
    </a>
  );
}

type ContactRowProps = {
  icon: IconKey;
  href?: string;
  emphasize?: boolean;
  children: ReactNode;
};

function ContactRow({ icon, href, emphasize, children }: ContactRowProps) {
  const text = (
    <span
      className={
        emphasize
          ? "text-[0.78rem] font-medium uppercase tracking-[0.18em] text-neutral-800 transition group-hover:text-neutral-950"
          : "text-sm font-light leading-relaxed text-neutral-700"
      }
    >
      {children}
    </span>
  );

  const body = (
    <div className="group flex items-start gap-3">
      <span
        className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center"
        style={{ color: GOLD }}
        aria-hidden="true"
      >
        <FooterIcon name={icon} className="h-4 w-4" />
      </span>
      {text}
    </div>
  );

  return href ? (
    <a href={href} className="block">
      {body}
    </a>
  ) : (
    body
  );
}

function GoldSocialButton({ label, href, icon }: { label: string; href: string; icon: IconKey }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`AriaLux Homes on ${label}`}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
    >
      <FooterIcon name={icon} className="h-4 w-4" />
    </a>
  );
}

function DiamondDivider() {
  return (
    <div className="mt-16 flex items-center justify-center gap-6" aria-hidden="true">
      <span className="h-px flex-1" style={{ backgroundColor: GOLD, opacity: 0.5 }} />
      <span className="relative flex h-4 w-8 items-center justify-center" style={{ color: GOLD }}>
        <span className="block h-3 w-3 rotate-45 border" style={{ borderColor: GOLD }} />
        <span className="absolute right-0 block h-3 w-3 rotate-45 border" style={{ borderColor: GOLD }} />
      </span>
      <span className="h-px flex-1" style={{ backgroundColor: GOLD, opacity: 0.5 }} />
    </div>
  );
}

/**
 * AriaLuxFooter — single source of truth for the site footer. Every page
 * renders this so contact/socials/groups stay consistent. Matches the
 * reference mockup: warm bg, centered logo divider, four icon-headed columns
 * (Visit Our Studio + Company + Explore + Featured Plans), chevron links,
 * diamond divider, single centered copyright.
 */
export function AriaLuxFooter() {
  const company = ARIA_FOOTER_GROUPS.find((g) => g.title === "Company");
  const explore = ARIA_FOOTER_GROUPS.find((g) => g.title === "Explore");
  const featured = ARIA_FOOTER_GROUPS.find((g) => g.title === "Featured Plans");

  return (
    <footer className="border-t border-neutral-200 bg-[#F9F9F9] px-6 pb-10 pt-20 text-neutral-800 lg:px-10 lg:pt-24">
      <div className="mx-auto max-w-[81rem]">
        {/* Logo with horizontal rule on either side */}
        <div className="flex items-center justify-center gap-8">
          <span className="h-px flex-1" style={{ backgroundColor: GOLD, opacity: 0.55 }} aria-hidden="true" />
          {ariaLuxBrand.footerLogo}
          <span className="h-px flex-1" style={{ backgroundColor: GOLD, opacity: 0.55 }} aria-hidden="true" />
        </div>

        {/* Four-column grid — constrained + centered between the gold rules */}
        <div className="mx-auto mt-16 grid max-w-6xl gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-22 lg:pl-12">
          {/* Visit Our Studio */}
          <div className="space-y-6">
            <ColumnIcon name="pin" />
            <ColumnHeading>Visit Our Studio</ColumnHeading>
            <div className="space-y-4">
              <ContactRow icon="briefcase">{ARIA_BRAND.tagline}</ContactRow>
              <ContactRow icon="pin">{ARIA_BRAND.address}</ContactRow>
              <ContactRow icon="phone" href={ARIA_BRAND.phoneHref}>
                {ARIA_BRAND.phone}
              </ContactRow>
              <ContactRow icon="mail" href={ARIA_BRAND.emailHref} emphasize>
                {ARIA_BRAND.email}
              </ContactRow>
              <ContactRow icon="clock">{ARIA_BRAND.hoursLabel}</ContactRow>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {ARIA_SOCIAL.map((social) => (
                <GoldSocialButton
                  key={social.label}
                  label={social.label}
                  href={social.href}
                  icon={social.icon as IconKey}
                />
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <ColumnIcon name="people" />
            <ColumnHeading>Company</ColumnHeading>
            <ul className="space-y-3">
              {company?.links.map((link) => (
                <li key={link.label}>
                  <ChevronLink href={link.href}>{link.label}</ChevronLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className="space-y-6">
            <ColumnIcon name="search" />
            <ColumnHeading>Explore</ColumnHeading>
            <ul className="space-y-3">
              {explore?.links.map((link) => (
                <li key={link.label}>
                  <ChevronLink href={link.href}>{link.label}</ChevronLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Plans */}
          <div className="space-y-6">
            <ColumnIcon name="house" />
            <ColumnHeading>Featured Plans</ColumnHeading>
            <ul className="space-y-3">
              {featured?.links.map((link) => (
                <li key={link.label}>
                  <ChevronLink href={link.href}>{link.label}</ChevronLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <DiamondDivider />

        <p className="mt-6 text-center text-sm font-light text-neutral-500">
          {ARIA_BRAND.copyright}
        </p>
      </div>
    </footer>
  );
}
