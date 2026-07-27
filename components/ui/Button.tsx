import type { ReactNode } from "react";
import { Plus } from "lucide-react";
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

  // href present → render an anchor with the same styling.
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-disabled={disabled || undefined}
        {...rest}
      >
        {content}
      </a>
    );
  }

  // Otherwise render a native button.
  return (
    <button type={type} className={classes} disabled={disabled} {...rest}>
      {content}
    </button>
  );
}
