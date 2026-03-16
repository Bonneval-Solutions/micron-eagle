import Link from "next/link";
import type { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import styles from "./Header.module.css";

type HeaderProps = {
  config: Content.LayoutDocument["data"] | null | undefined;
  navLinks: Content.LayoutDocument["data"]["nav_links"];
};

export function Header({ config, navLinks }: HeaderProps) {
  const logo = config?.header_logo?.url ? config.header_logo : null;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="Micron Eagle Home">
          {logo ? (
            <PrismicNextImage field={config!.header_logo} height={48} />
          ) : (
            <span className={styles.logoText}>Micron Eagle</span>
          )}
        </Link>
        <nav className={styles.nav} aria-label="Main">
          <ul className={styles.navList}>
            {navLinks?.map((item, i) => (
              <li key={i} className={styles.navItem}>
                <PrismicNextLink field={item.link} className={styles.navLink}>
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
