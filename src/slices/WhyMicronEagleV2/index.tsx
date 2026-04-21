import { type FC } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type WhyMicronEagleProps = SliceComponentProps<Content.WhyMicronEagleV2Slice>;

const WhyMicronEagle: FC<WhyMicronEagleProps> = ({ slice }) => {
  return (
    <section className={styles.why}>
      <div className={styles.container}>
        <div className={styles.inner}>
          {slice.primary.image?.url && (
            <div className={styles.media}>
              <PrismicNextImage field={slice.primary.image} fill />
              {slice.primary.founded_year && (
                <div className={styles.accent}>
                  <strong>{slice.primary.founded_year}</strong>
                  <span>Established<br />Aberdeen</span>
                </div>
              )}
            </div>
          )}

          <div className={styles.content}>
            <span className={styles.eyebrow}>Why Micron Eagle</span>
            {slice.primary.headline && (
              <div className={styles.heading}>
                <PrismicRichText field={slice.primary.headline} />
              </div>
            )}
            {slice.primary.body && (
              <div className={styles.body}>
                <PrismicRichText field={slice.primary.body} />
              </div>
            )}
            {slice.items.length > 0 && (
              <ul className={styles.bullets}>
                {slice.items.map(
                  (item, i) =>
                    item.bullet && (
                      <li key={i} className={styles.bullet}>
                        {item.bullet}
                      </li>
                    )
                )}
              </ul>
            )}
            {slice.primary.cta_label && isFilled.link(slice.primary.cta_link) && (
              <PrismicNextLink field={slice.primary.cta_link} className={styles.cta}>
                {slice.primary.cta_label}
              </PrismicNextLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyMicronEagle;
