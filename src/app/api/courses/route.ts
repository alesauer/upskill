import { NextRequest, NextResponse } from "next/server";
import { getAllCourses } from "@/lib/db";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code")?.toUpperCase();
  const courses = getAllCourses();
  const filtered = code ? courses.filter((c) => c.code === code) : courses;

  return NextResponse.json({
    courses: filtered,
    total: filtered.length,
  });
}

