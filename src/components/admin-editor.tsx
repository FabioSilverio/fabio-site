"use client";

import { useMemo, useState } from "react";
import { InnerHeader } from "@/components/inner-header";
import { TransitionLink } from "@/components/transition-link";
import { useBlogStore } from "@/components/blog-store-provider";
import { type BlogPost } from "@/lib/blog";

type FormState = {
  content: string;
  date: string;
  slug: string;
  summary: string;
  title: string;
};

const emptyForm: FormState = {
  content: "",
  date: new Date().toISOString().slice(0, 10),
  slug: "",
  summary: "",
  title: "",
};

export function AdminEditor() {
  const { deletePost, posts, savePost } = useBlogStore();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const customPosts = useMemo(
    () => posts.filter((post) => !seedSlugs.has(post.slug)),
    [posts],
  );

  function loadPost(post: BlogPost) {
    setForm({
      title: post.title,
      slug: post.slug,
      date: post.date,
      summary: post.summary,
      content: post.content.join("\n\n"),
    });
    setActiveSlug(post.slug);
    setMessage("");
  }

  function resetForm() {
    setForm(emptyForm);
    setActiveSlug(null);
    setMessage("");
  }

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const slug = savePost(form);
    setActiveSlug(slug);
    setMessage("Post saved locally in this browser.");
  }

  return (
    <div className="section-page">
      <InnerHeader />

      <div className="admin-page-inner">
        <div className="admin-head">
          <div>
            <h1 className="section-title admin-title">Admin</h1>
            <p className="admin-copy">
              Escreva e edite posts diretamente aqui. Os posts salvos pelo painel
              ficam no navegador atual usando localStorage.
            </p>
          </div>
          <TransitionLink className="admin-link" href="/blog">
            abrir blog
          </TransitionLink>
        </div>

        <div className="admin-layout">
          <aside className="admin-sidebar">
            <div className="admin-sidebar-head">
              <h2>Posts locais</h2>
              <button className="admin-button ghost" onClick={resetForm} type="button">
                novo
              </button>
            </div>

            <div className="admin-post-list">
              {customPosts.length ? (
                customPosts.map((post) => (
                  <button
                    className="admin-post-item"
                    key={post.slug}
                    onClick={() => loadPost(post)}
                    type="button"
                  >
                    <strong>{post.title}</strong>
                    <span>{post.date}</span>
                  </button>
                ))
              ) : (
                <p className="section-empty">
                  Nenhum post criado pelo painel ainda.
                </p>
              )}
            </div>
          </aside>

          <section className="admin-editor-panel">
            <form className="admin-form" onSubmit={submitForm}>
              <label>
                <span>Título</span>
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
                    placeholder="gerado automaticamente se vazio"
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
                <span>Conteúdo</span>
                <textarea
                  onChange={(event) =>
                    setForm((current) => ({ ...current, content: event.target.value }))
                  }
                  placeholder="Separe os parágrafos com uma linha em branco."
                  required
                  rows={12}
                  value={form.content}
                />
              </label>

              <div className="admin-actions">
                <button className="admin-button" type="submit">
                  salvar post
                </button>
                {activeSlug ? (
                  <button
                    className="admin-button danger"
                    onClick={() => {
                      deletePost(activeSlug);
                      resetForm();
                    }}
                    type="button"
                  >
                    apagar
                  </button>
                ) : null}
                {message ? <span className="admin-message">{message}</span> : null}
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

const seedSlugs = new Set([
  "building-a-personal-site-that-feels-intentional",
  "shared-element-transitions-for-navigation",
  "why-the-home-page-should-do-less",
  "black-white-and-one-accent-color",
  "how-to-make-a-hero-feel-calm",
  "docking-a-logo-into-the-topbar",
  "view-transitions-in-the-app-router",
  "when-typography-is-the-brand",
  "why-black-backgrounds-expose-bad-layouts",
  "scroll-as-a-state-machine",
]);
