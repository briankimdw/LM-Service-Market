import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || "NOT SET";
  const directUrl = process.env.DIRECT_URL || "NOT SET";

  const maskUrl = (url: string) => {
    try {
      return url.replace(/:([^@]+)@/, ":****@");
    } catch {
      return url.substring(0, 30) + "...";
    }
  };

  let dbTest = "not tested";
  let dbError = "";
  try {
    const count = await prisma.storeSettings.count();
    dbTest = `connected - ${count} settings rows`;
  } catch (err) {
    dbTest = "FAILED";
    dbError = err instanceof Error ? err.message : String(err);
  }

  return NextResponse.json({
    DATABASE_URL: maskUrl(dbUrl),
    DIRECT_URL: maskUrl(directUrl),
    NODE_ENV: process.env.NODE_ENV,
    dbTest,
    dbError: dbError || undefined,
  });
}
