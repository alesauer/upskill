import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Clock, BookOpen } from "lucide-react";
import { getCourseBySlug } from "@/lib/db";
import {
  Container,
  Section,
  ButtonLink,
  Eyebrow,
} from "@/components/DesignSystem";
import { CourseCoverArt } from "@/components/CourseCoverArt";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const priceFormatted = (course.price_cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <>
      <Section className="pt-12 pb-16 bg-[#ffffff]">
        <Container>
          <div className="mb-6">
            <Link
              href="/cursos"
              className="text-[15px] font-bold text-[#4a6079] hover:text-[#03203d]"
            >
              ← Voltar para todos os cursos
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <Eyebrow>{course.eyebrow}</Eyebrow>
              <h1 className="text-[40px] sm:text-[56px] font-black leading-[1.04] tracking-[-1.5px] text-[#03203d]">
                {course.title}
              </h1>
              <p className="text-[20px] font-light text-[#1c3752] leading-[1.45]">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#03203d] bg-[#f5f4f0] px-4 py-2 text-[14px] font-bold text-[#03203d]">
                  <Clock size={16} /> {course.hours_total}h de aulas
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#03203d] bg-[#f5f4f0] px-4 py-2 text-[14px] font-bold text-[#03203d]">
                  <BookOpen size={16} /> {course.lessons_count} aulas gravadas
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#03203d] bg-[#0cf2b5] px-4 py-2 text-[14px] font-bold text-[#03203d]">
                  Acesso anual ou Vitalício · {priceFormatted}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <ButtonLink href="/entrar" variant="primary">
                  Acessar na Área do Aluno
                </ButtonLink>
                <ButtonLink href="/cursos#diagnostico" variant="secondary">
                  Verificar se é meu degrau
                </ButtonLink>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <CourseCoverArt
                code={course.code}
                title={course.title}
                subtitle={course.subtitle}
                surfaceColor={course.surface_color}
                accentBadge={course.accent_badge}
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f5f4f0] border-t border-[#e3e7eb]">
        <Container>
          <div className="max-w-[760px] mb-10 space-y-3">
            <Eyebrow>Ementa do curso</Eyebrow>
            <h2 className="text-[34px] sm:text-[42px] font-black text-[#03203d]">
              Módulos construídos pelo porquê
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {course.modules.map((mod, idx) => (
              <div
                key={mod.title}
                className="rounded-[16px] border border-[#03203d] bg-[#ffffff] p-6 shadow-[4px_4px_0_#03203d] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span
                    style={{ backgroundColor: course.surface_color }}
                    className="rounded-full border border-[#03203d] px-3 py-0.5 text-[12px] font-bold text-[#03203d]"
                  >
                    Módulo 0{idx + 1}
                  </span>
                  <span className="text-[13px] font-bold text-[#4a6079]">
                    {mod.lessons} aulas · {mod.hours}h
                  </span>
                </div>
                <h3 className="text-[22px] font-black text-[#03203d]">
                  {mod.title}
                </h3>
                <p className="text-[16px] font-light text-[#1c3752]">
                  {mod.summary}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-[20px] border border-[#03203d] bg-[#ffffff] p-6 sm:p-8">
            <h3 className="text-[22px] font-black text-[#03203d] mb-4">
              Para quem este curso foi pensado
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {course.for_who.map((item) => (
                <li
                  key={item}
                  style={{ backgroundColor: course.surface_color }}
                  className="flex items-start gap-2.5 rounded-xl border border-[#03203d] p-4 text-[15px] font-light text-[#1c3752]"
                >
                  <Check size={17} className="shrink-0 mt-0.5 text-[#03203d]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}

