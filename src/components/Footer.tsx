import type { Content, RichTextField, LinkField } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import styles from "./Footer.module.css";

type NavDropdownItem =
  Content.LayoutDocument["data"]["nav_dropdown_items"][number];

export type FooterOfficeItem = {
  office_name?: string | null;
  address?: RichTextField;
  phone?: string | null;
  email?: string | null;
  hours?: string | null;
};

export type FooterLegalLinkItem = {
  label?: string | null;
  link?: LinkField;
};

type FooterProps = {
  config: Content.LayoutDocument["data"] | null | undefined;
  navLinks: Content.LayoutDocument["data"]["nav_links"];
  navDropdownItems: Content.LayoutDocument["data"]["nav_dropdown_items"];
  footerOffices: FooterOfficeItem[];
  footerLegalLinks: FooterLegalLinkItem[];
};

export function Footer({
  config,
  navLinks,
  navDropdownItems,
  footerOffices,
  footerLegalLinks,
}: FooterProps) {
  const logo = config?.footer_logo?.url
    ? config.footer_logo
    : config?.header_logo?.url
      ? config.header_logo
      : null;

  const dropdownMap = new Map<string, NavDropdownItem[]>();
  for (const item of navDropdownItems ?? []) {
    if (!item.parent_label) continue;
    const key = item.parent_label.trim();
    const existing = dropdownMap.get(key) ?? [];
    dropdownMap.set(key, [...existing, item]);
  }

  const validOffices = footerOffices.filter((o) => o.office_name);
  const hasLegal = footerLegalLinks.length > 0;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Section 1: Brand + Nav + Socials */}
        <div className={styles.top}>
          {logo && (
            <div className={styles.logo}>
              <PrismicNextImage field={logo} height={40} fallbackAlt="" />
            </div>
          )}
          <nav className={styles.footerNav} aria-label="Footer">
            <ul className={styles.footerList}>
              {navLinks?.map((item, i) => {
                const subItems = item.label
                  ? (dropdownMap.get(item.label.trim()) ?? [])
                  : [];
                return (
                  <li key={i} className={styles.footerItem}>
                    <PrismicNextLink
                      field={item.link}
                      className={styles.footerLink}
                    >
                      {item.label}
                    </PrismicNextLink>
                    {subItems.length > 0 && (
                      <ul className={styles.footerSubList}>
                        {subItems.map((sub, j) => (
                          <li key={j} className={styles.footerSubItem}>
                            <PrismicNextLink
                              field={sub.link}
                              className={styles.footerSubLink}
                            >
                              {sub.label}
                            </PrismicNextLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
          {config?.social_links && config.social_links.length > 0 && (
            <ul className={styles.social}>
              {config.social_links.map((item, i) => {
                const href =
                  item.url && "url" in item.url ? item.url.url : null;
                return href ? (
                  <li key={i}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                    >
                      {item.platform || "Link"}
                    </a>
                  </li>
                ) : null;
              })}
            </ul>
          )}
        </div>

        {/* Section 2: Offices */}
        {validOffices.length > 0 && (
          <div className={styles.offices}>
            {validOffices.map((office, i) => (
              <div key={i} className={styles.office}>
                <strong>{office.office_name}</strong>
                {office.address && (
                  <div className={styles.address}>
                    <PrismicRichText field={office.address} />
                  </div>
                )}
                {office.phone && (
                  <p className={styles.phone}>
                    <a href={`tel:${office.phone.replace(/\s/g, "")}`}>
                      {office.phone}
                    </a>
                  </p>
                )}
                {office.email && (
                  <p>
                    <a href={`mailto:${office.email}`}>{office.email}</a>
                  </p>
                )}
                {office.hours && (
                  <p className={styles.hours}>{office.hours}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Section 3: Legal */}
        {hasLegal && (
          <div className={styles.legalRow}>
            <ul className={styles.legalList}>
              {footerLegalLinks.map((item, i) => (
                <li key={i}>
                  <PrismicNextLink
                    field={item.link as LinkField}
                    className={styles.legalLink}
                  >
                    {item.label}
                  </PrismicNextLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </footer>
  );
}
