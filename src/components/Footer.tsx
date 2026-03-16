import type { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import styles from "./Footer.module.css";

type FooterProps = {
  config: Content.LayoutDocument["data"] | null | undefined;
  footerLinks: Content.LayoutDocument["data"]["footer_links"];
};

export function Footer({ config, footerLinks }: FooterProps) {
  const logo = config?.footer_logo?.url
    ? config.footer_logo
    : config?.header_logo?.url
      ? config.header_logo
      : null;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          {logo && (
            <div className={styles.logo}>
              <PrismicNextImage field={logo} height={40} />
            </div>
          )}
          <nav className={styles.footerNav} aria-label="Footer">
            <ul className={styles.footerList}>
              {footerLinks?.map((item, i) => (
                <li key={i} className={styles.footerItem}>
                  <PrismicNextLink
                    field={item.link}
                    className={styles.footerLink}
                  >
                    {item.label}
                  </PrismicNextLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={styles.contact}>
          <div className={styles.office}>
            <strong>Aberdeen (HQ)</strong>
            {config?.aberdeen_address && (
              <div className={styles.address}>
                <PrismicRichText field={config.aberdeen_address} />
              </div>
            )}
            {config?.aberdeen_phone && (
              <p className={styles.phone}>
                <a href={`tel:${config.aberdeen_phone.replace(/\s/g, "")}`}>
                  {config.aberdeen_phone}
                </a>
              </p>
            )}
            {config?.aberdeen_email && (
              <p>
                <a href={`mailto:${config.aberdeen_email}`}>
                  {config.aberdeen_email}
                </a>
              </p>
            )}
            {config?.aberdeen_hours && (
              <p className={styles.hours}>{config.aberdeen_hours}</p>
            )}
          </div>
          <div className={styles.office}>
            <strong>Houston</strong>
            {config?.houston_address && (
              <div className={styles.address}>
                <PrismicRichText field={config.houston_address} />
              </div>
            )}
            {config?.houston_phone && (
              <p className={styles.phone}>
                <a href={`tel:${config.houston_phone.replace(/\s/g, "")}`}>
                  {config.houston_phone}
                </a>
              </p>
            )}
            {config?.houston_email && (
              <p>
                <a href={`mailto:${config.houston_email}`}>
                  {config.houston_email}
                </a>
              </p>
            )}
          </div>
        </div>
        {config?.phone_menu && config.phone_menu.length > 0 && (
          <div className={styles.phoneMenu}>
            <PrismicRichText field={config.phone_menu} />
          </div>
        )}
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
    </footer>
  );
}
