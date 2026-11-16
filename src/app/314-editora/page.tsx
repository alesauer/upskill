import React from "react";
import type { Metadata } from "next";
import { BookOpen, Check } from "lucide-react";
import { getAllBooks } from "@/lib/db";
import {
  Container,
  Section,
  ButtonLink,
  Eyebrow,
} from "@/components/DesignSystem";

export const metadata: Metadata = {
  title: "Editora 314",
  description:
    "Livros físicos do Universo Narrado pela Editora 314: Lições de Cálculo e Guia de Fórmulas Explicadas.",
};

export default function EditoraPage() {
  const books = getAllBooks();

  return (
    <>
      <Section className="pt-12 pb-16 bg-[#ffffff]">
        <Container>
          <div className="max-w-[780px] space-y-6">
            <Eyebrow>Editora 314</Eyebrow>
            <h1 className="text-[44px] sm:text-[56px] lg:text-[64px] font-black leading-[1.04] tracking-[-1.79px] text-[#03203d]">
              Livros escritos para quem se recusa a{" "}
              <span className="font-[var(--font-young-serif)] font-normal italic">
                decorar
              </span>
              .
            </h1>
            <p className="text-[20px] font-light text-[#1c3752] leading-[1.45]">
              A Editora 314 nasceu em 2025 junto com o Lições de Cálculo — cuja
              primeira edição esgotou em sete dias. Cada obra é impressa em capa
              dura e pensada para acompanhar sua jornada do papel ao quadro.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <ButtonLink href="/cursos" variant="primary">
                Ver Cursos Associados
              </ButtonLink>
              <ButtonLink href="/suporte" variant="secondary">
                Dúvidas sobre Envio
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f5f4f0] border-t border-[#e3e7eb]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {books.map((book) => {
              const price = (book.price_cents / 100).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              });

              return (
                <article
                  key={book.slug}
                  id={book.slug}
                  style={{ backgroundColor: book.surface_color }}
                  className="rounded-[24px] border border-[#03203d] p-8 shadow-[4px_4px_0_#03203d] flex flex-col justify-between gap-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-[#0cf2b5] border border-[#03203d] px-3 py-1 text-[12px] font-bold uppercase tracking-[1px] text-[#03203d]">
                        {book.badge}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#1c3752]">
                        <BookOpen size={16} /> {book.pages} páginas
                      </span>
                    </div>

                    <h2 className="text-[32px] font-black leading-[1.1] text-[#03203d]">
                      {book.title}
                    </h2>
                    <p className="text-[16px] font-bold text-[#4a6079]">
                      {book.subtitle} · {book.edition}
                    </p>
                    <p className="text-[17px] font-light text-[#1c3752] leading-[1.5]">
                      {book.description}
                    </p>

                    <ul className="space-y-2.5 pt-2">
                      {book.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2.5 text-[15px] font-light text-[#1c3752]"
                        >
                          <Check
                            size={17}
                            className="shrink-0 mt-0.5 text-[#03203d]"
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#03203d]/15 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="block text-[12px] font-bold uppercase text-[#4a6079]">
                        Edição física
                      </span>
                      <span className="text-[24px] font-black text-[#03203d]">
                        {price}
                      </span>
                    </div>
                    <ButtonLink href="/suporte" variant="primary">
                      Consultar Disponibilidade
                    </ButtonLink>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}

