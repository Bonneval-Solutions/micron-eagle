import { type FC } from "react";
import { type Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type CtaBandProps = SliceComponentProps<Content.CtaBandV2Slice>;

const CtaBand: FC<CtaBandProps> = ({ slice }) => {
  return (
    <section className={styles.ctaBand}>
      <div className={styles.inner}>
        <div className={styles.text}>
          {slice.primary.eyebrow && (
            <span className={styles.eyebrow}>{slice.primary.eyebrow}</span>
          )}
          {slice.primary.headline && (
            <div className={styles.heading}>
              <PrismicRichText field={slice.primary.headline} />
            </div>
          )}
          {slice.primary.subtext && (
            <div className={styles.sub}>
              <PrismicRichText field={slice.primary.subtext} />
            </div>
          )}
        </div>

        {slice.items.length > 0 && (
          <div className={styles.actions}>
            {slice.items.map((item, i) =>
              item.cta_label ? (
                <PrismicNextLink
                  key={i}
                  field={item.cta_link}
                  className={i === 0 ? styles.btnPrimary : styles.btnOutline}
                >
                  {item.cta_label}
                </PrismicNextLink>
              ) : null
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CtaBand;
