"use client";

import Link from "next/link";
import { useState } from "react";
import type { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import styles from "./Header.module.css";

type HeaderProps = {
  config: Content.LayoutDocument["data"] | null | undefined;
  navLinks: Content.LayoutDocument["data"]["nav_links"];
};

export function Header({ config, navLinks }: HeaderProps) {
  const logo = config?.header_logo?.url ? config.header_logo : null;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="Micron Eagle Home">
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
            {navLinks?.map((item, i) => (
              <li key={i} className={styles.navItem}>
                <PrismicNextLink
                  field={item.link}
                  className={styles.navLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </PrismicNextLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
