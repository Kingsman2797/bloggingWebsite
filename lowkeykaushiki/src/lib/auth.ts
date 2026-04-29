import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieName = "lk_session";

function secret() {
  return process.env.SESSION_SECRET || "dev-only-lowkeykaushiki-secret";
}

function sign(value: string) {
  return crypto.createHmac("sha256", secret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    return false;
  }

  return crypto.timingSafeEqual(left, right);
}

export function isValidAdmin(username: string, password: string) {
  const expectedUser = process.env.ADMIN_USERNAME || "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD || "change-me";

  return safeEqual(username, expectedUser) && safeEqual(password, expectedPassword);
}

export async function createSession() {
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 7;
  const value = `${expiresAt}.${sign(String(expiresAt))}`;
  const store = await cookies();

  store.set(cookieName, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(expiresAt),
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(cookieName);
}

export async function isAdminSession() {
  const store = await cookies();
  const value = store.get(cookieName)?.value;

  if (!value) {
    return false;
  }

  const [expiresAt, signature] = value.split(".");
  if (!expiresAt || !signature || Number(expiresAt) < Date.now()) {
    return false;
  }

  return safeEqual(signature, sign(expiresAt));
}

export async function requireAdmin() {
  const allowed = await isAdminSession();
  if (!allowed) {
    redirect("/admin/login");
  }
}
