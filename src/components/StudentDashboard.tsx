"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckSquare, Square, LogOut, Download } from "lucide-react";
import { Button, ButtonLink, Eyebrow } from "./DesignSystem";

interface EnrollmentItem {
  course_slug: string;
  code: string;
  title: string;
  surface_color: string;
  progress_pct: number;
  completed_lessons: number[];
  modules: { title: string; lessons: number; hours: number }[];
}

interface StudentDashboardProps {
  user: {
    name: string;
    email: string;
    target_exam: string;
  };
  initialEnrollments: EnrollmentItem[];
}

export function StudentDashboard({
  user,
  initialEnrollments,
}: StudentDashboardProps) {
  const router = useRouter();
  const [enrollments, setEnrollments] = useState(initialEnrollments);
  const [busyKey, setBusyKey] = useState<string | null>(null);

  async function toggleModule(courseSlug: string, moduleIndex: number) {
    const key = `${courseSlug}:${moduleIndex}`;
    setBusyKey(key);
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course_slug: courseSlug,
          module_index: moduleIndex,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setEnrollments((prev) =>
          prev.map((item) =>
            item.course_slug === courseSlug
              ? {
                  ...item,
                  progress_pct: data.progress_pct,
                  completed_lessons: data.completed_lessons,
                }
              : item
          )
        );
      }
    } finally {
      setBusyKey(null);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/entrar");
    router.refresh();
  }

  return (
    <div className="space-y-10">
      <div className="rounded-[28px] border border-[#03203d] bg-[#03203d] text-[#ffffff] p-8 shadow-[4px_4px_0_#0cf2b5] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Eyebrow>Área do aluno</Eyebrow>
          <h1 className="text-[32px] sm:text-[40px] font-black leading-tight text-[#ffffff]">
            Olá, {user.name}
          </h1>
          <p className="text-[16px] font-light text-[#e3e7eb]">
            {user.email} · Objetivo: <strong>{user.target_exam}</strong>
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="/api/reports/trilha?format=csv"
            className="un-btn un-btn-night !min-h-[44px] text-[15px]"
          >
            <Download size={16} /> Relatório Trilha CSV
          </a>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleLogout}
            className="bg-[#ffffff] text-[#03203d]"
          >
            <LogOut size={16} /> Sair
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {enrollments.map((course) => (
          <div
            key={course.course_slug}
            style={{ backgroundColor: course.surface_color }}
            className="rounded-[20px] border border-[#03203d] p-6 shadow-[4px_4px_0_#03203d] flex flex-col justify-between gap-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#ffffff] border border-[#03203d] px-3 py-0.5 text-[12px] font-bold text-[#03203d]">
                  {course.code}
                </span>
                <span className="text-[14px] font-black text-[#03203d]">
                  {course.progress_pct}% concluído
                </span>
              </div>

              <h2 className="text-[24px] font-black text-[#03203d]">
                {course.title}
              </h2>

              <div className="h-3 w-full rounded-full bg-[#ffffff] border border-[#03203d] overflow-hidden">
                <div
                  className="h-full bg-[#0cf2b5] transition-all duration-300"
                  style={{ width: `${course.progress_pct}%` }}
                />
              </div>

              <div className="space-y-2 pt-2">
                {course.modules.map((mod, idx) => {
                  const done = course.completed_lessons.includes(idx);
                  const isBusy = busyKey === `${course.course_slug}:${idx}`;
                  return (
                    <button
                      key={mod.title}
                      type="button"
                      disabled={isBusy}
                      onClick={() => toggleModule(course.course_slug, idx)}
                      className="w-full flex items-center justify-between gap-3 rounded-xl border border-[#03203d] bg-[#ffffff] px-3.5 py-2.5 text-left text-[14px] hover:bg-[#eaf0ff] transition cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5 font-bold text-[#03203d]">
                        {done ? (
                          <CheckSquare size={18} className="text-[#03203d]" />
                        ) : (
                          <Square size={18} className="text-[#4a6079]" />
                        )}
                        {mod.title}
                      </span>
                      <span className="text-[12px] text-[#4a6079] whitespace-nowrap">
                        {mod.hours}h
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <ButtonLink
              href={`/cursos/${course.course_slug}`}
              variant="secondary"
              size="sm"
              className="bg-[#ffffff] w-fit"
            >
              Ver ementa completa →
            </ButtonLink>
          </div>
        ))}
      </div>
    </div>
  );
}

