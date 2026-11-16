import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { formatTrilhaCsv, type DiagnosticReportRow } from "@/lib/calculator";

export async function GET(req: NextRequest) {
  const format = req.nextUrl.searchParams.get("format") ?? "json";
  const db = getDb();
  const rows = db
    .prepare(
      `
      SELECT id, target_exam, math_base_score, physics_base_score,
             hours_per_week, recommended_course_slug, estimated_weeks, created_at
      FROM diagnostics
      ORDER BY id DESC
      LIMIT 100
    `
    )
    .all() as unknown as DiagnosticReportRow[];

  if (format === "csv") {
    const csv = formatTrilhaCsv(rows);
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="relatorio-trilha-un.csv"',
      },
    });
  }

  return NextResponse.json({
    total: rows.length,
    generatedAt: new Date().toISOString(),
    rows,
  });
}

