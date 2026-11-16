import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import { getAllCourses } from "@/lib/db";
import {
  Container,
  Section,
  ButtonLink,
  Eyebrow,
} from "@/components/DesignSystem";
import { CourseCoverArt } from "@/components/CourseCoverArt";
import { TrilhaCalculator } from "@/components/TrilhaCalculator";

export const metadata: Metadata = {
  title: "Cursos",
  description:
    "Os cursos de física e matemática do Universo Narrado: Desvendando a Matemática, Lições de Matemática, Lições de Física e Lições de Cálculo.",
};

export default function CursosPage() {
  const courses = getAllCourses();

  return (
    <>
      {/* Band 2: Hero */}
      <Section className="pt-12 pb-16 md:pt-12 md:pb-24 bg-[#ffffff]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <Eyebrow>Cursos</Eyebrow>
              <h1 className="text-[44px] sm:text-[56px] lg:text-[64px] font-black leading-[1.04] tracking-[-1.79px] text-[#03203d] text-balance">
                Escolha o curso pelo ponto em que{" "}
                <span className="font-[var(--font-young-serif)] font-normal italic">
                  você
                </span>{" "}
                está.
              </h1>
              <p className="text-[18px] sm:text-[20px] leading-[1.45] font-light text-[#1c3752] max-w-[580px]">
                Cada curso do Universo Narrado começa na ideia, não na fórmula.
                Do zero absoluto até o Cálculo do ITA e do IME, com a trilha
                ajustada ao seu vestibular.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <ButtonLink
                  href="/cursos/desvendando-a-matematica"
                  variant="primary"
                >
                  Começar Do Zero
                </ButtonLink>
                <ButtonLink href="#trilha" variant="secondary">
                  Ver A Trilha
                </ButtonLink>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4 max-w-[420px] mx-auto">
                {courses.map((course) => (
                  <CourseCoverArt
                    key={course.slug}
                    code={course.code}
                    title={course.title}
                    surfaceColor={course.surface_color}
                    accentBadge={course.accent_badge}
                    href={`#${course.code.toLowerCase()}`}
                    compact
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Band 3: A trilha (ol.trilha 4 columns) */}
      <Section id="trilha" className="bg-[#ffffff] border-t border-[#e3e7eb]">
        <Container>
          <div className="max-w-[720px] mx-auto text-center space-y-4 mb-14">
            <Eyebrow>A trilha</Eyebrow>
            <h2 className="text-[36px] sm:text-[48px] font-black leading-[1.08] tracking-[-1.15px] text-[#03203d]">
              Quatro cursos, uma escada
            </h2>
            <p className="text-[18px] leading-[1.5] font-light text-[#1c3752]">
              Cada um pega você onde o anterior deixou. Você pode entrar em
              qualquer degrau, mas ninguém pula o porquê.
            </p>
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, idx) => (
              <li key={course.slug}>
                <Link
                  href={`#${course.code.toLowerCase()}`}
                  style={{ backgroundColor: course.surface_color }}
                  className="un-card-link h-full rounded-[16px] border border-[#03203d] p-6 shadow-[4px_4px_0_#03203d] flex flex-col justify-between gap-4 no-underline"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        style={{ backgroundColor: course.accent_badge }}
                        className="rounded-full border border-[#03203d] px-3 py-0.5 text-[12px] font-bold text-[#03203d]"
                      >
                        {course.code}
                      </span>
                      <span className="text-[13px] font-bold text-[#4a6079]">
                        Degrau 0{idx + 1}
                      </span>
                    </div>
                    <h3 className="text-[20px] font-bold leading-[1.2] text-[#03203d]">
                      {course.title}
                    </h3>
                    <p className="text-[15px] font-light text-[#1c3752]">
                      {course.subtitle}
                    </p>
                  </div>
                  <span className="text-[14px] font-bold text-[#03203d]">
                    Ver detalhes ↓
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Bands 4–7: Individual Course Bands */}
      {courses.map((course, idx) => {
        const isReversed = idx % 2 === 1;
        return (
          <Section
            key={course.slug}
            id={course.code.toLowerCase()}
            className="bg-[#ffffff] border-t border-[#e3e7eb]"
          >
            <Container>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div
                  className={`lg:col-span-5 flex justify-center ${
                    isReversed ? "lg:order-2" : ""
                  }`}
                >
                  <CourseCoverArt
                    code={course.code}
                    title={course.title}
                    subtitle={course.subtitle}
                    surfaceColor={course.surface_color}
                    accentBadge={course.accent_badge}
                    href={`/cursos/${course.slug}`}
                  />
                </div>

                <div
                  className={`lg:col-span-7 space-y-5 ${
                    isReversed ? "lg:order-1" : ""
                  }`}
                >
                  <span
                    style={{ backgroundColor: course.surface_color }}
                    className="inline-block rounded-full border border-[#03203d] px-3.5 py-1 text-[13px] font-bold uppercase tracking-[1.04px] text-[#03203d]"
                  >
                    {course.eyebrow}
                  </span>

                  <h2 className="text-[36px] sm:text-[48px] font-black leading-[1.08] tracking-[-1.15px] text-[#03203d]">
                    {course.title}
                  </h2>

                  <p className="text-[18px] leading-[1.45] font-light text-[#1c3752] max-w-[600px]">
                    {course.description}
                  </p>

                  <ul className="grid grid-cols-1 gap-3 pt-2">
                    {course.for_who.map((item) => (
                      <li
                        key={item}
                        style={{ backgroundColor: course.surface_color }}
                        className="flex items-start gap-3 rounded-[12px] border border-[#03203d] p-4 text-[16px] font-light text-[#1c3752]"
                      >
                        <Check
                          size={18}
                          className="shrink-0 mt-0.5 text-[#03203d]"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-4 pt-3">
                    <ButtonLink
                      href={`/cursos/${course.slug}`}
                      variant="primary"
                    >
                      Conhecer O Curso
                    </ButtonLink>
                    {course.code === "LC" && (
                      <ButtonLink
                        href="/314-editora#licoes-de-calculo"
                        variant="secondary"
                      >
                        Ver O Livro
                      </ButtonLink>
                    )}
                  </div>
                </div>
              </div>
            </Container>
          </Section>
        );
      })}

      {/* Interactive Diagnostic Calculator */}
      <Section
        id="diagnostico"
        className="bg-[#eaf0ff] border-t border-[#e3e7eb]"
      >
        <Container>
          <TrilhaCalculator />
        </Container>
      </Section>

      {/* Band 8: Área do aluno + Não sabe por onde começar? */}
      <Section className="bg-[#ffffff] border-t border-[#e3e7eb]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[28px] border border-[#03203d] bg-[#03203d] text-[#ffffff] p-8 sm:p-10 shadow-[4px_4px_0_#0cf2b5] flex flex-col justify-between gap-6">
              <div className="space-y-3">
                <h2 className="text-[32px] sm:text-[40px] font-black leading-[1.08] tracking-[-0.96px] text-[#ffffff]">
                  Área do aluno
                </h2>
                <p className="text-[18px] sm:text-[20px] font-light leading-[1.45] text-[#e3e7eb]">
                  Já é aluno do Universo Narrado? Aulas, exercícios e dúvidas
                  ficam na plataforma.
                </p>
              </div>
              <div>
                <ButtonLink href="/entrar" variant="night">
                  Entrar
                </ButtonLink>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#03203d] bg-[#f5f4f0] p-8 sm:p-10 shadow-[4px_4px_0_#03203d] flex flex-col justify-between gap-6">
              <div className="space-y-3">
                <h2 className="text-[32px] sm:text-[40px] font-black leading-[1.08] tracking-[-0.96px] text-[#03203d]">
                  Não sabe por onde começar?
                </h2>
                <p className="text-[18px] sm:text-[20px] font-light leading-[1.45] text-[#1c3752]">
                  Conta pra equipe qual vestibular você vai prestar e em que
                  ponto está. A gente indica o curso.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <ButtonLink href="/suporte" variant="primary">
                  Falar Com A Equipe
                </ButtonLink>
                <a
                  href="https://www.youtube.com/@UniversoNarrado"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] font-bold text-[#03203d] underline underline-offset-4"
                >
                  Ver aulas gratuitas
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

