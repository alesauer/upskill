import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = getDb();
    const coursesCount = (
      db.prepare("SELECT COUNT(*) as c FROM courses").get() as { c: number }
    ).c;
    const booksCount = (
      db.prepare("SELECT COUNT(*) as c FROM books").get() as { c: number }
    ).c;

    return NextResponse.json({
      status: "ok",
      service: "universo-narrado-clone",
      database: "sqlite",
      coursesCount,
      booksCount,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: (err as Error).message },
      { status: 500 }
    );
  }
}

