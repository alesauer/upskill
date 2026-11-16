import React from "react";
import Link from "next/link";
import { Container } from "./DesignSystem";
import { BrandLogo } from "./Navbar";

export function Footer() {
  return (
    <footer className="bg-[#ffffff] border-t border-[#e3e7eb] py-16">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8">
          <div className="flex flex-col gap-4">
            <BrandLogo />
            <p className="text-[18px] leading-[1.45] font-bold text-[#03203d] max-w-[300px]">
              Tornar as pessoas mais inteligentes.{" "}
              <span className="italic font-normal font-[var(--font-serif)]">
                Sapere aude.
              </span>
            </p>
            <p className="text-[15px] leading-[1.55] font-light text-[#4a6079] max-w-[320px]">
              Física e matemática ensinadas pelo porquê. Cursos, livros e aulas
              gratuitas do professor Felipe Guisoli.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.youtube.com/@UniversoNarrado"
                target="_blank"
                rel="noopener noreferrer"
                className="un-pill bg-[#ffffff] text-[#03203d] hover:bg-[#eaf0ff] text-[14px]"
                aria-label="YouTube do Universo Narrado"
              >
                YouTube
              </a>
              <Link
                href="/suporte"
                className="un-pill bg-[#0cf2b5] text-[#03203d] text-[14px]"
                aria-label="Suporte no WhatsApp"
              >
                WhatsApp
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-[15px] font-bold uppercase tracking-[1.04px] text-[#03203d]">
              Cursos
            </h3>
            <ul className="flex flex-col gap-2.5 text-[15px] font-light text-[#1c3752]">
              <li>
                <Link
                  href="/cursos/desvendando-a-matematica"
                  className="hover:text-[#03203d] hover:underline underline-offset-4"
                >
                  Desvendando a Matemática
                </Link>
              </li>
              <li>
                <Link
                  href="/cursos/licoes-de-matematica"
                  className="hover:text-[#03203d] hover:underline underline-offset-4"
                >
                  Lições de Matemática
                </Link>
              </li>
              <li>
                <Link
                  href="/cursos/licoes-de-fisica"
                  className="hover:text-[#03203d] hover:underline underline-offset-4"
                >
                  Lições de Física
                </Link>
              </li>
              <li>
                <Link
                  href="/cursos/licoes-de-calculo"
                  className="hover:text-[#03203d] hover:underline underline-offset-4"
                >
                  Lições de Cálculo
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-[15px] font-bold uppercase tracking-[1.04px] text-[#03203d]">
              Livros
            </h3>
            <ul className="flex flex-col gap-2.5 text-[15px] font-light text-[#1c3752]">
              <li>
                <Link
                  href="/314-editora#licoes-de-calculo"
                  className="hover:text-[#03203d] hover:underline underline-offset-4"
                >
                  Lições de Cálculo
                </Link>
              </li>
              <li>
                <Link
                  href="/314-editora#guia-de-formulas"
                  className="hover:text-[#03203d] hover:underline underline-offset-4"
                >
                  Guia de Fórmulas Explicadas
                </Link>
              </li>
              <li>
                <Link
                  href="/314-editora"
                  className="hover:text-[#03203d] hover:underline underline-offset-4"
                >
                  Editora 314
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-[15px] font-bold uppercase tracking-[1.04px] text-[#03203d]">
              Universo Narrado
            </h3>
            <ul className="flex flex-col gap-2.5 text-[15px] font-light text-[#1c3752]">
              <li>
                <Link
                  href="/entrar"
                  className="hover:text-[#03203d] hover:underline underline-offset-4"
                >
                  Área do aluno
                </Link>
              </li>
              <li>
                <Link
                  href="/suporte"
                  className="hover:text-[#03203d] hover:underline underline-offset-4"
                >
                  Suporte e Central de Ajuda
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre/historia"
                  className="hover:text-[#03203d] hover:underline underline-offset-4"
                >
                  Nossa história
                </Link>
              </li>
              <li>
                <Link
                  href="/cursos#diagnostico"
                  className="hover:text-[#03203d] hover:underline underline-offset-4"
                >
                  Diagnóstico de Trilha
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#e3e7eb] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[14px] text-[#4a6079]">
          <p>© 2026 Universo Narrado. Todos os direitos reservados.</p>
          <p>Belo Horizonte, MG · Rua da Bahia · Editora 314</p>
        </div>
      </Container>
    </footer>
  );
}

