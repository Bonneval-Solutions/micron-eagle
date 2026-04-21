import { type FC } from "react";
import { type Content } from "@prismicio/client";
import { type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

type StatsBandProps = SliceComponentProps<Content.StatsBandSlice>;

const StatsBand: FC<StatsBandProps> = ({ slice }) => {
  if (slice.items.length === 0) return null;

  return (
    <section className={styles.statsBand}>
      <div className={styles.grid}>
        {slice.items.map((item, i) => (
          <div key={i} className={styles.item}>
            {item.number && (
              <span className={styles.number}>{item.number}</span>
            )}
            {item.label && (
              <span className={styles.label}>{item.label}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsBand;
