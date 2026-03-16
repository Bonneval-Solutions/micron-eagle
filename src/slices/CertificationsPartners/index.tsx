import { type FC } from "react";
import { type Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type CertificationsPartnersProps =
  SliceComponentProps<Content.CertificationsPartnersSlice>;

const CertificationsPartners: FC<CertificationsPartnersProps> = ({ slice }) => {
  return (
    <section className={styles.certificationsPartners}>
      {slice.primary.headline && (
        <div className={styles.heading}>
          <PrismicRichText field={slice.primary.headline} />
        </div>
      )}
      <div className={styles.grid}>
        {slice.items.map((item, i) => {
          const hasLink = item.link && "url" in item.link;
          return (
            <div key={i} className={styles.item}>
              {hasLink ? (
                <PrismicNextLink field={item.link!} className={styles.link}>
                  {item.image?.url && (
                    <PrismicNextImage
                      field={item.image}
                      width={120}
                      height={60}
                      className={styles.logo}
                    />
                  )}
                  {item.label && (
                    <span className={styles.label}>{item.label}</span>
                  )}
                </PrismicNextLink>
              ) : (
                <>
                  {item.image?.url && (
                    <PrismicNextImage
                      field={item.image}
                      width={120}
                      height={60}
                      className={styles.logo}
                    />
                  )}
                  {item.label && (
                    <span className={styles.label}>{item.label}</span>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CertificationsPartners;
