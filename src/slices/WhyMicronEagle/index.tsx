import { type FC } from "react";
import { type Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type WhyMicronEagleProps = SliceComponentProps<Content.WhyMicronEagleSlice>;

const WhyMicronEagle: FC<WhyMicronEagleProps> = ({ slice }) => {
  return (
    <section className={styles.whyMicronEagle}>
      <div className={styles.content}>
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
      </div>
    </section>
  );
};

export default WhyMicronEagle;
