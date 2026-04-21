"use client";

import { type FC, useRef } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./index.module.css";

type MainPathwaysProps = SliceComponentProps<Content.MainPathwaysV2Slice>;

const MainPathways: FC<MainPathwaysProps> = ({ slice }) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  gsap.registerPlugin(useGSAP, ScrollTrigger);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`);
      if (cards.length === 0) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0, clearProps: "all" });
        return;
      }

      gsap.fromTo(
        cards,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section className={styles.mainPathways} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <span className={styles.eyebrow}>Our Expertise</span>
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
            <PrismicNextLink key={i} field={item.link} className={styles.card}>
              {item.icon?.url && (
                <div className={styles.media}>
                  <PrismicNextImage field={item.icon} fill />
                </div>
              )}
              <div className={styles.overlay} />
              <div className={styles.cardContent}>
                <div>
                  {item.category && (
                    <span className={styles.cardLabel}>{item.category}</span>
                  )}
                </div>
                <div className={styles.cardBottom}>
                  <div className={styles.cardTop}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <span className={styles.arrow} aria-hidden="true">↗</span>
                  </div>
                  <div className={styles.description}>
                    <PrismicRichText field={item.description} />
                  </div>
                </div>
              </div>
            </PrismicNextLink>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainPathways;
