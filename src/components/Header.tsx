"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import type { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import styles from "./Header.module.css";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { defaultLocale, type Locale } from "@/i18n";

type NavDropdownItem =
  Content.LayoutDocument["data"]["nav_dropdown_items"][number];

type HeaderProps = {
  config: Content.LayoutDocument["data"] | null | undefined;
  navLinks: Content.LayoutDocument["data"]["nav_links"];
  navDropdownItems: Content.LayoutDocument["data"]["nav_dropdown_items"];
  lang: Locale;
};

export function Header({
  config,
  navLinks,
  navDropdownItems,
  lang,
}: HeaderProps) {
  const logo = config?.header_logo?.url ? config.header_logo : null;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null,
  );
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  const transparent = isHome && !scrolled && !isMenuOpen;

  // Build a map from parent_label → sub-items for O(1) lookup per nav item
  const dropdownMap = new Map<string, NavDropdownItem[]>();
  for (const item of navDropdownItems ?? []) {
    if (!item.parent_label) continue;
    const key = item.parent_label.trim();
    const existing = dropdownMap.get(key) ?? [];
    dropdownMap.set(key, [...existing, item]);
  }

  function toggleDropdown(index: number) {
    setOpenDropdownIndex((prev) => (prev === index ? null : index));
  }

  function closeAll() {
    setOpenDropdownIndex(null);
    setIsMenuOpen(false);
  }

  return (
    <header
      className={`${styles.header} ${transparent ? styles.transparent : styles.solid}`}
    >
      <div className={styles.inner}>
        <Link
          href={`/${lang}`}
          className={styles.logo}
          aria-label="Micron Eagle Home"
        >
          {logo ? (
            <PrismicNextImage
              field={config!.header_logo}
              height={48}
              fallbackAlt=""
            />
          ) : (
            <span className={styles.logoText}>Micron Eagle</span>
          )}
        </Link>

        <button
          type="button"
          className={styles.menuButton}
          data-open={isMenuOpen ? "true" : "false"}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className={styles.menuIcon} aria-hidden="true" />
        </button>

        <nav
          id="main-navigation"
          className={styles.nav}
          data-open={isMenuOpen ? "true" : "false"}
          aria-label="Main"
        >
          <ul className={styles.navList}>
            {navLinks?.map((item, i) => {
              const subItems = item.label
                ? (dropdownMap.get(item.label.trim()) ?? [])
                : [];
              const hasDropdown = subItems.length > 0;
              const isOpen = openDropdownIndex === i;

              if (!hasDropdown) {
                return (
                  <li key={i} className={styles.navItem}>
                    <PrismicNextLink
                      field={item.link}
                      className={styles.navLink}
                      onClick={closeAll}
                    >
                      {item.label}
                    </PrismicNextLink>
                  </li>
                );
              }

              return (
                <li
                  key={i}
                  className={`${styles.navItem} ${styles.navItemWithDropdown}`}
                  onMouseEnter={() => setOpenDropdownIndex(i)}
                  onMouseLeave={() => setOpenDropdownIndex(null)}
                >
                  <button
                    type="button"
                    className={`${styles.navLink} ${styles.dropdownToggle}`}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => toggleDropdown(i)}
                  >
                    {item.label}
                    <span
                      className={styles.dropdownChevron}
                      data-open={isOpen ? "true" : "false"}
                      aria-hidden="true"
                    />
                  </button>

                  <ul
                    className={styles.dropdown}
                    data-open={isOpen ? "true" : "false"}
                    role="menu"
                  >
                    {/* Top-level link as first entry if there's a link on the parent */}
                    {item.link && (
                      <li className={styles.dropdownItem} role="none">
                        <PrismicNextLink
                          field={item.link}
                          className={styles.dropdownLink}
                          role="menuitem"
                          onClick={closeAll}
                        >
                          {item.label} — Overview
                        </PrismicNextLink>
                      </li>
                    )}
                    {subItems.map((sub, j) => (
                      <li key={j} className={styles.dropdownItem} role="none">
                        <PrismicNextLink
                          field={sub.link}
                          className={styles.dropdownLink}
                          role="menuitem"
                          onClick={closeAll}
                        >
                          {sub.label}
                        </PrismicNextLink>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
          <LanguageSwitcher currentLang={lang} />
        </nav>
      </div>
    </header>
  );
}
