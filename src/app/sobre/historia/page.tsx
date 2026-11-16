import React from "react";
import type { Metadata } from "next";
import {
  Container,
  Section,
  ButtonLink,
  Eyebrow,
} from "@/components/DesignSystem";
import { TimelineSection } from "@/components/TimelineSection";

export const metadata: Metadata = {
  title: "Nossa história",
  description:
    "A trajetória do professor Felipe Guisoli e do Universo Narrado: de 1 questão certa no ITA à maior escola de exatas do Brasil.",
};

export default function HistoriaPage() {
  return (
    <>
      <Section className="pt-12 pb-16 bg-[#ffffff]">
        <Container>
          <div className="max-w-[820px] space-y-6">
            <Eyebrow>Nossa história</Eyebrow>
            <h1 className="text-[40px] sm:text-[56px] lg:text-[64px] font-black leading-[1.04] tracking-[-1.79px] text-[#03203d]">
              Eu tinha 17 anos quando abri uma prova do ITA e tentei resolver.{" "}
              <span className="font-[var(--font-young-serif)] font-normal italic">
                Acertei uma questão.
              </span>
            </h1>
            <p className="text-[20px] font-light text-[#1c3752] leading-[1.5]">
              Daquele choque nasceu uma recusa à própria ignorância — e a
              convicção de que matemática e física só fazem sentido quando você
              entende o porquê de cada ideia, antes de decorar qualquer fórmula.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f5f4f0] border-t border-[#e3e7eb]">
        <Container>
          <TimelineSection />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-[20px] border border-[#03203d] bg-[#ffffff] p-8 shadow-[4px_4px_0_#03203d] space-y-4">
              <h2 className="text-[26px] font-black text-[#03203d]">
                Do quarto para o YouTube e para a Rua da Bahia
              </h2>
              <p className="text-[16px] font-light text-[#1c3752] leading-[1.55]">
                Depois de três meses vendendo paçoca no centro de Belo
                Horizonte — cinco por um real — para comprar a primeira câmera,
                nasceu o canal Queda Livre em 2014. Em 2019 o projeto se tornou
                o Universo Narrado, alcançando mais de um milhão de inscritos e
                50 mil alunos matriculados.
              </p>
            </div>

            <div className="rounded-[20px] border border-[#03203d] bg-[#fff9d6] p-8 shadow-[4px_4px_0_#03203d] space-y-4">
              <h2 className="text-[26px] font-black text-[#03203d]">
                Sapere aude: ouse saber mais
              </h2>
              <p className="text-[16px] font-light text-[#1c3752] leading-[1.55]">
                Nosso lema resume a escola inteira: tornar as pessoas mais
                inteligentes. A aprovação no ENEM, na Fuvest, na EsPCEx, no ITA
                ou no IME vem como consequência natural de quem pensa com
                autonomia.
              </p>
              <div className="pt-2">
                <ButtonLink href="/cursos" variant="primary">
                  Conhecer Os Cursos
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

