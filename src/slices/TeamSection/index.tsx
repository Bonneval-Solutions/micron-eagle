import { type FC } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type TeamSectionProps = SliceComponentProps<Content.TeamSectionSlice>;

const TeamSection: FC<TeamSectionProps> = ({ slice }) => {
  return (
    <section className={styles.teamSection}>
      <div className={styles.container}>
        <div className={styles.header}>
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
        </div>

        <div className={styles.grid}>
          {slice.items.map((item, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.photo}>
                {item.photo?.url ? (
                  <PrismicNextImage field={item.photo} fill />
                ) : (
                  <div className={styles.photoPlaceholder}>
                    {item.name
                      ? item.name
                          .split(" ")
                          .slice(0, 2)
                          .map((w) => w[0])
                          .join("")
                      : "?"}
                  </div>
                )}
                <div className={styles.photoOverlay} />
                {isFilled.link(item.linkedin_url) && (
                  <PrismicNextLink
                    field={item.linkedin_url}
                    className={styles.linkedinBtn}
                    aria-label={`${item.name} on LinkedIn`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    in
                  </PrismicNextLink>
                )}
              </div>
              <div className={styles.body}>
                {item.name && <h3 className={styles.name}>{item.name}</h3>}
                {item.role && <p className={styles.role}>{item.role}</p>}
                {item.bio && (
                  <div className={styles.bio}>
                    <PrismicRichText field={item.bio} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
