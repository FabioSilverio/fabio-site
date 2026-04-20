import { createHash, timingSafeEqual } from "node:crypto";

export const adminSessionCookie = "fabio-admin-session";

function hashValue(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD?.trim() || "";
}

export function hasAdminPassword() {
  return Boolean(getAdminPassword());
}

export function createAdminSessionToken(password: string) {
  return hashValue(`fabio-site-admin:${password}`);
}

export function isValidAdminSession(token?: string | null) {
  if (!hasAdminPassword()) {
    return true;
  }

  if (!token) {
    return false;
  }

  const expected = createAdminSessionToken(getAdminPassword());
  const left = Buffer.from(token);
  const right = Buffer.from(expected);

  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
}
