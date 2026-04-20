"use client";

import { useMemo, useState } from "react";
import { InnerHeader } from "@/components/inner-header";
import { TransitionLink } from "@/components/transition-link";
import {
  slugifyTitle,
  sortPosts,
  type BlogPost,
  type SiteConfig,
} from "@/lib/cms-shared";

type AdminEditorProps = {
  initialPosts: BlogPost[];
  initialSiteConfig: SiteConfig;
  logoutAction: () => Promise<void>;
};

type PostFormState = {
  content: string;
  date: string;
  slug: string;
  summary: string;
  title: string;
};

const emptyForm: PostFormState = {
  content: "",
  date: new Date().toISOString().slice(0, 10),
  slug: "",
  summary: "",
  title: "",
};

export function AdminEditor({
  initialPosts,
  initialSiteConfig,
  logoutAction,
}: AdminEditorProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [siteConfig, setSiteConfig] = useState(initialSiteConfig);
  const [form, setForm] = useState<PostFormState>(emptyForm);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [postMessage, setPostMessage] = useState("");
  const [siteMessage, setSiteMessage] = useState("");
  const [isSavingPost, setIsSavingPost] = useState(false);
  const [isSavingSite, setIsSavingSite] = useState(false);

  const sortedPosts = useMemo(() => sortPosts(posts), [posts]);

  function loadPost(post: BlogPost) {
    setForm({
      title: post.title,
      slug: post.slug,
      date: post.date,
      summary: post.summary,
      content: post.content.join("\n\n"),
    });
    setActiveSlug(post.slug);
    setPostMessage("");
  }

  function resetForm() {
    setForm(emptyForm);
    setActiveSlug(null);
    setPostMessage("");
  }

  async function submitPost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSavingPost(true);
    setPostMessage("");

    const response = await fetch("/api/admin/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        previousSlug: activeSlug,
      }),
    });

    const payload = (await response.json()) as {
      error?: string;
      post?: BlogPost;
      posts?: BlogPost[];
      storageMode?: string;
    };

    setIsSavingPost(false);

    if (!response.ok || !payload.post || !payload.posts) {
      setPostMessage(payload.error ?? "Nao foi possivel salvar o post.");
      return;
    }

    setPosts(payload.posts);
    setActiveSlug(payload.post.slug);
    setForm({
      title: payload.post.title,
      slug: payload.post.slug,
      date: payload.post.date,
      summary: payload.post.summary,
      content: payload.post.content.join("\n\n"),
    });
    setPostMessage(
      payload.storageMode === "github"
        ? "Post salvo no repo. A Vercel deve redeployar em seguida."
        : "Post salvo localmente no projeto.",
    );
  }

  async function deleteCurrentPost() {
    if (!activeSlug) {
      return;
    }

    setIsSavingPost(true);
    setPostMessage("");

    const response = await fetch(`/api/admin/posts/${activeSlug}`, {
      method: "DELETE",
    });

    const payload = (await response.json()) as {
      error?: string;
      posts?: BlogPost[];
      storageMode?: string;
    };

    setIsSavingPost(false);

    if (!response.ok || !payload.posts) {
      setPostMessage(payload.error ?? "Nao foi possivel apagar o post.");
      return;
    }

    setPosts(payload.posts);
    resetForm();
    setPostMessage(
      payload.storageMode === "github"
        ? "Post removido do repo. A Vercel deve redeployar em seguida."
        : "Post removido localmente do projeto.",
    );
  }

  async function saveSiteSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSavingSite(true);
    setSiteMessage("");

    const response = await fetch("/api/admin/site", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(siteConfig),
    });

    const payload = (await response.json()) as {
      error?: string;
      siteConfig?: SiteConfig;
      storageMode?: string;
    };

    setIsSavingSite(false);

    if (!response.ok || !payload.siteConfig) {
      setSiteMessage(payload.error ?? "Nao foi possivel salvar as configuracoes.");
      return;
    }

    setSiteConfig(payload.siteConfig);
    setSiteMessage(
      payload.storageMode === "github"
        ? "Configuracoes salvas no repo. A Vercel deve redeployar em seguida."
        : "Configuracoes salvas localmente no projeto.",
    );
  }

  return (
    <div className="section-page">
      <InnerHeader brandText={siteConfig.siteTitle} navItems={siteConfig.navLinks} />

      <div className="admin-page-inner">
        <div className="admin-head">
          <div>
            <h1 className="section-title admin-title">Admin</h1>
            <p className="admin-copy">
              Painel para criar, editar e apagar posts, alem de ajustar titulo,
              footer e os links da topbar.
            </p>
          </div>

          <div className="admin-head-actions">
            <TransitionLink className="admin-link" href="/blog">
              abrir blog
            </TransitionLink>
            <form action={logoutAction}>
              <button className="admin-button ghost" type="submit">
                sair
              </button>
            </form>
          </div>
        </div>

        <div className="admin-layout">
          <aside className="admin-sidebar">
            <div className="admin-sidebar-head">
              <h2>Posts</h2>
              <button className="admin-button ghost" onClick={resetForm} type="button">
                novo
              </button>
            </div>

            <div className="admin-post-list">
              {sortedPosts.map((post) => (
                <button
                  className="admin-post-item"
                  data-active={activeSlug === post.slug || undefined}
                  key={post.slug}
                  onClick={() => loadPost(post)}
                  type="button"
                >
                  <strong>{post.title}</strong>
                  <span>{post.date}</span>
                </button>
              ))}
            </div>
          </aside>

          <div className="admin-stack">
            <section className="admin-editor-panel">
              <div className="admin-panel-head">
                <h2>{activeSlug ? "Editar post" : "Novo post"}</h2>
                {activeSlug ? (
                  <span className="admin-slug-chip">/{activeSlug}</span>
                ) : null}
              </div>

              <form className="admin-form" onSubmit={submitPost}>
                <label>
                  <span>Titulo</span>
                  <input
                    onChange={(event) =>
                      setForm((current) => ({ ...current, title: event.target.value }))
                    }
                    required
                    value={form.title}
                  />
                </label>

                <div className="admin-form-row">
                  <label>
                    <span>Slug</span>
                    <input
                      onChange={(event) =>
                        setForm((current) => ({ ...current, slug: event.target.value }))
                      }
                      placeholder={slugifyTitle(form.title) || "gerado automaticamente"}
                      value={form.slug}
                    />
                  </label>

                  <label>
                    <span>Data</span>
                    <input
                      onChange={(event) =>
                        setForm((current) => ({ ...current, date: event.target.value }))
                      }
                      required
                      type="date"
                      value={form.date}
                    />
                  </label>
                </div>

                <label>
                  <span>Resumo</span>
                  <textarea
                    onChange={(event) =>
                      setForm((current) => ({ ...current, summary: event.target.value }))
                    }
                    required
                    rows={3}
                    value={form.summary}
                  />
                </label>

                <label>
                  <span>Conteudo</span>
                  <textarea
                    onChange={(event) =>
                      setForm((current) => ({ ...current, content: event.target.value }))
                    }
                    placeholder="Separe os paragrafos com uma linha em branco."
                    required
                    rows={12}
                    value={form.content}
                  />
                </label>

                <div className="admin-actions">
                  <button className="admin-button" disabled={isSavingPost} type="submit">
                    {isSavingPost ? "salvando..." : "salvar post"}
                  </button>
                  {activeSlug ? (
                    <button
                      className="admin-button danger"
                      disabled={isSavingPost}
                      onClick={deleteCurrentPost}
                      type="button"
                    >
                      apagar
                    </button>
                  ) : null}
                  {postMessage ? <span className="admin-message">{postMessage}</span> : null}
                </div>
              </form>
            </section>

            <section className="admin-editor-panel">
              <div className="admin-panel-head">
                <h2>Configuracoes do site</h2>
              </div>

              <form className="admin-form" onSubmit={saveSiteSettings}>
                <label>
                  <span>Titulo do site</span>
                  <input
                    onChange={(event) =>
                      setSiteConfig((current) => ({
                        ...current,
                        siteTitle: event.target.value,
                      }))
                    }
                    required
                    value={siteConfig.siteTitle}
                  />
                </label>

                <label>
                  <span>Texto do footer</span>
                  <input
                    onChange={(event) =>
                      setSiteConfig((current) => ({
                        ...current,
                        footerText: event.target.value,
                      }))
                    }
                    required
                    value={siteConfig.footerText}
                  />
                </label>

                <div className="admin-links-head">
                  <span className="admin-links-label">Links da topbar</span>
                  <button
                    className="admin-button ghost"
                    onClick={() =>
                      setSiteConfig((current) => ({
                        ...current,
                        navLinks: [
                          ...current.navLinks,
                          {
                            id: `item-${current.navLinks.length + 1}`,
                            label: "NEW LINK",
                            href: "/new-link",
                          },
                        ],
                      }))
                    }
                    type="button"
                  >
                    adicionar link
                  </button>
                </div>

                <div className="admin-link-list">
                  {siteConfig.navLinks.map((item, index) => (
                    <div className="admin-link-row" key={item.id}>
                      <input
                        onChange={(event) =>
                          setSiteConfig((current) => ({
                            ...current,
                            navLinks: current.navLinks.map((entry, entryIndex) =>
                              entryIndex === index
                                ? {
                                    ...entry,
                                    id:
                                      slugifyTitle(event.target.value) ||
                                      `item-${entryIndex + 1}`,
                                    label: event.target.value.toUpperCase(),
                                  }
                                : entry,
                            ),
                          }))
                        }
                        placeholder="Label"
                        value={item.label}
                      />
                      <input
                        onChange={(event) =>
                          setSiteConfig((current) => ({
                            ...current,
                            navLinks: current.navLinks.map((entry, entryIndex) =>
                              entryIndex === index
                                ? {
                                    ...entry,
                                    href: event.target.value,
                                  }
                                : entry,
                            ),
                          }))
                        }
                        placeholder="/blog"
                        value={item.href}
                      />
                      <button
                        className="admin-button danger"
                        onClick={() =>
                          setSiteConfig((current) => ({
                            ...current,
                            navLinks: current.navLinks.filter(
                              (_, entryIndex) => entryIndex !== index,
                            ),
                          }))
                        }
                        type="button"
                      >
                        remover
                      </button>
                    </div>
                  ))}
                </div>

                <div className="admin-actions">
                  <button className="admin-button" disabled={isSavingSite} type="submit">
                    {isSavingSite ? "salvando..." : "salvar configuracoes"}
                  </button>
                  {siteMessage ? <span className="admin-message">{siteMessage}</span> : null}
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
