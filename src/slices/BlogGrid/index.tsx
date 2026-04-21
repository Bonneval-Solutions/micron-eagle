import { type FC } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type BlogGridProps = SliceComponentProps<Content.BlogGridSlice>;

/** Format a Prismic date string (YYYY-MM-DD) to e.g. "April 2025" */
function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

const BlogGrid: FC<BlogGridProps> = ({ slice }) => {
  return (
    <section className={styles.blogGrid}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            {slice.primary.eyebrow && (
              <span className={styles.eyebrow}>{slice.primary.eyebrow}</span>
            )}
            {slice.primary.section_heading && (
              <div className={styles.heading}>
                <PrismicRichText field={slice.primary.section_heading} />
              </div>
            )}
          </div>

          {slice.primary.view_all_label &&
            isFilled.link(slice.primary.view_all_link) && (
              <PrismicNextLink
                field={slice.primary.view_all_link}
                className={styles.viewAll}
              >
                {slice.primary.view_all_label}
              </PrismicNextLink>
            )}
        </div>

        <div className={styles.grid}>
          {slice.items.map((item, i) => (
            <PrismicNextLink
              key={i}
              field={item.link}
              className={styles.card}
            >
              <div className={styles.media}>
                {item.cover_image?.url ? (
                  <PrismicNextImage field={item.cover_image} fill />
                ) : (
                  <div className={styles.mediaPlaceholder} />
                )}
                {item.category && (
                  <span className={styles.category}>{item.category}</span>
                )}
              </div>

              <div className={styles.body}>
                {item.date && (
                  <span className={styles.date}>{formatDate(item.date)}</span>
                )}
                {item.title && (
                  <div className={styles.title}>
                    <PrismicRichText field={item.title} />
                  </div>
                )}
                {item.excerpt && (
                  <div className={styles.excerpt}>
                    <PrismicRichText field={item.excerpt} />
                  </div>
                )}
              </div>

              <div className={styles.footer}>
                <span>{item.read_more_label || "Read article"}</span>
                <span className={styles.footerArrow} aria-hidden="true">→</span>
              </div>
            </PrismicNextLink>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;
