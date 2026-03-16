import { type FC } from "react";
import { type Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type CtaBandProps = SliceComponentProps<Content.CtaBandSlice>;

const CtaBand: FC<CtaBandProps> = ({ slice }) => {
  return (
    <section className={styles.ctaBand}>
      <div className={styles.content}>
        {slice.primary.headline && (
          <div className={styles.heading}>
            <PrismicRichText field={slice.primary.headline} />
          </div>
        )}
        <div className={styles.ctas}>
          {slice.items.map(
            (item, i) =>
              item.cta_label && (
                <PrismicNextLink
                  key={i}
                  field={item.cta_link}
                  className={styles.cta}
                >
                  {item.cta_label}
                </PrismicNextLink>
              )
          )}
        </div>
      </div>
    </section>
  );
};

export default CtaBand;
