import { type FC } from "react";
import { type Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type IndustryApplicationsProps =
  SliceComponentProps<Content.IndustryApplicationsSlice>;

const IndustryApplications: FC<IndustryApplicationsProps> = ({ slice }) => {
  return (
    <section className={styles.industryApplications}>
      {slice.primary.section_heading && (
        <div className={styles.heading}>
          <PrismicRichText field={slice.primary.section_heading} />
        </div>
      )}
      <div className={styles.grid}>
        {slice.items.map((item, i) => (
          <PrismicNextLink key={i} field={item.link} className={styles.card}>
            {item.image?.url && (
              <div className={styles.image}>
                <PrismicNextImage field={item.image} fill />
              </div>
            )}
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <PrismicRichText field={item.copy} />
          </PrismicNextLink>
        ))}
      </div>
    </section>
  );
};

export default IndustryApplications;
