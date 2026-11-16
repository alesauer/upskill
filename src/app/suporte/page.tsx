import React from "react";
import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/DesignSystem";
import { SupportForm } from "@/components/SupportForm";

export const metadata: Metadata = {
  title: "Suporte",
  description:
    "Central de Ajuda do Universo Narrado: canais para alunos, matrículas, livros da Editora 314 e formulário de atendimento.",
};

const faqs = [
  {
    q: "Não sei em qual curso começar. Qual escolher?",
    a: "Use nossa Calculadora de Trilha na página de Cursos: se você ainda trava em frações, potências e equações básicas, comece pelo Desvendando a Matemática (DMAT). Se já tem base firme, siga para Lições de Matemática (LM) e Lições de Física (LF).",
  },
  {
    q: "Como funciona a matrícula Vitalícia?",
    a: "Na Vitalícia, o acesso aos cursos incluídos não expira e acompanha todas as atualizações de aulas e listas, além de garantir o Guia de Fórmulas Explicadas.",
  },
  {
    q: "Qual o prazo de entrega dos livros da Editora 314?",
    a: "Os envios são feitos pelos Correios/transportadora com código de rastreio enviado por e-mail assim que o pedido é postado.",
  },
];

export default function SuportePage() {
  return (
    <>
      <Section className="pt-12 pb-16 bg-[#ffffff]">
        <Container>
          <div className="max-w-[780px] space-y-5">
            <Eyebrow>Suporte e Central de Ajuda</Eyebrow>
            <h1 className="text-[40px] sm:text-[56px] font-black leading-[1.04] tracking-[-1.5px] text-[#03203d]">
              Como podemos ajudar você hoje?
            </h1>
            <p className="text-[19px] font-light text-[#1c3752]">
              Atendimento de segunda a segunda para alunos já matriculados e
              para quem quer tirar dúvidas antes de entrar no Universo Narrado.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[20px] border border-[#03203d] bg-[#eaf0ff] p-6 shadow-[4px_4px_0_#03203d] space-y-3">
              <div className="inline-flex items-center gap-2 text-[14px] font-bold uppercase text-[#03203d]">
                <MessageCircle size={18} /> Já é aluno (Suporte técnico e livros)
              </div>
              <p className="text-[20px] font-black text-[#03203d]">
                WhatsApp: +55 (31) 99141-5660
              </p>
              <p className="inline-flex items-center gap-2 text-[15px] font-light text-[#1c3752]">
                <Mail size={16} /> alunos@universonarrado.com.br
              </p>
            </div>

            <div className="rounded-[20px] border border-[#03203d] bg-[#fff9d6] p-6 shadow-[4px_4px_0_#03203d] space-y-3">
              <div className="inline-flex items-center gap-2 text-[14px] font-bold uppercase text-[#03203d]">
                <MessageCircle size={18} /> Novas matrículas e dúvidas
              </div>
              <p className="text-[20px] font-black text-[#03203d]">
                WhatsApp: +55 (31) 93618-0769
              </p>
              <p className="text-[15px] font-light text-[#1c3752]">
                Nossa equipe indica o degrau ideal para o seu vestibular.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f5f4f0] border-t border-[#e3e7eb]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <SupportForm />
            </div>

            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-[26px] font-black text-[#03203d]">
                Perguntas frequentes
              </h2>
              {faqs.map((f) => (
                <div
                  key={f.q}
                  className="rounded-[16px] border border-[#03203d] bg-[#ffffff] p-5 shadow-[3px_3px_0_#03203d] space-y-2"
                >
                  <h3 className="text-[17px] font-bold text-[#03203d]">
                    {f.q}
                  </h3>
                  <p className="text-[15px] font-light text-[#1c3752] leading-relaxed">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

