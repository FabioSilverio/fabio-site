import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AdminEditor } from "@/components/admin-editor";
import { loginAction, logoutAction } from "@/app/admin/actions";
import {
  adminSessionCookie,
  hasAdminPassword,
  isValidAdminSession,
} from "@/lib/admin-auth";
import { getPosts, getSiteConfig } from "@/lib/cms";

export const metadata: Metadata = {
  title: "admin",
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const [params, cookieStore] = await Promise.all([searchParams, cookies()]);
  const isAuthenticated = isValidAdminSession(
    cookieStore.get(adminSessionCookie)?.value,
  );

  if (hasAdminPassword() && !isAuthenticated) {
    return (
      <div className="section-page admin-login-page">
        <div className="admin-login-card">
          <h1 className="section-title admin-title">Admin</h1>
          <p className="admin-copy">
            Entre com a senha do painel para editar posts, links da topbar e as
            configuracoes do site.
          </p>

          <form action={loginAction} className="admin-login-form">
            <label>
              <span>Senha</span>
              <input name="password" required type="password" />
            </label>

            <button className="admin-button" type="submit">
              entrar
            </button>
          </form>

          {params.error ? (
            <p className="admin-error">Senha invalida.</p>
          ) : null}
        </div>
      </div>
    );
  }

  const [posts, siteConfig] = await Promise.all([getPosts(), getSiteConfig()]);

  return (
    <AdminEditor
      initialPosts={posts}
      initialSiteConfig={siteConfig}
      logoutAction={logoutAction}
    />
  );
}
