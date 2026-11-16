import React from "react";
import Link from "next/link";
import { getAllCourses } from "@/lib/db";
import {
  Container,
  Section,
  ButtonLink,
  Eyebrow,
} from "@/components/DesignSystem";
import { CourseCoverArt } from "@/components/CourseCoverArt";
import { TimelineSection } from "@/components/TimelineSection";

export default function HomePage() {
  const courses = getAllCourses();

  const metrics = [
    { value: "+1 milhão", label: "de alunos alcançados, do ENEM ao ITA" },
    { value: "2.000", label: "aulas gratuitas no YouTube" },
    { value: "5 estrelas", label: "no Google, em mais de 3.900 avaliações" },
    { value: "Milhares", label: "de aprovados no ENEM, Fuvest, EsPCEx, ITA, IME" },
  ];

  const approvals = [
    "Medicina · UFPE",
    "EsPCEx",
    "Medicina · FURG",
    "Força Aérea · EEAR",
    "Medicina · UFPA",
    "Medicina · UFMS e UFTM",
    "Medicina · Unesp",
  ];

  const pillars = [
    {
      num: "01",
      title: "Conectar saberes",
      desc: "O aprendizado começa na desconstrução. Você questiona, entende a fundo e liga as áreas do conhecimento numa visão só.",
      bg: "#fff9d6",
    },
    {
      num: "02",
      title: "Ir além do óbvio",
      desc: "Ver além do superficial e entender o que importa. Pensar além das fórmulas é o mínimo.",
      bg: "#eaf0ff",
    },
    {
      num: "03",
      title: "Autonomia intelectual",
      desc: "Um pensador independente, livre pra explorar as próprias ideias. Sapere aude: ouse saber mais.",
      bg: "#f1ecff",
    },
  ];

  return (
    <>
      {/* Hero */}
      <Section className="pt-12 pb-16 md:pt-16 md:pb-24 bg-[#ffffff]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <Eyebrow>Matrículas abertas</Eyebrow>
              <h1 className="text-[44px] sm:text-[56px] lg:text-[64px] font-black leading-[1.04] tracking-[-1.79px] text-[#03203d] text-balance">
                Estude pra{" "}
                <span className="font-[var(--font-young-serif)] font-normal italic">
                  sempre
                </span>{" "}
                na maior escola de exatas do país.
              </h1>
              <p className="text-[18px] sm:text-[20px] leading-[1.45] font-light text-[#1c3752] max-w-[600px]">
                Na Vitalícia, o acesso aos cursos não acaba e acompanha cada
                atualização. Quem se matricula ainda ganha o Guia de Fórmulas
                Explicadas.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <ButtonLink href="/cursos" variant="primary">
                  Conhecer Os Cursos
                </ButtonLink>
                <ButtonLink href="/cursos#diagnostico" variant="secondary">
                  Descobrir Minha Trilha
                </ButtonLink>
              </div>

              <p className="text-[15px] font-light text-[#4a6079]">
                Já é aluno do UN?{" "}
                <Link
                  href="/entrar"
                  className="font-bold text-[#03203d] underline underline-offset-4"
                >
                  Acesse a Área do Aluno
                </Link>{" "}
                com condição especial.
              </p>
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
                    href={`/cursos/${course.slug}`}
                    compact
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Metrics Strip */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {metrics.map((m) => (
              <div
                key={m.value}
                className="rounded-[16px] border border-[#03203d] bg-[#ffffff] p-6 shadow-[4px_4px_0_#03203d]"
              >
                <div className="text-[32px] font-black leading-[1.1] tracking-[-0.8px] text-[#03203d]">
                  {m.value}
                </div>
                <p className="mt-2 text-[15px] font-light text-[#4a6079] leading-[1.45]">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* A ideia */}
      <Section className="bg-[#03203d] text-[#ffffff]">
        <Container>
          <div className="max-w-[780px] space-y-5">
            <span className="inline-block rounded-full bg-[#0cf2b5] text-[#03203d] px-3.5 py-1 text-[13px] font-bold uppercase tracking-[1.04px]">
              A ideia
            </span>
            <h2 className="text-[38px] sm:text-[48px] font-black leading-[1.08] tracking-[-1.15px] text-[#ffffff]">
              A nota é apenas uma consequência
            </h2>
            <p className="text-[20px] font-light leading-[1.5] text-[#e3e7eb]">
              Para nós, a verdadeira vitória é a sua transformação. A nota alta?
              É apenas a consequência.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {approvals.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center rounded-full border border-[#ffffff]/40 bg-[#0a2c4e] px-4 py-2 text-[14px] font-bold text-[#0cf2b5]"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.num}
                style={{ backgroundColor: pillar.bg }}
                className="rounded-[16px] border border-[#03203d] p-6 text-[#03203d] shadow-[4px_4px_0_rgba(255,255,255,0.9)] flex flex-col justify-between gap-4"
              >
                <span className="inline-flex w-fit rounded-full bg-[#ffffff] border border-[#03203d] px-3 py-0.5 text-[13px] font-bold">
                  {pillar.num}
                </span>
                <div>
                  <h3 className="text-[22px] font-black leading-[1.2] text-[#03203d]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-[16px] font-light leading-[1.5] text-[#1c3752]">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Como isso começou (Timeline) */}
      <Section className="bg-[#ffffff]">
        <Container>
          <div className="max-w-[780px] mb-10 space-y-4">
            <Eyebrow>Como isso começou</Eyebrow>
            <h2 className="text-[36px] sm:text-[48px] font-black leading-[1.08] tracking-[-1.15px] text-[#03203d]">
              Um canal que começou num quarto virou a maior escola de exatas do
              Brasil
            </h2>
            <p className="text-[18px] font-light text-[#4a6079]">
              Um menino de 17 anos percebeu que se formaria na escola sem saber
              o mínimo de matemática. Da recusa à própria ignorância, nasceu um
              canal e uma escola.
            </p>
            <div className="pt-1">
              <Link
                href="/sobre/historia"
                className="text-[16px] font-bold text-[#03203d] underline decoration-[#0cf2b5] decoration-2 underline-offset-4 hover:text-[#1c3752]"
              >
                Ler a história, contada pelo Felipe →
              </Link>
            </div>
          </div>

          <TimelineSection />
        </Container>
      </Section>

      {/* Escada dos 4 cursos + CTA */}
      <Section className="bg-[#f5f4f0] border-t border-[#e3e7eb]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-[640px] space-y-3">
              <Eyebrow>A trilha</Eyebrow>
              <h2 className="text-[36px] sm:text-[48px] font-black leading-[1.08] tracking-[-1.15px] text-[#03203d]">
                Quatro cursos, uma escada
              </h2>
              <p className="text-[18px] font-light text-[#1c3752]">
                Cada um pega você onde o anterior deixou. Você pode entrar em
                qualquer degrau, mas ninguém pula o porquê.
              </p>
            </div>
            <ButtonLink href="/cursos" variant="primary">
              Ver Todos Os Cursos
            </ButtonLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <Link
                key={course.slug}
                href={`/cursos/${course.slug}`}
                style={{ backgroundColor: course.surface_color }}
                className="un-card-link rounded-[16px] border border-[#03203d] p-6 shadow-[4px_4px_0_#03203d] flex flex-col justify-between gap-4 no-underline"
              >
                <div className="space-y-3">
                  <span
                    style={{ backgroundColor: course.accent_badge }}
                    className="inline-block rounded-full border border-[#03203d] px-3 py-0.5 text-[12px] font-bold text-[#03203d]"
                  >
                    {course.code}
                  </span>
                  <h3 className="text-[22px] font-black text-[#03203d] leading-[1.15]">
                    {course.title}
                  </h3>
                  <p className="text-[15px] font-light text-[#1c3752]">
                    {course.subtitle}
                  </p>
                </div>
                <span className="text-[14px] font-bold text-[#03203d]">
                  Conhecer o curso →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

