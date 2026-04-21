import { type FC } from "react";
import { type Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type IndustryApplicationsProps =
  SliceComponentProps<Content.IndustryApplicationsV2Slice>;

const IndustryApplications: FC<IndustryApplicationsProps> = ({ slice }) => {
  return (
    <section className={styles.industryApplications}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <span className={styles.eyebrow}>Industries</span>
            {slice.primary.section_heading && (
              <div className={styles.heading}>
                <PrismicRichText field={slice.primary.section_heading} />
              </div>
            )}
          </div>
        </div>

        <div className={styles.grid}>
          {slice.items.map((item, i) => (
            <PrismicNextLink key={i} field={item.link} className={styles.card}>
              <div className={styles.bg}>
                {item.image?.url && (
                  <PrismicNextImage field={item.image} fill />
                )}
              </div>
              <div className={styles.overlay} />
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <div className={styles.cardBody}>
                  <PrismicRichText field={item.copy} />
                </div>
                <span className={styles.arrow} aria-hidden="true">↗</span>
              </div>
            </PrismicNextLink>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryApplications;
