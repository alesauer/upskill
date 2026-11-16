import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getDb, getAllCourses } from "@/lib/db";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const db = getDb();
  const rows = db
    .prepare(
      "SELECT course_slug, progress_pct, completed_lessons, updated_at FROM enrollments WHERE user_id = ?"
    )
    .all(user.id) as Array<{
    course_slug: string;
    progress_pct: number;
    completed_lessons: string;
    updated_at: string;
  }>;

  const courses = getAllCourses();
  const enrollments = courses.map((course) => {
    const found = rows.find((r) => r.course_slug === course.slug);
    return {
      course_slug: course.slug,
      code: course.code,
      title: course.title,
      modules: course.modules,
      surface_color: course.surface_color,
      enrolled: Boolean(found),
      progress_pct: found ? found.progress_pct : 0,
      completed_lessons: found ? JSON.parse(found.completed_lessons) : [],
      updated_at: found ? found.updated_at : null,
    };
  });

  return NextResponse.json({ enrollments });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const body = await req.json();
  const courseSlug = String(body.course_slug ?? "");
  const moduleIndex = Number(body.module_index);

  const courses = getAllCourses();
  const course = courses.find((c) => c.slug === courseSlug);
  if (!course) {
    return NextResponse.json({ error: "Curso não encontrado" }, { status: 404 });
  }

  const db = getDb();
  const existing = db
    .prepare(
      "SELECT completed_lessons FROM enrollments WHERE user_id = ? AND course_slug = ?"
    )
    .get(user.id, courseSlug) as { completed_lessons: string } | undefined;

  let completed: number[] = existing
    ? JSON.parse(existing.completed_lessons)
    : [];

  if (!Number.isNaN(moduleIndex) && moduleIndex >= 0 && moduleIndex < course.modules.length) {
    if (completed.includes(moduleIndex)) {
      completed = completed.filter((i) => i !== moduleIndex);
    } else {
      completed = [...completed, moduleIndex].sort((a, b) => a - b);
    }
  }

  const progressPct = Math.round(
    (completed.length / Math.max(1, course.modules.length)) * 100
  );

  db.prepare(
    `
    INSERT INTO enrollments (user_id, course_slug, progress_pct, completed_lessons, updated_at)
    VALUES (?, ?, ?, ?, datetime('now'))
    ON CONFLICT(user_id, course_slug) DO UPDATE SET
      progress_pct = excluded.progress_pct,
      completed_lessons = excluded.completed_lessons,
      updated_at = datetime('now')
  `
  ).run(user.id, courseSlug, progressPct, JSON.stringify(completed));

  return NextResponse.json({
    course_slug: courseSlug,
    progress_pct: progressPct,
    completed_lessons: completed,
  });
}

