import { type FC } from "react";
import { type Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type CoreServicesProps = SliceComponentProps<Content.CoreServicesV2Slice>;

const CoreServices: FC<CoreServicesProps> = ({ slice }) => {
  return (
    <section className={styles.coreServices}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>What We Do</span>
          {slice.primary.section_heading && (
            <div className={styles.heading}>
              <PrismicRichText field={slice.primary.section_heading} />
            </div>
          )}
        </div>

        <div className={styles.grid}>
          {slice.items.map((item, i) => (
            <PrismicNextLink key={i} field={item.link} className={styles.card}>
              {item.image?.url && (
                <div className={styles.image}>
                  <PrismicNextImage field={item.image} fill />
                </div>
              )}
              <div className={styles.body}>
                <div className={styles.top}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <span className={styles.arrow} aria-hidden="true">↗</span>
                </div>
                <PrismicRichText field={item.description} />
                <span className={styles.tag}>Learn more</span>
              </div>
            </PrismicNextLink>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreServices;
