"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cx } from "./DesignSystem";

const timelineMilestones = [
  {
    year: "2013",
    headline: "Uma questão certa, de trinta, na prova do ITA.",
    detail:
      "Eu tinha 17 anos quando abri uma prova do ITA e tentei resolver. Acertei uma questão. E fração ainda era um problema.",
  },
  {
    year: "2014",
    headline: "Nasce o Queda Livre vendendo paçoca no centro de BH.",
    detail:
      "Três meses vendendo paçoca no centro de BH, cinco por um real, pra comprar a câmera. No mesmo ano vira monitor de turma ITA em um grande cursinho.",
  },
  {
    year: "2016",
    headline: "1º lugar em Engenharia Mecânica na UFMG.",
    detail:
      "Faz o ENEM e passa em 1º lugar em Engenharia Mecânica na UFMG, consolidando o método de estudar pelo porquê.",
  },
  {
    year: "2017",
    headline: "Abaixo-assinado dos alunos para virar professor da turma ITA.",
    detail:
      "Os alunos fazem um abaixo-assinado pra que ele vire professor de física da turma ITA nesse grande cursinho. Ainda cursando engenharia, sem diploma nenhum.",
  },
  {
    year: "2018",
    headline: "O professor mais novo da maior escola do estado.",
    detail:
      "Vira o professor mais novo da maior escola do estado. Larga a engenharia no 7º período e muda pra Física.",
  },
  {
    year: "2019",
    headline: "O Queda Livre vira o Universo Narrado.",
    detail:
      "O projeto ganha novo nome e identidade. No mesmo ano se forma em Física na UFMG.",
  },
  {
    year: "2020",
    headline: "Nasce o Desvendando a Matemática (DMAT).",
    detail:
      "Pede demissão de todos os empregos, em plena pandemia, pra se dedicar só ao UN. Entra no mestrado em gravitação quântica.",
  },
  {
    year: "2021",
    headline: "Nasce o Lições de Física (LF).",
    detail:
      "A física inteira do ensino médio, do fenômeno à fórmula, sem pular o porquê.",
  },
  {
    year: "2023",
    headline: "Nasce o Lições de Matemática (LM) e o UN Militares.",
    detail:
      "Preparação completa para ENEM, Fuvest, Unicamp e concursos militares: ITA, IME, AFA, EsPCEx, EFOMM, Escola Naval e EEAR.",
  },
  {
    year: "2025",
    headline: "Nasce o Lições de Cálculo e a Editora 314.",
    detail:
      "A primeira edição do livro esgota em sete dias. No mesmo ano abre a unidade presencial, na Rua da Bahia, em Belo Horizonte.",
  },
  {
    year: "2026",
    headline: "Guia de Fórmulas Explicadas e UN Superiores.",
    detail:
      "Sai o Guia de Fórmulas Explicadas, em dois livros de capa dura pela Editora 314. E nasce o UN Superiores.",
  },
  {
    year: "Hoje",
    headline: "Mais de 50 mil alunos e um milhão de inscritos.",
    detail:
      "Uma escola inteira construída sobre o porquê, com sede em BH e alunos aprovados nos vestibulares mais difíceis do Brasil.",
  },
];

export function TimelineSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = timelineMilestones[activeIndex];

  return (
    <div className="rounded-[28px] border border-[#03203d] bg-[#eaf0ff] p-6 sm:p-10 shadow-[4px_4px_0_#03203d]">
      <div className="flex flex-wrap gap-2 pb-6 border-b border-[#03203d]/15">
        {timelineMilestones.map((item, idx) => {
          const active = idx === activeIndex;
          return (
            <button
              key={item.year}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={cx(
                "rounded-full px-3.5 py-1.5 text-[14px] font-bold border border-[#03203d] transition duration-150 cursor-pointer",
                active
                  ? "bg-[#0cf2b5] text-[#03203d] shadow-[2px_2px_0_#03203d]"
                  : "bg-[#ffffff] text-[#1c3752] hover:bg-[#fff9d6]"
              )}
            >
              {item.year}
            </button>
          );
        })}
      </div>

      <div className="py-8 min-h-[190px] flex flex-col justify-between gap-6">
        <div>
          <span className="inline-block text-[13px] font-bold uppercase tracking-[1.04px] text-[#03203d] bg-[#ffffff] border border-[#03203d] rounded-full px-3 py-1">
            {current.year}
          </span>
          <h3 className="mt-4 text-[26px] sm:text-[32px] font-black leading-[1.15] tracking-[-0.6px] text-[#03203d]">
            {current.headline}
          </h3>
          <p className="mt-3 text-[18px] leading-[1.5] font-light text-[#1c3752] max-w-[740px]">
            {current.detail}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-[14px] font-bold text-[#4a6079]">
            Marco {activeIndex + 1} de {timelineMilestones.length}
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
              disabled={activeIndex === 0}
              aria-label="Marco anterior"
              className="un-btn un-btn-secondary !min-h-[44px] !px-4 bg-[#ffffff] disabled:opacity-40"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveIndex((i) =>
                  Math.min(timelineMilestones.length - 1, i + 1)
                )
              }
              disabled={activeIndex === timelineMilestones.length - 1}
              aria-label="Próximo marco"
              className="un-btn un-btn-primary !min-h-[44px] !px-4 disabled:opacity-40"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

