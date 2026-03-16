import { type FC } from "react";
import { type Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

const Testimonials: FC<TestimonialsProps> = ({ slice }) => {
  return (
    <section className={styles.testimonials}>
      {slice.primary.section_heading && (
        <div className={styles.heading}>
          <PrismicRichText field={slice.primary.section_heading} />
        </div>
      )}
      <div className={styles.grid}>
        {slice.items.map(
          (item, i) =>
            item.quote && (
              <blockquote key={i} className={styles.card}>
                <PrismicRichText field={item.quote} />
                <footer className={styles.footer}>
                  {item.attribution && (
                    <cite className={styles.attribution}>
                      {item.attribution}
                    </cite>
                  )}
                  {item.role_company && (
                    <span className={styles.role}>{item.role_company}</span>
                  )}
                </footer>
              </blockquote>
            )
        )}
      </div>
    </section>
  );
};

export default Testimonials;
