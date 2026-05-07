import { cn } from "@/lib/utils";

export type SobhaPillLinkProps = {
  href: string;
  label: string;
  dark?: boolean;
  className?: string;
};

/**
 * Sobha "pill" CTA link — used on hero CTAs, art-of-detail, properties carousel,
 * press releases, and dark CTA bands across the site.
 *
 * `dark`  → white-on-transparent border (use over light backgrounds).
 * default → black-on-white pill (use over dark / image backgrounds).
 */
export function SobhaPillLink({ href, label, dark = false, className }: SobhaPillLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "sobha-pill-link inline-flex items-center justify-center gap-3 rounded-full border px-6 py-3 text-[0.74rem] font-medium tracking-[0.28em]",
        dark ? "sobha-pill-link--dark" : "sobha-pill-link--light",
        className,
      )}
    >
      <span className="sobha-pill-link__label">{label}</span>
      <span aria-hidden="true" className="sobha-pill-link__icon text-xs">
        ↗
      </span>
    </a>
  );
}
