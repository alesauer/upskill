import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const db = getDb();
  const tickets = db
    .prepare(
      "SELECT id, name, category, subject, status, created_at FROM support_tickets ORDER BY id DESC LIMIT 20"
    )
    .all();

  return NextResponse.json({ tickets });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const category = String(body.category ?? "Dúvida sobre cursos").trim();
    const subject = String(body.subject ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Preencha todos os campos obrigatórios." },
        { status: 400 }
      );
    }

    const db = getDb();
    const res = db
      .prepare(
        "INSERT INTO support_tickets (name, email, category, subject, message) VALUES (?, ?, ?, ?, ?)"
      )
      .run(name, email, category, subject, message);

    return NextResponse.json(
      {
        id: Number(res.lastInsertRowid),
        status: "aberto",
        message: "Solicitação registrada! Nossa equipe responderá em breve.",
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Erro ao registrar suporte: " + (err as Error).message },
      { status: 500 }
    );
  }
}
