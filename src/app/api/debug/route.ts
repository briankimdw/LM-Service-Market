import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || "NOT SET";
  const directUrl = process.env.DIRECT_URL || "NOT SET";

  // Mask password in the URL for security
  const maskUrl = (url: string) => {
    try {
      return url.replace(/:([^@]+)@/, ":****@");
    } catch {
      return url.substring(0, 30) + "...";
    }
  };

  return NextResponse.json({
    DATABASE_URL: maskUrl(dbUrl),
    DIRECT_URL: maskUrl(directUrl),
    NODE_ENV: process.env.NODE_ENV,
    hasDbUrl: dbUrl !== "NOT SET",
    hasDirectUrl: directUrl !== "NOT SET",
  });
}
