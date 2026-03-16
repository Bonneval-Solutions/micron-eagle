import { type FC } from "react";
import { type Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <section className={styles.hero}>
      {slice.primary.background_image?.url && (
        <div className={styles.heroBg}>
          <PrismicNextImage field={slice.primary.background_image} fill />
        </div>
      )}
      <div className={styles.heroContent}>
        <PrismicRichText field={slice.primary.headline} />
        <PrismicRichText field={slice.primary.subheadline} />
        <div className={styles.ctas}>
          {slice.primary.primary_cta_label && (
            <PrismicNextLink
              field={slice.primary.primary_cta_link}
              className={styles.primaryCta}
            >
              {slice.primary.primary_cta_label}
            </PrismicNextLink>
          )}
          {slice.primary.secondary_cta_label && (
            <PrismicNextLink
              field={slice.primary.secondary_cta_link}
              className={styles.secondaryCta}
            >
              {slice.primary.secondary_cta_label}
            </PrismicNextLink>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
