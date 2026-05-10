"use client";

import {
  BookOpen,
  CalendarDays,
  ChevronDown,
  FileText,
  Images,
  X,
} from "lucide-react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";

import type { AriaArticle } from "./arialux-data";
import { ScrollReveal } from "./ScrollReveal";
import { ShowMoreBar } from "./ShowMoreBar";

type ArticleBrowserProps = {
  articles: AriaArticle[];
};

type SortOrder = "latest" | "oldest" | "title";

const ARTICLE_INITIAL = 6;
const ARTICLE_PAGE = 6;

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
  { value: "title", label: "Title" },
];

export function ArticleBrowser({ articles }: ArticleBrowserProps) {
  const [sort, setSort] = useState<SortOrder>("latest");
  const [sortOpen, setSortOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ARTICLE_INITIAL);
  const [activeArticle, setActiveArticle] = useState<AriaArticle | null>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!activeArticle) return;

    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveArticle(null);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activeArticle]);

  const sortedArticles = useMemo(() => {
    if (sort === "title") {
      return [...articles].sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sort === "oldest") {
      return [...articles].sort(
        (a, b) =>
          new Date(`${a.publishedAt}T00:00:00`).getTime() -
          new Date(`${b.publishedAt}T00:00:00`).getTime(),
      );
    }

    return [...articles].sort(
      (a, b) =>
        new Date(`${b.publishedAt}T00:00:00`).getTime() -
        new Date(`${a.publishedAt}T00:00:00`).getTime(),
    );
  }, [articles, sort]);

  const selectedSortLabel =
    SORT_OPTIONS.find((option) => option.value === sort)?.label ?? "Latest";
  const visibleArticles = sortedArticles.slice(0, visibleCount);
  const hasMore = visibleCount < sortedArticles.length;

  return (
    <section className="bg-[#f7f3ec] px-6 pb-16 lg:px-10 lg:pb-24">
      <div className="mx-auto w-full max-w-[81rem]">
        <ScrollReveal variant="fadeUp" duration={0.75}>
          <div className="flex items-start justify-start border-b border-[#d8d0c4] py-8">
            <h2 className="sr-only">Articles</h2>
            <div className="shrink-0 space-y-3" ref={sortRef}>
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.32em] text-[#171410]">
                Sort By
              </p>
              <div className="relative">
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={sortOpen}
                  onClick={() => setSortOpen((open) => !open)}
                  className="flex h-10 min-w-[10rem] items-center rounded-[0.45rem] border border-[#cfc3b5] bg-[#fbf8f2] pl-4 pr-3 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#332c25] shadow-[0_18px_44px_-34px_rgba(23,20,16,0.5)] transition hover:border-[#b58942] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b58942]"
                >
                  <span className="flex-1 text-left">{selectedSortLabel}</span>
                  <span
                    className="mx-2 h-5 w-px bg-[#d8c9b8]"
                    aria-hidden="true"
                  />
                  <ChevronDown
                    aria-hidden="true"
                    className={`size-3.5 text-[#b58942] transition-transform duration-200 ${
                      sortOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {sortOpen ? (
                  <ul
                    role="listbox"
                    aria-label="Sort articles"
                    className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 overflow-hidden rounded-[0.45rem] border border-[#d6cbbc] bg-[#fbf8f2] shadow-[0_16px_40px_-20px_rgba(23,20,16,0.35)]"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <li key={option.value} role="presentation">
                        <button
                          type="button"
                          role="option"
                          aria-selected={sort === option.value}
                          onClick={() => {
                            setSort(option.value);
                            setVisibleCount(ARTICLE_INITIAL);
                            setSortOpen(false);
                          }}
                          className={`block w-full px-4 py-2 text-left text-[0.62rem] font-semibold uppercase tracking-[0.14em] transition ${
                            sort === option.value
                              ? "bg-[#b58942] text-white"
                              : "text-[#4f473f] hover:bg-[#efe5d6]"
                          }`}
                        >
                          {option.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div
          data-testid="article-reference-grid"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,14rem),18rem))] gap-4 py-6 xl:py-8"
        >
          {visibleArticles.map((article, index) => (
            <ScrollReveal
              key={article.slug}
              variant="scaleUp"
              index={index}
              stagger={0.06}
              duration={0.8}
            >
              <ArticleListingCard
                article={article}
                onOpen={() => setActiveArticle(article)}
              />
            </ScrollReveal>
          ))}
        </div>

        {sortedArticles.length > ARTICLE_INITIAL ? (
          <ShowMoreBar
            hasMore={hasMore}
            onToggle={() =>
              setVisibleCount((count) =>
                hasMore
                  ? Math.min(count + ARTICLE_PAGE, sortedArticles.length)
                  : ARTICLE_INITIAL,
              )
            }
          />
        ) : null}
      </div>

      <AnimatePresence>
        {activeArticle ? (
          <ArticleReaderSheet
            key={activeArticle.slug}
            article={activeArticle}
            closeButtonRef={closeButtonRef}
            onClose={() => setActiveArticle(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function ArticleListingCard({
  article,
  onOpen,
}: {
  article: AriaArticle;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${article.title} article`}
      className="group relative block h-full w-full max-w-[18rem] overflow-hidden rounded-[0.6rem] border border-white/70 bg-white/35 text-left shadow-[0_16px_48px_-38px_rgba(23,20,16,0.72)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#b58942]/55 hover:bg-white/45 hover:shadow-[0_22px_68px_-48px_rgba(23,20,16,0.82)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b58942]"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[0.7rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(255,255,255,0.08)_48%,rgba(181,137,66,0.1))] opacity-80"
      />
      <span className="relative block aspect-[4/3] overflow-hidden bg-[#ded4c7]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-28 blur-md"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          decoding="async"
          className="relative h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.035]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#171410]/72 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-[#171410]/20 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#171410] px-4 py-2 text-xs font-medium text-white shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)]">
            <BookOpen aria-hidden="true" className="size-3.5" />
            Read Article
          </span>
        </span>
      </span>

      <span className="relative flex flex-col gap-3 p-3.5">
        <span className="space-y-1.5">
          <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#9a6c2b]">
            {article.dateLabel}
          </span>
          <span className="block font-serif text-lg font-normal leading-tight tracking-[-0.025em] text-[#171410] transition-colors group-hover:text-[#9a6c2b]">
            {article.title}
          </span>
        </span>
        <span className="line-clamp-2 block text-[0.78rem] leading-5 text-[#5d5147]">
          {article.summary}
        </span>
        <span className="flex items-center justify-between gap-2.5 border-t border-[#d8d0c4]/70 pt-2.5">
          <span className="min-w-0 text-xs">
            <span className="block truncate font-medium text-[#171410]">
              AriaLux Homes
            </span>
            <span className="mt-0.5 inline-flex items-center gap-1.5 text-[#7b7065]">
              <CalendarDays
                aria-hidden="true"
                className="size-3.5 text-[#b58942]"
              />
              {formatDate(article.publishedAt)}
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-xs text-[#7b7065]">
            <Images aria-hidden="true" className="size-3.5 text-[#b58942]" />
            {article.images.length} images
          </span>
        </span>
      </span>
    </button>
  );
}

function ArticleReaderSheet({
  article,
  closeButtonRef,
  onClose,
}: {
  article: AriaArticle;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}) {
  const [expandedImageIndex, setExpandedImageIndex] = useState<number | null>(
    null,
  );

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-reader-title"
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[#171410]/62 px-3 pt-10 backdrop-blur-sm sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
    >
      <motion.div
        className="mx-auto flex max-h-[92dvh] w-full max-w-[86rem] flex-col overflow-hidden rounded-t-[1.5rem] bg-[#fbf7ee] shadow-[0_-28px_90px_-42px_rgba(0,0,0,0.8)]"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 34, stiffness: 250 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-56 w-full shrink-0 bg-gradient-to-br from-[#ede5d6] via-[#fbf7ee] to-[#e8dfd3] md:h-64">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#fbf7ee] via-[#fbf7ee]/20 to-transparent"
          />
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-center pt-3">
            <div
              aria-hidden="true"
              className="h-1 w-10 rounded-full bg-white/50"
            />
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close article"
            className="absolute right-4 top-3 z-10 grid size-9 place-items-center rounded-full bg-[#171410]/40 text-white backdrop-blur-sm transition hover:bg-[#171410]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b58942]"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
          <div className="absolute bottom-6 left-6 z-10">
            <div className="inline-flex items-center gap-2.5 rounded-full bg-[#fbf7ee]/80 px-4 py-2 text-sm font-medium text-[#5d5147] backdrop-blur">
              <BookOpen aria-hidden="true" className="size-4 text-[#9a6c2b]" />
              {article.publisher}
            </div>
          </div>
        </div>

        <div className="article-reader-scroll min-h-0 flex-1 overflow-y-auto bg-[#fbf7ee]">
          <div className="grid gap-9 px-5 pb-8 pt-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_19rem] lg:px-12 lg:pb-10 lg:pt-8">
            <article className="min-w-0">
              <header className="mb-8 border-b border-[#ded3c4] pb-6">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#9a6c2b]">
                  AriaLux Homes Journal
                </p>
                <h2
                  id="article-reader-title"
                  className="mt-3 max-w-4xl font-serif text-4xl font-normal leading-none tracking-[-0.055em] text-[#171410] sm:text-5xl"
                >
                  {article.title}
                </h2>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#6d6258]">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays
                      aria-hidden="true"
                      className="size-4 text-[#b58942]"
                    />
                    {formatDate(article.publishedAt)}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Images
                      aria-hidden="true"
                      className="size-4 text-[#b58942]"
                    />
                    {article.images.length} images
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <FileText
                      aria-hidden="true"
                      className="size-4 text-[#b58942]"
                    />
                    Image article
                  </span>
                </div>
              </header>

              <section aria-labelledby="article-images-heading">
                <div className="mb-5 flex items-end justify-between gap-5">
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#9a6c2b]">
                      Visual Story
                    </p>
                    <h3
                      id="article-images-heading"
                      className="mt-2 font-serif text-3xl font-normal tracking-[-0.045em] text-[#171410]"
                    >
                      Article images
                    </h3>
                  </div>
                </div>

                <LayoutGroup>
                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {article.images.map((image, index) => {
                      const expanded = expandedImageIndex === index;

                      return (
                        <motion.figure
                          key={image}
                          layout
                          transition={{
                            type: "spring",
                            stiffness: 140,
                            damping: 22,
                          }}
                          className={`overflow-hidden rounded-[0.7rem] border border-[#e2d8c9] bg-[#f7f3ec] shadow-[0_22px_64px_-52px_rgba(23,20,16,0.7)] ${
                            expanded ? "sm:col-span-2 xl:col-span-3" : ""
                          }`}
                        >
                          <button
                            type="button"
                            aria-label={`${expanded ? "Collapse" : "Expand"} article image ${index + 1}`}
                            aria-pressed={expanded}
                            onClick={() =>
                              setExpandedImageIndex((current) =>
                                current === index ? null : index,
                              )
                            }
                            className="block w-full bg-[#ebe2d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#b58942]"
                          >
                            <motion.div
                              layout
                              className="relative w-full overflow-hidden"
                              style={{
                                aspectRatio: expanded ? "3 / 4" : "4 / 5",
                              }}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={image}
                                alt={`${article.title} article image ${index + 1}`}
                                loading="lazy"
                                decoding="async"
                                className="absolute inset-0 h-full w-full object-contain"
                              />
                            </motion.div>
                          </button>
                          <motion.figcaption
                            layout="position"
                            className="border-t border-[#e2d8c9] px-4 py-3 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#7b7065]"
                          >
                            Image {String(index + 1).padStart(2, "0")}
                          </motion.figcaption>
                        </motion.figure>
                      );
                    })}
                  </div>
                </LayoutGroup>
              </section>
            </article>

            <aside className="lg:sticky lg:top-6 lg:self-start">
              <div className="rounded-[0.7rem] border border-[#e0d5c7] bg-[#fbf8f2] p-5 shadow-[0_18px_54px_-42px_rgba(23,20,16,0.7)]">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#9a6c2b]">
                  About this article
                </p>
                <dl className="mt-5 space-y-4 text-sm">
                  <ArticleFact
                    label="Published"
                    value={formatDate(article.publishedAt)}
                  />
                  <ArticleFact label="Publisher" value={article.publisher} />
                </dl>
              </div>

              <div className="mt-5 rounded-[0.7rem] border border-[#e0d5c7] bg-[#fbf8f2] p-4">
                <p className="px-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#9a6c2b]">
                  In this post
                </p>
                <div className="mt-4 space-y-3">
                  {article.images.map((image, index) => (
                    <div
                      key={image}
                      className="grid grid-cols-[3.5rem_1fr] items-center gap-3"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[0.35rem] bg-[#ddd2c4]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-[#171410]">
                          Image {index + 1}
                        </p>
                        <p className="mt-1 text-[0.72rem] text-[#7b7065]">
                          Article image
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ArticleFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#e4d9ca] pb-3 last:border-b-0 last:pb-0">
      <dt className="text-[#7b7065]">{label}</dt>
      <dd className="text-right font-medium text-[#171410]">{value}</dd>
    </div>
  );
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}
