import { NextResponse } from "next/server";
import { db } from "@/db";
import { waitlistEntries } from "@/db/schema";
import { count } from "drizzle-orm";

export async function GET() {
  const start = Date.now();
  const dbUrl = process.env.DATABASE_URL || "";
  const dbHost = dbUrl.match(/@([^:\/]+)/)?.[1] || "unknown";

  try {
    console.log(`[Health] Connecting to database at ${dbHost}...`);
    const result = await db.select({ count: count() }).from(waitlistEntries);
    const duration = Date.now() - start;
    console.log(`[Health] Database query succeeded in ${duration}ms`);

    return NextResponse.json({
      status: "ok",
      database: "connected",
      count: result[0]?.count || 0,
      duration: `${duration}ms`,
      dbHost,
      env: {
        hasDbUrl: !!process.env.DATABASE_URL,
        isInternal: dbUrl.includes(".railway.internal"),
        nodeEnv: process.env.NODE_ENV,
      },
    });
  } catch (error) {
    const duration = Date.now() - start;
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : "";
    console.error(`[Health] Database error after ${duration}ms:`, errorMsg, errorStack);

    return NextResponse.json(
      {
        status: "error",
        database: "disconnected",
        duration: `${duration}ms`,
        error: errorMsg,
        dbHost,
        env: {
          hasDbUrl: !!process.env.DATABASE_URL,
          isInternal: dbUrl.includes(".railway.internal"),
          nodeEnv: process.env.NODE_ENV,
        },
      },
      { status: 500 }
    );
  }
}
