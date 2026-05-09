"use client";

/* eslint-disable @next/next/no-img-element */

/**
 * SobhaChrome — brand-parameterized header + footer extracted from
 * SobhaHomepage.tsx so multiple brands (Sobha, AriaLux, …) can share the
 * exact Sobha visual chrome (mega-menu, peek-arrows, footer grid) while
 * supplying their own logos, nav data, and footer content.
 *
 * Public API:
 *   <SobhaHeader brand={...} menus={...} />
 *   <SobhaFooter brand={...} groups={...} socials={...} legal={...} />
 *
 * Internal mega-menu helpers (SobhaMegaMenuItem, SobhaMegaPanel,
 * SobhaMegaListPanel, SobhaMegaTabbedPanel, SobhaMegaCategoryPanel) are
 * re-implemented to take a generic menu shape so AriaLux's mega-menu
 * (which mirrors the SobhaHeaderMenu schema) renders identically.
 */

import { ChevronDown, Heart, Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Generic mega-menu types (a structural subset of SobhaHeaderMenu /
// AriaHeaderMenu — both data sources are assignable to these).
// ---------------------------------------------------------------------------

export type ChromeMenuItem = {
  label: string;
  href: string;
  hoverImage?: string;
};

export type ChromeMenuTab = {
  id: string;
  label: string;
  items: ChromeMenuItem[];
};

export type ChromeMenuCategoryCard = {
  title: string;
  imageUrl: string;
  href: string;
};

export type ChromeMenuCategory = {
  label: string;
  href: string;
  cards: ChromeMenuCategoryCard[];
};

export type ChromeMenu = {
  label: string;
  href: string;
  kind: "simple" | "list" | "tabs" | "categories";
  defaultImage?: string;
  items?: ChromeMenuItem[];
  tabs?: ChromeMenuTab[];
  categories?: ChromeMenuCategory[];
};

export type ChromeFooterLink = {
  label: string;
  href: string;
};

export type ChromeFooterGroup = {
  title: string;
  links: ChromeFooterLink[];
};

export type ChromeBrand = {
  /** Human label used for the screen-reader fallback on the logo link. */
  name: string;
  /** Optional small caption rendered under the logo (e.g. "REALTY"). */
  caption?: string;
  /** Logo node (SVG component or <img>); receives no props. */
  logo: React.ReactNode;
  /** Compact logo for the footer divider (img URL or node). */
  footerLogo: React.ReactNode;
  /** Anchor href for the centered logo link in the header. */
  homeHref: string;
  /** Wishlist (heart icon) URL. */
  wishlistHref?: string;
  /** Copyright line shown at the bottom of the footer. */
  copyright: string;
};

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

const FALLBACK_LANGUAGES = [
  { code: "EN", href: "#", flagClass: "" },
  { code: "AR", href: "#", flagClass: "sobha-lang-flag--ae" },
  { code: "RU", href: "#", flagClass: "sobha-lang-flag--ru" },
  { code: "CH", href: "#", flagClass: "sobha-lang-flag--cn" },
] as const;

export type SobhaHeaderProps = {
  brand: ChromeBrand;
  menus: ChromeMenu[];
  /** Optional language-switcher entries. Defaults to Sobha's EN/AR/RU/CH. */
  languages?: ReadonlyArray<{ code: string; href: string; flagClass?: string }>;
  /** When true, hides the language switcher (e.g. for AriaLux). */
  hideLanguageSwitcher?: boolean;
};

export function SobhaHeader({
  brand,
  menus,
  languages,
  hideLanguageSwitcher = false,
}: SobhaHeaderProps) {
  const half = Math.ceil(menus.length / 2);
  const leftMenus = menus.slice(0, half);
  const rightMenus = menus.slice(half);
  const headerRef = useRef<HTMLElement | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const onScroll = () => {
      el.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const hasOverlay = mobileMenuOpen || searchOpen;
    document.body.classList.toggle("sobha-mobile-overlay-open", hasOverlay);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMobileMenuOpen(false);
      setSearchOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("sobha-mobile-overlay-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen, searchOpen]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    let frame = 0;
    const updateMegaPanelBounds = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const floorPlans = el.querySelector<HTMLElement>(
          '[data-menu-label="FLOOR PLANS"] .sobha-mega-trigger',
        );
        const video = el.querySelector<HTMLElement>(
          '[data-menu-label="VIDEO"] .sobha-mega-trigger',
        );
        if (!floorPlans || !video) return;

        const start = floorPlans.getBoundingClientRect().left;
        const end = video.getBoundingClientRect().right;
        if (end <= start) return;
        const floorPlansCenter =
          floorPlans.getBoundingClientRect().left +
          floorPlans.getBoundingClientRect().width / 2;
        const floorPlansPanelWidth = Math.min(window.innerWidth * 0.68, 1160);
        const floorPlansPanelLeft = Math.max(
          24,
          Math.min(
            window.innerWidth - floorPlansPanelWidth - 24,
            floorPlansCenter - 88,
          ),
        );

        el.style.setProperty("--sobha-mega-panel-left", `${start}px`);
        el.style.setProperty("--sobha-mega-panel-width", `${end - start}px`);
        el.style.setProperty(
          "--sobha-floorplans-panel-left",
          `${floorPlansPanelLeft}px`,
        );
        el.style.setProperty(
          "--sobha-floorplans-arrow-left",
          `${floorPlansCenter - floorPlansPanelLeft}px`,
        );
      });
    };

    updateMegaPanelBounds();
    window.addEventListener("resize", updateMegaPanelBounds);
    void document.fonts?.ready.then(updateMegaPanelBounds);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateMegaPanelBounds);
    };
  }, []);

  const langs = languages ?? FALLBACK_LANGUAGES;
  const allMenuItems = menus.flatMap((menu) => {
    const childItems = [
      ...(menu.items ?? []),
      ...(menu.tabs?.flatMap((tab) => tab.items) ?? []),
      ...(menu.categories?.flatMap((category) => [
        { label: category.label, href: category.href },
        ...category.cards.map((card) => ({
          label: card.title,
          href: card.href,
          hoverImage: card.imageUrl,
        })),
      ]) ?? []),
    ];

    return [{ label: menu.label, href: menu.href }, ...childItems];
  });
  const searchResults = allMenuItems
    .filter((item, index, arr) => arr.findIndex((candidate) => candidate.href === item.href) === index)
    .filter((item) =>
      item.label.toLowerCase().includes(searchQuery.trim().toLowerCase()),
    )
    .slice(0, 8);

  const closeMobileOverlays = () => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <header
      ref={headerRef}
      className="sobha-header fixed inset-x-0 top-0 z-40 text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[5.25rem] bg-gradient-to-b from-black/55 via-black/25 to-transparent"
      />
      <div className="sobha-header-row relative mx-auto flex h-[4.375rem] w-full items-center px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center gap-4 xl:hidden">
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => {
              setMobileMenuOpen((open) => !open);
              setSearchOpen(false);
            }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/10 backdrop-blur-md transition hover:border-white/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        <nav className="sobha-nav-left hidden flex-1 items-center justify-evenly xl:flex">
          {leftMenus.map((menu) => (
            <SobhaMegaMenuItem key={menu.label} menu={menu} />
          ))}
        </nav>

        <a
          href={brand.homeHref}
          className="pointer-events-auto absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center leading-none"
        >
          {brand.logo}
          {brand.caption ? (
            <span className="mt-1 text-[0.5rem] font-medium uppercase tracking-[0.38em] text-white">
              {brand.caption}
            </span>
          ) : null}
          <span className="sr-only">{brand.name}</span>
        </a>

        <div className="sobha-nav-right hidden flex-1 items-center justify-evenly xl:flex">
          {rightMenus.map((menu) => (
            <SobhaMegaMenuItem key={menu.label} menu={menu} />
          ))}
          {brand.wishlistHref ? (
            <span className="sobha-mega-group">
              <a
                href={brand.wishlistHref}
                aria-label="Wishlist"
                className="sobha-mega-trigger sobha-mega-trigger--icon"
              >
                <Heart className="h-4 w-4" />
              </a>
            </span>
          ) : null}
          <span className="sobha-mega-group">
            <button
              type="button"
              aria-label="Search"
              className="sobha-mega-trigger sobha-mega-trigger--icon"
            >
              <Search className="h-4 w-4" />
            </button>
          </span>
          {hideLanguageSwitcher ? null : <SobhaLangSwitcher languages={langs} />}
        </div>

        <div className="flex items-center gap-3 xl:hidden">
          <button
            type="button"
            aria-label="Search"
            aria-expanded={searchOpen}
            onClick={() => {
              setSearchOpen((open) => !open);
              setMobileMenuOpen(false);
            }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/10 backdrop-blur-md transition hover:border-white/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {searchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
          </button>
          {brand.wishlistHref ? (
            <a
              href={brand.wishlistHref}
              aria-label="Wishlist"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/10 backdrop-blur-md transition hover:border-white/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Heart className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>

      <div
        className={cn(
          "sobha-mobile-panel xl:hidden",
          mobileMenuOpen && "is-open",
        )}
        aria-hidden={!mobileMenuOpen}
      >
        <nav className="sobha-mobile-panel__inner" aria-label="Mobile navigation">
          <div className="grid gap-2">
            {menus.map((menu) => (
              <MobileMenuGroup
                key={menu.label}
                menu={menu}
                onNavigate={closeMobileOverlays}
              />
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <a href="/contact" onClick={closeMobileOverlays} className="sobha-mobile-quick-link">
              Call Back
            </a>
            <a href="/all-floor-plans" onClick={closeMobileOverlays} className="sobha-mobile-quick-link">
              Floor Plans
            </a>
          </div>
        </nav>
      </div>

      <div
        className={cn(
          "sobha-mobile-panel sobha-mobile-search xl:hidden",
          searchOpen && "is-open",
        )}
        aria-hidden={!searchOpen}
      >
        <div className="sobha-mobile-panel__inner">
          <label className="sr-only" htmlFor="sobha-mobile-search">
            Search site
          </label>
          <div className="flex items-center gap-3 rounded-[0.65rem] border border-white/18 bg-white/10 px-4 py-3">
            <Search className="h-4 w-4 shrink-0 text-white/70" aria-hidden="true" />
            <input
              id="sobha-mobile-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search floor plans, portfolio, contact"
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/45"
            />
          </div>
          <div className="mt-5 grid gap-2">
            {searchResults.map((item) => (
              <a
                key={`${item.href}-${item.label}`}
                href={item.href}
                onClick={closeMobileOverlays}
                className="sobha-mobile-search-result"
              >
                <span>{item.label}</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileMenuGroup({
  menu,
  onNavigate,
}: {
  menu: ChromeMenu;
  onNavigate: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childItems = [
    ...(menu.items ?? []),
    ...(menu.tabs?.flatMap((tab) => tab.items) ?? []),
    ...(menu.categories?.flatMap((category) => [
      { label: category.label, href: category.href },
      ...category.cards.map((card) => ({ label: card.title, href: card.href })),
    ]) ?? []),
  ];

  const hasChildren = childItems.length > 0;

  return (
    <section className={cn("sobha-mobile-menu-group", isExpanded && "is-expanded")}>
      {hasChildren ? (
        <div className="sobha-mobile-menu-row">
          <button
            type="button"
            aria-expanded={isExpanded}
            className="sobha-mobile-menu-link sobha-mobile-menu-toggle"
            onClick={() => setIsExpanded((open) => !open)}
          >
            <span>{menu.label}</span>
            <ChevronDown aria-hidden="true" className="h-4 w-4 transition-transform" />
          </button>
          <a
            href={menu.href}
            aria-label={`View ${menu.label}`}
            onClick={onNavigate}
            className="sobha-mobile-menu-arrow"
          >
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      ) : (
        <a href={menu.href} onClick={onNavigate} className="sobha-mobile-menu-link">
          <span>{menu.label}</span>
          <span aria-hidden="true">&rarr;</span>
        </a>
      )}

      {hasChildren && isExpanded ? (
        <div className="sobha-mobile-subnav is-open">
          {childItems.map((item) => (
            <a
              key={`${menu.label}-${item.href}-${item.label}`}
              href={item.href}
              onClick={onNavigate}
            >
              {item.label}
            </a>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function SobhaLangSwitcher({
  languages,
}: {
  languages: ReadonlyArray<{ code: string; href: string; flagClass?: string }>;
}) {
  const [primary, ...rest] = languages;
  if (!primary) return null;
  return (
    <div className="sobha-lang-group relative">
      <button
        type="button"
        className="sobha-lang-trigger inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-xs tracking-[0.18em] text-white"
      >
        <span aria-hidden="true" className="sobha-lang-flag" />
        <span>{primary.code}</span>
        <ChevronDown className="h-3 w-3" />
      </button>
      <div className="sobha-lang-panel" aria-label="Language switcher">
        {rest.map((lang) => (
          <a key={lang.code} href={lang.href} className="sobha-lang-option">
            <span
              aria-hidden="true"
              className={cn("sobha-lang-flag", lang.flagClass)}
            />
            <span>{lang.code}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mega-menu helpers
// ---------------------------------------------------------------------------

function SobhaMegaMenuItem({ menu }: { menu: ChromeMenu }) {
  const hasPanel = menu.kind !== "simple";
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const clearCloseTimer = () => {
    if (!closeTimerRef.current) return;
    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  };

  const openMenu = () => {
    clearCloseTimer();
    setIsOpen(true);
  };

  const scheduleCloseMenu = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
      closeTimerRef.current = null;
    }, 260);
  };

  useEffect(() => clearCloseTimer, []);

  return (
    <div
      className={cn("sobha-mega-group", hasPanel && isOpen && "is-open")}
      data-menu-label={menu.label}
      onMouseEnter={hasPanel ? openMenu : undefined}
      onMouseLeave={hasPanel ? scheduleCloseMenu : undefined}
      onFocus={hasPanel ? openMenu : undefined}
      onBlur={hasPanel ? scheduleCloseMenu : undefined}
    >
      <a
        href={menu.href}
        className="sobha-mega-trigger text-white transition hover:text-white"
      >
        {menu.label}
      </a>
      {hasPanel ? <SobhaMegaPanel menu={menu} /> : null}
    </div>
  );
}

function SobhaMegaPanel({ menu }: { menu: ChromeMenu }) {
  if (menu.kind === "tabs" && menu.tabs?.length) {
    return <SobhaMegaTabbedPanel menu={menu} tabs={menu.tabs} />;
  }
  if (menu.kind === "categories" && menu.categories?.length) {
    return <SobhaMegaCategoryPanel menu={menu} categories={menu.categories} />;
  }
  if (menu.kind === "list" && menu.items?.length) {
    return <SobhaMegaListPanel menu={menu} items={menu.items} />;
  }
  return null;
}

function SobhaMegaListPanel({
  menu,
  items,
}: {
  menu: ChromeMenu;
  items: ChromeMenuItem[];
}) {
  const featuredItems = items.filter((item) => item.hoverImage);
  const initialItem = featuredItems[0] ?? items[0];
  const isFloorPlans = menu.label === "FLOOR PLANS";
  const [activeItem, setActiveItem] = useState<ChromeMenuItem | undefined>(
    initialItem,
  );
  const [activeImage, setActiveImage] = useState<string | undefined>(
    initialItem?.hoverImage ?? menu.defaultImage,
  );

  if (isFloorPlans) {
    const navItems = featuredItems.length > 0 ? featuredItems : items;
    const displayItem = activeItem ?? navItems[0];

    return (
      <div
        className="sobha-mega-panel sobha-floorplans-panel"
        aria-label={`${menu.label} menu`}
      >
        <div className="sobha-floorplans-inner">
          <aside className="sobha-floorplans-list" aria-label="All floor plans">
            <a href={menu.href} className="sobha-floorplans-kicker">
              All Floor Plans
            </a>
            <div className="sobha-floorplans-divider" aria-hidden="true" />
            <div className="sobha-floorplans-links">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "sobha-floorplans-link",
                    displayItem?.href === item.href && "is-active",
                  )}
                  onMouseEnter={() => {
                    setActiveItem(item);
                    setActiveImage(item.hoverImage ?? menu.defaultImage);
                  }}
                  onFocus={() => {
                    setActiveItem(item);
                    setActiveImage(item.hoverImage ?? menu.defaultImage);
                  }}
                >
                  <span>{item.label}</span>
                  <span aria-hidden="true">&rsaquo;</span>
                </a>
              ))}
            </div>
          </aside>

          <section className="sobha-floorplans-feature">
            {activeImage ? (
              <div className="sobha-floorplans-image-wrap">
                <img
                  src={activeImage}
                  alt={displayItem?.label ?? menu.label}
                  className="sobha-floorplans-image"
                />
              </div>
            ) : null}
            <div className="sobha-floorplans-copy">
              <div>
                <p className="sobha-floorplans-label">Featured Floor Plan</p>
                <span className="sobha-floorplans-label-line" aria-hidden="true" />
                <h2>{displayItem?.label ?? "Aria Heights"}</h2>
                <p>
                  Spacious and elegant, {displayItem?.label ?? "this plan"} offers
                  the perfect balance of luxury, comfort, and timeless design.
                </p>
              </div>
              <a
                href={displayItem?.href ?? menu.href}
                className="sobha-floorplans-cta"
              >
                View Floor Plan
                <span aria-hidden="true">&rsaquo;</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="sobha-mega-panel" aria-label={`${menu.label} menu`}>
      <div className="sobha-mega-inner">
        <div className="sobha-mega-category-list">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="sobha-mega-category-link"
              onMouseEnter={() => {
                setActiveItem(item);
                setActiveImage(item.hoverImage ?? menu.defaultImage);
              }}
              onFocus={() => {
                setActiveItem(item);
                setActiveImage(item.hoverImage ?? menu.defaultImage);
              }}
              onMouseLeave={() => setActiveImage(menu.defaultImage)}
            >
              {item.label}
            </a>
          ))}
        </div>
        {activeImage ? (
          <div className="sobha-mega-image-wrap">
            <img src={activeImage} alt={menu.label} className="sobha-mega-image" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SobhaMegaTabbedPanel({
  menu,
  tabs,
}: {
  menu: ChromeMenu;
  tabs: ChromeMenuTab[];
}) {
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0].id);
  const activeTab = tabs.find((t) => t.id === activeTabId) ?? tabs[0];
  const [activeImage, setActiveImage] = useState<string | undefined>(
    activeTab.items[0]?.hoverImage ?? menu.defaultImage,
  );

  const handleTab = (id: string) => {
    setActiveTabId(id);
    const next = tabs.find((t) => t.id === id) ?? tabs[0];
    setActiveImage(next.items[0]?.hoverImage ?? menu.defaultImage);
  };

  return (
    <div className="sobha-mega-panel" aria-label={`${menu.label} menu`}>
      <div className="sobha-mega-inner sobha-mega-inner--tabs">
        <div className="sobha-mega-category-list sobha-mega-category-list--tabs">
          <div
            className="sobha-mega-tabs"
            role="tablist"
            aria-label={`${menu.label} regions`}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={tab.id === activeTabId}
                className={cn(
                  "sobha-mega-tab",
                  tab.id === activeTabId && "is-active",
                )}
                onClick={() => handleTab(tab.id)}
                onMouseEnter={() => handleTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="sobha-mega-tab-list">
            {activeTab.items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="sobha-mega-category-link"
                onMouseEnter={() =>
                  setActiveImage(item.hoverImage ?? menu.defaultImage)
                }
                onFocus={() => setActiveImage(item.hoverImage ?? menu.defaultImage)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
        {activeImage ? (
          <div className="sobha-mega-image-wrap">
            <img src={activeImage} alt={menu.label} className="sobha-mega-image" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SobhaMegaCategoryPanel({
  menu,
  categories,
}: {
  menu: ChromeMenu;
  categories: ChromeMenuCategory[];
}) {
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);
  const activeCategory = categories[activeCategoryIdx] ?? categories[0];

  return (
    <div className="sobha-mega-panel" aria-label={`${menu.label} menu`}>
      <div className="sobha-mega-inner">
        <div className="sobha-mega-category-list">
          {categories.map((cat, idx) => (
            <a
              key={cat.label}
              href={cat.href}
              className={cn(
                "sobha-mega-category-link",
                idx === activeCategoryIdx && "is-active",
              )}
              onMouseEnter={() => setActiveCategoryIdx(idx)}
              onFocus={() => setActiveCategoryIdx(idx)}
            >
              {cat.label}
            </a>
          ))}
        </div>
        <div className="sobha-mega-cards">
          {activeCategory.cards.map((card) => (
            <a key={card.title} href={card.href} className="sobha-mega-card">
              <div className="sobha-mega-card-image-wrap">
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="sobha-mega-card-image"
                />
              </div>
              <span className="sobha-mega-card-title">{card.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export type SobhaFooterAppBadges = {
  appIcon: string;
  appBadgeIos: string;
  appBadgeAndroid: string;
};

/** Optional contact column rendered on the left of the footer. */
export type SobhaFooterContact = {
  /** Tagline rendered under the logo (e.g. "Custom Home Builder | Architectural Firm"). */
  tagline?: string;
  address?: string;
  phone?: string;
  phoneHref?: string;
  email?: string;
  emailHref?: string;
  hours?: string;
};

export type SobhaFooterProps = {
  brand: ChromeBrand;
  groups: ChromeFooterGroup[];
  socials: ChromeFooterLink[];
  legal: ChromeFooterLink[];
  /** Sobha-only app-download badges. Omit on AriaLux. */
  appBadges?: SobhaFooterAppBadges;
  /** AriaLux contact details. Omit on Sobha. */
  contact?: SobhaFooterContact;
  /** Optional copyright suffix (e.g. "Powered by GoDaddy"). */
  copyrightSuffix?: string;
};

function FooterSocialIcon({ label }: { label: string }) {
  const key = label.toLowerCase();
  if (key === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (key === "facebook") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V5c-.6-.1-1.4-.2-2.4-.2-2.3 0-3.9 1.4-3.9 4v2.2H7.6v3h2.5V21h3.4z" />
      </svg>
    );
  }
  return null;
}

export function SobhaFooter({
  brand,
  groups,
  socials,
  legal,
  appBadges,
  contact,
  copyrightSuffix,
}: SobhaFooterProps) {
  return (
    <footer className="border-t border-black/10 bg-[#f9f9f9] px-6 py-16 text-black lg:px-10 lg:pb-10">
      <div className="mx-auto max-w-[81rem]">
        <div className="flex items-center justify-center gap-6">
          <span className="h-px flex-1 bg-black/15" aria-hidden="true" />
          {brand.footerLogo}
          <span className="h-px flex-1 bg-black/15" aria-hidden="true" />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          {contact ? (
            <div className="space-y-4 lg:col-span-4">
              <h2 className="text-sm font-medium uppercase tracking-[0.22em] text-black">
                Visit Our Studio
              </h2>
              {contact.tagline ? (
                <p className="text-sm font-light text-black/70">{contact.tagline}</p>
              ) : null}
              <ul className="space-y-3 text-black/70">
                {contact.address ? (
                  <li className="text-sm font-light leading-relaxed">{contact.address}</li>
                ) : null}
                {contact.phone ? (
                  <li>
                    <a
                      href={contact.phoneHref ?? `tel:${contact.phone}`}
                      className="text-[0.78rem] font-medium uppercase tracking-[0.18em] transition hover:text-black"
                    >
                      {contact.phone}
                    </a>
                  </li>
                ) : null}
                {contact.email ? (
                  <li>
                    <a
                      href={contact.emailHref ?? `mailto:${contact.email}`}
                      className="text-[0.78rem] font-medium uppercase tracking-[0.18em] transition hover:text-black"
                    >
                      {contact.email}
                    </a>
                  </li>
                ) : null}
                {contact.hours ? (
                  <li className="text-sm font-light text-black/55">{contact.hours}</li>
                ) : null}
              </ul>
              {socials.length > 0 ? (
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={`${brand.name} on ${social.label}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-black/70 transition hover:border-black hover:text-black"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FooterSocialIcon label={social.label} />
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          <div className={cn("grid gap-10 sm:grid-cols-2", contact ? "lg:col-span-8 lg:grid-cols-3" : "lg:col-span-12 lg:grid-cols-6")}>
            {groups.map((group) => (
              <div key={group.title} className="space-y-5">
                <h2 className="text-sm font-medium uppercase tracking-[0.22em] text-black">
                  {group.title}
                </h2>
                <ul className="space-y-3 text-black/70">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[0.78rem] font-medium uppercase tracking-[0.18em] transition hover:text-black"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-8 border-t border-black/10 pt-10 lg:flex-row lg:items-center">
          {appBadges ? (
            <div className="space-y-4">
              <img src={appBadges.appIcon} alt={`${brand.name} app logo`} className="h-10 w-auto" />
              <div className="flex flex-wrap items-center gap-3">
                <img
                  src={appBadges.appBadgeIos}
                  alt={`Download ${brand.name} app on the Apple App Store`}
                  className="h-10 w-auto"
                />
                <img
                  src={appBadges.appBadgeAndroid}
                  alt={`Download ${brand.name} app on Google Play`}
                  className="h-10 w-auto"
                />
              </div>
            </div>
          ) : (
            <div />
          )}

          {!contact && socials.length > 0 ? (
            <div className="flex flex-wrap items-center gap-3 text-[0.72rem] uppercase tracking-[0.24em] text-black/60">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="rounded-full border border-black/15 px-3 py-2 transition hover:border-black hover:text-black"
                >
                  {social.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-black/10 pt-6 text-sm text-black/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {brand.copyright}
            {copyrightSuffix ? <span className="ml-2 text-black/40">{copyrightSuffix}</span> : null}
          </p>
          {legal.length > 0 ? (
            <div className="flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-black/60">
              {legal.map((link, index) => (
                <span key={link.label} className="flex items-center gap-3">
                  {index > 0 ? <span className="text-black/25">|</span> : null}
                  <a href={link.href} className="transition hover:text-black">
                    {link.label}
                  </a>
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
