import { NextResponse } from "next/server";
import { getAllBooks } from "@/lib/db";

export async function GET() {
  const books = getAllBooks();
  return NextResponse.json({
    books,
    total: books.length,
  });
}

