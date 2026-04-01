"use client";

import { type FC, useRef } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./index.module.css";

type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero: FC<HeroProps> = ({ slice }) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const subheadlineRef = useRef<HTMLDivElement | null>(null);
  const ctasRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const targets = [
        contentRef.current,
        headlineRef.current,
        subheadlineRef.current,
        ctasRef.current,
        imageRef.current,
      ].filter(Boolean);

      if (targets.length === 0) return;

      if (prefersReducedMotion) {
        gsap.set(targets, { opacity: 1, y: 0, scale: 1, clearProps: "all" });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.fromTo(
        contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
      )
        .fromTo(
          headlineRef.current,
          { scale: 0.86, opacity: 0, y: 24 },
          { scale: 1, opacity: 1, y: 0, duration: 1.1 },
          "-=0.2",
        )
        .fromTo(
          subheadlineRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.65",
        )
        .fromTo(
          ctasRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75 },
          "-=0.55",
        )
        .fromTo(
          imageRef.current,
          { scale: 1.06, opacity: 0.6 },
          { scale: 1, opacity: 1, duration: 1.3 },
          "-=1.1",
        );
    },
    { scope: containerRef },
  );

  return (
    <section className={styles.hero} ref={containerRef}>
      {slice.primary.background_image?.url && (
        <div className={styles.heroBg} ref={imageRef}>
          <PrismicNextImage field={slice.primary.background_image} fill />
        </div>
      )}

      <div className={styles.overlay} />

      <div className={styles.heroContent} ref={contentRef}>
        <div className={styles.headline} ref={headlineRef}>
          <PrismicRichText field={slice.primary.headline} />
        </div>
        <div className={styles.subheadline} ref={subheadlineRef}>
          <PrismicRichText field={slice.primary.subheadline} />
        </div>
        <div className={styles.ctas} ref={ctasRef}>
          {slice.primary.primary_cta_label &&
            isFilled.link(slice.primary.primary_cta_link) && (
            <PrismicNextLink
              field={slice.primary.primary_cta_link}
              className={styles.primaryCta}
            >
              {slice.primary.primary_cta_label}
            </PrismicNextLink>
          )}
          {slice.primary.secondary_cta_label &&
            isFilled.link(slice.primary.secondary_cta_link) && (
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
