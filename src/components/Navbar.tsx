"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Container, ButtonLink, cx } from "./DesignSystem";

const navItems = [
  { label: "Cursos", href: "/cursos" },
  { label: "Editora", href: "/314-editora" },
  { label: "Nossa história", href: "/sobre/historia" },
  { label: "Suporte", href: "/suporte" },
];

export function BrandLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cx(
        "inline-flex items-center gap-2.5 text-[#03203d] no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#03203d] rounded-lg py-1",
        className
      )}
      aria-label="Universo Narrado — Página inicial"
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#0cf2b5] border border-[#03203d] shadow-[2px_2px_0_#03203d] font-black text-[16px] text-[#03203d] tracking-tight">
        UN
      </span>
      <span className="font-bold text-[18px] tracking-[-0.4px] text-[#03203d]">
        Universo <span className="font-black">Narrado</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 h-[88px] w-full bg-[#ffffff]/95 backdrop-blur-sm border-b border-[#e3e7eb]">
      <Container className="h-full flex items-center justify-between gap-6">
        <BrandLogo />

        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-7"
        >
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  "text-[15px] leading-[1.55] transition-colors py-2 px-1 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#03203d]",
                  active
                    ? "font-bold text-[#03203d] underline decoration-[#0cf2b5] decoration-2 underline-offset-8"
                    : "font-light text-[#1c3752] hover:text-[#03203d]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink
            href="/entrar"
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Entrar
          </ButtonLink>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#03203d] bg-[#ffffff] text-[#03203d] shadow-[2px_2px_0_#03203d]"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div className="md:hidden bg-[#ffffff] border-b border-[#03203d] px-5 py-4 shadow-[0_6px_0_#03203d]">
          <nav aria-label="Menu mobile" className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 px-3 rounded-xl text-[16px] font-bold text-[#1c3752] hover:bg-[#eaf0ff] hover:text-[#03203d]"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <ButtonLink
                href="/entrar"
                variant="primary"
                className="w-full"
                onClick={() => setMobileOpen(false)}
              >
                Entrar na Área do Aluno
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
