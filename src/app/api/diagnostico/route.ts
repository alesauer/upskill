import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import {
  calculateTrilha,
  type StudyFocus,
  type TargetExam,
} from "@/lib/calculator";

const VALID_EXAMS: TargetExam[] = [
  "ENEM",
  "FUVEST_UNICAMP",
  "MEDICINA",
  "ITA_IME",
  "SUPERIOR",
];

const VALID_FOCUS: StudyFocus[] = ["MATEMATICA", "FISICA", "AMBAS"];

export async function GET() {
  const db = getDb();
  const rows = db
    .prepare(
      "SELECT id, target_exam, math_base_score, physics_base_score, hours_per_week, recommended_course_slug, estimated_weeks, study_plan, created_at FROM diagnostics ORDER BY id DESC LIMIT 15"
    )
    .all() as Array<Record<string, unknown>>;

  return NextResponse.json({
    diagnostics: rows.map((r) => ({
      ...r,
      study_plan: JSON.parse(String(r.study_plan)),
    })),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const targetExam = VALID_EXAMS.includes(body.targetExam)
      ? (body.targetExam as TargetExam)
      : "ENEM";
    const focus = VALID_FOCUS.includes(body.focus)
      ? (body.focus as StudyFocus)
      : "AMBAS";

    const mathBaseScore = Number(body.mathBaseScore ?? 5);
    const physicsBaseScore = Number(body.physicsBaseScore ?? 5);
    const hoursPerWeek = Number(body.hoursPerWeek ?? 10);

    if (
      Number.isNaN(mathBaseScore) ||
      Number.isNaN(physicsBaseScore) ||
      Number.isNaN(hoursPerWeek)
    ) {
      return NextResponse.json(
        { error: "Parâmetros numéricos inválidos." },
        { status: 400 }
      );
    }

    const result = calculateTrilha({
      targetExam,
      mathBaseScore,
      physicsBaseScore,
      hoursPerWeek,
      focus,
    });

    const db = getDb();
    const sessionKey = String(body.sessionKey ?? "web-visitor");
    const insertRes = db
      .prepare(
        `
        INSERT INTO diagnostics (
          session_key, target_exam, math_base_score, physics_base_score,
          hours_per_week, recommended_course_slug, estimated_weeks, study_plan
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `
      )
      .run(
        sessionKey,
        result.targetExam,
        result.mathBaseScore,
        result.physicsBaseScore,
        result.hoursPerWeek,
        result.recommendedStartSlug,
        result.estimatedWeeks,
        JSON.stringify(result)
      );

    return NextResponse.json(
      {
        id: Number(insertRes.lastInsertRowid),
        result,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Erro no cálculo de trilha: " + (err as Error).message },
      { status: 500 }
    );
  }
}
