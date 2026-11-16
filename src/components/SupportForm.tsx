"use client";

import React, { useState } from "react";
import { Button } from "./DesignSystem";

export function SupportForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Dúvida sobre cursos");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [feedback, setFeedback] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setFeedback("");
    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, category, subject, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Falha ao enviar");
      }
      setStatus("sent");
      setFeedback(
        `Ticket #${data.id} registrado com sucesso! Nossa equipe responderá por e-mail.`
      );
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setFeedback((err as Error).message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[24px] border border-[#03203d] bg-[#ffffff] p-6 sm:p-8 shadow-[4px_4px_0_#03203d] space-y-5"
    >
      <h2 className="text-[26px] font-black text-[#03203d]">
        Enviar mensagem para a equipe
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            className="w-full h-12 rounded-[12px] border border-[#03203d] px-3.5 text-[15px] text-[#03203d]"
          />
        </label>

        <label className="block">
          <span className="block text-[14px] font-bold text-[#03203d] mb-1">
            E-mail
          </span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@exemplo.com"
            className="w-full h-12 rounded-[12px] border border-[#03203d] px-3.5 text-[15px] text-[#03203d]"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-[14px] font-bold text-[#03203d] mb-1">
            Categoria
          </span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-12 rounded-[12px] border border-[#03203d] bg-[#ffffff] px-3.5 text-[15px] text-[#03203d]"
          >
            <option>Dúvida sobre cursos</option>
            <option>Acesso à Área do Aluno</option>
            <option>Livros e Editora 314</option>
            <option>Pagamentos e Vitalícia</option>
          </select>
        </label>

        <label className="block">
          <span className="block text-[14px] font-bold text-[#03203d] mb-1">
            Assunto
          </span>
          <input
            required
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Ex: Qual curso escolher para Fuvest?"
            className="w-full h-12 rounded-[12px] border border-[#03203d] px-3.5 text-[15px] text-[#03203d]"
          />
        </label>
      </div>

      <label className="block">
        <span className="block text-[14px] font-bold text-[#03203d] mb-1">
          Mensagem
        </span>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Conte em que ponto você está e qual vestibular pretende prestar..."
          className="w-full rounded-[12px] border border-[#03203d] p-3.5 text-[15px] text-[#03203d]"
        />
      </label>

      {feedback && (
        <div
          className={`rounded-xl border p-3.5 text-[14px] font-bold ${
            status === "sent"
              ? "bg-[#c3fbeb] border-[#03203d] text-[#03203d]"
              : "bg-red-50 border-red-400 text-red-800"
          }`}
        >
          {feedback}
        </div>
      )}

      <Button type="submit" variant="primary" disabled={status === "sending"}>
        {status === "sending" ? "Enviando..." : "Enviar Solicitação"}
      </Button>
    </form>
  );
}

