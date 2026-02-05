"use server";

import { db } from "@/db";
import { waitlistEntries, WaitlistEntry } from "@/db/schema";
import { desc, ilike, or, eq, sql, count } from "drizzle-orm";
import {
  verifyCredentials,
  createSession,
  setSessionCookie,
  clearSession,
  isAuthenticated,
} from "@/lib/auth";
import { redirect } from "next/navigation";

export type BusinessType =
  | "sole_proprietorship"
  | "llp_partnership"
  | "private_limited"
  | "unregistered";

export type TurnoverRange =
  | "below_50l"
  | "50l_to_2cr"
  | "2cr_to_5cr"
  | "above_5cr";

export interface WaitlistFilters {
  search?: string;
  businessType?: BusinessType | "";
  turnoverRange?: TurnoverRange | "";
  page?: number;
  pageSize?: number;
}

export interface PaginatedResult {
  entries: WaitlistEntry[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export async function loginAction(
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string } | null> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Username and password are required" };
  }

  const isValid = await verifyCredentials(username, password);

  if (!isValid) {
    return { error: "Invalid credentials" };
  }

  const sessionId = await createSession();
  await setSessionCookie(sessionId);

  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await clearSession();
  redirect("/admin/login");
}

export async function checkAuth(): Promise<boolean> {
  return isAuthenticated();
}

export async function getWaitlistEntries(
  filters: WaitlistFilters = {}
): Promise<PaginatedResult> {
  const { search = "", businessType = "", turnoverRange = "", page = 1, pageSize = 10 } = filters;

  const conditions = [];

  // Search filter
  if (search) {
    conditions.push(
      or(
        ilike(waitlistEntries.name, `%${search}%`),
        ilike(waitlistEntries.phone, `%${search}%`)
      )
    );
  }

  // Business type filter
  if (businessType) {
    conditions.push(eq(waitlistEntries.businessType, businessType));
  }

  // Turnover range filter
  if (turnoverRange) {
    conditions.push(eq(waitlistEntries.turnoverRange, turnoverRange));
  }

  // Build where clause
  const whereClause = conditions.length > 0 ? sql`${sql.join(conditions, sql` AND `)}` : undefined;

  // Get total count
  const countResult = await db
    .select({ count: count() })
    .from(waitlistEntries)
    .where(whereClause);

  const totalCount = countResult[0]?.count || 0;
  const totalPages = Math.ceil(totalCount / pageSize);
  const offset = (page - 1) * pageSize;

  // Get paginated entries
  const entries = await db
    .select()
    .from(waitlistEntries)
    .where(whereClause)
    .orderBy(desc(waitlistEntries.createdAt))
    .limit(pageSize)
    .offset(offset);

  return {
    entries,
    totalCount,
    totalPages,
    currentPage: page,
  };
}

export async function getWaitlistStats(): Promise<{
  total: number;
  byBusinessType: Record<string, number>;
  byTurnoverRange: Record<string, number>;
}> {
  const total = await db.select({ count: count() }).from(waitlistEntries);

  const byBusinessType = await db
    .select({
      type: waitlistEntries.businessType,
      count: count(),
    })
    .from(waitlistEntries)
    .groupBy(waitlistEntries.businessType);

  const byTurnoverRange = await db
    .select({
      range: waitlistEntries.turnoverRange,
      count: count(),
    })
    .from(waitlistEntries)
    .groupBy(waitlistEntries.turnoverRange);

  return {
    total: total[0]?.count || 0,
    byBusinessType: Object.fromEntries(
      byBusinessType.map((b) => [b.type, b.count])
    ),
    byTurnoverRange: Object.fromEntries(
      byTurnoverRange.map((t) => [t.range, t.count])
    ),
  };
}
