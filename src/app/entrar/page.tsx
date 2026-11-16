"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Section, Button, Eyebrow } from "@/components/DesignSystem";

export default function EntrarPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("aluno@universonarrado.com.br");
  const [password, setPassword] = useState("sapereaude");
  const [targetExam, setTargetExam] = useState("ITA/IME");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          name,
          email,
          password,
          targetExam,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Erro ao entrar");
      }
      router.push("/aluno");
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section className="pt-12 pb-20 bg-[#f5f4f0] min-h-[75vh]">
      <Container>
        <div className="max-w-[520px] mx-auto rounded-[28px] border border-[#03203d] bg-[#ffffff] p-8 sm:p-10 shadow-[4px_4px_0_#03203d] space-y-6">
          <div className="space-y-3">
            <Eyebrow>Área do aluno</Eyebrow>
            <h1 className="text-[34px] font-black leading-[1.1] text-[#03203d]">
              {mode === "login"
                ? "Entrar na plataforma"
                : "Criar conta de estudante"}
            </h1>
            <p className="text-[15px] font-light text-[#4a6079]">
              Acompanhe seus cursos, marque módulos concluídos e exporte seu
              plano de estudos.
            </p>
          </div>

          <div className="flex gap-2 p-1 rounded-full bg-[#f5f4f0] border border-[#03203d]">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 rounded-full py-2 text-[14px] font-bold cursor-pointer transition ${
                mode === "login"
                  ? "bg-[#0cf2b5] text-[#03203d] border border-[#03203d]"
                  : "text-[#4a6079]"
              }`}
            >
              Já sou aluno
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`flex-1 rounded-full py-2 text-[14px] font-bold cursor-pointer transition ${
                mode === "register"
                  ? "bg-[#0cf2b5] text-[#03203d] border border-[#03203d]"
                  : "text-[#4a6079]"
              }`}
            >
              Criar conta
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <>
                <label className="block">
                  <span className="block text-[14px] font-bold text-[#03203d] mb-1">
                    Nome completo
                  </span>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full h-12 rounded-[12px] border border-[#03203d] px-3.5 text-[15px]"
                  />
                </label>
                <label className="block">
                  <span className="block text-[14px] font-bold text-[#03203d] mb-1">
                    Vestibular alvo
                  </span>
                  <select
                    value={targetExam}
                    onChange={(e) => setTargetExam(e.target.value)}
                    className="w-full h-12 rounded-[12px] border border-[#03203d] bg-[#ffffff] px-3.5 text-[15px]"
                  >
                    <option>ENEM</option>
                    <option>Fuvest / Unicamp</option>
                    <option>Medicina</option>
                    <option>ITA/IME</option>
                  </select>
                </label>
              </>
            )}

            <label className="block">
              <span className="block text-[14px] font-bold text-[#03203d] mb-1">
                E-mail
              </span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 rounded-[12px] border border-[#03203d] px-3.5 text-[15px]"
              />
            </label>

            <label className="block">
              <span className="block text-[14px] font-bold text-[#03203d] mb-1">
                Senha
              </span>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 rounded-[12px] border border-[#03203d] px-3.5 text-[15px]"
              />
            </label>

            {mode === "login" && (
              <p className="rounded-xl bg-[#eaf0ff] border border-[#03203d]/30 p-3 text-[13px] text-[#1c3752]">
                <strong>Conta demo pré-preenchida:</strong>{" "}
                <code>aluno@universonarrado.com.br</code> /{" "}
                <code>sapereaude</code>
              </p>
            )}

            {error && (
              <p className="rounded-xl bg-red-50 border border-red-400 p-3 text-[14px] font-bold text-red-700">
                {error}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading
                ? "Entrando..."
                : mode === "login"
                ? "Entrar na Área do Aluno"
                : "Criar Conta e Acessar"}
            </Button>
          </form>
        </div>
      </Container>
    </Section>
  );
}

