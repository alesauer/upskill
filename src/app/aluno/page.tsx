import React from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getAllCourses, getDb } from "@/lib/db";
import { Container, Section } from "@/components/DesignSystem";
import { StudentDashboard } from "@/components/StudentDashboard";

export default async function AlunoPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/entrar");
  }

  const db = getDb();
  const rows = db
    .prepare(
      "SELECT course_slug, progress_pct, completed_lessons FROM enrollments WHERE user_id = ?"
    )
    .all(user.id) as Array<{
    course_slug: string;
    progress_pct: number;
    completed_lessons: string;
  }>;

  const courses = getAllCourses();
  const initialEnrollments = courses.map((c) => {
    const found = rows.find((r) => r.course_slug === c.slug);
    return {
      course_slug: c.slug,
      code: c.code,
      title: c.title,
      surface_color: c.surface_color,
      progress_pct: found ? found.progress_pct : 0,
      completed_lessons: found ? JSON.parse(found.completed_lessons) : [],
      modules: c.modules,
    };
  });

  return (
    <Section className="pt-10 pb-20 bg-[#f5f4f0] min-h-[80vh]">
      <Container>
        <StudentDashboard
          user={user}
          initialEnrollments={initialEnrollments}
        />
      </Container>
    </Section>
  );
}

