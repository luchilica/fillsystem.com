"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { LOCALES, LOCALE_META, DEFAULT_LOCALE, type Locale } from "@/i18n/locales";
import styles from "./LanguageSwitcher.module.css";

// Compact circular toggle showing the current locale's short code (EN / ES /
// RU / 中); click opens a menu of published locales. Hidden until a second
// locale is published. Plain <a> links (next-intl) — works without JS, no
// flags, no auto-redirect (docs/multilingual.md).
export default function LanguageSwitcher() {
  const active = useLocale() as Locale;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const shown = LOCALES.filter((l) => LOCALE_META[l].enabled);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (shown.length < 2) return null;

  return (
    <div className={styles.wrap} ref={ref}>
      <button
        type="button"
        className={styles.toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${LOCALE_META[active].label}: change language`}
        onClick={() => setOpen((o) => !o)}
      >
        {LOCALE_META[active].short}
      </button>

      {open && (
        <ul className={styles.menu} role="menu">
          {shown.map((l) => {
            const isActive = l === active;
            const prefix = LOCALE_META[l].prefix;
            const href = l === DEFAULT_LOCALE ? (pathname || "/") : `${prefix}${pathname}`;
            return (
              <li key={l} role="none">
                <a
                  role="menuitem"
                  href={href}
                  hrefLang={LOCALE_META[l].htmlLang}
                  aria-current={isActive ? "true" : undefined}
                  className={`${styles.item} ${isActive ? styles.itemActive : ""}`}
                  onClick={() => setOpen(false)}
                >
                  <span className={styles.code}>{LOCALE_META[l].short}</span>
                  <span className={styles.name}>{LOCALE_META[l].label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
