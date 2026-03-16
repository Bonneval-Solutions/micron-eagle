import { type FC } from "react";
import { type Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type MainPathwaysProps = SliceComponentProps<Content.MainPathwaysSlice>;

const MainPathways: FC<MainPathwaysProps> = ({ slice }) => {
  return (
    <section className={styles.mainPathways}>
      {slice.primary.section_heading && (
        <div className={styles.heading}>
          <PrismicRichText field={slice.primary.section_heading} />
        </div>
      )}
      <div className={styles.grid}>
        {slice.items.map((item, i) => (
          <PrismicNextLink
            key={i}
            field={item.link}
            className={styles.card}
          >
            {item.icon?.url && (
              <div className={styles.icon}>
                <PrismicNextImage field={item.icon} />
              </div>
            )}
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <PrismicRichText field={item.description} />
          </PrismicNextLink>
        ))}
      </div>
    </section>
  );
};

export default MainPathways;
