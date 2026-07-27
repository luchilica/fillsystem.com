"use client";

import { useState } from "react";
import styles from "./FaqAccordion.module.css";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className={styles.list}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `faq-panel-${i}`;
        const triggerId = `faq-trigger-${i}`;
        return (
          <div key={i} className={styles.item}>
            <h3 className={styles.heading}>
              <button
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                id={triggerId}
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                type="button"
              >
                <span>{item.question}</span>
                <span
                  className={`${styles.toggle} ${isOpen ? styles.toggleOpen : ""}`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className={styles.panel}
            >
              <p className={styles.answer}>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
