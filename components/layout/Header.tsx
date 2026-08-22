"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Logomark from "@/components/ui/Logomark";
import LanguageSwitcher from "./LanguageSwitcher";
import { useT } from "@/i18n/useT";
import styles from "./Header.module.css";

// Labels + targets from docs/texts.md and docs/sitemap.md → "Header".
const NAV_LINKS = [
  { label: "Services", href: "/services/" },
  { label: "How It Works", href: "/#how-the-diagnostic-works" },
  { label: "Scenarios", href: "/case-studies" },
  { label: "About", href: "/about/" },
  { label: "Blog", href: "/blog/" },
  { label: "FAQ", href: "/#faq" },
] as const;

const DRAWER_LINKS = [
  { label: "Services", href: "/services/" },
  { label: "How It Works", href: "/#how-the-diagnostic-works" },
  { label: "Scenarios", href: "/case-studies" },
  { label: "About", href: "/about/" },
  { label: "Blog", href: "/blog/" },
  { label: "FAQ", href: "/#faq" },
] as const;

const CTA_LABEL = "Request Diagnostic";
const CTA_HREF = "/#diagnostic-request-form";
const DRAWER_ID = "mobile-nav-drawer";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const closeDrawer = useCallback(() => {
    setOpen(false);
    // Return focus to the trigger after closing.
    menuButtonRef.current?.focus();
  }, []);

  // Elevate header with a shadow once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Drawer behavior: focus first item, Escape to close, focus trap, body scroll lock.
  useEffect(() => {
    if (!open) return;

    const drawer = drawerRef.current;
    if (!drawer) return;

    const getFocusable = () =>
      Array.from(
        drawer.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );

    // Move focus into the drawer on open.
    getFocusable()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeDrawer();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey) {
        if (active === first || !drawer.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last || !drawer.contains(active)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, closeDrawer]);

  const t = useT();

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label={t("Fill System - home")}>
          <Logomark size={32} className={styles.logoMark} />
          Fill System
        </Link>

        {/* Desktop navigation */}
        <nav className={styles.desktopNav} aria-label="Primary">
          <ul className={styles.navList}>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={styles.navLink}>
                  {t(link.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.desktopLang}>
          <LanguageSwitcher />
        </div>

        <Button
          href={CTA_HREF}
          variant="primary"
          className={styles.desktopCta}
          data-request-type="Business & IT Diagnostic"
        >
          {t(CTA_LABEL)}
        </Button>

        {/* Mobile menu trigger */}
        <button
          ref={menuButtonRef}
          type="button"
          className={styles.menuButton}
          aria-label={open ? t("Close menu") : t("Open menu")}
          aria-expanded={open}
          aria-controls={DRAWER_ID}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X size={24} aria-hidden="true" />
          ) : (
            <Menu size={24} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile drawer + overlay */}
      <div
        className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />
      <div
        ref={drawerRef}
        id={DRAWER_ID}
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
        role={open ? "dialog" : undefined}
        aria-modal={open ? "true" : undefined}
        aria-label={t("Site navigation")}
      >
        <div className={styles.drawerHeader}>
          <button
            type="button"
            className={styles.menuButton}
            aria-label={t("Close menu")}
            aria-controls={DRAWER_ID}
            onClick={closeDrawer}
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        {/* CTA near the top of the drawer */}
        <Button
          href={CTA_HREF}
          variant="primary"
          className={styles.drawerCta}
          data-request-type="Business & IT Diagnostic"
          onClick={closeDrawer}
        >
          {t(CTA_LABEL)}
        </Button>

        <nav aria-label="Mobile primary">
          <ul className={styles.drawerNavList}>
            {DRAWER_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={styles.drawerLink}
                  onClick={closeDrawer}
                >
                  {t(link.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
