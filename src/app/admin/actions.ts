"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  adminSessionCookie,
  createAdminSessionToken,
  getAdminPassword,
  hasAdminPassword,
} from "@/lib/admin-auth";

export async function loginAction(formData: FormData) {
  if (!hasAdminPassword()) {
    redirect("/admin");
  }

  const password = String(formData.get("password") ?? "");

  if (password !== getAdminPassword()) {
    redirect("/admin?error=1");
  }

  const cookieStore = await cookies();

  cookieStore.set(adminSessionCookie, createAdminSessionToken(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  redirect("/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(adminSessionCookie);
  redirect("/admin");
}
