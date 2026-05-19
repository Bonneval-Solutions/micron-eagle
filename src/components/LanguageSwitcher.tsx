"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n";
import styles from "./LanguageSwitcher.module.css";

const LABELS: Record<Locale, string> = {
  "en-us": "EN",
  "es-es": "ES",
};

type Props = {
  currentLang: Locale;
};

export function LanguageSwitcher({ currentLang }: Props) {
  const pathname = usePathname();

  function getAlternateHref(targetLang: Locale): string {
    // pathname is always /en-us/... or /es-es/... — swap the first segment
    const segments = pathname.split("/").filter(Boolean);
    segments[0] = targetLang;
    return "/" + segments.join("/");
  }

  return (
    <div className={styles.switcher} aria-label="Language">
      {locales.map((lang, i) => (
        <span key={lang} className={styles.item}>
          {i > 0 && (
            <span className={styles.divider} aria-hidden="true">
              |
            </span>
          )}
          {lang === currentLang ? (
            <span className={styles.active} aria-current="true">
              {LABELS[lang]}
            </span>
          ) : (
            <Link
              href={getAlternateHref(lang)}
              className={styles.link}
              hrefLang={lang}
            >
              {LABELS[lang]}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
