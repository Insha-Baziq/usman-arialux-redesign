import { AriaLuxContactForm } from "@/components/AriaLuxContactForm";
import { AriaLuxFooter, ariaLuxBrand } from "@/components/arialux-brand";
import { SobhaHeader } from "@/components/SobhaChrome";
import {
  ARIA_BRAND,
  ARIA_CONTACT,
} from "@/components/arialux-data";
import { getHeaderMenu } from "@/sanity/lib/content";
import { getContactPageContent } from "@/sanity/lib/pages";
import { ContactReveal } from "./ContactReveal";
import Image from "next/image";

export const revalidate = 60;

function PinGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function PhoneGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M5 4.5h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6.5a2 2 0 0 1 2-2z" />
    </svg>
  );
}

function MailGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </svg>
  );
}

function HouseGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
      aria-hidden="true"
    >
      <path d="M3.5 11 12 4l8.5 7" />
      <path d="M5.5 10v9.5h13V10" />
      <path d="M10 19.5v-5h4v5" />
    </svg>
  );
}

function DiamondMark() {
  return (
    <span
      aria-hidden="true"
      className="block h-3 w-3 rotate-45 bg-[#bfa15c]"
    />
  );
}

/**
 * /contact — AriaLux contact page redesigned to match contact-page.png mockup.
 * Two-column layout with a thin gold rule + diamond divider, gold accents,
 * and the who-we-are hero image as the right-column visual.
 */
export default async function ContactPage() {
  const contactContent = await getContactPageContent(ARIA_CONTACT);
  // Mockup shows Mon-Sat (no Sun). Clip the weekly hours accordingly.
  const hoursWeekday = ARIA_CONTACT.hoursWeekly.slice(0, 6);

  return (
    <main className="bg-[#f7f3ec] text-black">
      <SobhaHeader
        brand={ariaLuxBrand}
        menus={await getHeaderMenu()}
        hideLanguageSwitcher
      />

      <section className="px-6 pt-28 pb-20 lg:px-10 lg:pt-32 lg:pb-24">
        <div className="relative mx-auto max-w-[72rem]">
          {/* Vertical divider with diamond accent (desktop only) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-1/2 hidden -translate-x-1/2 lg:block"
          >
            <div className="mx-auto h-full w-px bg-black/15" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2">
              <DiamondMark />
            </div>
          </div>

          <ContactReveal
            eyebrow={contactContent.eyebrow}
            heading={contactContent.heading}
            body={(
              <p className="mt-5 max-w-[26rem] text-[0.92rem] font-light leading-[1.65] text-black/70">
                {contactContent.formLead}
              </p>
            )}
            form={<AriaLuxContactForm />}
            notice={(
              <p className="mt-5 max-w-md text-[0.68rem] leading-5 text-black/45">
                {contactContent.notice}
              </p>
            )}
            media={(
              <div className="overflow-hidden rounded-md">
                <Image
                  src={contactContent.image}
                  alt={contactContent.imageAlt}
                  width={800}
                  height={600}
                  className="block h-auto w-full"
                />
              </div>
            )}
            details={(
              <>
                <div className="mt-5 rounded-md bg-[#f4efe5] p-6 sm:p-7">
                  <div className="flex items-start gap-5">
                    <span
                      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#bfa15c]/40 bg-white text-[#bfa15c]"
                      aria-hidden="true"
                    >
                      <HouseGlyph />
                    </span>
                    <div>
                      <h2 className="font-heading text-[1.2rem] font-light leading-[1.25] text-black sm:text-[1.35rem]">
                        {contactContent.detailHeading}
                      </h2>
                      <p className="mt-3 text-[0.88rem] font-light leading-[1.65] text-black/65">
                        {contactContent.detailBody}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 grid gap-10 sm:grid-cols-2">
                  <div>
                    <h3 className="font-heading text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-black">
                      {ARIA_CONTACT.napHeading}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-2.5 block h-px w-10 bg-[#bfa15c]"
                    />
                    <ul className="mt-5 space-y-4 text-[0.86rem] font-light leading-[1.55] text-black/80">
                      <li className="flex items-start gap-3.5">
                        <span className="mt-0.5 text-[#bfa15c]">
                          <PinGlyph />
                        </span>
                        <span>
                          6985 Starks Blvd,
                          <br />
                          Fort Wayne, Indiana 46816
                        </span>
                      </li>
                      <li className="flex items-center gap-3.5">
                        <span className="text-[#bfa15c]">
                          <PhoneGlyph />
                        </span>
                        <a
                          href={ARIA_BRAND.phoneHref}
                          className="text-black underline-offset-4 transition hover:underline"
                        >
                          {ARIA_BRAND.phone}
                        </a>
                      </li>
                      <li className="flex items-center gap-3.5">
                        <span className="text-[#bfa15c]">
                          <MailGlyph />
                        </span>
                        <a
                          href={ARIA_BRAND.emailHref}
                          className="break-all text-black uppercase tracking-[0.04em] underline-offset-4 transition hover:underline"
                        >
                          {ARIA_BRAND.email}
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-heading text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-black">
                      Hours
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-2.5 block h-px w-10 bg-[#bfa15c]"
                    />
                    <ul className="mt-5 space-y-2.5 text-[0.84rem] font-light text-black/80">
                      {hoursWeekday.map((h) => (
                        <li
                          key={h.day}
                          className="flex items-center justify-between"
                        >
                          <span className="font-semibold uppercase tracking-[0.18em] text-black/85">
                            {h.day}
                          </span>
                          <span className="font-light text-black/65">
                            {h.hours}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
          />
        </div>
      </section>

      <AriaLuxFooter />
    </main>
  );
}
