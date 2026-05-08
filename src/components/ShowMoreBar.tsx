"use client";

type ShowMoreBarProps = {
  hasMore: boolean;
  onToggle: () => void;
  showMoreLabel?: string;
  showLessLabel?: string;
};

export function ShowMoreBar({
  hasMore,
  onToggle,
  showMoreLabel = "Show More",
  showLessLabel = "Show Less",
}: ShowMoreBarProps) {
  return (
    <div className="mt-14 flex items-center gap-4 sm:gap-6">
      <span
        aria-hidden="true"
        className="relative h-px flex-1 bg-[#c59a49]/65 before:absolute before:left-0 before:top-1/2 before:h-2 before:w-2 before:-translate-y-1/2 before:rotate-45 before:bg-[#c59a49]"
      />
      <button
        type="button"
        onClick={onToggle}
        className="group inline-flex h-[2.85rem] min-w-[12rem] items-center justify-center gap-5 rounded-full border border-[#c59a49] bg-[#fbf7ef]/80 px-7 text-[0.66rem] font-semibold uppercase tracking-[0.34em] text-[#9a6f25] shadow-[0_12px_30px_-28px_rgba(23,20,16,0.75)] transition hover:bg-[#c59a49] hover:text-white sm:min-w-[14rem]"
        aria-expanded={!hasMore}
      >
        <span>{hasMore ? showMoreLabel : showLessLabel}</span>
        <span
          aria-hidden="true"
          className="text-base leading-none transition group-hover:translate-y-0.5"
        >
          {hasMore ? "↓" : "↑"}
        </span>
      </button>
      <span
        aria-hidden="true"
        className="relative h-px flex-1 bg-[#c59a49]/65 after:absolute after:right-0 after:top-1/2 after:h-2 after:w-2 after:-translate-y-1/2 after:rotate-45 after:bg-[#c59a49]"
      />
    </div>
  );
}
