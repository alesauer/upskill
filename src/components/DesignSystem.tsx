import * as React from "react";
import Link from "next/link";

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "night";
  size?: "sm" | "md";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const variantClass =
    variant === "primary"
      ? "un-btn-primary"
      : variant === "night"
      ? "un-btn-night"
      : "un-btn-secondary";
  const sizeClass =
    size === "sm" ? "min-h-[44px] px-4 text-[15px] rounded-full" : "";

  return (
    <button
      className={cx("un-btn", variantClass, sizeClass, className)}
      {...props}
    >
      {children}
    </button>
  );
}

export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "primary" | "secondary" | "night";
  size?: "sm" | "md";
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const variantClass =
    variant === "primary"
      ? "un-btn-primary"
      : variant === "night"
      ? "un-btn-night"
      : "un-btn-secondary";
  const sizeClass =
    size === "sm" ? "min-h-[44px] px-4 text-[15px] rounded-full" : "";

  return (
    <Link
      href={href}
      className={cx("un-btn", variantClass, sizeClass, className)}
      {...props}
    >
      {children}
    </Link>
  );
}

export function Container({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx("mx-auto w-full max-w-[1260px] px-5 sm:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function Section({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cx("py-16 md:py-24", className)} {...props}>
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-block text-[13px] leading-[1.55] tracking-[1.04px] font-bold uppercase text-[#03203d] bg-[#0cf2b5] border border-[#03203d] rounded-full px-3.5 py-1",
        className
      )}
    >
      {children}
    </span>
  );
}
