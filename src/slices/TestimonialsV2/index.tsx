import { type FC } from "react";
import { type Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type TestimonialsProps = SliceComponentProps<Content.TestimonialsV2Slice>;

const Testimonials: FC<TestimonialsProps> = ({ slice }) => {
  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Client Feedback</span>
          {slice.primary.section_heading && (
            <div className={styles.heading}>
              <PrismicRichText field={slice.primary.section_heading} />
            </div>
          )}
        </div>

        <div className={styles.grid}>
          {slice.items.map(
            (item, i) =>
              item.quote && (
                <blockquote key={i} className={styles.card}>
                  <div className={styles.stars} aria-label="5 stars">
                    {"★★★★★".split("").map((s, j) => (
                      <span key={j} className={styles.star}>{s}</span>
                    ))}
                  </div>
                  <div className={styles.quote}>
                    <PrismicRichText field={item.quote} />
                  </div>
                  <footer className={styles.footer}>
                    <div className={styles.avatar} aria-hidden="true">
                      {item.attribution
                        ? item.attribution
                            .split(" ")
                            .slice(0, 2)
                            .map((w) => w[0])
                            .join("")
                        : "?"}
                    </div>
                    <div>
                      {item.attribution && (
                        <cite className={styles.name}>{item.attribution}</cite>
                      )}
                      {item.role_company && (
                        <span className={styles.role}>{item.role_company}</span>
                      )}
                    </div>
                  </footer>
                </blockquote>
              )
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
