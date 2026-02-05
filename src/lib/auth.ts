import { cookies } from "next/headers";

// Admin credentials - in production, use proper auth system
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "CashBook@2024!"; // Change this in production

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_SECRET = "cashbook-admin-secret-key-change-in-production";

export async function verifyCredentials(
  username: string,
  password: string
): Promise<boolean> {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export async function createSession(): Promise<string> {
  const sessionId = Buffer.from(
    `${SESSION_SECRET}-${Date.now()}`
  ).toString("base64");
  return sessionId;
}

export async function setSessionCookie(sessionId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });
}

export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value || null;
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  if (!session) return false;

  // Verify session is valid (starts with our secret encoded)
  const expectedPrefix = Buffer.from(SESSION_SECRET).toString("base64").slice(0, 20);
  return session.startsWith(expectedPrefix);
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
