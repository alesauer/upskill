import { NextRequest, NextResponse } from "next/server";
import { getDb, verifyPassword, hashPassword } from "@/lib/db";
import { createSession, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();
    const password = String(body.password ?? "");
    const name = body.name ? String(body.name).trim() : "";
    const targetExam = body.targetExam ? String(body.targetExam).trim() : "ENEM";
    const mode = body.mode === "register" ? "register" : "login";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Informe e-mail e senha." },
        { status: 400 }
      );
    }

    const db = getDb();

    if (mode === "register") {
      if (!name) {
        return NextResponse.json(
          { error: "Informe seu nome completo." },
          { status: 400 }
        );
      }
      const existing = db
        .prepare("SELECT id FROM users WHERE email = ?")
        .get(email);
      if (existing) {
        return NextResponse.json(
          { error: "Este e-mail já está cadastrado." },
          { status: 409 }
        );
      }

      const passwordHash = hashPassword(password);
      const res = db
        .prepare(
          "INSERT INTO users (name, email, password_hash, role, target_exam) VALUES (?, ?, ?, 'student', ?)"
        )
        .run(name, email, passwordHash, targetExam);
      const userId = Number(res.lastInsertRowid);

      // Matricula inicial no DMAT para todo novo aluno explorar
      db.prepare(
        "INSERT OR IGNORE INTO enrollments (user_id, course_slug, progress_pct, completed_lessons) VALUES (?, 'desvendando-a-matematica', 0, '[]')"
      ).run(userId);

      const token = createSession(userId);
      const response = NextResponse.json(
        {
          user: { id: userId, name, email, role: "student", target_exam: targetExam },
        },
        { status: 201 }
      );
      response.cookies.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      });
      return response;
    }

    const user = db
      .prepare(
        "SELECT id, name, email, password_hash, role, target_exam FROM users WHERE email = ?"
      )
      .get(email) as
      | {
          id: number;
          name: string;
          email: string;
          password_hash: string;
          role: string;
          target_exam: string;
        }
      | undefined;

    if (!user || !verifyPassword(password, user.password_hash)) {
      return NextResponse.json(
        { error: "E-mail ou senha inválidos." },
        { status: 401 }
      );
    }

    const token = createSession(user.id);
    const response = NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        target_exam: user.target_exam,
      },
    });
    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
    return response;
  } catch (err) {
    return NextResponse.json(
      { error: "Erro ao autenticar: " + (err as Error).message },
      { status: 500 }
    );
  }
}

