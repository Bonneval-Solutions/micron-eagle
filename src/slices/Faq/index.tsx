"use client";

import { type FC, useState } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type FaqProps = SliceComponentProps<Content.FaqSlice>;

const Faq: FC<FaqProps> = ({ slice }) => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className={styles.faq}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.sidebar}>
            {slice.primary.eyebrow && (
              <span className={styles.eyebrow}>{slice.primary.eyebrow}</span>
            )}
            {slice.primary.section_heading && (
              <div className={styles.heading}>
                <PrismicRichText field={slice.primary.section_heading} />
              </div>
            )}
            {slice.primary.subtext && (
              <div className={styles.sub}>
                <PrismicRichText field={slice.primary.subtext} />
              </div>
            )}
            {slice.primary.cta_label &&
              isFilled.link(slice.primary.cta_link) && (
                <PrismicNextLink
                  field={slice.primary.cta_link}
                  className={styles.cta}
                >
                  {slice.primary.cta_label}
                </PrismicNextLink>
              )}
          </div>

          <div className={styles.list}>
            {slice.items.map((item, i) =>
              item.question ? (
                <div key={i} className={styles.item}>
                  <button
                    className={styles.question}
                    data-open={openIndex === i ? "true" : "false"}
                    aria-expanded={openIndex === i}
                    onClick={() =>
                      setOpenIndex(openIndex === i ? -1 : i)
                    }
                  >
                    {item.question}
                    <span className={styles.icon} aria-hidden="true">+</span>
                  </button>
                  <div
                    className={styles.answer}
                    data-open={openIndex === i ? "true" : "false"}
                  >
                    <PrismicRichText field={item.answer} />
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
