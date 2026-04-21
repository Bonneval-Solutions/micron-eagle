import { type FC } from "react";
import { type Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type CertificationsPartnersProps =
  SliceComponentProps<Content.CertificationsPartnersV2Slice>;

/** Parse "9001:2015" → { number: "9001", year: "2015" } */
function parseIso(cert: string | null | undefined) {
  if (!cert) return null;
  const [number, year] = cert.split(":");
  return { number: number?.trim(), year: year?.trim() };
}

const CertificationsPartners: FC<CertificationsPartnersProps> = ({ slice }) => {
  const isoCerts = [
    slice.primary.iso_cert_1,
    slice.primary.iso_cert_2,
    slice.primary.iso_cert_3,
  ]
    .map(parseIso)
    .filter(Boolean);

  return (
    <section className={styles.certificationsPartners}>
      <div className={styles.inner}>
        {/* Optional headline */}
        {slice.primary.headline && (
          <div className={styles.headline}>
            <PrismicRichText field={slice.primary.headline} />
          </div>
        )}

        {/* Partners label + logos */}
        {slice.primary.partners_label && (
          <span className={styles.label}>{slice.primary.partners_label}</span>
        )}

        {slice.items.length > 0 && (
          <>
            {slice.primary.partners_label && (
              <div className={styles.divider} aria-hidden="true" />
            )}
            <div className={styles.logos}>
              {slice.items.map((item, i) => {
                const hasLink = item.link && "url" in item.link;
                const content = (
                  <>
                    <div className={styles.logoBox}>
                      {item.image?.url ? (
                        <PrismicNextImage
                          field={item.image}
                          width={100}
                          height={44}
                          className={styles.logoImg}
                        />
                      ) : (
                        <span className={styles.logoFallback}>{item.label}</span>
                      )}
                    </div>
                    {item.label && (
                      <span className={styles.logoName}>{item.label}</span>
                    )}
                  </>
                );

                return hasLink ? (
                  <PrismicNextLink
                    key={i}
                    field={item.link!}
                    className={styles.logoItem}
                  >
                    {content}
                  </PrismicNextLink>
                ) : (
                  <div key={i} className={styles.logoItem}>
                    {content}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ISO certifications */}
        {slice.primary.show_iso_certs && isoCerts.length > 0 && (
          <>
            <div className={styles.divider} aria-hidden="true" />
            <span className={styles.label}>Certifications</span>
            <div className={styles.isoGroup}>
              {isoCerts.map(
                (cert, i) =>
                  cert && (
                    <div key={i} className={styles.isoBadge}>
                      <span className={styles.isoBadgeTop}>ISO</span>
                      <span className={styles.isoBadgeNum}>{cert.number}</span>
                      {cert.year && (
                        <span className={styles.isoBadgeYear}>{cert.year}</span>
                      )}
                    </div>
                  )
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CertificationsPartners;
