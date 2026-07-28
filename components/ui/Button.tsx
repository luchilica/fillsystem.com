import type { ReactNode, MouseEvent } from "react";
import { Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import styles from "./Button.module.css";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "dark"
  | "on-brand"
  | "on-brand-outline";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  dark: styles.dark,
  "on-brand": styles.onBrand,
  "on-brand-outline": styles.onBrandOutline,
};

interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  icon?: boolean;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  // Remaining HTML attributes (e.g. data-request-type, aria-*, onClick).
  [key: string]: unknown;
}

export default function Button({
  variant = "primary",
  href,
  icon = false,
  children,
  className,
  type = "button",
  disabled = false,
  ...rest
}: ButtonProps) {
  const classes = [
    styles.button,
    VARIANT_CLASS[variant],
    disabled ? styles.disabled : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {children}
      {icon && <Plus size={20} className={styles.icon} aria-hidden="true" />}
    </>
  );

  if (href) {
    const disabledProps = disabled
      ? { tabIndex: -1 as const, onClick: (e: MouseEvent) => e.preventDefault() }
      : {};

    const isInternal = href.startsWith("/") && !href.startsWith("//");

    if (isInternal) {
      return (
        <Link
          href={href}
          className={classes}
          aria-disabled={disabled || undefined}
          {...disabledProps}
          {...rest}
        >
          {content}
        </Link>
      );
    }

    return (
      <a
        href={href}
        className={classes}
        aria-disabled={disabled || undefined}
        {...disabledProps}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} {...rest}>
      {content}
    </button>
  );
}
