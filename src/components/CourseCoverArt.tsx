import React from "react";
import Link from "next/link";
import { cx } from "./DesignSystem";

interface CourseCoverArtProps {
  code: "DMAT" | "LM" | "LF" | "LC";
  title: string;
  subtitle?: string;
  surfaceColor: string;
  accentBadge: string;
  href?: string;
  compact?: boolean;
}

const codeSymbols: Record<CourseCoverArtProps["code"], string> = {
  DMAT: "a/b + c",
  LM: "f(x) = y",
  LF: "F = dp/dt",
  LC: "∫ f(x) dx",
};

export function CourseCoverArt({
  code,
  title,
  subtitle,
  surfaceColor,
  accentBadge,
  href,
  compact = false,
}: CourseCoverArtProps) {
  const card = (
    <div
      style={{ backgroundColor: surfaceColor }}
      className={cx(
        "relative flex flex-col justify-between rounded-[16px] border border-[#03203d] shadow-[4px_4px_0_#03203d] overflow-hidden select-none",
        compact ? "p-4 aspect-[0.73/1]" : "p-6 aspect-[0.73/1] max-w-[346px] w-full",
        href && "un-card-link"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          style={{ backgroundColor: accentBadge }}
          className="inline-flex items-center rounded-full border border-[#03203d] px-2.5 py-0.5 text-[12px] font-bold tracking-[1px] text-[#03203d]"
        >
          {code}
        </span>
        <span className="text-[11px] font-bold uppercase tracking-[1px] text-[#4a6079]">
          UN
        </span>
      </div>

      <div className="my-auto py-3">
        <div
          className={cx(
            "font-[var(--font-young-serif)] text-[#03203d] leading-tight",
            compact ? "text-[20px]" : "text-[30px]"
          )}
        >
          {codeSymbols[code]}
        </div>
        <h3
          className={cx(
            "mt-3 font-black text-[#03203d] leading-[1.12] tracking-[-0.5px]",
            compact ? "text-[16px]" : "text-[24px]"
          )}
        >
          {title}
        </h3>
        {subtitle && !compact && (
          <p className="mt-2 text-[14px] font-light text-[#1c3752] leading-[1.4]">
            {subtitle}
          </p>
        )}
      </div>

      <div className="pt-2 border-t border-[#03203d]/15 flex items-center justify-between text-[12px] font-bold text-[#1c3752]">
        <span>Felipe Guisoli</span>
        <span>→</span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#03203d] rounded-[16px]"
        aria-label={`Capa do curso ${title}`}
      >
        {card}
      </Link>
    );
  }

  return card;
}

