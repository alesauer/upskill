"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, Calculator, CheckCircle2 } from "lucide-react";
import { Button, ButtonLink, cx } from "./DesignSystem";
import type {
  StudyFocus,
  TargetExam,
  TrilhaCalculationResult,
} from "@/lib/calculator";

const examOptions: { value: TargetExam; label: string }[] = [
  { value: "ENEM", label: "ENEM" },
  { value: "FUVEST_UNICAMP", label: "Fuvest / Unicamp" },
  { value: "MEDICINA", label: "Medicina" },
  { value: "ITA_IME", label: "ITA / IME / Militares" },
  { value: "SUPERIOR", label: "Ensino Superior (Cálculo I)" },
];

const focusOptions: { value: StudyFocus; label: string }[] = [
  { value: "AMBAS", label: "Matemática + Física" },
  { value: "MATEMATICA", label: "Foco em Matemática" },
  { value: "FISICA", label: "Foco em Física" },
];

export function TrilhaCalculator() {
  const [targetExam, setTargetExam] = useState<TargetExam>("ENEM");
  const [focus, setFocus] = useState<StudyFocus>("AMBAS");
  const [mathBaseScore, setMathBaseScore] = useState<number>(4);
  const [physicsBaseScore, setPhysicsBaseScore] = useState<number>(4);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(10);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrilhaCalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetExam,
          focus,
          mathBaseScore,
          physicsBaseScore,
          hoursPerWeek,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Erro ao calcular trilha");
      }
      setResult(data.result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[28px] border border-[#03203d] bg-[#ffffff] p-6 sm:p-10 shadow-[4px_4px_0_#03203d]">
      <div className="flex flex-col lg:flex-row gap-10">
        <form onSubmit={handleCalculate} className="flex-1 space-y-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#0cf2b5] border border-[#03203d] px-3.5 py-1 text-[13px] font-bold uppercase tracking-[1.04px] text-[#03203d]">
              <Calculator size={14} /> Motor de Diagnóstico UN
            </span>
            <h3 className="mt-3 text-[28px] sm:text-[34px] font-black leading-[1.12] tracking-[-0.8px] text-[#03203d]">
              Descubra em qual degrau da escada começar
            </h3>
            <p className="mt-2 text-[16px] font-light text-[#4a6079]">
              Informe seu vestibular, sua base atual e suas horas livres por
              semana. Calculamos sua trilha personalizada e salvamos no seu
              histórico.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="block text-[14px] font-bold text-[#03203d] mb-1.5">
                Objetivo principal
              </span>
              <select
                value={targetExam}
                onChange={(e) => setTargetExam(e.target.value as TargetExam)}
                className="w-full h-12 rounded-[12px] border border-[#03203d] bg-[#ffffff] px-3 text-[15px] font-bold text-[#03203d]"
              >
                {examOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="block text-[14px] font-bold text-[#03203d] mb-1.5">
                Foco de estudo
              </span>
              <select
                value={focus}
                onChange={(e) => setFocus(e.target.value as StudyFocus)}
                className="w-full h-12 rounded-[12px] border border-[#03203d] bg-[#ffffff] px-3 text-[15px] font-bold text-[#03203d]"
              >
                {focusOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[14px] font-bold text-[#03203d] mb-1">
                <span>Base em Matemática (frações, equações, funções)</span>
                <span className="px-2 py-0.5 rounded-full bg-[#fff9d6] border border-[#03203d]">
                  {mathBaseScore}/10
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                value={mathBaseScore}
                onChange={(e) => setMathBaseScore(Number(e.target.value))}
                className="w-full accent-[#03203d]"
              />
            </div>

            <div>
              <div className="flex justify-between text-[14px] font-bold text-[#03203d] mb-1">
                <span>Base em Física (cinemática, Newton, energia)</span>
                <span className="px-2 py-0.5 rounded-full bg-[#f1ecff] border border-[#03203d]">
                  {physicsBaseScore}/10
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                value={physicsBaseScore}
                onChange={(e) => setPhysicsBaseScore(Number(e.target.value))}
                className="w-full accent-[#03203d]"
              />
            </div>

            <div>
              <div className="flex justify-between text-[14px] font-bold text-[#03203d] mb-1">
                <span>Disponibilidade semanal para exatas</span>
                <span className="px-2 py-0.5 rounded-full bg-[#eaf0ff] border border-[#03203d]">
                  {hoursPerWeek}h / semana
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={40}
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full accent-[#03203d]"
              />
            </div>
          </div>

          {error && (
            <p className="text-[14px] font-bold text-red-700 bg-red-50 border border-red-300 rounded-xl p-3">
              {error}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Calculando trilha..." : "Calcular Minha Trilha"}
            </Button>
            <a
              href="/api/reports/trilha?format=csv"
              className="un-btn un-btn-secondary text-[15px]"
            >
              <Download size={16} /> Exportar Relatório CSV
            </a>
          </div>
        </form>

        <div className="lg:w-[440px] rounded-[20px] border border-[#03203d] bg-[#f5f4f0] p-6 flex flex-col justify-between">
          {!result ? (
            <div className="my-auto text-center py-8 space-y-3">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0cf2b5] border border-[#03203d] shadow-[3px_3px_0_#03203d] font-black text-[22px] text-[#03203d]">
                ?
              </div>
              <h4 className="text-[20px] font-black text-[#03203d]">
                Seu plano aparecerá aqui
              </h4>
              <p className="text-[15px] font-light text-[#4a6079]">
                Ajuste os controles ao lado e clique em{" "}
                <strong>Calcular Minha Trilha</strong> para ver o curso
                inicial recomendado e o cronograma semanal.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[12px] font-bold uppercase tracking-[1.04px] text-[#4a6079]">
                    Comece por aqui
                  </span>
                  <h4 className="text-[26px] font-black text-[#03203d] leading-tight">
                    {result.recommendedStartCode} —{" "}
                    {
                      result.ladderSteps.find(
                        (s) => s.code === result.recommendedStartCode
                      )?.title
                    }
                  </h4>
                </div>
                <span className="rounded-full bg-[#0cf2b5] border border-[#03203d] px-3 py-1 text-[13px] font-bold text-[#03203d] whitespace-nowrap">
                  Índice {result.readinessIndex}%
                </span>
              </div>

              <p className="text-[15px] font-light text-[#1c3752] leading-relaxed">
                {result.rationale}
              </p>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-[#ffffff] border border-[#03203d] p-2.5">
                  <div className="text-[18px] font-black text-[#03203d]">
                    {result.estimatedWeeks} sem
                  </div>
                  <div className="text-[12px] text-[#4a6079]">
                    ~{result.estimatedMonths} meses
                  </div>
                </div>
                <div className="rounded-xl bg-[#ffffff] border border-[#03203d] p-2.5">
                  <div className="text-[18px] font-black text-[#03203d]">
                    {result.weeklySplit.theoryHours}h
                  </div>
                  <div className="text-[12px] text-[#4a6079]">Teoria/sem</div>
                </div>
                <div className="rounded-xl bg-[#ffffff] border border-[#03203d] p-2.5">
                  <div className="text-[18px] font-black text-[#03203d]">
                    {result.weeklySplit.practiceHours}h
                  </div>
                  <div className="text-[12px] text-[#4a6079]">Listas/sem</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-[13px] font-bold uppercase tracking-[1px] text-[#4a6079]">
                  Sequência na escada
                </div>
                {result.ladderSteps.map((step) => (
                  <div
                    key={step.code}
                    className={cx(
                      "flex items-center justify-between rounded-xl border border-[#03203d] px-3 py-2 text-[14px]",
                      step.priority === "imediata"
                        ? "bg-[#0cf2b5] font-bold text-[#03203d]"
                        : step.included
                        ? "bg-[#ffffff] text-[#1c3752]"
                        : "bg-[#e3e7eb]/60 text-[#4a6079]"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <CheckCircle2 size={15} />
                      {step.code} · {step.title}
                    </span>
                    <span className="text-[12px] font-bold">
                      {step.included ? `${step.estimatedWeeks} sem` : "Concluído"}
                    </span>
                  </div>
                ))}
              </div>

              <ButtonLink
                href={`/cursos/${result.recommendedStartSlug}`}
                variant="primary"
                className="w-full"
              >
                Ver Detalhes do {result.recommendedStartCode}
              </ButtonLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

