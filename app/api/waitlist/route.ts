import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

function getDb() {
  return neon(process.env.DATABASE_URL!);
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, interest } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const sql = getDb();

    await sql`
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT,
        interest TEXT NOT NULL DEFAULT 'both',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
      INSERT INTO waitlist (name, email, phone, interest)
      VALUES (${name}, ${email.toLowerCase()}, ${phone || null}, ${interest || "both"})
      ON CONFLICT (email) DO UPDATE SET
        name = EXCLUDED.name,
        phone = EXCLUDED.phone,
        interest = EXCLUDED.interest
    `;

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Waitlist signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const sql = getDb();
    await sql`
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT,
        interest TEXT NOT NULL DEFAULT 'both',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    const rows = await sql`SELECT count(*) as count FROM waitlist`;
    return NextResponse.json({ count: Number(rows[0].count) });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
